import { AppWindow, ArrowLeftRight, Container, FolderOpen, Layers, LayoutDashboard, Sparkles, Terminal } from 'lucide-react';
import { useState } from 'react';
import { AnthropicLogo, ChromeLogo, GeminiLogo, ObsidianLogo, OBSLogo, OpenAILogo, RedditLogo } from './SvgsLogos';

const DESKTOP_TOOLS = [
  { name: 'CoolDesk', icon: <LayoutDashboard className="w-5 h-5" />, bg: 'bg-blue-500/15 border-blue-500/25' },
  { name: 'Terminal', icon: <Terminal className="w-5 h-5 text-emerald-400" />, bg: 'bg-emerald-500/15 border-emerald-500/25' },
  { name: 'Obsidian', icon: <ObsidianLogo className="w-5 h-5" />, bg: 'bg-purple-500/15 border-purple-500/25' },
  { name: 'File Mgr', icon: <FolderOpen className="w-5 h-5 text-yellow-400" />, bg: 'bg-yellow-500/15 border-yellow-500/25' },
  { name: 'OBS', icon: <OBSLogo className="w-5 h-5" />, bg: 'bg-orange-500/15 border-orange-500/25' },
];

const WEB_TOOLS = [
  { name: 'Chrome', icon: <ChromeLogo className="w-5 h-5" />, bg: 'bg-blue-500/15 border-blue-500/25' },
  { name: 'ChatGPT', icon: <OpenAILogo className="w-5 h-5" />, bg: 'bg-emerald-500/15 border-emerald-500/25' },
  { name: 'Claude', icon: <AnthropicLogo className="w-5 h-5" />, bg: 'bg-amber-500/15 border-amber-500/25' },
  { name: 'Gemini', icon: <GeminiLogo className="w-5 h-5" />, bg: 'bg-blue-500/15 border-blue-500/25' },
  { name: 'Reddit', icon: <RedditLogo className="w-5 h-5" />, bg: 'bg-orange-500/15 border-orange-500/25' },
];

const PROJECT_LIST = [
  { name: 'k8sdiagrams', icon: <Container className="w-3.5 h-3.5" />, color: 'text-blue-300' },
  { name: 'laundry score', icon: <Sparkles className="w-3.5 h-3.5" />, color: 'text-emerald-300' },
  { name: 'CoolDesk', icon: <LayoutDashboard className="w-3.5 h-3.5" />, color: 'text-blue-300' },
  { name: 'obsidian', icon: <ObsidianLogo className="w-3.5 h-3.5" />, color: 'text-purple-300' },
  { name: 'reddit', icon: <RedditLogo className="w-3.5 h-3.5" />, color: 'text-orange-300' },
];

export default function SwitchingSurface() {
  // Auto-detect the visitor's platform so the desktop mockup matches their OS.
  const [os] = useState<'mac' | 'windows'>(() => {
    if (typeof navigator === 'undefined') return 'mac';
    const ua = `${navigator.userAgent} ${navigator.platform ?? ''}`.toLowerCase();
    return ua.includes('win') ? 'windows' : 'mac';
  });

  return (
    <>
      {/* Blog Post Intro — Full Screen */}
      <section className="relative overflow-hidden min-h-screen flex items-center justify-center py-16 md:py-24">
        <div className="absolute inset-0 bg-gradient-to-b from-black via-zinc-950 to-black" />
        <div className="absolute inset-0 bg-gradient-to-r from-red-500/5 via-transparent to-orange-500/5" />

        <div className="absolute top-[15%] left-[5%] w-[300px] h-[300px] bg-red-500/8 rounded-full blur-[120px] animate-float-slow" />
        <div className="absolute bottom-[15%] right-[5%] w-[320px] h-[320px] bg-orange-500/8 rounded-full blur-[140px] animate-float-slower" />

        <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.04) 1px, transparent 1px)', backgroundSize: '32px 32px' }} />

        <div className="relative z-10 w-full container mx-auto px-6">
          <div className="max-w-3xl mx-auto text-center">
            <p className="text-xs font-semibold text-red-400/80 uppercase tracking-widest mb-6 font-mono">The Problem</p>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-black text-white mb-8 leading-tight">
              Your work is scattered across everything
            </h1>
            <p className="text-lg md:text-xl text-gray-300 leading-relaxed mb-8 max-w-2xl mx-auto">
              Desktop apps buried in the dock, a browser drowning in tabs, projects spread everywhere — while docks, taskbars and full-screen windows quietly eat your screen. The day goes to hunting and switching instead of working.
            </p>

            {/* The cost — three pain points */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-12 mb-8">
              {/* Switching */}
              <div className="relative rounded-xl border border-white/15 overflow-hidden group bg-white/3 hover:border-white/25 transition-colors">
                <div className="relative p-4 flex flex-col items-center gap-3 text-center">
                  <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/15 flex items-center justify-center shrink-0">
                    <Layers className="w-5 h-5 text-amber-400" />
                  </div>
                  <div>
                    <p className="text-base font-bold text-white"><span className="text-amber-400">Constant</span> switching</p>
                    <p className="text-[10px] text-gray-500 mt-1">desktop, web &amp; virtual desktops</p>
                  </div>
                </div>
              </div>

              {/* Wasted screen space */}
              <div className="relative rounded-xl border border-white/15 overflow-hidden group bg-white/3 hover:border-white/25 transition-colors">
                <div className="relative p-4 flex flex-col items-center gap-3 text-center">
                  <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/15 flex items-center justify-center shrink-0">
                    <AppWindow className="w-5 h-5 text-rose-400" />
                  </div>
                  <div>
                    <p className="text-base font-bold text-white"><span className="text-rose-400">Wasted</span> screen space</p>
                    <p className="text-[10px] text-gray-500 mt-1">docks, taskbars &amp; full-screen chrome</p>
                  </div>
                </div>
              </div>

              {/* Refocus time */}
              <div className="relative rounded-xl border border-white/15 overflow-hidden group bg-white/3 hover:border-white/25 transition-colors">
                <div className="relative p-4 flex flex-col items-center gap-3 text-center">
                  <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/15 flex items-center justify-center shrink-0">
                    <ArrowLeftRight className="w-5 h-5 text-violet-400" />
                  </div>
                  <div>
                    <p className="text-base font-bold text-white"><span className="text-violet-400">Broken</span> focus</p>
                    <p className="text-[10px] text-gray-500 mt-1">every switch pulls you out of deep work</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-center gap-2 text-sm text-gray-500">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              Scroll to explore the scattered landscape
            </div>
          </div>
        </div>
      </section>

      {/* Main Problem Visualization Section  */}
    </>
  );
}

