import { useState } from "react";
import { Helmet } from "react-helmet-async";

interface FAQItem {
    q: string;
    a: string;
}

const items: FAQItem[] = [
    {
        q: "What is CoolDesk?",
        a: "CoolDesk is a browser extension and desktop app built for developers and builders who juggle multiple projects. Instead of scattering your work across browser tabs, VS Code, Slack, and a notes app, CoolDesk groups everything — tabs, links, notes, files, and running apps — under one project workspace in your new tab.",
    },
    {
        q: "How is it different from a regular tab manager?",
        a: "Tab managers only handle tabs. CoolDesk organizes your entire OS and projects — tabs, running desktop apps, saved links, notes, files, and AI chat history — all grouped by project. It also has spotlight search across everything and an AI that automatically clusters your work into project groups.",
    },
    {
        q: "What is the AI SmartWorkspace?",
        a: "SmartWorkspace is an AI feature that reads your browser history, open tabs, and AI chat history (from ChatGPT, Claude, etc.) and automatically groups them into project clusters. It's like having someone organize your digital desk for you.",
    },
    {
        q: "Is it free to install?",
        a: "Yes, completely free. No subscription, no paywalled features.",
    },
    {
        q: "Do I need an account or sign-in?",
        a: "No account or sign-in required. Install and start immediately. Your data stays local in your browser's IndexedDB.",
    },
    {
        q: "Where is my data stored?",
        a: "Everything is stored locally in your browser's IndexedDB. Nothing is sent to external servers unless you use AI features that require an API key you provide.",
    },
    {
        q: "Which browsers are supported?",
        a: "Chrome, Brave, and Edge (all Chromium-based browsers). Firefox support is on the roadmap.",
    },
    {
        q: "What does the desktop app add?",
        a: "The desktop app unlocks per-window app focus. When you have multiple VS Code windows open, CoolDesk shows each one separately with its project name — so you click directly to the right window. Tools like Raycast or Spotlight only show the app, not each window. It also surfaces all your running apps alongside your browser tabs in one place.",
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

    return (
        <div id="faq" className="relative mx-auto max-w-6xl px-6 py-16 scroll-mt-20">
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
                        <img
                            src="/help.png"
                            alt="Help"
                            className="w-16 h-16 md:w-20 md:h-20 object-contain"
                        />
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
                                        className={`px-6 transition-[max-height,opacity] duration-300 ease-out ${isOpen ? "max-h-64 opacity-100 pb-5" : "max-h-0 opacity-0 overflow-hidden"
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
