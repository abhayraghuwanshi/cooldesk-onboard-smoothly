import { AppWindow, ArrowRight, FileText, Folder, Globe, History, Layers, LayoutGrid, Link2, Search, StickyNote } from 'lucide-react';
import React from 'react';

type DemoKey = 'spotlight' | 'apps' | 'extension';

const DEMOS: Record<DemoKey, {
  tabLabel: string;
  tabIcon: React.ReactNode;
  caption: string;
  src: string;
  alt: string;
  chips: { icon: React.ReactNode; label: string }[];
}> = {
  spotlight: {
    tabLabel: 'Spotlight',
    tabIcon: <Search className="w-4 h-4" />,
    caption: 'Spotlight, in motion',
    src: '/gif/spotlight.gif',
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
    tabLabel: 'Apps',
    tabIcon: <AppWindow className="w-4 h-4" />,
    caption: 'Your apps, one launch away',
    src: '/app-demo/app-demo.gif',
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
    caption: 'Projects, grouped in your new tab',
    src: '/gif/extension.gif',
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
  const payload = {
    event_category: "engagement",
    section: SHOWCASE_SECTION,
    action: "click",
    cta_label: "get_cooldesk_free",
    cta_target: "downloads_section",
  };

  if (typeof window !== "undefined") {
    window.dataLayer = Array.isArray(window.dataLayer) ? window.dataLayer : [];

    if (typeof window.gtag === "function") {
      window.gtag("event", "showcase_cta_click", payload);
    }

    window.dataLayer.push({
      event: "showcase_cta_click",
      ...payload,
    });
  }

  if (import.meta.env.DEV) {
    console.log("[showcase_cta_click]", payload);
  }
}

function trackShowcaseDemoSwitch(demo: DemoKey) {
  const payload = {
    event_category: "engagement",
    section: SHOWCASE_SECTION,
    action: "switch",
    demo,
  };

  if (typeof window !== "undefined") {
    window.dataLayer = Array.isArray(window.dataLayer) ? window.dataLayer : [];

    if (typeof window.gtag === "function") {
      window.gtag("event", "showcase_demo_switch", payload);
    }

    window.dataLayer.push({
      event: "showcase_demo_switch",
      ...payload,
    });
  }

  if (import.meta.env.DEV) {
    console.log("[showcase_demo_switch]", payload);
  }
}

/**
 * One-shot product showcase — the extension in motion right before the
 * download section. A small toggle lets visitors see either Spotlight
 * search or desktop-app launching, so the value is felt before the
 * install ask. Only the active GIF is rendered (app-demo is large).
 */
export default function ExtensionShowcase() {
  const [active, setActive] = React.useState<DemoKey>('spotlight');
  const demo = DEMOS[active];

  function selectDemo(key: DemoKey) {
    if (key === active) return;
    setActive(key);
    trackShowcaseDemoSwitch(key);
  }

  return (
    <section className="relative overflow-hidden py-16 md:py-24">
      {/* Background base */}
      <div className="absolute inset-0 bg-black" />

      <div className="relative z-10 w-full container mx-auto px-6">
        {/* Caption + demo toggle */}
        <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <p className="text-xs font-semibold text-blue-400/80 uppercase tracking-widest font-mono">{demo.caption}</p>

          {/* Segmented control */}
          <div className="inline-flex items-center gap-1 rounded-full border border-white/15 bg-white/[0.04] p-1 self-start">
            {(Object.keys(DEMOS) as DemoKey[]).map((key) => (
              <button
                key={key}
                onClick={() => selectDemo(key)}
                aria-pressed={active === key}
                data-gtm-element="showcase-demo-toggle"
                data-gtm-action="switch"
                data-gtm-section={SHOWCASE_SECTION}
                data-gtm-target={key}
                className={`inline-flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-xs font-semibold transition-colors ${
                  active === key
                    ? 'bg-white/10 text-white'
                    : 'text-white/50 hover:text-white/80'
                }`}
              >
                {DEMOS[key].tabIcon}
                {DEMOS[key].tabLabel}
              </button>
            ))}
          </div>
        </div>

        {/* Capability chips */}
        <div className="mb-6 flex flex-wrap gap-2">
          {demo.chips.map((c) => (
            <span
              key={c.label}
              className="inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/[0.04] px-3 py-1.5 text-xs font-medium text-white/70"
            >
              <span className="text-blue-400">{c.icon}</span>
              {c.label}
            </span>
          ))}
        </div>

        {/* GIF preview — framed with the brand glow treatment */}
        <div className="relative group w-full">
          {/* Glow */}
          <div className="absolute -inset-1 bg-gradient-to-r from-blue-500/30 to-purple-600/30 rounded-[20px] blur-xl opacity-60 group-hover:opacity-100 transition-opacity duration-700" />
          <div className="relative rounded-[20px] overflow-hidden border border-white/10 shadow-2xl bg-[#0A0A0A]">
            <img
              key={demo.src}
              src={demo.src}
              alt={demo.alt}
              className="w-full h-auto"
              loading="lazy"
            />
          </div>
        </div>

        {/* CTA */}
        <div className="mt-8 flex justify-start">
          <a
            href="#downloads"
            onClick={trackShowcaseCtaClick}
            data-gtm-element="showcase-cta"
            data-gtm-action="click"
            data-gtm-section={SHOWCASE_SECTION}
            data-gtm-target="downloads_section"
            data-gtm-label="get_cooldesk_free"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-blue-400 hover:text-blue-300 transition-colors group"
          >
            Get CoolDesk free
            <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
          </a>
        </div>
      </div>
    </section>
  );
}
