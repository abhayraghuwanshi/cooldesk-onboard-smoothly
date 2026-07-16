import { useState } from 'react';
import { Link } from 'react-router-dom';
import { site } from '@/config/site';
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
            { href: '/how-to-use', label: 'Getting Started' },
            { href: '/releases', label: 'Release Notes' },
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

export default function Navbar() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [resourcesOpen, setResourcesOpen] = useState(false);

    const links: NavLink[] = [
        { href: '/', label: 'Home' },
        { href: '/how-to-use', label: 'How to Use' },
        // { href: '/pricing', label: 'Pricing' },
        { href: '/library', label: 'Library' },
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
                <div className="flex items-center justify-between">
                    {/* Logo */}
                    <a href="/#home" className="flex items-center gap-2 group ml-2 md:ml-4">
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

                    {/* Mobile Menu Button */}
                    <button
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        className="md:hidden text-gray-300 hover:text-white transition-colors"
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
