import Footer from "@/components/new/Footer";
import Navbar from "@/components/new/Navbar";
import SEO from "@/components/SEO";
import { useParams } from "react-router-dom";
import NotFound from "./NotFound";

interface ComparisonRow {
    feature: string;
    them: string;
    us: string;
}

interface Comparison {
    name: string;
    title: string;
    description: string;
    intro: string[];
    greatAt: string[];
    differences: { title: string; desc: string }[];
    table: ComparisonRow[];
    chooseThem: string[];
    chooseUs: string[];
    faq: { q: string; a: string }[];
}

const comparisons: Record<string, Comparison> = {
    raycast: {
        name: "Raycast",
        title: "CoolDesk vs Raycast — An Honest Comparison",
        description:
            "Raycast is a brilliant command palette. CoolDesk is a launcher built around your projects — it remembers what you're working on. An honest comparison for Windows and Mac.",
        intro: [
            "Raycast and CoolDesk are both keyboard-first launchers: press a hotkey, type a few letters, jump. The difference is what they remember.",
            "Raycast is a command palette — stateless, endlessly extensible, superb at doing things fast. CoolDesk is built around your projects: it knows what you're working on, so one keystroke can bring a whole project back — tabs, apps, notes, everything where you left it.",
            "Searching for a Raycast alternative on Windows? That gap is exactly why CoolDesk exists — the honest comparison below should tell you quickly whether it fits.",
        ],
        greatAt: [
            "A huge extension store — community plugins for almost any tool you use",
            "Clipboard history, snippets and window management built in",
            "Deep macOS polish and scriptable workflows",
            "Raycast AI and cloud sync, if you're on the Pro plan",
        ],
        differences: [
            {
                title: "It remembers your projects",
                desc: "Every Raycast search starts from zero. CoolDesk groups tabs, apps, links and notes into workspaces — switch projects and everything comes back exactly where you left it.",
            },
            {
                title: "It searches inside your browser",
                desc: "Launchers treat the browser as one opaque app. CoolDesk's extension makes your open tabs, history and bookmarks first-class search results — across Chrome, Edge and Brave.",
            },
            {
                title: "Windows and macOS on equal footing",
                desc: "Raycast grew up on macOS; its Windows version is newer and still catching up. CoolDesk treats both platforms as first-class.",
            },
            {
                title: "Free, local, no account",
                desc: "CoolDesk stores everything on your device and never asks you to sign in. AI features are optional and run locally or with your own API key.",
            },
        ],
        table: [
            { feature: "Platforms", them: "macOS (Windows is newer)", us: "Windows + macOS" },
            { feature: "Price", them: "Free core · Pro subscription for AI & sync", us: "Free" },
            { feature: "Account required", them: "For Pro, AI and sync", us: "Never" },
            { feature: "Project workspaces", them: "—", us: "Core concept" },
            { feature: "Browser tabs, history & bookmarks", them: "Limited, via extensions", us: "Built in" },
            { feature: "Clipboard history & snippets", them: "Built in", us: "Not yet" },
            { feature: "Plugin ecosystem", them: "Thousands of extensions", us: "—" },
            { feature: "Your data", them: "Local + optional cloud sync", us: "100% local" },
        ],
        chooseThem: [
            "You live on macOS and want a scriptable command palette with a plugin for everything",
            "Clipboard history, snippets and window management in one tool matter to you",
            "You're happy paying a subscription for AI and cross-device sync",
        ],
        chooseUs: [
            "You juggle several projects and lose time rebuilding your context every switch",
            "You want your browser — tabs, history, bookmarks — searchable, not just your apps",
            "You work on Windows (or Windows and Mac) and want everything free and local",
        ],
        faq: [
            {
                q: "Can I use CoolDesk and Raycast together?",
                a: "Yes — they bind different hotkeys and do different jobs. Many people keep Raycast for commands and clipboard history, and use CoolDesk for project switching and browser-deep search.",
            },
            {
                q: "Is CoolDesk really free?",
                a: "Yes. CoolDesk is free with no account and no subscription. Your data stays on your device; optional AI features run locally or with your own API key.",
            },
            {
                q: "Does CoolDesk work on Windows?",
                a: "Yes — CoolDesk runs on Windows and macOS, with a browser extension for Chrome, Edge, Brave and other Chromium browsers.",
            },
        ],
    },
    alfred: {
        name: "Alfred",
        title: "CoolDesk vs Alfred — An Honest Comparison",
        description:
            "Alfred is a Mac classic with powerful workflows. CoolDesk is a free launcher for Windows and Mac, built around your projects. An honest comparison — including when to pick Alfred.",
        intro: [
            "Alfred has been the Mac power user's launcher for over a decade — fast, private, and endlessly automatable with Powerpack workflows.",
            "CoolDesk plays the same keyboard-first game with a different core idea: it's built around your projects. It groups tabs, apps, links and notes into workspaces, so one keystroke finds anything — or brings a whole project back. And it exists on Windows, where Alfred never has.",
            "If you're hunting for an Alfred alternative that runs on Windows — or one that remembers what you're working on — the honest comparison below should tell you quickly whether CoolDesk fits.",
        ],
        greatAt: [
            "A battle-tested macOS launcher with a decade of polish",
            "Powerpack workflows — deep, scriptable automation",
            "Clipboard history, snippets and text expansion",
            "A one-time license — no subscription",
        ],
        differences: [
            {
                title: "It exists on Windows",
                desc: "Alfred is macOS-only and always has been. CoolDesk runs on Windows and macOS, so your launcher habit works on both machines.",
            },
            {
                title: "It remembers your projects",
                desc: "Alfred searches start from zero every time. CoolDesk knows what you're working on — switch projects and your tabs, apps and notes come back exactly where you left them.",
            },
            {
                title: "It searches inside your browser",
                desc: "CoolDesk's extension makes open tabs, history and bookmarks first-class results across Chrome, Edge and Brave — territory launchers can't reach.",
            },
            {
                title: "Everything is free",
                desc: "Alfred's best features need the Powerpack. CoolDesk is free — workspaces, spotlight search, AI organization — with no account and all data local.",
            },
        ],
        table: [
            { feature: "Platforms", them: "macOS only", us: "Windows + macOS" },
            { feature: "Price", them: "Free basic · Powerpack (one-time) for power features", us: "Free" },
            { feature: "Project workspaces", them: "—", us: "Core concept" },
            { feature: "Browser tabs, history & bookmarks", them: "Limited, via workflows", us: "Built in" },
            { feature: "Workflows & automation", them: "Excellent (Powerpack)", us: "—" },
            { feature: "Clipboard history & snippets", them: "Powerpack", us: "Not yet" },
            { feature: "Your data", them: "Local", us: "100% local" },
        ],
        chooseThem: [
            "You're all-in on macOS and want deep, scriptable automation with workflows",
            "Clipboard history and text expansion are part of your daily muscle memory",
            "You prefer a one-time purchase from a long-established indie developer",
        ],
        chooseUs: [
            "You work on Windows — Alfred simply isn't an option there",
            "You juggle several projects and want each one's tabs, apps and notes one keystroke away",
            "You want browser-deep search and project switching, free, with no account",
        ],
        faq: [
            {
                q: "Is there an Alfred for Windows?",
                a: "No — Alfred is macOS-only. If you're looking for an Alfred-style launcher on Windows, CoolDesk is a free option built around project workspaces, with spotlight search across your apps, files, tabs and notes.",
            },
            {
                q: "Can CoolDesk replace Alfred?",
                a: "For launching, finding and switching between projects — yes. If you rely on Alfred's Powerpack workflows, clipboard history or text expansion, keep Alfred for those; the two run happily side by side.",
            },
            {
                q: "Is CoolDesk really free?",
                a: "Yes. CoolDesk is free with no account and no subscription. Your data stays on your device; optional AI features run locally or with your own API key.",
            },
        ],
    },
    workona: {
        name: "Workona",
        title: "CoolDesk vs Workona — An Honest Comparison",
        description:
            "Workona is the standard for browser workspaces — cloud-synced and team-ready. CoolDesk is a free, local-first project workspace that reaches beyond the browser to your apps, files and notes. An honest comparison.",
        intro: [
            "Workona practically defined the browser workspace category: spaces that hold your tabs, docs and tasks, auto-saved and synced to the cloud so a project is never lost.",
            "CoolDesk starts from the same frustration — juggling client and project contexts all day — but draws the boundary differently. Your work isn't only tabs. CoolDesk groups tabs, desktop apps, links, notes and files by project, and brings the whole working context back from one place. And everything stays on your device: no account, no cloud, free.",
            "If you're weighing the two — or searching for a free, local-first Workona alternative — the honest comparison below should settle it quickly.",
        ],
        greatAt: [
            "Auto-saving spaces — close the browser and every tab is exactly where you left it",
            "Cloud sync, so your spaces follow you to any computer",
            "Team features — shared spaces, resources and tasks for collaborative work",
            "A mature, battle-tested product with years of polish and Firefox support",
        ],
        differences: [
            {
                title: "It sees your whole desktop, not just tabs",
                desc: "Workona lives inside the browser. CoolDesk's desktop app brings running apps — VS Code, Slack, Spotify — and your files into the same project workspace and the same search bar.",
            },
            {
                title: "Local-first, no account",
                desc: "Workona stores your spaces in its cloud behind a sign-in. CoolDesk keeps everything on your device — nothing to sign up for, nothing uploaded.",
            },
            {
                title: "It's a launcher too",
                desc: "One spotlight searches open tabs, history, bookmarks, notes and running apps — and jumps you between projects. Workona organizes; CoolDesk also launches.",
            },
            {
                title: "Free, not freemium",
                desc: "Workona's free plan caps how many spaces you can keep. CoolDesk's workspaces, spotlight search and AI organization are free, with no cap and no upsell.",
            },
        ],
        table: [
            { feature: "Core idea", them: "Browser workspaces (tabs, docs, tasks)", us: "Project workspaces across tabs, apps, notes & files" },
            { feature: "Browsers", them: "Chrome, Edge, Firefox", us: "Chrome, Edge, Brave" },
            { feature: "Desktop apps & files", them: "—", us: "Searchable & launchable via desktop app" },
            { feature: "Account required", them: "Yes", us: "Never" },
            { feature: "Where your data lives", them: "Workona cloud", us: "100% local, on your device" },
            { feature: "Sync across devices", them: "Built in", us: "— (local by design)" },
            { feature: "Team collaboration", them: "Shared spaces & tasks", us: "—" },
            { feature: "Price", them: "Free (limited spaces) · paid plans", us: "Free" },
        ],
        chooseThem: [
            "Your whole workflow lives in the browser and you need it synced across several machines",
            "You collaborate in shared spaces with a team every day",
            "You use Firefox — CoolDesk currently supports Chromium browsers",
        ],
        chooseUs: [
            "Your projects span more than tabs — code editors, Slack, local files — and you want one place that brings all of it back",
            "You'd rather not keep your work context in someone else's cloud — no account, everything local",
            "You want project workspaces free, without a cap on how many you can keep",
        ],
        faq: [
            {
                q: "Is CoolDesk a free alternative to Workona?",
                a: "For organizing tabs, links and notes into project workspaces — yes, and it's free with no account. Be honest with yourself about the trade: CoolDesk doesn't do cloud sync or shared team spaces. If those are essential, Workona earns its subscription.",
            },
            {
                q: "Can CoolDesk bring back my project after a crash or restart?",
                a: "Yes — each workspace keeps its saved tabs and links, so you reopen the whole set in one click instead of digging through history. Because everything is stored locally, it works offline too.",
            },
            {
                q: "Which is better for switching between client projects?",
                a: "If a client means browser tabs only, both work well. If a client means tabs plus apps, files and notes, CoolDesk keeps them in one workspace and one search — that's the case it was built for.",
            },
        ],
    },
    toby: {
        name: "Toby",
        title: "CoolDesk vs Toby — An Honest Comparison",
        description:
            "Toby is a beloved visual tab organizer. CoolDesk is a free, local-first project workspace that adds desktop apps, files, notes and spotlight search. An honest comparison of the two new tabs.",
        intro: [
            "Toby turned the new tab into a visual home for your tabs: drag them into collections, reopen them anytime, share them with your team. It's simple, it's polished, and people love it.",
            "CoolDesk replaces the same new tab with a bigger idea of a project: not just tabs, but desktop apps, files, links and notes — grouped per project, searchable from one spotlight, and restored together when you switch. Everything stays local: no account, no cloud, free.",
            "Both tools want to own your new tab, so you'll end up picking one. The honest comparison below should make that choice quick.",
        ],
        greatAt: [
            "Dead-simple visual collections — drag a tab in, done",
            "Saving a whole session of open tabs into a collection in one click",
            "Team libraries: shared, curated collections of links for your whole team",
            "Years of maturity and a large community of daily users",
        ],
        differences: [
            {
                title: "Projects, not just link collections",
                desc: "Toby organizes tabs. CoolDesk workspaces hold tabs plus desktop apps, files and notes — the full working context of a client or project, not just its browser half.",
            },
            {
                title: "Search that reaches your whole machine",
                desc: "CoolDesk's spotlight searches open tabs, history, bookmarks, notes and running desktop apps — including things you never saved. Toby finds what you've filed into collections.",
            },
            {
                title: "Local-first, no sign-in",
                desc: "Toby syncs your collections through its cloud with an account. CoolDesk keeps everything on your device — nothing to create, nothing uploaded.",
            },
            {
                title: "Tab management before you save anything",
                desc: "Auto-group tabs by domain, sort them by activity, switch on focus mode — CoolDesk organizes the chaos you have now, not only the links you remember to file.",
            },
        ],
        table: [
            { feature: "Core idea", them: "Visual collections of saved tabs", us: "Project workspaces across tabs, apps, notes & files" },
            { feature: "New tab dashboard", them: "Yes", us: "Yes — workspaces, notes & search" },
            { feature: "Desktop apps & files", them: "—", us: "Searchable & launchable via desktop app" },
            { feature: "Spotlight launcher", them: "—", us: "Built in" },
            { feature: "Account required", them: "Yes (for sync)", us: "Never" },
            { feature: "Where your data lives", them: "Toby cloud", us: "100% local, on your device" },
            { feature: "Team sharing", them: "Team collections", us: "—" },
            { feature: "Price", them: "Free personal · paid team plans", us: "Free" },
        ],
        chooseThem: [
            "You want the simplest possible way to file tabs into visual collections",
            "Your team shares curated link libraries and that workflow matters to you",
            "You need your saved tabs synced across several computers",
        ],
        chooseUs: [
            "Switching projects means more than tabs — apps, files and notes should come back too",
            "You want to find things you never saved — history, running apps, any open tab — from one search bar",
            "You'd rather keep your work map on your own device, free, with no account",
        ],
        faq: [
            {
                q: "Is CoolDesk a good Toby alternative?",
                a: "If you use Toby to keep client or project tabs organized, CoolDesk covers that and adds desktop apps, files, notes and spotlight search — free, with no account. If your main use is sharing curated collections with a team, Toby still does that better.",
            },
            {
                q: "Can I use Toby and CoolDesk together?",
                a: "Not really — both replace your new tab, so in practice you choose one home base. You can keep Toby installed while you try CoolDesk, but only one of them can own the new tab page.",
            },
            {
                q: "Does CoolDesk need an account like Toby?",
                a: "No. CoolDesk works without any sign-in and stores everything locally on your device. Optional AI features run locally or with your own API key.",
            },
        ],
    },
};

