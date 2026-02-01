import { Helmet } from 'react-helmet-async';

interface SEOProps {
    title: string;
    description?: string;
    canonical?: string;
    noindex?: boolean;
}

export default function SEO({ title, description, canonical, noindex = false }: SEOProps) {
    const siteTitle = 'CoolDesk - Browser Autosave & Sharing Extension';

    return (
        <Helmet>
            <title>{title} | {siteTitle}</title>
            <meta name="title" content={`${title} | ${siteTitle}`} />
            {description && <meta name="description" content={description} />}
            <meta name="keywords" content="browser extension, new tab page, custom new tab, free browser extension, no sign-in required, no login browser tool, infinity new tab alternative, browser start page, autosave tabs, share workspaces, productivity dashboard, collaborative browsing, LLM browser assistant, productivity hub" />

            {/* Social Media Tags */}
            <meta property="og:type" content="website" />
            <meta property="og:title" content={`${title} | ${siteTitle}`} />
            {description && <meta property="og:description" content={description} />}
            <meta property="og:url" content={canonical || 'https://cool-desk.com'} />

            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content={`${title} | ${siteTitle}`} />
            {description && <meta name="twitter:description" content={description} />}

            {/* Canonical Tag - Critical for fixing Duplicate Content */}
            {canonical && <link rel="canonical" href={canonical} />}

            {/* NoIndex - Critical for Soft 404s */}
            <meta name="robots" content={noindex ? "noindex, nofollow" : "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1"} />
        </Helmet>
    );
}
