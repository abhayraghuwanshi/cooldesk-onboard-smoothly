import { useEffect, useRef, useState, type CSSProperties } from 'react';
import './hero-backdrop.css';

/**
 * Hero backdrop: "some space" taken literally. A spiral galaxy seen at an
 * angle sits low like a horizon, with orbits in its plane, star fields at three
 * depths and nebulae in the corners. On wide screens four space cards float
 * either side of the headline, tabs flying in and settling into them.
 *
 * All of it is DOM + CSS, no images or video: sharp at any resolution and a
 * few KB. Positions come from seeded random numbers, so the prerendered HTML
 * and the client render match.
 *
 * The palette follows the visitor's clock (dawn 05–08, day 08–17, dusk 17–20,
 * night otherwise), picked after mount since the prerender can't know the
 * time, so the scene fades in. ?wallpaper=dawn|day|dusk|night previews one.
 *
 * Motion: the disk turns once every 5 minutes, planets orbit, stars twinkle,
 * and with a mouse the layers shift by depth (parallax). All of it stops
 * under prefers-reduced-motion (hero-backdrop.css).
 *
 * Decorative: aria-hidden, no pointer events.
 */

type Scene = 'dawn' | 'day' | 'dusk' | 'night';

interface Palette {
    label: string;
    ground: string;
    glowA: string;
    glowB: string;
    core: string;
    coreGlow: string;
    arm: string[];
    accent: string;
    chips: string[];
}

const SCENES: Record<Scene, Palette> = {
    night: { label: 'Night', ground: '#03040a', glowA: '#3446d8', glowB: '#7c3aed', core: '#ffe9c7', coreGlow: 'rgba(255,214,170,0.55)', arm: ['#8fb4ff', '#b79cff', '#7ee0ff'], accent: '#a8d8ff', chips: ['#7dd3fc', '#a5b4fc', '#5eead4', '#c4b5fd'] },
    dawn: { label: 'Dawn', ground: '#07040a', glowA: '#c2557a', glowB: '#f0a15a', core: '#fff1d6', coreGlow: 'rgba(255,190,150,0.55)', arm: ['#ffb4c8', '#ffd09a', '#ff9fb0'], accent: '#ffd2b0', chips: ['#fda4af', '#fdba74', '#fde68a', '#f9a8d4'] },
    day: { label: 'Day', ground: '#030a10', glowA: '#1f7fc4', glowB: '#14b8a6', core: '#f0fbff', coreGlow: 'rgba(170,230,255,0.55)', arm: ['#8be3ff', '#7ef0d6', '#b6d8ff'], accent: '#b8f0ff', chips: ['#67e8f9', '#7dd3fc', '#6ee7b7', '#bae6fd'] },
    dusk: { label: 'Dusk', ground: '#07030a', glowA: '#9d3fc0', glowB: '#e8673a', core: '#ffe3c4', coreGlow: 'rgba(255,170,130,0.55)', arm: ['#f0abfc', '#ffb38a', '#c9a2ff'], accent: '#ffc49a', chips: ['#f0abfc', '#fdba74', '#fb923c', '#c4b5fd'] },
};

function sceneFor(hour: number): Scene {
    if (hour >= 5 && hour < 8) return 'dawn';
    if (hour >= 8 && hour < 17) return 'day';
    if (hour >= 17 && hour < 20) return 'dusk';
    return 'night';
}

/** The visitor's scene; null until mounted. */
function useScene() {
    const [scene, setScene] = useState<Scene | null>(null);
    useEffect(() => {
        const forced = new URLSearchParams(window.location.search).get('wallpaper');
        setScene(forced && forced in SCENES ? (forced as Scene) : sceneFor(new Date().getHours()));
    }, []);
    return scene;
}

/** Deterministic random numbers, so prerender and client agree. */
function rng(seed: number) {
    let s = seed;
    return () => {
        s = (s * 16807) % 2147483647;
        return (s - 1) / 2147483646;
    };
}

// ---------------------------------------------------------------- geometry
// Shapes only; colors are looked up per scene at render.

