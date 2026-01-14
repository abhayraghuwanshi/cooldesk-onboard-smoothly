export default function HowToUse() {
    const steps = [
        {
            number: "01",
            title: "Install Extension",
            description: "One click to transform your browser into an intelligent workspace.",
            icon: "⚡",
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
            icon: "📌",
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
                        <div className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center text-lg animate-pulse shadow-lg shadow-purple-500/50">
                            📌
                        </div>
                    </div>
                </div>
            )
        },
        {
            number: "03",
            title: "Experience Magic",
            description: "Watch AI organize your digital life automatically.",
            icon: "✨",
            gradient: "from-purple-600 to-pink-600",
            illustration: (
                <div className="relative w-full h-48 bg-gradient-to-br from-purple-600/10 to-pink-600/10 rounded-xl flex items-center justify-center overflow-hidden">
                    <div className="absolute inset-0">
                        <div className="absolute top-8 left-8 w-16 h-12 bg-purple-500/20 rounded border border-purple-400/30 animate-float"></div>
                        <div className="absolute top-12 right-12 w-20 h-12 bg-pink-500/20 rounded border border-pink-400/30 animate-float" style={{ animationDelay: '0.5s' }}></div>
                        <div className="absolute bottom-12 left-16 w-14 h-12 bg-blue-500/20 rounded border border-blue-400/30 animate-float" style={{ animationDelay: '1s' }}></div>
                    </div>
                    <div className="relative z-10">
                        <div className="text-6xl animate-spin-slow">✨</div>
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
            icon: "🎯",
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
            icon: "👥",
            gradient: "from-blue-500/20 to-indigo-600/20",
            borderGradient: "from-blue-500/50 to-indigo-600/50",
            visual: (
                <div className="relative w-full h-40 bg-gradient-to-br from-blue-500/5 to-indigo-600/5 rounded-lg overflow-hidden flex items-center justify-center">
                    <div className="relative flex items-center gap-3">
                        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500/40 to-blue-600/40 border-2 border-blue-400/50 flex items-center justify-center text-lg animate-pulse">
                            👤
                        </div>
                        <div className="flex flex-col gap-1">
                            <div className="w-2 h-2 bg-blue-400 rounded-full animate-ping"></div>
                            <div className="w-2 h-2 bg-indigo-400 rounded-full animate-ping" style={{ animationDelay: '0.3s' }}></div>
                            <div className="w-2 h-2 bg-blue-400 rounded-full animate-ping" style={{ animationDelay: '0.6s' }}></div>
                        </div>
                        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-indigo-500/40 to-indigo-600/40 border-2 border-indigo-400/50 flex items-center justify-center text-lg animate-pulse" style={{ animationDelay: '0.5s' }}>
                            👤
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
            icon: "📝",
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
            icon: "🤖",
            gradient: "from-pink-500/20 to-rose-600/20",
            borderGradient: "from-pink-500/50 to-rose-600/50",
            visual: (
                <div className="relative w-full h-40 bg-gradient-to-br from-pink-500/5 to-rose-600/5 rounded-lg overflow-hidden p-4 space-y-2">
                    <div className="flex gap-2 animate-slide-up">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-pink-500/40 to-rose-600/40 border border-pink-400/50 flex items-center justify-center text-sm">
                            🤖
                        </div>
                        <div className="flex-1 h-8 bg-pink-500/20 rounded-lg border border-pink-400/30 flex items-center px-2 text-xs text-pink-200">
                            Analyzing...
                        </div>
                    </div>
                    <div className="flex gap-2 animate-slide-up" style={{ animationDelay: '0.3s' }}>
                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-rose-500/40 to-pink-600/40 border border-rose-400/50 flex items-center justify-center text-sm">
                            💬
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
            title: "Voice Control",
            description: "Navigate hands-free with natural language commands.",
            icon: "🎤",
            gradient: "from-orange-500/20 to-amber-600/20",
            borderGradient: "from-orange-500/50 to-amber-600/50",
            visual: (
                <div className="relative w-full h-40 bg-gradient-to-br from-orange-500/5 to-amber-600/5 rounded-lg overflow-hidden flex items-center justify-center">
                    <div className="relative">
                        <div className="text-6xl animate-pulse">🎤</div>
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
            title: "Command Palette",
            description: "Lightning-fast access to every feature, every workspace.",
            icon: "⌘",
            gradient: "from-emerald-500/20 to-teal-600/20",
            borderGradient: "from-emerald-500/50 to-teal-600/50",
            visual: (
                <div className="relative w-full h-40 bg-gradient-to-br from-emerald-500/5 to-teal-600/5 rounded-lg overflow-hidden flex items-center justify-center">
                    <div className="w-full max-w-[200px] bg-zinc-800/80 backdrop-blur-sm rounded-lg border border-emerald-400/30 shadow-2xl">
                        <div className="p-2 border-b border-white/5">
                            <div className="h-6 bg-emerald-500/20 rounded border border-emerald-400/30 flex items-center px-2 text-xs text-emerald-200">
                                <span className="animate-pulse">⌘ Search...</span>
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
                            <span className="text-sm font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                                GETTING STARTED
                            </span>
                        </div>
                    </div>
                    <h2 className="text-5xl md:text-7xl font-black text-white mb-6 leading-tight">
                        From Zero to{' '}
                        <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent animate-gradient">
                            Superhuman
                        </span>
                        <br />
                        <span className="text-4xl md:text-5xl text-zinc-400 font-light">in 30 seconds</span>
                    </h2>
                    <p className="text-zinc-400 text-lg max-w-2xl mx-auto leading-relaxed">
                        No setup complexity. No learning curve. No credit card.
                        <br />
                        <span className="text-white font-semibold">Just pure, intelligent productivity.</span>
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

                                    <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-cyan-400 group-hover:to-blue-500 group-hover:bg-clip-text transition-all duration-300">
                                        {step.title}
                                    </h3>
                                    <p className="text-zinc-400 leading-relaxed">
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
                        <h3 className="text-4xl md:text-5xl font-black text-white mb-6">
                            <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent">
                                Six Superpowers.
                            </span>
                            <br />
                            One Extension.
                        </h3>
                        <p className="text-zinc-400 text-lg max-w-3xl mx-auto">
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

                                    <h4 className="text-xl font-bold text-white mb-3 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-zinc-300 group-hover:bg-clip-text transition-all duration-300">
                                        {feature.title}
                                    </h4>
                                    <p className="text-zinc-400 text-sm leading-relaxed group-hover:text-zinc-300 transition-colors duration-300">
                                        {feature.description}
                                    </p>
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
                        className="group inline-flex items-center gap-3 bg-gradient-to-r from-cyan-500 via-blue-600 to-purple-600 text-white px-10 py-5 rounded-2xl font-bold text-lg hover:shadow-2xl hover:shadow-blue-500/50 transition-all duration-500 hover:scale-110 active:scale-95 relative overflow-hidden">

                        {/* Animated Shine Effect */}
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000" />

                        <span className="relative z-10">Add to Chrome — It's Free</span>
                        <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300 relative z-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                    </a>

                    <div className="mt-6 flex items-center justify-center gap-6 text-zinc-500 text-sm">
                        <div className="flex items-center gap-2">
                            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
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

                {/* Footer Information Section */}
                <div className="max-w-7xl mx-auto pt-20 border-t border-white/5">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">

                        {/* About CoolDesk */}
                        <div>
                            <h4 className="text-white font-bold text-lg mb-6 flex items-center gap-2">
                                <div className="w-8 h-8 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-lg flex items-center justify-center">
                                    <span className="text-sm">🚀</span>
                                </div>
                                CoolDesk
                            </h4>
                            <p className="text-zinc-400 text-sm leading-relaxed mb-4">
                                Transform your browser into an AI-powered productivity powerhouse. Smart workspaces, intelligent organization, and seamless collaboration at your fingertips.
                            </p>
                            <div className="flex items-center gap-3">
                                <a href="https://twitter.com/cooldesk" target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-lg bg-zinc-800 hover:bg-zinc-700 flex items-center justify-center transition-colors border border-white/5 hover:border-blue-500/50">
                                    <svg className="w-4 h-4 text-zinc-400" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
                                </a>
                                <a href="https://github.com/cooldesk" target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-lg bg-zinc-800 hover:bg-zinc-700 flex items-center justify-center transition-colors border border-white/5 hover:border-purple-500/50">
                                    <svg className="w-4 h-4 text-zinc-400" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
                                </a>
                                <a href="https://linkedin.com/company/cooldesk" target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-lg bg-zinc-800 hover:bg-zinc-700 flex items-center justify-center transition-colors border border-white/5 hover:border-cyan-500/50">
                                    <svg className="w-4 h-4 text-zinc-400" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                                </a>
                            </div>
                        </div>

                        {/* Product */}
                        <div>
                            <h4 className="text-white font-bold text-sm uppercase tracking-wider mb-6">Product</h4>
                            <ul className="space-y-3">
                                <li><a href="#features" className="text-zinc-400 hover:text-white transition-colors text-sm flex items-center gap-2 group">
                                    <span className="w-1 h-1 rounded-full bg-blue-500 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                                    Features
                                </a></li>
                                <li><a href="#how-to-use" className="text-zinc-400 hover:text-white transition-colors text-sm flex items-center gap-2 group">
                                    <span className="w-1 h-1 rounded-full bg-blue-500 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                                    How It Works
                                </a></li>
                                <li><a href="#pricing" className="text-zinc-400 hover:text-white transition-colors text-sm flex items-center gap-2 group">
                                    <span className="w-1 h-1 rounded-full bg-blue-500 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                                    Pricing
                                </a></li>
                                <li><a href="#" className="text-zinc-400 hover:text-white transition-colors text-sm flex items-center gap-2 group">
                                    <span className="w-1 h-1 rounded-full bg-blue-500 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                                    Roadmap
                                </a></li>
                                <li><a href="#" className="text-zinc-400 hover:text-white transition-colors text-sm flex items-center gap-2 group">
                                    <span className="w-1 h-1 rounded-full bg-blue-500 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                                    Changelog
                                </a></li>
                            </ul>
                        </div>

                        {/* Resources */}
                        <div>
                            <h4 className="text-white font-bold text-sm uppercase tracking-wider mb-6">Resources</h4>
                            <ul className="space-y-3">
                                <li><a href="#" className="text-zinc-400 hover:text-white transition-colors text-sm flex items-center gap-2 group">
                                    <span className="w-1 h-1 rounded-full bg-purple-500 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                                    Documentation
                                </a></li>
                                <li><a href="#" className="text-zinc-400 hover:text-white transition-colors text-sm flex items-center gap-2 group">
                                    <span className="w-1 h-1 rounded-full bg-purple-500 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                                    Help Center
                                </a></li>
                                <li><a href="#" className="text-zinc-400 hover:text-white transition-colors text-sm flex items-center gap-2 group">
                                    <span className="w-1 h-1 rounded-full bg-purple-500 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                                    Blog
                                </a></li>
                                <li><a href="#" className="text-zinc-400 hover:text-white transition-colors text-sm flex items-center gap-2 group">
                                    <span className="w-1 h-1 rounded-full bg-purple-500 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                                    Video Tutorials
                                </a></li>
                                <li><a href="#" className="text-zinc-400 hover:text-white transition-colors text-sm flex items-center gap-2 group">
                                    <span className="w-1 h-1 rounded-full bg-purple-500 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                                    Community
                                </a></li>
                            </ul>
                        </div>

                        {/* Legal */}
                        <div>
                            <h4 className="text-white font-bold text-sm uppercase tracking-wider mb-6">Legal</h4>
                            <ul className="space-y-3">
                                <li><a href="#" className="text-zinc-400 hover:text-white transition-colors text-sm flex items-center gap-2 group">
                                    <span className="w-1 h-1 rounded-full bg-cyan-500 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                                    Privacy Policy
                                </a></li>
                                <li><a href="#" className="text-zinc-400 hover:text-white transition-colors text-sm flex items-center gap-2 group">
                                    <span className="w-1 h-1 rounded-full bg-cyan-500 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                                    Terms of Service
                                </a></li>
                                <li><a href="#" className="text-zinc-400 hover:text-white transition-colors text-sm flex items-center gap-2 group">
                                    <span className="w-1 h-1 rounded-full bg-cyan-500 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                                    Cookie Policy
                                </a></li>
                                <li><a href="#" className="text-zinc-400 hover:text-white transition-colors text-sm flex items-center gap-2 group">
                                    <span className="w-1 h-1 rounded-full bg-cyan-500 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                                    Security
                                </a></li>
                            </ul>
                            <div className="mt-6 pt-6 border-t border-white/5">
                                <p className="text-xs text-zinc-500">
                                    <span className="font-semibold text-zinc-400">Status:</span>
                                    <span className="ml-2 inline-flex items-center gap-1">
                                        <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></span>
                                        All Systems Operational
                                    </span>
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Bottom Bar */}
                    <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
                        <p className="text-zinc-500 text-sm">
                            © 2026 CoolDesk. Built with 💙 for productivity enthusiasts worldwide.
                        </p>
                        <div className="flex items-center gap-6 text-sm">
                            <a href="#" className="text-zinc-500 hover:text-white transition-colors">Contact</a>
                            <a href="#" className="text-zinc-500 hover:text-white transition-colors">Support</a>
                            <a href="https://chromewebstore.google.com/detail/cooldesk/ioggffobciopdddacpclplkeodllhjko" target="_blank" rel="noopener noreferrer" className="px-4 py-2 bg-gradient-to-r from-blue-600/20 to-purple-600/20 text-blue-400 rounded-lg border border-blue-500/30 hover:border-blue-500/50 transition-all text-xs font-semibold">
                                View on Chrome Store
                            </a>
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