import { CHROME_STORE } from '@/config/site';
import { trackEvent, useSectionView } from '@/lib/analytics';
import { ArrowRight, ArrowRightLeft, RefreshCw, Share2 } from 'lucide-react';

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
 *
 * The connection claims follow cooldesk-extension/src: background/bridge.js
 * pushes every open tab to the desktop app (push-tabs) and handles the app's
 * jump-to-tab / close-tab, routed to the right browser by deviceId;
 * services/syncWebSocket.js syncs spaces, notes, pins and settings both ways;
 * services/syncConfig.js — the sync is to the app on localhost only.
 */

const CONNECTS = [
    {
        Icon: Share2,
        title: 'Shares your open tabs',
        text: 'The desktop app sees what’s open in Chrome, Edge or Brave, so Spotlight and your spaces can find it.',
    },
    {
        Icon: ArrowRightLeft,
        title: 'Jump or close from the app',
        text: 'Pick a tab in CoolDesk and it switches to it in the right browser window, instead of opening a copy.',
    },
    {
        Icon: RefreshCw,
        title: 'Keeps both in sync',
        text: 'Spaces, notes and pins you change in one show up in the other. All on your computer, never a server.',
    },
];

const ALT =
    'The CoolDesk new tab: clock and day-progress widgets, today’s activity timeline, favorite sites, and 27 Google services grouped under google.com, over a night-time earth wallpaper.';

export default function NewTabShowcase() {
    const sectionRef = useSectionView<HTMLElement>('new_tab_showcase');

    return (
        <section ref={sectionRef} className="relative text-white">
            <div className="container mx-auto px-6">
                {/* Title and intro on the left, the install button on the right */}
                <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
                    <div className="max-w-2xl">
                        <h2 className="font-display text-4xl md:text-5xl font-bold tracking-tight">Connect your browser</h2>
                        <p className="mt-3 text-white/55 text-base md:text-lg">
                            The free extension links Chrome, Edge or Brave to the desktop app, so CoolDesk knows your tabs. It
                            also turns every new tab into your dashboard.
                        </p>
                    </div>

                    {/* The Chrome Web Store listing installs in Edge and Brave too. */}
                    <div className="flex shrink-0 flex-col items-start md:items-end">
                        <a
                            href={CHROME_STORE}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={() => trackEvent('new_tab_showcase_cta', { target: 'chrome', placement: 'header' })}
                            className="group inline-flex h-12 items-center gap-2 rounded-xl bg-white px-6 text-sm font-semibold text-black shadow-[0_0_0_1px_rgba(255,255,255,0.2),0_8px_30px_rgba(56,189,248,0.25)] transition-transform hover:-translate-y-px"
                        >
                            Add to Chrome, free
                            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                        </a>
                        <p className="mt-2 text-xs text-white/35">Also works in Edge and Brave</p>
                    </div>
                </div>

                {/* What the connection does */}
                <ul className="mt-12 grid gap-4 md:grid-cols-3">
                    {CONNECTS.map(({ Icon, title, text }) => (
                        <li key={title} className="rounded-2xl border border-white/10 bg-white/[0.025] p-5">
                            <span className="grid h-9 w-9 place-items-center rounded-xl bg-sky-400/10 text-sky-300">
                                <Icon className="h-4 w-4" />
                            </span>
                            <h3 className="mt-4 text-base font-semibold text-white">{title}</h3>
                            <p className="mt-1.5 text-sm leading-relaxed text-white/50">{text}</p>
                        </li>
                    ))}
                </ul>


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
            </div>
        </section>
    );
}
