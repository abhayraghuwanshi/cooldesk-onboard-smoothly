import { useMemo, useState } from 'react';
import { FaCode, FaCoffee, FaPalette, FaRocket, FaSearch, FaSpinner } from 'react-icons/fa';
import { Input } from '../ui/input';
import WorkspaceCard from './WorkspaceCard';
import {
    categoryLabels,
    getWorkspacesByCategory,
    searchWorkspaces,
    workspaces,
    WorkspaceCategory,
} from '@/config/workspaces';

const ITEMS_PER_PAGE = 9; // Show 9 workspaces initially (3 rows of 3)

// Group categories for better navigation
const CATEGORY_GROUPS = {
    'Development': ['frontend', 'backend', 'fullstack', 'mobile', 'database', 'devops'],
    'AI & Data': ['ai-ml', 'data-analytics', 'llm-tools'],
    'Design & Creative': ['design-systems', 'design-tools', 'animation', 'video-editing', 'image-generation'],
    'Audio & Music': ['music-production', 'audio-editing', 'voice-ai', 'podcasting'],
    'Infrastructure': ['deployment', 'hosting', 'cloud-services', 'monitoring'],
    'Productivity': ['collaboration', 'project-management', 'automation', 'crm', 'analytics'],
    'Content & Marketing': ['cms', 'ecommerce', 'marketing', 'seo', 'email'],
    'Security': ['authentication', 'security', 'testing'],
    'Other': ['apis', 'payments', 'storage', 'other']
};

