// Single source of truth for per-site branding/content.
//
// One repo builds two sites, selected at build time via Vite `--mode`:
//   - mode "cooldesk" (default)  -> the full suite (browser + desktop)  cool-desk.com
//   - mode "newtab"              -> the browser extension / new-tab product
//                                   TODO: not deployed; newtab.kazekit.com is a placeholder.
//
// vite.config.ts injects `import.meta.env.VITE_SITE` from the mode.

export type SiteId = "cooldesk" | "newtab";

export const SITE_ID: SiteId =
  (import.meta.env.VITE_SITE as SiteId) === "newtab" ? "newtab" : "cooldesk";

const CHROME_STORE =
  "https://chromewebstore.google.com/detail/cooldesk/ioggffobciopdddacpclplkeodllhjko";

// Public source for the CoolDesk extension/app.
const GITHUB_REPO = "https://github.com/abhayraghuwanshi/cooldesk-extension";

const REDDIT_URL = "https://www.reddit.com/r/cooldesk/";

const COOLDESK_URL = "https://cool-desk.com";
// TODO: newtab product not deployed yet — placeholder domain until launch.
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
      title: "CoolDesk: Organize Tabs, Apps & Files by Project (Free)",
      description:
        "Free launcher and new-tab extension that keeps your tabs, apps, files and notes in spaces, one for each project. Press Alt+K to jump back into any space. Windows, macOS & Linux.",
    },
    hero: {
      badge: "Free & open source",
      headlineLead: "Don't open apps.",
      headlineAccent: "Open spaces.",
      sub: "CoolDesk is a free launcher for Windows, macOS and Linux, with a new-tab extension for Chrome, Edge and Brave. It keeps your browser tabs, desktop apps, files and notes in spaces, one for each project, and Alt+K jumps back into any of them.",
    },
    cta: {
      label: "Get Started",
      href: "#downloads",
    },
    downloads: {
      heading: "Download CoolDesk",
      blurb:
        "The extension is your new tab. The desktop app is the launcher: Spotlight, spaces and files.",
      desktop: true,
      tip: "Start with either one. Install both and they connect on your machine, so Spotlight can reach your browser tabs.",
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
      title: "CoolDesk New Tab — Organize Your Tabs into Spaces",
      description:
        "Replace your new tab with spaces: browser tabs, links and notes grouped by project, with AI Spotlight search. Free Chrome extension — no sign-in required.",
    },
    hero: {
      badge: "Free browser extension",
      headlineLead: "Your new tab.",
      headlineAccent: "Reimagined.",
      sub: "Keep your browser tabs, links and notes in spaces, one for each project, right in your new tab. Built for people who juggle projects all day.",
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

export { CHROME_STORE, GITHUB_REPO, REDDIT_URL };
