import { Monitor, Save, Search, Share2 } from 'lucide-react';
import { ReactNode } from 'react';

interface Comparison {
    problem: string;
    without: string;
    with: string;
    feature: string;
    stat: string;
    statLabel: string;
    icon: ReactNode;
    image: string;
    example?: string;
}

const comparisons: Comparison[] = [
    {
        problem: "Losing your train of thought?",
        without: "Valuable context evaporates the moment you close a window.",
        with: "Your digital footprint—notes, research paths, and window states—is auto-saved locally. Never lose a thought again.",
        feature: "Auto-Memory",
        stat: "100%",
        statLabel: "Recall",
        icon: <Save className="w-8 h-8 md:w-12 md:h-12 text-txt-accent" />,
        image: '/assets/images/auto-memory.png'
    },
    {
        problem: "Friction in collaboration?",
        without: "Sending static links that lack the full picture of your work.",
        with: "Teleport your entire workspace context—active session and all—directly to your peer's browser.",
        feature: "Live Sync",
        stat: "Real-time",
        statLabel: "Sync",
        icon: <Share2 className="w-8 h-8 md:w-12 md:h-12 text-txt-accent" />,
        image: '/assets/images/live-sync.png'
    },
    {
        problem: "Breaking flow to find things?",
        without: "Manually digging through history or folders to find that one resource.",
        with: "A universal command center to navigate your entire digital life at the speed of thought.",
        feature: "Spotlight",
        stat: "0.2s",
        statLabel: "To Find",
        icon: <Search className="w-8 h-8 md:w-12 md:h-12 text-txt-accent" />,
        image: '/assets/images/spotlight.png'
    },
    {
        problem: "App switching fatigue?",
        without: "Constantly Alt-Tabbing between your browser and desktop tools.",
        with: "Bridge the gap. Control desktop apps like VS Code, Slack, and Spotify directly from your browser workflow.",
        feature: "Desktop Bridge",
        stat: "1 Hub",
        statLabel: "For OS",
        icon: <Monitor className="w-8 h-8 md:w-12 md:h-12 text-txt-accent" />,
        image: '/assets/images/desktop-bridge.png'
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
                        Your Browser is
                        <br />
                        Slowing You Down.
                    </h2>

                    <div className="flex items-center justify-center gap-2 md:gap-4 mb-6 md:mb-8 px-4">
                        <div className="h-px w-8 md:w-16 bg-gradient-to-r from-transparent to-btn-primary"></div>
                        <p className="heading-3 text-txt-accent">
                            Unleash Your Flow State
                        </p>
                        <div className="h-px w-8 md:w-16 bg-gradient-to-l from-transparent to-btn-primary"></div>
                    </div>

                    <p className="body-lg text-txt-secondary max-w-3xl mx-auto px-4">
                        Reclaim the <span className="text-txt-primary font-bold">100+ hours lost</span> to tab clutter every year.
                        <br className="hidden md:block" />
                        <span className="block md:inline"> See how CoolDesk transforms your workflow.</span>
                    </p>
                </div>

                {/* Comparison Cards */}
                <div className="max-w-7xl mx-auto space-y-16 md:space-y-32">
                    {comparisons.map((item, index) => {
                        const isEven = index % 2 === 0;
                        return (
                            <div key={index} className="grid md:grid-cols-2 gap-8 md:gap-20 items-center relative group/card">
                                {/* Connector Line (Desktop) */}
                                {index < comparisons.length - 1 && (
                                    <div className="hidden md:block absolute left-1/2 bottom-[-80px] w-px h-[80px] bg-gradient-to-b from-white/10 to-transparent -translate-x-1/2 z-0"></div>
                                )}

                                {/* Text Column */}
                                <div className={`space-y-8 relative z-10 ${isEven ? 'order-2 md:order-1' : 'order-2 md:order-2'}`}>
                                    <div className="flex flex-col gap-6">
                                        <div className="flex items-center gap-4">
                                            <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 shadow-inner backdrop-blur-sm">
                                                {item.icon}
                                            </div>
                                            <h3 className="heading-3 text-white font-semibold tracking-tight">
                                                {item.problem}
                                            </h3>
                                        </div>

                                        <div className="space-y-6 pl-2 md:pl-4">
                                            <div className="relative pl-6 border-l-2 border-red-500/20 py-1">
                                                <p className="body-md text-txt-muted/80 leading-relaxed italic">
                                                    "{item.without}"
                                                </p>
                                            </div>

                                            <div className="relative pl-6 border-l-2 border-btn-primary py-1">
                                                <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-btn-primary/20 flex items-center justify-center">
                                                    <div className="w-1.5 h-1.5 rounded-full bg-btn-primary animate-pulse"></div>
                                                </div>
                                                <p className="heading-5 text-white leading-relaxed font-medium">
                                                    {item.with}
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Stats Badge */}
                                    <div className="inline-flex items-center gap-4 pl-2 md:pl-4">
                                        <div className="flex flex-col">
                                            <span className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-br from-white to-white/60 tracking-tighter">
                                                {item.stat}
                                            </span>
                                            <span className="text-xs font-bold text-btn-primary uppercase tracking-widest mt-1">
                                                {item.statLabel}
                                            </span>
                                        </div>
                                        <div className="h-12 w-px bg-gradient-to-b from-transparent via-white/10 to-transparent mx-4"></div>
                                        <div className="px-5 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-md">
                                            <span className="text-sm font-medium text-txt-secondary">
                                                {item.feature}
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                {/* Image Column */}
                                <div className={`relative group order-1 ${isEven ? 'md:order-2' : 'md:order-1'}`}>
                                    {/* Glow Effect */}
                                    <div className="absolute -inset-1 bg-gradient-to-r from-btn-primary/30 to-purple-600/30 rounded-[20px] blur-xl opacity-0 group-hover/card:opacity-100 transition-opacity duration-700"></div>

                                    {/* Image Container */}
                                    <div className="relative rounded-[20px] overflow-hidden bg-[#0A0A0A] border border-white/10 shadow-2xl aspect-[16/10] transform transition-transform duration-700 group-hover/card:scale-[1.02]">
                                        <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent z-10 pointer-events-none"></div>
                                        <img
                                            src={item.image}
                                            alt={item.feature}
                                            className="w-full h-full object-cover opacity-90 group-hover/card:opacity-100 transition-opacity duration-500"
                                        />
                                        {/* Inner Vignette */}
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent z-20"></div>

                                        {/* Floating Label inside Image */}
                                        <div className="absolute bottom-4 left-4 z-30 px-3 py-1.5 rounded-lg bg-black/60 backdrop-blur-md border border-white/10 text-xs font-medium text-white/80">
                                            {item.feature} Preview
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
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
