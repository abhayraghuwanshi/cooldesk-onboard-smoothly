import { trackEvent, useSectionView } from '@/lib/analytics';
import { useState } from 'react';
import DockBar from './DockBar';
import { Keycap } from './Keycap';
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
 */

const MODES = [
    { key: 'spotlight', label: 'Spotlight' },
    { key: 'sidebar', label: 'Sidebar' },
    { key: 'dock', label: 'Dock' },
] as const;

type Mode = (typeof MODES)[number]['key'];

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
    const [mode, setMode] = useState<Mode>('spotlight');

    return (
        <section ref={sectionRef} className="relative text-white">
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
                                    setMode(m.key);
                                    trackEvent('spotlight_showcase_view', { view: m.key });
                                }}
                                className={`rounded-full px-4 py-1.5 text-sm font-medium transition-colors duration-200 ${mode === m.key ? 'bg-white/[0.12] text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.12)]' : 'text-white/50 hover:text-white/80'}`}
                            >
                                {m.label}
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

                    <div key={`${mode}-view`} className="w-full motion-safe:animate-in motion-safe:fade-in duration-300">
                        {mode === 'spotlight' && <SpotlightHero />}
                        {mode === 'sidebar' && <SidebarScene />}
                        {mode === 'dock' && <DockBar />}
                    </div>
                </div>
            </div>
        </section>
    );
}
