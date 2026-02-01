import {
    Bot,
    Command,
    Highlighter,
    Link2,
    MessageSquare,
    Mic,
    Pin,
    Sparkles,
    StickyNote,
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
            description: "One click to transform your browser into an intelligent workspace.",
            icon: <Zap className="w-8 h-8 text-cyan-400" />,
            gradient: "from-cyan-500 to-blue-600",
            illustration: (
                <div className="relative w-full h-48 bg-gradient-to-br from-cyan-500/10 to-blue-600/10 rounded-xl flex items-center justify-center overflow-hidden">
                    <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDM0djItaDJ2LTJoLTJ6bTAgNGgtMnYyaDJ2LTJ6bTQtNHYyaDJ2LTJoLTJ6Ii8+PC9nPjwvZz48L3N2Zz4=')] opacity-30"></div>
                    <svg className="w-24 h-24 text-cyan-400 animate-bounce" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10" />
                    </svg>
                    <div className="absolute bottom-4 right-4 px-3 py-1 bg-cyan-500/20 backdrop-blur-sm rounded-full border border-cyan-500/30 text-xs text-cyan-300 font-semibold">
                        Chrome Store
                    </div>
                </div>
            )
        },
        {
            number: "02",
            title: "Pin & Access",
            description: "Keep CoolDesk at your fingertips for instant productivity.",
            icon: <Pin className="w-8 h-8 text-purple-400" />,
            gradient: "from-blue-600 to-purple-600",
            illustration: (
                <div className="relative w-full h-48 bg-gradient-to-br from-blue-600/10 to-purple-600/10 rounded-xl flex items-center justify-center overflow-hidden">
                    <div className="relative">
                        <div className="w-32 h-20 bg-zinc-800 rounded-lg border border-white/10 shadow-2xl">
                            <div className="h-6 bg-zinc-700 rounded-t-lg border-b border-white/5 flex items-center gap-1 px-2">
                                <div className="w-2 h-2 rounded-full bg-red-500/60"></div>
                                <div className="w-2 h-2 rounded-full bg-yellow-500/60"></div>
                                <div className="w-2 h-2 rounded-full bg-green-500/60"></div>
                            </div>
                            <div className="p-2 space-y-1">
                                <div className="h-2 bg-purple-500/40 rounded w-3/4"></div>
                                <div className="h-2 bg-blue-500/40 rounded w-1/2"></div>
                            </div>
                        </div>
                        <div className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center animate-pulse shadow-lg shadow-purple-500/50">
                            <Pin className="w-4 h-4 text-white" />
                        </div>
                    </div>
                </div>
            )
        },
        {
            number: "03",
            title: "Experience Magic",
            description: "Watch AI organize your digital life automatically.",
            icon: <Sparkles className="w-8 h-8 text-pink-400" />,
            gradient: "from-purple-600 to-pink-600",
            illustration: (
                <div className="relative w-full h-48 bg-gradient-to-br from-purple-600/10 to-pink-600/10 rounded-xl flex items-center justify-center overflow-hidden">
                    <div className="absolute inset-0">
                        <div className="absolute top-8 left-8 w-16 h-12 bg-purple-500/20 rounded border border-purple-400/30 animate-float"></div>
                        <div className="absolute top-12 right-12 w-20 h-12 bg-pink-500/20 rounded border border-pink-400/30 animate-float" style={{ animationDelay: '0.5s' }}></div>
                        <div className="absolute bottom-12 left-16 w-14 h-12 bg-blue-500/20 rounded border border-blue-400/30 animate-float" style={{ animationDelay: '1s' }}></div>
                    </div>
                    <div className="relative z-10">
                        <Sparkles className="w-16 h-16 text-pink-400 animate-spin-slow" />
                        <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 blur-xl opacity-50 animate-pulse"></div>
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
            description: "Seamless collaboration with instant workspace sharing.",
            stat: "2x",
            statLabel: "Faster Sync",
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
            title: "Context Notes",
            description: "Intelligent sticky notes that remember where you left off.",
            stat: "3sec",
            statLabel: "To Capture",
            icon: <StickyNote className="w-7 h-7" />,
            gradient: "from-purple-500/20 to-pink-600/20",
            borderGradient: "from-purple-500/50 to-pink-600/50",
            visual: (
                <div className="relative w-full h-40 bg-gradient-to-br from-purple-500/5 to-pink-600/5 rounded-lg overflow-hidden p-4">
                    <div className="absolute top-3 left-3 w-32 h-24 bg-gradient-to-br from-purple-500/30 to-purple-600/30 rounded-lg border border-purple-400/40 p-2 shadow-lg rotate-[-3deg] animate-float">
                        <div className="space-y-1">
                            <div className="h-2 bg-purple-300/60 rounded w-full"></div>
                            <div className="h-2 bg-purple-300/60 rounded w-3/4"></div>
                            <div className="h-2 bg-purple-300/60 rounded w-1/2"></div>
                        </div>
                    </div>
                    <div className="absolute top-6 right-3 w-28 h-20 bg-gradient-to-br from-pink-500/30 to-pink-600/30 rounded-lg border border-pink-400/40 p-2 shadow-lg rotate-[2deg] animate-float" style={{ animationDelay: '0.4s' }}>
                        <div className="space-y-1">
                            <div className="h-2 bg-pink-300/60 rounded w-full"></div>
                            <div className="h-2 bg-pink-300/60 rounded w-2/3"></div>
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
        {
            title: "Page Highlights & Notes",
            description: "Create sticky notes and highlight text on any webpage with injected buttons.",
            stat: "Any",
            statLabel: "Web Page",
            icon: <Highlighter className="w-7 h-7" />,
            gradient: "from-yellow-500/20 to-lime-600/20",
            borderGradient: "from-yellow-500/50 to-lime-600/50",
            visual: (
                <div className="relative w-full h-40 bg-gradient-to-br from-yellow-500/5 to-lime-600/5 rounded-lg overflow-hidden p-3">
                    {/* Browser mockup */}
                    <div className="w-full h-full bg-zinc-800/60 rounded-lg border border-white/10 overflow-hidden">
                        {/* Browser header */}
                        <div className="h-5 bg-zinc-700/80 border-b border-white/5 flex items-center px-2 gap-1">
                            <div className="w-1.5 h-1.5 rounded-full bg-red-500/60"></div>
                            <div className="w-1.5 h-1.5 rounded-full bg-yellow-500/60"></div>
                            <div className="w-1.5 h-1.5 rounded-full bg-green-500/60"></div>
                            <div className="flex-1 mx-2 h-2.5 bg-zinc-600/50 rounded text-[6px] text-zinc-400 flex items-center px-1">gemini.google.com</div>
                        </div>
                        {/* Page content with highlights */}
                        <div className="p-2 space-y-1.5 relative">
                            <div className="h-2 bg-zinc-600/40 rounded w-full"></div>
                            <div className="h-2 bg-yellow-400/40 rounded w-3/4 animate-pulse"></div>
                            <div className="h-2 bg-zinc-600/40 rounded w-5/6"></div>
                            <div className="h-2 bg-lime-400/40 rounded w-2/3 animate-pulse" style={{ animationDelay: '0.3s' }}></div>
                            <div className="h-2 bg-zinc-600/40 rounded w-full"></div>

                            {/* Sticky note */}
                            <div className="absolute top-1 right-1 w-16 h-14 bg-gradient-to-br from-yellow-300 to-yellow-400 rounded shadow-lg p-1.5 rotate-[2deg] animate-float">
                                <div className="text-[6px] text-yellow-900 font-medium leading-tight">Note saved!</div>
                                <div className="mt-1 space-y-0.5">
                                    <div className="h-1 bg-yellow-600/30 rounded w-full"></div>
                                    <div className="h-1 bg-yellow-600/30 rounded w-2/3"></div>
                                </div>
                            </div>

                            {/* Injected button indicator */}
                            <div className="absolute bottom-1 right-1 flex gap-1">
                                <div className="w-5 h-5 bg-gradient-to-br from-yellow-500 to-lime-500 rounded flex items-center justify-center shadow-lg animate-bounce" style={{ animationDelay: '0.2s' }}>
                                    <StickyNote className="w-3 h-3 text-white" />
                                </div>
                                <div className="w-5 h-5 bg-gradient-to-br from-lime-500 to-green-500 rounded flex items-center justify-center shadow-lg animate-bounce" style={{ animationDelay: '0.4s' }}>
                                    <Link2 className="w-3 h-3 text-white" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )
        },
        {
            title: "Voice Control",
            description: "Navigate hands-free with natural language commands.",
            stat: "100%",
            statLabel: "Hands Free",
            icon: <Mic className="w-7 h-7" />,
            gradient: "from-orange-500/20 to-amber-600/20",
            borderGradient: "from-orange-500/50 to-amber-600/50",
            visual: (
                <div className="relative w-full h-40 bg-gradient-to-br from-orange-500/5 to-amber-600/5 rounded-lg overflow-hidden flex items-center justify-center">
                    <div className="relative">
                        <Mic className="w-16 h-16 text-orange-400 animate-pulse" />
                        <div className="absolute inset-0 flex items-center justify-center">
                            <div className="w-20 h-20 border-4 border-orange-400/40 rounded-full animate-ping"></div>
                        </div>
                        <div className="absolute inset-0 flex items-center justify-center">
                            <div className="w-28 h-28 border-2 border-amber-400/20 rounded-full animate-ping" style={{ animationDelay: '0.5s' }}></div>
                        </div>
                        <div className="absolute -bottom-12 left-1/2 -translate-x-1/2 px-4 py-2 bg-orange-500/30 backdrop-blur-sm rounded-lg border border-orange-400/40 text-sm text-orange-200 whitespace-nowrap animate-pulse">
                            "Open workspace..."
                        </div>
                    </div>
                </div>
            )
        },
        {
            title: "Almighty Search",
            description: "Lightning-fast access to URLs, history, and every workspace.",
            stat: "5min",
            statLabel: "Saved Daily",
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
                                Seven Superpowers.
                            </span>
                            <br />
                            One Extension.
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
                {/* Final CTA with Premium Styling */}
                <div className="text-center mb-32">
                    <a href="https://chromewebstore.google.com/detail/cooldesk/ioggffobciopdddacpclplkeodllhjko"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-gradient btn-xl group inline-flex items-center gap-3 hover:shadow-2xl hover:shadow-blue-500/50 transition-all duration-500 hover:scale-110 active:scale-95 relative overflow-hidden">

                        {/* Animated Shine Effect */}
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000" />

                        <span className="relative z-10">Add to Chrome — It's Free</span>
                        <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300 relative z-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                    </a>

                    <div className="mt-6 flex items-center justify-center gap-6 caption text-txt-muted">
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
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                            </svg>
                            <span>Instant Setup</span>
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