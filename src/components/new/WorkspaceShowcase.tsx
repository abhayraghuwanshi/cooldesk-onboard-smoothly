import { trackEvent, useSectionView } from '@/lib/analytics';
import { useEffect, useRef, useState } from 'react';
import SectionBackdrop from './SectionBackdrop';
import './workspace-showcase.css';

/**
 * One space, three views, each a real screenshot with its own points:
 * public/images/workspace.jpg (links, apps, folders; 1400×777),
 * public/images/space-notes.jpg (the notes reader; 1400×777) and
 * public/images/file-manager.jpg (the file manager; 1400×891). The frame is
 * sized for the tallest, so switching tabs never moves the page. Image on the
 * left, so it alternates with the sections around it.
 *
 * A guided tour: while the section is on screen it steps through the points,
 * then on to the next tab, and a spotlight glides to the part of the
 * screenshot each point is about (`spot`, in % of that screenshot; `rings`
 * pulse other places the point means too). Hovering or tapping a point jumps
 * to it and pauses; leaving resumes. Under prefers-reduced-motion it never
 * advances on its own.
 *
 * Behind it, SectionBackdrop: the hero's galaxy, carried on quietly.
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

type Rect = [x: number, y: number, w: number, h: number];
type Point = { title: string; text: string; spot: Rect | null; rings?: [number, number][] };

const VIEWS: { key: string; label: string; title: string; intro: string; src: string; width: number; height: number; alt: string; points: Point[] }[] = [
    {
        key: 'space',
        label: 'Space',
        title: 'Everything you need, together',
        intro: 'The tabs, apps and folders you need, grouped in one place and one click away.',
        src: '/images/workspace.jpg',
        width: 1400,
        height: 777,
        alt: 'The CoolDesk Website space in CoolDesk: four links (Semrush, repo, website, Chrome Web Store), two apps (Music, VS Code), and four folders, one with a dev server running on port 8080 and three with uncommitted changes.',
        points: [
            {
                title: 'Links, apps and folders, together',
                text: 'The repo, the live site, the store page, your editor and the project’s folders sit in one place.',
                spot: [1.7, 16.6, 96.6, 27.4],
            },
            {
                title: 'See what’s already open',
                text: 'Open items are marked, so one click takes you back to them instead of opening a copy.',
                spot: [1.7, 30.3, 96.6, 6.6],
                rings: [[2.3, 61.8]],
            },
            {
                title: 'Know where the code is',
                text: 'Folders show a running dev server’s port, and an amber dot when there are uncommitted changes.',
                spot: [92.1, 74.6, 5.6, 4.0],
                rings: [[96.9, 82.6], [96.9, 88.2], [96.9, 93.6]],
            },
        ],
    },
    {
        key: 'notes',
        label: 'Notes',
        title: 'Notes that stay with the space',
        intro: 'Your notes and docs live inside the space, so the context is there when you come back.',
        src: '/images/space-notes.jpg',
        width: 1400,
        height: 777,
        alt: 'A space’s notes in CoolDesk: the project’s shared README, with its layout table, run commands and services, open in the built-in reader.',
        points: [
            {
                title: 'Your own notes',
                text: 'Jot down what you were doing and what’s next. They stay with the space, not in some other app.',
                spot: null,
            },
            {
                title: 'Shared docs, right there',
                text: 'Read READMEs and shared notes right inside the space, rendered and ready.',
                spot: [1.0, 9.8, 70.0, 47.5],
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
                spot: [11.8, 7.8, 71.0, 4.4],
            },
            {
                title: 'Linked spaces, one jump away',
                text: 'Link spaces that belong together, like an app and its backend, and move between them from the sidebar.',
                spot: [1.0, 13.6, 15.4, 29.9],
            },
            {
                title: 'Built for the keyboard',
                text: '↑↓ to move, Enter to open, Backspace to go up, Ctrl+L to type a path.',
                spot: [75.1, 95.0, 24.0, 4.2],
            },
        ],
    },
];

/** How long each point stays up during the tour. */
const STEP_MS = 4500;


