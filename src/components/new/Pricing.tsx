import { useState } from 'react';

// Simple Icons to avoid dependencies
const Icons = {
    Check: () => (
        <svg className="w-5 h-5 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
        </svg>
    ),
    Cross: () => (
        <svg className="w-5 h-5 text-zinc-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
    ),
    Sparkle: () => (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
        </svg>
    )
};

export default function Pricing() {
    const [isAnnual, setIsAnnual] = useState(true);

    const plans = [
        {
            name: "Starter",
            price: "Free",
            description: "Perfect for local organization on a single device.",
            highlight: false,
            buttonText: "Add to Chrome",
            buttonLink: "https://chromewebstore.google.com/detail/cooldesk/ioggffobciopdddacpclplkeodllhjko",
            features: [
                { text: "Up to 3 Workspaces", active: true },
                { text: "Local Autosave", active: true },
                { text: "Basic Tab Management", active: true },
                { text: "Voice Commands", active: true },
                { text: "AI Categorization", active: false },
                { text: "Cross-Device Sync", active: false },
                { text: "Team Sharing", active: false },
            ]
        },
        {
            name: "Pro",
            price: isAnnual ? "$4" : "$6",
            period: "/month",
            description: "For power users who need AI and sync across devices.",
            highlight: true,
            badge: "MOST POPULAR",
            buttonText: "Start 14-Day Trial",
            buttonLink: "#",
            features: [
                { text: "Unlimited Workspaces", active: true },
                { text: "Cloud Sync (All Devices)", active: true },
                { text: "AI Categorization", active: true },
                { text: "Smart Scrapped Summaries", active: true },
                { text: "Priority Support", active: true },
                { text: "Team Sharing", active: false },
                { text: "Admin Controls", active: false },
            ]
        },
        {
            name: "Team",
            price: isAnnual ? "$12" : "$15",
            period: "/user/month",
            description: "Collaborate on research and share workspaces instantly.",
            highlight: false,
            buttonText: "Create Team",
            buttonLink: "#",
            features: [
                { text: "Unlimited Workspaces", active: true },
                { text: "Everything in Pro", active: true },
                { text: "Real-Time Shared Spaces", active: true },
                { text: "Team Permissions", active: true },
                { text: "Centralized Billing", active: true },
                { text: "Dedicated Success Manager", active: true },
            ]
        }
    ];

    return (
        <section id="pricing" className="py-24 bg-black relative overflow-hidden">
            {/* Background Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-[1200px] h-[600px] bg-blue-900/10 blur-[120px] rounded-full pointer-events-none" />

            <div className="container mx-auto px-6 relative z-10">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
                        Simple Pricing for <span className="text-blue-500">Every Workflow</span>
                    </h2>
                    <p className="text-zinc-400 text-lg max-w-2xl mx-auto mb-10">
                        Start for free locally. Upgrade to remove limits and unlock the power of AI & Collaboration.
                    </p>

                    {/* Toggle Switch */}
                    <div className="flex items-center justify-center gap-4">
                        <span className={`text-sm font-medium ${!isAnnual ? 'text-white' : 'text-zinc-500'}`}>Monthly</span>
                        <button
                            onClick={() => setIsAnnual(!isAnnual)}
                            className="w-14 h-7 bg-zinc-800 rounded-full relative p-1 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            <div className={`w-5 h-5 bg-blue-500 rounded-full shadow-md transform transition-transform duration-300 ${isAnnual ? 'translate-x-7' : 'translate-x-0'}`} />
                        </button>
                        <span className={`text-sm font-medium ${isAnnual ? 'text-white' : 'text-zinc-500'}`}>
                            Yearly <span className="text-green-400 text-xs font-bold ml-1">(Save 20%)</span>
                        </span>
                    </div>
                </div>

                {/* Pricing Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                    {plans.map((plan, index) => (
                        <div
                            key={index}
                            className={`relative rounded-2xl p-8 border flex flex-col transition-transform duration-300 hover:-translate-y-2 ${plan.highlight
                                ? 'bg-zinc-900/80 border-blue-500 shadow-2xl shadow-blue-500/10 z-10 scale-105 md:scale-105'
                                : 'bg-zinc-950/50 border-zinc-800 hover:border-zinc-700'
                                }`}
                        >
                            {plan.badge && (
                                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-blue-600 to-purple-600 text-white text-xs font-bold px-3 py-1 rounded-full tracking-wider shadow-lg">
                                    {plan.badge}
                                </div>
                            )}

                            <div className="mb-8">
                                <h3 className="text-xl font-bold text-white mb-2">{plan.name}</h3>
                                <p className="text-zinc-400 text-sm h-10">{plan.description}</p>
                            </div>

                            <div className="mb-8">
                                <span className="text-4xl font-bold text-white">{plan.price}</span>
                                {plan.period && <span className="text-zinc-500">{plan.period}</span>}
                            </div>

                            <a
                                href={plan.buttonLink}
                                className={`w-full py-3 rounded-xl font-bold text-center transition-all duration-200 mb-8 ${plan.highlight
                                    ? 'bg-white text-black hover:bg-zinc-200 shadow-lg'
                                    : 'bg-zinc-800 text-white hover:bg-zinc-700'
                                    }`}
                            >
                                {plan.buttonText}
                            </a>

                            <div className="flex-1 space-y-4">
                                <p className="text-xs font-bold text-zinc-500 uppercase tracking-wider mb-4">Features</p>
                                {plan.features.map((feature, i) => (
                                    <div key={i} className="flex items-center gap-3">
                                        {feature.active ? <Icons.Check /> : <Icons.Cross />}
                                        <span className={`text-sm ${feature.active ? 'text-zinc-300' : 'text-zinc-600'}`}>
                                            {feature.text}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>

                <div className="mt-16 text-center border-t border-white/5 pt-8">
                    <p className="text-zinc-500 text-sm">
                        Enterprise? Need SSO and unlimited history? <a href="#" className="text-blue-400 hover:underline">Contact Sales</a>
                    </p>
                </div>
            </div>
        </section>
    );
}