import { prefersReducedMotion } from '@/lib/motion';
import { useEffect, useRef } from 'react';

/**
 * Hero backdrop: a live network. The real pieces of CoolDesk (browsers →
 * extension ⇄ your machine ⇄ desktop app → its features)
 * sit among drifting ambient nodes, and packets of "data" stream along the
 * links — browser tabs into the extension, on to the app, "jump to tab" back.
 * Nodes pulse as packets land; things near the cursor brighten.
 *
 * Canvas, DPR-aware, paused off-screen / in hidden tabs. Reduced motion gets a
 * single still frame. Decorative: aria-hidden, no pointer events.
 */

type Side = 'ext' | 'app' | 'link' | 'neutral';

interface Node {
    x: number; y: number; // current px
    bx: number; by: number; // base px (drift is around this)
    vx: number; vy: number;
    r: number;
    side: Side;
    key?: string;
    label?: string;
    hub?: boolean;
    glow: number; // 0..1, bumps when a packet lands
}

interface Edge { a: number; b: number; side: Side; key: boolean; bend: number; dir?: 1 | -1 }

interface Packet { e: number; t: number; speed: number; dir: 1 | -1; color: string }

interface Pulse { x: number; y: number; r: number; a: number; color: string }

const COLORS: Record<Side, string> = {
    ext: '56, 189, 248', // sky
    app: '167, 139, 250', // violet
    link: '52, 211, 153', // emerald
    neutral: '226, 232, 240',
};

// Product nodes, as fractions of the canvas. The centre (headline) is left clear.
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
    { key: 'projects', label: 'Projects', x: 0.94, y: 0.27, side: 'app' },
    { key: 'files', label: 'File manager', x: 0.96, y: 0.5, side: 'app' },
    { key: 'layouts', label: 'Layouts', x: 0.93, y: 0.72, side: 'app' },
    { key: 'agent', label: 'AI agent', x: 0.76, y: 0.8, side: 'app' },
];

const KEY_EDGES: [string, string, Side][] = [
    ['chrome', 'ext', 'ext'], ['edge', 'ext', 'ext'], ['brave', 'ext', 'ext'],
    ['ext', 'widgets', 'ext'], ['ext', 'activity', 'ext'], ['ext', 'favorites', 'ext'],
    ['ext', 'local', 'link'], ['local', 'app', 'link'],
    ['app', 'spotlight', 'app'], ['app', 'projects', 'app'], ['app', 'files', 'app'], ['app', 'layouts', 'app'], ['app', 'agent', 'app'],
];

// Keep ambient nodes out of an ellipse around the headline.
const inCentre = (fx: number, fy: number) => ((fx - 0.5) / 0.3) ** 2 + ((fy - 0.46) / 0.34) ** 2 < 1;

