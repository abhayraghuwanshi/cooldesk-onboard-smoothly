import { trackEvent, useSectionView } from '@/lib/analytics';
import { AppWindow, ArrowRight, FileText, Folder, Globe, History, Layers, LayoutGrid, Link2, Search, StickyNote } from 'lucide-react';
import React from 'react';

const WINGET_COMMAND = "winget install CoolDesk.CoolDesk";

type DemoKey = 'spotlight' | 'apps' | 'extension';

const DEMOS: Record<DemoKey, {
  tabLabel: string;
  tabIcon: React.ReactNode;
  src: string;
  alt: string;
  chips: { icon: React.ReactNode; label: string }[];
}> = {
  spotlight: {
    tabLabel: 'Spotlight',
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
    tabLabel: 'App',
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
    tabLabel: 'Extension',
    tabIcon: <Layers className="w-4 h-4" />,
    src: '/gif/extension.mp4',
    alt: 'CoolDesk browser extension — tabs, links and notes grouped by project in the new tab',
    chips: [
      { icon: <Layers className="w-3.5 h-3.5" />, label: 'Workspaces' },
      { icon: <LayoutGrid className="w-3.5 h-3.5" />, label: 'Tabs' },
      { icon: <Link2 className="w-3.5 h-3.5" />, label: 'Links' },
      { icon: <StickyNote className="w-3.5 h-3.5" />, label: 'Notes' },
    ],
  },
};

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
  const [copied, setCopied] = React.useState(false);
  function copyWinget() {
    navigator.clipboard.writeText(WINGET_COMMAND).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }

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
              Open Source Spotlight
            </h2>

            <div className="mb-8">
              <p className="text-xs text-white/30 mb-2 font-semibold uppercase tracking-widest">Or install via Winget</p>
              <button
                onClick={copyWinget}
                className="inline-flex items-center gap-3 px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all group"
              >
                <span className="font-mono text-sm text-white/70 group-hover:text-white/90 transition-colors">{WINGET_COMMAND}</span>
                <span className="shrink-0 text-xs font-semibold text-white/40 group-hover:text-white/70 transition-colors flex items-center gap-1">
                  {copied ? (
                    <>
                      <svg className="w-3.5 h-3.5 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-green-400">Copied</span>
                    </>
                  ) : (
                    <>
                      <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                      </svg>
                      Copy
                    </>
                  )}
                </span>
              </button>
            </div>

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

          {/* Video */}
          <div className="relative group w-full">
            <div className="absolute -inset-1 bg-gradient-to-r from-blue-500/30 to-purple-600/30 rounded-[20px] blur-xl opacity-60 group-hover:opacity-100 transition-opacity duration-700" />
            <div className="relative rounded-[20px] overflow-hidden border border-white/10 shadow-2xl bg-[#0A0A0A]">
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
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
