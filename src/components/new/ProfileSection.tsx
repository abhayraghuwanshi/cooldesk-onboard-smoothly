import {
    profiles
} from '@/config/profiles';
import {
    Brain,
    Cloud,
    Code,
    LayoutGrid,
    Palette,
    PieChart,
    Search
} from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import { FaBook, FaChevronDown, FaChevronUp, FaDiscord, FaGamepad, FaGithub, FaGlobe, FaNpm, FaPlay, FaPlus, FaSearch, FaTimes, FaTrash } from 'react-icons/fa';
import ProfileCard from './ProfileCard';

// Category labels for profiles
const profileCategoryLabels: Record<string, string> = {
    'all': 'All Profiles',
    'fullstack': 'Full Stack',
    'ai-ml': 'AI & ML',
    'data-analytics': 'Data Science',
    'devops': 'DevOps',
    'design-systems': 'Design',
    'backend': 'Backend',
};

// Category icons
const profileCategoryIcons: Record<string, JSX.Element> = {
    'all': <LayoutGrid size={16} />,
    'fullstack': <Code size={16} />,
    'ai-ml': <Brain size={16} />,
    'data-analytics': <PieChart size={16} />,
    'devops': <Cloud size={16} />,
    'design-systems': <Palette size={16} />,
    'backend': <Code size={16} />,
};

// Selected link interface
interface SelectedLink {
    workspaceId: string;
    workspaceTitle: string;
    workspaceIcon?: string;
    urlType: string;
    url: string;
    title: string;
}

// URL type icons
const urlTypeIcons: Record<string, JSX.Element> = {
    main: <FaGlobe size={12} />,
    docs: <FaBook size={12} />,
    github: <FaGithub size={12} />,
    demo: <FaPlay size={12} />,
    playground: <FaGamepad size={12} />,
    npm: <FaNpm size={12} />,
    discord: <FaDiscord size={12} />,
};

// URL type labels
const urlTypeLabels: Record<string, string> = {
    main: 'Main',
    docs: 'Docs',
    github: 'GitHub',
    demo: 'Demo',
    playground: 'Playground',
    npm: 'NPM',
    discord: 'Discord',
};

// Add to CoolDesk function
function addToCoolDesk(workspaceName: string, urls: { url: string; title: string }[], icon: string = 'globe') {
    const extensionId = 'dolmgalgldegfddhnafmganlbhkgapoj';

    const payload = {
        name: workspaceName,
        description: `Imported from CoolDesk Website`,
        icon: icon,
        urls: urls
    };

    try {
        const jsonString = JSON.stringify(payload);
        const base64Data = btoa(unescape(encodeURIComponent(jsonString)));
        const targetUrl = `chrome-extension://${extensionId}/index.html?action=add_workspace&data=${base64Data}`;
        window.open(targetUrl, '_blank');
    } catch (err) {
        console.error('Failed to encode workspace data:', err);
        alert('Error preparing workspace for CoolDesk.');
    }
}

