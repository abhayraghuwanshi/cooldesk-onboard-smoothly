import {
    categoryLabels,
    searchWorkspaces,
    WorkspaceCategory,
    workspaces,
} from '@/config/workspaces';
import {
    Brain,
    Code,
    Film,
    LayoutGrid,
    Megaphone,
    Palette,
    Rocket,
    Search,
    Sparkles,
} from 'lucide-react';
import { useMemo, useState } from 'react';
import { FaBook, FaChevronDown, FaChevronUp, FaDiscord, FaGamepad, FaGithub, FaGlobe, FaNpm, FaPlay, FaPlus, FaSearch, FaTimes, FaTrash } from 'react-icons/fa';
import WorkspaceCard from './WorkspaceCard';

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

const ITEMS_PER_PAGE = 16; // Show 16 workspaces initially (4 rows of 4 on wide screens)

// Lifecycle stages — collapse the ~38 raw categories into the phases of building something.
// Every WorkspaceCategory maps into exactly one stage.
const LIFECYCLE_STAGES: { id: string; label: string; icon: JSX.Element; categories: WorkspaceCategory[] }[] = [
    {
        id: 'design', label: 'Design', icon: <Palette size={14} />,
        categories: ['design-systems', 'design-tools', 'animation', 'image-generation'],
    },
    {
        id: 'build', label: 'Build', icon: <Code size={14} />,
        categories: ['frontend', 'backend', 'fullstack', 'mobile', 'database', 'apis', 'dev-tools', 'automation', 'storage', 'other'],
    },
    {
        id: 'ai', label: 'AI & Data', icon: <Brain size={14} />,
        categories: ['ai-ml', 'llm-tools', 'data-analytics', 'voice-ai'],
    },
    {
        id: 'ship', label: 'Ship', icon: <Rocket size={14} />,
        categories: ['deployment', 'hosting', 'cloud-services', 'devops', 'monitoring', 'security', 'authentication', 'testing', 'startup-product'],
    },
    {
        id: 'grow', label: 'Grow', icon: <Megaphone size={14} />,
        categories: ['marketing', 'seo', 'email', 'analytics', 'ecommerce', 'cms', 'crm', 'payments', 'collaboration', 'project-management'],
    },
    {
        id: 'create', label: 'Create', icon: <Film size={14} />,
        categories: ['video-editing', 'music-production', 'audio-editing', 'podcasting'],
    },
];

