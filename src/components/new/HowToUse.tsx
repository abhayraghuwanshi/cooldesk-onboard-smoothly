
export default function HowToUse() {
    const steps = [
        {
            number: "01",
            title: "Add to Chrome",
            description: "Visit the Chrome Web Store and click the blue 'Add to Chrome' button.",
            icon: (
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4v16m8-8H4" />
                </svg>
            )
        },
        {
            number: "02",
            title: "Pin the Extension",
            description: "Click the 🧩 puzzle icon in your browser toolbar and pin CoolDesk.",
            icon: (
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                </svg>
            )
        },
        {
            number: "03",
            title: "Open a New Tab",
            description: "That's it! Open a new tab to see your new intelligent dashboard instantly.",
            icon: (
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
            )
        }
    ];

    return (
        <section id="how-to-use" className="relative py-24 bg-zinc-950 overflow-hidden">
            {/* Background Aesthetics */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[300px] bg-blue-600/5 blur-[100px] rounded-full pointer-events-none" />

            <div className="container mx-auto px-6 relative z-10">

                {/* Simplified Header */}
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                        Get Started in <span className="text-blue-500">Seconds</span>
                    </h2>
                    <p className="text-zinc-400 max-w-xl mx-auto">
                        No complex setup. No credit card. Just pure productivity.
                    </p>
                </div>

                {/* The Linear 3-Step Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto relative mb-24">
                    {/* Connecting Line (Desktop Only) */}
                    <div className="hidden md:block absolute top-12 left-[16%] right-[16%] h-px bg-gradient-to-r from-zinc-800 via-blue-500/50 to-zinc-800 -z-10" />

                    {steps.map((step, index) => (
                        <div key={index} className="relative group">
                            <div className="bg-zinc-900/50 backdrop-blur-sm border border-white/5 rounded-2xl p-8 hover:bg-zinc-900 transition-colors duration-300 h-full flex flex-col items-center text-center">
                                {/* Step Number Badge */}
                                <div className="w-12 h-12 bg-zinc-800 rounded-xl border border-white/10 flex items-center justify-center text-blue-400 mb-6 shadow-lg shadow-black/50 group-hover:scale-110 transition-transform duration-300 group-hover:border-blue-500/30">
                                    {step.icon}
                                </div>
                                <div className="text-sm font-mono text-blue-500 mb-2 font-bold tracking-wider">
                                    STEP {step.number}
                                </div>
                                <h3 className="text-xl font-bold text-white mb-3">
                                    {step.title}
                                </h3>
                                <p className="text-zinc-400 text-sm leading-relaxed">
                                    {step.description}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>

                {/* --- NEW SECTION: THE "PRO TIP" / LOGIN EXPLAINER --- */}
                <div className="max-w-5xl mx-auto mb-16">
                    <div className="bg-gradient-to-r from-blue-900/10 to-purple-900/10 border border-blue-500/20 rounded-2xl p-8 md:p-10 flex flex-col md:flex-row items-center gap-8 md:gap-12 relative overflow-hidden">

                        {/* Glowing Background Effect */}
                        <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 blur-[80px] rounded-full pointer-events-none" />

                        {/* Left: Text Content */}
                        <div className="flex-1 text-center md:text-left relative z-10">
                            <div className="inline-flex items-center gap-2 bg-blue-500/10 border border-blue-500/20 rounded-full px-3 py-1 text-blue-400 text-xs font-bold mb-4 uppercase tracking-wider">
                                <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                                Pro Tip
                            </div>
                            <h3 className="text-2xl font-bold text-white mb-3">
                                Unlock AI & Cloud Sync
                            </h3>
                            <p className="text-zinc-400 text-base leading-relaxed mb-6">
                                CoolDesk works perfectly offline. But if you log in with Google, you unlock <b>AI Categorization</b> and <b>Cross-Device Sync</b>.
                            </p>

                            {/* Comparison List */}
                            <div className="flex flex-col gap-2.5 bg-black/20 p-4 rounded-xl border border-white/5">
                                <div className="flex items-center gap-3 text-zinc-500 text-sm">
                                    <div className="w-5 h-5 rounded-full border border-zinc-700 flex items-center justify-center text-[10px]">✕</div>
                                    <span>Guest: Local Storage Only</span>
                                </div>
                                <div className="flex items-center gap-3 text-white font-medium text-sm">
                                    <div className="w-5 h-5 rounded-full bg-blue-500 flex items-center justify-center text-white text-[10px]">✓</div>
                                    <span>Logged In: <span className="text-blue-400">AI Categorisation</span> & Team Sync</span>
                                </div>
                            </div>
                        </div>

                        {/* Right: Visual Cue (Mini UI Mockup) */}
                        <div className="w-full md:w-5/12 relative z-10">
                            <div className="bg-zinc-950 border border-zinc-800 rounded-xl p-5 shadow-2xl">
                                <div className="flex items-center justify-between mb-4 pb-4 border-b border-white/5">
                                    <span className="text-xs font-bold text-zinc-500">EXTENSION SETTINGS</span>
                                    <div className="flex gap-1.5">
                                        <div className="w-2 h-2 rounded-full bg-zinc-800"></div>
                                        <div className="w-2 h-2 rounded-full bg-zinc-800"></div>
                                    </div>
                                </div>
                                {/* Mock Login Button */}
                                <div className="bg-white/5 rounded-lg p-1">
                                    <div className="bg-blue-600 text-white text-sm font-bold py-2.5 rounded flex items-center justify-center gap-2 cursor-default">
                                        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="white" /></svg>
                                        Login with Google
                                    </div>
                                </div>
                                <div className="mt-3 text-center">
                                    <span className="text-[10px] text-zinc-600 uppercase tracking-widest">or stay local</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Final CTA Button */}
                <div className="text-center">
                    <a
                        href="https://chromewebstore.google.com/detail/cooldesk/ioggffobciopdddacpclplkeodllhjko"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 bg-white text-black px-8 py-4 rounded-xl font-bold hover:bg-zinc-200 transition-all hover:scale-105 active:scale-95 shadow-xl shadow-white/5"
                    >
                        <span>Add to Chrome - It's Free</span>
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                    </a>
                    <p className="text-zinc-600 text-xs mt-4">
                        Version 1.0 • Privacy First • No Credit Card Required
                    </p>
                </div>

            </div>
        </section>
    );
}