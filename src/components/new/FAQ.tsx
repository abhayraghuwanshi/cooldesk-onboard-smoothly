import { useState } from "react";

interface FAQItem {
    q: string;
    a: string;
}

const items: FAQItem[] = [
    {
        q: "What is CoolDesk?",
        a: "CoolDesk is a lightweight browser enhancement that organizes your web life: Automatic Workspaces, Almighty Search, Pins & Cool Feed, Notes & To‑Do, Themes & UI, and even Voice Navigation.",
    },
    {
        q: "Is it free to install?",
        a: "Yes Free.",
    },
    {
        q: "Do I need any setup or account?",
        a: "No setup required.",
    },
    {
        q: "Where is my data stored?",
        a: "By default, your data is store in chrome indexdb safely encrypted.",
    },
    {
        q: "Which browsers are supported?",
        a: "Chromium-based browsers like Chrome and Edge are supported today. Firefox support is on the roadmap.",
    },
    {
        q: "What are the key features?",
        a: "Almighty Search across tabs, links, notes, and tasks; Pins & Cool Feed to keep important links in sight; Automatic Workspaces that group tabs by project; Notes & To‑Do for quick capture; Themes & UI customization; and Voice Navigation to control your browser hands‑free.",
    },
    {
        q: "What are the future goals for CoolDesk?",
        a: "Our goal is to make CoolDesk the ultimate productivity hub for your browser. We are working on deeper integrations with popular apps, AI-powered suggestions to streamline your workflow, and expanding to more platforms like Firefox. We aim to build a tool that not only organizes your digital life but also proactively helps you achieve your goals.",
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

export default function FAQ() {
    const [openIndex, setOpenIndex] = useState<number | null>(0);

    return (
        <div id="faq" className="relative mx-auto max-w-6xl px-6 py-16 scroll-mt-20">
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
