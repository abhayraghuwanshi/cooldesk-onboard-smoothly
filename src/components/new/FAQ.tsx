import { useState } from "react";

interface FAQItem {
    q: string;
    a: string;
}

const items: FAQItem[] = [
    {
        q: "What is CoolDesk?",
        a: "CoolDesk is a browser enhancement that organizes your tabs, links, and workflows with automatic workspaces, powerful search, and a sleek UI.",
    },
    {
        q: "How does CoolDesk handle my data?",
        a: "We prioritize privacy. Your data stays on your device unless you explicitly sync or share. We do not sell your data.",
    },
    {
        q: "Is CoolDesk free?",
        a: "We offer a generous free tier during beta. Premium features may be introduced later with transparent pricing.",
    },
    {
        q: "Which browsers are supported?",
        a: "CoolDesk currently supports Chromium-based browsers like Chrome and Edge. Firefox support is on the roadmap.",
    },
    {
        q: "How can I get early access?",
        a: "Join the waitlist or install the beta extension via the Edge/Chrome store links from our homepage.",
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
        <div className="mx-auto max-w-6xl px-6">
            <div className="flex flex-col md:flex-row gap-12">
                {/* Left: FAQ Title */}
                <div className="md:w-1/3 flex items-start md:items-center">
                    <h2 className="text-5xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-300">
                        FAQs
                    </h2>
                </div>

                {/* Right: FAQ List */}
                <div className="md:w-2/3 space-y-4">
                    <div className="divide-y divide-white/20 border border-white/20 rounded-2xl overflow-hidden bg-white/10 backdrop-blur-xl shadow-2xl shadow-black/20">
                        {items.map((item, idx) => {
                            const isOpen = openIndex === idx;
                            return (
                                <div key={idx} className="group">
                                    <button
                                        className="w-full flex items-center justify-between gap-6 px-6 py-5 text-left text-white hover:bg-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/30 transition-all duration-200 backdrop-blur-sm"
                                        aria-expanded={isOpen}
                                        aria-controls={`faq-panel-${idx}`}
                                        onClick={() => setOpenIndex(isOpen ? null : idx)}
                                    >
                                        <span className="text-base md:text-lg font-medium">{item.q}</span>
                                        <span className="text-gray-300 group-hover:text-white transition-colors duration-200">
                                            <Chevron open={isOpen} />
                                        </span>
                                    </button>

                                    <div
                                        id={`faq-panel-${idx}`}
                                        role="region"
                                        aria-labelledby={`faq-header-${idx}`}
                                        className={`px-6 transition-[max-height,opacity] duration-300 ease-out bg-white/5 backdrop-blur-sm ${isOpen ? "max-h-64 opacity-100 py-1" : "max-h-0 opacity-0 overflow-hidden"
                                            }`}
                                    >
                                        <p className="text-gray-200 text-sm md:text-base pb-5">{item.a}</p>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
}
