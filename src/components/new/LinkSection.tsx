import { useMemo, useState } from 'react';
import { FaCheck, FaChevronDown, FaChevronUp, FaCode, FaCoffee, FaDesktop, FaExternalLinkAlt, FaGlobe, FaHashtag, FaPen, FaPlus, FaSearch, FaShoppingBag, FaTimes } from 'react-icons/fa';

// --- DATA SECTION ---

// Mapped and ranked dataset for Cooldesk
const RAW_DATA = {
    "Social": [
        // --- TIER 1: GIANTS ---
        "facebook.com", "instagram.com", "x.com", "reddit.com", "linkedin.com",
        "discord.com", "whatsapp.com", "tiktok.com", "pinterest.com", "telegram.org",
        "snapchat.com", "twitch.tv",
        // --- TIER 2: ALPHABETICAL ---
        "9gag.com", "ask.fm", "band.us", "beacons.ai", "bereal.com", "bitclout.com",
        "blueskyweb.xyz", "clubhouse.com", "flickr.com", "flipboard.com", "gab.com",
        "goodreads.com", "imgur.com", "kakaotalk.com", "letterboxd.com",
        "mastodon.social", "meetup.com", "mewe.com", "myspace.com", "nextdoor.com",
        "producthunt.com", "quora.com", "rumble.com", "slack.com", "stackoverflow.com",
        "threads.net", "tumblr.com", "vk.com", "wechat.com", "weibo.com", "xing.com"
    ],

    "Entertainment": [
        // --- TIER 1: GIANTS ---
        "youtube.com", "netflix.com", "spotify.com", "twitch.tv", "imdb.com",
        "disneyplus.com", "hulu.com", "primevideo.com", "espn.com", "soundcloud.com",
        // --- TIER 2: ALPHABETICAL ---
        "9anime.to", "abc.com", "adultswim.com", "allmusic.com", "applemusic.com",
        "audible.com", "bandcamp.com", "bbc.co.uk/iplayer", "billboard.com",
        "crunchyroll.com", "dailymotion.com", "dazn.com", "deezer.com", "f1.com",
        "fifa.com", "funimation.com", "hbomax.com", "hotstar.com", "last.fm",
        "letterboxd.com", "metacritic.com", "mlb.com", "nba.com", "nfl.com",
        "paramountplus.com", "peacocktv.com", "plex.tv", "rottentomatoes.com",
        "steamcommunity.com", "ted.com", "tidal.com", "vimeo.com", "wwe.com"
    ],

    "Productivity": [
        // --- TIER 1: GIANTS ---
        "google.com", "mail.google.com", "drive.google.com", "outlook.live.com",
        "notion.so", "zoom.us", "dropbox.com", "slack.com", "trello.com",
        // --- TIER 2: ALPHABETICAL ---
        "asana.com", "atlassian.com", "basecamp.com", "calendly.com", "clickup.com",
        "clockify.me", "confluence.atlassian.com", "docusign.com", "evernote.com",
        "focusmate.com", "grammarly.com", "ifttt.com", "jira.com", "loom.com",
        "microsoft.com/office", "miro.com", "monday.com", "obsidian.md", "onenote.com",
        "protonmail.com", "todoist.com", "toggl.com", "transfer.zip", "wetransfer.com",
        "workflowy.com", "zapier.com", "zoho.com"
    ],

    "AI & Tools": [
        // --- TIER 1: GIANTS ---
        "chatgpt.com", "openai.com", "gemini.google.com", "claude.ai",
        "perplexity.ai", "midjourney.com", "huggingface.co",
        // --- TIER 2: ALPHABETICAL ---
        "auth0.com", "aws.amazon.com", "blackbox.ai", "character.ai", "civitai.com",
        "copy.ai", "deepl.com", "elevenlabs.io", "firefly.adobe.com", "jasper.ai",
        "leonardo.ai", "phind.com", "poe.com", "quillbot.com", "replicate.com",
        "runwayml.com", "stability.ai", "synthesia.io", "vercel.com"
    ],

    "Dev & Tech": [
        // --- TIER 1: GIANTS ---
        "github.com", "stackoverflow.com", "gitlab.com", "dev.to", "vercel.com",
        "news.ycombinator.com", "hashnode.com",
        // --- TIER 2: ALPHABETICAL ---
        "bitbucket.org", "canzi.com", "codepen.io", "codesandbox.io", "css-tricks.com",
        "docker.com", "freecodecamp.org", "geeksforgeeks.org", "kaggle.com",
        "leetcode.com", "linux.org", "medium.com/tag/programming", "mongodb.com",
        "npmjs.com", "producthunt.com", "pypi.org", "react.dev", "replit.com",
        "smashingmagazine.com", "supabase.com", "w3schools.com"
    ],

    "Design": [
        // --- TIER 1: GIANTS ---
        "figma.com", "canva.com", "dribbble.com", "behance.net", "pinterest.com",
        "unsplash.com",
        // --- TIER 2: ALPHABETICAL ---
        "adobe.com", "artstation.com", "awwwards.com", "blender.org", "coolors.co",
        "creativemarket.com", "deviantart.com", "flaticon.com", "fontshare.com",
        "freepik.com", "iconscout.com", "land-book.com", "lottiefiles.com",
        "mixkit.co", "mobbin.com", "pexels.com", "pixabay.com", "remove.bg",
        "scribd.com", "shutterstock.com", "sketch.com", "spline.design", "thenounproject.com"
    ],

    "News": [
        // --- TIER 1: GIANTS ---
        "bbc.com", "cnn.com", "nytimes.com", "forbes.com", "bloomberg.com",
        "reuters.com", "theverge.com",
        // --- TIER 2: ALPHABETICAL ---
        "aljazeera.com", "apnews.com", "arstechnica.com", "axios.com",
        "businessinsider.com", "cnbc.com", "economist.com", "engadget.com",
        "foxnews.com", "ft.com", "gizmodo.com", "hbr.org", "huffpost.com",
        "investopedia.com", "medium.com", "msnbc.com", "nationalgeographic.com",
        "newyorker.com", "npr.org", "politico.com", "techcrunch.com", "theguardian.com",
        "time.com", "usatoday.com", "vice.com", "vox.com", "washingtonpost.com",
        "wired.com", "wsj.com"
    ],

    "Lifestyle": [
        // --- TIER 1: GIANTS ---
        "amazon.com", "ebay.com", "walmart.com", "booking.com", "airbnb.com",
        "uber.com", "chase.com", "paypal.com", "aliexpress.com",
        // --- TIER 2: ALPHABETICAL (Mixed Shopping, Travel, Finance, Health) ---
        "aa.com", "adidas.com", "agoda.com", "americanexpress.com", "asos.com",
        "bankofamerica.com", "bestbuy.com", "binance.com", "coinbase.com",
        "costco.com", "craigslist.org", "delta.com", "doordash.com", "etsy.com",
        "expedia.com", "fitbit.com", "flipkart.com", "gap.com", "healthline.com",
        "hm.com", "homedepot.com", "hotels.com", "ikea.com", "kayak.com", "lowes.com",
        "macys.com", "mayoclinic.org", "myfitnesspal.com", "nike.com", "robinhood.com",
        "samsung.com", "shein.com", "shopify.com", "skyscanner.com", "southwest.com",
        "starbucks.com", "strava.com", "stripe.com", "target.com", "tripadvisor.com",
        "ubereats.com", "united.com", "wayfair.com", "webmd.com", "wellsfargo.com",
        "yelp.com", "zara.com", "zillow.com"
    ]
};