const DUST = (() => {
    const r = rng(99);
    return Array.from({ length: 140 }, () => ({
        x: r() * 100,
        y: r() * 100,
        size: r() < 0.85 ? 1 : 1.5,
        o: 0.2 + r() * 0.55,
        delay: -r() * 5,
    }));
})();

const BRIGHT = (() => {
    const r = rng(5);
    return Array.from({ length: 16 }, () => ({
        x: r() * 100,
        y: r() * 65,
        size: r() < 0.6 ? 2 : 3,
        o: 0.55 + r() * 0.45,
        delay: -r() * 5,
    }));
})();

/** Two spiral arms in the 1800×1800 disk: soft gas clouds and stars along them. */
const GALAXY = (() => {
    const r = rng(2026);
    const puffs: { x: number; y: number; size: number; tone: 'core' | 'a' | 'b'; o: number }[] = [];
    const stars: { x: number; y: number; size: number; tone: number; o: number }[] = [];
    for (let arm = 0; arm < 2; arm++) {
        for (let i = 0; i < 60; i++) {
            const t = i / 60;
            const ang = arm * Math.PI + t * 3.4 * Math.PI;
            const rad = 70 + t * 780;
            const jitter = 40 + t * 70;
            puffs.push({
                x: 900 + rad * Math.cos(ang) + (r() - 0.5) * jitter,
                y: 900 + rad * Math.sin(ang) + (r() - 0.5) * jitter,
                size: 70 + t * 150 + r() * 60,
                tone: t < 0.25 ? 'core' : i % 2 ? 'a' : 'b',
                o: 0.32 - t * 0.18 + r() * 0.08,
            });
        }
        for (let i = 0; i < 150; i++) {
            const t = r();
            const ang = arm * Math.PI + t * 3.4 * Math.PI + (r() - 0.5) * 0.5;
            const rad = 60 + t * 820;
            stars.push({
                x: 900 + rad * Math.cos(ang) + (r() - 0.5) * 60,
                y: 900 + rad * Math.sin(ang) + (r() - 0.5) * 60,
                size: r() < 0.8 ? 2 : 3,
                tone: i % 3,
                o: 0.4 + r() * 0.6,
            });
        }
    }
    return { puffs, stars };
})();

interface Space {
    name: string;
    stats: string;
    pos: string;
    tilt: string;
    delay: string;
    chips: { dx: number; dy: number; rot: number; delay: number }[];
}

const SPACES: Space[] = (() => {
    const r = rng(7);
    const base = [
        { name: 'Thesis', stats: '12 tabs · 2 apps · 8 files', pos: 'left-[4%] top-[140px]', tilt: '-rotate-3', delay: '0s', side: 1 },
        { name: 'Client · Acme', stats: '7 tabs · 3 apps · 4 files', pos: 'left-[8%] top-[420px]', tilt: 'rotate-2', delay: '-3s', side: 1 },
        { name: 'Side project', stats: '9 tabs · 4 apps · 11 files', pos: 'right-[4%] top-[160px]', tilt: 'rotate-3', delay: '-1.5s', side: -1 },
        { name: 'Taxes 2026', stats: '3 tabs · 1 app · 6 files', pos: 'right-[8%] top-[440px]', tilt: '-rotate-2', delay: '-4.5s', side: -1 },
    ];
    return base.map(({ side, ...s }) => ({
        ...s,
        chips: Array.from({ length: 6 }, () => ({
            dx: side * (160 + r() * 260),
            dy: (r() - 0.5) * 360,
            rot: (r() - 0.5) * 50,
            delay: -r() * 11,
        })),
    }));
})();

// --------------------------------------------------------------- rendering

type Vars = CSSProperties & Record<`--${string}`, string | number>;

const px = (n: number) => `${Math.round(n)}px`;

