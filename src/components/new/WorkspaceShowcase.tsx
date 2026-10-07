import { trackEvent, useSectionView } from '@/lib/analytics';
import { useState } from 'react';

/**
 * One space, three views, each a real screenshot with its own points:
 * public/images/workspace.jpg (links, apps, folders; 1400×777),
 * public/images/space-notes.jpg (the notes reader; 1400×777) and
 * public/images/file-manager.jpg (the file manager; 1400×891). The frame is
 * sized for the tallest, so switching tabs never moves the page. Image on the
 * left, so it alternates with the sections around it.
 *
 * Claims must match the app (cooldesk-extension/src/):
 * faces/workspace/parts/WorkspaceCard.jsx — links, apps and folders per space;
 * the bar on the left marks what's already open; folder tiles show a running
 * dev server's port and an amber dot for uncommitted changes.
 * faces/workspace/parts/WorkspaceContextPanel.jsx — your own notes (editable)
 * and the space's shared .cooldesk docs (README, notes/*.md).
 * features/file-manager/FileManager.jsx — the project bar shows the owning
 * space's saved commands, each run in its own console at the space's root
 * (runCommand); linked spaces in the sidebar; keys are ↑↓ / Enter /
 * Backspace / Ctrl+L.
 */

type Point = { title: string; text: string };

const VIEWS: { key: string; label: string; title: string; intro: string; src: string; width: number; height: number; alt: string; points: Point[] }[] = [
    {
        key: 'space',
        label: 'Space',
        title: 'Everything for the project, together',
        intro: 'The tabs, apps and folders a project needs, grouped in one place and one click away.',
        src: '/images/workspace.jpg',
        width: 1400,
        height: 777,
        alt: 'The CoolDesk Website space in CoolDesk: four links (Semrush, repo, website, Chrome Web Store), two apps (Music, VS Code), and four folders, one with a dev server running on port 8080 and three with uncommitted changes.',
        points: [
            {
                title: 'Links, apps and folders, together',
                text: 'The repo, the live site, the store page, your editor and the project’s folders sit in one place.',
            },
            {
                title: 'See what’s already open',
                text: 'Open items are marked, so one click takes you back to them instead of opening a copy.',
            },
            {
                title: 'Know where the code is',
                text: 'Folders show a running dev server’s port, and an amber dot when there are uncommitted changes.',
            },
        ],
    },
    {
        key: 'notes',
        label: 'Notes',
        title: 'Notes that stay with the project',
        intro: 'Your own notes and the project’s docs live inside the space, so the context is there when you come back.',
        src: '/images/space-notes.jpg',
        width: 1400,
        height: 777,
        alt: 'A space’s notes in CoolDesk: the project’s shared README, with its layout table, run commands and services, open in the built-in reader.',
        points: [
            {
                title: 'Your own notes',
                text: 'Jot down what you were doing and what’s next. They stay with the space, not in some other app.',
            },
            {
                title: 'The project’s shared docs',
                text: 'Read the project’s README and notes right inside the space, rendered and ready.',
            },
        ],
    },
    {
        key: 'files',
        label: 'Files',
        title: 'A file manager that knows your spaces',
        intro: 'Browse any folder without leaving CoolDesk. When it belongs to a space, its commands are right there on top.',
        src: '/images/file-manager.jpg',
        width: 1400,
        height: 891,
        alt: 'CoolDesk’s file manager open in the cooldesk-extension/src folder, with the space’s commands (Vite dev, Tauri dev, Build frontend, Build desktop app, Lint) as buttons along the top and linked spaces in the sidebar.',
        points: [
            {
                title: 'Each space’s commands, one click away',
                text: 'Start the dev server, run the build or lint: each runs in its own console at the space’s root folder.',
            },
            {
                title: 'Linked spaces, one jump away',
                text: 'Link spaces that belong together, like an app and its backend, and move between them from the sidebar.',
            },
            {
                title: 'Built for the keyboard',
                text: '↑↓ to move, Enter to open, Backspace to go up, Ctrl+L to type a path.',
            },
        ],
    },
];

export default function WorkspaceShowcase() {
    const sectionRef = useSectionView<HTMLElement>('workspace_showcase');
    const [view, setView] = useState(VIEWS[0].key);
    const active = VIEWS.find((v) => v.key === view) ?? VIEWS[0];

    return (
        <section ref={sectionRef} className="relative text-white">
            <div className="container mx-auto px-6">
                {/* Section header: title, then the tabs that drive everything below */}
                <div className="flex flex-col items-center text-center">
                    <h2 className="font-display text-4xl md:text-5xl font-bold tracking-tight leading-[1.05]">
                        A space for every project
                    </h2>
                    <p className="mt-4 max-w-2xl text-white/55 text-base md:text-lg">
                        Each project gets its own space: the tabs, apps, folders, notes and files it needs, grouped together
                        and one click away.
                    </p>

                    {/* Space | Notes | Files */}
                    <div role="tablist" aria-label="Space views" className="mt-8 inline-flex gap-1 rounded-full border border-white/10 bg-white/[0.03] p-1">
                        {VIEWS.map((v) => (
                            <button
                                key={v.key}
                                type="button"
                                role="tab"
                                aria-selected={view === v.key}
                                onClick={() => {
                                    setView(v.key);
                                    trackEvent('workspace_showcase_view', { view: v.key });
                                }}
                                className={`rounded-full px-4 py-1.5 text-sm font-medium transition-colors duration-200 ${view === v.key ? 'bg-white/[0.12] text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.12)]' : 'text-white/50 hover:text-white/80'}`}
                            >
                                {v.label}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="mt-10 grid lg:grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)] gap-10 lg:gap-14 items-center">
                    {/* Sized for the tallest screenshot, so switching never moves the page. */}
                    <div className="aspect-[1400/891]">
                        {VIEWS.map((v) => (
                            <img
                                key={v.key}
                                src={v.src}
                                alt={v.alt}
                                width={v.width}
                                height={v.height}
                                loading="lazy"
                                decoding="async"
                                hidden={view !== v.key}
                                className={`${view === v.key ? 'block' : 'hidden'} w-full h-auto rounded-xl border border-white/10 shadow-[0_30px_80px_-30px_rgba(0,0,0,0.9)] motion-safe:animate-in motion-safe:fade-in duration-300`}
                            />
                        ))}
                    </div>

                    {/* The tab's own heading, intro and points */}
                    <div key={active.key} className="motion-safe:animate-in motion-safe:fade-in motion-safe:slide-in-from-bottom-1 duration-300">
                        <h3 className="text-2xl md:text-3xl font-semibold tracking-tight">{active.title}</h3>
                        <p className="mt-3 text-white/55 text-base md:text-lg">{active.intro}</p>
                        <ul className="mt-8 space-y-5">
                            {active.points.map((p) => (
                                <li key={p.title} className="border-l border-white/15 pl-4">
                                    <h4 className="text-base font-semibold text-white">{p.title}</h4>
                                    <p className="mt-1 text-sm text-white/50 leading-relaxed">{p.text}</p>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </section>
    );
}