const getCategories = () => Object.keys(RAW_DATA);

const getLinksByCategory = (category) => {
    return RAW_DATA[category] || [];
};

const formatDomainName = (domain) => {
    return domain.replace('www.', '').split('/')[0];
};

// --- COMPONENT SECTION ---

// Icon mapping for categories
const CATEGORY_ICONS = {
    "Social": <FaHashtag size={18} />,
    "Entertainment": <FaDesktop size={18} />,
    "Productivity": <FaCoffee size={18} />,
    "AI & Tools": <FaCode size={18} />,
    "Dev & Tech": <FaCode size={18} />,
    "Design": <FaPen size={18} />,
    "News": <FaGlobe size={18} />,
    "Lifestyle": <FaShoppingBag size={18} />,
};

// Privacy-friendly color generator based on domain name
const getDomainColor = (domain) => {
    const colors = [
        'bg-red-500', 'bg-orange-500', 'bg-amber-500', 'bg-green-500',
        'bg-emerald-500', 'bg-teal-500', 'bg-cyan-500', 'bg-blue-500',
        'bg-indigo-500', 'bg-violet-500', 'bg-purple-500', 'bg-fuchsia-500',
        'bg-pink-500', 'bg-rose-500'
    ];
    let hash = 0;
    for (let i = 0; i < domain.length; i++) {
        hash = domain.charCodeAt(i) + ((hash << 5) - hash);
    }
    return colors[Math.abs(hash) % colors.length];
};

