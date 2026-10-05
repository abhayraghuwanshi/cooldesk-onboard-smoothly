import { prefersReducedMotion } from '@/lib/motion';
import { useEffect, useRef } from 'react';

/**
 * Hero backdrop: a 3D transit map. The real pieces of CoolDesk are stations
 * (browsers → extension ⇄ your machine ⇄ desktop app → its features) on
 * coloured lines with 45° bends, laid on a map tilted away from the viewer.
 * Tracks have thickness, stations stand up as little pillars with shadows,
 * and trains carry your tabs and files between them. Stations blink when a
 * train arrives and rise near the cursor; the map sways a touch with the
 * mouse so the depth reads. Faint dot grid on the map, like map paper.
 *
 * Deliberately flat-shaded: no glows, no particle field.
 *
 * Canvas, DPR-aware, paused off-screen / in hidden tabs. Reduced motion gets a
 * single still frame and no sway. Decorative: aria-hidden, no pointer events.
 */

type Side = 'ext' | 'app' | 'link' | 'neutral';

/**
 * A "scene" makes the map act out part of a story: the `focus` stations rise
 * and show their names, trains run on `flows` (station key → station key),
 * `rate` scales how busy the lines are, and everything not in focus fades to
 * `dim`. Changes ease in over about a second.
 */
export interface GraphScene {
    focus: string[];
    flows: { from: string; to: string; color?: Side }[];
    rate: number;
    dim: number;
    speed?: number;
}

type Pt = { x: number; y: number };

interface Station {
    x: number; y: number; // on the map plane, px
    side: Side;
    key: string;
    label: string;
    hub?: boolean;
    blink: number; // 0..1, set when a train arrives
    focus: number; // 0..1, eased toward the scene's target
}

interface Line { a: number; b: number; side: Side; pts: Pt[]; len: number; heat: number }

interface Train { line: number; d: number; speed: number; dir: 1 | -1; color: string }

// Flat line colours, a little muted so they sit back on a dark page.
const COLORS: Record<Side, string> = {
    ext: '96, 165, 230', // blue line
    app: '170, 140, 235', // lavender line
    link: '86, 196, 150', // green line
    neutral: '160, 168, 180', // grey feeder lines
};

// Stations, as fractions of the map. The centre (headline) is left clear.
const KEY_NODES: { key: string; label: string; x: number; y: number; side: Side; hub?: boolean }[] = [
    { key: 'chrome', label: 'Chrome', x: 0.06, y: 0.26, side: 'neutral' },
    { key: 'edge', label: 'Edge', x: 0.04, y: 0.47, side: 'neutral' },
    { key: 'brave', label: 'Brave', x: 0.07, y: 0.68, side: 'neutral' },
    { key: 'ext', label: 'Browser extension', x: 0.2, y: 0.47, side: 'ext', hub: true },
    { key: 'widgets', label: 'Widgets', x: 0.19, y: 0.16, side: 'ext' },
    { key: 'activity', label: 'Open tabs & media', x: 0.31, y: 0.22, side: 'ext' },
    { key: 'favorites', label: 'Favorites', x: 0.25, y: 0.78, side: 'ext' },
    { key: 'local', label: 'Your machine', x: 0.5, y: 0.47, side: 'link' },
    { key: 'app', label: 'Desktop app', x: 0.8, y: 0.47, side: 'app', hub: true },
    { key: 'spotlight', label: 'Spotlight', x: 0.8, y: 0.15, side: 'app' },
    { key: 'projects', label: 'Spaces', x: 0.94, y: 0.27, side: 'app' },
    { key: 'files', label: 'File manager', x: 0.96, y: 0.5, side: 'app' },
    { key: 'layouts', label: 'Layouts', x: 0.93, y: 0.72, side: 'app' },
    { key: 'agent', label: 'AI agent', x: 0.76, y: 0.8, side: 'app' },
];

const KEY_EDGES: [string, string, Side][] = [
    ['chrome', 'ext', 'neutral'], ['edge', 'ext', 'neutral'], ['brave', 'ext', 'neutral'],
    ['ext', 'widgets', 'ext'], ['ext', 'activity', 'ext'], ['ext', 'favorites', 'ext'],
    ['ext', 'local', 'link'], ['local', 'app', 'link'],
    ['app', 'spotlight', 'app'], ['app', 'projects', 'app'], ['app', 'files', 'app'], ['app', 'layouts', 'app'], ['app', 'agent', 'app'],
];

