import {
    AppWindow,
    Bot,
    Command,
    Focus,
    Keyboard,
    Layers,
    MessageSquare,
    MonitorUp,
    Pin,
    Sparkles,
    Target,
    User,
    Users,
    Zap
} from 'lucide-react';

export default function HowToUse() {
    const steps = [
        {
            number: "01",
            title: "Install Extension",
            description: "Add CoolDesk to your browser — captures tabs and replaces your new tab page.",
            icon: <Zap className="w-8 h-8 text-cyan-400" />,
            gradient: "from-cyan-500 to-blue-600",
            illustration: (
                <div className="relative w-full h-48 bg-gradient-to-br from-cyan-500/10 to-blue-600/10 rounded-xl flex items-center justify-center overflow-hidden">
                    <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDM0djItaDJ2LTJoLTJ6bTAgNGgtMnYyaDJ2LTJ6bTQtNHYyaDJ2LTJoLTJ6Ii8+PC9nPjwvZz48L3N2Zz4=')] opacity-30"></div>
                    {/* Browser with extension icon */}
                    <div className="relative">
                        <div className="w-40 h-28 bg-zinc-800 rounded-lg border border-white/10 shadow-2xl">
                            <div className="h-6 bg-zinc-700 rounded-t-lg border-b border-white/5 flex items-center gap-1 px-2">
                                <div className="w-2 h-2 rounded-full bg-red-500/60"></div>
                                <div className="w-2 h-2 rounded-full bg-yellow-500/60"></div>
                                <div className="w-2 h-2 rounded-full bg-green-500/60"></div>
                                <div className="flex-1"></div>
                                <div className="w-5 h-5 bg-gradient-to-br from-cyan-500 to-blue-600 rounded flex items-center justify-center animate-pulse">
                                    <Zap className="w-3 h-3 text-white" />
                                </div>
                            </div>
                            <div className="p-2 space-y-1">
                                <div className="h-2 bg-cyan-500/40 rounded w-3/4"></div>
                                <div className="h-2 bg-blue-500/40 rounded w-1/2"></div>
                                <div className="h-2 bg-cyan-500/30 rounded w-2/3"></div>
                            </div>
                        </div>
                    </div>
                    <div className="absolute bottom-4 right-4 px-3 py-1 bg-cyan-500/20 backdrop-blur-sm rounded-full border border-cyan-500/30 text-xs text-cyan-300 font-semibold">
                        Chrome / Edge / Brave
                    </div>
                </div>
            )
        },
        {
            number: "02",
            title: "Install Desktop App",
            description: "Download the app for your OS — powers AI search and cross-device sync.",
            icon: <Pin className="w-8 h-8 text-purple-400" />,
            gradient: "from-blue-600 to-purple-600",
            illustration: (
                <div className="relative w-full h-48 bg-gradient-to-br from-blue-600/10 to-purple-600/10 rounded-xl flex items-center justify-center overflow-hidden">
                    {/* Desktop with app */}
                    <div className="relative">
                        <div className="w-44 h-28 bg-zinc-800 rounded-lg border border-white/10 shadow-2xl">
                            <div className="h-5 bg-zinc-700 rounded-t-lg border-b border-white/5 flex items-center gap-1 px-2">
                                <div className="w-1.5 h-1.5 rounded-full bg-red-500/60"></div>
                                <div className="w-1.5 h-1.5 rounded-full bg-yellow-500/60"></div>
                                <div className="w-1.5 h-1.5 rounded-full bg-green-500/60"></div>
                                <span className="text-[8px] text-zinc-400 ml-2">CoolDesk</span>
                            </div>
                            <div className="p-2 flex items-center justify-center h-[calc(100%-20px)]">
                                <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl flex items-center justify-center shadow-lg shadow-purple-500/30 animate-pulse">
                                    <Sparkles className="w-6 h-6 text-white" />
                                </div>
                            </div>
                        </div>
                        {/* Desktop stand */}
                        <div className="w-16 h-3 bg-zinc-700 rounded-b mx-auto"></div>
                        <div className="w-24 h-1.5 bg-zinc-600 rounded mx-auto"></div>
                    </div>
                    <div className="absolute bottom-4 left-4 flex gap-2">
                        <span className="px-2 py-1 bg-purple-500/20 backdrop-blur-sm rounded border border-purple-500/30 text-[10px] text-purple-300 font-semibold">Windows</span>
                        <span className="px-2 py-1 bg-blue-500/20 backdrop-blur-sm rounded border border-blue-500/30 text-[10px] text-blue-300 font-semibold">Mac</span>
                        <span className="px-2 py-1 bg-pink-500/20 backdrop-blur-sm rounded border border-pink-500/30 text-[10px] text-pink-300 font-semibold">Linux</span>
                    </div>
                </div>
            )
        },
        {
            number: "03",
            title: "They Work Together",
            description: "Extension captures your tabs, desktop app syncs & searches across all devices.",
            icon: <Sparkles className="w-8 h-8 text-pink-400" />,
            gradient: "from-purple-600 to-pink-600",
            illustration: (
                <div className="relative w-full h-48 bg-gradient-to-br from-purple-600/10 to-pink-600/10 rounded-xl flex items-center justify-center overflow-hidden">
                    {/* Extension and App connected */}
                    <div className="flex items-center gap-4">
                        {/* Browser/Extension */}
                        <div className="w-16 h-16 bg-gradient-to-br from-cyan-500/30 to-blue-600/30 rounded-xl border border-cyan-400/40 flex items-center justify-center animate-float">
                            <Zap className="w-8 h-8 text-cyan-400" />
                        </div>
                        {/* Connection line with data flow */}
                        <div className="flex flex-col items-center gap-1">
                            <div className="w-12 h-0.5 bg-gradient-to-r from-cyan-500 to-purple-500 relative">
                                <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-purple-400 animate-pulse"></div>
                                <div className="absolute top-1/2 left-0 w-2 h-2 bg-cyan-400 rounded-full -translate-y-1/2 animate-ping"></div>
                                <div className="absolute top-1/2 right-0 w-2 h-2 bg-purple-400 rounded-full -translate-y-1/2 animate-ping" style={{ animationDelay: '0.5s' }}></div>
                            </div>
                            <span className="text-[8px] text-zinc-400">syncing</span>
                        </div>
                        {/* Desktop App */}
                        <div className="w-16 h-16 bg-gradient-to-br from-purple-500/30 to-pink-600/30 rounded-xl border border-purple-400/40 flex items-center justify-center animate-float" style={{ animationDelay: '0.5s' }}>
                            <Sparkles className="w-8 h-8 text-purple-400" />
                        </div>
                    </div>
                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 px-4 py-1.5 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 backdrop-blur-sm rounded-full border border-white/10 text-xs text-white font-semibold">
                        Extension + App = Full Power
                    </div>
                </div>
            )
        }
    ];

    const features = [
        {
            title: "Smart Workspaces",
            description: "AI-powered tab organization with real-time analytics and insights.",
            stat: "90%",
            statLabel: "Less Clutter",
            icon: <Target className="w-7 h-7" />,
            gradient: "from-cyan-500/20 to-blue-600/20",
            borderGradient: "from-cyan-500/50 to-blue-600/50",
            visual: (
                <div className="relative w-full h-40 bg-gradient-to-br from-cyan-500/5 to-blue-600/5 rounded-lg overflow-hidden">
                    <div className="absolute inset-0 p-4 space-y-2">
                        <div className="flex gap-2">
                            <div className="flex-1 h-8 bg-cyan-500/30 rounded border border-cyan-400/40 animate-pulse"></div>
                            <div className="flex-1 h-8 bg-blue-500/30 rounded border border-blue-400/40 animate-pulse" style={{ animationDelay: '0.2s' }}></div>
                        </div>
                        <div className="flex gap-2">
                            <div className="w-20 h-6 bg-cyan-400/40 rounded-full flex items-center justify-center text-xs">
                                <span className="text-cyan-200">Work</span>
                            </div>
                            <div className="w-20 h-6 bg-blue-400/40 rounded-full flex items-center justify-center text-xs">
                                <span className="text-blue-200">Personal</span>
                            </div>
                        </div>
                        <div className="grid grid-cols-3 gap-2 mt-3">
                            <div className="h-12 bg-gradient-to-br from-cyan-500/20 to-blue-500/20 rounded border border-white/10 animate-float"></div>
                            <div className="h-12 bg-gradient-to-br from-cyan-500/20 to-blue-500/20 rounded border border-white/10 animate-float" style={{ animationDelay: '0.3s' }}></div>
                            <div className="h-12 bg-gradient-to-br from-cyan-500/20 to-blue-500/20 rounded border border-white/10 animate-float" style={{ animationDelay: '0.6s' }}></div>
                        </div>
                    </div>
                </div>
            )
        },
        {
            title: "Team Sync",
            description: "Desktop app enables real-time workspace sharing across your team.",
            stat: "Real-time",
            statLabel: "Via App",
            icon: <Users className="w-7 h-7" />,
            gradient: "from-blue-500/20 to-indigo-600/20",
            borderGradient: "from-blue-500/50 to-indigo-600/50",
            visual: (
                <div className="relative w-full h-40 bg-gradient-to-br from-blue-500/5 to-indigo-600/5 rounded-lg overflow-hidden flex items-center justify-center">
                    <div className="relative flex items-center gap-3">
                        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500/40 to-blue-600/40 border-2 border-blue-400/50 flex items-center justify-center animate-pulse">
                            <User className="w-5 h-5 text-blue-200" />
                        </div>
                        <div className="flex flex-col gap-1">
                            <div className="w-2 h-2 bg-blue-400 rounded-full animate-ping"></div>
                            <div className="w-2 h-2 bg-indigo-400 rounded-full animate-ping" style={{ animationDelay: '0.3s' }}></div>
                            <div className="w-2 h-2 bg-blue-400 rounded-full animate-ping" style={{ animationDelay: '0.6s' }}></div>
                        </div>
                        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-indigo-500/40 to-indigo-600/40 border-2 border-indigo-400/50 flex items-center justify-center animate-pulse" style={{ animationDelay: '0.5s' }}>
                            <User className="w-5 h-5 text-indigo-200" />
                        </div>
                        <div className="absolute -top-8 left-1/2 -translate-x-1/2 px-3 py-1 bg-blue-500/30 backdrop-blur-sm rounded-full border border-blue-400/40 text-xs text-blue-200 whitespace-nowrap">
                            Syncing...
                        </div>
                    </div>
                </div>
            )
        },
        {
            title: "AI Chat Hub",
            description: "Auto-categorize conversations across platforms with ML.",
            stat: "All",
            statLabel: "In One Place",
            icon: <Bot className="w-7 h-7" />,
            gradient: "from-pink-500/20 to-rose-600/20",
            borderGradient: "from-pink-500/50 to-rose-600/50",
            visual: (
                <div className="relative w-full h-40 bg-gradient-to-br from-pink-500/5 to-rose-600/5 rounded-lg overflow-hidden p-4 space-y-2">
                    <div className="flex gap-2 animate-slide-up">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-pink-500/40 to-rose-600/40 border border-pink-400/50 flex items-center justify-center">
                            <Bot className="w-4 h-4 text-pink-200" />
                        </div>
                        <div className="flex-1 h-8 bg-pink-500/20 rounded-lg border border-pink-400/30 flex items-center px-2 text-xs text-pink-200">
                            Analyzing...
                        </div>
                    </div>
                    <div className="flex gap-2 animate-slide-up" style={{ animationDelay: '0.3s' }}>
                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-rose-500/40 to-pink-600/40 border border-rose-400/50 flex items-center justify-center">
                            <MessageSquare className="w-4 h-4 text-rose-200" />
                        </div>
                        <div className="flex-1 h-8 bg-rose-500/20 rounded-lg border border-rose-400/30 flex items-center px-2 text-xs text-rose-200">
                            Categorized
                        </div>
                    </div>
                    <div className="flex gap-1 mt-2 justify-center">
                        <div className="px-2 py-1 bg-pink-500/30 rounded-full text-[10px] text-pink-200 border border-pink-400/40">Work</div>
                        <div className="px-2 py-1 bg-rose-500/30 rounded-full text-[10px] text-rose-200 border border-rose-400/40">Personal</div>
                        <div className="px-2 py-1 bg-pink-600/30 rounded-full text-[10px] text-pink-200 border border-pink-400/40">Social</div>
                    </div>
                </div>
            )
        },
        // {
        //     title: "Voice Control",
        //     description: "Navigate hands-free with natural language commands.",
        //     stat: "100%",
        //     statLabel: "Hands Free",
        //     icon: <Mic className="w-7 h-7" />,
        //     gradient: "from-orange-500/20 to-amber-600/20",
        //     borderGradient: "from-orange-500/50 to-amber-600/50",
        //     visual: (
        //         <div className="relative w-full h-40 bg-gradient-to-br from-orange-500/5 to-amber-600/5 rounded-lg overflow-hidden flex items-center justify-center">
        //             <div className="relative">
        //                 <Mic className="w-16 h-16 text-orange-400 animate-pulse" />
        //                 <div className="absolute inset-0 flex items-center justify-center">
        //                     <div className="w-20 h-20 border-4 border-orange-400/40 rounded-full animate-ping"></div>
        //                 </div>
        //                 <div className="absolute inset-0 flex items-center justify-center">
        //                     <div className="w-28 h-28 border-2 border-amber-400/20 rounded-full animate-ping" style={{ animationDelay: '0.5s' }}></div>
        //                 </div>
        //                 <div className="absolute -bottom-12 left-1/2 -translate-x-1/2 px-4 py-2 bg-orange-500/30 backdrop-blur-sm rounded-lg border border-orange-400/40 text-sm text-orange-200 whitespace-nowrap animate-pulse">
        //                     "Open workspace..."
        //                 </div>
        //             </div>
        //         </div>
        //     )
        // },
        {
            title: "Almighty Search",
            description: "Desktop app powers AI search across all URLs, notes, highlights & workspaces.",
            stat: "AI-Powered",
            statLabel: "Via App",
            icon: <Command className="w-7 h-7" />,
            gradient: "from-emerald-500/20 to-teal-600/20",
            borderGradient: "from-emerald-500/50 to-teal-600/50",
            visual: (
                <div className="relative w-full h-40 bg-gradient-to-br from-emerald-500/5 to-teal-600/5 rounded-lg overflow-hidden flex items-center justify-center">
                    <div className="w-full max-w-[200px] bg-zinc-800/80 backdrop-blur-sm rounded-lg border border-emerald-400/30 shadow-2xl">
                        <div className="p-2 border-b border-white/5">
                            <div className="h-6 bg-emerald-500/20 rounded border border-emerald-400/30 flex items-center gap-1 px-2 text-xs text-emerald-200">
                                <Command className="w-3 h-3 animate-pulse" />
                                <span className="animate-pulse">Search...</span>
                            </div>
                        </div>
                        <div className="p-2 space-y-1">
                            <div className="h-6 bg-emerald-500/10 hover:bg-emerald-500/20 rounded px-2 flex items-center text-[10px] text-emerald-200 border border-emerald-400/20 animate-fade-in">
                                Open Workspace
                            </div>
                            <div className="h-6 bg-teal-500/10 hover:bg-teal-500/20 rounded px-2 flex items-center text-[10px] text-teal-200 border border-teal-400/20 animate-fade-in" style={{ animationDelay: '0.1s' }}>
                                New Tab
                            </div>
                            <div className="h-6 bg-emerald-500/10 hover:bg-emerald-500/20 rounded px-2 flex items-center text-[10px] text-emerald-200 border border-emerald-400/20 animate-fade-in" style={{ animationDelay: '0.2s' }}>
                                Quick Actions
                            </div>
                        </div>
                    </div>
                </div>
            )
        }
    ];

    const desktopFeatures = [
        {
            icon: <Focus className="w-8 h-8" />,
            title: "App Focus Mode",
            description: "Instantly switch focus to any running app with a keystroke.",
            gradient: "from-cyan-500 to-blue-600",
            visual: (
                <div className="relative w-full h-28 flex items-center justify-center">
                    <div className="flex gap-3">
                        {['VS Code', 'Chrome', 'Slack'].map((app, i) => (
                            <div
                                key={app}
                                className={`w-12 h-12 rounded-xl flex items-center justify-center text-xs font-medium transition-all duration-300 ${
                                    i === 1
                                        ? 'bg-gradient-to-br from-cyan-500 to-blue-600 text-white scale-110 shadow-lg shadow-cyan-500/40'
                                        : 'bg-zinc-800 text-zinc-400 border border-white/10'
                                }`}
                            >
                                <AppWindow className="w-5 h-5" />
                            </div>
                        ))}
                    </div>
                    <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 px-2 py-0.5 bg-cyan-500/20 rounded-full border border-cyan-500/30 text-[9px] text-cyan-300">
                        Ctrl + Space
                    </div>
                </div>
            )
        },
        {
            icon: <Layers className="w-8 h-8" />,
            title: "Smart Tab Switching",
            description: "Search and jump to any browser tab across all windows instantly.",
            gradient: "from-blue-500 to-indigo-600",
            visual: (
                <div className="relative w-full h-28 flex items-center justify-center">
                    <div className="w-44 bg-zinc-800/80 rounded-lg border border-white/10 overflow-hidden">
                        <div className="p-1.5 border-b border-white/5">
                            <div className="h-4 bg-blue-500/20 rounded border border-blue-500/30 flex items-center px-2 text-[9px] text-blue-300">
                                Search tabs...
                            </div>
                        </div>
                        <div className="p-1 space-y-0.5">
                            {['GitHub - PR #42', 'Google Docs', 'Jira Board'].map((tab, i) => (
                                <div
                                    key={tab}
                                    className={`px-2 py-1 rounded text-[9px] flex items-center gap-1.5 ${
                                        i === 0
                                            ? 'bg-blue-500/30 text-blue-200 border border-blue-500/40'
                                            : 'text-zinc-400'
                                    }`}
                                >
                                    <div className="w-2 h-2 rounded bg-white/20"></div>
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
            description: "Navigate between windows of the same app. Perfect for multi-monitor.",
            gradient: "from-purple-500 to-pink-600",
            visual: (
                <div className="relative w-full h-28 flex items-center justify-center gap-3">
                    {[1, 2].map((n) => (
                        <div
                            key={n}
                            className={`w-16 h-12 rounded-lg border ${
                                n === 1
                                    ? 'bg-purple-500/20 border-purple-500/50 shadow-lg shadow-purple-500/20'
                                    : 'bg-zinc-800 border-white/10'
                            }`}
                        >
                            <div className="h-2.5 bg-zinc-700 rounded-t-lg flex items-center gap-0.5 px-1">
                                <div className="w-1 h-1 rounded-full bg-red-500/60"></div>
                                <div className="w-1 h-1 rounded-full bg-yellow-500/60"></div>
                                <div className="w-1 h-1 rounded-full bg-green-500/60"></div>
                            </div>
                            <div className="p-1 space-y-0.5">
                                <div className="h-1 bg-purple-500/30 rounded w-3/4"></div>
                                <div className="h-1 bg-purple-500/20 rounded w-1/2"></div>
                            </div>
                        </div>
                    ))}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                        <svg className="w-5 h-5 text-purple-400 animate-pulse" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                        </svg>
                    </div>
                </div>
            )
        },
        {
            icon: <Keyboard className="w-8 h-8" />,
            title: "Global Hotkeys",
            description: "System-wide shortcuts that work even when CoolDesk isn't focused.",
            gradient: "from-amber-500 to-orange-600",
            visual: (
                <div className="relative w-full h-28 flex items-center justify-center">
                    <div className="flex gap-1.5">
                        {['Ctrl', '+', 'Shift', '+', 'S'].map((key, i) => (
                            <div
                                key={i}
                                className={`${
                                    key === '+'
                                        ? 'text-zinc-500 text-sm'
                                        : 'px-2 py-1.5 bg-zinc-800 rounded-lg border border-white/10 text-xs font-mono text-amber-300 shadow-lg'
                                } flex items-center justify-center`}
                            >
                                {key}
                            </div>
                        ))}
                    </div>
                    <div className="absolute bottom-1 left-1/2 -translate-x-1/2 text-[9px] text-zinc-500">
                        Open Search Anywhere
                    </div>
                </div>
            )
        },
    ];

    return (
        <section id="how-to-use" className="relative py-32 bg-gradient-to-b from-zinc-950 via-zinc-900 to-zinc-950 overflow-hidden">
            {/* Advanced Background Effects */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                {/* Animated Gradient Orbs */}
                <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-gradient-to-br from-blue-600/20 via-purple-600/10 to-transparent blur-[120px] rounded-full animate-pulse" />
                <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-gradient-to-tl from-cyan-500/15 via-blue-500/10 to-transparent blur-[100px] rounded-full animate-pulse" style={{ animationDelay: '1s' }} />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-gradient-to-r from-purple-600/5 via-pink-600/5 to-blue-600/5 blur-[150px] rounded-full" />

                {/* Grid Pattern Overlay */}
                <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:64px_64px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,black,transparent)]" />
            </div>

            <div className="container mx-auto px-6 relative z-10">

                {/* Hero Header with Animated Gradient */}
                <div className="text-center mb-24 relative">
                    <div className="inline-block mb-6">
                        <div className="px-4 py-2 rounded-full bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10 border border-white/10 backdrop-blur-xl">
                            <span className="label text-gradient-accent">
                                GETTING STARTED
                            </span>
                        </div>
                    </div>
                    <h2 className="heading-1 text-txt-primary mb-6 leading-tight">
                        From Zero to{' '}
                        <span className="text-gradient animate-gradient">
                            Superhuman
                        </span>
                        <br />
                        <span className="heading-2 text-txt-secondary font-light">in 30 seconds</span>
                    </h2>
                    <p className="body-lg text-txt-secondary max-w-2xl mx-auto leading-relaxed">
                        No setup complexity. No learning curve. No credit card.
                        <br />
                        <span className="text-txt-primary font-semibold">Just pure, intelligent productivity.</span>
                    </p>
                </div>

                {/* Premium 3-Step Process */}
                <div className="max-w-7xl mx-auto mb-32 relative">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 relative">
                        {steps.map((step, index) => (
                            <div key={index} className="relative group">
                                {/* Floating Card */}
                                <div className="relative bg-gradient-to-br from-zinc-900/90 to-zinc-950/90 backdrop-blur-2xl border border-white/10 rounded-3xl p-8 hover:border-white/20 transition-all duration-500 hover:scale-105 hover:-translate-y-2 shadow-2xl hover:shadow-blue-500/20">
                                    {/* Gradient Overlay on Hover */}
                                    <div className={`absolute inset-0 bg-gradient-to-br ${step.gradient} opacity-0 group-hover:opacity-10 rounded-3xl transition-opacity duration-500`} />

                                    {/* Illustration */}
                                    <div className="relative mb-6 group-hover:scale-105 transition-transform duration-500">
                                        {step.illustration}
                                    </div>

                                    {/* Step Number with Glow */}
                                    <div className="relative mb-6 flex items-center gap-4">
                                        <div className="text-5xl font-black text-transparent bg-gradient-to-br from-zinc-800 to-zinc-900 bg-clip-text group-hover:from-blue-500/30 group-hover:to-purple-500/30 transition-all duration-500">
                                            {step.number}
                                        </div>
                                        <div className="text-4xl group-hover:scale-125 transition-transform duration-500">
                                            {step.icon}
                                        </div>
                                    </div>

                                    <h3 className="heading-4 text-txt-primary mb-4 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-cyan-400 group-hover:to-blue-500 group-hover:bg-clip-text transition-all duration-300">
                                        {step.title}
                                    </h3>
                                    <p className="body-base text-txt-secondary leading-relaxed">
                                        {step.description}
                                    </p>

                                    {/* Animated Border Glow */}
                                    <div className={`absolute inset-0 rounded-3xl bg-gradient-to-r ${step.gradient} opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-500 -z-10`} />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Features Showcase - Bento Grid Style */}
                <div className="max-w-7xl mx-auto mb-32">
                    <div className="text-center mb-16">
                        <h3 className="heading-2 text-txt-primary mb-6">
                            <span className="text-gradient">
                                Four Superpowers.
                            </span>
                            <br />
                            One Ecosystem.
                        </h3>
                        <p className="body-lg text-txt-secondary max-w-3xl mx-auto">
                            Every feature designed to eliminate friction and amplify your focus.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {features.map((feature, index) => (
                            <div key={index}
                                className="group relative bg-gradient-to-br from-zinc-900/50 to-zinc-950/50 backdrop-blur-xl border border-white/5 rounded-2xl p-6 hover:border-white/20 transition-all duration-500 hover:scale-105 overflow-hidden">

                                {/* Animated Background Gradient */}
                                <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />

                                {/* Border Gradient Glow */}
                                <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${feature.borderGradient} opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-500 -z-10`} />

                                <div className="relative z-10">
                                    {/* Visual/Animation */}
                                    <div className="mb-6 group-hover:scale-105 transition-transform duration-500">
                                        {feature.visual}
                                    </div>

                                    {/* Icon with Glow Effect */}
                                    <div className="mb-4 relative inline-block">
                                        <div className="text-3xl group-hover:scale-125 transition-transform duration-500">
                                            {feature.icon}
                                        </div>
                                        <div className={`absolute inset-0 bg-gradient-to-br ${feature.borderGradient} blur-2xl opacity-0 group-hover:opacity-60 transition-opacity duration-500`} />
                                    </div>

                                    <h4 className="heading-5 text-txt-primary mb-3 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-zinc-300 group-hover:bg-clip-text transition-all duration-300">
                                        {feature.title}
                                    </h4>
                                    <p className="body-sm text-txt-secondary leading-relaxed group-hover:text-txt-primary transition-colors duration-300">
                                        {feature.description}
                                    </p>

                                    {/* Stat Display */}
                                    {/* @ts-ignore */}
                                    {feature.stat && (
                                        <div className="mt-4 pt-4 border-t border-white/5 flex items-center justify-between">
                                            <div className="display-sm text-txt-accent">
                                                {/* @ts-ignore */}
                                                {feature.stat}
                                            </div>
                                            <div className="caption text-txt-muted uppercase tracking-wider font-semibold">
                                                {/* @ts-ignore */}
                                                {feature.statLabel}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Desktop App Features */}
                <div className="max-w-5xl mx-auto mb-32">
                    <div className="text-center mb-12">
                        <div className="inline-block mb-4">
                            <div className="px-4 py-2 rounded-full bg-gradient-to-r from-purple-500/10 via-blue-500/10 to-cyan-500/10 border border-white/10">
                                <span className="label text-gradient-accent flex items-center justify-center gap-2">
                                    <Zap className="w-4 h-4" />
                                    DESKTOP APP POWERS
                                </span>
                            </div>
                        </div>
                        <h3 className="heading-2 text-txt-primary mb-4">
                            Beyond the Browser
                        </h3>
                        <p className="body-lg text-txt-secondary max-w-2xl mx-auto">
                            The desktop app adds <strong className="text-white">system-wide controls</strong> —
                            focus apps, switch tabs, and navigate windows without your mouse.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                        {desktopFeatures.map((feature, index) => (
                            <div
                                key={index}
                                className="group relative bg-gradient-to-br from-zinc-900/80 to-zinc-950/80 backdrop-blur-xl border border-white/5 rounded-2xl p-5 hover:border-white/20 transition-all duration-500 overflow-hidden"
                            >
                                <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500`} />

                                <div className="mb-4">
                                    {feature.visual}
                                </div>

                                <div className="relative z-10 flex items-start gap-3">
                                    <div className={`p-2 rounded-xl bg-gradient-to-br ${feature.gradient} bg-opacity-20`}>
                                        <div className="text-white">{feature.icon}</div>
                                    </div>
                                    <div>
                                        <h4 className="heading-5 text-txt-primary mb-1">{feature.title}</h4>
                                        <p className="body-sm text-txt-secondary">{feature.description}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Final CTA with Premium Styling */}
                <div className="text-center mb-32">
                    <a href="#downloads"
                        className="btn-gradient btn-xl group inline-flex items-center gap-3 hover:shadow-2xl hover:shadow-blue-500/50 transition-all duration-500 hover:scale-110 active:scale-95 relative overflow-hidden">

                        {/* Animated Shine Effect */}
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000" />

                        <span className="relative z-10">Get Extension + App — It's Free</span>
                        <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300 relative z-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                    </a>

                    <div className="mt-6 flex flex-wrap items-center justify-center gap-6 caption text-txt-muted">
                        <div className="flex items-center gap-2">
                            <div className="w-2 h-2 rounded-full bg-txt-success animate-pulse" />
                            <span>100% Free</span>
                        </div>
                        <div className="w-1 h-1 rounded-full bg-zinc-700" />
                        <div className="flex items-center gap-2">
                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                            </svg>
                            <span>Privacy First</span>
                        </div>
                        <div className="w-1 h-1 rounded-full bg-zinc-700" />
                        <div className="flex items-center gap-2">
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                            </svg>
                            <span>Windows, Mac, Linux</span>
                        </div>
                    </div>
                </div>

            </div>

            <style jsx>{`
                @keyframes gradient {
                    0%, 100% { background-position: 0% 50%; }
                    50% { background-position: 100% 50%; }
                }
                @keyframes shimmer {
                    0% { transform: translateX(-100%); }
                    100% { transform: translateX(100%); }
                }
                @keyframes float {
                    0%, 100% {
                        transform: translateY(0px) rotate(0deg);
                        opacity: 0.6;
                    }
                    50% {
                        transform: translateY(-20px) rotate(2deg);
                        opacity: 1;
                    }
                }
                @keyframes spin-slow {
                    from { transform: rotate(0deg); }
                    to { transform: rotate(360deg); }
                }
                @keyframes slide-up {
                    from {
                        transform: translateY(10px);
                        opacity: 0;
                    }
                    to {
                        transform: translateY(0);
                        opacity: 1;
                    }
                }
                @keyframes fade-in {
                    from {
                        opacity: 0;
                        transform: translateX(-10px);
                    }
                    to {
                        opacity: 1;
                        transform: translateX(0);
                    }
                }
                .animate-gradient {
                    background-size: 200% 200%;
                    animation: gradient 3s ease infinite;
                }
                .animate-shimmer {
                    animation: shimmer 2s ease-in-out infinite;
                }
                .animate-float {
                    animation: float 3s ease-in-out infinite;
                }
                .animate-spin-slow {
                    animation: spin-slow 4s linear infinite;
                }
                .animate-slide-up {
                    animation: slide-up 0.6s ease-out forwards;
                }
                .animate-fade-in {
                    animation: fade-in 0.5s ease-out forwards;
                }
            `}</style>
        </section>
    );
}