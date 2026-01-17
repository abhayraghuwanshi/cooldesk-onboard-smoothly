export default function Pricing() {
    return (
        <section id="pricing" className="h-screen bg-black relative overflow-hidden flex items-center justify-center">
            {/* Animated Background Gradient */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute top-1/2 left-1/4 w-[600px] h-[600px] bg-blue-500/20 rounded-full blur-[150px] animate-float" />
                <div className="absolute top-1/3 right-1/4 w-[500px] h-[500px] bg-purple-500/15 rounded-full blur-[130px] animate-float-delay-1" />
                <div className="absolute bottom-1/4 left-1/2 w-[550px] h-[550px] bg-cyan-500/10 rounded-full blur-[140px] animate-float-delay-2" />
            </div>

            <div className="container mx-auto px-4 md:px-6 relative z-10 h-full flex items-center justify-center">
                <div className="text-center max-w-7xl mx-auto w-full">
                    {/* Main Heading - Responsive Massive Typography */}
                    <div className="mb-4 sm:mb-6 md:mb-8 overflow-hidden">
                        <h1 className="display-xl text-gradient leading-[0.8] tracking-tighter animate-gradient animate-fade-in-up select-none">
                            FREE
                        </h1>
                        <h1 className="display-xl text-gradient-accent leading-[0.8] tracking-tighter animate-gradient animate-fade-in-up-delay-1 -mt-4 sm:-mt-6 md:-mt-8 lg:-mt-10 select-none">
                            TO
                        </h1>
                        <h1 className="display-xl text-gradient leading-[0.8] tracking-tighter animate-gradient animate-fade-in-up-delay-2 -mt-4 sm:-mt-6 md:-mt-8 lg:-mt-10 select-none">
                            USE
                        </h1>
                    </div>

                    {/* Subheading */}
                    <p className="heading-4 text-txt-secondary font-light mb-6 sm:mb-8 tracking-tight leading-tight max-w-4xl mx-auto animate-fade-in-up-delay-3">
                        No hidden costs. No subscriptions. Just pure productivity.
                    </p>

                    {/* Call to Action */}
                    <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-fade-in-up-delay-4">
                        <a
                            href="https://chromewebstore.google.com/detail/cooldesk/ioggffobciopdddacpclplkeodllhjko"
                            className="btn-gradient btn-lg rounded-full hover:scale-110 hover:shadow-2xl hover:shadow-purple-500/50 transition-all duration-300 shadow-xl shadow-blue-500/30 animate-pulse-glow"
                        >
                            Get Started Now
                        </a>
                        <span className="caption text-txt-muted font-medium">Forever Free</span>
                    </div>
                </div>
            </div>

            <style jsx>{`
                @keyframes gradient {
                    0%, 100% { background-position: 0% 50%; }
                    50% { background-position: 100% 50%; }
                }
                @keyframes float {
                    0%, 100% { transform: translate(0, 0) scale(1); }
                    33% { transform: translate(30px, -30px) scale(1.1); }
                    66% { transform: translate(-20px, 20px) scale(0.9); }
                }
                @keyframes fadeInUp {
                    from {
                        opacity: 0;
                        transform: translateY(30px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
                @keyframes pulseGlow {
                    0%, 100% { box-shadow: 0 0 20px rgba(59, 130, 246, 0.3); }
                    50% { box-shadow: 0 0 40px rgba(147, 51, 234, 0.5); }
                }
                .animate-gradient {
                    background-size: 200% 200%;
                    animation: gradient 4s ease infinite;
                }
                .animate-float {
                    animation: float 8s ease-in-out infinite;
                }
                .animate-float-delay-1 {
                    animation: float 10s ease-in-out infinite;
                    animation-delay: 1s;
                }
                .animate-float-delay-2 {
                    animation: float 12s ease-in-out infinite;
                    animation-delay: 2s;
                }
                .animate-fade-in-up {
                    animation: fadeInUp 0.8s ease-out forwards;
                }
                .animate-fade-in-up-delay-1 {
                    opacity: 0;
                    animation: fadeInUp 0.8s ease-out 0.2s forwards;
                }
                .animate-fade-in-up-delay-2 {
                    opacity: 0;
                    animation: fadeInUp 0.8s ease-out 0.4s forwards;
                }
                .animate-fade-in-up-delay-3 {
                    opacity: 0;
                    animation: fadeInUp 0.8s ease-out 0.6s forwards;
                }
                .animate-fade-in-up-delay-4 {
                    opacity: 0;
                    animation: fadeInUp 0.8s ease-out 0.8s forwards;
                }
                .animate-fade-in-up-delay-5 {
                    opacity: 0;
                    animation: fadeInUp 0.8s ease-out 1s forwards;
                }
                .animate-fade-in-up-delay-6 {
                    opacity: 0;
                    animation: fadeInUp 0.8s ease-out 1.2s forwards;
                }
                .animate-pulse-glow {
                    animation: pulseGlow 2s ease-in-out infinite;
                }
            `}</style>
        </section>
    );
}