import { trackEvent, useSectionView } from '@/lib/analytics';
import { AppWindow, ArrowRight, ChevronDown, Code2, FileText, Folder, Globe, History, Layers, LayoutGrid, Link2, MousePointerClick, PanelBottom, Pin, RefreshCw, Search, StickyNote } from 'lucide-react';
import React from 'react';

type DemoKey = 'spotlight' | 'apps' | 'extension' | 'taskbar';

const DEMOS: Record<DemoKey, {
  tabLabel: string;
  tabIcon: React.ReactNode;
  /** Demo video — omitted for demos that render a live mockup instead. */
  src?: string;
  alt: string;
  chips: { icon: React.ReactNode; label: string }[];
}> = {
  spotlight: {
    tabLabel: 'Find',
    tabIcon: <Search className="w-4 h-4" />,
    src: '/gif/spotlight.mp4',
    alt: 'CoolDesk Spotlight — searching across tabs, files, apps and workspaces from anywhere',
    chips: [
      { icon: <Globe className="w-3.5 h-3.5" />, label: 'Every browser' },
      { icon: <LayoutGrid className="w-3.5 h-3.5" />, label: 'Tabs' },
      { icon: <FileText className="w-3.5 h-3.5" />, label: 'Files' },
      { icon: <Folder className="w-3.5 h-3.5" />, label: 'Folders' },
      { icon: <History className="w-3.5 h-3.5" />, label: 'History' },
      { icon: <StickyNote className="w-3.5 h-3.5" />, label: 'Notes' },
    ],
  },
  apps: {
    tabLabel: 'Launch',
    tabIcon: <AppWindow className="w-4 h-4" />,
    src: '/app-demo/app-demo.mp4',
    alt: 'CoolDesk — launching desktop apps straight from the new tab',
    chips: [
      { icon: <AppWindow className="w-3.5 h-3.5" />, label: 'Desktop apps' },
      { icon: <LayoutGrid className="w-3.5 h-3.5" />, label: 'New tab' },
      { icon: <ArrowRight className="w-3.5 h-3.5" />, label: 'One-click launch' },
    ],
  },
  extension: {
    tabLabel: 'Switch',
    tabIcon: <Layers className="w-4 h-4" />,
    src: '/gif/extension.mp4',
    alt: 'CoolDesk workspaces — switching projects with tabs, links and notes grouped in the new tab',
    chips: [
      { icon: <Layers className="w-3.5 h-3.5" />, label: 'Workspaces' },
      { icon: <LayoutGrid className="w-3.5 h-3.5" />, label: 'Tabs' },
      { icon: <Link2 className="w-3.5 h-3.5" />, label: 'Links' },
      { icon: <StickyNote className="w-3.5 h-3.5" />, label: 'Notes' },
    ],
  },
  taskbar: {
    tabLabel: 'Dock',
    tabIcon: <PanelBottom className="w-4 h-4" />,
    alt: 'CoolDesk project taskbar — a workspace docked to the screen edge with its links and apps as launchers',
    chips: [
      { icon: <Pin className="w-3.5 h-3.5" />, label: 'Pins to any screen edge' },
      { icon: <MousePointerClick className="w-3.5 h-3.5" />, label: 'One click opens or focuses' },
      { icon: <Layers className="w-3.5 h-3.5" />, label: 'Switch workspaces from the bar' },
      { icon: <ChevronDown className="w-3.5 h-3.5" />, label: 'Collapses to a slim handle' },
    ],
  },
};

// Fake workspace contents for the dock mockup — favicon-style link tiles + app tiles.
const DOCK_LINKS = [
  { letter: 'G', color: 'bg-emerald-500/80', active: true, label: 'GitHub — open in browser' },
  { letter: 'F', color: 'bg-purple-500/80', active: false, label: 'Figma' },
  { letter: 'J', color: 'bg-blue-500/80', active: true, label: 'Jira board — open in browser' },
  { letter: 'D', color: 'bg-amber-500/80', active: false, label: 'Docs' },
];

const DOCK_APPS = [
  { icon: <Code2 className="w-3.5 h-3.5" />, active: true, label: 'VS Code — running, click to focus' },
  { icon: <AppWindow className="w-3.5 h-3.5" />, active: false, label: 'Terminal' },
];

