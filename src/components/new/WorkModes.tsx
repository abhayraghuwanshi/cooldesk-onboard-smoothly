import { useSectionView } from '@/lib/analytics';
import { Maximize2, PanelBottom, PanelLeft } from 'lucide-react';
import React from 'react';

/**
 * Work in it — once a project exists, the desktop app shows it three ways.
 * Each mode takes a short screen recording; until one is set (`src`), the
 * card shows a placeholder frame instead.
 */

const MODES: {
  icon: React.ElementType;
  title: string;
  desc: string;
  src?: string;
  alt: string;
}[] = [
  {
    icon: PanelLeft,
    title: 'Sidebar',
    desc: 'Pin the project beside your browser or editor — its tabs, links and notes stay in reach while you work.',
    alt: 'CoolDesk sidebar mode — a project pinned to the side of the screen',
  },
  {
    icon: PanelBottom,
    title: 'Dock',
    desc: 'Dock a project to the screen edge as a slim taskbar — one click opens a link or app, or brings it forward if it\'s already running.',
    alt: 'CoolDesk dock mode — a project as a slim taskbar at the edge of the screen',
  },
  {
    icon: Maximize2,
    title: 'Full screen',
    desc: 'Open the whole workspace — every project, widget and note laid out on one screen.',
    alt: 'CoolDesk full screen mode — the full workspace with projects and widgets',
  },
];

function WorkModes() {
  const sectionRef = useSectionView<HTMLElement>('work_modes');

  return (
    <section ref={sectionRef} className="relative text-white">
      <div className="container mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <p className="text-[10px] font-mono font-medium text-txt-muted uppercase tracking-[0.25em] mb-3">
            02 · It stays with you
          </p>
          <h2 className="font-display text-2xl sm:text-3xl font-bold text-white tracking-tight">
            Your project, right where you're working
          </h2>
          <p className="text-sm text-txt-secondary mt-3">
            It isn't another window to go find. Keep it beside you as a sidebar,
            tucked into the edge of the screen as a dock, or open it full screen
            when you want the whole picture.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {MODES.map((mode) => (
            <div
              key={mode.title}
              className="group rounded-2xl border border-white/10 bg-white/[0.02] overflow-hidden transition-colors duration-300 hover:border-white/20"
            >
              <div className="relative aspect-video bg-[#0a0d13] border-b border-white/10">
                {mode.src ? (
                  <video
                    src={mode.src}
                    autoPlay
                    muted
                    loop
                    playsInline
                    aria-label={mode.alt}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 text-white/20">
                    <mode.icon className="w-10 h-10" strokeWidth={1.25} />
                    <span className="font-mono text-[9px] tracking-[0.2em] uppercase">Preview coming soon</span>
                  </div>
                )}
              </div>
              <div className="p-5">
                <h3 className="text-base font-bold text-white mb-1.5 flex items-center gap-2">
                  <mode.icon className="w-4 h-4 text-sky-300" strokeWidth={1.75} />
                  {mode.title}
                </h3>
                <p className="text-[13px] text-gray-400 leading-relaxed">{mode.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default WorkModes;
