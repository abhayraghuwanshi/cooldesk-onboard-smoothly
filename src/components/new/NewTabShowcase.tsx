import { CHROME_STORE } from '@/config/site';
import { trackEvent, useSectionView } from '@/lib/analytics';
import { ArrowRight } from 'lucide-react';

/**
 * The Chrome extension's new tab: a real screenshot
 * (public/images/new-tab.jpg, 2048×792, cropped from new-tab-2.png in the app
 * repo). The crop stops above the "bank.in" group on purpose — never publish
 * a screenshot that shows which banks or payment pages someone uses. The
 * bottom fades into the page because any crop that high cuts the panels.
 *
 * Claims must match what's in the shot: widgets (clock, day progress), today's
 * timeline, favorites, the activity filters, and sites' services grouped by
 * domain ("Suites").
 */

const POINTS = [
    'Widgets you add yourself',
    'Where your day went, by the hour',
    'Every site’s pages, grouped together',
];

const ALT =
    'The CoolDesk new tab: clock and day-progress widgets, today’s activity timeline, favorite sites, and 27 Google services grouped under google.com, over a night-time earth wallpaper.';

export default function NewTabShowcase() {
    const sectionRef = useSectionView<HTMLElement>('new_tab_showcase');

    return (
        <section ref={sectionRef} className="relative text-white">
            <div className="container mx-auto px-6">
                <div className="text-center max-w-2xl mx-auto">
                    <h2 className="font-display text-4xl md:text-5xl font-bold tracking-tight">Your new tab, organized too</h2>
                    <p className="mt-3 text-white/55 text-base md:text-lg">
                        The free Chrome extension turns every new tab into your dashboard: the sites you use most, each site’s
                        pages grouped together, and a timeline of where your day went.
                    </p>
                </div>

                {/* The screenshot, fading out at the bottom. */}
                <div className="mt-12 rounded-3xl border border-white/[0.07] overflow-hidden shadow-[0_30px_80px_-30px_rgba(0,0,0,0.9)]">
                    <img
                        src="/images/new-tab.jpg"
                        alt={ALT}
                        width={2048}
                        height={792}
                        loading="lazy"
                        decoding="async"
                        className="block w-full h-auto [mask-image:linear-gradient(to_bottom,black_72%,transparent)]"
                    />
                </div>

                <div className="mt-8 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
                    <ul className="flex flex-col sm:flex-row sm:flex-wrap gap-x-8 gap-y-2 text-sm text-white/55">
                        {POINTS.map((p) => (
                            <li key={p}>{p}</li>
                        ))}
                    </ul>
                    <a
                        href={CHROME_STORE}
                        onClick={() => trackEvent('new_tab_showcase_cta', { target: 'chrome' })}
                        className="group inline-flex items-center gap-2 self-start md:self-auto rounded-full border border-white/15 px-5 py-2.5 text-sm font-semibold text-white/85 hover:text-white hover:border-white/30 transition-colors"
                    >
                        Add to Chrome, free
                        <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
                    </a>
                </div>
            </div>
        </section>
    );
}
