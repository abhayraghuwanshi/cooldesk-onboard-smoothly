import { useSectionView } from "@/lib/analytics";
import { useState } from "react";
import { Helmet } from "react-helmet-async";

interface FAQItem {
    q: string;
    a: string;
}

const items: FAQItem[] = [
    {
        q: "What is CoolDesk?",
        a: "CoolDesk is a free browser extension and desktop app that organizes your browser tabs, desktop apps, links, and notes into project workspaces on your new tab page. It's built for developers and builders who juggle multiple projects, replacing scattered tabs and windows with one organized workspace you can search instantly.",
    },
    {
        q: "How do I organize my browser tabs by project?",
        a: "To organize browser tabs by project, install CoolDesk and group related tabs, links, notes, and apps into a named workspace. Each project gets its own workspace on your new tab page, so you can switch context instantly instead of digging through dozens of open tabs. CoolDesk can also auto-group tabs by domain or use AI to cluster them into projects for you.",
    },
    {
        q: "Is CoolDesk a new tab extension?",
        a: "Yes, CoolDesk replaces your browser's new tab page with a project dashboard. Instead of a blank page, every new tab shows your project workspaces, recent activity, notes, and a spotlight search bar so your work is one click away.",
    },
    {
        q: "How is CoolDesk different from a regular tab manager?",
        a: "Unlike tab managers that only handle browser tabs, CoolDesk organizes your entire workflow — tabs, running desktop apps, saved links, notes, and AI chat history — all grouped by project. It also adds spotlight search across everything and an AI that automatically clusters your work into project groups.",
    },
    {
        q: "How do I search across all my tabs, apps, and notes at once?",
        a: "Press Alt+K to open GlobalSpotlight, CoolDesk's universal search bar. It instantly searches across your open tabs, browsing history, bookmarks, notes, project workspaces, and running desktop apps from one place — so you never lose track of where something is.",
    },
    {
        q: "Is CoolDesk free?",
        a: "Yes, CoolDesk is completely free with no subscription and no paywalled features. You get every feature — project workspaces, spotlight search, and AI organization — at no cost.",
    },
    {
        q: "Do I need an account or sign-in to use CoolDesk?",
        a: "No account or sign-in is required. Install CoolDesk and start using it immediately — your data stays local in your browser, with nothing sent to external servers unless you opt into cloud AI using your own API key.",
    },
    {
        q: "Where is my data stored, and is CoolDesk private?",
        a: "All your data is stored locally in your browser's IndexedDB and never leaves your device. CoolDesk runs no servers that store your tabs, history, or notes — the only exceptions are optional features you turn on yourself, like cloud AI (with your own API key) or end-to-end encrypted team sharing.",
    },
    {
        q: "What is the AI SmartWorkspace?",
        a: "AI SmartWorkspace reads your browser history, open tabs, and AI chat history (from ChatGPT, Claude, and others) and automatically groups them into project clusters. It organizes your digital workspace for you, running locally by default or with your own API key for cloud models — so no data leaves your device unless you choose.",
    },
    {
        q: "What does the CoolDesk desktop app add?",
        a: "The desktop app adds per-window app focus and surfaces all your running apps alongside your browser tabs. When you have several VS Code windows open, CoolDesk shows each one with its project name so you can jump straight to the right window — something Spotlight or Raycast can't do, since they only show the app, not each window.",
    },
    {
        q: "Can I share a project workspace with my team?",
        a: "Yes. CoolDesk's optional Spaces feature lets you share links, notes, and a shared project context with teammates. Sharing is peer-to-peer and end-to-end encrypted using a secret phrase — no account needed, and CoolDesk never stores your shared content on a server.",
    },
    {
        q: "Which browsers does CoolDesk support?",
        a: "CoolDesk works on Chrome, Brave, Edge, and other Chromium-based browsers. Firefox support is on the roadmap.",
    },
];

const Chevron = ({ open }: { open: boolean }) => (
    <svg
        className={`h-5 w-5 transition-transform duration-200 ${open ? "rotate-180" : "rotate-0"}`}
        viewBox="0 0 20 20"
        fill="currentColor"
        aria-hidden="true"
    >
        <path
            fillRule="evenodd"
            d="M5.23 7.21a.75.75 0 011.06.02L10 10.17l3.71-2.94a.75.75 0 11.92 1.18l-4.17 3.3a.75.75 0 01-.92 0l-4.17-3.3a.75.75 0 01-.04-1.06z"
            clipRule="evenodd"
        />
    </svg>
);