export default function WorkspaceShowcase() {
    const sectionRef = useSectionView<HTMLElement>('workspace_showcase');
    const [view, setView] = useState(0);
    const [step, setStep] = useState(0);
    const [paused, setPaused] = useState(false);
    const [visible, setVisible] = useState(false);
    const [calm, setCalm] = useState(true); // prerender: no tour until we know
    const barRefs = useRef<(HTMLSpanElement | null)[]>([]);
    const fillRef = useRef<HTMLSpanElement | null>(null);

    const active = VIEWS[view];
    const running = visible && !paused && !calm;

    useEffect(() => {
        setCalm(window.matchMedia('(prefers-reduced-motion: reduce)').matches);
    }, []);

    // Only tour while the section is on screen.
    useEffect(() => {
        const el = sectionRef.current;
        if (!el) return;
        const io = new IntersectionObserver(([e]) => setVisible(e.isIntersecting), { threshold: 0.35 });
        io.observe(el);
        return () => io.disconnect();
    }, [sectionRef]);

    // The clock: progress bars are written directly each frame, React only
    // re-renders when the step changes.
    useEffect(() => {
        const bar = barRefs.current[step];
        const paint = (t: number) => {
            if (bar) bar.style.height = `${t * 100}%`;
            if (fillRef.current) fillRef.current.style.width = `${((step + t) / active.points.length) * 100}%`;
        };
        if (!running) {
            paint(1);
            return;
        }
        let frame = 0;
        const start = performance.now();
        const tick = (now: number) => {
            const t = Math.min(1, (now - start) / STEP_MS);
            paint(t);
            if (t < 1) {
                frame = requestAnimationFrame(tick);
            } else if (step + 1 < active.points.length) {
                setStep(step + 1);
            } else {
                setView((view + 1) % VIEWS.length);
                setStep(0);
            }
        };
        frame = requestAnimationFrame(tick);
        return () => cancelAnimationFrame(frame);
    }, [running, step, view, active.points.length]);

    function pickView(i: number) {
        setView(i);
        setStep(0);
        setPaused(false);
        trackEvent('workspace_showcase_view', { view: VIEWS[i].key });
    }

    function pickPoint(j: number) {
        setStep(j);
        setPaused(true);
    }

    return (
        <section ref={sectionRef} className="relative isolate text-white">
            <SectionBackdrop glow="left-[2%] top-[320px] h-[640px] w-[900px]" />

            <div className="container mx-auto px-6">
                {/* Section header: title, then the tabs that drive everything below */}
                <div className="flex flex-col items-center text-center">
                    <h2 className="font-display text-4xl md:text-5xl font-bold tracking-tight leading-[1.05]">
                        A space for all your work
                    </h2>
                    <p className="mt-4 max-w-2xl text-white/55 text-base md:text-lg">
                        The tabs, apps, files and notes for everything you work on, together and one click away.
                    </p>

                    {/* Space | Notes | Files; the active one fills as the tour goes */}
                    <div role="tablist" aria-label="Space views" className="mt-8 inline-flex gap-1 rounded-full border border-white/10 bg-white/[0.03] p-1">
                        {VIEWS.map((v, i) => (
                            <button
                                key={v.key}
                                type="button"
                                role="tab"
                                aria-selected={view === i}
                                onClick={() => pickView(i)}
                                className={`relative overflow-hidden rounded-full px-4 py-1.5 text-sm font-medium transition-colors duration-200 ${view === i ? 'bg-white/[0.12] text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.12)]' : 'text-white/50 hover:text-white/80'}`}
                            >
                                {view === i && <span ref={fillRef} className="absolute inset-y-0 left-0 bg-white/[0.07]" aria-hidden="true" />}
                                <span className="relative">{v.label}</span>
                            </button>
                        ))}
                    </div>
                </div>

                <div className="mt-10 grid lg:grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)] gap-10 lg:gap-14 items-center">
                    {/* Every view stacked, the active one in focus. Sized for the
                        tallest screenshot, so switching never moves the page. */}
                    <div className="relative aspect-[1400/891]">
                        {VIEWS.map((v, i) => {
                            const on = view === i;
                            const pt = v.points[on ? step : 0];
                            return (
                                <div key={v.key} className={`ws-shot ${on ? 'on' : ''}`} style={{ aspectRatio: `${v.width} / ${v.height}` }} aria-hidden={!on}>
                                    <div className="relative h-full w-full overflow-hidden rounded-xl border border-white/10 shadow-[0_30px_80px_-30px_rgba(0,0,0,0.9)]">
                                        <img src={v.src} alt={v.alt} width={v.width} height={v.height} loading="lazy" decoding="async" className="block h-full w-full" />
                                        <div
                                            className="ws-spot"
                                            aria-hidden="true"
                                            style={pt.spot
                                                ? { left: `${pt.spot[0]}%`, top: `${pt.spot[1]}%`, width: `${pt.spot[2]}%`, height: `${pt.spot[3]}%`, opacity: on ? 1 : 0 }
                                                : { left: 0, top: 0, width: '100%', height: '100%', opacity: 0 }}
                                        />
                                        {on && pt.rings?.map(([x, y]) => (
                                            <span key={`${step}-${x}-${y}`} className="ws-ring" aria-hidden="true" style={{ left: `${x}%`, top: `${y}%` }} />
                                        ))}
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    {/* The tab's own heading, intro and points; hover or tap one to jump to it */}
                    <div key={active.key} onMouseLeave={() => setPaused(false)} className="motion-safe:animate-in motion-safe:fade-in motion-safe:slide-in-from-bottom-1 duration-300">
                        <h3 className="text-2xl md:text-3xl font-semibold tracking-tight">{active.title}</h3>
                        <p className="mt-3 text-white/55 text-base md:text-lg">{active.intro}</p>
                        <ul className="mt-8 space-y-5">
                            {active.points.map((p, j) => (
                                <li
                                    key={p.title}
                                    onMouseEnter={() => pickPoint(j)}
                                    onClick={() => pickPoint(j)}
                                    className={`relative cursor-default pl-4 transition-opacity duration-300 ${j === step ? 'opacity-100' : 'opacity-[0.45]'}`}
                                >
                                    <span className="absolute inset-y-0 left-0 w-px bg-white/15" aria-hidden="true" />
                                    <span
                                        ref={(el) => { barRefs.current[j] = el; }}
                                        className="absolute left-0 top-0 w-0.5 -ml-px rounded-full bg-sky-300 shadow-[0_0_10px_rgba(125,211,252,0.9)]"
                                        style={{ height: j < step ? '100%' : j === step ? undefined : 0 }}
                                        aria-hidden="true"
                                    />
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
