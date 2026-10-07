/**
 * CoolDesk's bottom bar: a real screenshot (public/images/dock-bar.jpg,
 * 2400×73 — cropped just inside the bar's own border so no wallpaper shows,
 * and shown at its 2× size so the text is readable). The border and rounded
 * corners are drawn in CSS around it, so all four edges match. Callout
 * positions are percentages of the 1200px frame; if the screenshot is
 * replaced, re-measure them.
 *
 * Claims must match the app: WorkspaceDockBar.jsx (project, links/apps,
 * folder chips with branch + dev-server port, edit/layout controls).
 */

const CALLOUTS: { at: number; label: string; align: 'left' | 'center' | 'right' }[] = [
    { at: 6, label: 'The space you’re in', align: 'left' },
    { at: 49.6, label: 'Dev server running on :3000', align: 'center' },
    { at: 71, label: 'Repo folders, with their branch', align: 'center' },
    { at: 96.7, label: 'Edit, or switch layout', align: 'right' },
];

const ALT =
    'CoolDesk’s bottom bar for the calculatecost.cloud space: links to InfraPlan, GitHub and the production site, a dev server running on port 3000, and repo folders on the main branch.';

export default function DockBar() {
    return (
        <div className="w-full">
            {/* The desk: a neutral, barely-there surface with the real bar floating near the bottom. */}
            <div className="rounded-3xl border border-white/[0.07] bg-[linear-gradient(180deg,rgba(255,255,255,0.035)_0%,rgba(255,255,255,0.01)_100%)] overflow-x-auto">
                <div className="relative mx-auto w-[1200px] max-w-none px-0 pt-10 pb-10 md:pt-28 md:pb-14">
                    {/* Callouts (wide screens): a label and a hairline down to the bar. */}
                    <div className="hidden md:block" aria-hidden="true">
                        {CALLOUTS.map((c) => (
                            <div
                                key={c.label}
                                className="absolute bottom-[calc(3.5rem+50px)] flex flex-col"
                                style={{
                                    left: `${c.at}%`,
                                    transform: c.align === 'center' ? 'translateX(-50%)' : c.align === 'right' ? 'translateX(-100%)' : undefined,
                                    alignItems: c.align === 'left' ? 'flex-start' : c.align === 'right' ? 'flex-end' : 'center',
                                }}
                            >
                                <span className="whitespace-nowrap text-xs font-medium text-white/60">{c.label}</span>
                                <span className="mt-2 h-10 w-px bg-white/25" />
                            </div>
                        ))}
                    </div>

                    {/* The bar's frame: an even border on all four sides, padded in the bar's own colour. */}
                    <div className="w-[1200px] rounded-2xl border border-white/10 bg-[#19191d] px-2 py-1.5 shadow-[0_24px_60px_-20px_rgba(0,0,0,0.8)]">
                        <img
                            src="/images/dock-bar.jpg"
                            alt={ALT}
                            width={2400}
                            height={73}
                            loading="lazy"
                            decoding="async"
                            className="block w-full h-auto rounded-lg"
                        />
                    </div>
                </div>
            </div>

            {/* Phones: the bar scrolls sideways above, so list what it shows instead of callouts. */}
            <ul className="md:hidden mt-6 space-y-2 text-left text-sm text-white/55">
                {CALLOUTS.map((c) => (
                    <li key={c.label}>· {c.label}</li>
                ))}
            </ul>
        </div>
    );
}
