import { categoryLabels, Space, SpaceCategory, spaces } from '@/config/spaces';
import { LayoutGrid, MoreHorizontal } from 'lucide-react';
import { useMemo, useState } from 'react';
import { FaRocket, FaSearch, FaStar, FaUsers } from 'react-icons/fa';

export default function SpaceSection() {
    const [activeCategory, setActiveCategory] = useState<SpaceCategory | 'all'>('all');
    const [searchQuery, setSearchQuery] = useState('');

    const filteredSpaces = useMemo(() => {
        return spaces.filter(space => {
            const matchesCategory = activeCategory === 'all' || space.category === activeCategory;
            const matchesSearch = space.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                space.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                space.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
            return matchesCategory && matchesSearch;
        });
    }, [activeCategory, searchQuery]);

    const handleJoinSpace = (space: Space) => {
        const extensionId = 'dolmgalgldegfddhnafmganlbhkgapoj';
        const payload = {
            action: 'join_space',
            id: space.id,
            data: space.config,
            title: space.title
        };

        try {
            const jsonString = JSON.stringify(payload);
            const base64Data = btoa(unescape(encodeURIComponent(jsonString)));
            const targetUrl = `chrome-extension://${extensionId}/index.html?action=join_space&data=${base64Data}`;
            window.open(targetUrl, '_blank');
        } catch (err) {
            console.error('Failed to encode space data:', err);
            alert('Error preparing space for Cooldesk.');
        }
    };

    return (
        <div className="w-full max-w-7xl mx-auto">
            {/* Filter Bar */}
            <div className="mb-10 px-4">
                <div className="flex flex-col md:flex-row md:items-center gap-4 max-w-6xl mx-auto">
                    <div className="relative w-full md:w-72 flex-shrink-0">
                        <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={16} />
                        <input
                            type="text"
                            placeholder="Search spaces..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-10 pr-4 py-2.5 bg-zinc-900/60 border border-zinc-700 rounded-xl text-sm text-white placeholder-gray-500 focus:outline-none focus:border-blue-500/50 transition-colors"
                        />
                    </div>

                    <div className="w-full md:flex-1 overflow-x-auto scrollbar-hide">
                        <div className="flex items-center gap-2">
                            <button
                                onClick={() => setActiveCategory('all')}
                                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold whitespace-nowrap transition-all duration-200
                                    ${activeCategory === 'all'
                                        ? 'bg-white text-zinc-900 shadow-lg'
                                        : 'bg-zinc-800/80 text-gray-300 hover:text-white border border-zinc-700/50'}`}
                            >
                                <LayoutGrid size={14} />
                                All Spaces
                            </button>
                            {Object.entries(categoryLabels).map(([key, label]) => (
                                <button
                                    key={key}
                                    onClick={() => setActiveCategory(key as SpaceCategory)}
                                    className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold whitespace-nowrap transition-all duration-200
                                        ${activeCategory === key
                                            ? 'bg-white text-zinc-900 shadow-lg'
                                            : 'bg-zinc-800/80 text-gray-300 hover:text-white border border-zinc-700/50'}`}
                                >
                                    {label}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 mb-12 px-4">
                {filteredSpaces.map((space, index) => (
                    <div
                        key={space.id}
                        className="group relative bg-zinc-900/40 backdrop-blur-sm border border-zinc-800/50 rounded-3xl overflow-hidden hover:border-zinc-700 transition-all duration-500 hover:shadow-2xl hover:shadow-blue-500/10"
                    >
                        {/* Theme Preview Header */}
                        <div
                            className="h-32 w-full relative overflow-hidden"
                            style={{ backgroundColor: space.theme.color }}
                        >
                            <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_center,_white_1px,_transparent_1px)] bg-[size:20px_20px]" />
                            <div className="absolute top-4 left-6 flex items-center gap-3">
                                <span className="text-4xl">{space.icon}</span>
                                <div className="px-3 py-1 bg-black/20 backdrop-blur-md rounded-full border border-white/10">
                                    <span className="text-xs font-bold text-white uppercase tracking-wider">{space.category}</span>
                                </div>
                            </div>
                        </div>

                        {/* Content */}
                        <div className="p-8">
                            <div className="flex justify-between items-start mb-4">
                                <div>
                                    <h3 className="text-2xl font-bold text-white mb-2">{space.title}</h3>
                                    <p className="text-gray-400 leading-relaxed mb-6">{space.description}</p>
                                </div>
                            </div>

                            <div className="flex flex-wrap gap-2 mb-8">
                                {space.tags.map(tag => (
                                    <span key={tag} className="px-3 py-1 bg-zinc-800/50 text-gray-400 text-xs rounded-full border border-zinc-700/50 group-hover:border-zinc-600 transition-colors">
                                        #{tag}
                                    </span>
                                ))}
                            </div>

                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-4 text-sm text-gray-500">
                                    <div className="flex items-center gap-1.5">
                                        <FaUsers className="text-blue-400" size={14} />
                                        <span>{space.stats.members.toLocaleString()} users</span>
                                    </div>
                                    <div className="flex items-center gap-1.5">
                                        <FaStar className="text-yellow-500" size={12} />
                                        <span>{space.stats.rating}</span>
                                    </div>
                                </div>
                                <button
                                    onClick={() => handleJoinSpace(space)}
                                    className="px-6 py-2.5 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-bold text-sm transition-all duration-300 transform active:scale-95 flex items-center gap-2 shadow-lg shadow-blue-600/20"
                                >
                                    <FaRocket size={14} />
                                    Join Space
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {filteredSpaces.length === 0 && (
                <div className="text-center py-20 px-4">
                    <div className="bg-zinc-800/30 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6 border border-zinc-700/50">
                        <MoreHorizontal className="text-gray-500" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-300 mb-2">No spaces found</h3>
                    <p className="text-gray-500">Try adjusting your filters or search terms.</p>
                </div>
            )}
        </div>
    );
}
