# Raycast Alternatives for Windows (2026): An Honest List

Looking for a Raycast alternative on Windows? Here's an honest comparison of PowerToys Command Palette, Flow Launcher, Fluent Search, Listary, Keypirinha and CoolDesk — including what each one does better than the rest.

*Updated October 2026: added Fluent Search, the current state of Raycast for Windows, and a quick FAQ.*

Raycast is Mac royalty, and it earned it. But if you work on Windows, the story is different: Raycast's Windows version is still in beta, its extension ecosystem grew up on macOS, and meanwhile Windows has quietly built its own launcher tradition with some genuinely excellent tools.

Full disclosure before we start: **we make one of the tools on this list** (CoolDesk). Lists like this are usually thinly disguised ads, so we'll hold ourselves to a rule — for every tool, including ours, we say what it's genuinely best at *and* where another tool beats it. If we do our job right, you'll leave with the right launcher for you, even if it isn't ours.

## The short version

| Tool | Price | Open source | Best for |
| --- | --- | --- | --- |
| PowerToys Command Palette | Free | Yes | A solid official baseline from Microsoft |
| Flow Launcher | Free | Yes | The closest thing to Raycast's plugin culture on Windows |
| Fluent Search | Free (donationware) | Yes | Searching *everything* — apps, files, browser tabs, even text on screen |
| Listary | Free + Pro (one-time) | No | Deep file search, everywhere — even in file dialogs |
| Keypirinha | Free | No | Keyboard purists who configure everything in text files |
| CoolDesk | Free | Yes | Launching *and* switching between projects — apps, tabs, notes together |

## PowerToys Command Palette (Microsoft)

The successor to PowerToys Run, Command Palette is Microsoft's own take on the launcher — free, open source, and installed alongside the rest of the PowerToys suite.

**What it's best at:** being the safe default. It launches apps, does math, converts units, searches files, and it's maintained by Microsoft, so it will never be abandoned or start charging you. If you just want "Spotlight on Windows" with zero risk, start here.

**Where others beat it:** it's utilitarian by design. The extension ecosystem is younger and smaller than Flow Launcher's, the UI is functional rather than fast-feeling, and like every classic launcher it's stateless — it knows nothing about what you're working on.

## Flow Launcher

Flow Launcher is the community's launcher: open source, free, and with the largest plugin ecosystem on Windows — everything from Everything-powered file search to clipboard history, window switching, and developer utilities.

**What it's best at:** being Raycast-shaped. If what you loved about Raycast was the plugin culture — install a community extension for every tool you use — Flow is the closest Windows equivalent, and the Everything integration makes its file search extremely fast.

**Where others beat it:** it rewards tinkering and expects some. Plugin quality varies, setup takes an evening to get right, and out of the box it's less polished than Command Palette. Like the others, every search starts from zero.

## Fluent Search

Fluent Search is the tool people most often recommend when someone asks for "Raycast on Windows" — and it's easy to see why. It's free (donation-supported), keyboard-first, and searches far more than apps: files, open windows, browser tabs, history and bookmarks, and even text visible on your screen.

**What it's best at:** breadth of search. Its screen search lets you click buttons and links by typing instead of reaching for the mouse — something no other launcher here does — and its browser integration means tabs show up next to apps and files. If you want one search box that reaches into everything, start here.

**Where others beat it:** it's dense. There are a lot of settings and result types to tune, and the defaults can feel busy until you do. Its plugin ecosystem is smaller than Flow Launcher's, and like the rest of this list it searches what exists *now* — it doesn't remember which things belong to which project.

## Listary

Listary is the veteran of this list, and it has one killer feature nobody else has: it lives inside your file dialogs. Hit a key in any Open/Save dialog and Listary finds the folder you need instantly — a daily-pain fix that no other launcher touches.

**What it's best at:** files. If your day is spent navigating deep folder trees, opening and saving into project directories, Listary's find-as-you-type search (free version included) will save you more clicks than any launcher on this list.

**Where others beat it:** it's a file tool first and a launcher second. Commands, plugins, and app-launching exist but aren't the point, and the Pro license (one-time purchase) is where the best features live.

## Keypirinha

Keypirinha is the keyboard purist's choice: a tiny, portable, blazingly fast launcher configured entirely through text files.

