# CoolDesk Website

Marketing and onboarding website for **CoolDesk**, a new-tab productivity extension for Chrome
that helps people organise their OS and projects. This repo is the public site served at
[cool-desk.com](https://cool-desk.com) — not the extension itself.

## What's here

A single Vite + React codebase that builds **two sites** selected by build mode:

- **`cooldesk`** (default) → cool-desk.com — the full product site.
- **`newtab`** → newtab.kazekit.com — a browser-extension landing variant (placeholder, not deployed).

The active site is exposed to the app as `import.meta.env.VITE_SITE`.

## Tech stack

- **Vite** (build + dev, port 8080)
- **React 18** + **TypeScript**, routed with **react-router-dom**
- **shadcn/ui** (Radix primitives) + **Tailwind CSS**
- **react-helmet-async** for per-page SEO (`src/components/SEO.tsx`)
- Deployed via **Firebase App Hosting** (backend `cooldesk-ui`, see `firebase.json`)

## Layout

- `src/pages/` — one file per route: Index, Pricing, HowToUse, Library, Gallery, Blog,
  Releases, WidgetStore, Versus, Founder, Contact, terms, NotFound.
- `src/components/` — shared UI (`ui/`, `new/`, `privacy/`, `SEO.tsx`).
- `src/config/` — site content as data: `site.ts`, `blogs.ts`, `blog-posts/`, `profiles.ts`,
  `spaces.ts`, `workspaces.ts`, `resources.tsx`. Edit copy/content here.
- `scripts/indexnow-submit.mjs` — pushes URLs to IndexNow for search indexing.

## Run it

```sh
npm install
npm run dev            # http://localhost:8080 (cool-desk.com site)
```

## Build & deploy

```sh
npm run build:cooldesk   # cool-desk.com (default `npm run build` also targets this)
npm run build:newtab     # newtab variant
npm run preview          # preview a production build locally
```

Deployment is Firebase App Hosting (`apphosting.yaml`, backend `cooldesk-ui`).

## Related

- Extension on the Chrome Web Store: https://chromewebstore.google.com/detail/new-tab-by-cooldesk-start/ioggffobciopdddacpclplkeodllhjko
- Repo: https://github.com/abhayraghuwanshi/cooldesk-onboard-smoothly
