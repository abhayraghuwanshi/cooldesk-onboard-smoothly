import { useSectionView } from '@/lib/analytics';
import {
    ArrowRight, FolderOpen, FolderPlus, LayoutGrid, Monitor, PanelsTopLeft, Share2, Sparkles, StickyNote,
} from 'lucide-react';
import React from 'react';
import CreateProjectDemo from './CreateProjectDemo';
import FileManagerDemo from './FileManagerDemo';
import LayoutModesDemo from './LayoutModesDemo';
import { Keycap } from './Keycap';
import SpotlightHero from './SpotlightHero';
import WorkspaceCardDemo from './WorkspaceCardDemo';

/**
 * Homepage walkthrough: the four things a new user needs to understand,
 * each one line of copy plus a picture. The workspace card and file manager
 * are partial copies of the app's own components (WorkspaceCardDemo,
 * FileManagerDemo); commands and layouts mirror useSlashCommands.js and
 * useLayoutSwitch.js — keep them in sync. Videos + shortcuts follow in #how-to-use.
 */

// ── Visuals ────────────────────────────────────────────────────────────────

// The same Spotlight demo as the hero, scripted to walk through "/" commands
// and the /f, /a, /u scopes. Module-level so the script array is stable.
const COMMAND_SCRIPT = ['/', '/f vite', '/a code', '/u local'];

/** A faint app window for the backdrop: title bar dots and a few "text" lines. */
function GhostWindow({ className, lines, accent }: { className: string; lines: string[]; accent?: string }) {
    return (
        <div className={`absolute rounded-xl border border-white/15 bg-[#1b1c22] shadow-[0_20px_50px_-15px_rgba(0,0,0,0.7)] overflow-hidden ${className}`}>
            <div className="flex items-center gap-1.5 px-3 py-2 border-b border-white/[0.06] bg-white/[0.02]">
                <span className="w-2 h-2 rounded-full bg-[#ff5f57]/70" />
                <span className="w-2 h-2 rounded-full bg-[#febc2e]/70" />
                <span className="w-2 h-2 rounded-full bg-[#28c840]/70" />
            </div>
            <div className="p-4 space-y-2.5">
                {lines.map((w, i) => (
                    <div key={i} className={`h-2 rounded-full ${w}`} style={i % 3 === 0 && accent ? { background: accent } : undefined} />
                ))}
            </div>
        </div>
    );
}

function CommandsVisual() {
    // Spotlight opens over whatever you're working on: an editor and a browser
    // sit blurred behind a dimming scrim, with a violet glow under the panel.
    return (
        <div className="relative isolate overflow-hidden rounded-2xl border border-white/10 px-4 py-12 md:py-16 bg-[linear-gradient(160deg,#1d1e24_0%,#121317_55%,#0b0c0f_100%)]">
            <div aria-hidden="true" className="absolute inset-0 -z-10">
                <GhostWindow
                    className="left-[4%] top-[8%] w-[46%] h-[70%] blur-[1.5px]"
                    lines={['w-2/5 bg-white/25', 'w-3/5 bg-white/15', 'w-1/2 bg-white/15', 'w-2/3 bg-white/20', 'w-1/3 bg-white/15', 'w-3/4 bg-white/15', 'w-1/2 bg-white/20', 'w-2/5 bg-white/15']}
                    accent="rgba(167,139,250,0.55)"
                />
                <GhostWindow
                    className="right-[4%] bottom-[6%] w-[44%] h-[62%] blur-[1.5px]"
                    lines={['w-1/3 bg-white/25', 'w-full bg-white/[0.08] h-16', 'w-2/3 bg-white/15', 'w-1/2 bg-white/15', 'w-3/5 bg-white/20']}
                    accent="rgba(56,189,248,0.5)"
                />
                {/* Dimming scrim, like the real overlay */}
                <div className="absolute inset-0 bg-black/25" />
                {/* Glow under the panel */}
                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[70%] h-[80%] bg-[radial-gradient(ellipse_at_center,rgba(139,92,246,0.42),transparent_62%)] blur-3xl" />
                {/* Fine grid, faded at the edges */}
                <div
                    className="absolute inset-0 opacity-40 [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,black,transparent)]"
                    style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)', backgroundSize: '32px 32px' }}
                />
            </div>
            <SpotlightHero script={COMMAND_SCRIPT} glow={false} />
        </div>
    );
}

