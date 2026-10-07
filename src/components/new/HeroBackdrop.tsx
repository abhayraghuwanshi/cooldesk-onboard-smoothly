import { AppWindow, FileText, Globe } from 'lucide-react';

/**
 * Hero backdrop: one calm photo, darkened so the headline reads, fading into
 * the page at the bottom. The photo is one of CoolDesk's own built-in
 * wallpapers (cooldesk-extension/src/shared/data/wallpapers.js, from
 * Unsplash), self-hosted in public/images. On wide screens a few glass space
 * cards float either side of the headline, the thing the headline is about.
 *
 * Decorative: aria-hidden, no pointer events. The cards' bob stops under
 * prefers-reduced-motion (index.css).
 */

export const HERO_WALLPAPER = '/images/hero-mountain-sunset.jpg';

interface SpaceCard {
    name: string;
    emoji: string;
    tabs: number;
    apps: number;
    files: number;
    pos: string; // absolute position classes
    tilt: string;
    delay: string;
}

const CARDS: SpaceCard[] = [
    { name: 'Thesis', emoji: '📚', tabs: 12, apps: 2, files: 8, pos: 'left-[4%] top-[140px]', tilt: '-rotate-3', delay: '0s' },
    { name: 'Client · Acme', emoji: '💼', tabs: 7, apps: 3, files: 4, pos: 'left-[8%] top-[380px]', tilt: 'rotate-2', delay: '-2s' },
    { name: 'Side project', emoji: '🚀', tabs: 9, apps: 4, files: 11, pos: 'right-[4%] top-[160px]', tilt: 'rotate-3', delay: '-1s' },
    { name: 'Taxes 2026', emoji: '🧾', tabs: 3, apps: 1, files: 6, pos: 'right-[8%] top-[400px]', tilt: '-rotate-2', delay: '-3s' },
];

function Card({ c }: { c: SpaceCard }) {
    const stats = [
        { Icon: Globe, n: c.tabs, label: 'tabs' },
        { Icon: AppWindow, n: c.apps, label: 'apps' },
        { Icon: FileText, n: c.files, label: 'files' },
    ];
    return (
        <div className={`absolute ${c.pos} ${c.tilt}`}>
            <div
                className="w-52 rounded-2xl border border-white/15 bg-black/35 p-4 text-left backdrop-blur-xl shadow-[0_20px_60px_-24px_rgba(0,0,0,0.9)] animate-bob"
                style={{ animationDelay: c.delay }}
            >
                <div className="flex items-center gap-2.5">
                    <span className="grid h-8 w-8 place-items-center rounded-xl bg-white/10 text-base">{c.emoji}</span>
                    <span className="text-sm font-semibold text-white/90">{c.name}</span>
                </div>
                {/* A few stand-in tab favicons */}
                <div className="mt-3 flex gap-1.5">
                    {[0.22, 0.16, 0.12, 0.08].map((a, i) => (
                        <span key={i} className="h-5 flex-1 rounded-md" style={{ background: `rgba(255, 255, 255, ${a})` }} />
                    ))}
                </div>
                <div className="mt-3 flex items-center justify-between text-[11px] text-white/55">
                    {stats.map(({ Icon, n, label }) => (
                        <span key={label} className="inline-flex items-center gap-1">
                            <Icon className="h-3 w-3" />
                            {n} {label}
                        </span>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default function HeroBackdrop() {
    return (
        <div className="pointer-events-none absolute inset-0 -z-10 select-none overflow-hidden [mask-image:linear-gradient(to_bottom,black_70%,transparent)]" aria-hidden="true">
            <img
                src={HERO_WALLPAPER}
                alt=""
                {...{ fetchpriority: 'high' }} // React 18 only knows the lowercase HTML attribute
                decoding="async"
                className="absolute inset-0 h-full w-full object-cover object-center"
            />
            {/* Darken evenly, and a touch more behind the headline; the mask above fades it into the page */}
            <div className="absolute inset-0 bg-black/55" />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_55%_45%_at_50%_40%,rgba(0,0,0,0.35),transparent_75%)]" />

            {/* Spaces either side of the headline; only where there's room for them */}
            <div className="absolute inset-x-0 top-0 hidden h-full xl:block">
                {CARDS.map((c) => (
                    <Card key={c.name} c={c} />
                ))}
            </div>
        </div>
    );
}
