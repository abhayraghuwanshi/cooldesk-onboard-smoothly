import { useEffect, useState } from 'react';
import { FaFolder, FaMicrophone, FaPaintBrush, FaSearch, FaStickyNote, FaThumbtack } from 'react-icons/fa';
import { SiFirefox, SiGooglechrome } from 'react-icons/si';

function FeatureBloom() {
    const [highlighted, setHighlighted] = useState(0);
    const [browserIconIndex, setBrowserIconIndex] = useState(0);

    // Feature data with Font Awesome icons and detailed descriptions
    const features = [
        { icon: <FaSearch />, title: 'Almighty Search', desc: 'Search? Universal. One bar to find tabs, links, notes, tasks, and more. No hunting. No clutter.' },
        { icon: <FaThumbtack />, title: 'Pins & Cool Feed', desc: 'Pins? Locked. Feed? Curated. Your important links always in sight, plus a smart feed that brings everything to you.' },
        { icon: <FaFolder />, title: 'Automatic Workspaces', desc: 'Workspaces? Automatic. Tabs sort themselves by project, context, or vibe. Stay focused without the manual drag.' },
        { icon: <FaPaintBrush />, title: 'Themes & UI', desc: 'Themes? Endless. Choose your mood — sleek, bold, or minimal. Your desk looks how you feel.' },
        { icon: <FaStickyNote />, title: 'Notes & To-Do', desc: 'Notes? Quick. Tasks? Tracked. Jot it down. Check it off. Stay sharp without switching apps.' },
        { icon: <FaMicrophone />, title: 'Voice Navigation', desc: 'Voice? Commanded. Talk to your browser. Open, search, or switch with just a word.' },
    ];

    // Browser icons to cycle through
    const browserIcons = [
        <SiGooglechrome size={40} color="white" />,
        <SiFirefox size={40} color="white" />
    ];

    // Auto-cycle through features
    useEffect(() => {
        const featureInterval = setInterval(() => {
            setHighlighted((prev) => (prev + 1) % features.length);
        }, 3000);
        return () => clearInterval(featureInterval);
    }, [features.length]);

    // Auto-cycle through browser icons
    useEffect(() => {
        const browserInterval = setInterval(() => {
            setBrowserIconIndex((prev) => (prev + 1) % browserIcons.length);
        }, 2000); // Changes every 2 seconds
        return () => clearInterval(browserInterval);
    }, [browserIcons.length]);


    return (
        <div className="relative py-8 md:py-12 isolate z-10">
            {/* Left Side: Radial Bloom Layout */}
            <h2 className="text-4xl md:text-5xl font-bold mb-12 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                Cool <span className="text-blue-500">Features</span>
            </h2>
            <div className="flex flex-col md:flex-row gap-12 items-center justify-between">

                <div className="w-full md:w-1/2 max-w-2xl mx-auto overflow-hidden">
                    <div className="relative w-full h-[26rem] md:h-[30rem]">
                        <img
                            src="/feature13.png"
                            alt="Feature preview"
                            className="w-full h-full object-cover"
                        />
                    </div>
                </div>

                {/* Right Side: Radial Hub + Descriptions */}
                <div className="w-full md:w-1/2 flex flex-col gap-10">
                    <div className="relative h-96 md:h-[28rem]">
                        {/* Central Hub (Cycling Browser Icons) */}
                        <div className="absolute top-1/2 left-1/2 w-20 h-20 bg-gradient-to-br from-black to-gray-900 rounded-full flex items-center justify-center shadow-lg shadow-blue-500/30 z-20 transform -translate-x-1/2 -translate-y-1/2 transition-transform duration-500 hover:scale-110">
                            {browserIcons[browserIconIndex]}
                        </div>

                        {/* Feature Icons as Petals */}
                        {features.map((feat, index) => {
                            const angle = (index / features.length) * 360;
                            const isHighlighted = index === highlighted;
                            return (
                                <div
                                    key={index}
                                    className={`absolute w-16 h-16 rounded-full flex items-center justify-center text-2xl shadow-md shadow-blue-400/20 transition-all duration-300 cursor-pointer
                                        ${isHighlighted
                                            ? "bg-blue-600/80 scale-125 rotate-6"
                                            : "bg-gray-800/60 hover:scale-110 hover:rotate-12 hover:bg-blue-600/60"}`}
                                    style={{
                                        top: `calc(50% + ${Math.sin(angle * Math.PI / 180) * 8}rem)`,
                                        left: `calc(50% + ${Math.cos(angle * Math.PI / 180) * 8}rem)`,
                                        transform: "translate(-50%, -50%)",
                                    }}
                                    onMouseEnter={() => setHighlighted(index)}
                                >
                                    {feat.icon}
                                </div>
                            );
                        })}
                    </div>

                    <div className="relative p-8 rounded-3xl glass-card glass-hover transition-all duration-500">
                        {/* Subtle inner glow */}
                        <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-white/5 to-transparent pointer-events-none"></div>

                        <div className="relative z-10">
                            <div className="flex items-center mb-6">
                                <div className="p-3 rounded-2xl glass mr-5">
                                    <span className="text-3xl text-blue-300">{features[highlighted].icon}</span>
                                </div>
                                <h3 className="text-2xl font-semibold text-white/95">{features[highlighted].title}</h3>
                            </div>
                            <p className="text-white/80 text-base leading-relaxed font-light">{features[highlighted].desc}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default FeatureBloom;


