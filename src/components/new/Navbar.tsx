import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { GITHUB_REPO, site } from '@/config/site';
import { trackEvent } from '@/lib/analytics';

const NAV_SECTION = 'navbar';

function trackNavClick(label: string, href: string, source: 'desktop' | 'mobile') {
    trackEvent('nav_link_click', {
        section: NAV_SECTION,
        action: 'click',
        nav_label: label,
        nav_target: href,
        source,
    });
}

interface NavLink {
    href: string;
    label: string;
    /** Anchor links (e.g. /#faq) render as <a>, routes as <Link>. */
    isAnchor?: boolean;
}

interface ResourceGroup {
    label: string;
    links: NavLink[];
}

const resourceGroups: ResourceGroup[] = [
    {
        label: 'Docs',
        links: [
            { href: '/#how-to-use', label: 'Getting Started', isAnchor: true },
            { href: '/releases', label: 'Release Notes' },
            { href: '/under-the-hood', label: 'Under the Hood' },
            { href: '/blog', label: 'Blog' },
            { href: '/#faq', label: 'FAQ', isAnchor: true },
        ],
    },
    {
        label: 'Compare',
        links: [
            { href: '/vs/workona', label: 'vs Workona' },
            { href: '/vs/toby', label: 'vs Toby' },
            { href: '/vs/raycast', label: 'vs Raycast' },
            { href: '/vs/alfred', label: 'vs Alfred' },
            { href: '/vs/spotlight', label: 'vs Spotlight' },
            { href: '/vs/powertoys', label: 'vs PowerToys' },
            { href: '/vs/momentum', label: 'vs Momentum' },
            { href: '/vs/arc', label: 'vs Arc' },
            { href: '/vs/flow-launcher', label: 'vs Flow Launcher' },
            { href: '/vs', label: 'All comparisons →' },
        ],
    },
    {
        label: 'Company',
        links: [
            { href: '/founder', label: 'Founder Story' },
            { href: '/contact', label: 'Contact' },
            { href: '/privacy-details', label: 'Privacy Policy' },
        ],
    },
];

const STARS_KEY = 'cd_github_stars';

/**
 * The repo's star count, fetched once per browser session (GitHub's
 * unauthenticated API allows 60 calls an hour per visitor). Null until it
 * loads, or if it can't; the button then just says "Star".
 */
function useGithubStars(): number | null {
    const [stars, setStars] = useState<number | null>(null);
    useEffect(() => {
        try {
            const cached = sessionStorage.getItem(STARS_KEY);
            if (cached) {
                setStars(Number(cached));
                return;
            }
        } catch {
            // storage blocked: just fetch
        }
        const repo = GITHUB_REPO.replace('https://github.com/', '');
        let alive = true;
        fetch(`https://api.github.com/repos/${repo}`)
            .then((r) => (r.ok ? r.json() : null))
            .then((d) => {
                const n = typeof d?.stargazers_count === 'number' ? d.stargazers_count : null;
                if (!alive || n === null) return;
                setStars(n);
                try {
                    sessionStorage.setItem(STARS_KEY, String(n));
                } catch {
                    // ignore
                }
            })
            .catch(() => {});
        return () => {
            alive = false;
        };
    }, []);
    return stars;
}

const formatStars = (n: number) => (n >= 1000 ? `${(n / 1000).toFixed(n >= 10000 ? 0 : 1)}k` : String(n));

function GithubIcon({ className = '' }: { className?: string }) {
    return (
        <svg className={className} viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
            <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z" />
        </svg>
    );
}

function StarIcon({ className = '' }: { className?: string }) {
    return (
        <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M12 2.5l2.9 6 6.6.9-4.8 4.6 1.2 6.5L12 17.4l-5.9 3.1 1.2-6.5L2.5 9.4l6.6-.9z" />
        </svg>
    );
}

/** "★ Star 1.2k" — links to the repo. `compact` drops the word, for phones. */
function GithubStarButton({ stars, compact = false }: { stars: number | null; compact?: boolean }) {
    return (
        <a
            href={GITHUB_REPO}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackEvent('nav_github_click', { section: NAV_SECTION, action: 'click', stars: stars ?? undefined })}
            aria-label={stars !== null ? `Star CoolDesk on GitHub (${stars} stars)` : 'Star CoolDesk on GitHub'}
            className="group inline-flex h-9 items-center gap-2 rounded-full border border-white/15 bg-white/[0.04] px-3.5 text-sm font-medium text-white/80 transition-colors hover:border-white/25 hover:bg-white/[0.08] hover:text-white"
        >
            <GithubIcon className="h-4 w-4" />
            {!compact && <span>Star</span>}
            {stars !== null && (
                <span className="inline-flex items-center gap-1 border-l border-white/15 pl-2 text-white/60 group-hover:text-white/80">
                    <StarIcon className="h-3.5 w-3.5 text-amber-300 transition-transform group-hover:scale-110 group-hover:rotate-12" />
                    {formatStars(stars)}
                </span>
            )}
        </a>
    );
}

