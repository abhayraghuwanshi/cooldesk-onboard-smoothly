// Simplified comparison - focus on key differentiators only
const comparisons = [
    { 
        feature: 'Automatic Workspaces', 
        cooldesk: 'AI-powered auto-organization',
        others: 'Manual setup required'
    },
    { 
        feature: 'Unified Search', 
        cooldesk: 'Search tabs, notes, bookmarks, history in one place',
        others: 'Limited to specific content types'
    },
    { 
        feature: 'Voice Navigation', 
        cooldesk: 'Full hands-free browser control',
        others: 'Not available'
    },
    { 
        feature: 'Integrated Notes & Tasks', 
        cooldesk: 'Built-in with auto-capture',
        others: 'Requires separate apps'
    },
    { 
        feature: 'Setup Time', 
        cooldesk: 'Zero - works immediately',
        others: '15-30 minutes configuration'
    },
];

const CheckIcon = () => (
    <svg className="h-5 w-5 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
    </svg>
);

export default function FeatureComparison() {
    return (
        <div className="py-16 sm:py-24">
            <div className="mx-auto max-w-5xl px-6">
                <div className="text-center mb-12">
                    <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
                        Why Choose <span className="text-blue-400">CoolDesk</span>?
                    </h2>
                    <p className="text-lg text-gray-400 max-w-2xl mx-auto">
                        Built for productivity, not complexity
                    </p>
                </div>

                <div className="space-y-4">
                    {comparisons.map((item, index) => (
                        <div key={index} className="relative rounded-xl overflow-hidden bg-gradient-to-r from-blue-500/10 via-blue-600/5 to-transparent border-l-4 border-blue-400">
                            {/* Subtle glow effect */}
                            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-transparent pointer-events-none" />
                            
                            <div className="relative p-6">
                                <div className="grid md:grid-cols-3 gap-6 items-center">
                                    {/* Feature Name */}
                                    <div>
                                        <h3 className="text-lg font-bold text-white">{item.feature}</h3>
                                    </div>

                                    {/* CoolDesk */}
                                    <div className="flex items-start gap-3">
                                        <CheckIcon />
                                        <div>
                                            <div className="text-xs font-semibold text-blue-300 uppercase tracking-wide mb-1">CoolDesk</div>
                                            <p className="text-sm text-gray-300">{item.cooldesk}</p>
                                        </div>
                                    </div>

                                    {/* Others */}
                                    <div className="flex items-start gap-3">
                                        <svg className="h-5 w-5 text-gray-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                        </svg>
                                        <div>
                                            <div className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">Others</div>
                                            <p className="text-sm text-gray-400">{item.others}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Bottom CTA hint */}
                <div className="mt-12 text-center">
                    <p className="text-gray-400 text-sm">
                        Ready to upgrade your browsing experience?
                    </p>
                </div>
            </div>
        </div>
    );
}