// Selected link interface
interface SelectedLink {
    domain: string;
    url: string;
    title: string;
}

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

// Helper Component for Individual Links to handle Image Error State cleanly
const LinkItem = ({ link, selectionMode, isSelected, onSelect }: {
    link: string;
    selectionMode: boolean;
    isSelected: boolean;
    onSelect: () => void;
}) => {
    const [imgError, setImgError] = useState(false);
    const domainName = formatDomainName(link);
    const displayChar = domainName.substring(0, 2).toUpperCase();
    const colorClass = getDomainColor(domainName);
    const fullUrl = link.startsWith('http') ? link : `https://${link}`;

    // Use Google's reliable favicon service. size=128 ensures high DPI/Retina crispness
    const iconUrl = `https://www.google.com/s2/favicons?domain=${domainName}&sz=128`;

    // Handle select button click - always triggers selection
    const handleSelectClick = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        onSelect();
    };

    return (
        <div
            className={`group relative flex flex-col rounded-2xl overflow-hidden transition-all duration-300
                 ${isSelected
                    ? 'ring-2 ring-green-500 shadow-lg shadow-green-500/20'
                    : 'hover:shadow-xl hover:shadow-black/20 hover:-translate-y-1'}`}
        >
            {/* Card Background */}
            <div className="absolute inset-0 bg-zinc-900/90 backdrop-blur-sm" />

            {/* Selection overlay */}
            {isSelected && (
                <div className="absolute inset-0 bg-green-500/10 z-10" />
            )}

            {/* Content */}
            <div className="relative z-20 p-4">
                {/* Top row: Icon + Add button */}
                <div className="flex items-start justify-between mb-3">
                    {/* Icon Container */}
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center overflow-hidden
                             transition-transform duration-300 group-hover:scale-105
                             ${!imgError ? 'bg-white p-2' : colorClass}`}>
                        {!imgError ? (
                            <img
                                src={iconUrl}
                                alt={domainName}
                                className="w-full h-full object-contain"
                                onError={() => setImgError(true)}
                            />
                        ) : (
                            <span className="text-white font-bold text-lg">{displayChar}</span>
                        )}
                    </div>

                    {/* Add/Check button */}
                    <button
                        onClick={handleSelectClick}
                        className={`w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-200
                            ${isSelected
                                ? 'bg-green-500 text-white'
                                : 'bg-zinc-800 border border-zinc-700 text-zinc-500 hover:border-fuchsia-500 hover:text-fuchsia-400 hover:bg-zinc-700'}`}
                        title={isSelected ? 'Selected' : 'Add to CoolDesk'}
                    >
                        {isSelected ? <FaCheck size={12} /> : <FaPlus size={12} />}
                    </button>
                </div>

                {/* Domain name */}
                <h3 className="text-sm font-medium text-white truncate mb-3">
                    {domainName}
                </h3>

                {/* Visit button */}
                <a
                    href={fullUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="flex items-center justify-center gap-2 w-full py-2 rounded-lg
                             bg-zinc-800 hover:bg-zinc-700 border border-zinc-700 hover:border-zinc-600
                             text-xs font-medium text-zinc-400 hover:text-white transition-all duration-200"
                >
                    <span>Visit</span>
                    <FaExternalLinkAlt size={10} />
                </a>
            </div>
        </div>
    );
};

const LinkSection = () => {
    const categories = getCategories();
    const [activeCategory, setActiveCategory] = useState(categories[0]);
    const [searchQuery, setSearchQuery] = useState('');

    // Selection mode state
    const [selectionMode, setSelectionMode] = useState(false);
    const [selectedLinks, setSelectedLinks] = useState<SelectedLink[]>([]);
    const [showDropdown, setShowDropdown] = useState(false);
    const [workspaceName, setWorkspaceName] = useState('');

    // Get links for current category
    const currentLinks = getLinksByCategory(activeCategory);

    // Filter based on search
    const filteredLinks = useMemo(() => {
        if (!searchQuery) return currentLinks;
        return currentLinks.filter(link =>
            link.toLowerCase().includes(searchQuery.toLowerCase())
        );
    }, [activeCategory, searchQuery, currentLinks]);

    // Toggle link selection
    const toggleLinkSelection = (link: string) => {
        if (!selectionMode) {
            setSelectionMode(true);
        }

        const domainName = formatDomainName(link);
        const fullUrl = link.startsWith('http') ? link : `https://${link}`;
        const isSelected = selectedLinks.some(l => l.domain === domainName);

        if (isSelected) {
            setSelectedLinks(prev => prev.filter(l => l.domain !== domainName));
        } else {
            setSelectedLinks(prev => [...prev, {
                domain: domainName,
                url: fullUrl,
                title: domainName
            }]);
        }
    };

    // Check if link is selected
    const isLinkSelected = (link: string) => {
        const domainName = formatDomainName(link);
        return selectedLinks.some(l => l.domain === domainName);
    };

    // Remove a single link
    const removeLink = (domain: string) => {
        setSelectedLinks(prev => {
            const newLinks = prev.filter(l => l.domain !== domain);
            if (newLinks.length === 0) {
                setSelectionMode(false);
                setShowDropdown(false);
            }
            return newLinks;
        });
    };

    // Get default workspace name
    const getDefaultWorkspaceName = () => {
        if (selectedLinks.length === 1) {
            return selectedLinks[0].title;
        }
        return `My ${activeCategory} Links (${selectedLinks.length})`;
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

    return (
        <div className="w-full max-w-7xl mx-auto">

            {/* Selection Mode Banner */}
            {selectionMode && (
                <div className="sticky top-0 z-50 mb-4 sm:mb-8 mx-2 sm:mx-4 bg-zinc-900/95 backdrop-blur-xl border-2 border-fuchsia-500/50 rounded-xl sm:rounded-2xl shadow-xl overflow-hidden"
                    style={{ boxShadow: '0 0 30px rgba(168, 85, 247, 0.2)' }}>
                    <div className="p-3 sm:p-5">
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4">
                            {/* Left side - Selection info */}
                            <button
                                onClick={() => selectedLinks.length > 0 && setShowDropdown(!showDropdown)}
                                className={`flex items-center gap-2 sm:gap-3 ${selectedLinks.length > 0 ? 'cursor-pointer active:opacity-80' : 'cursor-default'} transition-opacity`}
                            >
                                <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center text-sm sm:text-base font-bold flex-shrink-0
                                    ${selectedLinks.length > 0
                                        ? 'bg-gradient-to-r from-green-500 to-emerald-500 text-white shadow-lg shadow-green-500/40'
                                        : 'bg-fuchsia-500/20 border-2 border-dashed border-fuchsia-500/50 text-fuchsia-400'}`}>
                                    {selectedLinks.length > 0 ? selectedLinks.length : '?'}
                                </div>
                                <div className="text-left min-w-0">
                                    <h4 className="text-white font-semibold flex items-center gap-2 text-sm sm:text-base">
                                        {selectedLinks.length === 0
                                            ? 'Select links'
                                            : `${selectedLinks.length} ${selectedLinks.length === 1 ? 'link' : 'links'}`}
                                        {selectedLinks.length > 0 && (
                                            showDropdown ? <FaChevronUp size={10} className="text-gray-400" /> : <FaChevronDown size={10} className="text-gray-400" />
                                        )}
                                    </h4>
                                    <p className="text-xs sm:text-sm text-gray-400 truncate">
                                        {selectedLinks.length === 0
                                            ? 'Tap any card to select'
                                            : `Tap to ${showDropdown ? 'hide' : 'edit'}`}
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
                                    <span>{selectedLinks.length > 0 ? 'Clear' : 'Cancel'}</span>
                                </button>
                                {selectedLinks.length > 0 && (
                                    <button
                                        onClick={handleAddToCoolDesk}
                                        className="flex-1 sm:flex-initial flex items-center justify-center gap-2 px-4 sm:px-6 py-2 sm:py-2.5 bg-gradient-to-r from-violet-600 via-fuchsia-600 to-pink-600
                                                 active:from-violet-500 active:via-fuchsia-500 active:to-pink-500
                                                 rounded-lg sm:rounded-xl text-xs sm:text-sm font-bold text-white
                                                 shadow-lg shadow-fuchsia-500/40 transition-all duration-300"
                                    >
                                        <FaPlus size={12} />
                                        <span>Add {selectedLinks.length}</span>
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Dropdown panel showing selected links */}
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
                                             focus:outline-none focus:border-fuchsia-500 focus:ring-1 focus:ring-fuchsia-500/50 transition-all"
                                />
                            </div>

                            {/* Links list */}
                            <div className="px-2 sm:px-5 py-1.5 sm:py-2 space-y-0.5 sm:space-y-1">
                                {selectedLinks.map((link) => (
                                    <div
                                        key={link.domain}
                                        className="flex items-center justify-between py-1.5 sm:py-2 px-2 sm:px-3 rounded-lg active:bg-zinc-800/50 group"
                                    >
                                        <div className="flex items-center gap-2 sm:gap-3 min-w-0">
                                            <img
                                                src={`https://www.google.com/s2/favicons?domain=${link.domain}&sz=32`}
                                                alt={link.domain}
                                                className="w-5 h-5 rounded flex-shrink-0"
                                            />
                                            <span className="text-xs sm:text-sm text-gray-300 truncate">{link.domain}</span>
                                        </div>
                                        <button
                                            onClick={() => removeLink(link.domain)}
                                            className="text-gray-600 active:text-red-400 transition-colors p-2 -mr-1 sm:opacity-0 sm:group-hover:opacity-100"
                                            title="Remove this link"
                                        >
                                            <FaTimes size={10} />
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            )}

            {/* Search + Categories Row */}
            <div className="mb-6 sm:mb-8 px-2 sm:px-4">
                <div className="flex flex-col md:flex-row md:items-center gap-3 sm:gap-4 max-w-6xl mx-auto">
                    {/* Search Input - Full width on mobile, fixed width on desktop */}
                    <div className="relative w-full md:w-64 flex-shrink-0">
                        <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" size={14} />
                        <input
                            type="text"
                            placeholder={`Search ${activeCategory}...`}
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-9 pr-4 py-2.5 bg-zinc-900/80 border border-zinc-700 rounded-xl text-sm text-white placeholder-zinc-500
                                     focus:outline-none focus:border-zinc-500 transition-colors"
                        />
                    </div>

                    {/* Category Pills - Horizontal scroll */}
                    <div className="w-full md:flex-1 overflow-x-auto scrollbar-hide -mx-2 px-2 md:mx-0 md:px-0">
                        <div className="flex items-center gap-2 pb-2 md:pb-0">
                            {categories.map((cat) => (
                                <button
                                    key={cat}
                                    onClick={() => {
                                        setActiveCategory(cat);
                                        setSearchQuery('');
                                    }}
                                    className={`
                                        flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 rounded-lg text-xs sm:text-sm font-medium whitespace-nowrap transition-all duration-200
                                        ${activeCategory === cat
                                            ? 'bg-white text-zinc-900 shadow-md'
                                            : 'bg-zinc-800/80 text-zinc-400 hover:text-white hover:bg-zinc-700 border border-zinc-700/50'}
                                    `}
                                >
                                    {CATEGORY_ICONS[cat] || <FaHashtag size={14} />}
                                    {cat}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Grid Layout */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
                {filteredLinks.map((link) => (
                    <LinkItem
                        key={link}
                        link={link}
                        selectionMode={selectionMode}
                        isSelected={isLinkSelected(link)}
                        onSelect={() => toggleLinkSelection(link)}
                    />
                ))}
            </div>

            {/* Empty State */}
            {filteredLinks.length === 0 && (
                <div className="text-center py-20">
                    <div className="bg-gray-800/50 backdrop-blur-sm w-20 h-20 rounded-3xl flex items-center justify-center mx-auto mb-6 border border-gray-700/50">
                        <FaSearch className="text-gray-400 w-10 h-10" />
                    </div>
                    <h3 className="text-2xl font-semibold text-gray-200 mb-3">No links found</h3>
                    <p className="text-gray-500 text-lg">
                        Try searching for something else in {activeCategory}.
                    </p>
                </div>
            )}
        </div>
    );
};

export default LinkSection;