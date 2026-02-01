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
}

export type BlogCategory =
    | 'productivity'
    | 'features'
    | 'tips'
    | 'updates'
    | 'guides';

// Import blog posts from markdown files
import aiIntegrationBlogContent from './blog-posts/ai-integration-browser-agents.md?raw';
import bookmarksVsRecallContent from './blog-posts/bookmarks-vs-recall.md?raw';
import browserAmnesiaContent from './blog-posts/browser-amnesia.md?raw';
import chatLinkLifecycleContent from './blog-posts/chat-link-lifecycle.md?raw';
import costOfTabHoardingContent from './blog-posts/cost-of-tab-hoarding.md?raw';
import llmAiBlogContent from './blog-posts/llm-ai-productivity.md?raw';
import newTabScrapperBlogContent from './blog-posts/new-tab-logic-scrapper.md?raw';
import noHabitChangeContent from './blog-posts/no-habit-change-productivity.md?raw';
import p2pBlogContent from './blog-posts/p2p-sharing-blog.md?raw';
import productivityToolFailureContent from './blog-posts/productivity-tool-failure.md?raw';
import saveForLaterFailContent from './blog-posts/save-for-later-fail.md?raw';
import savingVsOwningContent from './blog-posts/saving-vs-owning.md?raw';
import semanticSearchBlogContent from './blog-posts/semantic-search-llm-history.md?raw';
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
    for (const line of lines) {
        if (line.startsWith('# ')) {
            foundHeading = true;
            continue;
        }
        if (foundHeading && line.trim() && !line.startsWith('#')) {
            description = line.trim().slice(0, 200);
            break;
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
        tags: [],
        icon: icon
    };
}

export const blogPosts: BlogPost[] = [
    parseBlogPost(p2pBlogContent, 'p2p-collaboration-technical-deep-dive', 'features', 'Share2'),
    parseBlogPost(voiceNavBlogContent, 'voice-navigation-hands-free-browsing', 'features', 'Mic'),
    parseBlogPost(llmAiBlogContent, 'ai-powered-productivity-llm-transformation', 'guides', 'Cpu'),
    parseBlogPost(newTabScrapperBlogContent, 'beyond-the-bookmark-intelligent-new-tab', 'features', 'Layers'),
    parseBlogPost(semanticSearchBlogContent, 'the-end-of-the-keyword-llm-search-future', 'tips', 'Search'),
    parseBlogPost(aiIntegrationBlogContent, 'browser-as-agentic-os-ai-integration', 'updates', 'Brain'),
    parseBlogPost(bookmarksVsRecallContent, 'the-problem-isnt-bookmarks-its-recall', 'tips', 'History'),
    parseBlogPost(browserAmnesiaContent, 'fighting-browser-amnesia', 'productivity', 'CloudOff'),
    parseBlogPost(chatLinkLifecycleContent, 'chat-link-lifecycle-management', 'guides', 'Link'),
    parseBlogPost(costOfTabHoardingContent, 'the-hidden-cost-of-tab-hoarding', 'productivity', 'BarChart3'),
    parseBlogPost(noHabitChangeContent, 'productivity-without-habit-change', 'tips', 'Zap'),
    parseBlogPost(productivityToolFailureContent, 'why-your-productivity-tools-are-failing', 'productivity', 'XCircle'),
    parseBlogPost(saveForLaterFailContent, 'the-save-for-later-failure-mode', 'tips', 'Clock'),
    parseBlogPost(savingVsOwningContent, 'document-saving-vs-knowledge-owning', 'guides', 'Book'),
    parseBlogPost(tabsToTracesContent, 'transforming-tabs-into-digital-traces', 'features', 'Activity'),
    parseBlogPost(wastedNewTabContent, 'the-wasted-potential-of-your-new-tab', 'productivity', 'Sparkles')
];

export const getCategoryLabel = (category: BlogCategory): string => {
    const labels: Record<BlogCategory, string> = {
        productivity: 'Productivity',
        features: 'Features',
        tips: 'Tips & Tricks',
        updates: 'Updates',
        guides: 'Guides'
    };
    return labels[category];
};

export const getBlogPostBySlug = (slug: string): BlogPost | undefined => {
    return blogPosts.find(post => post.slug === slug);
};

export const getBlogsByCategory = (category: BlogCategory): BlogPost[] => {
    return blogPosts.filter(post => post.category === category);
};

export const getLatestBlogs = (count: number = 3): BlogPost[] => {
    return [...blogPosts]
        .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
        .slice(0, count);
};
