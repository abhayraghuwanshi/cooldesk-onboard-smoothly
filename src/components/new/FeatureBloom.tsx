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
            <div className="flex flex-col md:flex-row gap-12 items-center justify-between">
                {/* Left Side: Radial Bloom Layout */}
                <div className="w-full md:w-1/2 relative h-96 md:h-[28rem] max-w-2xl mx-auto">
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

                {/* Right Side: Feature Descriptions */}
                <div className="w-full md:w-1/2 space-y-6">
                    {features.map((feat, index) => (
                        <div
                            key={index}
                            className={`p-4 rounded-lg transition-colors duration-300 border
                                ${index === highlighted
                                    ? "bg-blue-600/50 border-blue-400/30"
                                    : "bg-gray-800/60 border-gray-700/30"}`}
                        >
                            <div className="flex items-center mb-2">
                                <span className="text-2xl mr-3">{feat.icon}</span>
                                <h3 className="text-xl font-semibold">{feat.title}</h3>
                            </div>
                            <p className="text-gray-300 text-sm">{feat.desc}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default FeatureBloom;


