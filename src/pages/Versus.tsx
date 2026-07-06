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
};

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

            <div className="relative z-10 container mx-auto px-6 pt-28 pb-24 max-w-4xl">
                {/* Intro */}
                <h1 className="text-4xl md:text-5xl font-black leading-tight mb-6">
                    CoolDesk vs {comparison.name}
                </h1>
                {comparison.intro.map((p, i) => (
                    <p key={i} className="text-base md:text-lg text-white/60 leading-relaxed mb-4 max-w-2xl">
                        {p}
                    </p>
                ))}

                {/* What they're great at */}
                <section className="mt-14">
                    <h2 className="text-2xl font-bold mb-5">What {comparison.name} does brilliantly</h2>
                    <ul className="space-y-2.5">
                        {comparison.greatAt.map((item, i) => (
                            <li key={i} className="flex gap-3 text-gray-400 leading-relaxed">
                                <span className="text-white/30 flex-shrink-0">•</span>
                                {item}
                            </li>
                        ))}
                    </ul>
                    <p className="mt-4 text-sm text-gray-500">
                        No point pretending otherwise — if these are what you need, {comparison.name} is excellent at them.
                    </p>
                </section>

                {/* Where CoolDesk is different */}
                <section className="mt-14">
                    <h2 className="text-2xl font-bold mb-6">Where CoolDesk is different</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        {comparison.differences.map((d) => (
                            <div key={d.title} className="rounded-xl border border-white/10 bg-white/[0.03] p-5">
                                <h3 className="text-base font-bold mb-1.5">{d.title}</h3>
                                <p className="text-sm text-gray-400 leading-relaxed">{d.desc}</p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Comparison table */}
                <section className="mt-14">
                    <h2 className="text-2xl font-bold mb-6">Side by side</h2>
                    <div className="overflow-x-auto rounded-xl border border-white/10">
                        <table className="w-full text-sm">
                            <thead>
                                <tr className="border-b border-white/10 text-left">
                                    <th className="px-4 py-3 font-semibold text-gray-400"></th>
                                    <th className="px-4 py-3 font-semibold text-white">{comparison.name}</th>
                                    <th className="px-4 py-3 font-semibold text-white">CoolDesk</th>
                                </tr>
                            </thead>
                            <tbody>
                                {comparison.table.map((row) => (
                                    <tr key={row.feature} className="border-b border-white/5 last:border-b-0">
                                        <td className="px-4 py-3 text-gray-400 whitespace-nowrap">{row.feature}</td>
                                        <td className="px-4 py-3 text-gray-300">{row.them}</td>
                                        <td className="px-4 py-3 text-gray-300">{row.us}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </section>

                {/* Choose which */}
                <section className="mt-14 grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="rounded-xl border border-white/10 bg-white/[0.03] p-6">
                        <h2 className="text-lg font-bold mb-4">Choose {comparison.name} if…</h2>
                        <ul className="space-y-2.5">
                            {comparison.chooseThem.map((item, i) => (
                                <li key={i} className="flex gap-3 text-sm text-gray-400 leading-relaxed">
                                    <span className="text-white/30 flex-shrink-0">•</span>
                                    {item}
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className="rounded-xl border border-white/10 bg-white/[0.03] p-6">
                        <h2 className="text-lg font-bold mb-4">Choose CoolDesk if…</h2>
                        <ul className="space-y-2.5">
                            {comparison.chooseUs.map((item, i) => (
                                <li key={i} className="flex gap-3 text-sm text-gray-400 leading-relaxed">
                                    <span className="text-white/30 flex-shrink-0">•</span>
                                    {item}
                                </li>
                            ))}
                        </ul>
                    </div>
                </section>

                {/* FAQ */}
                <section className="mt-14">
                    <h2 className="text-2xl font-bold mb-2">Common questions</h2>
                    {comparison.faq.map((item) => (
                        <div key={item.q} className="border-b border-white/10 py-5 last:border-b-0">
                            <h3 className="text-base font-semibold mb-1.5">{item.q}</h3>
                            <p className="text-sm text-gray-400 leading-relaxed">{item.a}</p>
                        </div>
                    ))}
                </section>

                {/* CTA */}
                <section className="mt-14 rounded-xl border border-white/10 bg-white/[0.03] p-8 text-center">
                    <h2 className="text-xl font-bold mb-2">Try it in two minutes</h2>
                    <p className="text-sm text-gray-400 mb-6 max-w-md mx-auto">
                        CoolDesk is free, needs no sign-in, and runs alongside {comparison.name} — nothing to migrate, nothing to lose.
                    </p>
                    <a
                        href="/#downloads"
                        className="inline-block rounded-full bg-white text-black font-semibold text-sm px-6 py-3 hover:bg-gray-200 transition-colors"
                    >
                        Get CoolDesk Free
                    </a>
                </section>
            </div>

            <Footer />
        </main>
    );
}
