function Hero() {
    return (
        <section id="home" className="relative text-white py-20 overflow-hidden isolate z-20 scroll-mt-20" style={{ background: 'transparent' }}>

            <div className="container mx-auto px-4 relative z-10">
                <div className="flex flex-col md:flex-row items-center justify-between gap-x-16 pt-10">
                    {/* Left Column: Text and CTAs */}
                    <div className="md:w-1/2 text-center md:text-left mb-12 md:mb-0">
                        <h1 className="heading-hero mb-6 text-txt-primary">
                            Think Less <span className="text-txt-accent bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-cyan-300">Do More</span>
                        </h1>
                        <p className="body-lg max-w-lg mx-auto md:mx-0 mb-8 text-txt-secondary leading-relaxed">
                            Stop losing context. Cooldesk's <strong className="text-white">extension + desktop app</strong> combo <strong className="text-white">AI auto-saves & organizes</strong> every URL you visit, giving you <strong className="text-white">instant search</strong> across all your devices.
                        </p>

                        {/* Key Features List */}
                        <div className="flex flex-col gap-3 mb-10 pl-2">
                            <div className="flex items-center gap-3">
                                <div className="p-1 rounded-full bg-green-500/20 text-green-400">
                                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                                    </svg>
                                </div>
                                <span className="text-lg text-txt-primary"><strong className="text-white">AI Auto-Save</strong> & Organize Workspace</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <div className="p-1 rounded-full bg-blue-500/20 text-blue-400">
                                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                    </svg>
                                </div>
                                <span className="text-lg text-txt-primary"><strong className="text-white">Search</strong> Apps, Notes & every URL</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <div className="p-1 rounded-full bg-purple-500/20 text-purple-400">
                                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                    </svg>
                                </div>
                                <span className="text-lg text-txt-primary"><strong className="text-white">Zero-Config</strong> Sync</span>
                            </div>
                        </div>

                        <div className="flex flex-col items-center md:items-start gap-4">
                            <a
                                href="#downloads"
                                className="btn-primary btn-xl font-bold shadow-lg shadow-blue-500/20 hover:shadow-blue-500/40 transition-all transform hover:-translate-y-1"
                            >
                                Get Started — It's Free
                            </a>
                            <div className="flex flex-wrap items-center gap-4 text-xs font-semibold text-txt-muted mt-2">
                                <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 border border-white/10">
                                    <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                                    </svg>
                                    100% Free
                                </span>
                                <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20">
                                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                                    </svg>
                                    No Sign-in Required
                                </span>
                            </div>

                            <div className="flex flex-col gap-2 mt-4">
                                <div className="flex items-center gap-2 text-txt-muted text-sm">
                                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                                    </svg>
                                    <span>Extension for Chrome, Brave & Edge</span>
                                </div>
                                <div className="flex items-center gap-2 text-txt-muted text-sm">
                                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                                    </svg>
                                    <span>Desktop app for Windows, Mac & Linux</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Hero;
