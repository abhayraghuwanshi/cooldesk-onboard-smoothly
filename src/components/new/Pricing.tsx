export default function Pricing() {
    return (
        <section id="pricing" className="h-screen bg-black relative overflow-hidden flex items-center justify-center">
            {/* Animated Background Gradient */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute top-1/2 left-1/4 w-[600px] h-[600px] bg-blue-500/30 rounded-full blur-[150px] animate-float-slow" />
                <div className="absolute top-1/3 right-1/4 w-[500px] h-[500px] bg-purple-500/25 rounded-full blur-[130px] animate-float-slower" />
                <div className="absolute bottom-1/4 left-1/2 w-[550px] h-[550px] bg-cyan-500/20 rounded-full blur-[140px] animate-float-slowest" />
            </div>

            <div className="container mx-auto px-4 md:px-6 relative z-10 h-full flex items-center justify-center">
                <div className="text-center max-w-7xl mx-auto w-full">
                    {/* Main Heading - Massive Typography */}
                    <div className="mb-6 sm:mb-8 md:mb-10 overflow-hidden">
                        <h1 className="text-[4rem] sm:text-[6rem] md:text-[8rem] lg:text-[10rem] xl:text-[12rem] font-black leading-[0.85] tracking-tighter animate-fade-in-up select-none
                                     bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-500 bg-clip-text text-transparent animate-gradient">
                            FREE
                        </h1>
                        <h1 className="text-[4rem] sm:text-[6rem] md:text-[8rem] lg:text-[10rem] xl:text-[12rem] font-black leading-[0.85] tracking-tighter animate-fade-in-up-1 select-none
                                     bg-gradient-to-r from-purple-400 via-fuchsia-500 to-pink-500 bg-clip-text text-transparent animate-gradient
                                     -mt-2 sm:-mt-4 md:-mt-6 lg:-mt-8">
                            TO
                        </h1>
                        <h1 className="text-[4rem] sm:text-[6rem] md:text-[8rem] lg:text-[10rem] xl:text-[12rem] font-black leading-[0.85] tracking-tighter animate-fade-in-up-2 select-none
                                     bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 bg-clip-text text-transparent animate-gradient
                                     -mt-2 sm:-mt-4 md:-mt-6 lg:-mt-8">
                            USE
                        </h1>
                    </div>

                    {/* Subheading */}
                    <p className="text-lg sm:text-xl md:text-2xl text-txt-secondary font-light mb-8 sm:mb-10 tracking-tight leading-relaxed max-w-4xl mx-auto animate-fade-in-up-3">
                        No hidden costs. No subscriptions. Just pure productivity.
                    </p>

                    {/* Call to Action */}
                    <div className="flex flex-col sm:flex-row gap-6 justify-center items-center animate-fade-in-up-4">
                        <a
                            href="https://chromewebstore.google.com/detail/cooldesk/ioggffobciopdddacpclplkeodllhjko"
                            className="px-8 py-4 text-lg font-bold rounded-full
                                     bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500
                                     hover:from-blue-400 hover:via-purple-400 hover:to-pink-400
                                     hover:scale-110 hover:shadow-2xl hover:shadow-purple-500/50
                                     transition-all duration-300 shadow-xl shadow-blue-500/30 animate-pulse-glow
                                     text-white"
                        >
                            Get Started Now
                        </a>
                        <span className="text-sm text-txt-muted font-medium tracking-wide">Forever Free • No Credit Card</span>
                    </div>
                </div>
            </div>
        </section>
    );
}