// ── The 3D view ─────────────────────────────────────────────────────────────
const TILT = 0.82; // how far the map leans back, radians (~47°)
const PLANE_Y = 1.25; // stretch the map's depth so the tilt doesn't squash it
const LIFT_Y = 0.03; // nudge the map down, as if it lies on a table
const SWAY = 0.09; // max sideways turn from the mouse, radians
const GRID = 36; // map-paper dot spacing, px

/**
 * Transit-map route from A to B: a straight run, then a 45° diagonal, so every
 * line looks like it belongs on the same map.
 */
function route(ax: number, ay: number, bx: number, by: number): Pt[] {
    const dx = bx - ax, dy = by - ay;
    const adx = Math.abs(dx), ady = Math.abs(dy);
    if (adx < 1 || ady < 1) return [{ x: ax, y: ay }, { x: bx, y: by }];
    const corner = adx > ady
        ? { x: bx - Math.sign(dx) * ady, y: ay }
        : { x: ax, y: by - Math.sign(dy) * adx };
    return [{ x: ax, y: ay }, corner, { x: bx, y: by }];
}

const polyLen = (pts: Pt[]) => {
    let L = 0;
    for (let i = 1; i < pts.length; i++) L += Math.hypot(pts[i].x - pts[i - 1].x, pts[i].y - pts[i - 1].y);
    return L || 1;
};

/** Point at distance `d` along a polyline (map space). */
function along(pts: Pt[], d: number): Pt {
    for (let i = 1; i < pts.length; i++) {
        const a = pts[i - 1], b = pts[i];
        const seg = Math.hypot(b.x - a.x, b.y - a.y);
        if (d <= seg || i === pts.length - 1) {
            const t = seg ? Math.min(1, Math.max(0, d / seg)) : 0;
            return { x: a.x + (b.x - a.x) * t, y: a.y + (b.y - a.y) * t };
        }
        d -= seg;
    }
    return pts[0];
}

/**
 * `labels: false` draws the map without station names (only stations in a
 * scene's focus are named). `clearCenter: false` stops hiding names in the
 * middle, for when the map has its own panel instead of sitting behind a headline.
 * `fit` shrinks the map around the centre (0–1) so perspective doesn't push its
 * edges out of a small panel.
 */
