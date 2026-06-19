import { AppWindow, Bot, Chrome, Focus, Image as ImageIcon, Keyboard, KeyRound, Layers, MonitorUp, Palette, RefreshCw, Search, Sparkles, Target, Wrench, Zap } from 'lucide-react';
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
    troubleshoot: { problem: string; fix: string };
}

const comparisons: Step[] = [
    {
        step: 1,
        headline: "Install the Chrome Extension",
        detail: "Every tab you open gets bridged into CoolDesk. Your browser stops being a pile of tabs and becomes a living map of what you're working on.",
        unlock: "Tab management, history sync, and browsing context — all flowing into your workspaces automatically.",
        feature: "Browser Bridge",
        icon: <Chrome className="w-8 h-8 md:w-12 md:h-12 text-txt-accent" />,
        image: '/gif/extension.mp4',
        miniFeatures: [
            { icon: <Zap className="w-4 h-4 text-cyan-400" />, label: "Tab Capture", desc: "Every tab tracked by project" },
            { icon: <Layers className="w-4 h-4 text-blue-400" />, label: "Smart Tab Switching", desc: "Jump to any tab instantly" },
        ],
        troubleshoot: {
            problem: "Installed it but your new tab looks the same?",
            fix: "Open a fresh tab. If it still doesn't change, visit chrome://extensions, toggle CoolDesk off and on, then restart the browser so the new-tab override takes effect.",
        },
    },
    {
        step: 2,
        headline: "Install the Desktop App",
        detail: "Now your OS joins the picture. CoolDesk sees every open window — VS Code, Figma, Terminal — and ties them to the right project.",
        unlock: "Desktop app windows, per-window focus, and OS-level context connected to your browser workspaces.",
        feature: "Desktop Bridge",
        icon: <AppWindow className="w-8 h-8 md:w-12 md:h-12 text-txt-accent" />,
        image: '/gif/write-notes-todo-detail.mp4',
        miniFeatures: [
            { icon: <AppWindow className="w-4 h-4 text-purple-400" />, label: "App Focus Mode", desc: "Switch to any window by project" },
            { icon: <Sparkles className="w-4 h-4 text-pink-400" />, label: "Windows · Mac · Linux", desc: "Works across all platforms" },
        ],
        troubleshoot: {
            problem: "App installed but the browser shows no running apps?",
            fix: "Keep the desktop app running in the background and sign the app and extension into the same account — running apps only appear when both are connected.",
        },
    }
];

// Shown together in one combined "Now you flow" block after the two install steps.
const finishItems: Step[] = [
    {
        step: 3,
        headline: "Create a Workspace — or Let AI Do It",
        detail: "Start one yourself in seconds, or use AI SmartWorkspace (beta): it reads your open tabs, browser history, and chat threads — then clusters everything into project groups for you.",
        unlock: "Your projects, organized without effort. Manual control when you want it. AI speed when you don't.",
        feature: "AI SmartWorkspace",
        icon: <Bot className="w-8 h-8 md:w-12 md:h-12 text-txt-accent" />,
        image: '/gif/create-workspace.mp4',
        miniFeatures: [
            { icon: <Target className="w-4 h-4 text-cyan-400" />, label: "Smart Workspaces", desc: "90% less clutter, auto-organized" },
            { icon: <Bot className="w-4 h-4 text-pink-400" />, label: "AI Chat Hub", desc: "All your AI threads, one place" },
        ],
        troubleshoot: {
            problem: "AI SmartWorkspace didn't group anything?",
            fix: "It needs some history to learn from — browse a few sites, then re-run it. You can always create a workspace by hand in the meantime.",
        },
    },
    {
        step: 4,
        headline: "Spotlight — Now You Flow",
        detail: "One keystroke. Every tab, note, file, bookmark, and desktop app — searchable from one bar. No hunting. No switching. Just find it and go.",
        unlock: "The last piece. Everything's organized, everything's findable. This is what working without friction feels like.",
        feature: "Spotlight Search",
        icon: <Search className="w-8 h-8 md:w-12 md:h-12 text-txt-accent" />,
        image: '/gif/spotlight.mp4',
        miniFeatures: [
            { icon: <Search className="w-4 h-4 text-emerald-400" />, label: "Spotlight Search", desc: "Tabs, files, folders, apps — one bar" },
            { icon: <Zap className="w-4 h-4 text-yellow-400" />, label: "One Keystroke", desc: "No mouse. No friction." },
        ],
        troubleshoot: {
            problem: "Spotlight won't open with the shortcut?",
            fix: "Another app may have claimed the hotkey — rebind it in Settings → Shortcuts, and make sure the desktop app is running for OS-wide file and app search.",
        },
    }
];

