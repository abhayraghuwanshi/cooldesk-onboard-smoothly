import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
    categoryLabels,
    ResourceCategory,
    resources
} from '../../config/resources';

export default function ResourceSelector() {
    const [selectedCategory, setSelectedCategory] = useState<ResourceCategory | 'all'>('all');

    const categories: (ResourceCategory | 'all')[] = ['all', 'privacy', 'contact', 'founder', 'preview'];

    const filteredResources = resources.filter(resource => {
        const matchesCategory = selectedCategory === 'all' || resource.category === selectedCategory;
        return matchesCategory;
    });

    return (
        <section className="py-16 bg-zinc-950 relative overflow-hidden">
            {/* Background */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-[1000px] h-[400px] bg-blue-900/5 blur-[100px] rounded-full pointer-events-none" />

            <div className="container mx-auto px-6 relative z-10">
                {/* Header */}
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                        CoolDesk <span className="text-blue-500">Resources</span>
                    </h2>
                    <p className="text-zinc-400 max-w-2xl mx-auto">
                        Quick access to privacy policies, contact information, and founder insights.
                    </p>
                </div>

                {/* Category Filter */}
                <div className="flex justify-center gap-3 mb-12">
                    {categories.map((category) => (
                        <button
                            key={category}
                            onClick={() => setSelectedCategory(category)}
                            className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${selectedCategory === category
                                ? 'bg-blue-500 text-white shadow-lg shadow-blue-500/20'
                                : 'bg-zinc-900/50 border border-white/10 text-zinc-400 hover:text-white hover:bg-zinc-900/80'
                                }`}
                        >
                            {category === 'all' ? 'All Resources' : categoryLabels[category]}
                        </button>
                    ))}
                </div>

                {/* Resources Grid */}
                <div className="max-w-4xl mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredResources.map((resource) => (
                            <Link
                                key={resource.id}
                                to={resource.url}
                                className="group bg-zinc-900/40 border border-white/5 rounded-xl p-6 hover:bg-zinc-900/80 hover:border-blue-500/20 transition-all duration-300"
                            >
                                <div className="flex items-start gap-4">
                                    <div className="text-2xl">{resource.icon}</div>
                                    <div className="flex-1">
                                        <h4 className="text-white font-medium mb-2 group-hover:text-blue-400 transition-colors">
                                            {resource.title}
                                        </h4>
                                        <p className="text-zinc-400 text-sm mb-3">{resource.description}</p>
                                        <div className="flex items-center gap-2 text-xs text-zinc-500">
                                            <span className="bg-zinc-800 px-2 py-1 rounded">
                                                {categoryLabels[resource.category]}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>

                {/* Quick Links */}
                <div className="mt-16 pt-8 border-t border-white/5">
                    <div className="text-center">
                        <p className="text-zinc-500 text-sm mb-4">Quick Access</p>
                        <div className="flex justify-center gap-6">
                            <Link to="/privacy-details" className="text-blue-400 hover:text-blue-300 text-sm">
                                Privacy Policy
                            </Link>
                            <Link to="/contact" className="text-blue-400 hover:text-blue-300 text-sm">
                                Contact Us
                            </Link>
                            <Link to="/founder" className="text-blue-400 hover:text-blue-300 text-sm">
                                Founder Notes
                            </Link>
                            <Link to="/gallery" className="text-blue-400 hover:text-blue-300 text-sm">
                                Preview Gallery
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
