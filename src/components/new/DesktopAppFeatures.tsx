import { AppWindow, Focus, Keyboard, Layers, MonitorUp, Zap } from 'lucide-react';

export default function DesktopAppFeatures() {
    const features = [
        {
            icon: <Focus className="w-8 h-8" />,
            title: "App Focus Mode",
            description: "Instantly switch focus to any running app with a keystroke. No more hunting through taskbar.",
            gradient: "from-cyan-500 to-blue-600",
            visual: (
                <div className="relative w-full h-32 flex items-center justify-center">
                    <div className="flex gap-3">
                        {['VS Code', 'Chrome', 'Slack'].map((app, i) => (
                            <div
                                key={app}
                                className={`w-14 h-14 rounded-xl flex items-center justify-center text-xs font-medium transition-all duration-300 ${
                                    i === 1
                                        ? 'bg-gradient-to-br from-cyan-500 to-blue-600 text-white scale-110 shadow-lg shadow-cyan-500/40'
                                        : 'bg-zinc-800 text-zinc-400 border border-white/10'
                                }`}
                                style={{ animationDelay: `${i * 0.1}s` }}
                            >
                                <AppWindow className="w-6 h-6" />
                            </div>
                        ))}
                    </div>
                    <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 px-3 py-1 bg-cyan-500/20 rounded-full border border-cyan-500/30 text-[10px] text-cyan-300">
                        Ctrl + Space
                    </div>
                </div>
            )
        },
        {
            icon: <Layers className="w-8 h-8" />,
            title: "Smart Tab Switching",
            description: "Switch between browser tabs across all windows. Search and jump to any tab instantly.",
            gradient: "from-blue-500 to-indigo-600",
            visual: (
                <div className="relative w-full h-32 flex items-center justify-center">
                    <div className="w-48 bg-zinc-800/80 rounded-lg border border-white/10 overflow-hidden">
                        <div className="p-2 border-b border-white/5">
                            <div className="h-5 bg-blue-500/20 rounded border border-blue-500/30 flex items-center px-2 text-[10px] text-blue-300">
                                Search tabs...
                            </div>
                        </div>
                        <div className="p-1.5 space-y-1">
                            {['GitHub - PR #42', 'Google Docs', 'Jira Board'].map((tab, i) => (
                                <div
                                    key={tab}
                                    className={`px-2 py-1.5 rounded text-[10px] flex items-center gap-2 ${
                                        i === 0
                                            ? 'bg-blue-500/30 text-blue-200 border border-blue-500/40'
                                            : 'text-zinc-400 hover:bg-white/5'
                                    }`}
                                >
                                    <div className="w-3 h-3 rounded bg-white/20"></div>
                                    {tab}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )
        },
        {
            icon: <MonitorUp className="w-8 h-8" />,
            title: "Window Navigation",
            description: "Navigate between windows of the same app. Perfect for multi-monitor setups.",
            gradient: "from-purple-500 to-pink-600",
            visual: (
                <div className="relative w-full h-32 flex items-center justify-center gap-4">
                    {[1, 2].map((n) => (
                        <div
                            key={n}
                            className={`w-20 h-16 rounded-lg border ${
                                n === 1
                                    ? 'bg-purple-500/20 border-purple-500/50 shadow-lg shadow-purple-500/20'
                                    : 'bg-zinc-800 border-white/10'
                            }`}
                        >
                            <div className="h-3 bg-zinc-700 rounded-t-lg flex items-center gap-0.5 px-1">
                                <div className="w-1 h-1 rounded-full bg-red-500/60"></div>
                                <div className="w-1 h-1 rounded-full bg-yellow-500/60"></div>
                                <div className="w-1 h-1 rounded-full bg-green-500/60"></div>
                            </div>
                            <div className="p-1.5 space-y-0.5">
                                <div className="h-1.5 bg-purple-500/30 rounded w-3/4"></div>
                                <div className="h-1.5 bg-purple-500/20 rounded w-1/2"></div>
                            </div>
                        </div>
                    ))}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                        <svg className="w-6 h-6 text-purple-400 animate-pulse" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                        </svg>
                    </div>
                </div>
            )
        },
        {
            icon: <Keyboard className="w-8 h-8" />,
            title: "Global Hotkeys",
            description: "Customizable keyboard shortcuts that work system-wide, even when CoolDesk isn't focused.",
            gradient: "from-amber-500 to-orange-600",
            visual: (
                <div className="relative w-full h-32 flex items-center justify-center">
                    <div className="flex gap-2">
                        {['Ctrl', '+', 'Shift', '+', 'S'].map((key, i) => (
                            <div
                                key={i}
                                className={`${
                                    key === '+'
                                        ? 'text-zinc-500 text-lg'
                                        : 'px-3 py-2 bg-zinc-800 rounded-lg border border-white/10 text-sm font-mono text-amber-300 shadow-lg'
                                } flex items-center justify-center`}
                            >
                                {key}
                            </div>
                        ))}
                    </div>
                    <div className="absolute bottom-2 left-1/2 -translate-x-1/2 text-[10px] text-zinc-500">
                        Open Search Anywhere
                    </div>
                </div>
            )
        },
    ];

    return (
        <section className="py-24 relative overflow-hidden">
            {/* Background */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-1/4 left-0 w-96 h-96 bg-purple-600/10 blur-[120px] rounded-full" />
                <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-blue-600/10 blur-[120px] rounded-full" />
            </div>

            <div className="container mx-auto px-6 relative z-10">
                {/* Header */}
                <div className="text-center mb-16">
                    <div className="inline-block mb-4">
                        <div className="px-4 py-2 rounded-full bg-gradient-to-r from-purple-500/10 via-blue-500/10 to-cyan-500/10 border border-white/10">
                            <span className="label text-gradient-accent flex items-center gap-2">
                                <Zap className="w-4 h-4" />
                                DESKTOP APP POWERS
                            </span>
                        </div>
                    </div>
                    <h2 className="heading-2 text-txt-primary mb-4">
                        Beyond the Browser
                    </h2>
                    <p className="body-lg text-txt-secondary max-w-2xl mx-auto">
                        The desktop app supercharges your workflow with <strong className="text-white">system-wide controls</strong> —
                        focus apps, switch tabs, and navigate windows without touching your mouse.
                    </p>
                </div>

                {/* Features Grid */}
                <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
                    {features.map((feature, index) => (
                        <div
                            key={index}
                            className="group relative bg-gradient-to-br from-zinc-900/80 to-zinc-950/80 backdrop-blur-xl border border-white/5 rounded-2xl p-6 hover:border-white/20 transition-all duration-500 overflow-hidden"
                        >
                            {/* Gradient overlay on hover */}
                            <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500`} />

                            {/* Visual */}
                            <div className="mb-6">
                                {feature.visual}
                            </div>

                            {/* Content */}
                            <div className="relative z-10 flex items-start gap-4">
                                <div className={`p-2 rounded-xl bg-gradient-to-br ${feature.gradient} bg-opacity-20`}>
                                    <div className="text-white">{feature.icon}</div>
                                </div>
                                <div>
                                    <h3 className="heading-5 text-txt-primary mb-2">{feature.title}</h3>
                                    <p className="body-sm text-txt-secondary">{feature.description}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Bottom note */}
                <div className="mt-12 text-center">
                    <div className="inline-flex items-center gap-3 px-6 py-3 bg-white/5 border border-white/10 rounded-xl">
                        <div className="flex -space-x-2">
                            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center border-2 border-zinc-900">
                                <Zap className="w-4 h-4 text-white" />
                            </div>
                            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center border-2 border-zinc-900">
                                <AppWindow className="w-4 h-4 text-white" />
                            </div>
                        </div>
                        <p className="text-sm text-txt-secondary">
                            <strong className="text-white">Extension captures</strong> your browser activity,
                            <strong className="text-white"> Desktop app controls</strong> your entire system.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}
