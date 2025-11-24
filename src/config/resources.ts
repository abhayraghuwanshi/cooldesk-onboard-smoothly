export interface Resource {
    id: string;
    title: string;
    description: string;
    url: string;
    category: ResourceCategory;
    icon?: string;
}

export type ResourceCategory =
    | 'privacy'
    | 'contact'
    | 'founder'
    | 'preview';

export const resources: Resource[] = [
    // Privacy & Legal
    {
        id: 'privacy-policy',
        title: 'Privacy Policy',
        description: 'How we handle your data and protect your privacy',
        url: '/privacy-details',
        category: 'privacy',
        icon: '🔒'
    },

    // Contact & Support
    {
        id: 'contact-us',
        title: 'Contact Us',
        description: 'Get in touch with our team for support and inquiries',
        url: '/contact',
        category: 'contact',
        icon: '📧'
    },

    // Founder Notes
    {
        id: 'founder-story',
        title: 'Founder Story',
        description: 'The journey and vision behind CoolDesk',
        url: '/founder',
        category: 'founder',
        icon: '🎯'
    },

    // Preview Gallery
    {
        id: 'preview-gallery',
        title: 'Preview Gallery',
        description: 'Visual tour of CoolDesk interface and features',
        url: '/gallery',
        category: 'preview',
        icon: '🖼️'
    }
];

// Helper functions
export const getResourcesByCategory = (category: ResourceCategory): Resource[] => {
    return resources.filter(resource => resource.category === category);
};

export const getResourceById = (id: string): Resource | undefined => {
    return resources.find(resource => resource.id === id);
};

// Category labels for UI
export const categoryLabels: Record<ResourceCategory, string> = {
    privacy: 'Privacy & Legal',
    contact: 'Contact & Support',
    founder: 'Founder Notes',
    preview: 'CoolDesk Preview'
};
