/**
 * SPACES CONFIGURATION
 * 
 * Curated community environments that users can join/import.
 * These are more than just workspaces; they can include themes, layouts, and widget presets.
 */

export type SpaceCategory = 'productivity' | 'minimalist' | 'developer' | 'creative' | 'academic' | 'entertainment';

export interface Space {
    id: string;
    title: string;
    description: string;
    category: SpaceCategory;
    tags: string[];
    icon: string;
    theme: {
        name: string;
        color: string;
    };
    author: {
        name: string;
        avatar?: string;
    };
    stats: {
        members: number;
        rating: number;
    };
    config: any; // Space configuration data to be imported
}

export const categoryLabels: Record<SpaceCategory, string> = {
    productivity: 'Productivity',
    minimalist: 'Minimalist',
    developer: 'Developer',
    creative: 'Creative',
    academic: 'Academic',
    entertainment: 'Entertainment'
};

export const spaces: Space[] = [
    {
        id: 'deep-work-space',
        title: 'Deep Work Flow',
        description: 'Designed for focus with minimal distractions, ambient sounds, and task timer integration.',
        category: 'productivity',
        tags: ['Focus', 'Ambient', 'Timer', 'Clean'],
        icon: '🌊',
        theme: { name: 'Deep Sea', color: '#0f172a' },
        author: { name: 'Abhay' },
        stats: { members: 1240, rating: 4.8 },
        config: { theme: 'dark', layout: 'focus', widgets: ['timer', 'ambient'] }
    },
    {
        id: 'dev-command-center',
        title: 'Dev Command Center',
        description: 'Complete setup for developers with quick access to docs, GitHub, and terminal.',
        category: 'developer',
        tags: ['Coding', 'Resources', 'Tech', 'Fast'],
        icon: '💻',
        theme: { name: 'Matrix Night', color: '#052c14' },
        author: { name: 'Cooldesk Team' },
        stats: { members: 3500, rating: 4.9 },
        config: { theme: 'matrix', layout: 'dashboard', widgets: ['github', 'feeds'] }
    },
    {
        id: 'zen-minimalist',
        title: 'Zen Garden',
        description: 'A beautiful, calm setup with soft gradients and the absolute bare essentials.',
        category: 'minimalist',
        tags: ['Zen', 'Calm', 'Beauty', 'Simple'],
        icon: '🌿',
        theme: { name: 'Zen Garden', color: '#f0fdf4' },
        author: { name: 'Sarah J.' },
        stats: { members: 890, rating: 4.7 },
        config: { theme: 'light', layout: 'minimal', widgets: ['clock'] }
    },
    {
        id: 'creative-studio',
        title: 'Creative Studio',
        description: 'Inspiration-focused space for designers and artists with color discovery tools.',
        category: 'creative',
        tags: ['Design', 'Art', 'Color', 'Inspiration'],
        icon: '🎨',
        theme: { name: 'Canvas', color: '#fafaf9' },
        author: { name: 'Design Co.' },
        stats: { members: 2100, rating: 4.6 },
        config: { theme: 'sepia', layout: 'grid', widgets: ['colors', 'gallery'] }
    }
];
