import { GITHUB_REPO, site } from '@/config/site';
import { useLatestRelease } from '@/hooks/useLatestRelease';
import { Github } from 'lucide-react';

export default function Footer() {
  const release = useLatestRelease();
  return (
    <footer className="relative z-10 border-t border-white/10 bg-black/60 backdrop-blur-sm">
      {/* Top section */}
      <div className="container mx-auto px-6 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <a href="/" className="flex items-center gap-3 group">
              <img
                src="/cooldesk.png"
                alt={`${site.name} logo`}
                className="h-9 w-auto"
                width={256}
                height={256}
                loading="lazy"
              />
            </a>
            <p className="text-sm text-gray-500 max-w-xs leading-relaxed">
              Browser tabs, desktop apps, links, and notes — grouped by project in the app.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <p className="text-[11px] font-semibold text-gray-500 uppercase tracking-widest mb-4">
              Navigation
            </p>
            <ul className="space-y-2.5">
              {[
                { label: 'How to Use', href: '/how-to-use' },
                { label: 'Resources', href: '/resources' },
                { label: 'FAQ', href: '/#faq' },
                { label: 'CoolDesk vs Raycast', href: '/vs/raycast' },
                { label: 'CoolDesk vs Alfred', href: '/vs/alfred' },
              ].map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-sm text-gray-400 hover:text-white transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal & Contact */}
          <div>
            <p className="text-[11px] font-semibold text-gray-500 uppercase tracking-widest mb-4">
              Resources
            </p>
            <ul className="space-y-2.5">
              {[
                { label: 'Privacy Policy', href: '/privacy-details' },
                { label: 'Terms of Service', href: '/terms' },
                { label: 'Contact Us', href: '/contact' },
                { label: 'Blog', href: '/blog' },
              ].map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-sm text-gray-400 hover:text-white transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/5">
        <div className="container mx-auto px-6 py-5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-gray-600 font-mono">
            © {new Date().getFullYear()} {site.name}. All rights reserved.
          </p>
          <div className="flex items-center gap-4 text-xs text-gray-600">
            <span className="flex items-center gap-1.5">
              <span className="w-1 h-1 rounded-full bg-green-400/40" />
              v{release.version}
            </span>
            <span className="text-gray-700">|</span>
            <a
              href={GITHUB_REPO}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 font-mono text-gray-500 hover:text-white transition-colors"
            >
              <Github className="w-3.5 h-3.5" />
              Open Source
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