export default function NetworkBackdrop({
    className = '',
    labels = true,
    scene = null,
    clearCenter = true,
    fit = 1,
}: {
    className?: string;
    labels?: boolean;
    scene?: GraphScene | null;
    clearCenter?: boolean;
    fit?: number;
}) {
    const ref = useRef<HTMLCanvasElement>(null);
    // Read by the animation loop, so a scene change never restarts the canvas.
    const sceneRef = useRef<GraphScene | null>(scene);
    const redrawRef = useRef<() => void>(() => {});
    useEffect(() => {
        sceneRef.current = scene;
        redrawRef.current(); // a still frame needs a redraw; a running loop picks it up anyway
    }, [scene]);

    useEffect(() => {
        const canvas = ref.current;
        const ctx = canvas?.getContext('2d');
        if (!canvas || !ctx) return;

        const reduced = prefersReducedMotion();
        let w = 0, h = 0, dpr = 1, raf = 0, last = 0, spawnAcc = 0;
        let stations: Station[] = [];
        let lines: Line[] = [];
        let trains: Train[] = [];
        let visible = true;
        let dim = 1; // eased toward the scene's dim level
        let yaw = 0, yawTarget = 0; // mouse sway
        let focal = 1000;
        const mouse = { x: -9999, y: -9999 };
        // Seeded random so behaviour is the same on every load.
        let seed = 7;
        const rand = () => { seed = (seed * 16807) % 2147483647; return (seed - 1) / 2147483646; };

        /** Map-plane point → screen point, with its perspective scale. */
        const project = (mx: number, my: number) => {
            const X = mx - w / 2;
            const Y = (my - h / 2) * PLANE_Y;
            const X1 = X * Math.cos(yaw);
            const Z1 = X * Math.sin(yaw);
            const depth = Z1 - Y * Math.sin(TILT); // the top of the map leans away
            const s = focal / (focal + depth);
            return { x: w / 2 + X1 * s * fit, y: h / 2 + h * LIFT_Y + Y * Math.cos(TILT) * s * fit, s: s * (0.6 + 0.4 * fit) };
        };

        const build = () => {
            dpr = Math.min(window.devicePixelRatio || 1, 2);
            w = canvas.clientWidth;
            h = canvas.clientHeight;
            canvas.width = Math.round(w * dpr);
            canvas.height = Math.round(h * dpr);
            ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
            focal = Math.max(w, h) * 0.95;
            seed = 7;

            stations = KEY_NODES.map((k) => ({ x: k.x * w, y: k.y * h, side: k.side, key: k.key, label: k.label, hub: k.hub, blink: 0, focus: 0 }));
            const idx = (key: string) => stations.findIndex((s) => s.key === key);
            lines = KEY_EDGES.map(([a, b, side]) => {
                const A = stations[idx(a)], B = stations[idx(b)];
                const pts = route(A.x, A.y, B.x, B.y);
                return { a: idx(a), b: idx(b), side, pts, len: polyLen(pts), heat: 0 };
            });
            trains = [];
        };

        // Resolve a scene flow (station key → station key) to a line and direction.
        const flowLine = (from: string, to: string): { l: number; dir: 1 | -1 } | null => {
            for (let i = 0; i < KEY_EDGES.length; i++) {
                const [a, b] = KEY_EDGES[i];
                if (a === from && b === to) return { l: i, dir: 1 };
                if (a === to && b === from) return { l: i, dir: -1 };
            }
            return null;
        };

        const addTrain = (l: number, dir: 1 | -1, side: Side, speedMul = 1) => {
            trains.push({ line: l, d: dir === 1 ? 0 : lines[l].len, speed: (110 + rand() * 70) * speedMul, dir, color: COLORS[side] });
        };

        const spawn = () => {
            const sc = sceneRef.current;
            if (sc && sc.flows.length && rand() < 0.85) {
                const f = sc.flows[Math.floor(rand() * sc.flows.length)];
                const fl = flowLine(f.from, f.to);
                if (fl) {
                    addTrain(fl.l, fl.dir, f.color ?? lines[fl.l].side, sc.speed ?? 1);
                    return;
                }
            }
            // Default service: browsers feed the extension, tabs cross to the app
            // (and "jump to tab" comes back), the app serves its features.
            const r = rand();
            if (r < 0.35) {
                const toApp = rand() < 0.6;
                addTrain(rand() < 0.5 ? 6 : 7, toApp ? 1 : -1, toApp ? 'ext' : 'app');
            } else {
                const l = Math.floor(rand() * KEY_EDGES.length);
                const dir: 1 | -1 = l < 3 ? 1 : l === 6 || l === 7 ? 1 : lines[l].side === 'ext' ? -1 : 1;
                addTrain(l, dir, lines[l].side);
            }
        };

        // A projected, rounded-corner polyline, shifted down by `dy` screen px.
        const pathRoute = (pts: Pt[], dy: number) => {
            const sp = pts.map((p) => project(p.x, p.y));
            ctx.beginPath();
            ctx.moveTo(sp[0].x, sp[0].y + dy);
            for (let i = 1; i < sp.length - 1; i++) ctx.arcTo(sp[i].x, sp[i].y + dy, sp[i + 1].x, sp[i + 1].y + dy, 16 * sp[i].s);
            ctx.lineTo(sp[sp.length - 1].x, sp[sp.length - 1].y + dy);
            return sp;
        };

        const draw = (dt: number) => {
            ctx.clearRect(0, 0, w, h);

            // Ease toward the scene and the mouse (instantly with no animation loop).
            const sc = sceneRef.current;
            const k = reduced ? 1 : Math.min(1, dt * 2.5);
            dim += ((sc ? sc.dim : 1) - dim) * k;
            if (!reduced) yaw += (yawTarget - yaw) * Math.min(1, dt * 3);
            for (const s of stations) {
                const target = sc && sc.focus.includes(s.key) ? 1 : 0;
                s.focus += (target - s.focus) * k;
            }
            for (let i = 0; i < lines.length; i++) {
                const [a, b] = KEY_EDGES[i];
                const target = sc && sc.flows.some((f) => (f.from === a && f.to === b) || (f.from === b && f.to === a)) ? 1 : 0;
                lines[i].heat += (target - lines[i].heat) * k;
            }

            // Map paper: a dot grid on the tilted plane, smaller and fainter far away.
            for (let my = -h * 0.2; my < h * 1.2; my += GRID) {
                for (let mx = -w * 0.1; mx < w * 1.1; mx += GRID) {
                    const p = project(mx, my);
                    if (p.x < 0 || p.x > w || p.y < 0 || p.y > h) continue;
                    ctx.fillStyle = `rgba(255, 255, 255, ${0.07 * p.s * p.s})`;
                    const r = 0.7 * p.s;
                    ctx.fillRect(p.x - r, p.y - r, r * 2, r * 2);
                }
            }

            // Tracks: a dark underside, then the coloured top, so each line has thickness.
            ctx.lineCap = 'round';
            ctx.lineJoin = 'round';
            for (const l of lines) {
                const base = (l.side === 'link' ? 5 : 3.5) + l.heat * 1.5;
                pathRoute(l.pts, 3);
                ctx.strokeStyle = `rgba(0, 0, 0, ${0.55 * Math.max(dim, l.heat)})`;
                ctx.lineWidth = base + 1;
                ctx.stroke();
                pathRoute(l.pts, 0);
                ctx.strokeStyle = `rgba(${COLORS[l.side]}, ${0.55 * dim + l.heat * 0.45})`;
                ctx.lineWidth = base;
                ctx.stroke();
            }

            // Trains: a little carriage with a shadow and a darker side.
            if (!reduced) {
                for (let i = trains.length - 1; i >= 0; i--) {
                    const t = trains[i];
                    const l = lines[t.line];
                    t.d += t.dir * t.speed * dt;
                    const done = t.dir === 1 ? t.d >= l.len : t.d <= 0;
                    const dd = Math.min(l.len, Math.max(0, t.d));
                    const m = along(l.pts, dd);
                    const m2 = along(l.pts, Math.min(l.len, Math.max(0, dd + t.dir * 4)));
                    const p = project(m.x, m.y);
                    const q = project(m2.x, m2.y);
                    const ang = Math.atan2(q.y - p.y, q.x - p.x);
                    const s = p.s;
                    const a = Math.max(0.4, dim);
                    ctx.save();
                    ctx.translate(p.x, p.y);
                    // Shadow on the map
                    ctx.fillStyle = 'rgba(0, 0, 0, 0.35)';
                    ctx.beginPath();
                    ctx.ellipse(0, 3 * s, 11 * s, 4 * s, 0, 0, Math.PI * 2);
                    ctx.fill();
                    ctx.rotate(ang);
                    // Side, then roof, lifted off the track
                    ctx.fillStyle = `rgba(${t.color}, ${a * 0.55})`;
                    ctx.beginPath();
                    ctx.roundRect(-10 * s, -2 * s, 20 * s, 7 * s, 3.5 * s);
                    ctx.fill();
                    ctx.fillStyle = `rgba(${t.color}, ${a})`;
                    ctx.beginPath();
                    ctx.roundRect(-10 * s, -6 * s, 20 * s, 8 * s, 4 * s);
                    ctx.fill();
                    ctx.fillStyle = 'rgba(255, 255, 255, 0.85)';
                    ctx.fillRect(-5 * s, -3.5 * s, 3 * s, 3 * s);
                    ctx.fillRect(2 * s, -3.5 * s, 3 * s, 3 * s);
                    ctx.restore();
                    if (done) {
                        stations[t.dir === 1 ? l.b : l.a].blink = 1;
                        trains.splice(i, 1);
                    }
                }
            }

            // Stations: pillars standing on the map, drawn back to front.
            const named = labels && w >= 1024;
            const order = stations
                .map((s) => ({ s, p: project(s.x, s.y) }))
                .sort((A, B) => A.p.y - B.p.y);
            for (const { s, p } of order) {
                s.blink = Math.max(0, s.blink - dt * 2.2);
                const near = Math.max(0, 1 - Math.hypot(p.x - mouse.x, p.y - mouse.y) / 140);
                const lit = Math.max(dim, s.focus);
                const sc2 = p.s;
                const rx = (s.hub ? 15 : 7.5) * sc2 * (1 + s.focus * 0.2);
                const ry = rx * Math.cos(TILT) * (s.hub ? 0.75 : 1);
                const height = ((s.hub ? 16 : 11) + s.focus * 12 + near * 8 + s.blink * 5) * sc2;
                const ring = s.blink > 0.05 || s.focus > 0.5 ? '255, 255, 255' : COLORS[s.side];
                const topY = p.y - height;

                // Shadow on the map
                ctx.fillStyle = `rgba(0, 0, 0, ${0.45 * lit})`;
                ctx.beginPath();
                ctx.ellipse(p.x + 3 * sc2, p.y + 2 * sc2, rx * 1.15, ry * 1.15, 0, 0, Math.PI * 2);
                ctx.fill();
                // Pillar side
                ctx.fillStyle = `rgba(${COLORS[s.side]}, ${0.35 * lit + s.focus * 0.3})`;
                ctx.beginPath();
                ctx.ellipse(p.x, p.y, rx, ry, 0, 0, Math.PI);
                ctx.lineTo(p.x - rx, topY);
                ctx.ellipse(p.x, topY, rx, ry, 0, Math.PI, 0, true);
                ctx.closePath();
                ctx.fill();
                // Top: dark face with a coloured ring
                ctx.fillStyle = '#0d0e13';
                ctx.strokeStyle = `rgba(${ring}, ${Math.min(1, 0.6 * lit + s.focus * 0.4 + s.blink * 0.4)})`;
                ctx.lineWidth = (s.hub ? 2.6 : 2) * sc2;
                ctx.beginPath();
                ctx.ellipse(p.x, topY, rx, ry, 0, 0, Math.PI * 2);
                ctx.fill();
                ctx.stroke();

                // Names: all of them in the hero; in a scene, only the ones in focus.
                // Never inside the headline's ellipse, where a name would sit behind text.
                const inHeadline = clearCenter && ((p.x / w - 0.5) / 0.26) ** 2 + ((p.y / h - 0.44) / 0.34) ** 2 < 1;
                const showName = !inHeadline && ((named && s.label) || (s.focus > 0.05 && w >= 420));
                if (showName) {
                    const a = named ? (s.hub ? 0.7 : 0.45) * Math.max(lit, 0.6) + near * 0.3 : s.focus;
                    ctx.font = `${s.hub || s.focus > 0.5 ? 600 : 500} ${Math.round((s.hub ? 13 : 12) * Math.min(1.1, sc2))}px Inter, 'Inter Tight', system-ui, sans-serif`;
                    ctx.textAlign = 'center';
                    ctx.fillStyle = `rgba(255, 255, 255, ${a})`;
                    ctx.fillText(s.label, p.x, p.y + ry + 16 * sc2);
                }
            }
        };

        const frame = (now: number) => {
            const dt = Math.min(0.05, (now - last) / 1000 || 0);
            last = now;
            spawnAcc += dt;
            const every = (w < 768 ? 0.6 : 0.32) / Math.max(0.02, sceneRef.current?.rate ?? 1);
            while (spawnAcc > every) { spawn(); spawnAcc -= every; }
            if (trains.length > 40) trains.splice(0, trains.length - 40);
            draw(dt);
            raf = requestAnimationFrame(frame);
        };

        const start = () => {
            if (reduced || raf || !visible || document.hidden) return;
            last = performance.now();
            raf = requestAnimationFrame(frame);
        };
        const stop = () => { cancelAnimationFrame(raf); raf = 0; };

        build();
        draw(0);
        start();
        redrawRef.current = () => { if (!raf) draw(0); };

        const ro = new ResizeObserver(() => { build(); draw(0); });
        ro.observe(canvas);
        const io = new IntersectionObserver(([en]) => { visible = en.isIntersecting; if (visible) start(); else stop(); });
        io.observe(canvas);
        const onVis = () => (document.hidden ? stop() : start());
        document.addEventListener('visibilitychange', onVis);
        const onMove = (ev: MouseEvent) => {
            const r = canvas.getBoundingClientRect();
            mouse.x = ev.clientX - r.left;
            mouse.y = ev.clientY - r.top;
            // Sway toward the cursor: left of centre turns the map one way, right the other.
            yawTarget = reduced ? 0 : Math.max(-1, Math.min(1, (ev.clientX / window.innerWidth - 0.5) * 2)) * SWAY;
            if (reduced) draw(0);
        };
        window.addEventListener('mousemove', onMove, { passive: true });

        return () => {
            stop();
            redrawRef.current = () => {};
            ro.disconnect();
            io.disconnect();
            document.removeEventListener('visibilitychange', onVis);
            window.removeEventListener('mousemove', onMove);
        };
    }, [labels, clearCenter, fit]);

    return <canvas ref={ref} className={`pointer-events-none select-none ${className}`} aria-hidden="true" />;
}
