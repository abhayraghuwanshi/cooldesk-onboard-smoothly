import { trackEvent, useSectionView } from '@/lib/analytics';
import { useEffect, useRef, useState } from 'react';
import DockBar from './DockBar';
import { CALLOUTS } from './dockCallouts';
import { Keycap } from './Keycap';
import SectionBackdrop from './SectionBackdrop';
import SpotlightHero from './SpotlightHero';

/**
 * "Back in, from anywhere", right after the space section: the three ways
 * back into a space, as tabs.
 *
 * Spotlight: SpotlightHero, the app's real markup over mock data. Alt+K is
 * the default shortcut; it can be changed in Settings (SettingsModal.jsx,
 * set_spotlight_shortcut).
 * Sidebar: public/images/sidebar.jpg (600×1756), the right-hand column of a
 * full-window capture (active apps, local dev, grouped by domain), shown
 * docked to the edge of a stand-in screen.
 * Dock: DockBar, the real bottom bar with callouts.
 * Ctrl+Shift+D cycles full window → side dock → bottom bar (useLayoutSwitch.js).
 *
 * A tour, like the space section's: while on screen it moves through the
 * tabs (the active one fills as it goes), and on Dock lights each callout in
 * turn. Hovering the demo pauses it; clicking a tab or using the demo (the
 * Spotlight one takes typing) stops it for good. Never under
 * prefers-reduced-motion. Behind it, SectionBackdrop.
 */

const MODES = [
    { key: 'spotlight', label: 'Spotlight' },
    { key: 'sidebar', label: 'Sidebar' },
    { key: 'dock', label: 'Dock' },
] as const;

type Mode = (typeof MODES)[number]['key'];

/** The tour: the Spotlight demo types on its own, so it gets the longest turn. */
const STEPS: { mode: Mode; callout: number | null; ms: number }[] = [
    { mode: 'spotlight', callout: null, ms: 12000 },
    { mode: 'sidebar', callout: null, ms: 7000 },
    ...CALLOUTS.map((_, i) => ({ mode: 'dock' as Mode, callout: i, ms: 3000 })),
];

const SIDEBAR_ALT =
    'CoolDesk’s side dock: eight running apps (Claude, Code, ComputeMesh Worker, Developer, Image Playground, Safari, System Settings, Terminal), one local dev server, and open tabs grouped by domain.';

