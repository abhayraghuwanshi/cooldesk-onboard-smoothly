import { useMemo, useState } from 'react';
import { FaCode, FaCoffee, FaDesktop, FaExternalLinkAlt, FaGlobe, FaHashtag, FaPen, FaSearch, FaShoppingBag } from 'react-icons/fa';
import { Input } from '../ui/input';

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

// Helper Component for Individual Links to handle Image Error State cleanly
const LinkItem = ({ link }) => {
    const [imgError, setImgError] = useState(false);
    const domainName = formatDomainName(link);
    const displayChar = domainName.substring(0, 2).toUpperCase();
    const colorClass = getDomainColor(domainName);
    const fullUrl = link.startsWith('http') ? link : `https://${link}`;

    // Use Google's reliable favicon service. size=128 ensures high DPI/Retina crispness
    const iconUrl = `https://www.google.com/s2/favicons?domain=${domainName}&sz=128`;

    return (
        <a
            href={fullUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative flex flex-col items-center p-6 rounded-3xl bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-md 
                 border border-white/20 hover:border-blue-400/50
                 hover:shadow-2xl hover:shadow-blue-500/10 hover:-translate-y-2 transition-all duration-500 ease-out"
        >
            {/* Glow effect on hover */}
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-blue-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

            {/* Icon Container */}
            <div className={`relative w-14 h-14 rounded-2xl flex items-center justify-center mb-4 
                     shadow-lg group-hover:shadow-xl group-hover:scale-110 transition-all duration-500 overflow-hidden z-10
                     ${!imgError ? 'bg-white/90 p-3' : colorClass}`}>

                {!imgError ? (
                    <img
                        src={iconUrl}
                        alt={domainName}
                        className="w-full h-full object-contain"
                        onError={() => setImgError(true)}
                    />
                ) : (
                    <span className="text-white font-bold text-xl">{displayChar}</span>
                )}
            </div>

            {/* Text Info */}
            <div className="text-center w-full z-10">
                <h3 className="text-sm font-semibold text-gray-200 dark:text-gray-100 truncate w-full mb-2">
                    {domainName}
                </h3>
                <div className="flex items-center justify-center gap-1.5 text-xs text-blue-400 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-1 group-hover:translate-y-0">
                    <span className="font-medium">Visit</span>
                    <FaExternalLinkAlt size={8} />
                </div>
            </div>
        </a>
    );
};

const LinkSection = () => {
    const categories = getCategories();
    const [activeCategory, setActiveCategory] = useState(categories[0]);
    const [searchQuery, setSearchQuery] = useState('');

    // Get links for current category
    const currentLinks = getLinksByCategory(activeCategory);

    // Filter based on search
    const filteredLinks = useMemo(() => {
        if (!searchQuery) return currentLinks;
        return currentLinks.filter(link =>
            link.toLowerCase().includes(searchQuery.toLowerCase())
        );
    }, [activeCategory, searchQuery, currentLinks]);

    return (
        <div className="w-full max-w-7xl mx-auto p-6 lg:p-8">

            {/* Header & Search */}
            <div className="text-center mb-16">
                <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-4">
                    <FaGlobe className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 text-blue-500" />
                    Discovery Hub
                </h2>
                <p className="text-gray-400 text-lg sm:text-xl mb-12 max-w-3xl mx-auto leading-relaxed px-4">
                    Explore the web's best sites, organized by category. Find what you need, fast.
                </p>

                <div className="relative max-w-lg mx-auto px-4">
                    <Input
                        type="text"
                        placeholder={`Search ${activeCategory}...`}
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>
            </div>

            {/* Category Navigation */}
            <div className="flex flex-wrap justify-center gap-3 mb-12">
                {categories.map((cat) => (
                    <button
                        key={cat}
                        onClick={() => {
                            setActiveCategory(cat);
                            setSearchQuery(''); // Reset search on category change
                        }}
                        className={`
                            flex items-center gap-2.5 px-4 sm:px-6 py-3 rounded-2xl text-sm font-semibold whitespace-nowrap 
                            transition-all duration-300 transform hover:scale-105
                            ${activeCategory === cat
                                ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg shadow-blue-500/25'
                                : 'bg-gray-800/50 text-gray-300 hover:bg-gray-700/50 border border-gray-700/50 hover:border-gray-600/50'}
                        `}
                    >
                        {CATEGORY_ICONS[cat] || <FaHashtag size={16} />}
                        {cat}
                    </button>
                ))}
            </div>

            {/* Grid Layout */}
            < div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6" >
                {
                    filteredLinks.map((link) => (
                        <LinkItem key={link} link={link} />
                    ))
                }
            </div >

            {/* Empty State */}
            {
                filteredLinks.length === 0 && (
                    <div className="text-center py-20">
                        <div className="bg-gray-800/50 backdrop-blur-sm w-20 h-20 rounded-3xl flex items-center justify-center mx-auto mb-6 border border-gray-700/50">
                            <FaSearch className="text-gray-400 w-10 h-10" />
                        </div>
                        <h3 className="text-2xl font-semibold text-gray-200 mb-3">No links found</h3>
                        <p className="text-gray-500 text-lg">
                            Try searching for something else in {activeCategory}.
                        </p>
                    </div>
                )
            }
        </div >
    );
};

export default LinkSection;