function SpaceCard({ s, glow, chips }: { s: Space; glow: string; chips: string[] }) {
    return (
        <div className={`hb-space absolute ${s.pos} w-[232px]`} style={{ animationDelay: s.delay }}>
            <div
                className={`hb-card ${s.tilt} rounded-[18px] border border-white/[0.13] bg-[rgba(8,9,18,0.5)] p-3.5 backdrop-blur-xl`}
                style={{ '--g': glow, animationDelay: s.delay } as Vars}
            >
                <div className="flex items-center gap-2.5">
                    <span className="h-2.5 w-2.5 rounded-full" style={{ background: glow, boxShadow: `0 0 12px ${glow}` }} />
                    <span className="text-[13px] font-semibold text-white/90">{s.name}</span>
                </div>
                <div className="mt-3 grid grid-cols-2 gap-[7px]">
                    {s.chips.map((c, i) => (
                        <div
                            key={i}
                            className="hb-chip"
                            style={{ '--c': chips[i % chips.length], '--dx': px(c.dx), '--dy': px(c.dy), '--rot': `${Math.round(c.rot)}deg`, animationDelay: `${c.delay.toFixed(2)}s` } as Vars}
                        />
                    ))}
                </div>
                <div className="mt-3 font-mono text-[10.5px] text-white/45">{s.stats}</div>
            </div>
        </div>
    );
}

