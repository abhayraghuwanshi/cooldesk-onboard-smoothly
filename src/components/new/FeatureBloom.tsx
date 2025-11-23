import { useState } from 'react';
import { FaFolder, FaMicrophone, FaPaintBrush, FaSearch, FaStickyNote, FaThumbtack } from 'react-icons/fa';

function FeatureBloom() {
    const [activeIndex, setActiveIndex] = useState(0);

    // Feature data with Font Awesome icons and detailed descriptions
    const features = [
        { icon: <FaSearch />, title: 'Almighty Search', desc: 'Universal Search: A single search bar to find tabs, links, notes, and tasks instantly. No more hunting, no more clutter.' },
        { icon: <FaThumbtack />, title: 'Pins & Cool Feed', desc: 'Pins & Curated Feed: Keep your most important links locked in sight with Pins, while a smart feed brings relevant content directly to you.' },
        { icon: <FaFolder />, title: 'Automatic Workspaces', desc: 'Automatic Workspaces: Tabs automatically sort themselves by project, context, or vibe. Stay focused without the manual drag-and-drop.' },
        { icon: <FaPaintBrush />, title: 'Themes & UI', desc: 'Themes & UI: Choose from endless themes to match your mood—sleek, bold, or minimal. Your desk looks how you feel.' },
        { icon: <FaStickyNote />, title: 'Notes & To-Do', desc: 'Integrated Notes & Tasks: Quickly jot down ideas and track tasks. Stay sharp without ever switching apps' },
        { icon: <FaMicrophone />, title: 'Voice Navigation', desc: 'Voice Navigation: Commanded. Talk to your browser. Open, search, or switch with just a word.' },
    ];

    return (
        <div id="features" className="relative py-8 md:py-12 isolate z-10 scroll-mt-20">
            <h2 className="text-4xl md:text-5xl font-bold mb-12 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                Cool <span className="text-blue-500">Features</span>
            </h2>

            <div className="flex flex-col md:flex-row gap-12 items-start">
                {/* Left Side: Feature Image */}
                <div className="w-full md:w-1/2 max-w-2xl mx-auto overflow-hidden">
                    <div className="relative w-full h-[26rem] md:h-[30rem] rounded-2xl overflow-hidden">
                        <img
                            src="/feature13.png"
                            alt="Feature preview"
                            className="w-full h-full object-cover"
                        />
                    </div>
                </div>

                {/* Right Side: Feature List */}
                <div className="w-full md:w-1/2 space-y-3">
                    {features.map((feature, index) => {
                        const isActive = index === activeIndex;
                        return (
                            <button
                                key={index}
                                onClick={() => setActiveIndex(index)}
                                onMouseEnter={() => setActiveIndex(index)}
                                className={`group w-full text-left transition-all duration-300 rounded-xl overflow-hidden ${isActive
                                    ? 'bg-gradient-to-r from-blue-500/10 via-blue-600/5 to-transparent'
                                    : 'bg-white/5 hover:bg-white/10'
                                    }`}
                            >
                                <div className={`relative p-5 ${isActive ? 'border-l-4 border-blue-400' : 'border-l-4 border-transparent'
                                    }`}>
                                    {/* Subtle glow effect for active card */}
                                    {isActive && (
                                        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-transparent pointer-events-none" />
                                    )}

                                    <div className="relative flex items-start gap-4">
                                        {/* Icon */}
                                        <div className={`p-3 rounded-lg flex-shrink-0 transition-all duration-300 ${isActive
                                            ? 'bg-blue-500 text-white shadow-lg shadow-blue-500/30'
                                            : 'bg-gray-800/80 text-gray-400 group-hover:bg-gray-700/80'
                                            }`}>
                                            <span className="text-xl">{feature.icon}</span>
                                        </div>

                                        {/* Content */}
                                        <div className="flex-1 min-w-0">
                                            <h3 className={`text-base md:text-lg font-semibold mb-1 transition-colors duration-300 ${isActive ? 'text-white' : 'text-gray-300 group-hover:text-white'
                                                }`}>
                                                {feature.title}
                                            </h3>

                                            {/* Description - only show when active */}
                                            <div className={`overflow-hidden transition-all duration-300 ${isActive ? 'max-h-32 opacity-100 mt-2' : 'max-h-0 opacity-0'
                                                }`}>
                                                <p className="text-gray-400 text-sm leading-relaxed">
                                                    {feature.desc}
                                                </p>
                                            </div>
                                        </div>

                                        {/* Chevron Indicator */}
                                        <div className={`flex-shrink-0 transition-all duration-300 ${isActive ? 'opacity-100 translate-x-0' : 'opacity-50 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0'
                                            }`}>
                                            <svg className={`w-5 h-5 transition-colors duration-300 ${isActive ? 'text-blue-400' : 'text-gray-500'
                                                }`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                            </svg>
                                        </div>
                                    </div>
                                </div>
                            </button>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}

export default FeatureBloom;


