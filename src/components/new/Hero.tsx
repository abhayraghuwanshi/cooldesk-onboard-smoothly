import { useSectionView } from '@/lib/analytics';
import { Bot, LayoutGrid, PanelBottom, Search, Share2, Sparkles } from 'lucide-react';

const POINTS = [
    {
        icon: Search,
        title: 'Search',
        desc: 'One Alt+K spotlight across tabs, history, files, folders, apps and workspaces — reaching your whole machine, not just the active window.',
    },
    {
        icon: Sparkles,
        title: 'Auto-organise',
        desc: 'Create a project and CoolDesk fills it in — it learns from what you actually do and groups your tabs, links, notes and apps by project, automatically and entirely on your device.',
    },
    {
        icon: Bot,
        title: 'AI agent',
        desc: 'Type /agent in Spotlight to run Claude Code, opencode or Codex CLI on your machine — ask it to reorganise your workspaces and confirm each change before it applies.',
        featured: true,
    },
    {
        icon: Share2,
        title: 'Share',
        desc: 'Publish a curated workspace and hand it over as a link — a ready-made set of tabs and resources anyone can open.',
    },
    {
        icon: PanelBottom,
        title: 'Project taskbar',
        desc: 'Dock a workspace to the edge of your screen — its links and apps become a slim taskbar where one click opens anything, or brings it forward if it\'s already running.',
    },
    {
        icon: LayoutGrid,
        title: 'Widgets',
        desc: 'Clocks, todos, focus timers, dev tools — pick widgets from the store and arrange them on your new tab, with live data from the desktop bridge.',
    },
];

function Hero() {

    const sectionRef = useSectionView<HTMLElement>('hero');



    return (
        <section ref={sectionRef} id="home" className="relative text-white overflow-hidden isolate z-20 scroll-mt-20">

            <div className="absolute inset-0 z-0 bg-black" />
            <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/3 via-transparent to-blue-500/3" />

            <div className="relative z-20 w-full container mx-auto px-6 pt-28 pb-16 md:py-24">
                <div className="flex flex-col items-center text-center">

                    <div className="max-w-4xl">
                        <h1 className="text-4xl md:text-6xl font-black text-white mb-5 leading-[1.05]">
                            Launchers open apps.<br className="hidden sm:block" />
                            CoolDesk opens your work.
                        </h1>
                        <p className="text-base md:text-lg text-white/60 max-w-2xl mx-auto mb-8 leading-relaxed">
                            Press Alt+K to find any tab, app, file or note — or switch projects and get everything back exactly where you left it.
                        </p>

                        <div className="flex flex-wrap items-center justify-center gap-5 text-xs font-semibold text-white/40">
                            <span className="flex items-center gap-1.5">
                                <svg className="w-3.5 h-3.5 text-green-400" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                                </svg>
                                100% Free
                            </span>
                            <span className="flex items-center gap-1.5">
                                <svg className="w-3.5 h-3.5 text-green-400" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                                </svg>
                                No Sign-in Required
                            </span>
                            <span className="flex items-center gap-1.5">
                                <svg className="w-3.5 h-3.5 text-green-400" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                                </svg>
                                100% Local
                            </span>
                        </div>
                    </div>

                </div>

                {/* What makes CoolDesk cool */}
                <div className="mt-20 md:mt-28">

                    <h2 className="text-xs font-semibold uppercase tracking-[0.18em] text-white/40 mb-8">
                        What makes CoolDesk cool
                    </h2>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        {POINTS.map((p) => (
                            <div
                                key={p.title}
                                className={`group relative rounded-2xl border p-6 transition-colors duration-300 ${p.featured
                                    ? 'border-sky-400/30 bg-sky-400/[0.05] hover:border-sky-400/50 hover:bg-sky-400/[0.08]'
                                    : 'border-white/10 bg-white/[0.02] hover:border-white/20 hover:bg-white/[0.04]'
                                    }`}
                            >
                                <div
                                    className={`inline-flex items-center justify-center w-10 h-10 rounded-lg border mb-4 transition-colors duration-300 ${p.featured
                                        ? 'border-sky-400/40 bg-sky-400/10 text-sky-300'
                                        : 'border-white/10 bg-white/5 text-white/60 group-hover:text-sky-300 group-hover:border-sky-400/30'
                                        }`}
                                >
                                    <p.icon className="w-5 h-5" strokeWidth={1.75} />
                                </div>
                                <h3 className="text-base font-bold text-white mb-1.5 flex items-center gap-2">
                                    {p.title}
                                    {p.featured && (
                                        <span className="text-[9px] font-mono font-medium uppercase tracking-wider text-sky-300/90 border border-sky-400/30 rounded px-1.5 py-0.5">
                                            New
                                        </span>
                                    )}
                                </h3>
                                <p className="text-[13px] text-gray-400 leading-relaxed">{p.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

        </section>
    );
}

export default Hero;