export default function ProfileSection() {
    const [searchQuery, setSearchQuery] = useState('');
    const [activeCategory, setActiveCategory] = useState<string>('all');

    // Get all unique categories from profiles
    const allCategories = useMemo(() => {
        const cats = new Set(profiles.map(p => p.category));
        return ['all', ...Array.from(cats)];
    }, []);

    // Selection mode state - tracks individual links
    const [selectedLinks, setSelectedLinks] = useState<SelectedLink[]>(() => {
        if (typeof window !== 'undefined') {
            const saved = localStorage.getItem('cooldesk_profile_selection');
            return saved ? JSON.parse(saved) : [];
        }
        return [];
    });

    // Derived state, but initialized to true if we have links
    const [selectionMode, setSelectionMode] = useState(() => {
        if (typeof window !== 'undefined') {
            const saved = localStorage.getItem('cooldesk_profile_selection');
            return !!(saved && JSON.parse(saved).length > 0);
        }
        return false;
    });

    const [showDropdown, setShowDropdown] = useState(false);
    const [workspaceName, setWorkspaceName] = useState(() => {
        if (typeof window !== 'undefined') {
            return localStorage.getItem('cooldesk_profile_name') || '';
        }
        return '';
    });

    // Save selection to localStorage
    useEffect(() => {
        localStorage.setItem('cooldesk_profile_selection', JSON.stringify(selectedLinks));
        if (selectedLinks.length === 0) {
            setSelectionMode(false);
        } else {
            setSelectionMode(true);
        }
    }, [selectedLinks]);

    // Save workspace name to localStorage
    useEffect(() => {
        localStorage.setItem('cooldesk_profile_name', workspaceName);
    }, [workspaceName]);

    // Get unique workspace IDs from selected links
    const selectedWorkspaceIds = useMemo(() => {
        return new Set(selectedLinks.map(link => link.workspaceId));
    }, [selectedLinks]);

    // Toggle workspace selection (adds all links from workspace)
    const toggleWorkspaceSelection = (workspaceId: string) => {
        // Auto-enable selection mode if not already active
        if (!selectionMode) {
            setSelectionMode(true);
        }

        const workspace = profiles.find(w => w.id === workspaceId);
        if (!workspace) return;

        const isCurrentlySelected = selectedWorkspaceIds.has(workspaceId);

        if (isCurrentlySelected) {
            // Remove all links from this workspace
            setSelectedLinks(prev => prev.filter(link => link.workspaceId !== workspaceId));
        } else {
            // Add all links from this workspace
            const urlEntries = Object.entries(workspace.urls).filter(([_, url]) => url) as [string, string][];
            const newLinks: SelectedLink[] = urlEntries.map(([type, url]) => ({
                workspaceId: workspace.id,
                workspaceTitle: workspace.title,
                workspaceIcon: workspace.icon,
                urlType: type,
                url,
                title: type === 'main' ? workspace.title :
                    `${workspace.title} ${urlTypeLabels[type] || type}`
            }));
            setSelectedLinks(prev => [...prev, ...newLinks]);
        }
    };

    // Remove a single link
    const removeLink = (workspaceId: string, urlType: string) => {
        setSelectedLinks(prev => {
            const newLinks = prev.filter(link => !(link.workspaceId === workspaceId && link.urlType === urlType));
            // If no more links, exit selection mode
            if (newLinks.length === 0) {
                setSelectionMode(false);
                setShowDropdown(false);
            }
            return newLinks;
        });
    };

    // Remove all links from a workspace
    const removeWorkspace = (workspaceId: string) => {
        setSelectedLinks(prev => {
            const newLinks = prev.filter(link => link.workspaceId !== workspaceId);
            if (newLinks.length === 0) {
                setSelectionMode(false);
                setShowDropdown(false);
            }
            return newLinks;
        });
    };

    // Check if workspace is selected (has at least one link selected)
    const isWorkspaceSelected = (workspaceId: string) => {
        return selectedWorkspaceIds.has(workspaceId);
    };

    // Group selected links by workspace
    const groupedLinks = useMemo(() => {
        const groups: Record<string, SelectedLink[]> = {};
        selectedLinks.forEach(link => {
            if (!groups[link.workspaceId]) {
                groups[link.workspaceId] = [];
            }
            groups[link.workspaceId].push(link);
        });
        return groups;
    }, [selectedLinks]);

    // Get default workspace name
    const getDefaultWorkspaceName = () => {
        if (selectedWorkspaceIds.size === 1) {
            return selectedLinks[0]?.workspaceTitle || 'My Workspace';
        }
        return `My Collection (${selectedWorkspaceIds.size} workspaces)`;
    };

    // Handle add to CoolDesk
    const handleAddToCoolDesk = () => {
        if (selectedLinks.length === 0) return;

        const urls = selectedLinks.map(link => ({
            url: link.url,
            title: link.title
        }));

        const finalName = workspaceName.trim() || getDefaultWorkspaceName();

        addToCoolDesk(finalName, urls, 'globe');
        setSelectedLinks([]);
        setSelectionMode(false);
        setShowDropdown(false);
        setWorkspaceName('');
    };

    // Cancel selection mode
    const cancelSelection = () => {
        setSelectedLinks([]);
        setSelectionMode(false);
        setShowDropdown(false);
        setWorkspaceName('');
    };

    // Filter profiles based on category and search
    const filteredProfiles = useMemo(() => {
        let filtered = activeCategory === 'all'
            ? profiles
            : profiles.filter(p => p.category === activeCategory);

        if (searchQuery.trim()) {
            const query = searchQuery.toLowerCase();
            filtered = filtered.filter(p =>
                p.title.toLowerCase().includes(query) ||
                p.description.toLowerCase().includes(query) ||
                p.tags.some(tag => tag.toLowerCase().includes(query))
            );
        }

        return filtered;
    }, [activeCategory, searchQuery]);

    // Handle category change
    const handleCategoryChange = (cat: string) => {
        setActiveCategory(cat);
        setSearchQuery('');
    };

    return (
        <div className="w-full max-w-7xl mx-auto">

            {/* Selection Mode Banner with Action Bar */}
            {selectionMode && (
                <div className="sticky top-0 z-50 mb-4 sm:mb-8 mx-2 sm:mx-4 bg-zinc-900/95 backdrop-blur-xl border-2 border-fuchsia-500/50 rounded-xl sm:rounded-2xl shadow-xl overflow-hidden"
                    style={{ boxShadow: '0 0 30px rgba(168, 85, 247, 0.2)' }}>
                    {/* Main bar */}
                    <div className="p-3 sm:p-5">
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4">
                            {/* Left side - Selection info with dropdown toggle */}
                            <button
                                onClick={() => selectedLinks.length > 0 && setShowDropdown(!showDropdown)}
                                className={`flex items-center gap-2 sm:gap-3 ${selectedLinks.length > 0 ? 'cursor-pointer active:opacity-80' : 'cursor-default'} transition-opacity`}
                            >
                                <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center text-sm sm:text-base font-bold flex-shrink-0
                                              ${selectedLinks.length > 0
                                        ? 'bg-gradient-to-r from-green-500 to-emerald-500 text-white shadow-lg shadow-green-500/40'
                                        : 'bg-fuchsia-500/20 border-2 border-dashed border-fuchsia-500/50 text-fuchsia-400'}`}>
                                    {selectedLinks.length > 0 ? selectedWorkspaceIds.size : '?'}
                                </div>
                                <div className="text-left min-w-0">
                                    <h4 className="text-white font-semibold flex items-center gap-2 text-sm sm:text-base">
                                        {selectedLinks.length === 0
                                            ? 'Select profiles'
                                            : `${selectedWorkspaceIds.size} ${selectedWorkspaceIds.size === 1 ? 'profile' : 'profiles'}`}
                                        {selectedLinks.length > 0 && (
                                            showDropdown ? <FaChevronUp size={10} className="text-gray-400" /> : <FaChevronDown size={10} className="text-gray-400" />
                                        )}
                                    </h4>
                                    <p className="text-xs sm:text-sm text-gray-400 truncate">
                                        {selectedLinks.length === 0
                                            ? 'Tap any card to select'
                                            : `${selectedLinks.length} links • Tap to ${showDropdown ? 'hide' : 'edit'}`}
                                    </p>
                                </div>
                            </button>

                            {/* Right side - Action buttons */}
                            <div className="flex items-center gap-2 sm:gap-3 w-full sm:w-auto">
                                <button
                                    onClick={cancelSelection}
                                    className="flex-1 sm:flex-initial flex items-center justify-center gap-2 px-3 sm:px-4 py-2 sm:py-2.5 text-xs sm:text-sm font-medium text-gray-300 active:text-white
                                             border border-zinc-600 active:border-zinc-500 rounded-lg sm:rounded-xl transition-all active:bg-zinc-800"
                                >
                                    <FaTimes size={10} />
                                    <span className="sm:inline">{selectedLinks.length > 0 ? 'Clear' : 'Cancel'}</span>
                                </button>
                                {selectedLinks.length > 0 && (
                                    <button
                                        onClick={handleAddToCoolDesk}
                                        className="flex-1 sm:flex-initial flex items-center justify-center gap-2 px-4 sm:px-6 py-2 sm:py-2.5 bg-gradient-to-r from-violet-600 via-fuchsia-600 to-pink-600
                                                 active:from-violet-500 active:via-fuchsia-500 active:to-pink-500
                                                 rounded-lg sm:rounded-xl text-xs sm:text-sm font-bold text-white
                                                 shadow-lg shadow-fuchsia-500/40
                                                 transition-all duration-300"
                                    >
                                        <FaPlus size={12} />
                                        <span>Add {selectedLinks.length}</span>
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Dropdown panel showing all selected links */}
                    {showDropdown && selectedLinks.length > 0 && (
                        <div className="border-t border-zinc-700 max-h-64 sm:max-h-96 overflow-y-auto scrollbar-hide">
                            {/* Workspace name input */}
                            <div className="px-3 sm:px-5 py-3 sm:py-4 bg-zinc-800/30 border-b border-zinc-700">
                                <label className="block text-xs sm:text-sm font-medium text-gray-400 mb-1.5 sm:mb-2">
                                    Profile Name
                                </label>
                                <input
                                    type="text"
                                    value={workspaceName}
                                    onChange={(e) => setWorkspaceName(e.target.value)}
                                    placeholder={getDefaultWorkspaceName()}
                                    className="w-full px-3 sm:px-4 py-2 sm:py-2.5 bg-zinc-900 border border-zinc-600 rounded-lg sm:rounded-xl text-sm sm:text-base text-white placeholder-gray-500
                                             focus:outline-none focus:border-fuchsia-500 focus:ring-1 focus:ring-fuchsia-500/50
                                             transition-all"
                                />
                                <p className="mt-1 sm:mt-1.5 text-xs text-gray-500 hidden sm:block">
                                    Leave empty to use default name
                                </p>
                            </div>

                            {/* Links grouped by workspace */}
                            {Object.entries(groupedLinks).map(([workspaceId, links]) => (
                                <div key={workspaceId} className="border-b border-zinc-800 last:border-b-0">
                                    {/* Workspace header */}
                                    <div className="flex items-center justify-between px-3 sm:px-5 py-2.5 sm:py-3 bg-zinc-800/50">
                                        <div className="flex items-center gap-2 sm:gap-3 min-w-0">
                                            <span className="text-lg sm:text-xl flex-shrink-0">{links[0].workspaceIcon}</span>
                                            <span className="font-medium text-white text-sm sm:text-base truncate">{links[0].workspaceTitle}</span>
                                            <span className="text-xs text-gray-500 bg-zinc-700 px-1.5 sm:px-2 py-0.5 rounded-full flex-shrink-0">
                                                {links.length}
                                            </span>
                                        </div>
                                        <button
                                            onClick={() => removeWorkspace(workspaceId)}
                                            className="text-gray-500 active:text-red-400 transition-colors p-2 -mr-1"
                                            title="Remove all links from this profile"
                                        >
                                            <FaTrash size={12} />
                                        </button>
                                    </div>
                                    {/* Links list */}
                                    <div className="px-2 sm:px-5 py-1.5 sm:py-2 space-y-0.5 sm:space-y-1">
                                        {links.map((link) => (
                                            <div
                                                key={`${link.workspaceId}-${link.urlType}`}
                                                className="flex items-center justify-between py-1.5 sm:py-2 px-2 sm:px-3 rounded-lg active:bg-zinc-800/50 group"
                                            >
                                                <div className="flex items-center gap-2 sm:gap-3 min-w-0">
                                                    <span className="text-gray-400 flex-shrink-0">
                                                        {urlTypeIcons[link.urlType] || <FaGlobe size={12} />}
                                                    </span>
                                                    <span className="text-xs sm:text-sm text-gray-300 truncate">{link.title}</span>
                                                    <span className="text-xs text-gray-600 bg-zinc-800 px-1.5 sm:px-2 py-0.5 rounded hidden sm:inline">
                                                        {urlTypeLabels[link.urlType] || link.urlType}
                                                    </span>
                                                </div>
                                                <button
                                                    onClick={() => removeLink(link.workspaceId, link.urlType)}
                                                    className="text-gray-600 active:text-red-400 transition-colors p-2 -mr-1 sm:opacity-0 sm:group-hover:opacity-100"
                                                    title="Remove this link"
                                                >
                                                    <FaTimes size={10} />
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            )}

            {/* Search + Categories Row */}
            <div className="mb-6 sm:mb-8 px-2 sm:px-4">
                <div className="flex flex-col md:flex-row md:items-center gap-3 sm:gap-4 max-w-6xl mx-auto">
                    {/* Search Input - Full width on mobile, fixed width on desktop */}
                    <div className="relative w-full md:w-72 flex-shrink-0">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" size={16} />
                        <input
                            type="text"
                            placeholder="Search profiles..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-10 pr-10 py-2.5 bg-zinc-900/80 border border-zinc-700 rounded-xl text-sm text-white placeholder-zinc-500
                                     focus:outline-none focus:border-zinc-500 transition-colors"
                        />
                        {searchQuery && (
                            <button
                                onClick={() => setSearchQuery('')}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-white p-1 rounded transition-colors"
                            >
                                <FaTimes size={12} />
                            </button>
                        )}
                    </div>

                    {/* Category Pills - Horizontal scroll */}
                    <div className="w-full md:flex-1 overflow-x-auto scrollbar-hide -mx-2 px-2 md:mx-0 md:px-0">
                        <div className="flex items-center gap-2 pb-2 md:pb-0">
                            {allCategories.map((cat) => (
                                <button
                                    key={cat}
                                    onClick={() => handleCategoryChange(cat)}
                                    className={`
                                        flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 rounded-lg text-xs sm:text-sm font-medium whitespace-nowrap transition-all duration-200
                                        ${activeCategory === cat
                                            ? 'bg-white text-zinc-900 shadow-md'
                                            : 'bg-zinc-800/80 text-zinc-400 hover:text-white hover:bg-zinc-700 border border-zinc-700/50'}
                                    `}
                                >
                                    {profileCategoryIcons[cat] || <LayoutGrid size={14} />}
                                    {profileCategoryLabels[cat] || cat}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Grid Layout */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 mb-12">
                {filteredProfiles.map((profile, index) => (
                    <div
                        key={profile.id}
                        className="animate-fade-in-up"
                        style={{ animationDelay: `${index * 50}ms` }}
                    >
                        <ProfileCard
                            workspace={profile}
                            selectionMode={selectionMode}
                            isSelected={isWorkspaceSelected(profile.id)}
                            onSelect={() => toggleWorkspaceSelection(profile.id)}
                        />
                    </div>
                ))}
            </div>

            {/* Empty State */}
            {filteredProfiles.length === 0 && (
                <div className="text-center py-20">
                    <div className="bg-gray-800/50 backdrop-blur-sm w-20 h-20 rounded-3xl flex items-center justify-center mx-auto mb-6 border border-gray-700/50">
                        <FaSearch className="text-gray-400 w-10 h-10" />
                    </div>
                    <h3 className="text-2xl font-semibold text-gray-200 mb-3">No profiles found</h3>
                    <p className="text-gray-500 text-lg mb-6">
                        {searchQuery
                            ? `No results for "${searchQuery}"`
                            : 'Try a different search'}
                    </p>
                    {searchQuery && (
                        <button
                            onClick={() => setSearchQuery('')}
                            className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-2xl hover:scale-105 transition-transform duration-300"
                        >
                            Clear Search
                        </button>
                    )}
                </div>
            )}

            <style>{`
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
