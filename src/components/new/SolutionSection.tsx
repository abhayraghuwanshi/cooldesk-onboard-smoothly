import { ArrowRight, Sparkles } from 'lucide-react';
import { useSectionView } from '@/lib/analytics';

/**
 * The Solution — answers the three pains raised in SwitchingSurface
 * (constant switching, wasted screen space, broken focus) with the
 * three core CoolDesk capabilities. Outcome-led copy, brand visuals.
 */
const SOLUTIONS = [
  {
    title: 'Switch projects in seconds',
    desc: 'Each project gets its own new tab — tabs, links, notes and apps in one place.',
  },
  {
    title: 'Your new tab runs everything',
    desc: 'Launch desktop apps — VS Code, Slack, Spotify — straight from the browser.',
  },
  {
    title: 'Find anything, stay in flow',
    desc: 'One search across tabs, files, apps and workspaces — your whole machine, not just this window.',
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
          </p>
        </div>

        {/* Solution cards — one per pain */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-5">
          {SOLUTIONS.map((s) => (
            <div key={s.title} className="relative rounded-xl border border-white/15 overflow-hidden group bg-white/3 hover:border-white/25 transition-colors">
              <div className="relative p-6 h-full flex flex-col">
                {/* Title + desc */}
                <h3 className="text-lg font-bold text-white mb-1.5">{s.title}</h3>
                <p className="text-[13px] text-gray-400 leading-relaxed flex-1">{s.desc}</p>
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
