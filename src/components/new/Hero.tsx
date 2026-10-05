import { CHROME_STORE } from '@/config/site';
import { useLatestRelease } from '@/hooks/useLatestRelease';
import { trackEvent, useSectionView } from '@/lib/analytics';
import { ArrowRight } from 'lucide-react';
import React from 'react';
import { Keycap } from './Keycap';
import SpotlightHero from './SpotlightHero';
import NetworkBackdrop from './NetworkBackdrop';

function trackHeroCta(label: string, target: string) {
    trackEvent('hero_cta_click', {
        section: 'hero',
        action: 'click',
        cta_label: label,
        cta_target: target,
    });
}

const PLATFORMS = ['Windows', 'macOS', 'Linux', 'Chrome', 'Edge', 'Brave'];

/**
 * Each word fades up from dim, one after another (`offset` continues the count
 * across lines). Words in `bright` render in full white, so they stand out on a
 * dimmed line.
 */
function RevealWords({ text, offset = 0, bright = [] }: { text: string; offset?: number; bright?: string[] }) {
    const words = text.split(' ');
    return (
        <>
            {words.map((w, i) => (
                <React.Fragment key={i}>
                    <span
                        className={`inline-block motion-safe:animate-in motion-safe:fade-in-10 motion-safe:slide-in-from-bottom-1 duration-500 ease-out fill-mode-both ${bright.includes(w) ? 'text-white' : ''}`}
                        style={{ animationDelay: `${150 + (offset + i) * 90}ms` }}
                    >
                        {w}
                    </span>
                    {i < words.length - 1 ? ' ' : ''}
                </React.Fragment>
            ))}
        </>
    );
}

function Hero() {
    const sectionRef = useSectionView<HTMLElement>('hero');
    const release = useLatestRelease();

    return (
        <section ref={sectionRef} id="home" className="relative text-white overflow-hidden isolate z-20 scroll-mt-20">
            {/* Backdrop: black, a soft top light and a faint grid that fades out */}
            <div className="absolute inset-0 -z-10 bg-black" />
            <div className="absolute inset-x-0 top-0 h-[640px] -z-10 bg-[radial-gradient(ellipse_60%_50%_at_50%_0%,rgba(56,189,248,0.16),transparent_70%)]" />
            {/* Live network of how the pieces connect. The mask clears the middle
                for the headline and fades out before the search demo. */}
            <NetworkBackdrop
                className="absolute inset-x-0 top-0 -z-10 w-full h-[780px] [mask-image:radial-gradient(ellipse_34%_36%_at_50%_42%,transparent_0%,transparent_55%,black_85%),linear-gradient(to_bottom,black_60%,transparent_100%)] [mask-composite:intersect] [-webkit-mask-composite:source-in]"
            />

            <div className="container mx-auto px-6 pt-32 pb-12 md:pt-40 md:pb-16">
                <div className="flex flex-col items-center text-center">
                    <a
                        href="/releases"
                        className="group inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] pl-1.5 pr-3 py-1 text-xs text-white/60 hover:text-white hover:border-white/20 transition-colors mb-8"
                    >
                        <span className="rounded-full bg-sky-400/15 text-sky-300 px-2 py-0.5 font-semibold">v{release.version}</span>
                        Free &amp; open source
                        <ArrowRight className="w-3 h-3 transition-transform group-hover:translate-x-0.5" />
                    </a>

                    {/* Words light up in order on load: the same reveal the day's
                        headings use on scroll. Pure CSS, so it runs on the
                        prerendered HTML without waiting for JS. */}
                    <h1 className="font-display text-5xl sm:text-6xl md:text-7xl font-bold tracking-tight leading-[1.02] max-w-4xl">
                        <RevealWords text="Don't open apps." />
                        <br />
                        <span className="text-white/55">
                            <RevealWords text="Open spaces." offset={3} bright={['spaces.']} />
                        </span>
                    </h1>

                    {/* Leads with the one-sentence definition used in the meta description,
                        JSON-LD and llms.txt, so search and AI answers quote it consistently. */}
                    <p className="mt-6 text-base md:text-lg text-white/55 max-w-2xl leading-relaxed">
                        CoolDesk groups your tabs, apps and files into spaces, one for each project. Press Alt+K anywhere
                        and you’re back in. Free for Windows, macOS and Linux, with a new-tab extension for Chrome, Edge
                        and Brave.
                    </p>

                    <div className="mt-9 flex flex-col sm:flex-row items-center gap-3">
                        <a
                            href="#downloads"
                            onClick={() => trackHeroCta('download_free', 'downloads_section')}
                            className="group inline-flex items-center gap-2 rounded-xl bg-white px-6 h-12 text-sm font-semibold text-black shadow-[0_0_0_1px_rgba(255,255,255,0.2),0_8px_30px_rgba(56,189,248,0.25)] transition-transform hover:-translate-y-px"
                        >
                            Download free
                            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
                        </a>
                        <a
                            href={CHROME_STORE}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={() => trackHeroCta('add_to_chrome', 'chrome_web_store')}
                            className="inline-flex items-center gap-2 rounded-xl border border-white/15 bg-white/[0.04] px-6 h-12 text-sm font-semibold text-white/80 transition-colors hover:bg-white/[0.08] hover:text-white"
                        >
                            Add to Chrome
                        </a>
                    </div>

                    <div className="mt-16 md:mt-20 mb-6 flex items-center gap-2.5 text-sm text-white/50">
                        Press
                        <Keycap>Alt</Keycap>
                        <Keycap>K</Keycap>
                        anywhere, with the desktop app
                    </div>

                    <SpotlightHero />

                    <div className="mt-12 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs font-medium text-white/35">
                        <span className="text-white/25">Works on</span>
                        {PLATFORMS.map((p) => (
                            <span key={p}>{p}</span>
                        ))}
                        <span className="text-white/25">·</span>
                        <span>No sign-in</span>
                        <span>Local-first</span>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Hero;
