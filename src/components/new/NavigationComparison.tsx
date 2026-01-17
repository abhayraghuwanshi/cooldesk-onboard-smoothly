import { Mic, Search, StickyNote, Target } from 'lucide-react';
import { ReactNode } from 'react';

interface Comparison {
    problem: string;
    without: string;
    with: string;
    feature: string;
    stat: string;
    statLabel: string;
    icon: ReactNode;
    example?: string;
}

const comparisons: Comparison[] = [
    {
        problem: "Lost in 50+ open tabs?",
        without: "Waste 5+ minutes daily clicking through tabs to find what you need",
        with: "Type 2 words, find any tab instantly",
        feature: "Almighty Search",
        stat: "5min",
        statLabel: "saved daily",
        icon: <Search className="w-8 h-8 md:w-12 md:h-12 text-txt-accent" />
    },
    {
        problem: "Work tabs mixed with personal?",
        without: "Everything cluttered together—no separation, no focus",
        with: "Auto-organized workspaces keep work, research, and personal browsing separate",
        feature: "Smart Workspaces",
        stat: "90%",
        statLabel: "less clutter",
        icon: <Target className="w-8 h-8 md:w-12 md:h-12 text-txt-accent" />
    },
    {
        problem: "Hands glued to mouse and keyboard?",
        without: "Every scroll, click, and tab switch requires manual input",
        with: "Control your browser completely hands-free with voice commands",
        feature: "Voice Navigation",
        example: '"Switch to Gmail" • "Scroll down"',
        stat: "100%",
        statLabel: "hands-free",
        icon: <Mic className="w-8 h-8 md:w-12 md:h-12 text-txt-accent" />
    },
    {
        problem: "Important info scattered everywhere?",
        without: "Copy-paste to 3 different apps, lose the source link every time",
        with: "One-click capture with automatic source tracking and timestamps",
        feature: "Daily Notes",
        stat: "3sec",
        statLabel: "to capture",
        icon: <StickyNote className="w-8 h-8 md:w-12 md:h-12 text-txt-accent" />
    }
];

