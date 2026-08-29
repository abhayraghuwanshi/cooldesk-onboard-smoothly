export interface BlogPost {
    id: string;
    title: string;
    description: string;
    content: string;
    author: string;
    date: string;
    readTime: string;
    category: BlogCategory;
    tags: string[];
    icon?: string;
    slug: string;
    /** When set, the blog card links to this route instead of /blog/:slug (e.g. /vs/ comparison pages). */
    href?: string;
}

export type BlogCategory =
    | 'productivity'
    | 'features'
    | 'tips'
    | 'updates'
    | 'guides'
    | 'comparisons';

// Import blog posts from markdown files
// Import blog posts from markdown files
// Import blog posts from markdown files
import aiIntegrationBlogContent from './blog-posts/ai-integration-browser-agents.md?raw';
import autosaveProductivityContent from './blog-posts/autosave-productivity.md?raw';
import bestNewTabExtensionsContent from './blog-posts/best-new-tab-extensions.md?raw';
import bookmarksVsRecallContent from './blog-posts/bookmarks-vs-recall.md?raw';
import browserAmnesiaContent from './blog-posts/browser-amnesia.md?raw';
import chatLinkLifecycleContent from './blog-posts/chat-link-lifecycle.md?raw';
import costOfTabHoardingContent from './blog-posts/cost-of-tab-hoarding.md?raw';
import llmAiProductivityContent from './blog-posts/llm-ai-productivity.md?raw';
import newTabLogicScrapperContent from './blog-posts/new-tab-logic-scrapper.md?raw';
import newTabSeoContent from './blog-posts/new-tab-seo-guide.md?raw';
import noHabitChangeContent from './blog-posts/no-habit-change-productivity.md?raw';
import p2pBlogContent from './blog-posts/p2p-sharing-blog.md?raw';
import productivityToolFailureContent from './blog-posts/productivity-tool-failure.md?raw';
import raycastAlternativesContent from './blog-posts/raycast-alternatives-windows.md?raw';
import saveForLaterFailContent from './blog-posts/save-for-later-fail.md?raw';
import savingVsOwningContent from './blog-posts/saving-vs-owning.md?raw';
import searchGoogleAlgoContent from './blog-posts/search-google-algo.md?raw';
import semanticSearchHistoryContent from './blog-posts/semantic-search-llm-history.md?raw';
import tabsToTracesContent from './blog-posts/tabs-to-traces.md?raw';
import voiceNavBlogContent from './blog-posts/voice-navigation-blog.md?raw';
import wastedNewTabContent from './blog-posts/wasted-new-tab.md?raw';

// Parse markdown frontmatter and content
function parseBlogPost(content: string, slug: string, category: BlogCategory = 'features', icon: string = 'FileText'): BlogPost {
    const lines = content.split('\n');
    let title = '';
    let firstHeading = '';

    // Find first # heading for title
    for (const line of lines) {
        if (line.startsWith('# ')) {
            firstHeading = line.replace('# ', '').trim();
            title = firstHeading;
            break;
        }
    }

    // Generate description from first paragraph
    let description = '';
    let foundHeading = false;
    let tags: string[] = [];

    for (const line of lines) {
        if (line.startsWith('# ')) {
            foundHeading = true;
            continue;
        }
        if (foundHeading && line.trim() && !line.startsWith('#') && !line.startsWith('Tags:')) {
            if (!description) description = line.trim().slice(0, 200);
        }

        // Simple tag parsing: looking for a line "Tags: tag1, tag2"
        if (line.startsWith('Tags:')) {
            tags = line.replace('Tags:', '').split(',').map(tag => tag.trim());
        }
    }

    return {
        id: slug,
        slug: slug,
        title: title || 'Untitled',
        description: description || 'Read more...',
        content: content,
        author: 'CoolDesk Team',
        date: new Date().toISOString().split('T')[0],
        readTime: Math.ceil(content.split(' ').length / 200) + ' min read',
        category: category,
        tags: tags.length > 0 ? tags : ['productivity', 'browser'], // Fallback tags
        icon: icon
    };
}

// Comparison pages (/vs/:slug) surfaced as blog cards. The card links to the
// canonical /vs/ URL — there is no /blog/ version of these, to avoid duplicate content.
function comparisonCard(slug: string, title: string, description: string, date: string): BlogPost {
    return {
        id: `vs-${slug}`,
        slug: `vs-${slug}`,
        href: `/vs/${slug}`,
        title,
        description,
        content: '',
        author: 'CoolDesk Team',
        date,
        readTime: '4 min read',
        category: 'comparisons',
        tags: ['comparison', 'alternatives'],
        icon: 'ArrowLeftRight',
    };
}

