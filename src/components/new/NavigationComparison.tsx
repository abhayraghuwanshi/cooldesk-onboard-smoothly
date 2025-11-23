import { FaCheck, FaTimes } from "react-icons/fa";

const comparisons = [
    {
        problem: "Lost in 50+ open tabs?",
        without: "Waste 5+ minutes daily clicking through tabs to find what you need",
        with: "Type 2 words, find any tab instantly",
        feature: "Almighty Search"
    },
    {
        problem: "Work tabs mixed with personal?",
        without: "Everything cluttered together—no separation, no focus",
        with: "Auto-organized workspaces keep work, research, and personal browsing separate",
        feature: "Smart Workspaces"
    },
    {
        problem: "Hands glued to mouse and keyboard?",
        without: "Every scroll, click, and tab switch requires manual input",
        with: "Control your browser completely hands-free with voice commands",
        feature: "Voice Navigation",
        example: '"Switch to Gmail" • "Scroll down" • "Close this tab"'
    },
    {
        problem: "Important info scattered everywhere?",
        without: "Copy-paste to 3 different apps, lose the source link every time",
        with: "One-click capture with automatic source tracking and timestamps",
        feature: "Daily Notes"
    }
];

export default function NavigationComparison() {
    return (
        <section className="relative">
            {/* Header */}
            <div className="text-center mb-16">
                <h2 className="text-3xl md:text-5xl font-bold mb-4 leading-tight">
                    Stop Fighting Your Browser.
                    <br />
                    <span className="text-blue-400">Start Working Smarter.</span>
                </h2>
                <p className="text-lg md:text-xl text-gray-400 max-w-3xl mx-auto">
                    The average person wastes <strong className="text-white">2 hours per week</strong> managing tabs. Here's how CoolDesk fixes that.
                </p>
            </div>

            {/* Comparison Cards */}
            <div className="space-y-6 max-w-5xl mx-auto">
                {comparisons.map((item, index) => (
                    <div key={index} className="relative rounded-xl overflow-hidden bg-gradient-to-r from-blue-500/10 via-blue-600/5 to-transparent border-l-4 border-blue-400">
                        {/* Subtle glow effect */}
                        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-transparent pointer-events-none" />
                        
                        <div className="relative p-6 md:p-8">
                            <h3 className="text-xl md:text-2xl font-bold text-white mb-6">{item.problem}</h3>
                            
                            <div className="grid md:grid-cols-2 gap-6">
                                {/* Without CoolDesk */}
                                <div className="space-y-3">
                                    <div className="flex items-center gap-2 text-red-300 font-semibold text-sm uppercase tracking-wide">
                                        <FaTimes className="text-red-400" />
                                        <span>The Old Way</span>
                                    </div>
                                    <p className="text-gray-300 text-base leading-relaxed pl-6">
                                        {item.without}
                                    </p>
                                </div>

                                {/* With CoolDesk */}
                                <div className="space-y-3">
                                    <div className="flex items-center gap-2 text-green-300 font-semibold text-sm uppercase tracking-wide">
                                        <FaCheck className="text-green-400" />
                                        <span>With CoolDesk</span>
                                    </div>
                                    <p className="text-gray-300 text-base leading-relaxed pl-6">
                                        {item.with}
                                    </p>
                                    <div className="pl-6 space-y-2">
                                        <span className="inline-block text-xs font-semibold text-blue-300 bg-blue-500/20 border border-blue-400/30 rounded-full px-3 py-1">
                                            {item.feature}
                                        </span>
                                        {item.example && (
                                            <div className="text-xs text-gray-400 italic">
                                                {item.example}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Social Proof Stats */}
            <div className="mt-16 text-center">
                <p className="text-gray-400 text-sm mb-6">Join thousands of users who've reclaimed their productivity</p>
                <div className="grid grid-cols-3 gap-4 max-w-2xl mx-auto">
                    <div>
                        <div className="text-3xl md:text-4xl font-bold text-blue-400">2hrs</div>
                        <div className="text-xs md:text-sm text-gray-400 mt-1">Saved weekly</div>
                    </div>
                    <div>
                        <div className="text-3xl md:text-4xl font-bold text-green-400">90%</div>
                        <div className="text-xs md:text-sm text-gray-400 mt-1">Less tab chaos</div>
                    </div>
                    <div>
                        <div className="text-3xl md:text-4xl font-bold text-purple-400">3sec</div>
                        <div className="text-xs md:text-sm text-gray-400 mt-1">To find any tab</div>
                    </div>
                </div>
            </div>
        </section>
    );
}