const extensionFeatures = [
    {
        icon: <Layers className="w-8 h-8" />,
        title: "Auto Tab Grouping",
        description: "Tabs cluster into project groups automatically — by domain or task.",
        gradient: "from-cyan-500 to-blue-600",
        visual: (
            <div className="relative w-full h-28 flex items-center justify-center">
                <div className="w-48 space-y-2">
                    {[
                        { name: 'Work', color: 'bg-cyan-500/30 border-cyan-400/40 text-cyan-200', tabs: 4 },
                        { name: 'Research', color: 'bg-blue-500/30 border-blue-400/40 text-blue-200', tabs: 3 },
                        { name: 'Personal', color: 'bg-purple-500/30 border-purple-400/40 text-purple-200', tabs: 2 },
                    ].map((g) => (
                        <div key={g.name} className={`flex items-center gap-2 px-2 py-1 rounded-lg border ${g.color}`}>
                            <span className="text-[10px] font-semibold">{g.name}</span>
                            <div className="flex gap-1">
                                {Array.from({ length: g.tabs }).map((_, i) => (
                                    <div key={i} className="w-3 h-3 rounded bg-white/20"></div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        )
    },
    {
        icon: <Search className="w-8 h-8" />,
        title: "Smart Tab Switching",
        description: "Search and jump to any open tab instantly — no more hunting.",
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

// Detailed feature cards shown directly beneath their matching step:
// extension powers under the Extension step, desktop powers under the Desktop App step.
const POWER_FEATURES_BY_STEP: Record<number, { label: string; items: typeof desktopFeatures }> = {
    1: { label: 'What the extension unlocks', items: extensionFeatures },
    2: { label: 'What the desktop app adds', items: desktopFeatures },
};

// Personalization & sync — bring-your-own API keys, themes, and cross-browser sync.
const customizationFeatures = [
    {
        icon: <Palette className="w-8 h-8" />,
        title: "Themes & Layouts",
        description: "17 built-in themes plus layout controls — make your new tab truly yours.",
        gradient: "from-fuchsia-500 to-purple-600",
        visual: (
            <div className="relative w-full h-28 flex items-center justify-center">
                <div className="flex gap-2">
                    {[
                        'from-rose-500 to-orange-500',
                        'from-cyan-500 to-blue-600',
                        'from-emerald-500 to-teal-600',
                        'from-fuchsia-500 to-purple-600',
                        'from-amber-400 to-yellow-600',
                    ].map((g, i) => (
                        <div
                            key={i}
                            className={`w-9 h-14 rounded-lg bg-gradient-to-b ${g} shadow-lg transition-transform ${i === 3 ? 'border-2 border-white/70 scale-110' : 'border border-white/10'}`}
                        />
                    ))}
                </div>
            </div>
        )
    },
    {
        icon: <ImageIcon className="w-8 h-8" />,
        title: "Unsplash Wallpapers",
        description: "Add your Unsplash API key in Settings for fresh wallpapers that auto-rotate.",
        gradient: "from-cyan-500 to-blue-600",
        visual: (
            <div className="relative w-full h-28 flex items-center justify-center">
                <div className="w-48 space-y-2">
                    <div className="grid grid-cols-3 gap-1.5">
                        {['from-emerald-500/50 to-teal-600/50', 'from-blue-500/50 to-indigo-600/50', 'from-amber-500/50 to-orange-600/50'].map((g, i) => (
                            <div key={i} className={`h-10 rounded-md bg-gradient-to-br ${g} border border-white/10`} />
                        ))}
                    </div>
                    <div className="flex items-center gap-2 px-2 py-1 rounded-md bg-zinc-800/80 border border-white/10">
                        <span className="text-[9px] text-zinc-400">Unsplash API key</span>
                        <span className="ml-auto text-[9px] font-mono text-cyan-300">••••••••</span>
                    </div>
                </div>
            </div>
        )
    },
    {
        icon: <KeyRound className="w-8 h-8" />,
        title: "Bring Your Own AI Key",
        description: "Drop a cloud AI API key into Settings to power smarter natural-language search.",
        gradient: "from-purple-500 to-pink-600",
        visual: (
            <div className="relative w-full h-28 flex items-center justify-center">
                <div className="w-48 space-y-2">
                    <div className="flex items-center gap-1 text-[9px]">
                        <div className="px-2 py-1 rounded-md bg-zinc-800 text-zinc-400 border border-white/10">Local</div>
                        <div className="px-2 py-1 rounded-md bg-gradient-to-r from-purple-500/40 to-pink-600/40 text-white border border-purple-400/40">Cloud</div>
                    </div>
                    <div className="flex items-center gap-2 px-2 py-1.5 rounded-md bg-zinc-800/80 border border-white/10">
                        <KeyRound className="w-3 h-3 text-purple-300" />
                        <span className="text-[9px] font-mono text-purple-200">sk-••••••••••••</span>
                    </div>
                </div>
            </div>
        )
    },
    {
        icon: <RefreshCw className="w-8 h-8" />,
        title: "Sync Across Browsers",
        description: "Your workspaces and settings follow you — synced across browsers and devices.",
        gradient: "from-blue-500 to-indigo-600",
        visual: (
            <div className="relative w-full h-28 flex items-center justify-center gap-4">
                <div className="w-14 h-12 rounded-lg bg-zinc-800 border border-white/10 flex items-center justify-center">
                    <Chrome className="w-6 h-6 text-blue-300" />
                </div>
                <div className="flex flex-col items-center gap-1">
                    <RefreshCw className="w-5 h-5 text-blue-400 animate-spin" style={{ animationDuration: '3s' }} />
                    <span className="text-[8px] text-zinc-400">synced</span>
                </div>
                <div className="w-14 h-12 rounded-lg bg-zinc-800 border border-white/10 flex items-center justify-center">
                    <AppWindow className="w-6 h-6 text-indigo-300" />
                </div>
            </div>
        )
    },
];

export default function NavigationComparison() {
    return (
        <section id="how-to-use" className="relative py-32 overflow-hidden bg-black/40">
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
                    <div className="inline-block mb-6">
                        <div className="px-4 py-2 rounded-full bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10 border border-white/10 backdrop-blur-xl">
                            <span className="label text-gradient-accent">
                                GETTING STARTED
                            </span>
                        </div>
                    </div>
                    <h2 className="heading-1 text-txt-primary mb-3 md:mb-4 leading-tight px-4">
                        Two steps.
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
                        Install the extension, add the desktop app — and your browser, your desktop, and your projects become one seamless system.
                    </p>
                </div>

                {/* Comparison Cards */}
                <div className="max-w-7xl mx-auto space-y-16 md:space-y-32">
                    {comparisons.map((item, index) => {
                        const isEven = index % 2 === 0;
                        const powerGroup = POWER_FEATURES_BY_STEP[item.step];
                        return (
                            <div key={index}>
                            <div className="grid md:grid-cols-2 gap-8 md:gap-20 items-center relative group/card">
                                {/* Connector Line (Desktop) — hidden where feature cards fill the gap */}
                                {index < comparisons.length - 1 && !powerGroup && (
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

                                    {/* Common problem + how to debug it */}
                                    <div className="pl-2 md:pl-4">
                                        <div className="flex items-start gap-2.5 px-4 py-3 rounded-xl bg-amber-500/[0.06] border border-amber-500/20">
                                            <Wrench className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                                            <div>
                                                <p className="text-xs font-semibold text-amber-200/90 leading-snug">{item.troubleshoot.problem}</p>
                                                <p className="text-[11px] text-txt-muted mt-1 leading-relaxed">{item.troubleshoot.fix}</p>
                                            </div>
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
                                        <video
                                            src={item.image}
                                            autoPlay
                                            muted
                                            loop
                                            playsInline
                                            aria-label={item.feature}
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

                            {/* This step's detailed feature cards, directly beneath it */}
                            {powerGroup && (
                                <div className="mt-8 md:mt-10 max-w-4xl mx-auto">
                                    <p className="text-xs font-semibold text-txt-muted uppercase tracking-widest mb-4 pl-1">
                                        {powerGroup.label}
                                    </p>
                                    <div className={`grid grid-cols-1 gap-4 ${powerGroup.items.length === 3 ? 'sm:grid-cols-3' : 'sm:grid-cols-2'}`}>
                                        {powerGroup.items.map((feature, fi) => (
                                            <div
                                                key={fi}
                                                className="group relative bg-gradient-to-br from-zinc-900/80 to-zinc-950/80 backdrop-blur-xl border border-white/5 rounded-2xl p-5 hover:border-white/20 transition-all duration-500 overflow-hidden"
                                            >
                                                <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500`} />
                                                <div className="mb-4">{feature.visual}</div>
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
                            )}
                            </div>
                        );
                    })}
                </div>

                {/* Now you flow — create a workspace + Spotlight, together */}
                <div className="max-w-6xl mx-auto mt-24 md:mt-32">
                    <div className="text-center mb-12">
                        <div className="inline-block mb-4">
                            <div className="px-4 py-2 rounded-full bg-gradient-to-r from-emerald-500/10 via-blue-500/10 to-cyan-500/10 border border-white/10">
                                <span className="label text-gradient-accent flex items-center justify-center gap-2">
                                    <Sparkles className="w-4 h-4" />
                                    NOW YOU FLOW
                                </span>
                            </div>
                        </div>
                        <h3 className="heading-2 text-txt-primary mb-4">
                            Create a workspace, then find anything
                        </h3>
                        <p className="body-lg text-txt-secondary max-w-2xl mx-auto">
                            With both bridges connected, set up your projects and pull up anything across browser and desktop in one keystroke.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6 md:gap-8">
                        {finishItems.map((item, index) => (
                            <div key={index} className="group/card relative rounded-[20px] border border-white/10 bg-white/[0.02] overflow-hidden hover:border-white/20 transition-colors">
                                {/* Image */}
                                <div className="relative aspect-[16/10] overflow-hidden bg-[#0A0A0A]">
                                    <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent z-10 pointer-events-none"></div>
                                    <video
                                        src={item.image}
                                        autoPlay
                                        muted
                                        loop
                                        playsInline
                                        aria-label={item.feature}
                                        className="w-full h-full object-cover opacity-90 group-hover/card:opacity-100 transition-opacity duration-500"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent z-20"></div>
                                    <div className="absolute bottom-4 left-4 z-30 px-3 py-1.5 rounded-lg bg-black/60 backdrop-blur-md border border-white/10 text-xs font-medium text-white/80">
                                        {item.feature} Preview
                                    </div>
                                </div>

                                {/* Content */}
                                <div className="p-6 space-y-5">
                                    <div className="flex items-center gap-3">
                                        <div className="p-3 rounded-2xl bg-white/5 border border-white/10 shadow-inner backdrop-blur-sm">
                                            {item.icon}
                                        </div>
                                        <h4 className="heading-4 text-white font-semibold tracking-tight">{item.headline}</h4>
                                    </div>

                                    <p className="body-md text-txt-muted/80 leading-relaxed">{item.detail}</p>

                                    <div className="relative pl-6 border-l-2 border-btn-primary py-1">
                                        <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-btn-primary/20 flex items-center justify-center">
                                            <div className="w-1.5 h-1.5 rounded-full bg-btn-primary animate-pulse"></div>
                                        </div>
                                        <p className="heading-5 text-white leading-relaxed font-medium">{item.unlock}</p>
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

                                    {/* Common problem + how to debug it */}
                                    <div className="flex items-start gap-2.5 px-4 py-3 rounded-xl bg-amber-500/[0.06] border border-amber-500/20">
                                        <Wrench className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                                        <div>
                                            <p className="text-xs font-semibold text-amber-200/90 leading-snug">{item.troubleshoot.problem}</p>
                                            <p className="text-[11px] text-txt-muted mt-1 leading-relaxed">{item.troubleshoot.fix}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Make it yours — personalization & sync */}
                <div className="max-w-5xl mx-auto mt-24 md:mt-32">
                    <div className="text-center mb-12">
                        <div className="inline-block mb-4">
                            <div className="px-4 py-2 rounded-full bg-gradient-to-r from-fuchsia-500/10 via-purple-500/10 to-blue-500/10 border border-white/10">
                                <span className="label text-gradient-accent flex items-center justify-center gap-2">
                                    <Sparkles className="w-4 h-4" />
                                    MAKE IT YOURS
                                </span>
                            </div>
                        </div>
                        <h3 className="heading-2 text-txt-primary mb-4">
                            Personalize &amp; sync
                        </h3>
                        <p className="body-lg text-txt-secondary max-w-2xl mx-auto">
                            Pick a theme, set your wallpaper, and bring your own API keys —
                            then keep it all in sync across every browser.
                        </p>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-4">
                        {customizationFeatures.map((feature, index) => (
                            <div
                                key={index}
                                className="group relative bg-gradient-to-br from-zinc-900/80 to-zinc-950/80 backdrop-blur-xl border border-white/5 rounded-2xl p-5 hover:border-white/20 transition-all duration-500 overflow-hidden"
                            >
                                <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500`} />
                                <div className="mb-4">{feature.visual}</div>
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

                    <p className="mt-6 caption text-txt-muted flex flex-wrap items-center justify-center gap-x-3 gap-y-2">
                        <span className="inline-flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-txt-success animate-pulse"></span>
                            100% Free Forever
                        </span>
                        <span className="hidden sm:inline">•</span>
                        <span>No Credit Card Required</span>
                        <span className="hidden sm:inline">•</span>
                        <span>Privacy First</span>
                        <span className="hidden sm:inline">•</span>
                        <span>Windows · Mac · Linux</span>
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
