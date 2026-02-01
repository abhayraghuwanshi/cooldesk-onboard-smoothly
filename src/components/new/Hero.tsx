function Hero() {
    return (
        <section id="home" className="relative text-white py-20 overflow-hidden isolate z-20 scroll-mt-20" style={{ background: 'transparent' }}>

            <div className="container mx-auto px-4 relative z-10">
                <div className="flex flex-col md:flex-row items-center justify-between gap-x-16 pt-10">
                    {/* Left Column: Text and CTAs */}
                    <div className="md:w-1/2 text-center md:text-left mb-12 md:mb-0">
                        <h1 className="heading-hero mb-6">
                            Think Less <span className="text-txt-accent">Do More</span>
                        </h1>
                        <p className="body-lg max-w-lg mx-auto md:mx-0 mb-8">
                            Transform your <b>New Tab</b> into a powerful project dashboard. Cooldesk organizes your browsing so you can focus. Your browser, finally working at your speed.
                        </p>
                        <div className="flex flex-col items-center md:items-start gap-4">
                            <a
                                href="https://chromewebstore.google.com/detail/cooldesk/ioggffobciopdddacpclplkeodllhjko"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="btn-primary btn-lg font-medium"
                            >
                                Add Extension
                            </a>
                            <div className="flex flex-wrap items-center gap-4 text-xs font-semibold">
                                <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-green-500/10 text-green-400 border border-green-500/20">
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

                            <div className="flex items-center gap-2 text-txt-muted text-sm mt-4">
                                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                                </svg>
                                <span>Available on Chrome, Brave & Edge</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Hero;
