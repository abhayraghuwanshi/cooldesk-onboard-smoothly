
// Inline icons for zero dependencies
const Icons = {
    Check: () => (
        <svg className="w-5 h-5 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
        </svg>
    ),
    Cross: () => (
        <svg className="w-5 h-5 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 18L18 6M6 6l12 12" />
        </svg>
    ),
    Search: () => (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
    ),
    Layout: () => (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
        </svg>
    ),
    Mic: () => (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
        </svg>
    ),
    Note: () => (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
        </svg>
    )
};

const comparisons = [
    {
        icon: <Icons.Search />,
        problem: "Lost in 50+ open tabs?",
        without: "Waste 5+ minutes daily clicking through tabs to find what you need",
        with: "Type 2 words, find any tab instantly",
        feature: "Almighty Search"
    },
    {
        icon: <Icons.Layout />,
        problem: "Work tabs mixed with personal?",
        without: "Everything cluttered together—no separation, no focus",
        with: "Auto-organized workspaces keep work, research, and personal browsing separate",
        feature: "Smart Workspaces"
    },
    {
        icon: <Icons.Mic />,
        problem: "Hands glued to mouse and keyboard?",
        without: "Every scroll, click, and tab switch requires manual input",
        with: "Control your browser completely hands-free with voice commands",
        feature: "Voice Navigation",
        example: '"Switch to Gmail" • "Scroll down"'
    },
    {
        icon: <Icons.Note />,
        problem: "Important info scattered everywhere?",
        without: "Copy-paste to 3 different apps, lose the source link every time",
        with: "One-click capture with automatic source tracking and timestamps",
        feature: "Daily Notes"
    }
];

export default function NavigationComparison() {
    return (
        <section className="relative py-24 bg-zinc-950">
            {/* Header */}
            <div className="container mx-auto px-6 relative z-10">
                <div className="text-center mb-20">
                    <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 leading-tight">
                        Stop Fighting Your Browser.
                        <br className="hidden md:block" />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500"> Start Working Smarter.</span>
                    </h2>
                    <p className="text-lg md:text-xl text-zinc-400 max-w-3xl mx-auto">
                        The average person wastes <strong className="text-white">2 hours per week</strong> managing tabs. Here's how CoolDesk fixes that.
                    </p>
                </div>

                {/* Comparison Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
                    {comparisons.map((item, index) => (
                        <div key={index} className="group relative bg-zinc-900/50 rounded-2xl border border-white/5 overflow-hidden hover:border-blue-500/30 transition-all duration-300">

                            {/* Card Header with Icon */}
                            <div className="p-6 border-b border-white/5 flex items-center gap-4 bg-white/5">
                                <div className="w-12 h-12 rounded-xl bg-zinc-800 flex items-center justify-center text-blue-400 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                                    {item.icon}
                                </div>
                                <h3 className="text-xl font-bold text-white">{item.problem}</h3>
                            </div>

                            {/* The Comparison Body */}
                            <div className="p-6 grid gap-6">

                                {/* The Old Way (Grayed out) */}
                                <div className="relative pl-8 opacity-60 group-hover:opacity-40 transition-opacity duration-300">
                                    <div className="absolute left-0 top-1">
                                        <Icons.Cross />
                                    </div>
                                    <p className="text-sm font-semibold text-red-300 uppercase tracking-wider mb-1">The Old Way</p>
                                    <p className="text-zinc-400 leading-relaxed">{item.without}</p>
                                </div>

                                {/* Divider */}
                                <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>

                                {/* The CoolDesk Way (Highlighted) */}
                                <div className="relative pl-8">
                                    <div className="absolute left-0 top-1">
                                        <Icons.Check />
                                    </div>
                                    <p className="text-sm font-semibold text-green-400 uppercase tracking-wider mb-1">With CoolDesk</p>
                                    <p className="text-white text-lg leading-relaxed font-medium shadow-black drop-shadow-md">{item.with}</p>

                                    <div className="mt-3 flex flex-wrap items-center gap-2">
                                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-500/10 text-blue-400 border border-blue-500/20">
                                            {item.feature}
                                        </span>
                                        {item.example && (
                                            <span className="text-xs text-zinc-500 italic">
                                                {item.example}
                                            </span>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Social Proof Stats */}
                <div className="mt-20">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto divide-y md:divide-y-0 md:divide-x divide-zinc-800 bg-zinc-900/30 rounded-2xl p-8 border border-white/5">
                        <div className="text-center px-4 pt-4 md:pt-0">
                            <div className="text-4xl font-bold text-blue-500 mb-2">2hrs</div>
                            <div className="text-zinc-400 text-sm">Saved weekly per user</div>
                        </div>
                        <div className="text-center px-4 pt-4 md:pt-0">
                            <div className="text-4xl font-bold text-green-500 mb-2">90%</div>
                            <div className="text-zinc-400 text-sm">Reduction in tab clutter</div>
                        </div>
                        <div className="text-center px-4 pt-4 md:pt-0">
                            <div className="text-4xl font-bold text-purple-500 mb-2">3sec</div>
                            <div className="text-zinc-400 text-sm">Avg. time to find any tab</div>
                        </div>
                    </div>
                </div>

                {/* Bottom CTA */}
                <div className="text-center mt-16">
                    <a
                        href="https://chromewebstore.google.com/detail/cooldesk/ioggffobciopdddacpclplkeodllhjko"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center px-8 py-4 text-base font-bold text-black transition-all duration-200 bg-white rounded-full hover:bg-zinc-200 hover:scale-105 shadow-lg shadow-white/10"
                    >
                        Reclaim Your Browser Now
                        <svg className="w-5 h-5 ml-2 -mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                    </a>
                </div>
            </div>
        </section>
    );
}