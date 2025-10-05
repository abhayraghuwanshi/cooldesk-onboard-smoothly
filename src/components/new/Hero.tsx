function Hero() {
    return (
        <section className="relative text-white py-20 overflow-hidden isolate z-20" style={{ background: 'transparent' }}>

            <div className="container mx-auto px-4 relative z-10">
                <div className="flex flex-col md:flex-row items-center justify-between gap-x-16 pt-10">
                    {/* Left Column: Text and CTAs */}
                    <div className="md:w-1/2 text-center md:text-left mb-12 md:mb-0">
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
                            Think Less <span className="text-blue-400">Do More</span>
                        </h1>
                        <p className="text-gray-300 text-lg md:text-xl mb-8 max-w-lg mx-auto md:mx-0">
                            Let Cooldesk organize your browsing so you can focus. Your browser, finally working at your speed. cool right??
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                            <a href="#" className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium text-center transition-colors duration-200 shadow-lg shadow-blue-500/20">
                                Edge and Chrome
                            </a>
                            <a href="#" className="border border-blue-400 text-blue-400 hover:text-white hover:border-white px-6 py-3 rounded-lg font-medium text-center transition-colors duration-200">
                                Add Extension
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Hero;