export default function WorkspaceSection() {
    // Get all unique categories from workspaces
    const allCategories = useMemo(() => {
        const cats = new Set(workspaces.map(w => w.category));
        return ['all', ...Array.from(cats).sort()] as (WorkspaceCategory | 'all')[];
    }, []);

    const [activeCategory, setActiveCategory] = useState<WorkspaceCategory | 'all'>('all');
    const [searchQuery, setSearchQuery] = useState('');
    const [displayCount, setDisplayCount] = useState(ITEMS_PER_PAGE);
    const [showAllCategories, setShowAllCategories] = useState(false);

    // Filter workspaces based on category and search
    const filteredWorkspaces = useMemo(() => {
        let filtered = activeCategory === 'all'
            ? workspaces
            : getWorkspacesByCategory(activeCategory);

        if (searchQuery.trim()) {
            filtered = searchWorkspaces(searchQuery);
            // If category filter is active, apply it to search results too
            if (activeCategory !== 'all') {
                filtered = filtered.filter(ws => ws.category === activeCategory);
            }
        }

        return filtered;
    }, [activeCategory, searchQuery]);

    // Workspaces to display (with pagination)
    const displayedWorkspaces = filteredWorkspaces.slice(0, displayCount);
    const hasMore = displayCount < filteredWorkspaces.length;
    const totalCount = filteredWorkspaces.length;

    // Reset display count when filters change
    const handleCategoryChange = (cat: WorkspaceCategory | 'all') => {
        setActiveCategory(cat);
        setSearchQuery('');
        setDisplayCount(ITEMS_PER_PAGE);
    };

    const loadMore = () => {
        setDisplayCount(prev => prev + ITEMS_PER_PAGE);
    };

    return (
        <div className="w-full max-w-7xl mx-auto">
            {/* Search Bar */}
            <div className="text-center mb-12">
                <div className="relative max-w-lg mx-auto px-4">
                    <Input
                        type="text"
                        placeholder={activeCategory === 'all' ? 'Search workspaces...' : `Search ${categoryLabels[activeCategory]}...`}
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="bg-gray-900/60 border-gray-700 text-white placeholder-gray-500 focus:border-blue-500 focus:ring-blue-500/20"
                    />
                </div>
            </div>

            {/* Stats */}
            <div className="text-center mb-8">
                <p className="text-sm text-gray-500">
                    Showing <span className="text-fuchsia-400 font-semibold">{displayedWorkspaces.length}</span> of{' '}
                    <span className="text-white font-semibold">{totalCount}</span> workspaces
                </p>
            </div>

            {/* Category Navigation - Wrapped Grid */}
            <div className="mb-12">
                <div className="flex flex-wrap justify-center gap-3 max-w-6xl mx-auto">
                    {/* All Button */}
                    <button
                        onClick={() => handleCategoryChange('all')}
                        className={`
                            px-5 py-2.5 rounded-xl text-sm font-semibold whitespace-nowrap
                            transition-all duration-300 transform hover:scale-105
                            ${activeCategory === 'all'
                                ? 'bg-gradient-to-r from-violet-600 via-fuchsia-600 to-pink-600 text-white shadow-lg shadow-fuchsia-500/30'
                                : 'bg-gray-800/60 text-gray-300 hover:bg-gray-700/60 border border-gray-700/50 hover:border-gray-600'}
                        `}
                    >
                        ✨ All Workspaces
                    </button>

                    {/* Category Buttons */}
                    {allCategories.slice(1, showAllCategories ? undefined : 12).map((cat) => (
                        <button
                            key={cat}
                            onClick={() => handleCategoryChange(cat as WorkspaceCategory)}
                            className={`
                                px-4 py-2.5 rounded-xl text-sm font-medium whitespace-nowrap
                                transition-all duration-300 transform hover:scale-105
                                ${activeCategory === cat
                                    ? 'bg-gradient-to-r from-violet-600 via-fuchsia-600 to-pink-600 text-white shadow-lg shadow-fuchsia-500/30'
                                    : 'bg-gray-800/60 text-gray-300 hover:bg-gray-700/60 border border-gray-700/50 hover:border-gray-600'}
                            `}
                        >
                            {categoryLabels[cat as WorkspaceCategory]}
                        </button>
                    ))}

                    {/* Show More/Less Button */}
                    {allCategories.length > 12 && (
                        <button
                            onClick={() => setShowAllCategories(!showAllCategories)}
                            className="px-4 py-2.5 rounded-xl text-sm font-semibold whitespace-nowrap
                                     bg-gradient-to-r from-gray-800/60 to-gray-700/60 text-fuchsia-400 hover:text-fuchsia-300
                                     border border-fuchsia-500/30 hover:border-fuchsia-500/50
                                     transition-all duration-300 transform hover:scale-105"
                        >
                            {showAllCategories ? '← Show Less' : `+${allCategories.length - 12} More →`}
                        </button>
                    )}
                </div>
            </div>

            {/* Grid Layout */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 mb-12">
                {displayedWorkspaces.map((workspace, index) => (
                    <div
                        key={workspace.id}
                        className="animate-fade-in-up"
                        style={{ animationDelay: `${index * 50}ms` }}
                    >
                        <WorkspaceCard workspace={workspace} />
                    </div>
                ))}
            </div>

            {/* Load More Button */}
            {hasMore && (
                <div className="flex justify-center">
                    <button
                        onClick={loadMore}
                        className="group relative px-8 py-4 bg-gradient-to-r from-violet-600 via-fuchsia-600 to-pink-600
                                 hover:from-violet-500 hover:via-fuchsia-500 hover:to-pink-500
                                 rounded-2xl text-sm font-bold text-white
                                 shadow-lg shadow-fuchsia-500/25 hover:shadow-xl hover:shadow-fuchsia-500/40
                                 transform hover:scale-105 transition-all duration-300
                                 flex items-center gap-3"
                    >
                        <span>Load More Workspaces</span>
                        <span className="text-xs bg-white/20 px-2 py-1 rounded-full">
                            +{Math.min(ITEMS_PER_PAGE, totalCount - displayCount)}
                        </span>
                    </button>
                </div>
            )}

            {/* Empty State */}
            {filteredWorkspaces.length === 0 && (
                <div className="text-center py-20">
                    <div className="bg-gray-800/50 backdrop-blur-sm w-20 h-20 rounded-3xl flex items-center justify-center mx-auto mb-6 border border-gray-700/50">
                        <FaSearch className="text-gray-400 w-10 h-10" />
                    </div>
                    <h3 className="text-2xl font-semibold text-gray-200 mb-3">No workspaces found</h3>
                    <p className="text-gray-500 text-lg mb-6">
                        {searchQuery
                            ? `No results for "${searchQuery}"${activeCategory !== 'all' ? ` in ${categoryLabels[activeCategory]}` : ''}`
                            : 'Try selecting a different category'}
                    </p>
                    {(searchQuery || activeCategory !== 'all') && (
                        <button
                            onClick={() => {
                                setSearchQuery('');
                                setActiveCategory('all');
                            }}
                            className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-2xl hover:scale-105 transition-transform duration-300"
                        >
                            Clear Filters
                        </button>
                    )}
                </div>
            )}

            <style jsx>{`
                @keyframes fade-in {
                    from {
                        opacity: 0;
                        transform: translateY(20px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }

                @keyframes fade-in-up {
                    from {
                        opacity: 0;
                        transform: translateY(30px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }

                .animate-fade-in {
                    animation: fade-in 0.8s ease-out forwards;
                }

                .animate-fade-in-up {
                    opacity: 0;
                    animation: fade-in-up 0.6s ease-out forwards;
                }
            `}</style>
        </div>
    );
}