// Short AI-style overview shown at the top of each sub-category section.
const CATEGORY_OVERVIEWS: Partial<Record<WorkspaceCategory, string>> = {
    'design-systems': 'Component libraries and UI kits that hand you accessible, ready-made building blocks — so you ship consistent interfaces without redesigning every button.',
    'design-tools': 'Tools for designing, prototyping, and handing off interfaces, from quick wireframes to pixel-perfect mockups developers can build straight from.',
    'animation': 'Libraries and apps for adding motion — micro-interactions, transitions, and animated graphics that make a UI feel alive.',
    'image-generation': 'AI models that turn text prompts into images, handy for mockups, assets, and fast creative exploration.',
    'frontend': 'Frameworks, build tools, and component libraries for building the part of your app users actually see and click.',
    'backend': 'Runtimes, web frameworks, and server tooling for the logic, APIs, and data handling behind your app.',
    'fullstack': 'End-to-end frameworks covering both frontend and backend, so a small team can ship a whole app from one codebase.',
    'mobile': 'Frameworks for building iOS and Android apps — often from a single codebase you can also ship to the web.',
    'database': 'Databases and data platforms for storing, querying, and scaling your data — SQL, serverless, and real-time options.',
    'apis': 'Services and gateways for building, connecting, and consuming the APIs that glue your app to the outside world.',
    'dev-tools': 'Everyday developer utilities — languages, package managers, bundlers, and containers — that speed up how you write and ship code.',
    'automation': 'Tools that connect your apps and automate repetitive workflows, so routine tasks happen without manual steps.',
    'storage': 'Object and file storage for keeping uploads, assets, and backups durable and fast to retrieve.',
    'other': "Useful tools that don't fit one neat category but still earn a place in a builder's toolkit.",
    'ai-ml': 'Frameworks, models, and platforms for building, training, and running machine-learning and AI features in your product.',
    'llm-tools': 'Frameworks and SDKs for building on top of large language models — orchestration, agents, and AI-powered interfaces.',
    'data-analytics': 'Tools for collecting, analyzing, and visualizing data, turning raw numbers into product and business decisions.',
    'voice-ai': 'Speech platforms for text-to-speech, transcription, and natural-sounding generated audio.',
    'deployment': 'Platforms that take your code live, handling builds, scaling, and infrastructure so you can ship fast.',
    'hosting': 'Hosting and edge platforms for serving your site or app close to users with minimal setup.',
    'cloud-services': 'Cloud building blocks — compute, edge functions, and managed services — for running apps at scale.',
    'devops': 'Build systems, monorepo tools, and pipelines that keep larger codebases fast to build, test, and release.',
    'monitoring': 'Observability platforms for tracking errors, performance, and uptime so you catch problems before users do.',
    'security': 'Tools for protecting your app and data, from secrets management to vulnerability scanning.',
    'authentication': "Drop-in auth and user-management services that handle login, sessions, and identity so you don't roll your own.",
    'testing': 'Frameworks for unit, integration, and end-to-end testing to catch bugs before they reach production.',
    'startup-product': 'Platforms commonly bundled into a modern startup stack — hosting, backend, auth, and monitoring.',
    'marketing': 'Tools for reaching and converting an audience through campaigns, content, and growth experiments.',
    'seo': 'Tools for improving search visibility — keyword research, technical audits, and ranking insights.',
    'email': 'Email APIs and platforms for sending reliable transactional and marketing email from your app.',
    'analytics': 'Product and web analytics for understanding how people use your app and where they drop off.',
    'ecommerce': 'Platforms for selling online — storefronts, carts, and checkout that scale from first sale to high volume.',
    'cms': 'Content management systems for creating and structuring content your site or app pulls in via API or templates.',
    'crm': 'Customer relationship tools for tracking leads, deals, and conversations across sales and support.',
    'payments': 'Payment infrastructure for accepting money online — subscriptions, one-off charges, and global checkout.',
    'collaboration': "Workspaces and docs tools that keep a team's notes, plans, and knowledge in one shared place.",
    'project-management': 'Issue trackers and planning tools that keep work organized, prioritized, and moving.',
    'video-editing': 'Editors and AI tools for cutting, polishing, and generating video — from social clips to pro post-production.',
    'music-production': 'DAWs and sample platforms for composing, recording, and producing music.',
    'audio-editing': 'Tools for recording, cleaning up, and mastering audio across podcasts, music, and video.',
    'podcasting': 'Recording, hosting, and distribution platforms for producing and publishing a podcast.',
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

export default function WorkspaceSection() {
    const [activeStage, setActiveStage] = useState<string>('all');
    const [searchQuery, setSearchQuery] = useState('');
    const [displayCount, setDisplayCount] = useState(ITEMS_PER_PAGE);

    // Selection mode state - tracks individual links
    const [selectionMode, setSelectionMode] = useState(false);
    const [selectedLinks, setSelectedLinks] = useState<SelectedLink[]>([]);
    const [showDropdown, setShowDropdown] = useState(false);
    const [workspaceName, setWorkspaceName] = useState('');

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

        const workspace = workspaces.find(w => w.id === workspaceId);
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

    const activeStageDef = LIFECYCLE_STAGES.find(s => s.id === activeStage);

    // Filter workspaces based on lifecycle stage and search
    const filteredWorkspaces = useMemo(() => {
        const stage = LIFECYCLE_STAGES.find(s => s.id === activeStage);
        let filtered = searchQuery.trim() ? searchWorkspaces(searchQuery) : workspaces;
        if (stage) {
            filtered = filtered.filter(ws => stage.categories.includes(ws.category));
        }
        return filtered;
    }, [activeStage, searchQuery]);

    // Workspaces to display (with pagination) — used for the flat "All" view
    const displayedWorkspaces = filteredWorkspaces.slice(0, displayCount);
    const hasMore = displayCount < filteredWorkspaces.length;
    const totalCount = filteredWorkspaces.length;

    // When a stage is active, break it into sub-sections by underlying category
    // (Build → Frontend, Backend, Database…; AI & Data → AI/ML, LLM Tools…)
    const subSections = useMemo(() => {
        if (!activeStageDef) return [];
        return activeStageDef.categories
            .map(cat => ({ cat, label: categoryLabels[cat] ?? cat, items: filteredWorkspaces.filter(w => w.category === cat) }))
            .filter(group => group.items.length > 0);
    }, [activeStageDef, filteredWorkspaces]);

    // Reset display count when filters change
    const handleStageChange = (id: string) => {
        setActiveStage(id);
        setSearchQuery('');
        setDisplayCount(ITEMS_PER_PAGE);
    };

    const loadMore = () => {
        setDisplayCount(prev => prev + ITEMS_PER_PAGE);
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
                                            ? 'Select workspaces'
                                            : `${selectedWorkspaceIds.size} ${selectedWorkspaceIds.size === 1 ? 'workspace' : 'workspaces'}`}
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
                                    Workspace Name
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
                                            title="Remove all links from this workspace"
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

            {/* Compact Filter Bar - Search + Categories together */}
            <div className="mb-6 sm:mb-10 px-2 sm:px-4">
                {/* Search and Category stacked on mobile, row on desktop */}
                <div className="flex flex-col md:flex-row md:items-center gap-3 sm:gap-4 max-w-6xl mx-auto">
                    {/* Search Input - Full width on mobile, fixed width on desktop */}
                    <div className="relative w-full md:w-72 flex-shrink-0">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={16} />
                        <input
                            type="text"
                            placeholder="Search..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-10 pr-4 py-2.5 bg-zinc-900/60 border border-zinc-700 rounded-xl text-sm text-white placeholder-gray-500
                                     focus:outline-none focus:border-fuchsia-500/50 transition-colors"
                        />
                    </div>

                    {/* Lifecycle Stage Pills - the phases of building something */}
                    <div className="w-full md:flex-1 overflow-x-auto scrollbar-hide -mx-2 px-2 md:mx-0 md:px-0">
                        <div className="flex items-center gap-2 pb-2 md:pb-0">
                            <button
                                onClick={() => handleStageChange('all')}
                                className={`flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 sm:py-2.5 rounded-xl text-xs sm:text-sm font-semibold whitespace-nowrap transition-all duration-200
                                    ${activeStage === 'all'
                                        ? 'bg-white text-zinc-900 shadow-lg shadow-white/20'
                                        : 'bg-zinc-800/80 text-gray-300 hover:text-white hover:bg-zinc-700 border border-zinc-700/50'}`}
                            >
                                <LayoutGrid size={14} />
                                All
                            </button>
                            {LIFECYCLE_STAGES.map((stage) => (
                                <button
                                    key={stage.id}
                                    onClick={() => handleStageChange(stage.id)}
                                    className={`flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 sm:py-2.5 rounded-xl text-xs sm:text-sm font-semibold whitespace-nowrap transition-all duration-200
                                        ${activeStage === stage.id
                                            ? 'bg-white text-zinc-900 shadow-lg shadow-white/20'
                                            : 'bg-zinc-800/80 text-gray-300 hover:text-white hover:bg-zinc-700 border border-zinc-700/50'}`}
                                >
                                    {stage.icon}
                                    {stage.label}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {activeStageDef ? (
                /* Stage view — grouped into sub-sections by category */
                <div className="space-y-12 mb-12">
                    {subSections.map(({ cat, label, items }) => (
                        <section key={cat}>
                            <div className="flex items-baseline gap-3 mb-3 px-1">
                                <h2 className="text-lg font-semibold text-txt-primary">{label}</h2>
                                <span className="text-sm text-txt-muted">{items.length}</span>
                                <div className="flex-1 h-px bg-zinc-800" />
                            </div>
                            {CATEGORY_OVERVIEWS[cat] && (
                                <div className="flex gap-2.5 mb-5 px-1 max-w-3xl">
                                    <Sparkles size={15} className="text-fuchsia-400 mt-0.5 flex-shrink-0" />
                                    <p className="text-sm text-txt-secondary leading-relaxed">
                                        <span className="font-medium text-txt-primary">AI overview · </span>
                                        {CATEGORY_OVERVIEWS[cat]}
                                    </p>
                                </div>
                            )}
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                                {items.map((workspace) => (
                                    <WorkspaceCard
                                        key={workspace.id}
                                        workspace={workspace}
                                        selectionMode={selectionMode}
                                        isSelected={isWorkspaceSelected(workspace.id)}
                                        onSelect={() => toggleWorkspaceSelection(workspace.id)}
                                    />
                                ))}
                            </div>
                        </section>
                    ))}
                </div>
            ) : (
                /* "All" view — flat paginated grid */
                <>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mb-12">
                        {displayedWorkspaces.map((workspace, index) => (
                            <div
                                key={workspace.id}
                                className="animate-fade-in-up"
                                style={{ animationDelay: `${Math.min(index, 8) * 40}ms` }}
                            >
                                <WorkspaceCard
                                    workspace={workspace}
                                    selectionMode={selectionMode}
                                    isSelected={isWorkspaceSelected(workspace.id)}
                                    onSelect={() => toggleWorkspaceSelection(workspace.id)}
                                />
                            </div>
                        ))}
                    </div>

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
                </>
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
                            ? `No results for "${searchQuery}"${activeStageDef ? ` in ${activeStageDef.label}` : ''}`
                            : 'Try selecting a different stage'}
                    </p>
                    {(searchQuery || activeStage !== 'all') && (
                        <button
                            onClick={() => {
                                setSearchQuery('');
                                setActiveStage('all');
                            }}
                            className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-2xl hover:scale-105 transition-transform duration-300"
                        >
                            Clear Filters
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

                @keyframes slide-up {
                    from {
                        opacity: 0;
                        transform: translate(-50%, 100%);
                    }
                    to {
                        opacity: 1;
                        transform: translate(-50%, 0);
                    }
                }

                .animate-fade-in {
                    animation: fade-in 0.8s ease-out forwards;
                }

                .animate-fade-in-up {
                    opacity: 0;
                    animation: fade-in-up 0.6s ease-out forwards;
                }

                .animate-slide-up {
                    animation: slide-up 0.3s ease-out forwards;
                }
            `}</style>
        </div>
    );
}