// ── Steps ──────────────────────────────────────────────────────────────────

// `accent` (r, g, b) tints each step's rail node, glow and demo bezel.
const STEPS: { key: React.ReactNode; title: string; desc: string; Visual: () => React.ReactElement; accent: string; plain?: boolean }[] = [
    {
        key: <FolderPlus className="w-4 h-4" strokeWidth={1.75} />,
        title: 'Create a project',
        desc: 'Three quick steps in Spotlight: name it, attach what it needs, press Enter. Or ask the AI to make one for you and find the links it needs.',
        Visual: CreateProjectDemo,
        accent: '226, 232, 240',
        plain: true,
    },
    {
        key: <LayoutGrid className="w-4 h-4" strokeWidth={1.75} />,
        title: 'One place per project',
        desc: 'Open a project and everything it needs is in one view: its links, editors, apps and folders, plus its status, next todos and notes. Anything already open is marked, so one click takes you back to it.',
        Visual: WorkspaceCardDemo,
        accent: '56, 189, 248',
        plain: true,
    },
    {
        key: '/',
        title: 'Type / to do things',
        desc: 'Commands live in the same search bar: start a new project, hand setup to the AI agent, or narrow the search to files (/f), apps (/a) or tabs (/u).',
        Visual: CommandsVisual,
        accent: '167, 139, 250',
    },
    {
        key: <PanelsTopLeft className="w-4 h-4" strokeWidth={1.75} />,
        title: 'Keep it where you work',
        desc: 'Three ways to have it around: full window, a sidebar beside your work, or a dock along the bottom of the screen.',
        Visual: LayoutModesDemo,
        accent: '52, 211, 153',
    },
    {
        key: <FolderOpen className="w-4 h-4" strokeWidth={1.75} />,
        title: 'A file manager built in',
        desc: 'CoolDesk has its own file manager. Open a project’s folder to browse its files and preview code without opening an editor. The project’s scripts (like dev or build) are one click away, and a green chip shows when its dev server is running. Try it below.',
        Visual: FileManagerDemo,
        accent: '251, 191, 36',
    },
];

const EXTRAS = [
    { icon: Sparkles, label: 'AI groups your tabs by project' },
    { icon: StickyNote, label: 'Notes & todos per project' },
    { icon: LayoutGrid, label: 'New-tab widgets' },
    { icon: Share2, label: 'Team sync' },
];

const RAIL = 'linear-gradient(to bottom, rgba(226,232,240,0.45), rgba(56,189,248,0.5) 22%, rgba(167,139,250,0.45) 45%, rgba(52,211,153,0.45) 70%, rgba(251,191,36,0.55))';

/**
 * The demo's frame: a thin gradient bezel with a soft glow in the step's accent.
 * `plain` drops the glow and tint for demos that should stay neutral.
 */
function Bezel({ accent, plain = false, children }: { accent: string; plain?: boolean; children: React.ReactNode }) {
    return (
        <div className="relative">
            {!plain && (
                <div
                    aria-hidden="true"
                    className="pointer-events-none absolute -inset-x-10 -inset-y-14 blur-3xl"
                    style={{ background: `radial-gradient(50% 55% at 50% 45%, rgba(${accent}, 0.16), transparent 70%)` }}
                />
            )}
            <div
                className="relative rounded-[24px] p-px"
                style={{
                    background: plain
                        ? 'rgba(255,255,255,0.08)'
                        : `linear-gradient(180deg, rgba(255,255,255,0.2), rgba(255,255,255,0.05) 35%, rgba(${accent}, 0.28))`,
                }}
            >
                <div className="rounded-[23px] bg-[#07080a] p-2 sm:p-3 shadow-[inset_0_1px_0_rgba(255,255,255,0.07)]">
                    {children}
                </div>
            </div>
        </div>
    );
}