export default function Navbar() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [resourcesOpen, setResourcesOpen] = useState(false);
    const stars = useGithubStars();

    const links: NavLink[] = [
        { href: '/', label: 'Home' },
        { href: '/#how-to-use', label: 'How to Use', isAnchor: true },
        // { href: '/pricing', label: 'Pricing' },
        { href: '/widgets', label: 'Widgets' },
    ];

    const renderDesktopLink = (link: NavLink) =>
        link.isAnchor ? (
            <a
                key={link.href}
                href={link.href}
                onClick={() => trackNavClick(link.label, link.href, 'desktop')}
                className="text-txt-secondary hover:text-txt-primary transition-colors text-sm font-medium"
            >
                {link.label}
            </a>
        ) : (
            <Link
                key={link.href}
                to={link.href}
                onClick={() => trackNavClick(link.label, link.href, 'desktop')}
                className="text-txt-secondary hover:text-txt-primary transition-colors text-sm font-medium"
            >
                {link.label}
            </Link>
        );

    return (
        <nav className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-xl border-b border-white/10">
            <div className="max-w-7xl mx-auto px-6 py-4">
                {/* Logo | links (centred) | GitHub + Download */}
                <div className="flex items-center justify-between md:grid md:grid-cols-[1fr_auto_1fr]">
                    {/* Logo */}
                    <a href="/#home" className="flex items-center gap-2 group ml-2 md:ml-0 md:justify-self-start">
                        <img
                            src="/cooldesk.png"
                            alt={`${site.name} logo`}
                            className="h-10 w-auto"
                            width={256}
                            height={256}
                        />
                    </a>

                    {/* Desktop Links */}
                    <div className="hidden md:flex items-center gap-8">
                        {links.slice(0, 2).map(renderDesktopLink)}

                        {/* Resources dropdown */}
                        <div
                            className="relative"
                            onMouseEnter={() => setResourcesOpen(true)}
                            onMouseLeave={() => setResourcesOpen(false)}
                        >
                            <button
                                onClick={() => setResourcesOpen(!resourcesOpen)}
                                aria-expanded={resourcesOpen}
                                aria-haspopup="true"
                                className="flex items-center gap-1 text-txt-secondary hover:text-txt-primary transition-colors text-sm font-medium"
                            >
                                Resources
                                <svg
                                    className={`w-3.5 h-3.5 transition-transform ${resourcesOpen ? 'rotate-180' : ''}`}
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                </svg>
                            </button>

                            {resourcesOpen && (
                                <div className="absolute left-1/2 -translate-x-1/2 top-full pt-3 w-[460px]">
                                    <div className="bg-black/95 backdrop-blur-xl border border-white/10 rounded-xl p-6 grid grid-cols-3 gap-6 shadow-2xl">
                                        {resourceGroups.map((group) => (
                                            <div key={group.label}>
                                                <p className="text-[11px] font-semibold uppercase tracking-widest text-white/30 mb-3">
                                                    {group.label}
                                                </p>
                                                <ul className="space-y-2">
                                                    {group.links.map((link) => (
                                                        <li key={link.href}>
                                                            {link.isAnchor ? (
                                                                <a
                                                                    href={link.href}
                                                                    onClick={() => {
                                                                        trackNavClick(link.label, link.href, 'desktop');
                                                                        setResourcesOpen(false);
                                                                    }}
                                                                    className="block text-sm text-txt-secondary hover:text-white transition-colors"
                                                                >
                                                                    {link.label}
                                                                </a>
                                                            ) : (
                                                                <Link
                                                                    to={link.href}
                                                                    onClick={() => {
                                                                        trackNavClick(link.label, link.href, 'desktop');
                                                                        setResourcesOpen(false);
                                                                    }}
                                                                    className="block text-sm text-txt-secondary hover:text-white transition-colors"
                                                                >
                                                                    {link.label}
                                                                </Link>
                                                            )}
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>

                        {links.slice(2).map(renderDesktopLink)}
                    </div>

                    {/* Right: GitHub star + Download */}
                    <div className="hidden md:flex items-center gap-2.5 justify-self-end">
                        <GithubStarButton stars={stars} />
                        <a
                            href="/#downloads"
                            onClick={() => trackNavClick('Download', '/#downloads', 'desktop')}
                            className="inline-flex h-9 items-center rounded-full bg-white px-4 text-sm font-semibold text-black transition-transform hover:-translate-y-px"
                        >
                            Download
                        </a>
                    </div>

                    {/* Mobile: GitHub + menu button */}
                    <div className="flex items-center gap-3 md:hidden">
                        <GithubStarButton stars={stars} compact />
                        <button
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                            className="text-gray-300 hover:text-white transition-colors"
                            aria-label="Toggle menu"
                        >
                            {mobileMenuOpen ? (
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            ) : (
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                                </svg>
                            )}
                        </button>
                    </div>
                </div>

                {/* Mobile Menu */}
                {mobileMenuOpen && (
                    <div className="md:hidden mt-4 pb-4 space-y-3 border-t border-white/10 pt-4">
                        {links.map((link) => (
                            <Link
                                key={link.href}
                                to={link.href}
                                onClick={() => {
                                    trackNavClick(link.label, link.href, 'mobile');
                                    setMobileMenuOpen(false);
                                }}
                                className="block text-txt-secondary hover:text-txt-primary transition-colors py-2"
                            >
                                {link.label}
                            </Link>
                        ))}

                        {resourceGroups.map((group) => (
                            <div key={group.label} className="pt-2">
                                <p className="text-[11px] font-semibold uppercase tracking-widest text-white/30 mb-1">
                                    {group.label}
                                </p>
                                {group.links.map((link) =>
                                    link.isAnchor ? (
                                        <a
                                            key={link.href}
                                            href={link.href}
                                            onClick={() => {
                                                trackNavClick(link.label, link.href, 'mobile');
                                                setMobileMenuOpen(false);
                                            }}
                                            className="block text-txt-secondary hover:text-txt-primary transition-colors py-2"
                                        >
                                            {link.label}
                                        </a>
                                    ) : (
                                        <Link
                                            key={link.href}
                                            to={link.href}
                                            onClick={() => {
                                                trackNavClick(link.label, link.href, 'mobile');
                                                setMobileMenuOpen(false);
                                            }}
                                            className="block text-txt-secondary hover:text-txt-primary transition-colors py-2"
                                        >
                                            {link.label}
                                        </Link>
                                    )
                                )}
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </nav>
    );
}
