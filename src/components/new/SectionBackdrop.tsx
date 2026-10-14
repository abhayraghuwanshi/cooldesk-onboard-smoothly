import type { CSSProperties } from 'react';
import './section-backdrop.css';

/**
 * The hero's galaxy, carried on quietly behind a section, so the whole page
 * reads as one stretch of space. Always sparse star dust, plus a scene:
 *
 *   orbits         two faint orbit arcs and a glow where the visual sits
 *   constellation  a few stars joined by faint lines (the AI section)
 *   dust           nothing else (text-heavy sections)
 *
 * Place it inside a `relative isolate` section; it bleeds 6rem above and
 * below and fades out at both ends, so sections blend with no visible edge.
 * Decorative.
 */

type Variant = 'orbits' | 'constellation' | 'dust';

function rng(seed: number) {
    let s = seed;
    return () => {
        s = (s * 16807) % 2147483647;
        return (s - 1) / 2147483646;
    };
}

/** Star dust, seeded so prerender and client agree. */
const DUST = (() => {
    const r = rng(31);
    return Array.from({ length: 70 }, () => ({
        x: r() * 100,
        y: r() * 100,
        size: r() < 0.85 ? 1 : 1.5,
        o: 0.15 + r() * 0.45,
        delay: -r() * 5,
    }));
})();

/**
 * Constellation: stars in a 1440×900 box, each joined to its nearest
 * neighbours. Kept to the outer thirds, clear of the middle band, so the
 * lines never cross the copy.
 */
const STARS = (() => {
    const r = rng(77);
    const pts = Array.from({ length: 14 }, (_, i) => ({
        x: i % 2 ? 1080 + r() * 300 : 60 + r() * 300,
        // Above or below the middle band, where a section's cards usually sit.
        y: i % 4 < 2 ? 70 + r() * 300 : 640 + r() * 200,
        size: 2 + r() * 2.5,
        delay: -(i * 0.7),
    }));
    const seen = new Set<string>();
    const lines: { x1: number; y1: number; x2: number; y2: number }[] = [];
    pts.forEach((p, i) => {
        // Two nearest neighbours, so it reads as a figure rather than a chain.
        pts.map((q, j) => ({ j, d: (p.x - q.x) ** 2 + (p.y - q.y) ** 2 }))
            .filter(({ j }) => j !== i)
            .sort((a, b) => a.d - b.d)
            .slice(0, 2)
            .forEach(({ j }) => {
                const key = [i, j].sort().join('-');
                if (seen.has(key)) return;
                seen.add(key);
                lines.push({ x1: p.x, y1: p.y, x2: pts[j].x, y2: pts[j].y });
            });
    });
    return { pts, lines };
})();

type Vars = CSSProperties & Record<`--${string}`, string | number>;

/** Just the twinkling star dust, for surfaces that bring their own scene (the footer). */
export function StarDust() {
    return (
        <>
            {DUST.map((d, i) => (
                <span key={i} className="sb-dust" style={{ left: `${d.x}%`, top: `${d.y}%`, width: d.size, height: d.size, '--o': d.o.toFixed(2), animationDelay: `${d.delay.toFixed(2)}s` } as Vars} />
            ))}
        </>
    );
}

/**
 * `glow`: Tailwind position and size classes for the glow (orbits only),
 * e.g. "left-[2%] top-[320px] h-[640px] w-[900px]". `tint`: its colour.
 */
export default function SectionBackdrop({
    variant = 'orbits',
    glow = 'left-1/2 top-[300px] h-[480px] w-[1000px] -ml-[500px]',
    tint = 'rgba(125,211,252,0.14)',
}: {
    variant?: Variant;
    glow?: string;
    tint?: string;
}) {
    return (
        <div className="pointer-events-none absolute -inset-y-24 inset-x-0 -z-10 overflow-hidden [mask-image:linear-gradient(to_bottom,transparent,black_12%,black_80%,transparent)]" aria-hidden="true">
            <StarDust />

            {variant === 'orbits' && (
                <>
                    <div className="absolute left-1/2 top-[300px] h-[2000px] w-[2000px] -ml-[1000px] rounded-full border border-white/[0.06]" />
                    <div className="absolute left-1/2 top-[380px] h-[2600px] w-[2600px] -ml-[1300px] rounded-full border border-white/[0.035]" />
                    <div className={`absolute ${glow} rounded-full`} style={{ background: `radial-gradient(closest-side, ${tint}, transparent)` }} />
                </>
            )}

            {variant === 'constellation' && (
                <svg className="absolute inset-0 h-full w-full" viewBox="0 0 1440 900" preserveAspectRatio="xMidYMid slice">
                    <defs>
                        <radialGradient id="sb-star">
                            <stop offset="0%" stopColor="#ffffff" />
                            <stop offset="35%" stopColor="#c4b5fd" stopOpacity="0.8" />
                            <stop offset="100%" stopColor="#c4b5fd" stopOpacity="0" />
                        </radialGradient>
                    </defs>
                    {STARS.lines.map((l, i) => (
                        <line key={i} className="sb-link" x1={l.x1} y1={l.y1} x2={l.x2} y2={l.y2} style={{ animationDelay: `${-i * 0.6}s` }} />
                    ))}
                    {STARS.pts.map((p, i) => (
                        <circle key={i} className="sb-node" cx={p.x} cy={p.y} r={p.size * 3} fill="url(#sb-star)" style={{ animationDelay: `${p.delay}s` }} />
                    ))}
                </svg>
            )}
        </div>
    );
}
