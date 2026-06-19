import { AppWindow, Bot, Chrome, Layers, Search, Sparkles, Target, Zap } from 'lucide-react';
import { ReactNode } from 'react';

interface MiniFeature {
    icon: ReactNode;
    label: string;
    desc: string;
}

interface Step {
    step: number;
    headline: string;
    detail: string;
    unlock: string;
    feature: string;
    icon: ReactNode;
    image: string;
    miniFeatures: MiniFeature[];
}

const comparisons: Step[] = [
    {
        step: 1,
        headline: "Install the Chrome Extension",
        detail: "Every tab you open gets bridged into CoolDesk. Your browser stops being a pile of tabs and becomes a living map of what you're working on.",
        unlock: "Tab management, history sync, and browsing context — all flowing into your workspaces automatically.",
        feature: "Browser Bridge",
        icon: <Chrome className="w-8 h-8 md:w-12 md:h-12 text-txt-accent" />,
        image: '/extension.png',
        miniFeatures: [
            { icon: <Zap className="w-4 h-4 text-cyan-400" />, label: "Tab Capture", desc: "Every tab tracked by project" },
            { icon: <Layers className="w-4 h-4 text-blue-400" />, label: "Smart Tab Switching", desc: "Jump to any tab instantly" },
        ]
    },
    {
        step: 2,
        headline: "Install the Desktop App",
        detail: "Now your OS joins the picture. CoolDesk sees every open window — VS Code, Figma, Terminal — and ties them to the right project.",
        unlock: "Desktop app windows, per-window focus, and OS-level context connected to your browser workspaces.",
        feature: "Desktop Bridge",
        icon: <AppWindow className="w-8 h-8 md:w-12 md:h-12 text-txt-accent" />,
        image: '/workspace - view.png',
        miniFeatures: [
            { icon: <AppWindow className="w-4 h-4 text-purple-400" />, label: "App Focus Mode", desc: "Switch to any window by project" },
            { icon: <Sparkles className="w-4 h-4 text-pink-400" />, label: "Windows · Mac · Linux", desc: "Works across all platforms" },
        ]
    },
    {
        step: 3,
        headline: "Create a Workspace — or Let AI Do It",
        detail: "Start one yourself in seconds, or use AI SmartWorkspace (beta): it reads your open tabs, browser history, and chat threads — then clusters everything into project groups for you.",
        unlock: "Your projects, organized without effort. Manual control when you want it. AI speed when you don't.",
        feature: "AI SmartWorkspace",
        icon: <Bot className="w-8 h-8 md:w-12 md:h-12 text-txt-accent" />,
        image: '/workspace-create.png',
        miniFeatures: [
            { icon: <Target className="w-4 h-4 text-cyan-400" />, label: "Smart Workspaces", desc: "90% less clutter, auto-organized" },
            { icon: <Bot className="w-4 h-4 text-pink-400" />, label: "AI Chat Hub", desc: "All your AI threads, one place" },
        ]
    },
    {
        step: 4,
        headline: "Spotlight — Now You Flow",
        detail: "One keystroke. Every tab, note, file, bookmark, and desktop app — searchable from one bar. No hunting. No switching. Just find it and go.",
        unlock: "The last piece. Everything's organized, everything's findable. This is what working without friction feels like.",
        feature: "Spotlight Search",
        icon: <Search className="w-8 h-8 md:w-12 md:h-12 text-txt-accent" />,
        image: '/cooldesk-new.png',
        miniFeatures: [
            { icon: <Search className="w-4 h-4 text-emerald-400" />, label: "Almighty Search", desc: "Tabs, notes, files, apps — one bar" },
            { icon: <Zap className="w-4 h-4 text-yellow-400" />, label: "One Keystroke", desc: "No mouse. No friction." },
        ]
    }
];

export default function NavigationComparison() {
    return (
        <section className="relative py-32 overflow-hidden bg-black/40">
            {/* Dot Grid Pattern */}
            <div className="absolute inset-0 opacity-50" style={{
                backgroundImage: 'radial-gradient(circle, rgba(255, 255, 255, 0.04) 1px, transparent 1px)',
                backgroundSize: '32px 32px'
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
                        Four steps.
                        <br />
                        Total clarity.
                    </h2>

                    <div className="flex items-center justify-center gap-2 md:gap-4 mb-6 md:mb-8 px-4">
                        <div className="h-px w-8 md:w-16 bg-gradient-to-r from-transparent to-btn-primary"></div>
                        <p className="heading-3 text-txt-accent">
                            Follow the map, find your flow
                        </p>
                        <div className="h-px w-8 md:w-16 bg-gradient-to-l from-transparent to-btn-primary"></div>
                    </div>

                    <p className="body-lg text-txt-secondary max-w-3xl mx-auto px-4">
                        Each step unlocks more. By step four, your browser, your desktop, and your projects are one seamless system.
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
                                            {/* Step number badge */}
                                            <div className="flex-shrink-0 w-9 h-9 rounded-full bg-btn-primary/15 border border-btn-primary/30 flex items-center justify-center">
                                                <span className="text-sm font-bold text-btn-primary">{item.step}</span>
                                            </div>
                                            <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 shadow-inner backdrop-blur-sm">
                                                {item.icon}
                                            </div>
                                            <h3 className="heading-3 text-white font-semibold tracking-tight">
                                                {item.headline}
                                            </h3>
                                        </div>

                                        <div className="space-y-6 pl-2 md:pl-4">
                                            <div className="relative pl-6 border-l-2 border-white/10 py-1">
                                                <p className="body-md text-txt-muted/80 leading-relaxed">
                                                    {item.detail}
                                                </p>
                                            </div>

                                            <div className="relative pl-6 border-l-2 border-btn-primary py-1">
                                                <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-btn-primary/20 flex items-center justify-center">
                                                    <div className="w-1.5 h-1.5 rounded-full bg-btn-primary animate-pulse"></div>
                                                </div>
                                                <p className="heading-5 text-white leading-relaxed font-medium">
                                                    {item.unlock}
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Feature pill + mini features */}
                                    <div className="pl-2 md:pl-4 space-y-4">
                                        <div className="inline-flex px-5 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-md">
                                            <span className="text-sm font-medium text-txt-secondary">
                                                {item.feature}
                                            </span>
                                        </div>
                                        <div className="grid grid-cols-2 gap-3">
                                            {item.miniFeatures.map((f, i) => (
                                                <div key={i} className="flex items-start gap-3 px-4 py-3 rounded-xl bg-white/[0.03] border border-white/8 backdrop-blur-sm">
                                                    <div className="mt-0.5 shrink-0">{f.icon}</div>
                                                    <div>
                                                        <p className="text-xs font-semibold text-white/80 leading-tight">{f.label}</p>
                                                        <p className="text-[11px] text-txt-muted mt-0.5 leading-tight">{f.desc}</p>
                                                    </div>
                                                </div>
                                            ))}
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

                {/* CTA */}
                <div className="text-center mt-12 md:mt-16 px-4">
                    <a
                        href="https://chromewebstore.google.com/detail/cooldesk/ioggffobciopdddacpclplkeodllhjko"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-primary btn-xl group inline-flex items-center gap-2 md:gap-3 hover:shadow-2xl hover:shadow-blue-500/50 hover:scale-105 transition-all duration-300 relative overflow-hidden"
                    >
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000"></div>
                        <span className="relative">Get CoolDesk Free</span>
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