**What it's best at:** speed and control. There is no UI to fight — you define exactly what it indexes and how it behaves, and it starts instantly from a USB stick if you want.

**Where others beat it:** everywhere that isn't speed and control. Configuration-by-text-file is a feature for its audience and a wall for everyone else, and development has slowed in recent years. Choose it if editing an INI file sounds fun, not if it sounds like work.

## CoolDesk (that's us)

CoolDesk is a free, open-source launcher for Windows and macOS with a different core idea: it's built around your **projects**, not just your apps.

**What it's best at:** context. Every other tool on this list is stateless — brilliant at opening things, but with no idea that *this* browser tab, *that* Figma file, and those three VS Code windows all belong to the same piece of work. CoolDesk groups tabs, apps, links and notes into project workspaces: press Alt+K to find anything, or switch projects and everything comes back exactly where you left it. Its browser extension also makes your open tabs, history and bookmarks first-class search results, grouped by the project they belong to. It's free, needs no account, and keeps all data on your device.

**Where others beat it:** maturity and breadth. We're the youngest tool here. Flow Launcher has a plugin for everything; we don't have a plugin store. Command Palette has Microsoft behind it; we're an indie project. Fluent Search's screen search has no equivalent in CoolDesk, and Listary's file-dialog integration is unique and we don't do it. And we don't have clipboard history or text expansion — if those are core to your workflow, pair CoolDesk with one of the tools above (they coexist happily; different hotkeys).

For a deeper head-to-head with Raycast itself, see [CoolDesk vs Raycast](/vs/raycast).

## What about Raycast for Windows?

It's real, and it's improving fast. Raycast opened a public beta for Windows in late 2025, and as of October 2026 it's still labelled beta. The core is there — the command palette, clipboard history, snippets, window management and AI commands all work — but the Windows extension store is a fraction of the size of the Mac one, and some Mac integrations have no Windows equivalent yet.

The pricing model is the same on both platforms: the launcher is free, and the best AI features, cloud sync and some extras sit behind a Pro subscription that covers Mac and Windows together.

**Our honest take:** if you're moving from a Mac and want the exact same muscle memory, install the beta and see how far it gets you. If you're Windows-first, the tools above are mature today, free, and built around how Windows works — no waiting required.

## Which one should you pick?

- **"I just want Spotlight for Windows, no fuss"** → PowerToys Command Palette
- **"I want plugins for everything, like Raycast had"** → Flow Launcher
- **"I want one search box for everything, even what's on screen"** → Fluent Search
- **"My pain is files and folders, all day"** → Listary
- **"I want maximum speed and I love config files"** → Keypirinha
- **"I juggle projects and lose time rebuilding context"** → [CoolDesk](/) — that's the exact problem it was built for

**Try CoolDesk free:** [download for Windows or Mac](/api/download) — no account, about a minute to set up. It runs happily alongside any of the tools above.

## Also worth knowing

- **Everything (voidtools)** — not a launcher, but the fastest file search on Windows. Flow Launcher and Fluent Search can both use it under the hood.
- **Wox** — the open-source launcher Flow Launcher was forked from. Still around, but Flow is where the active development moved.
- **Ueli** — a clean, simple, cross-platform launcher. A good pick if you want one tool on Windows *and* Mac without any setup.

## FAQ

**Is Raycast available on Windows?**
Yes, as a public beta since late 2025. It works, but it has far fewer extensions than the Mac version.

**What's the best free Raycast alternative for Windows?**
For plugins, Flow Launcher. For searching everything, Fluent Search. For the safest default, PowerToys Command Palette. For project-based work across apps and browser tabs, CoolDesk. All four are free.

**Is there a Raycast alternative that works on both Windows and Mac?**
CoolDesk and Ueli both run on Windows and macOS. Raycast itself now does too, with the Windows version still in beta.

**Can I run two launchers at once?**
Yes — just give them different hotkeys. A common setup is a launcher for apps and commands plus Listary or Everything for files.

Whichever you choose, the real upgrade is the habit: one keystroke instead of hunting through the Start menu and forty tabs. Every tool on this list delivers that. The differences are about what happens *after* the keystroke.

Want a macOS-style dock or a slide-out sidebar too? See [The Best Dock and Sidebar Apps for Windows](/blog/best-dock-apps-windows).

Tags: raycast alternative, windows launcher, app launcher, spotlight search, productivity