export default function HowItWorks() {
    const sectionRef = useSectionView<HTMLElement>('how_it_works');

    return (
        <section ref={sectionRef} className="relative text-white isolate">
            {/* Backdrop: a light beam where the section starts, and a dot grid that fades at both ends */}
            <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
                <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/25 to-transparent" />
                <div className="absolute inset-x-0 top-0 h-56 bg-[radial-gradient(ellipse_45%_100%_at_50%_0%,rgba(255,255,255,0.07),transparent)]" />
                <div
                    className="absolute inset-0 opacity-60 [mask-image:linear-gradient(to_bottom,transparent,black_8%,black_92%,transparent)]"
                    style={{ backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.055) 1px, transparent 1px)', backgroundSize: '26px 26px' }}
                />
            </div>

            <div className="container mx-auto px-6 pt-12">
                <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3 mb-16 md:mb-20">
                    <div>
                        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-white/40 mb-2">How it works</p>
                        <h2 className="font-display text-4xl md:text-6xl font-bold tracking-tight">
                            Five things <span className="bg-gradient-to-b from-white to-white/45 bg-clip-text text-transparent">to know</span>
                        </h2>
                        <p className="mt-3 text-white/50 text-base">Everything below lives in the desktop app.</p>
                    </div>
                    <a
                        href="#how-to-use"
                        className="group inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 text-sm font-semibold text-white/60 hover:text-white hover:border-white/20 transition-colors"
                    >
                        Videos &amp; shortcuts
                        <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
                    </a>
                </div>

                <div className="relative lg:pl-24">
                    {/* Timeline rail joining the steps (large screens) */}
                    <div aria-hidden="true" className="hidden lg:block absolute left-[27px] top-7 bottom-7 w-px" style={{ background: RAIL }} />

                    <div className="space-y-24 md:space-y-32">
                        {STEPS.map((step, i) => (
                            // Every step: text on top, the demo full width underneath.
                            <div key={step.title} className="relative flex flex-col gap-8 md:gap-10">
                                {/* Rail node */}
                                <div
                                    aria-hidden="true"
                                    className="hidden lg:flex absolute -left-24 top-0 w-14 h-14 items-center justify-center rounded-2xl border bg-[#0b0c0f] font-mono text-sm font-bold"
                                    style={{
                                        borderColor: `rgba(${step.accent}, 0.4)`,
                                        color: `rgb(${step.accent})`,
                                        boxShadow: `0 0 0 5px #000, 0 0 30px -4px rgba(${step.accent}, 0.55), inset 0 1px 0 rgba(255,255,255,0.08)`,
                                    }}
                                >
                                    0{i + 1}
                                </div>

                                <div className="max-w-2xl">
                                    <div className="flex items-center gap-3 mb-4">
                                        <span className="lg:hidden font-mono text-xs font-bold" style={{ color: `rgb(${step.accent})` }}>0{i + 1}</span>
                                        <Keycap>{step.key}</Keycap>
                                        <span className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.04] px-2.5 py-0.5 text-[11px] font-semibold text-white/70">
                                            <Monitor className="w-3 h-3" strokeWidth={2} /> Desktop app
                                        </span>
                                    </div>
                                    <h3 className="font-display text-3xl md:text-4xl font-bold tracking-tight mb-3">{step.title}</h3>
                                    <p className="text-white/55 text-base md:text-lg leading-relaxed">{step.desc}</p>
                                </div>

                                <Bezel accent={step.accent} plain={step.plain}>
                                    <step.Visual />
                                </Bezel>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Also included — one glass strip */}
                <div className="mt-24 rounded-2xl border border-white/10 bg-gradient-to-b from-white/[0.05] to-white/[0.015] px-5 py-4 flex flex-col md:flex-row md:items-center gap-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.06)]">
                    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-white/40 shrink-0">Also included</p>
                    <div className="flex flex-wrap gap-x-6 gap-y-2">
                        {EXTRAS.map((x) => (
                            <span key={x.label} className="inline-flex items-center gap-2 text-sm text-white/65">
                                <x.icon className="w-4 h-4 text-white/40" strokeWidth={1.75} />
                                {x.label}
                            </span>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
