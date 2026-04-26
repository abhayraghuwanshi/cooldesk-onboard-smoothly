import WorkspacePreview from './WorkspacePreview';

function Hero() {
    return (
        <section id="home" className="relative text-white overflow-hidden isolate z-20 scroll-mt-20 min-h-screen flex items-center">

            {/* Background Image */}
            <img
                src="/main-image (2).png"
                alt=""
                className="absolute inset-0 w-full h-full object-cover z-0"
                fetchPriority="high"
            />

            {/* Overlay */}
            <div className="absolute inset-0 z-10 bg-gradient-to-r from-black/90 via-black/75 to-black/40" />

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
                            For builders and developers
                        </div>

                        {/* Headline */}
                        <h1 className="heading-hero mb-6 text-white leading-tight">
                            Your workspace.{' '}
                            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-cyan-300">
                                Reimagined.
                            </span>
                        </h1>

                        {/* Sub */}
                        <p className="body-lg max-w-md mb-10 text-white/70 leading-relaxed">
                            Browser tabs, desktop apps, links, and notes — grouped by project in one new tab. Built for people who juggle projects all day.
                        </p>

                        {/* CTAs */}
                        <div className="flex flex-wrap items-center gap-4 mb-10">
                            <a
                                href="#downloads"
                                className="btn-primary btn-xl font-bold shadow-lg shadow-blue-500/30 hover:shadow-blue-500/50 transition-all transform hover:-translate-y-1"
                            >
                                Get Started
                            </a>
                            <a
                                href="#navigation"
                                className="btn-xl font-semibold text-white/80 hover:text-white border border-white/20 hover:border-white/40 rounded-xl px-6 py-3 transition-all backdrop-blur-sm bg-white/5 hover:bg-white/10"
                            >
                                See How It Works
                            </a>
                        </div>

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

                    {/* Right: Interactive Workspace Preview */}
                    <div className="flex-1 flex justify-center md:justify-end">
                        <WorkspacePreview />
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
