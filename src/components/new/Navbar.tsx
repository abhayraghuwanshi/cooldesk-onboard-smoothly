import { useState } from 'react';
import { Link } from 'react-router-dom';

export default function Navbar() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    const links = [
        { href: '/', label: 'Home', isRoute: true },
        { href: '/how-to-use', label: 'How to Use', isRoute: true },
        { href: '/pricing', label: 'Pricing', isRoute: true },
        { href: '/resources', label: 'Resources', isRoute: true },
        { href: '/search', label: 'Search', isRoute: true },
    ];

    return (
        <nav className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-xl border-b border-white/10">
            <div className="max-w-7xl mx-auto px-6 py-4">
                <div className="flex items-center justify-between">
                    {/* Logo */}
                    <a href="/#home" className="flex items-center gap-2 group">
                        <img
                            src="/cooldesk.png"
                            alt="CoolDesk logo"
                            className="h-10 w-auto"
                        />
                    </a>

                    {/* Desktop Links */}
                    <div className="hidden md:flex items-center gap-8">
                        {links.map((link) => (
                            link.isRoute ? (
                                <Link
                                    key={link.href}
                                    to={link.href}
                                    className="text-txt-secondary hover:text-txt-primary transition-colors text-sm font-medium"
                                >
                                    {link.label}
                                </Link>
                            ) : (
                                <a
                                    key={link.href}
                                    href={link.href}
                                    className="text-txt-secondary hover:text-txt-primary transition-colors text-sm font-medium"
                                >
                                    {link.label}
                                </a>
                            )
                        ))}
                    </div>

                    {/* CTA Button */}
                    <div className="hidden md:block">
                        <a
                            href="https://chromewebstore.google.com/detail/cooldesk/ioggffobciopdddacpclplkeodllhjko"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn-primary btn-md font-semibold"
                        >
                            Get Started
                        </a>
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
                            link.isRoute ? (
                                <Link
                                    key={link.href}
                                    to={link.href}
                                    onClick={() => setMobileMenuOpen(false)}
                                    className="block text-txt-secondary hover:text-txt-primary transition-colors py-2"
                                >
                                    {link.label}
                                </Link>
                            ) : (
                                <a
                                    key={link.href}
                                    href={link.href}
                                    onClick={() => setMobileMenuOpen(false)}
                                    className="block text-txt-secondary hover:text-txt-primary transition-colors py-2"
                                >
                                    {link.label}
                                </a>
                            )
                        ))}
                        <a
                            href="/#get-started"
                            onClick={() => setMobileMenuOpen(false)}
                            className="btn-primary btn-md font-semibold text-center block mt-4"
                        >
                            Get Started
                        </a>
                    </div>
                )}
            </div>
        </nav>
    );
}