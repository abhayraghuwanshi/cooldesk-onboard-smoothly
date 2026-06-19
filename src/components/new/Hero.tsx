import { site } from '@/config/site';
import { useSectionView } from '@/lib/analytics';
import React from 'react';

const WINGET_COMMAND = "winget install CoolDesk.CoolDesk";

function Hero() {
    const [copied, setCopied] = React.useState(false);
    const sectionRef = useSectionView<HTMLElement>('hero');

    function copyWinget() {
        navigator.clipboard.writeText(WINGET_COMMAND).then(() => {
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        });
    }

    return (
        <section ref={sectionRef} id="home" className="relative text-white overflow-hidden isolate z-20 scroll-mt-20 min-h-screen flex items-center">

            {/* Background base */}
            <div className="absolute inset-0 z-0 bg-black" />

            {/* Content */}
            <div className="relative z-20 w-full container mx-auto px-6">
                <div className="flex flex-col md:flex-row items-center gap-12 md:gap-16">

                    {/* Left: Text */}
                    <div className="flex-1 text-left">

                        {/* Badge */}
                        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 border border-white/20 text-xs font-semibold text-white/60 mb-6 backdrop-blur-sm">
                            <svg className="w-3.5 h-3.5 text-blue-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                            </svg>
                            {site.hero.badge}
                        </div>

                        {/* Headline */}
                        <h1 className="heading-hero mb-6 text-white leading-tight">
                            {site.hero.headlineLead}{' '}
                            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-cyan-300">
                                {site.hero.headlineAccent}
                            </span>
                        </h1>

                        {/* Sub */}
                        <p className="body-lg max-w-md mb-10 text-white/70 leading-relaxed">
                            {site.hero.sub}
                        </p>


                        {/* Winget install */}
                        {site.downloads.desktop && (
                            <div className="mb-8">
                                <p className="text-xs text-white/30 mb-2 font-semibold uppercase tracking-widest">Or install via Winget</p>
                                <button
                                    onClick={copyWinget}
                                    className="inline-flex items-center gap-3 px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all group"
                                >
                                    <span className="font-mono text-sm text-white/70 group-hover:text-white/90 transition-colors">{WINGET_COMMAND}</span>
                                    <span className="shrink-0 text-xs font-semibold text-white/40 group-hover:text-white/70 transition-colors flex items-center gap-1">
                                        {copied ? (
                                            <>
                                                <svg className="w-3.5 h-3.5 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                                                </svg>
                                                <span className="text-green-400">Copied</span>
                                            </>
                                        ) : (
                                            <>
                                                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                                                </svg>
                                                Copy
                                            </>
                                        )}
                                    </span>
                                </button>
                            </div>
                        )}

                        {/* Trust signals */}
                        <div className="flex flex-wrap items-center gap-5 text-xs font-semibold text-white/40">
                            <span className="flex items-center gap-1.5">
                                <svg className="w-3.5 h-3.5 text-green-400" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                                </svg>
                                100% Free
                            </span>
                            <span className="flex items-center gap-1.5">
                                <svg className="w-3.5 h-3.5 text-green-400" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                                </svg>
                                No Sign-in Required
                            </span>
                            <span className="flex items-center gap-1.5">
                                <svg className="w-3.5 h-3.5 text-green-400" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                                </svg>
                                Chrome, Brave & Edge
                            </span>
                        </div>

                    </div>

                    {/* Right: Spotlight Preview */}
                    <div className="flex-1 flex justify-center md:justify-end">
                        <div className="relative group w-full max-w-xl">
                            {/* Glow */}
                            <div className="absolute -inset-1 bg-gradient-to-r from-blue-500/30 to-purple-600/30 rounded-[20px] blur-xl opacity-60 group-hover:opacity-100 transition-opacity duration-700" />
                            <div className="relative rounded-[20px] overflow-hidden border border-white/10 shadow-2xl bg-[#0A0A0A]">
                                <img
                                    src="/cooldesk-new.png"
                                    alt="CoolDesk Spotlight — search workspaces, tabs and apps from anywhere"
                                    className="w-full h-auto"
                                />
                            </div>
                        </div>
                    </div>

                </div>
            </div>

            {/* Scroll indicator */}
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2 text-white/30 animate-bounce">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
            </div>

        </section>
    );
}

export default Hero;
