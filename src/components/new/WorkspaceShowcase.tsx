import { useSectionView } from '@/lib/analytics';

/**
 * One project's workspace: a real screenshot (public/images/workspace.jpg,
 * 1400×777, cropped to the workspace panel) beside a short explanation.
 * Image on the left here, so it alternates with the file manager section.
 *
 * Claims must match the app (cooldesk-extension/src/faces/workspace/parts/
 * WorkspaceCard.jsx): links, apps and folders grouped per project; the bar on
 * the left marks what's already open; folder tiles show a running dev
 * server's port, and an amber dot for uncommitted changes.
 */

const POINTS: { title: string; text: string }[] = [
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
];

const ALT =
    'The CoolDesk Website space in CoolDesk: four links (Semrush, repo, website, Chrome Web Store), two apps (Music, VS Code), and four folders, one with a dev server running on port 8080 and three with uncommitted changes.';

export default function WorkspaceShowcase() {
    const sectionRef = useSectionView<HTMLElement>('workspace_showcase');

    return (
        <section ref={sectionRef} className="relative text-white">
            <div className="container mx-auto px-6">
                <div className="grid lg:grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)] gap-10 lg:gap-14 items-center">
                    <img
                        src="/images/workspace.jpg"
                        alt={ALT}
                        width={1400}
                        height={777}
                        loading="lazy"
                        decoding="async"
                        className="order-2 lg:order-1 block w-full h-auto rounded-xl border border-white/10 shadow-[0_30px_80px_-30px_rgba(0,0,0,0.9)]"
                    />

                    <div className="order-1 lg:order-2">
                        <h2 className="font-display text-4xl md:text-5xl font-bold tracking-tight leading-[1.05]">
                            A space for every project
                        </h2>
                        <p className="mt-4 text-white/55 text-base md:text-lg">
                            Each project gets its own space: the tabs, apps and folders it needs, grouped together and one click away.
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
                </div>
            </div>
        </section>
    );
}