/** CSS mockup for the Dock demo — no screen recording of the taskbar exists yet. */
function DockDemo({ alt }: { alt: string }) {
  return (
    <div role="img" aria-label={alt} className="relative w-full aspect-video">
      {/* Fake wallpaper */}
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-950 via-zinc-950 to-black" />
      <div className="absolute top-[20%] left-[30%] w-[300px] h-[300px] bg-blue-600/10 rounded-full blur-[80px]" />

      {/* Fake app windows — the point: your work keeps the whole screen */}
      <div className="absolute top-[10%] left-[8%] w-[52%] h-[58%] rounded-lg bg-zinc-900/90 border border-white/10 shadow-xl">
        <div className="h-5 border-b border-white/5 flex items-center gap-1 px-2">
          <span className="w-1.5 h-1.5 rounded-full bg-red-500/60" />
          <span className="w-1.5 h-1.5 rounded-full bg-yellow-500/60" />
          <span className="w-1.5 h-1.5 rounded-full bg-green-500/60" />
        </div>
        <div className="p-3 space-y-1.5">
          <div className="h-1.5 w-3/4 rounded bg-cyan-500/25" />
          <div className="h-1.5 w-1/2 rounded bg-white/10" />
          <div className="h-1.5 w-2/3 rounded bg-white/10" />
          <div className="h-1.5 w-2/5 rounded bg-purple-500/25" />
        </div>
      </div>
      <div className="absolute top-[20%] right-[7%] w-[34%] h-[44%] rounded-lg bg-zinc-900/80 border border-white/10 shadow-xl">
        <div className="h-5 border-b border-white/5 flex items-center gap-1 px-2">
          <span className="w-1.5 h-1.5 rounded-full bg-red-500/60" />
          <span className="w-1.5 h-1.5 rounded-full bg-yellow-500/60" />
          <span className="w-1.5 h-1.5 rounded-full bg-green-500/60" />
        </div>
        <div className="p-3 space-y-1.5">
          <div className="h-1.5 w-2/3 rounded bg-white/10" />
          <div className="h-1.5 w-1/2 rounded bg-blue-500/25" />
        </div>
      </div>

      {/* The dock bar pinned to the bottom edge */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2">
        <div className="flex items-center gap-2 rounded-xl border border-white/15 bg-zinc-900/95 px-2 py-1.5 shadow-2xl shadow-black/60 backdrop-blur">
          {/* Workspace chip — click cycles workspaces in the real bar */}
          <div className="flex items-center gap-1.5 rounded-lg bg-white/[0.07] border border-white/10 px-2 py-1">
            <span className="w-2 h-2 rounded-full bg-gradient-to-br from-blue-400 to-purple-500" />
            <span className="text-[10px] font-semibold text-white/90 whitespace-nowrap">Client App</span>
            <RefreshCw className="w-2.5 h-2.5 text-white/40" />
          </div>

          {/* Link + app launchers */}
          <div className="flex items-center gap-1">
            {DOCK_LINKS.map((l) => (
              <div key={l.label} title={l.label} className="relative">
                <span className={`flex w-6 h-6 items-center justify-center rounded-md ${l.color} text-[10px] font-bold text-white`}>
                  {l.letter}
                </span>
                {l.active && (
                  <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-cyan-400" />
                )}
              </div>
            ))}
            <span className="mx-0.5 h-4 w-px bg-white/10" />
            {DOCK_APPS.map((a) => (
              <div key={a.label} title={a.label} className="relative">
                <span className="flex w-6 h-6 items-center justify-center rounded-md bg-white/[0.08] border border-white/10 text-white/80">
                  {a.icon}
                </span>
                {a.active && (
                  <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-cyan-400" />
                )}
              </div>
            ))}
          </div>

          {/* Collapse control */}
          <div className="flex items-center justify-center w-5 h-5 rounded-md text-white/40">
            <ChevronDown className="w-3 h-3" />
          </div>
        </div>
      </div>
    </div>
  );
}

const SHOWCASE_SECTION = "showcase_section";

function trackShowcaseCtaClick() {
  trackEvent("showcase_cta_click", {
    section: SHOWCASE_SECTION,
    action: "click",
    cta_label: "get_cooldesk_free",
    cta_target: "downloads_section",
  });
}

function trackShowcaseDemoSwitch(demo: DemoKey) {
  trackEvent("showcase_demo_switch", {
    section: SHOWCASE_SECTION,
    action: "switch",
    demo,
  });
}

export default function SwitchingSurface() {
  const [active, setActive] = React.useState<DemoKey>('spotlight');
  const demo = DEMOS[active];
  const sectionRef = useSectionView<HTMLElement>('spotlight');

  function selectDemo(key: DemoKey) {
    if (key === active) return;
    setActive(key);
    trackShowcaseDemoSwitch(key);
  }

  return (
    <section ref={sectionRef} className="relative overflow-hidden py-24 md:py-32">
      <div className="absolute inset-0 bg-gradient-to-b from-black via-zinc-950 to-black" />
      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 via-transparent to-purple-500/5" />
      <div className="absolute top-1/4 left-1/4 w-[400px] h-[400px] bg-blue-500/5 rounded-full blur-[150px]" />
      <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-purple-500/5 rounded-full blur-[150px]" />

      <div className="relative z-10 container mx-auto px-6">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-4xl md:text-5xl font-black text-white">
              A launcher and Spotlight for your projects
            </h2>


          </div>

          {/* Toggle */}
          <div className="flex justify-center mb-8">
            <div className="inline-flex items-center gap-1 rounded-full border border-white/15 bg-white/[0.04] p-1">
              {(Object.keys(DEMOS) as DemoKey[]).map((key) => (
                <button
                  key={key}
                  onClick={() => selectDemo(key)}
                  aria-pressed={active === key}
                  className={`inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-sm font-medium transition-all ${active === key
                    ? 'bg-white/10 text-white shadow-sm'
                    : 'text-white/50 hover:text-white/80'
                    }`}
                >
                  {DEMOS[key].tabIcon}
                  {DEMOS[key].tabLabel}
                </button>
              ))}
            </div>
          </div>

          {/* Demo — screen recording, or a live mockup for demos without one */}
          <div className="relative group w-full">
            <div className="absolute -inset-1 bg-gradient-to-r from-blue-500/30 to-purple-600/30 rounded-[20px] blur-xl opacity-60 group-hover:opacity-100 transition-opacity duration-700" />
            <div className="relative rounded-[20px] overflow-hidden border border-white/10 shadow-2xl bg-[#0A0A0A]">
              {demo.src ? (
                <video
                  key={demo.src}
                  src={demo.src}
                  autoPlay
                  muted
                  loop
                  playsInline
                  aria-label={demo.alt}
                  className="w-full h-auto"
                />
              ) : (
                <DockDemo alt={demo.alt} />
              )}
            </div>
          </div>

          {/* What the active demo does — compact chips */}
          <div className="mt-6 flex flex-wrap justify-center gap-2">
            {demo.chips.map((chip) => (
              <span
                key={chip.label}
                className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 text-xs font-medium text-white/60"
              >
                <span className="text-white/40">{chip.icon}</span>
                {chip.label}
              </span>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