export const blogPosts: BlogPost[] = [
    parseBlogPost(raycastAlternativesContent, 'raycast-alternatives-windows', 'guides', 'Search'),
    comparisonCard(
        'workona',
        'CoolDesk vs Workona — An Honest Comparison',
        'Workona is the standard for browser workspaces — cloud-synced and team-ready. CoolDesk is a free, local-first project workspace that reaches beyond the browser to your apps, files and notes.',
        '2026-07-16',
    ),
    comparisonCard(
        'toby',
        'CoolDesk vs Toby — An Honest Comparison',
        'Toby is a beloved visual tab organizer. CoolDesk is a free, local-first project workspace that adds desktop apps, files, notes and spotlight search. An honest comparison of the two new tabs.',
        '2026-07-16',
    ),
    comparisonCard(
        'raycast',
        'CoolDesk vs Raycast — An Honest Comparison',
        'Raycast is a brilliant command palette. CoolDesk is a launcher built around your projects — it remembers what you\'re working on. An honest comparison for Windows and Mac.',
        '2026-07-05',
    ),
    comparisonCard(
        'alfred',
        'CoolDesk vs Alfred — An Honest Comparison',
        'Alfred is a Mac classic with powerful workflows. CoolDesk is a free launcher for Windows and Mac, built around your projects. An honest comparison — including when to pick Alfred.',
        '2026-07-05',
    ),
    parseBlogPost(newTabSeoContent, 'the-untapped-power-of-new-tab', 'productivity', 'Layout'),
    parseBlogPost(searchGoogleAlgoContent, 'universal-search-future-of-browsing', 'features', 'Search'),
    parseBlogPost(autosaveProductivityContent, 'magic-of-browser-autosave', 'productivity', 'Save'),
    parseBlogPost(aiIntegrationBlogContent, 'browser-as-agentic-os-ai-integration', 'updates', 'Brain'),
    parseBlogPost(p2pBlogContent, 'p2p-collaboration-technical-deep-dive', 'features', 'Share2'),
    parseBlogPost(voiceNavBlogContent, 'voice-navigation-hands-free-browsing', 'features', 'Mic'),
    parseBlogPost(browserAmnesiaContent, 'fighting-browser-amnesia', 'productivity', 'CloudOff'),
    parseBlogPost(costOfTabHoardingContent, 'the-hidden-cost-of-tab-hoarding', 'productivity', 'BarChart3'),
    parseBlogPost(wastedNewTabContent, 'wasted-new-tab', 'productivity', 'Layout'),
    parseBlogPost(newTabLogicScrapperContent, 'new-tab-content-scraper', 'features', 'Layout'),
    parseBlogPost(bookmarksVsRecallContent, 'bookmarks-vs-recall', 'features', 'Search'),
    parseBlogPost(savingVsOwningContent, 'saving-vs-owning', 'tips', 'BookOpen'),
    parseBlogPost(tabsToTracesContent, 'tabs-to-traces', 'features', 'Route'),
    parseBlogPost(chatLinkLifecycleContent, 'chat-link-lifecycle', 'tips', 'MessageSquare'),
    parseBlogPost(semanticSearchHistoryContent, 'semantic-search-browser-history', 'features', 'Sparkles'),
    parseBlogPost(productivityToolFailureContent, 'productivity-tool-failure', 'tips', 'RefreshCw'),
    parseBlogPost(saveForLaterFailContent, 'save-for-later-fail', 'tips', 'Bookmark'),
    parseBlogPost(noHabitChangeContent, 'no-habit-change-productivity', 'productivity', 'Zap'),
    parseBlogPost(llmAiProductivityContent, 'llm-ai-productivity', 'features', 'Cpu'),
    parseBlogPost(bestNewTabExtensionsContent, 'best-new-tab-extensions', 'guides', 'Layout'),
];

export const getCategoryLabel = (category: BlogCategory): string => {
    const labels: Record<BlogCategory, string> = {
        productivity: 'Productivity',
        features: 'Features',
        tips: 'Tips & Tricks',
        updates: 'Updates',
        guides: 'Guides',
        comparisons: 'Comparisons'
    };
    return labels[category];
};

export const getBlogPostBySlug = (slug: string): BlogPost | undefined => {
    // Entries with `href` are link-only cards (comparison pages) — they have no /blog/:slug page.
    return blogPosts.find(post => post.slug === slug && !post.href);
};

export const getBlogsByCategory = (category: BlogCategory): BlogPost[] => {
    return blogPosts.filter(post => post.category === category);
};

export const getLatestBlogs = (count: number = 3): BlogPost[] => {
    return [...blogPosts]
        .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
        .slice(0, count);
};
