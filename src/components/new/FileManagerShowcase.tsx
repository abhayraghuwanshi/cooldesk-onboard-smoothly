import { useSectionView } from '@/lib/analytics';

/**
 * The built-in file manager: a real screenshot (public/images/file-manager.jpg,
 * 1400×891, cropped to the window) beside a short explanation.
 *
 * Claims must match the app (cooldesk-extension/src/features/file-manager/
 * FileManager.jsx): the project bar shows the owning project's saved commands,
 * each run in its own console at the project root (runCommand); linked
 * projects are listed in the sidebar; keys are ↑↓ / Enter / Backspace / Ctrl+L.
 */

const POINTS: { title: string; text: string }[] = [
    {
        title: 'Each space’s commands, one click away',
        text: 'Start the dev server, run the build or lint: each runs in its own console at the space’s root folder, wherever you’re browsing.',
    },
    {
        title: 'Linked spaces, one jump away',
        text: 'Link spaces that belong together, like an app and its backend, and move between them from the sidebar.',
    },
    {
        title: 'Built for the keyboard',
        text: '↑↓ to move, Enter to open, Backspace to go up, Ctrl+L to type a path.',
    },
];

const ALT =
    'CoolDesk’s file manager open in the cooldesk-extension/src folder, with the space’s commands (Vite dev, Tauri dev, Build frontend, Build desktop app, Lint) as buttons along the top and linked spaces in the sidebar.';

export default function FileManagerShowcase() {
    const sectionRef = useSectionView<HTMLElement>('file_manager_showcase');

    return (
        <section ref={sectionRef} className="relative text-white">
            <div className="container mx-auto px-6">
                <div className="grid lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] gap-10 lg:gap-14 items-center">
                    <div>
                        <h2 className="font-display text-4xl md:text-5xl font-bold tracking-tight leading-[1.05]">
                            A file manager that knows your spaces
                        </h2>
                        <p className="mt-4 text-white/55 text-base md:text-lg">
                            Browse any folder without leaving CoolDesk. When it belongs to one of your spaces, its commands are
                            right there on top.
                        </p>
                        <ul className="mt-8 space-y-5">
                            {POINTS.map((p) => (
                                <li key={p.title} className="border-l border-white/15 pl-4">
                                    <h3 className="text-base font-semibold text-white">{p.title}</h3>
                                    <p className="mt-1 text-sm text-white/50 leading-relaxed">{p.text}</p>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <img
                        src="/images/file-manager.jpg"
                        alt={ALT}
                        width={1400}
                        height={891}
                        loading="lazy"
                        decoding="async"
                        className="block w-full h-auto rounded-xl border border-white/10 shadow-[0_30px_80px_-30px_rgba(0,0,0,0.9)]"
                    />
                </div>
            </div>
        </section>
    );
}
