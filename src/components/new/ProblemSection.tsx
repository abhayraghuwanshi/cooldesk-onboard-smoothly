import { Slider } from '@/components/ui/slider';
import { useEffect, useRef, useState } from 'react';

type Platform = 'browser' | 'windows' | 'macos';

function AnimatedNumber({ value }: { value: number }) {
  const [display, setDisplay] = useState(0);
  const frameRef = useRef(0);

  useEffect(() => {
    const start = display;
    const diff = value - start;
    const duration = 600;
    const startTime = performance.now();

    const animate = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplay(Math.round(start + diff * eased));
      if (progress < 1) {
        frameRef.current = requestAnimationFrame(animate);
      }
    };

    frameRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frameRef.current);
  }, [value]);

  return <>{display}</>;
}

const DOCK_APPS = [
  { emoji: '🧭', name: 'Safari', color: 'from-sky-400 to-blue-600' },
  { emoji: '✉️', name: 'Mail', color: 'from-blue-400 to-blue-600' },
  { emoji: '📅', name: 'Calendar', color: 'from-rose-400 to-red-500' },
  { emoji: '📝', name: 'Notes', color: 'from-amber-300 to-yellow-500' },
  { emoji: '🎨', name: 'Figma', color: 'from-fuchsia-400 to-purple-600' },
  { emoji: '💻', name: 'VS Code', color: 'from-sky-500 to-blue-700' },
  { emoji: '⚡', name: 'Terminal', color: 'from-zinc-600 to-zinc-800' },
  { emoji: '🤖', name: 'ChatGPT', color: 'from-emerald-400 to-emerald-600' },
  { emoji: '💬', name: 'Slack', color: 'from-violet-400 to-purple-600' },
  { emoji: '🦊', name: 'Brave', color: 'from-orange-400 to-orange-600' },
  { emoji: '📊', name: 'Sheets', color: 'from-green-400 to-green-600' },
  { emoji: '🗂️', name: 'Finder', color: 'from-cyan-400 to-blue-500' },
  { emoji: '🎵', name: 'Music', color: 'from-pink-400 to-rose-500' },
  { emoji: '📷', name: 'Photos', color: 'from-indigo-400 to-violet-600' },
];

