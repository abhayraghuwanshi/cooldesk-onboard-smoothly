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
    image?: string;
    slug: string;
}

export type BlogCategory =
    | 'productivity'
    | 'features'
    | 'tips'
    | 'updates'
    | 'guides';

// Import blog posts from markdown files
import p2pBlogContent from './blog-posts/p2p-sharing-blog.md?raw';
import voiceNavBlogContent from './blog-posts/voice-navigation-blog.md?raw';

// Parse markdown frontmatter and content
function parseBlogPost(content: string, slug: string, category: BlogCategory = 'features', image: string = '📝'): BlogPost {
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
        image: image
    };
}

export const blogPosts: BlogPost[] = [
    parseBlogPost(p2pBlogContent, 'p2p-collaboration-technical-deep-dive', 'features', '🔗'),
    parseBlogPost(voiceNavBlogContent, 'voice-navigation-hands-free-browsing', 'features', '🎤')
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
