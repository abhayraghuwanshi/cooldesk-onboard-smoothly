// Single source of truth for per-site branding/content.
//
// One repo builds two sites, selected at build time via Vite `--mode`:
//   - mode "cooldesk" (default)  -> the full suite (browser + desktop)
//   - mode "newtab"              -> the browser extension / new-tab product only
//
// vite.config.ts injects `import.meta.env.VITE_SITE` from the mode.

export type SiteId = "cooldesk" | "newtab";

export const SITE_ID: SiteId =
  (import.meta.env.VITE_SITE as SiteId) === "newtab" ? "newtab" : "cooldesk";

const CHROME_STORE =
  "https://chromewebstore.google.com/detail/cooldesk/ioggffobciopdddacpclplkeodllhjko";

const COOLDESK_URL = "https://cooldesk.kazekit.com";
const NEWTAB_URL = "https://newtab.kazekit.com";

interface SiteConfig {
  id: SiteId;
  /** Brand name shown in nav, footer, copy. */
  name: string;
  /** Canonical site URL (no trailing slash). */
  url: string;
  seo: {
    title: string;
    description: string;
  };
  hero: {
    badge: string;
    headlineLead: string;
    headlineAccent: string;
    sub: string;
  };
  /** Primary call-to-action (nav + hero button). */
  cta: {
    label: string;
    href: string;
  };
  downloads: {
    heading: string;
    blurb: string;
    /** Show the desktop (Windows/macOS/Linux) section + winget options. */
    desktop: boolean;
    tip: string;
  };
  /** Banner linking to the other product, or null to hide. */
  crossPromo: {
    text: string;
    linkLabel: string;
    href: string;
  } | null;
}

const configs: Record<SiteId, SiteConfig> = {
  cooldesk: {
    id: "cooldesk",
    name: "CoolDesk",
    url: COOLDESK_URL,
    seo: {
      title: "CoolDesk — Project Workspaces Across Your Browser & Desktop",
      description:
        "CoolDesk groups your tabs, desktop apps, links and notes by project — in one new tab. Free browser extension plus a desktop app with AI Spotlight across your native apps. No sign-in required.",
    },
    hero: {
      badge: "For builders and developers",
      headlineLead: "One bar. Full screen.",
      headlineAccent: "Everything where it belongs.",
      sub: "Summon one spotlight from anywhere. Your projects, tabs, apps and notes — full screen, no wasted pixels, all in their place.",
    },
    cta: {
      label: "Get Started",
      href: "#downloads",
    },
    downloads: {
      heading: "Download CoolDesk",
      blurb:
        "The extension handles tabs. The desktop app adds AI Spotlight across your native apps.",
      desktop: true,
      tip: "The extension works standalone — the desktop app is optional, for Spotlight across native apps.",
    },
    crossPromo: {
      text: "Just want the browser new tab?",
      linkLabel: "Get the extension",
      href: NEWTAB_URL,
    },
  },
  newtab: {
    id: "newtab",
    name: "CoolDesk New Tab",
    url: NEWTAB_URL,
    seo: {
      title: "CoolDesk New Tab — A Project Workspace for Your Browser",
      description:
        "Replace your new tab with a project workspace. Group browser tabs, links and notes by project, with AI Spotlight search. Free Chrome extension — no sign-in required.",
    },
    hero: {
      badge: "Free browser extension",
      headlineLead: "Your new tab.",
      headlineAccent: "Reimagined.",
      sub: "Group your browser tabs, links, and notes by project — right in your new tab. Built for people who juggle projects all day.",
    },
    cta: {
      label: "Add to Chrome",
      href: CHROME_STORE,
    },
    downloads: {
      heading: "Add CoolDesk to your browser",
      blurb: "Free for Chrome, Edge and Brave. No sign-in required.",
      desktop: false,
      tip: "Works standalone in your browser — install and start in seconds.",
    },
    crossPromo: {
      text: "Want your apps, files & AI Spotlight across your whole desktop?",
      linkLabel: "Get CoolDesk for desktop",
      href: COOLDESK_URL,
    },
  },
};

export const site = configs[SITE_ID];

export { CHROME_STORE };