/** A stand-in screen: faint windows on the left, the real side dock on the right edge. */
function SidebarScene() {
    return (
        <div className="relative mx-auto h-[460px] w-full max-w-[960px] overflow-hidden rounded-3xl border border-white/[0.07] bg-[linear-gradient(160deg,rgba(125,211,252,0.06),rgba(167,139,250,0.05)_50%,rgba(255,255,255,0.01))] md:h-[520px]">
            {/* Your work, out of focus */}
            <div className="absolute inset-y-8 left-8 right-[330px] hidden flex-col gap-4 sm:flex" aria-hidden="true">
                <div className="flex-1 rounded-2xl border border-white/[0.06] bg-white/[0.025] p-5">
                    <div className="flex gap-1.5">
                        <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
                        <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
                        <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
                    </div>
                    <div className="mt-6 space-y-3">
                        {[80, 64, 72, 40, 56].map((w, i) => (
                            <div key={i} className="h-2.5 rounded-full bg-white/[0.06]" style={{ width: `${w}%` }} />
                        ))}
                    </div>
                </div>
                <div className="h-28 rounded-2xl border border-white/[0.06] bg-white/[0.02]" />
            </div>

            {/* The side dock, on the right edge. It's taller than the frame, so it
                scrolls (like the real one) to reach local dev and the domain groups. */}
            <div className="absolute inset-y-4 right-4 w-[calc(100%-2rem)] overflow-hidden rounded-2xl border border-white/10 bg-[#2b2f33] shadow-[0_24px_60px_-20px_rgba(0,0,0,0.9)] sm:w-[300px]">
                <div className="h-full overflow-y-auto overscroll-contain [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                    <img
                        src="/images/sidebar.jpg"
                        alt={SIDEBAR_ALT}
                        width={600}
                        height={1756}
                        loading="lazy"
                        decoding="async"
                        className="block w-full h-auto"
                    />
                </div>
                <div className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-[#2b2f33] to-transparent" />
                <span className="pointer-events-none absolute bottom-2 left-1/2 -translate-x-1/2 rounded-full bg-black/50 px-2.5 py-1 text-[11px] text-white/60 backdrop-blur-sm">
                    Scroll for more
                </span>
            </div>
        </div>
    );
}

export default function SpotlightShowcase() {
    const sectionRef = useSectionView<HTMLElement>('spotlight_showcase');
    const [step, setStep] = useState(0);
    const [manual, setManual] = useState<Mode | null>(null); // set once the visitor takes over
    const [hovered, setHovered] = useState(false);
    const [visible, setVisible] = useState(false);
    const [calm, setCalm] = useState(true); // prerender: no tour until we know
    const fillRef = useRef<HTMLSpanElement | null>(null);

    const mode: Mode = manual ?? STEPS[step].mode;
    const touring = manual === null && !calm;
    const running = touring && visible && !hovered;

    useEffect(() => {
        setCalm(window.matchMedia('(prefers-reduced-motion: reduce)').matches);
    }, []);

    useEffect(() => {
        const el = sectionRef.current;
        if (!el) return;
        const io = new IntersectionObserver(([e]) => setVisible(e.isIntersecting), { threshold: 0.35 });
        io.observe(el);
        return () => io.disconnect();
    }, [sectionRef]);

    // The clock. The tab's fill covers all of that tab's steps (Dock has one per callout).
    useEffect(() => {
        const own = STEPS.filter((s) => s.mode === STEPS[step].mode);
        const total = own.reduce((n, s) => n + s.ms, 0);
        const before = own.slice(0, own.indexOf(STEPS[step])).reduce((n, s) => n + s.ms, 0);
        const paint = (t: number) => {
            if (fillRef.current) fillRef.current.style.width = `${((before + t * STEPS[step].ms) / total) * 100}%`;
        };
        if (!running) {
            paint(0);
            return;
        }
        let frame = 0;
        const start = performance.now();
        const tick = (now: number) => {
            const t = Math.min(1, (now - start) / STEPS[step].ms);
            paint(t);
            if (t < 1) frame = requestAnimationFrame(tick);
            else setStep((step + 1) % STEPS.length);
        };
        frame = requestAnimationFrame(tick);
        return () => cancelAnimationFrame(frame);
    }, [running, step]);

    const takeOver = () => {
        if (manual === null) setManual(mode);
    };

    return (
        <section ref={sectionRef} className="relative isolate text-white">
            <SectionBackdrop glow="left-1/2 top-[330px] h-[420px] w-[1100px] -ml-[550px]" />

            <div className="container mx-auto px-6">
                <div className="flex flex-col items-center text-center">
                    <h2 className="font-display text-4xl md:text-5xl font-bold tracking-tight leading-[1.05]">
                        Back in, from anywhere
                    </h2>
                    <p className="mt-4 max-w-2xl text-white/55 text-base md:text-lg">
                        Search everything with one shortcut, or keep your space docked beside your work. Press Ctrl+Shift+D to
                        switch between the sidebar, the dock and a full window.
                    </p>

                    {/* Spotlight | Sidebar | Dock */}
                    <div role="tablist" aria-label="Ways back in" className="mt-8 inline-flex gap-1 rounded-full border border-white/10 bg-white/[0.03] p-1">
                        {MODES.map((m) => (
                            <button
                                key={m.key}
                                type="button"
                                role="tab"
                                aria-selected={mode === m.key}
                                onClick={() => {
                                    setManual(m.key);
                                    trackEvent('spotlight_showcase_view', { view: m.key });
                                }}
                                className={`relative overflow-hidden rounded-full px-4 py-1.5 text-sm font-medium transition-colors duration-200 ${mode === m.key ? 'bg-white/[0.12] text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.12)]' : 'text-white/50 hover:text-white/80'}`}
                            >
                                {touring && mode === m.key && <span ref={fillRef} className="absolute inset-y-0 left-0 bg-white/[0.07]" aria-hidden="true" />}
                                <span className="relative">{m.label}</span>
                            </button>
                        ))}
                    </div>

                    {/* One line about the current tab */}
                    <div key={mode} className="mt-5 mb-8 min-h-[2.25rem] max-w-2xl text-sm text-white/50 motion-safe:animate-in motion-safe:fade-in duration-300">
                        {mode === 'spotlight' && (
                            <span className="flex flex-wrap items-center justify-center gap-2.5">
                                Press
                                <Keycap>Alt</Keycap>
                                <Keycap>K</Keycap>
                                anywhere, or pick your own shortcut. Try it below.
                            </span>
                        )}
                        {mode === 'sidebar' && (
                            <p>A side dock on the edge of your screen: the apps that are running, your local dev servers, and open tabs grouped by site.</p>
                        )}
                        {mode === 'dock' && (
                            <p>A slim bar along the bottom with the space you’re in: its apps, links and repo folders, with the branch and any dev server that’s running.</p>
                        )}
                    </div>

                    <div
                        key={`${mode}-view`}
                        onMouseEnter={() => setHovered(true)}
                        onMouseLeave={() => setHovered(false)}
                        onPointerDown={takeOver}
                        onKeyDown={takeOver}
                        onWheel={takeOver}
                        className="w-full motion-safe:animate-in motion-safe:fade-in duration-300"
                    >
                        {mode === 'spotlight' && <SpotlightHero />}
                        {mode === 'sidebar' && <SidebarScene />}
                        {mode === 'dock' && <DockBar active={touring ? STEPS[step].callout : null} />}
                    </div>
                </div>
            </div>
        </section>
    );
}
