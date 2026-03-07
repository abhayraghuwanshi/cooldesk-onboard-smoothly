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
// Import blog posts from markdown files
// Import blog posts from markdown files
import aiIntegrationBlogContent from './blog-posts/ai-integration-browser-agents.md?raw';
import autosaveProductivityContent from './blog-posts/autosave-productivity.md?raw';
import browserAmnesiaContent from './blog-posts/browser-amnesia.md?raw';
import costOfTabHoardingContent from './blog-posts/cost-of-tab-hoarding.md?raw';
import newTabSeoContent from './blog-posts/new-tab-seo-guide.md?raw';
import p2pBlogContent from './blog-posts/p2p-sharing-blog.md?raw';
import searchGoogleAlgoContent from './blog-posts/search-google-algo.md?raw';
import voiceNavBlogContent from './blog-posts/voice-navigation-blog.md?raw';

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

export const blogPosts: BlogPost[] = [
    parseBlogPost(newTabSeoContent, 'the-untapped-power-of-new-tab', 'productivity', 'Layout'),
    parseBlogPost(searchGoogleAlgoContent, 'universal-search-future-of-browsing', 'features', 'Search'),
    parseBlogPost(autosaveProductivityContent, 'magic-of-browser-autosave', 'productivity', 'Save'),
    parseBlogPost(aiIntegrationBlogContent, 'browser-as-agentic-os-ai-integration', 'updates', 'Brain'),
    parseBlogPost(p2pBlogContent, 'p2p-collaboration-technical-deep-dive', 'features', 'Share2'),
    parseBlogPost(voiceNavBlogContent, 'voice-navigation-hands-free-browsing', 'features', 'Mic'),
    parseBlogPost(browserAmnesiaContent, 'fighting-browser-amnesia', 'productivity', 'CloudOff'),
    parseBlogPost(costOfTabHoardingContent, 'the-hidden-cost-of-tab-hoarding', 'productivity', 'BarChart3')
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
