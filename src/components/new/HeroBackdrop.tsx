import { AppWindow, FileText, Globe } from 'lucide-react';
import { useEffect, useState } from 'react';

/**
 * Hero backdrop: a live wallpaper that follows the visitor's clock, like
 * macOS dynamic wallpapers, darkened so the headline reads and fading into the
 * page at the bottom. On wide screens a few glass space cards float either
 * side of the headline, the thing the headline is about.
 *
 * Four scenes, all free Mixkit clips (Mixkit license, no attribution needed),
 * each cut to a seamless loop (its last 1.5–2 s crossfade into its start),
 * 1280×720, no audio, with its first frame as the still:
 *   dawn  05–08  4695  sea of clouds at sunrise           ~0.7 MB
 *   day   08–17  51102 white clouds across a blue sky     ~0.8 MB
 *   dusk  17–20  4205  sunset over the hills              ~2.0 MB
 *   night 20–05  4148  the Milky Way over mountains       ~2.0 MB
 * Only the current scene is ever downloaded.
 *
 * The scene is picked after mount (the prerendered HTML can't know the
 * visitor's time), so the page paints dark and the still fades in. The video
 * only plays where it's worth it: not on phones (data), not with Save-Data,
 * and not under prefers-reduced-motion; they keep the still. The cards' bob
 * also stops under prefers-reduced-motion (index.css).
 *
 * Decorative: aria-hidden, no pointer events.
 */

type Scene = 'dawn' | 'day' | 'dusk' | 'night';

/** Video speed: the clips are timelapses, so slow them to feel ambient. */
const PLAYBACK_RATE = 0.5;

const SCENES: Record<Scene, { label: string; icon: string; dim: string }> = {
    // `dim` is how much to darken: the bright day sky needs more than the night one.
    dawn: { label: 'Dawn', icon: '🌅', dim: 'bg-black/50' },
    day: { label: 'Day', icon: '☀️', dim: 'bg-black/60' },
    dusk: { label: 'Dusk', icon: '🌇', dim: 'bg-black/55' },
    night: { label: 'Night', icon: '🌙', dim: 'bg-black/35' },
};

function sceneFor(hour: number): Scene {
    if (hour >= 5 && hour < 8) return 'dawn';
    if (hour >= 8 && hour < 17) return 'day';
    if (hour >= 17 && hour < 20) return 'dusk';
    return 'night';
}

/** The visitor's scene, and whether to play it live. Null until mounted. */
function useWallpaper() {
    const [state, setState] = useState<{ scene: Scene; live: boolean } | null>(null);
    useEffect(() => {
        const saveData = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection?.saveData;
        const wide = window.matchMedia('(min-width: 768px)').matches;
        const calm = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        // ?wallpaper=night (or dawn/day/dusk) previews a scene without changing your clock.
        const forced = new URLSearchParams(window.location.search).get('wallpaper');
        const scene = forced && forced in SCENES ? (forced as Scene) : sceneFor(new Date().getHours());
        setState({ scene, live: wide && !calm && !saveData });
    }, []);
    return state;
}

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
    const wallpaper = useWallpaper();
    const [stillReady, setStillReady] = useState(false);
    const [playing, setPlaying] = useState(false);
    const scene = wallpaper ? SCENES[wallpaper.scene] : null;
    return (
        <div className="pointer-events-none absolute inset-0 -z-10 select-none overflow-hidden bg-[#07070a] [mask-image:linear-gradient(to_bottom,black_70%,transparent)]" aria-hidden="true">
            {wallpaper && (
                <img
                    src={`/images/hero-${wallpaper.scene}.jpg`}
                    alt=""
                    {...{ fetchpriority: 'high' }} // React 18 only knows the lowercase HTML attribute
                    decoding="async"
                    onLoad={() => setStillReady(true)}
                    className={`absolute inset-0 h-full w-full object-cover object-center transition-opacity duration-700 ${stillReady ? 'opacity-100' : 'opacity-0'}`}
                />
            )}
            {/* Fades in over the still once it's actually playing, so there's no flash.
                The clips are timelapses; half speed makes them ambient instead of busy. */}
            {wallpaper?.live && (
                <video
                    src={`/videos/hero-${wallpaper.scene}.mp4`}
                    autoPlay
                    muted
                    loop
                    playsInline
                    preload="auto"
                    onLoadedMetadata={(e) => {
                        e.currentTarget.defaultPlaybackRate = PLAYBACK_RATE;
                        e.currentTarget.playbackRate = PLAYBACK_RATE;
                    }}
                    onPlaying={() => setPlaying(true)}
                    className={`absolute inset-0 h-full w-full object-cover object-center transition-opacity duration-1000 ${playing ? 'opacity-100' : 'opacity-0'}`}
                />
            )}
            {/* Darken evenly, and a touch more behind the headline; the mask above fades it into the page */}
            <div className={`absolute inset-0 ${scene?.dim ?? 'bg-black/55'}`} />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_55%_45%_at_50%_40%,rgba(0,0,0,0.35),transparent_75%)]" />

            {/* Spaces either side of the headline; only where there's room for them */}
            <div className="absolute inset-x-0 top-0 hidden h-full xl:block">
                {CARDS.map((c) => (
                    <Card key={c.name} c={c} />
                ))}
            </div>

            {/* Which scene is showing, like a dynamic desktop picture */}
            {scene && (
                <div className="absolute bottom-[34%] right-6 hidden items-center gap-1.5 rounded-full border border-white/10 bg-black/30 px-3 py-1 text-[11px] text-white/55 backdrop-blur-md md:flex">
                    <span>{scene.icon}</span>
                    {scene.label} · follows your clock
                </div>
            )}
        </div>
    );
}
