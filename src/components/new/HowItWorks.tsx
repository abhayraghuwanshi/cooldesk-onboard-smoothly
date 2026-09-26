import { useSectionView } from '@/lib/analytics';
import {
    ArrowRight, FolderOpen, LayoutGrid, PanelsTopLeft, Share2, Sparkles, StickyNote,
} from 'lucide-react';
import React from 'react';
import { Link } from 'react-router-dom';
import FileManagerDemo from './FileManagerDemo';
import LayoutModesDemo from './LayoutModesDemo';
import SpotlightHero, { Keycap } from './SpotlightHero';
import WorkspaceCardDemo from './WorkspaceCardDemo';

/**
 * Homepage walkthrough: the four things a new user needs to understand,
 * each one line of copy plus a picture. The workspace card and file manager
 * are partial copies of the app's own components (WorkspaceCardDemo,
 * FileManagerDemo); commands and layouts mirror useSlashCommands.js and
 * useLayoutSwitch.js — keep them in sync. Deeper docs live on /how-to-use.
 */

// ── Visuals ────────────────────────────────────────────────────────────────

// The same Spotlight demo as the hero, scripted to walk through "/" commands
// and the /f, /a, /u scopes. Module-level so the script array is stable.
const COMMAND_SCRIPT = ['/', '/f vite', '/a code', '/u local'];

function CommandsVisual() {
    // Floats over the same graphite desktop as the other demos, the way the
    // real Spotlight sits over whatever is on screen.
    return (
        <div className="cd-ws-wallpaper rounded-2xl border border-white/10 overflow-hidden shadow-2xl px-4 py-10 md:py-14">
            <SpotlightHero script={COMMAND_SCRIPT} glow={false} />
        </div>
    );
}

// ── Steps ──────────────────────────────────────────────────────────────────

const STEPS: { key: React.ReactNode; title: string; desc: string; Visual: () => React.ReactElement }[] = [
    {
        key: <LayoutGrid className="w-4 h-4" strokeWidth={1.75} />,
        title: 'One place per project',
        desc: 'Open a project and everything it needs is in one view: its links, editors, apps and folders, plus its status, next todos and notes. Anything already open is marked, so one click takes you back to it.',
        Visual: WorkspaceCardDemo,
    },
    {
        key: '/',
        title: 'Type / to do things',
        desc: 'Commands live in the same search bar: start a new project, hand setup to the AI agent, or narrow the search to files (/f), apps (/a) or tabs (/u).',
        Visual: CommandsVisual,
    },
    {
        key: <PanelsTopLeft className="w-4 h-4" strokeWidth={1.75} />,
        title: 'Keep it where you work',
        desc: 'Open it full window, pin it as a sidebar, or shrink it to a bar at the bottom of the screen.',
        Visual: LayoutModesDemo,
    },
    {
        key: <FolderOpen className="w-4 h-4" strokeWidth={1.75} />,
        title: 'Open the project’s files',
        desc: 'Browse its folders, preview code without opening an editor, run its scripts and see which dev servers are up. Try it: click around.',
        Visual: FileManagerDemo,
    },
];

const EXTRAS = [
    { icon: Sparkles, label: 'AI groups your tabs by project' },
    { icon: StickyNote, label: 'Notes & todos per project' },
    { icon: LayoutGrid, label: 'New-tab widgets' },
    { icon: Share2, label: 'Team sync' },
];

export default function HowItWorks() {
    const sectionRef = useSectionView<HTMLElement>('how_it_works');

    return (
        <section ref={sectionRef} className="relative text-white">
            <div className="container mx-auto px-6">
                <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3 mb-16">
                    <div>
                        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-white/40 mb-2">How it works</p>
                        <h2 className="font-display text-4xl md:text-5xl font-bold tracking-tight">Four things to know</h2>
                    </div>
                    <Link
                        to="/how-to-use"
                        className="group inline-flex items-center gap-1 text-sm font-semibold text-white/50 hover:text-white transition-colors"
                    >
                        Full guide
                        <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
                    </Link>
                </div>

                <div className="space-y-20 md:space-y-28">
                    {STEPS.map((step, i) => (
                        // Every step: text on top, the demo full width underneath.
                        <div key={step.title} className="flex flex-col gap-8 md:gap-10">
                            <div className="max-w-2xl">
                                <div className="flex items-center gap-3 mb-3">
                                    <span className="font-mono text-xs text-white/30">0{i + 1}</span>
                                    <Keycap>{step.key}</Keycap>
                                </div>
                                <h3 className="font-display text-2xl md:text-3xl font-bold tracking-tight mb-3">{step.title}</h3>
                                <p className="text-white/55 text-base md:text-lg leading-relaxed">{step.desc}</p>
                            </div>
                            <div className="relative">
                                <div className="pointer-events-none absolute -inset-6 bg-[radial-gradient(ellipse_at_center,rgba(56,189,248,0.12),transparent_65%)] blur-2xl" />
                                <div className="relative">
                                    <step.Visual />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="mt-16 pt-8 border-t border-white/10 flex flex-col md:flex-row md:items-center gap-4">
                    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-white/40 shrink-0">Also included</p>
                    <div className="flex flex-wrap gap-2">
                        {EXTRAS.map((x) => (
                            <span
                                key={x.label}
                                className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 text-xs font-medium text-white/60"
                            >
                                <x.icon className="w-3.5 h-3.5 text-white/40" strokeWidth={1.75} />
                                {x.label}
                            </span>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