export default function NetworkBackdrop({ className = '' }: { className?: string }) {
    const ref = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = ref.current;
        const ctx = canvas?.getContext('2d');
        if (!canvas || !ctx) return;

        const reduced = prefersReducedMotion();
        let w = 0, h = 0, dpr = 1, raf = 0, last = 0, spawnAcc = 0;
        let nodes: Node[] = [];
        let edges: Edge[] = [];
        let packets: Packet[] = [];
        let pulses: Pulse[] = [];
        let visible = true;
        const mouse = { x: -9999, y: -9999 };
        // Seeded random so the layout is stable across resizes.
        let seed = 7;
        const rand = () => { seed = (seed * 16807) % 2147483647; return (seed - 1) / 2147483646; };

        const build = () => {
            dpr = Math.min(window.devicePixelRatio || 1, 2);
            w = canvas.clientWidth;
            h = canvas.clientHeight;
            canvas.width = Math.round(w * dpr);
            canvas.height = Math.round(h * dpr);
            ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
            seed = 7;

            const small = w < 768;
            nodes = KEY_NODES.map((k) => {
                const x = k.x * w, y = k.y * h;
                return { x, y, bx: x, by: y, vx: 0, vy: 0, r: k.hub ? 5.5 : 3, side: k.side, key: k.key, label: k.label, hub: k.hub, glow: 0 };
            });
            const count = small ? 16 : 44;
            let guard = 0;
            while (nodes.length < KEY_NODES.length + count && guard++ < 2000) {
                const fx = rand(), fy = rand();
                if (inCentre(fx, fy)) continue;
                const x = fx * w, y = fy * h;
                const side: Side = fx < 0.42 ? 'ext' : fx > 0.58 ? 'app' : 'neutral';
                nodes.push({ x, y, bx: x, by: y, vx: 0, vy: 0, r: 1.1 + rand() * 1.1, side, glow: 0 });
            }

            const idx = (key: string) => nodes.findIndex((n) => n.key === key);
            edges = KEY_EDGES.map(([a, b, side]) => ({ a: idx(a), b: idx(b), side, key: true, bend: (rand() - 0.5) * 0.25 }));
            // Ambient mesh: each ambient node links to its 2 nearest neighbours.
            const seen = new Set(edges.map((e) => `${Math.min(e.a, e.b)}-${Math.max(e.a, e.b)}`));
            for (let i = KEY_NODES.length; i < nodes.length; i++) {
                const near = nodes
                    .map((n, j) => ({ j, d: (n.bx - nodes[i].bx) ** 2 + (n.by - nodes[i].by) ** 2 }))
                    .filter((o) => o.j !== i)
                    .sort((p, q) => p.d - q.d)
                    .slice(0, 2);
                for (const { j } of near) {
                    const id = `${Math.min(i, j)}-${Math.max(i, j)}`;
                    if (seen.has(id)) continue;
                    seen.add(id);
                    edges.push({ a: i, b: j, side: nodes[i].side, key: false, bend: (rand() - 0.5) * 0.3 });
                }
            }
            packets = [];
            pulses = [];
        };

        // Quadratic curve between two nodes with a perpendicular bend.
        const control = (e: Edge) => {
            const A = nodes[e.a], B = nodes[e.b];
            const mx = (A.x + B.x) / 2, my = (A.y + B.y) / 2;
            const dx = B.x - A.x, dy = B.y - A.y;
            return { A, B, cx: mx - dy * e.bend, cy: my + dx * e.bend };
        };
        const pointAt = (e: Edge, t: number) => {
            const { A, B, cx, cy } = control(e);
            const u = 1 - t;
            return { x: u * u * A.x + 2 * u * t * cx + t * t * B.x, y: u * u * A.y + 2 * u * t * cy + t * t * B.y };
        };
        const edgeLen = (e: Edge) => Math.hypot(nodes[e.b].x - nodes[e.a].x, nodes[e.b].y - nodes[e.a].y) || 1;

        const spawn = () => {
            const r = rand();
            let e: number, dir: 1 | -1, color: string;
            if (r < 0.34) {
                // The headline story: tabs flow ext → app (sky), "jump to tab" flows back (violet).
                const toApp = rand() < 0.6;
                e = rand() < 0.5 ? 6 : 7; // ext-local, local-app
                dir = toApp ? 1 : -1;
                color = toApp ? COLORS.ext : COLORS.app;
            } else if (r < 0.8) {
                e = Math.floor(rand() * KEY_EDGES.length);
                const ed = edges[e];
                // Browsers feed the extension; the app feeds its features.
                dir = e < 3 ? 1 : ed.side === 'ext' ? -1 : 1;
                if (e === 6 || e === 7) dir = 1;
                color = COLORS[ed.side === 'link' ? 'link' : ed.side];
            } else {
                e = KEY_EDGES.length + Math.floor(rand() * Math.max(1, edges.length - KEY_EDGES.length));
                if (!edges[e]) return;
                dir = rand() < 0.5 ? 1 : -1;
                color = COLORS[edges[e].side];
            }
            packets.push({ e, t: dir === 1 ? 0 : 1, speed: 150 + rand() * 120, dir, color });
        };

        const draw = (dt: number) => {
            ctx.clearRect(0, 0, w, h);

            // Drift ambient nodes gently around their base position.
            if (!reduced) {
                for (let i = KEY_NODES.length; i < nodes.length; i++) {
                    const n = nodes[i];
                    n.vx += (rand() - 0.5) * 6 * dt - (n.x - n.bx) * 0.6 * dt;
                    n.vy += (rand() - 0.5) * 6 * dt - (n.y - n.by) * 0.6 * dt;
                    n.vx *= 0.98; n.vy *= 0.98;
                    n.x += n.vx * dt * 10; n.y += n.vy * dt * 10;
                }
            }

            const near = (x: number, y: number) => Math.max(0, 1 - Math.hypot(x - mouse.x, y - mouse.y) / 180);

            // Edges
            for (const e of edges) {
                const { A, B, cx, cy } = control(e);
                const hot = Math.max(near(A.x, A.y), near(B.x, B.y));
                const base = e.key ? (e.side === 'link' ? 0.32 : 0.2) : 0.08;
                ctx.strokeStyle = `rgba(${COLORS[e.side]}, ${base + hot * 0.3})`;
                ctx.lineWidth = e.key ? (e.side === 'link' ? 1.6 : 1.1) : 0.7;
                ctx.beginPath();
                ctx.moveTo(A.x, A.y);
                ctx.quadraticCurveTo(cx, cy, B.x, B.y);
                ctx.stroke();
            }

            // Packets
            if (!reduced) {
                for (let i = packets.length - 1; i >= 0; i--) {
                    const p = packets[i];
                    const e = edges[p.e];
                    p.t += (p.dir * p.speed * dt) / edgeLen(e);
                    const done = p.dir === 1 ? p.t >= 1 : p.t <= 0;
                    const t = Math.min(1, Math.max(0, p.t));
                    const head = pointAt(e, t);
                    const tail = pointAt(e, Math.min(1, Math.max(0, t - p.dir * 0.12)));
                    const grad = ctx.createLinearGradient(tail.x, tail.y, head.x, head.y);
                    grad.addColorStop(0, `rgba(${p.color}, 0)`);
                    grad.addColorStop(1, `rgba(${p.color}, 0.9)`);
                    ctx.strokeStyle = grad;
                    ctx.lineWidth = 2;
                    ctx.lineCap = 'round';
                    ctx.beginPath();
                    ctx.moveTo(tail.x, tail.y);
                    ctx.lineTo(head.x, head.y);
                    ctx.stroke();
                    ctx.fillStyle = `rgba(${p.color}, 1)`;
                    ctx.shadowColor = `rgba(${p.color}, 0.9)`;
                    ctx.shadowBlur = 10;
                    ctx.beginPath();
                    ctx.arc(head.x, head.y, 2.1, 0, Math.PI * 2);
                    ctx.fill();
                    ctx.shadowBlur = 0;
                    if (done) {
                        const n = nodes[p.dir === 1 ? e.b : e.a];
                        n.glow = 1;
                        if (n.key) pulses.push({ x: n.x, y: n.y, r: n.r, a: 0.55, color: p.color });
                        packets.splice(i, 1);
                    }
                }
                for (let i = pulses.length - 1; i >= 0; i--) {
                    const q = pulses[i];
                    q.r += 38 * dt;
                    q.a -= 0.9 * dt;
                    if (q.a <= 0) { pulses.splice(i, 1); continue; }
                    ctx.strokeStyle = `rgba(${q.color}, ${q.a})`;
                    ctx.lineWidth = 1.2;
                    ctx.beginPath();
                    ctx.arc(q.x, q.y, q.r, 0, Math.PI * 2);
                    ctx.stroke();
                }
            }

            // Nodes
            const showLabels = w >= 1024;
            for (const n of nodes) {
                const hot = near(n.x, n.y);
                n.glow = Math.max(0, n.glow - dt * 1.6);
                const c = COLORS[n.side];
                const bright = n.key ? 0.75 : 0.35;
                if (n.key) {
                    const halo = ctx.createRadialGradient(n.x, n.y, 0, n.x, n.y, n.hub ? 34 : 16);
                    halo.addColorStop(0, `rgba(${c}, ${0.22 + n.glow * 0.3 + hot * 0.2})`);
                    halo.addColorStop(1, `rgba(${c}, 0)`);
                    ctx.fillStyle = halo;
                    ctx.beginPath();
                    ctx.arc(n.x, n.y, n.hub ? 34 : 16, 0, Math.PI * 2);
                    ctx.fill();
                }
                ctx.fillStyle = `rgba(${c}, ${Math.min(1, bright + n.glow * 0.4 + hot * 0.4)})`;
                ctx.beginPath();
                ctx.arc(n.x, n.y, n.r + n.glow * 1.2, 0, Math.PI * 2);
                ctx.fill();
                if (showLabels && n.label) {
                    ctx.font = `${n.hub ? 600 : 500} ${n.hub ? 13 : 11}px Inter, 'Inter Tight', system-ui, sans-serif`;
                    ctx.textAlign = 'center';
                    ctx.fillStyle = `rgba(255, 255, 255, ${(n.hub ? 0.55 : 0.32) + hot * 0.35})`;
                    ctx.fillText(n.label, n.x, n.y + (n.hub ? 30 : 18));
                }
            }
        };

        const frame = (now: number) => {
            const dt = Math.min(0.05, (now - last) / 1000 || 0);
            last = now;
            spawnAcc += dt;
            const every = w < 768 ? 0.22 : 0.09;
            while (spawnAcc > every) { spawn(); spawnAcc -= every; }
            if (packets.length > 90) packets.splice(0, packets.length - 90);
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
            if (reduced) draw(0);
        };
        window.addEventListener('mousemove', onMove, { passive: true });

        return () => {
            stop();
            ro.disconnect();
            io.disconnect();
            document.removeEventListener('visibilitychange', onVis);
            window.removeEventListener('mousemove', onMove);
        };
    }, []);

    return <canvas ref={ref} className={`pointer-events-none select-none ${className}`} aria-hidden="true" />;
}
