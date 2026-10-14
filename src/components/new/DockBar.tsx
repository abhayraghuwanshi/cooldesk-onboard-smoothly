import { CALLOUTS } from './dockCallouts';

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
 *
 * `active` (a callout's index) lights that callout and spotlights its part of
 * the bar (`span`: left and right edge, % of the screenshot); the section's
 * tour drives it.
 */

const ALT =
    'CoolDesk’s bottom bar for the calculatecost.cloud space: links to InfraPlan, GitHub and the production site, a dev server running on port 3000, and repo folders on the main branch.';

export default function DockBar({ active = null }: { active?: number | null }) {
    const spot = active === null ? null : CALLOUTS[active].span;
    return (
        <div className="w-full">
            {/* The desk: a neutral, barely-there surface with the real bar floating near the bottom. */}
            <div className="rounded-3xl border border-white/[0.07] bg-[linear-gradient(180deg,rgba(255,255,255,0.035)_0%,rgba(255,255,255,0.01)_100%)] overflow-x-auto">
                <div className="relative mx-auto w-[1200px] max-w-none px-0 pt-10 pb-10 md:pt-28 md:pb-14">
                    {/* Callouts (wide screens): a label and a hairline down to the bar. */}
                    <div className="hidden md:block" aria-hidden="true">
                        {CALLOUTS.map((c, i) => (
                            <div
                                key={c.label}
                                className="absolute bottom-[calc(3.5rem+50px)] flex flex-col"
                                style={{
                                    left: `${c.at}%`,
                                    transform: c.align === 'center' ? 'translateX(-50%)' : c.align === 'right' ? 'translateX(-100%)' : undefined,
                                    alignItems: c.align === 'left' ? 'flex-start' : c.align === 'right' ? 'flex-end' : 'center',
                                }}
                            >
                                <span className={`whitespace-nowrap text-xs font-medium transition-colors duration-500 ${active === null ? 'text-white/60' : active === i ? 'text-white' : 'text-white/30'}`}>{c.label}</span>
                                <span className={`mt-2 h-10 w-px transition-colors duration-500 ${active === i ? 'bg-sky-300 shadow-[0_0_8px_rgba(125,211,252,0.9)]' : 'bg-white/25'}`} />
                            </div>
                        ))}
                    </div>

                    {/* The bar's frame: an even border on all four sides, padded in the bar's own colour. */}
                    <div className="w-[1200px] rounded-2xl border border-white/10 bg-[#19191d] px-2 py-1.5 shadow-[0_24px_60px_-20px_rgba(0,0,0,0.8)]">
                        <div className="relative overflow-hidden rounded-lg">
                            <img
                                src="/images/dock-bar.jpg"
                                alt={ALT}
                                width={2400}
                                height={73}
                                loading="lazy"
                                decoding="async"
                                className="block w-full h-auto"
                            />
                            {/* The spotlight: the rest of the bar dims while one part is described */}
                            <div
                                className="absolute inset-y-0 rounded-lg border border-sky-300/80 shadow-[0_0_0_3000px_rgba(3,4,10,0.55)] transition-all duration-700 ease-[cubic-bezier(.2,.8,.2,1)] motion-reduce:transition-none"
                                style={spot ? { left: `${spot[0]}%`, width: `${spot[1] - spot[0]}%`, opacity: 1 } : { left: 0, width: '100%', opacity: 0 }}
                                aria-hidden="true"
                            />
                        </div>
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