export default function HeroBackdrop() {
    const scene = useScene();
    const p = SCENES[scene ?? 'night'];
    const rootRef = useRef<HTMLDivElement>(null);

    // Parallax: only with a real mouse and when motion is welcome. Writes two
    // CSS variables, once per frame, so React never re-renders for it.
    useEffect(() => {
        const root = rootRef.current;
        if (!root) return;
        if (!window.matchMedia('(pointer: fine)').matches) return;
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
        let frame = 0;
        let mx = 0;
        let my = 0;
        const apply = () => {
            frame = 0;
            root.style.setProperty('--mx', mx.toFixed(3));
            root.style.setProperty('--my', my.toFixed(3));
        };
        const onMove = (e: MouseEvent) => {
            mx = (e.clientX / window.innerWidth) * 2 - 1;
            my = (e.clientY / window.innerHeight) * 2 - 1;
            if (!frame) frame = requestAnimationFrame(apply);
        };
        window.addEventListener('mousemove', onMove, { passive: true });
        return () => {
            window.removeEventListener('mousemove', onMove);
            if (frame) cancelAnimationFrame(frame);
        };
    }, []);

    const puffColor = { core: p.coreGlow, a: p.glowA, b: p.glowB };

    return (
        <div
            ref={rootRef}
            className="hb-root pointer-events-none absolute inset-0 -z-10 select-none overflow-hidden bg-[#07070a] [mask-image:linear-gradient(to_bottom,black_75%,transparent)]"
            aria-hidden="true"
        >
            <div
                className={`absolute inset-0 transition-opacity duration-1000 ${scene ? 'opacity-100' : 'opacity-0'}`}
                style={{ background: p.ground }}
            >
                {/* Far: star dust and nebulae */}
                <div className="hb-layer" style={{ '--d': 10 } as Vars}>
                    <div className="hb-nebula absolute -left-[220px] -top-[200px] h-[700px] w-[900px] rounded-full opacity-[0.38]" style={{ background: `radial-gradient(closest-side, ${p.glowA}, transparent)` }} />
                    <div className="hb-nebula absolute -right-[260px] -top-[120px] h-[640px] w-[860px] rounded-full opacity-30" style={{ background: `radial-gradient(closest-side, ${p.glowB}, transparent)`, animationDelay: '-18s' }} />
                    {DUST.map((s, i) => (
                        <span key={i} className="hb-star" style={{ left: `${s.x}%`, top: `${s.y}%`, width: s.size, height: s.size, '--o': s.o.toFixed(2), animationDelay: `${s.delay.toFixed(2)}s` } as Vars} />
                    ))}
                </div>

                {/* Mid: the galaxy, low like a horizon */}
                <div className="hb-layer" style={{ '--d': 22 } as Vars}>
                    <div className="hb-galaxy">
                        <div className="hb-disk">
                            <div className="hb-spin">
                                {GALAXY.puffs.map((g, i) => (
                                    <span
                                        key={i}
                                        className="hb-puff"
                                        style={{ left: px(g.x - g.size / 2), top: px(g.y - g.size / 2), width: px(g.size), height: px(g.size), opacity: g.o.toFixed(2), background: `radial-gradient(closest-side, ${puffColor[g.tone]}, transparent)` }}
                                    />
                                ))}
                                {GALAXY.stars.map((a, i) => (
                                    <span key={i} className="hb-dot" style={{ left: px(a.x), top: px(a.y), width: a.size, height: a.size, opacity: a.o.toFixed(2), background: p.arm[a.tone] }} />
                                ))}
                            </div>
                            {/* Orbits in the galaxy's plane, each with a planet */}
                            <div className="left-1/2 top-1/2 -ml-[620px] -mt-[620px] h-[1240px] w-[1240px] rounded-full border border-white/10" />
                            <div className="hb-orbit -ml-[620px] -mt-[620px] h-[1240px] w-[1240px]">
                                <span className="absolute left-1/2 -top-[9px] -ml-[9px] h-[18px] w-[18px] rounded-full" style={{ background: p.accent, boxShadow: `0 0 24px ${p.accent}` }} />
                            </div>
                            <div className="left-1/2 top-1/2 -ml-[820px] -mt-[820px] h-[1640px] w-[1640px] rounded-full border border-white/[0.06]" />
                            <div className="hb-orbit b -ml-[820px] -mt-[820px] h-[1640px] w-[1640px]">
                                <span className="absolute left-1/2 -bottom-[7px] -ml-[7px] h-[14px] w-[14px] rounded-full" style={{ background: p.glowB, boxShadow: `0 0 20px ${p.glowB}` }} />
                            </div>
                        </div>
                        {/* The bulge, drawn flat so it reads as a bright core */}
                        <div className="absolute -left-[380px] -top-[95px] h-[190px] w-[760px] rounded-full" style={{ background: `radial-gradient(closest-side, ${p.coreGlow}, transparent)` }} />
                        <div className="absolute -left-[130px] -top-[48px] h-[96px] w-[260px] rounded-full" style={{ background: `radial-gradient(closest-side, #ffffff, ${p.core} 45%, transparent)` }} />
                    </div>
                </div>

                {/* Near: bright stars and, where there's room, the spaces */}
                <div className="hb-layer" style={{ '--d': 34 } as Vars}>
                    {BRIGHT.map((b, i) => {
                        const c = i % 3 === 0 ? p.accent : '#ffffff';
                        return (
                            <span key={i} className="hb-star" style={{ left: `${b.x}%`, top: `${b.y}%`, width: b.size, height: b.size, background: c, boxShadow: `0 0 10px ${c}`, '--o': b.o.toFixed(2), animationDelay: `${b.delay.toFixed(2)}s` } as Vars} />
                        );
                    })}
                    <div className="absolute inset-x-0 top-0 hidden h-full xl:block">
                        {SPACES.map((s, i) => (
                            <SpaceCard key={s.name} s={s} glow={[p.glowA, p.accent, p.glowB, p.chips[3]][i]} chips={p.chips.slice(i).concat(p.chips.slice(0, i))} />
                        ))}
                    </div>
                </div>

                {/* Film grain so the glows never band */}
                <svg className="absolute inset-0 h-full w-full opacity-[0.08] mix-blend-overlay">
                    <filter id="hb-grain">
                        <feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves={2} stitchTiles="stitch" />
                    </filter>
                    <rect width="100%" height="100%" filter="url(#hb-grain)" />
                </svg>
            </div>

            {/* Readability: a soft shade behind the headline only */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_40%_32%_at_50%_42%,rgba(3,4,10,0.6),transparent_80%)]" />

            {/* Which scene is showing, like a dynamic desktop picture */}
            {scene && (
                <div className="absolute bottom-[30%] right-6 hidden items-center gap-2 rounded-full border border-white/10 bg-black/35 px-3 py-1 text-[11px] text-white/60 backdrop-blur-md md:flex">
                    <span className="h-[7px] w-[7px] rounded-full" style={{ background: p.accent }} />
                    {p.label} · follows your clock
                </div>
            )}
        </div>
    );
}
