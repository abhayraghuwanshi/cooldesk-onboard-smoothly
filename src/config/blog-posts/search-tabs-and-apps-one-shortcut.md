# How to Search Browser Tabs and Desktop Apps From One Shortcut

Yes, you can search your open browser tabs and your desktop apps from a single shortcut. Here's how to set it up on Windows or Mac in about two minutes — and what your options are.

Most people run two separate search systems all day without noticing. One finds apps: the Start menu, Spotlight, or a launcher like PowerToys Run. The other finds web pages: the tab strip, `Ctrl+Shift+A` in Chrome, or scrolling through history. The thing you're looking for is usually in one of them — you just have to guess which before you start.

The fix is a launcher that treats tabs and apps as the same kind of result. Type "figma" and see the Figma desktop app, the Figma tab you have open, and the Figma file you visited yesterday, together.

## The short answer

1. Install a launcher that can see your browser — **CoolDesk** (free, Windows and Mac) is built for this.
2. Install its browser extension so it can see your open tabs, history and bookmarks.
3. Press one shortcut (**Alt+K** in CoolDesk) and search everything at once.

The rest of this guide walks through the setup and the alternatives.

## Why normal launchers can't see your tabs

Windows Search, macOS Spotlight and most launchers index things on your disk: apps, files, settings. Your browser tabs aren't on your disk — they live inside the browser's memory. To search them, a tool needs a way into the browser, which usually means a browser extension that reports what's open.

That's why "search my tabs and my apps together" is rare: it needs a desktop app *and* a browser extension that talk to each other.

## Setting it up with CoolDesk

**1. Install the desktop app.**
On Windows, run `winget install CoolDesk.CoolDesk` in a terminal, or [download the installer](/api/download). On a Mac, use the same download link or Homebrew.

**2. Install the browser extension.**
Add [New Tab by CoolDesk](/api/extension) from the Chrome Web Store. It works in Chrome and in Chromium-based browsers that accept Chrome Web Store extensions, like Edge and Brave. The extension and the desktop app connect to each other locally on your machine — nothing goes through a server.

**3. Press Alt+K.**
That's the default shortcut (you can change it in Settings). Start typing and you'll see, in one list:

- **Open tabs** — pick one and CoolDesk jumps to the tab that's already open instead of opening a duplicate
- **Installed apps** and **running windows** — switch to a window that's already open, or launch the app
- **History and bookmarks** — the page you read last week, without remembering where you saved it
- **Workspaces, notes and files** — anything you've grouped into a project

**4. Make it a habit.**
For a week, every time you reach for the Start menu, the Dock or the tab strip, press Alt+K instead. After a few days it becomes the only search you use.

## Tips that make it faster

- **Type fragments, not names.** Search is fuzzy, so "gh pr" finds the GitHub pull request tab, and "fig" finds Figma.
- **Use it to switch, not just to open.** Jumping to an already-open tab or window is where most of the time savings come from — no more scanning 30 tabs by favicon.
- **Group by project.** Once a project's tabs, apps and notes are in one workspace, searching the project name brings all of them up together.

## Other ways to do it

- **Fluent Search (Windows)** — a free, keyboard-first launcher that also searches browser tabs, plus files, windows and even text on screen. A strong choice if you want the broadest possible search on Windows.
- **Raycast** — on Mac, Raycast's browser extension adds tab search alongside your apps. The Windows version is still in beta.
- **Your browser's own tab search** — Chrome's `Ctrl+Shift+A` searches open and recently closed tabs, but only inside that browser, and not your apps.

Where CoolDesk is different: results are organized around your projects, so the same search box also brings back everything that belongs to the work you're doing — not just whatever matches the text. For a full comparison of launchers, see [Raycast Alternatives for Windows](/blog/raycast-alternatives-windows).

## FAQ

**Can Windows Search find my open browser tabs?**
No. Windows Search indexes apps, files and settings, but not the tabs open inside your browser. You need a launcher with a browser extension.

**Does this work with Firefox or Safari?**
CoolDesk's extension is for Chrome and Chromium-based browsers. Firefox and Safari aren't supported yet.

**Is my browsing data sent anywhere?**
Not with CoolDesk — the extension and desktop app talk locally on your machine, and everything is stored on your device.

**What if I don't want to install anything?**
Use your browser's built-in tab search for tabs, and the Start menu or Spotlight for apps. It works — it's just two searches instead of one.

**Try it:** [download CoolDesk](/api/download) and [add the extension](/api/extension), then press Alt+K.

Tags: search browser tabs, launcher, tab search, windows search, spotlight, productivity