/** Renders a table cell value; dims the "don't have it" dash. */
function CellValue({ value, us }: { value: string; us?: boolean }) {
    if (value === "—") {
        return <span className="text-white/15 select-none">—</span>;
    }
    return <span className={us ? "text-white" : "text-gray-400"}>{value}</span>;
}

export default function VersusPage() {
    const { slug } = useParams<{ slug: string }>();
    const comparison = slug ? comparisons[slug] : undefined;

    if (!comparison) {
        return <NotFound />;
    }

    const canonical = `https://cool-desk.com/vs/${slug}`;
    const faqJsonLd = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: comparison.faq.map((item) => ({
            "@type": "Question",
            name: item.q,
            acceptedAnswer: { "@type": "Answer", text: item.a },
        })),
    };

    const reveal = (i: number) => ({
        animationDelay: `${0.08 * i}s`,
        animationFillMode: "backwards" as const,
    });

    return (
        <main className="min-h-screen text-white scroll-smooth">
            <SEO
                title={comparison.title}
                description={comparison.description}
                canonical={canonical}
                jsonLd={faqJsonLd}
            />
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-transparent to-purple-600/10 pointer-events-none z-0" />
            <Navbar />

            {/* ── Fight-card hero ─────────────────────────────────── */}
            <header className="relative z-10 border-b border-white/10 bg-[linear-gradient(rgba(255,255,255,0.025)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.025)_1px,transparent_1px)] bg-[size:44px_44px]">
                <div className="container mx-auto px-6 pt-32 pb-14 max-w-4xl">
                    <p className="font-mono text-[11px] tracking-[0.25em] text-white/35 uppercase mb-8 animate-slide-up" style={reveal(0)}>
                        Head-to-head · cool-desk.com
                    </p>

                    <h1 className="animate-slide-up" style={reveal(1)}>
                        <span className="block text-5xl md:text-7xl font-black leading-none tracking-tight">
                            CoolDesk
                        </span>
                        <span className="flex items-center gap-5 my-3 md:my-4">
                            <span
                                aria-hidden="true"
                                className="text-4xl md:text-6xl font-black leading-none text-transparent select-none"
                                style={{ WebkitTextStroke: "1.5px rgba(255,255,255,0.3)" }}
                            >
                                VS
                            </span>
                            <span aria-hidden="true" className="h-px flex-1 bg-white/15" />
                        </span>
                        <span className="block text-5xl md:text-7xl font-black leading-none tracking-tight text-white/40">
                            {comparison.name}
                        </span>
                    </h1>

                    <p className="mt-10 text-lg md:text-xl text-white/70 leading-relaxed max-w-2xl animate-slide-up" style={reveal(2)}>
                        {comparison.intro[0]}
                    </p>
                    {comparison.intro.slice(1).map((p, i) => (
                        <p key={i} className="mt-4 text-sm md:text-base text-white/45 leading-relaxed max-w-2xl animate-slide-up" style={reveal(3 + i)}>
                            {p}
                        </p>
                    ))}
                </div>
            </header>

            <div className="relative z-10 container mx-auto px-6 pb-24 max-w-4xl">
                {/* ── 01 · The short answer ───────────────────────── */}
                <section className="mt-16">
                    <p className="font-mono text-[11px] tracking-[0.25em] text-white/35 uppercase mb-3">01 · The short answer</p>
                    <h2 className="text-2xl md:text-3xl font-bold mb-8">Skip the reading — which one is for you?</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-px rounded-xl overflow-hidden border border-white/10 bg-white/10">
                        <div className="bg-[#0b0b0e] p-6 md:p-7">
                            <h3 className="font-mono text-xs tracking-[0.2em] uppercase text-white/40 mb-5">
                                Pick {comparison.name} if…
                            </h3>
                            <ul className="space-y-3.5">
                                {comparison.chooseThem.map((item, i) => (
                                    <li key={i} className="flex gap-3 text-sm text-gray-400 leading-relaxed">
                                        <span aria-hidden="true" className="font-mono text-white/25 flex-shrink-0 pt-px">→</span>
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className="bg-[#0b0b0e] p-6 md:p-7 md:border-l-2 md:border-l-blue-400/40">
                            <h3 className="font-mono text-xs tracking-[0.2em] uppercase text-blue-300/80 mb-5">
                                Pick CoolDesk if…
                            </h3>
                            <ul className="space-y-3.5">
                                {comparison.chooseUs.map((item, i) => (
                                    <li key={i} className="flex gap-3 text-sm text-gray-200 leading-relaxed">
                                        <span aria-hidden="true" className="font-mono text-blue-300/70 flex-shrink-0 pt-px">→</span>
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </section>

                {/* ── 02 · Where CoolDesk is different ────────────── */}
                <section className="mt-20">
                    <p className="font-mono text-[11px] tracking-[0.25em] text-white/35 uppercase mb-3">02 · The difference</p>
                    <h2 className="text-2xl md:text-3xl font-bold mb-8">Where CoolDesk pulls ahead</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                        {comparison.differences.map((d, i) => (
                            <div
                                key={d.title}
                                className="group relative rounded-xl border border-white/10 bg-white/[0.03] p-6 pt-5 transition-colors hover:border-blue-400/30 hover:bg-white/[0.05]"
                            >
                                <span
                                    aria-hidden="true"
                                    className="font-mono text-3xl font-bold text-white/[0.08] transition-colors group-hover:text-blue-400/25"
                                >
                                    {String(i + 1).padStart(2, "0")}
                                </span>
                                <h3 className="text-base font-bold mt-2 mb-2">{d.title}</h3>
                                <p className="text-sm text-gray-400 leading-relaxed">{d.desc}</p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* ── 03 · Scoreboard ─────────────────────────────── */}
                <section className="mt-20">
                    <p className="font-mono text-[11px] tracking-[0.25em] text-white/35 uppercase mb-3">03 · The scoreboard</p>
                    <h2 className="text-2xl md:text-3xl font-bold mb-8">Side by side</h2>
                    <div className="overflow-x-auto rounded-xl border border-white/10">
                        <table className="w-full text-sm">
                            <thead>
                                <tr className="border-b border-white/10 text-left bg-white/[0.03]">
                                    <th className="px-5 py-4 font-mono text-[11px] tracking-[0.2em] uppercase text-white/35 font-medium"></th>
                                    <th className="px-5 py-4 font-bold text-white/50">{comparison.name}</th>
                                    <th className="px-5 py-4 font-bold text-white border-l-2 border-l-blue-400/40 bg-blue-400/[0.06]">
                                        CoolDesk
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {comparison.table.map((row) => (
                                    <tr key={row.feature} className="border-b border-white/5 last:border-b-0 transition-colors hover:bg-white/[0.02]">
                                        <td className="px-5 py-3.5 text-gray-500 whitespace-nowrap font-medium">{row.feature}</td>
                                        <td className="px-5 py-3.5"><CellValue value={row.them} /></td>
                                        <td className="px-5 py-3.5 border-l-2 border-l-blue-400/40 bg-blue-400/[0.06]">
                                            <CellValue value={row.us} us />
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </section>

                {/* ── 04 · Credit where it's due ──────────────────── */}
                <section className="mt-20">
                    <p className="font-mono text-[11px] tracking-[0.25em] text-white/35 uppercase mb-3">04 · Credit where it's due</p>
                    <h2 className="text-2xl md:text-3xl font-bold mb-8">What {comparison.name} does brilliantly</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-3.5">
                        {comparison.greatAt.map((item, i) => (
                            <div key={i} className="flex gap-3 text-sm text-gray-400 leading-relaxed">
                                <span aria-hidden="true" className="text-white/30 flex-shrink-0 pt-px">✓</span>
                                {item}
                            </div>
                        ))}
                    </div>
                    <p className="mt-6 text-sm text-gray-500 border-l-2 border-white/15 pl-4">
                        No point pretending otherwise — if these are what you need, {comparison.name} is excellent at them.
                    </p>
                </section>

                {/* ── 05 · FAQ ────────────────────────────────────── */}
                <section className="mt-20">
                    <p className="font-mono text-[11px] tracking-[0.25em] text-white/35 uppercase mb-3">05 · Common questions</p>
                    <h2 className="text-2xl md:text-3xl font-bold mb-4">Still deciding?</h2>
                    {comparison.faq.map((item) => (
                        <div key={item.q} className="border-b border-white/10 py-6 last:border-b-0">
                            <h3 className="text-base font-semibold mb-2">{item.q}</h3>
                            <p className="text-sm text-gray-400 leading-relaxed max-w-2xl">{item.a}</p>
                        </div>
                    ))}
                </section>

                {/* ── CTA ─────────────────────────────────────────── */}
                <section className="mt-20 rounded-xl border border-white/10 bg-[linear-gradient(rgba(255,255,255,0.025)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.025)_1px,transparent_1px)] bg-[size:32px_32px] p-10 text-center">
                    <p className="font-mono text-[11px] tracking-[0.25em] text-white/35 uppercase mb-3">Round over</p>
                    <h2 className="text-2xl md:text-3xl font-bold mb-3">Try it in two minutes</h2>
                    <p className="text-sm text-gray-400 mb-7 max-w-md mx-auto leading-relaxed">
                        CoolDesk is free, needs no sign-in, and runs alongside {comparison.name} — nothing to migrate, nothing to lose.
                    </p>
                    <a
                        href="/#downloads"
                        className="inline-block rounded-full bg-white text-black font-semibold text-sm px-7 py-3 hover:bg-gray-200 transition-colors"
                    >
                        Get CoolDesk Free
                    </a>
                </section>
            </div>

            <Footer />
        </main>
    );
}
