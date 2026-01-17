import { Helmet } from 'react-helmet-async';

interface SEOProps {
    title: string;
    description?: string;
    canonical?: string;
    noindex?: boolean;
}

export default function SEO({ title, description, canonical, noindex = false }: SEOProps) {
    const siteTitle = 'Cooldesk - Voice Navigation & AI Productivity Extension';

    return (
        <Helmet>
            <title>{title} | Cooldesk</title>
            <meta name="title" content={`${title} | Cooldesk`} />
            {description && <meta name="description" content={description} />}

            {/* Social Media Tags */}
            <meta property="og:title" content={`${title} | Cooldesk`} />
            {description && <meta property="og:description" content={description} />}

            <meta name="twitter:title" content={`${title} | Cooldesk`} />
            {description && <meta name="twitter:description" content={description} />}

            {/* Canonical Tag - Critical for fixing Duplicate Content */}
            {canonical && <link rel="canonical" href={canonical} />}

            {/* NoIndex - Critical for Soft 404s */}
            {noindex && <meta name="robots" content="noindex, nofollow" />}
        </Helmet>
    );
}