const faqStructuredData = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
        "@type": "Question",
        name: item.q,
        acceptedAnswer: {
            "@type": "Answer",
            text: item.a,
        },
    })),
};

export default function FAQ() {
    const [openIndex, setOpenIndex] = useState<number | null>(0);
    const sectionRef = useSectionView<HTMLDivElement>("faq");

    return (
        <div ref={sectionRef} id="faq" className="relative mx-auto max-w-6xl px-6 py-16 scroll-mt-20">
            <Helmet>
                <script type="application/ld+json">{JSON.stringify(faqStructuredData)}</script>
            </Helmet>
            {/* Dot Grid Pattern */}
            <div className="absolute inset-0 pointer-events-none" style={{
                backgroundImage: 'radial-gradient(circle, rgba(255, 255, 255, 0.05) 1px, transparent 1px)',
                backgroundSize: '40px 40px'
            }}></div>

            {/* Animated Gradient Mesh Orbs */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
                <div className="absolute top-[15%] left-[10%] w-[450px] h-[450px] bg-blue-500/8 rounded-full blur-[110px] animate-pulse-slow"></div>
                <div className="absolute bottom-[20%] right-[15%] w-[500px] h-[500px] bg-cyan-500/6 rounded-full blur-[120px] animate-pulse-slower"></div>
            </div>
            <div className="flex flex-col md:flex-row gap-12">
                {/* Left: FAQ Title */}
                <div className="md:w-1/3 flex items-start md:items-center">
                    <div className="flex items-center gap-4">
                        {/* <img
                            src="/help.png"
                            alt="Help"
                            className="w-16 h-16 md:w-20 md:h-20 object-contain"
                            width={200}
                            height={200}
                            loading="lazy"
                        /> */}
                        <h2 className="text-5xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-300">
                            FAQs
                        </h2>
                    </div>
                </div>

                {/* Right: FAQ List */}
                <div className="md:w-2/3 space-y-3">
                    {items.map((item, idx) => {
                        const isOpen = openIndex === idx;
                        return (
                            <div key={idx} className={`relative rounded-xl overflow-hidden transition-all duration-300 ${isOpen
                                ? 'bg-gradient-to-r from-blue-500/10 via-blue-600/5 to-transparent border-l-4 border-blue-400'
                                : 'bg-white/5 hover:bg-white/10 border-l-4 border-transparent'
                                }`}>
                                {/* Subtle glow effect for open items */}
                                {isOpen && (
                                    <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-transparent pointer-events-none" />
                                )}

                                <div className="relative">
                                    <button
                                        className="w-full flex items-center justify-between gap-6 px-6 py-5 text-left text-white focus:outline-none transition-all duration-200"
                                        aria-expanded={isOpen}
                                        aria-controls={`faq-panel-${idx}`}
                                        onClick={() => setOpenIndex(isOpen ? null : idx)}
                                    >
                                        <span className={`text-base md:text-lg font-semibold transition-colors duration-200 ${isOpen ? 'text-white' : 'text-gray-300'
                                            }`}>{item.q}</span>
                                        <span className={`transition-colors duration-200 flex-shrink-0 ${isOpen ? 'text-blue-400' : 'text-gray-500'
                                            }`}>
                                            <Chevron open={isOpen} />
                                        </span>
                                    </button>

                                    <div
                                        id={`faq-panel-${idx}`}
                                        role="region"
                                        aria-labelledby={`faq-header-${idx}`}
                                        className={`px-6 transition-[max-height,opacity] duration-300 ease-out ${isOpen ? "max-h-[32rem] opacity-100 pb-5" : "max-h-0 opacity-0 overflow-hidden"
                                            }`}
                                    >
                                        <p className="text-gray-400 text-sm md:text-base leading-relaxed">{item.a}</p>
                                    </div>
                                </div>
                            </div>
                        );
                    })}

                    <style>{`
                        @keyframes pulse-slow {
                            0%, 100% {
                                opacity: 0.8;
                                transform: scale(1);
                            }
                            50% {
                                opacity: 1;
                                transform: scale(1.05);
                            }
                        }

                        @keyframes pulse-slower {
                            0%, 100% {
                                opacity: 0.6;
                                transform: scale(1);
                            }
                            50% {
                                opacity: 0.9;
                                transform: scale(1.1);
                            }
                        }

                        .animate-pulse-slow {
                            animation: pulse-slow 8s ease-in-out infinite;
                        }

                        .animate-pulse-slower {
                            animation: pulse-slower 10s ease-in-out infinite;
                        }
                    `}</style>
                </div>
            </div>
        </div>
    );
}