export default function NavigationComparison() {
    return (
        <section className="relative py-32 overflow-hidden bg-zinc-950">
            {/* Dot Grid Pattern */}
            <div className="absolute inset-0" style={{
                backgroundImage: 'radial-gradient(circle, rgba(255, 255, 255, 0.05) 1px, transparent 1px)',
                backgroundSize: '40px 40px'
            }}></div>

            {/* Animated Gradient Mesh Orbs */}
            <div className="absolute inset-0">
                {/* Main blue orb - top left */}
                <div className="absolute top-[10%] left-[15%] w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-[120px] animate-pulse-slow"></div>

                {/* Secondary blue orb - bottom right */}
                <div className="absolute bottom-[15%] right-[10%] w-[600px] h-[600px] bg-blue-600/8 rounded-full blur-[140px] animate-pulse-slower"></div>

                {/* Accent orb - center */}
                <div className="absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-cyan-500/6 rounded-full blur-[100px] animate-float-slow"></div>
            </div>

            <div className="container mx-auto px-6 relative z-10">
                {/* Header */}
                <div className="text-center mb-16 md:mb-24">
                    <h2 className="heading-1 text-txt-primary mb-3 md:mb-4 leading-tight px-4">
                        Stop Fighting
                        <br />
                        Your Browser.
                    </h2>

                    <div className="flex items-center justify-center gap-2 md:gap-4 mb-6 md:mb-8 px-4">
                        <div className="h-px w-8 md:w-16 bg-gradient-to-r from-transparent to-btn-primary"></div>
                        <p className="heading-3 text-txt-accent">
                            Start Working Smarter
                        </p>
                        <div className="h-px w-8 md:w-16 bg-gradient-to-l from-transparent to-btn-primary"></div>
                    </div>

                    <p className="body-lg text-txt-secondary max-w-3xl mx-auto px-4">
                        The average person wastes <span className="text-txt-primary font-bold">2 hours per week</span> managing tabs.
                        <br className="hidden md:block" />
                        <span className="block md:inline"> Here's how CoolDesk fixes that.</span>
                    </p>
                </div>

                {/* Comparison Cards */}
                <div className="max-w-6xl mx-auto space-y-12 md:space-y-16">
                    {comparisons.map((item, index) => (
                        <div key={index} className="grid md:grid-cols-2 gap-8 md:gap-12 items-start">
                            {/* Left: Problem & Old Way */}
                            <div className="space-y-4 md:space-y-6">
                                {/* Problem Title */}
                                <div className="flex items-start gap-3 md:gap-4">
                                    {item.icon}
                                    <div className="flex-1">
                                        <h3 className="heading-4 text-txt-primary mb-2">
                                            {item.problem}
                                        </h3>
                                        <p className="caption text-txt-muted">
                                            {item.without}
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Right: CoolDesk Way */}
                            <div className="space-y-3 md:space-y-4">
                                <div className="flex items-start gap-3">
                                    <svg className="w-5 h-5 md:w-6 md:h-6 text-btn-primary flex-shrink-0 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                                    </svg>
                                    <div className="flex-1">
                                        <p className="body-lg text-txt-primary font-bold leading-relaxed mb-3">
                                            {item.with}
                                        </p>
                                        <div className="flex flex-wrap items-center gap-2 md:gap-3">
                                            <span className="label-accent">
                                                {item.feature}
                                            </span>
                                            {item.example && (
                                                <span className="caption text-txt-secondary italic">
                                                    {item.example}
                                                </span>
                                            )}
                                        </div>

                                        {/* Stat */}
                                        <div className="mt-3 md:mt-4 inline-block">
                                            <div className="display-lg text-txt-accent">
                                                {item.stat}
                                            </div>
                                            <div className="caption text-txt-muted uppercase tracking-wide font-semibold">
                                                {item.statLabel}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Divider */}
                            {index < comparisons.length - 1 && (
                                <div className="col-span-full border-t border-white/5"></div>
                            )}
                        </div>
                    ))}
                </div>

                {/* Stats Section */}
                <div className="mt-20 md:mt-32 max-w-5xl mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-16">
                        <div className="text-center">
                            <div className="display-xl text-txt-accent mb-2 md:mb-3">
                                2hrs
                            </div>
                            <div className="label text-txt-secondary uppercase tracking-wider">Saved weekly</div>
                            <div className="caption text-txt-muted mt-1">That's 104 hours/year</div>
                        </div>

                        <div className="text-center">
                            <div className="display-xl text-txt-accent mb-2 md:mb-3">
                                90%
                            </div>
                            <div className="label text-txt-secondary uppercase tracking-wider">Less clutter</div>
                            <div className="caption text-txt-muted mt-1">Finally, a clean browser</div>
                        </div>

                        <div className="text-center">
                            <div className="display-xl text-txt-accent mb-2 md:mb-3">
                                3sec
                            </div>
                            <div className="label text-txt-secondary uppercase tracking-wider">Find any tab</div>
                            <div className="caption text-txt-muted mt-1">Lightning-fast search</div>
                        </div>
                    </div>
                </div>

                {/* CTA */}
                <div className="text-center mt-12 md:mt-16 px-4">
                    <a
                        href="https://chromewebstore.google.com/detail/cooldesk/ioggffobciopdddacpclplkeodllhjko"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-primary btn-xl group inline-flex items-center gap-2 md:gap-3 hover:shadow-2xl hover:shadow-blue-500/50 hover:scale-105 transition-all duration-300 relative overflow-hidden"
                    >
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000"></div>
                        <span className="relative">Reclaim Your Browser Now</span>
                        <svg className="w-4 h-4 md:w-5 md:h-5 group-hover:translate-x-1 transition-transform relative" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                    </a>

                    <p className="mt-6 caption text-txt-muted flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-0">
                        <span className="inline-flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-txt-success animate-pulse"></span>
                            100% Free Forever
                        </span>
                        <span className="hidden sm:inline mx-3">•</span>
                        <span>No Credit Card Required</span>
                        <span className="hidden sm:inline mx-3">•</span>
                        <span>Setup in 30 seconds</span>
                    </p>
                </div>
            </div>

            <style>{`
                @keyframes pulse-slow {
                    0%, 100% {
                        opacity: 0.8;
                        transform: scale(1);
                    }
                    50% {
                        opacity: 1;
                        transform: scale(1.05);
                    }
                }

                @keyframes pulse-slower {
                    0%, 100% {
                        opacity: 0.6;
                        transform: scale(1);
                    }
                    50% {
                        opacity: 0.9;
                        transform: scale(1.1);
                    }
                }

                @keyframes float-slow {
                    0%, 100% {
                        transform: translate(-50%, -50%) translateY(0px);
                    }
                    50% {
                        transform: translate(-50%, -50%) translateY(-20px);
                    }
                }

                .animate-pulse-slow {
                    animation: pulse-slow 8s ease-in-out infinite;
                }

                .animate-pulse-slower {
                    animation: pulse-slower 10s ease-in-out infinite;
                }

                .animate-float-slow {
                    animation: float-slow 12s ease-in-out infinite;
                }
            `}</style>
        </section>
    );
}
