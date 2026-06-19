import { AppWindow, ArrowRight, CheckCircle2, LayoutGrid, Search, Sparkles } from 'lucide-react';
import { useSectionView } from '@/lib/analytics';

/**
 * The Solution — answers the three pains raised in SwitchingSurface
 * (constant switching, wasted screen space, broken focus) with the
 * three core CoolDesk capabilities. Outcome-led copy, brand visuals.
 */
const SOLUTIONS = [
  {
    icon: <LayoutGrid className="w-5 h-5 text-blue-400" />,
    iconBg: 'bg-blue-500/15 border-blue-500/25',
    glow: 'from-blue-500/10',
    solves: 'Constant switching',
    solvesColor: 'text-amber-300/90 border-amber-500/25 bg-amber-500/10',
    title: 'Switch projects in seconds',
    desc: 'Each project gets its own new-tab workspace — tabs, links, notes and apps grouped together. Jump back in without hunting.',
  },
  {
    icon: <AppWindow className="w-5 h-5 text-emerald-400" />,
    iconBg: 'bg-emerald-500/15 border-emerald-500/25',
    glow: 'from-emerald-500/10',
    solves: 'Wasted screen space',
    solvesColor: 'text-rose-300/90 border-rose-500/25 bg-rose-500/10',
    title: 'Your new tab runs everything',
    desc: 'See and launch desktop apps — VS Code, Slack, Spotify — straight from the browser. No more digging through docks and taskbars.',
  },
  {
    icon: <Search className="w-5 h-5 text-purple-400" />,
    iconBg: 'bg-purple-500/15 border-purple-500/25',
    glow: 'from-purple-500/10',
    solves: 'Broken focus',
    solvesColor: 'text-violet-300/90 border-violet-500/25 bg-violet-500/10',
    title: 'Find anything, stay in flow',
    desc: 'One search across tabs, files, folders, apps and your workspaces — reaching your whole machine, not just the active window.',
  },
];

export default function SolutionSection() {
  const sectionRef = useSectionView<HTMLElement>('solution');

  return (
    <section ref={sectionRef} className="relative overflow-hidden py-16 md:py-24">
      {/* Background — clean and minimal */}
      <div className="absolute inset-0 bg-black" />
      <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/3 via-transparent to-blue-500/3" />

      <div className="relative z-10 w-full container mx-auto px-6">
        {/* Header */}
        <div className="mb-8 md:mb-10 max-w-2xl">
          <p className="text-xs font-semibold text-emerald-400/80 uppercase tracking-widest mb-2 font-mono">The Solution</p>
          <h2 className="heading-hero mb-3">One calm surface for all your projects</h2>
          <p className="body-lg max-w-md">
            CoolDesk groups your tabs, links, notes and running apps by project — in one new tab.
            The scattering stops, your screen comes back, and your focus stays put.
          </p>
        </div>

        {/* Solution cards — one per pain */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-5">
          {SOLUTIONS.map((s) => (
            <div key={s.title} className="relative rounded-xl border border-white/15 overflow-hidden group bg-white/3 hover:border-white/25 transition-colors">
              <div className="relative p-6 h-full flex flex-col">
                {/* Icon */}
                <div className={`w-10 h-10 rounded-xl border flex items-center justify-center mb-4 ${s.iconBg}`}>
                  {s.icon}
                </div>

                {/* Title + desc */}
                <h3 className="text-lg font-bold text-white mb-1.5">{s.title}</h3>
                <p className="text-[13px] text-gray-400 leading-relaxed flex-1">{s.desc}</p>

                {/* Explicit callback to the matching problem card */}
                <div className="mt-4 pt-3 border-t border-white/5 flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span className="text-[10px] text-gray-500">Solves</span>
                  <span className={`text-[10px] font-medium rounded-md border px-1.5 py-0.5 ${s.solvesColor}`}>{s.solves}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* AI footnote + CTA */}
        <div className="mt-7 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <p className="text-xs text-gray-500 flex items-center gap-2 max-w-md leading-relaxed">
            <Sparkles className="w-3.5 h-3.5 text-purple-400 shrink-0" />
            Plus an AI SmartWorkspace that auto-groups your history and AI chats by project.
          </p>
          <a
            href="#downloads"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-blue-400 hover:text-blue-300 transition-colors shrink-0 group"
          >
            Get CoolDesk free
            <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
          </a>
        </div>
      </div>
    </section>
  );
}
