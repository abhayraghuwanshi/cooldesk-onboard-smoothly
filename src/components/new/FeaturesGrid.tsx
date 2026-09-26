import { useSectionView } from '@/lib/analytics';
import { Link } from 'react-router-dom';
import { ArrowRight, Bot, LayoutGrid, Search, Share2, Sparkles, StickyNote } from 'lucide-react';

const POINTS = [
    {
        icon: Search,
        title: 'Search',
        desc: 'Alt+K finds any tab, app, file or note.',
    },
    {
        icon: Sparkles,
        title: 'Auto-organise',
        desc: 'Describe a project, AI groups your tabs into it.',
    },
    {
        icon: Bot,
        title: 'AI agent',
        desc: '/agent runs Claude Code, opencode or Codex locally.',
        featured: true,
    },
    {
        icon: Share2,
        title: 'Teams',
        desc: 'Sync spaces peer-to-peer with your team.',
    },
    {
        icon: StickyNote,
        title: 'Notes & todos',
        desc: 'Kept inside the project they belong to.',
    },
    {
        icon: LayoutGrid,
        title: 'Widgets',
        desc: 'Clocks, timers and dev tools on your new tab.',
    },
];


function FeaturesGrid() {
    const sectionRef = useSectionView<HTMLElement>('features');

    return (
        <section ref={sectionRef} className="relative text-white overflow-hidden">
            <div className="container mx-auto px-6">
                {/* What makes CoolDesk cool */}
                <div>

                    <div className="flex items-baseline justify-between gap-4 mb-8">
                        <h2 className="text-xs font-semibold uppercase tracking-[0.18em] text-white/40">
                            What makes CoolDesk cool
                        </h2>
                        <Link
                            to="/how-to-use"
                            className="group inline-flex items-center gap-1 text-xs font-semibold text-white/50 hover:text-white transition-colors"
                        >
                            How it works
                            <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
                        </Link>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        {POINTS.map((p) => (
                            <div
                                key={p.title}
                                className={`group relative rounded-2xl border p-5 transition-colors duration-300 ${p.featured
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

export default FeaturesGrid;
