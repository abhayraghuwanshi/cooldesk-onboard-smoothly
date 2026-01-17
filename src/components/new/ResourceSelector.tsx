import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
    categoryLabels,
    ResourceCategory,
    resources
} from '../../config/resources.tsx';

export default function ResourceSelector() {
    const [selectedCategory, setSelectedCategory] = useState<ResourceCategory | 'all'>('all');

    const categories: (ResourceCategory | 'all')[] = ['all', 'docs', 'privacy', 'contact', 'founder', 'preview', 'release'];

    const filteredResources = resources.filter(resource => {
        const matchesCategory = selectedCategory === 'all' || resource.category === selectedCategory;
        return matchesCategory;
    });

    return (
        <section className="min-h-screen py-20 bg-black relative overflow-hidden">
            {/* Subtle Background Pattern */}
            <div className="absolute inset-0 opacity-30">
                <div className="absolute inset-0" style={{
                    backgroundImage: 'radial-gradient(circle at 1px 1px, rgb(59 130 246 / 0.1) 1px, transparent 0)',
                    backgroundSize: '40px 40px'
                }} />
            </div>

            {/* Gradient Orbs */}
            <div className="absolute top-20 left-10 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl" />
            <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl" />

            <div className="container mx-auto px-6 relative z-10 max-w-7xl">
                {/* Compact Header */}
                <div className="text-center mb-12">
                    <h1 className="heading-1 text-txt-primary mb-3">
                        Resources Hub
                    </h1>
                    <p className="body-base text-txt-muted">
                        Everything you need to know about CoolDesk
                    </p>
                </div>

                {/* Minimalist Category Filter */}
                <div className="flex flex-wrap justify-center gap-2 mb-12">
                    {categories.map((category) => (
                        <button
                            key={category}
                            onClick={() => setSelectedCategory(category)}
                            className={`px-4 py-2 rounded-lg label transition-all duration-200 ${
                                selectedCategory === category
                                    ? 'bg-btn-primary text-txt-primary'
                                    : 'bg-zinc-900 text-txt-secondary hover:bg-zinc-800 hover:text-txt-primary border border-zinc-800'
                            }`}
                        >
                            {category === 'all' ? 'All Resources' : categoryLabels[category]}
                        </button>
                    ))}
                </div>

                {/* Compact 3-Column Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {filteredResources.map((resource) => (
                        <Link
                            key={resource.id}
                            to={resource.url}
                            className="group relative bg-zinc-900/50 border border-zinc-800/50 rounded-xl p-6 hover:bg-zinc-900 hover:border-btn-primary/50 transition-all duration-300 hover:scale-[1.02]"
                        >
                            {/* Icon and Title Row */}
                            <div className="flex items-start gap-4 mb-3">
                                <div className="text-txt-accent flex-shrink-0 transform group-hover:scale-110 transition-transform">
                                    {resource.icon}
                                </div>
                                <div className="flex-1 min-w-0">
                                    <h3 className="heading-5 text-txt-primary mb-1 group-hover:text-txt-accent transition-colors truncate">
                                        {resource.title}
                                    </h3>
                                    <span className="inline-block px-2 py-0.5 bg-zinc-800 text-txt-secondary caption rounded">
                                        {categoryLabels[resource.category]}
                                    </span>
                                </div>
                            </div>

                            {/* Description */}
                            <p className="body-sm text-txt-secondary leading-relaxed line-clamp-2 mb-3">
                                {resource.description}
                            </p>

                            {/* View Link */}
                            <div className="flex items-center caption text-txt-accent font-medium group-hover:text-txt-accent-hover">
                                <span>View</span>
                                <svg className="w-3 h-3 ml-1 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                </svg>
                            </div>
                        </Link>
                    ))}
                </div>

                {/* Empty State */}
                {filteredResources.length === 0 && (
                    <div className="text-center py-20">
                        <div className="text-5xl mb-4">🔍</div>
                        <p className="body-base text-txt-muted">No resources found in this category</p>
                    </div>
                )}
            </div>

            <style jsx>{`
                .line-clamp-2 {
                    display: -webkit-box;
                    -webkit-line-clamp: 2;
                    -webkit-box-orient: vertical;
                    overflow: hidden;
                }
            `}</style>
        </section>
    );
}
