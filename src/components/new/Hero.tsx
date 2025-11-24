function Hero() {
    return (
        <section id="home" className="relative text-white py-20 overflow-hidden isolate z-20 scroll-mt-20" style={{ background: 'transparent' }}>

            <div className="container mx-auto px-4 relative z-10">
                <div className="flex flex-col md:flex-row items-center justify-between gap-x-16 pt-10">
                    {/* Left Column: Text and CTAs */}
                    <div className="md:w-1/2 text-center md:text-left mb-12 md:mb-0">
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
                            Think Less <span className="text-blue-400">Do More</span>
                        </h1>
                        <p className="text-gray-300 text-lg md:text-xl mb-8 max-w-lg mx-auto md:mx-0">
                            Let Cooldesk organize your browsing so you can focus. Your browser, finally working at your speed.
                        </p>
                        <div className="flex flex-col items-center md:items-start gap-4">
                            <a
                                href="https://chromewebstore.google.com/detail/cooldesk/ioggffobciopdddacpclplkeodllhjko"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-lg font-medium text-center transition-all duration-200 shadow-lg shadow-blue-500/20 hover:shadow-blue-500/30 transform hover:-translate-y-0.5"
                            >
                                Add Extension
                            </a>
                            <div className="flex items-center gap-2 text-gray-400 text-sm">
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
