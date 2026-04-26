import { Helmet } from 'react-helmet-async';

interface SEOProps {
    title: string;
    description?: string;
    canonical?: string;
    noindex?: boolean;
}

export default function SEO({ title, description, canonical, noindex = false }: SEOProps) {
    return (
        <Helmet>
            <title>{title}</title>
            <meta name="title" content={title} />
            {description && <meta name="description" content={description} />}
            <meta name="keywords" content="developer workspace, new tab page, browser extension, project workspace, spotlight search, tab management, free browser extension, no sign-in required, productivity dashboard, AI workspace" />

            {/* Open Graph */}
            <meta property="og:type" content="website" />
            <meta property="og:title" content={title} />
            {description && <meta property="og:description" content={description} />}
            <meta property="og:url" content={canonical || 'https://cool-desk.com'} />
            <meta property="og:image" content="https://cool-desk.com/cooldesk.png" />

            {/* Twitter */}
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content={title} />
            {description && <meta name="twitter:description" content={description} />}
            <meta name="twitter:image" content="https://cool-desk.com/cooldesk.png" />

            {canonical && <link rel="canonical" href={canonical} />}
            <meta name="robots" content={noindex ? "noindex, nofollow" : "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1"} />
        </Helmet>
    );
}
