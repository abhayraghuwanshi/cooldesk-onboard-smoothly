# Decisions

Architecture and product decisions for CoolDesk, newest first.
Scope note: this file lives in the website repo but records decisions across the
CoolDesk product where they affect what the site claims.

## 2026-07-22 — Make the extension's new-tab override optional via a minimal mode

**Status:** accepted

**Context:** The extension hard-registers `chrome_url_overrides.newtab → extension.html`
(`manifest.json`) and ships under the store name "New Tab by Cooldesk". Chrome offers no
runtime API to toggle that override per user, so once installed the extension owns the new
tab until it is disabled or uninstalled. In this category "it hijacked my new tab" is a
leading cause of 1-star reviews and uninstalls. Separately, users comparing CoolDesk to
Raycast expect a launcher that works in the background without taking over a browser surface.

The product value — Alt+K Spotlight over tabs, history, bookmarks, tab groups, sessions,
files and running apps — comes from the extension's *permissions*, not from the override.
The two are separable; today they are coupled only for distribution reasons.

**Decision:** Add a user setting that renders the new tab as a minimal surface (search bar
only, or near-empty) instead of the full dashboard. The manifest override stays registered
and the full dashboard remains the default for new installs, preserving the Chrome Web Store
new-tab category as an acquisition channel. Users who want a true background launcher are
directed to the desktop app, which already provides global Alt+K, the dock, and running-apps
detection without touching the browser new tab.

Rejected alternatives:
- **Two store listings** (one with the override, one without) — splits install count,
  ratings and store ranking across two listings, and restarts social proof from zero.
- **Removing the override** — discards the primary organic discovery surface.

**Consequences:**
- Work lands in the extension repo (`C:/Users/raghu/projects/extension`), not this one.
  No new-tab mode setting exists there yet — no match in `src/data/windowsSettings.js` or
  `src/components/cooldesk/CoolDeskContainer.jsx` as of this date.
- The site can honestly market CoolDesk as a background launcher, which it previously
  could not. Versus-Raycast copy and the extension store listing should be revisited.
- Chrome's real new tab is still unreachable; "minimal" means our page rendered bare, not a
  restored Google new tab. Copy must not overclaim here.
- Does **not** resolve shared todo t4. That todo concerns this repo's `newtab` *website*
  build mode (the newtab.kazekit.com landing variant, `VITE_SITE`), which is a separate
  question from the extension's new-tab surface. The two are related only in that a
  background-capable extension changes what a dedicated landing variant would need to say.
