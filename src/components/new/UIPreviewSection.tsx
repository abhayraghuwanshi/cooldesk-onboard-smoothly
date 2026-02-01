import BrowserMockup from "./BrowserMockup";


export default function UIPreviewSection() {
    return (
        <section className="py-24 relative overflow-hidden bg-black isolate">
            {/* Background elements */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-blue-600/10 rounded-full blur-[120px] pointer-events-none -z-10" />

            <div className="container mx-auto px-6 text-center mb-16">
                <h2 className="heading-2 mb-6">Built for the <span className="text-gradient">Power User</span></h2>
                <p className="body-lg max-w-2xl mx-auto text-txt-secondary">
                    Experience a browser dashboard that actually helps you get things done. No friction, no login, just pure productivity.
                </p>
            </div>

            <div className="container mx-auto px-6">
                <div className="relative h-[600px] lg:h-[700px] flex items-center justify-center">
                    {/* Stacked Windows */}

                    {/* Bottom Window - Search */}
                    <div className="absolute top-[10%] left-[5%] w-[80%] md:w-[60%] lg:w-[50%] transform -rotate-3 hover:translate-y-[-10px] transition-transform duration-500 z-10">
                        <BrowserMockup url="cool-desk.com/search" height="350px">
                            <img src="/a2.png" alt="Real Search UI" className="w-full h-auto object-top" />
                        </BrowserMockup>
                    </div>

                    {/* Middle Window - Workspaces */}
                    <div className="absolute top-[20%] right-[10%] w-[80%] md:w-[60%] lg:w-[50%] transform rotate-2 hover:translate-y-[-15px] transition-transform duration-500 z-20">
                        <BrowserMockup url="cool-desk.com/workspaces" height="400px">
                            <img src="/a3.png" alt="Real Workspaces UI" className="w-full h-auto object-top" />
                        </BrowserMockup>
                    </div>

                    {/* Top/Main Window - Main Dashboard */}
                    <div className="absolute top-[35%] left-1/2 -translate-x-1/2 w-[90%] md:w-[80%] lg:w-[60%] transform hover:scale-[1.02] transition-transform duration-700 z-30 shadow-[0_50px_100px_-20px_rgba(0,0,0,0.5)]">
                        <BrowserMockup url="cool-desk.com/dashboard" height="450px" className="border-white/20 ring-1 ring-white/10">
                            <img src="/a1.png" alt="Real Dashboard UI" className="w-full h-auto object-top" />
                        </BrowserMockup>
                    </div>
                </div>
            </div>

            <style>{`
                @keyframes float {
                    0%, 100% { transform: translateY(0) rotate(var(--rot)); }
                    50% { transform: translateY(-20px) rotate(var(--rot)); }
                }
            `}</style>
        </section>
    );
}