function ScatteredToolsDemo({ tabs, projects, platform }: { tabs: number; projects: number; platform: Platform }) {
  // How crowded the dock/taskbar/tab-bar gets is driven directly by the inputs.
  const appCount = Math.min(DOCK_APPS.length, Math.max(6, Math.round(projects * 1.5 + tabs / 10)));
  const apps = DOCK_APPS.slice(0, appCount);
  const [active, setActive] = useState(0);

  useEffect(() => {
    setActive(0);
    const t = setInterval(() => setActive((p) => (p + 1) % apps.length), 1400);
    return () => clearInterval(t);
  }, [apps.length]);

  const isMac = platform === 'macos';
  const isWin = platform === 'windows';
  const isBrowser = platform === 'browser';
  const tabCount = Math.min(tabs, 16);

  return (
    <div className="relative w-full h-48 rounded-lg border border-white/10 overflow-hidden">
      {/* Wallpaper */}
      <div className={`absolute inset-0 ${isWin ? 'bg-gradient-to-br from-blue-800 via-indigo-900 to-slate-950' : 'bg-gradient-to-br from-fuchsia-600 via-rose-500 to-orange-400'}`} />
      <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(circle at 25% 15%, rgba(255,255,255,0.30), transparent 45%)' }} />

      {/* Top label */}
      <div className="absolute top-2 left-2 right-2 flex items-center justify-between z-10">
        <span className="text-[9px] font-mono text-white/80 bg-black/30 px-2 py-0.5 rounded-md backdrop-blur-sm">
          {isMac ? 'macOS' : isWin ? 'Windows' : 'Browser'} · {apps.length} apps open
        </span>
        <span className="text-[9px] font-mono text-white/70 bg-black/30 px-2 py-0.5 rounded-md backdrop-blur-sm">{tabs} tabs · {projects} projects</span>
      </div>

      {/* Browser: tab overload */}
      {isBrowser && (
        <div className="absolute inset-x-3 top-10 z-10">
          <div className="flex gap-0.5 overflow-hidden">
            {Array.from({ length: tabCount }).map((_, i) => {
              const isActive = i === active % tabCount;
              return (
                <div
                  key={i}
                  className={`h-6 rounded-t-md shrink-0 flex items-center px-1.5 gap-1 transition-all duration-300 ${isActive ? 'bg-white/95 w-20' : 'bg-white/25 w-9'}`}
                >
                  <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${isActive ? 'bg-blue-500' : 'bg-white/60'}`} />
                  {isActive && <span className="text-[7px] text-zinc-700 truncate">project tab</span>}
                </div>
              );
            })}
          </div>
          <div className="h-7 rounded-b-md rounded-tr-md bg-white/15 border border-white/25 backdrop-blur-sm flex items-center px-2">
            <span className="text-[8px] text-white/80 font-mono truncate">🔍 {tabs} tabs across {projects} projects — which one was it again?</span>
          </div>
        </div>
      )}

      {/* macOS dock */}
      {isMac && (
        <div className="absolute bottom-2.5 left-1/2 -translate-x-1/2 z-10 max-w-[95%]">
          <div className="flex items-end gap-1 px-2 py-1.5 rounded-2xl bg-white/15 backdrop-blur-md border border-white/25 shadow-xl shadow-black/30">
            {apps.map((app, i) => {
              const isActive = i === active;
              return (
                <div key={app.name} className="relative flex flex-col items-center">
                  {isActive && (
                    <span className="absolute -top-5 text-[7px] text-white bg-black/70 px-1.5 py-0.5 rounded whitespace-nowrap">{app.name}</span>
                  )}
                  <div className={`w-7 h-7 rounded-[7px] bg-gradient-to-br ${app.color} flex items-center justify-center text-[13px] shadow-md transition-all duration-200 ${isActive ? '-translate-y-2.5 scale-125' : ''}`}>
                    {app.emoji}
                  </div>
                  <span className={`mt-0.5 w-1 h-1 rounded-full transition-colors ${isActive ? 'bg-white' : 'bg-transparent'}`} />
                </div>
              );
            })}
            <span className="self-stretch w-px bg-white/30 mx-0.5" />
            <div className="w-7 h-7 rounded-[7px] bg-gradient-to-br from-zinc-200 to-zinc-400 flex items-center justify-center text-[13px] shadow-md">🗑️</div>
          </div>
        </div>
      )}

      {/* Windows 11 taskbar */}
      {isWin && (
        <div className="absolute bottom-0 inset-x-0 h-9 bg-black/45 backdrop-blur-md border-t border-white/15 flex items-center justify-center gap-1.5 z-10">
          <div className="w-6 h-6 rounded flex items-center justify-center text-[13px] hover:bg-white/10 transition-colors">⊞</div>
          <div className="w-6 h-6 rounded bg-white/5 flex items-center justify-center text-[10px]">🔍</div>
          <span className="w-px h-5 bg-white/20 mx-0.5" />
          {apps.map((app, i) => {
            const isActive = i === active;
            return (
              <div key={app.name} className="relative flex items-center justify-center">
                <div className={`w-6 h-6 rounded bg-gradient-to-br ${app.color} flex items-center justify-center text-[11px] shadow transition-transform duration-200 ${isActive ? 'scale-110' : ''}`}>{app.emoji}</div>
                <span className={`absolute -bottom-1 h-[3px] rounded-full transition-all duration-300 ${isActive ? 'w-4 bg-sky-400' : 'w-1.5 bg-white/50'}`} />
              </div>
            );
          })}
          <span className="absolute right-2 text-[8px] text-white/70 font-mono leading-tight text-right">12:45<br />FEB 3</span>
        </div>
      )}
    </div>
  );
}

const INDEX_LEVELS = [
  { label: 'Optimal', range: [0, 20] as [number, number] },
  { label: 'Good', range: [21, 40] as [number, number] },
  { label: 'Moderate', range: [41, 60] as [number, number] },
  { label: 'Strained', range: [61, 80] as [number, number] },
  { label: 'Critical', range: [81, 100] as [number, number] },
];

const PLATFORM_CONFIG: Record<Platform, { label: string; icon: string; multiplier: number; features: string[] }> = {
  browser: { label: 'Browser', icon: '🖥', multiplier: 1.0, features: ['Browser Bridge', 'AI Workspaces', 'Spotlight'] },
  windows: { label: 'Windows', icon: '⊞', multiplier: 1.5, features: ['Browser Bridge', 'Desktop Bridge', 'AI Workspaces', 'Spotlight', 'Winget Install'] },
  macos: { label: 'macOS', icon: '🍎', multiplier: 1.5, features: ['Browser Bridge', 'Desktop Bridge', 'AI Workspaces', 'Spotlight', 'DMG Install'] },
};

function calcFocusIndex(tabs: number, projects: number, hours: number, platform: Platform) {
  const raw = (tabs * 0.4 + projects * 6 + hours * 1.5) * PLATFORM_CONFIG[platform].multiplier;
  return Math.min(100, Math.round(raw));
}

function calcTimeStats(tabs: number, projects: number, hours: number, platform: Platform) {
  const m = PLATFORM_CONFIG[platform].multiplier;
  const d = Math.round(((tabs / 5 + projects * 3) * (hours / 8) * 2) * m);
  return { yearlyLostHours: Math.round((d * 230) / 60), workDaysLost: Math.round((d * 230) / 60 / 8) };
}

const RESEARCH = [
  'Mark et al. — UC Irvine (2015)',
  'Microsoft Work Trend Index (2019)',
  'Newport — Deep Work (2016)',
];

function CircularGauge({ value, color, label, levelColor }: { value: number; color: string; label: string; levelColor: string }) {
  const r = 82;
  const circumference = 2 * Math.PI * r;
  const progress = Math.min(Math.max(value, 0), 100) / 100;
  const dashoffset = circumference * (1 - progress);

  return (
    <div className="relative mx-auto w-[208px] h-[208px]">
      <svg className="w-full h-full -rotate-90" viewBox="0 0 200 200">
        {/* Track */}
        <circle cx="100" cy="100" r={r} fill="none" stroke="rgba(255,255,255,0.07)" strokeWidth="13" />
        {/* Progress */}
        <circle
          cx="100"
          cy="100"
          r={r}
          fill="none"
          stroke={color}
          strokeWidth="13"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={dashoffset}
          style={{
            transition: 'stroke-dashoffset 0.7s cubic-bezier(0.16,1,0.3,1), stroke 0.5s ease-out',
            filter: `drop-shadow(0 0 8px ${color})`,
          }}
        />
      </svg>
      {/* Center readout */}
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <div className="flex items-baseline">
          <span className="text-6xl font-bold text-white leading-none tracking-tight">
            <AnimatedNumber value={value} />
          </span>
          <span className="text-sm font-mono text-gray-500 ml-1">/100</span>
        </div>
        <span className={`mt-3 px-3 py-1 rounded-full text-xs font-semibold ${levelColor}`}>{label}</span>
      </div>
    </div>
  );
}

export default function ProblemSection() {
  const [platform, setPlatform] = useState<Platform>('browser');
  const [tabs, setTabs] = useState([30]);
  const [projects, setProjects] = useState([4]);
  const [hours, setHours] = useState([8]);
  const [showSolution, setShowSolution] = useState(false);

  const index = calcFocusIndex(tabs[0], projects[0], hours[0], platform);
  const time = calcTimeStats(tabs[0], projects[0], hours[0], platform);
  const config = PLATFORM_CONFIG[platform];
  const level = INDEX_LEVELS.find((l) => index >= l.range[0] && index <= l.range[1]) ?? INDEX_LEVELS[4];

  const gaugeColor = index <= 20 ? '#22c55e' : index <= 40 ? '#14b8a6' : index <= 60 ? '#eab308' : index <= 80 ? '#f97316' : '#ef4444';
  const levelColor = level.label === 'Optimal' ? 'text-green-400 bg-green-500/10' :
    level.label === 'Good' ? 'text-teal-400 bg-teal-500/10' :
      level.label === 'Moderate' ? 'text-yellow-400 bg-yellow-500/10' :
        level.label === 'Strained' ? 'text-orange-400 bg-orange-500/10' :
          'text-red-400 bg-red-500/10';

  return (
    <section id="problem" className="relative overflow-hidden bg-black py-16 md:py-20">
      <div className="absolute inset-0">
        <div className="absolute top-[20%] left-[10%] w-[300px] h-[300px] bg-red-500/5 rounded-full blur-[100px] animate-float-slow" />
        <div className="absolute bottom-[20%] right-[10%] w-[400px] h-[400px] bg-orange-500/5 rounded-full blur-[120px] animate-float-slower" />
      </div>
      <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.04) 1px, transparent 1px)', backgroundSize: '32px 32px' }} />

      <div className="relative z-10 w-full container mx-auto px-6">
        {/* Header */}
        <div className="mb-8 md:mb-10">
          <p className="text-xs font-semibold text-red-400/80 uppercase tracking-widest mb-2 font-mono">RESEARCH-BACKED BENCHMARK</p>
          <h2 className="heading-hero">Your Focus Index</h2>
        </div>

        {/* Two columns on desktop */}
        <div className="grid md:grid-cols-5 gap-5 md:gap-6">
          {/* Left: Sliders */}
          <div className="md:col-span-3 space-y-5">
            {/* Platform selector */}
            <div className="flex items-center gap-2 pb-3 border-b border-white/10 mb-3">
              <p className="text-[10px] font-semibold text-gray-500 uppercase tracking-wider">Platform</p>
              <div className="flex items-center gap-2 ml-1">
                {(Object.keys(PLATFORM_CONFIG) as Platform[]).map((p) => {
                  const isActive = platform === p;
                  const cfg = PLATFORM_CONFIG[p];
                  return (
                    <button key={p} onClick={() => setPlatform(p)}
                      className={`group relative flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-semibold transition-all duration-300 ${isActive ? 'bg-blue-500/20 border border-blue-500/40 text-white shadow-sm shadow-blue-500/20' : 'bg-white/[0.03] border border-white/10 text-gray-400 hover:text-gray-300 hover:bg-white/10'
                        }`}>
                      <span className="text-base group-hover:scale-110 transition-transform duration-300">{cfg.icon}</span>
                      <span>{cfg.label}</span>
                      {isActive && <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />}
                      {isActive && (
                        <div className="absolute inset-0 rounded-lg bg-blue-400/10 animate-pulse-slow" />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Open Tabs</label>
                <span className="text-sm font-mono text-blue-400">{tabs[0]}</span>
              </div>
              <Slider value={tabs} onValueChange={setTabs} min={5} max={80} step={1}
                className="w-full" />
            </div>
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Active Projects</label>
                <span className="text-sm font-mono text-purple-400">{projects[0]}</span>
              </div>
              <Slider value={projects} onValueChange={setProjects} min={1} max={10} step={1}
                className="w-full" />
            </div>
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Hours/Day in Browser</label>
                <span className="text-sm font-mono text-emerald-400">{hours[0]}h</span>
              </div>
              <Slider value={hours} onValueChange={setHours} min={2} max={14} step={1}
                className="w-full" />
            </div>

            {/* Problem vs Solution: scattered today → unified with CoolDesk */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* CoolDesk Unified Solution Visualization */}
              <div className={`group relative rounded-xl border transition-all duration-300 p-4 ${showSolution ? 'border-green-500/50 bg-green-500/10' : 'border-green-500/20 bg-green-500/5 hover:border-green-500/40 hover:bg-green-500/10'}`}>
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-8 h-8 rounded-lg bg-green-500/20 flex items-center justify-center">
                    <svg className="w-4 h-4 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <p className="text-xs font-semibold text-green-400 uppercase tracking-wider font-mono">COOLDESK UNIFIED</p>
                </div>

                {/* Unified Solution Visualization */}
                <div className="mb-3 p-3 rounded-lg bg-black/40 border border-green-500/10">
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-[10px] text-gray-400 font-mono">With CoolDesk</p>
                    <div className="flex gap-1">
                      <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                      <div className="w-1.5 h-1.5 rounded-full bg-cyan-500 animate-pulse" style={{ animationDelay: '0.3s' }} />
                      <div className="w-1.5 h-1.5 rounded-full bg-purple-500 animate-pulse" style={{ animationDelay: '0.6s' }} />
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-2">
                    {/* Browser Bridge */}
                    <div className="p-2 rounded bg-green-500/10 border border-green-500/30 text-center relative">
                      <div className="text-base mb-1">🌐</div>
                      <div className="text-[9px] text-green-400">Browser Bridge</div>
                      <div className="text-xs font-bold text-green-300 mt-1">✓ Synced</div>
                      {showSolution && (
                        <div className="absolute -top-1 -right-1">
                          <svg className="w-3 h-3 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        </div>
                      )}
                    </div>
                    {/* Desktop Bridge */}
                    <div className="p-2 rounded bg-green-500/10 border border-green-500/30 text-center relative">
                      <div className="text-base mb-1">🖥️</div>
                      <div className="text-[9px] text-green-400">Desktop Bridge</div>
                      <div className="text-xs font-bold text-green-300 mt-1">{platform === 'windows' || platform === 'macos' ? '✓ Synced' : 'Ready'}</div>
                      {showSolution && (
                        <div className="absolute -top-1 -right-1">
                          <svg className="w-3 h-3 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        </div>
                      )}
                    </div>
                    {/* AI Hub */}
                    <div className="p-2 rounded bg-green-500/10 border border-green-500/30 text-center relative">
                      <div className="text-base mb-1">🤖</div>
                      <div className="text-[9px] text-green-400">AI Hub</div>
                      <div className="text-xs font-bold text-green-300 mt-1">✓ Unified</div>
                      {showSolution && (
                        <div className="absolute -top-1 -right-1">
                          <svg className="w-3 h-3 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="mt-2 text-[9px] text-green-400">
                    All tools unified • One workspace • AI-powered search
                  </div>
                </div>

                <p className="text-2xl font-bold text-white">
                  <span className="text-green-400">0</span><span className="text-xs text-gray-500 ml-1">hrs/yr</span>
                </p>
                {!showSolution ? (
                  <button onClick={() => setShowSolution(true)} className="text-xs text-green-400 hover:text-green-300 font-medium mt-3 flex items-center gap-1 group-hover:gap-2 transition-all">
                    See how it works
                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                ) : (
                  <div className="flex flex-wrap gap-2 mt-3">
                    {config.features.map((f) => (
                      <span key={f} className="text-[9px] font-medium text-green-400 bg-green-500/10 border border-green-500/30 px-2.5 py-1 rounded-full">{f}</span>
                    ))}
                  </div>
                )}
              </div>

              {/* Scattered Tools Visualization (current state) */}
              <div className="group relative rounded-xl border border-red-500/20 bg-red-500/5 p-4 transition-all duration-300 hover:border-red-500/40 hover:bg-red-500/10 h-full">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-8 h-8 rounded-lg bg-red-500/20 flex items-center justify-center">
                    <svg className="w-4 h-4 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <p className="text-xs font-semibold text-red-400 uppercase tracking-wider font-mono">SCATTERED TOOLS</p>
                </div>

                {/* Scattered Tools Visualization */}
                <div className="mb-3 p-3 rounded-lg bg-black/40 border border-red-500/10">
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-[10px] text-gray-400 font-mono">Current State</p>
                    <div className="flex gap-1">
                      <div className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
                      <div className="w-1.5 h-1.5 rounded-full bg-orange-500 animate-pulse" style={{ animationDelay: '0.3s' }} />
                      <div className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" style={{ animationDelay: '0.6s' }} />
                    </div>
                  </div>
                  <ScatteredToolsDemo tabs={tabs[0]} projects={projects[0]} platform={platform} />
                  <div className="mt-2 text-[9px] text-gray-600">
                    Tools are everywhere • No unified view • Context lost
                  </div>
                </div>

                <p className="text-2xl font-bold text-white">
                  <AnimatedNumber value={time.yearlyLostHours} /><span className="text-xs text-gray-500 ml-1">hrs/yr</span>
                </p>
                <p className="text-xs text-red-400 mt-1">
                  <AnimatedNumber value={time.workDaysLost} /> work days lost
                </p>
                <div className="mt-3 pt-3 border-t border-red-500/10">
                  <p className="text-[10px] text-gray-600">Without CoolDesk, productivity takes a serious hit.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Focus Index gauge */}
          <div className="md:col-span-2 rounded-xl border border-white/10 bg-white/[0.03] p-6 flex flex-col justify-center text-center relative overflow-hidden">
            {/* Background glow effect */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/5 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-500" />

            <p className="text-[10px] font-semibold text-gray-500 uppercase tracking-wider mb-5 font-mono relative z-10">FOCUS INDEX</p>

            <div className="relative z-10">
              <CircularGauge value={index} color={gaugeColor} label={level.label} levelColor={levelColor} />
            </div>

            {/* Scale legend */}
            <div className="flex items-center justify-center gap-4 text-[10px] text-gray-500 font-mono relative z-10 mt-5">
              <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-green-400" />Optimal</span>
              <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-yellow-400" />Moderate</span>
              <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-red-400" />Critical</span>
            </div>

            <div className="border-t border-white/10 mt-5 pt-3 relative z-10">
              <p className="text-[9px] text-gray-600 leading-relaxed">
                Benchmarked against {RESEARCH[0]}, {RESEARCH[1]}, {RESEARCH[2]}
              </p>
              <div className="mt-2 flex items-center justify-center gap-1">
                <div className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                <span className="text-[8px] text-gray-500">Live data</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
