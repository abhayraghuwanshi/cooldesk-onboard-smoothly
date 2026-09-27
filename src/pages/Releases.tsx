import Footer from '@/components/new/Footer';
import Navbar from '@/components/new/Navbar';
import SEO from '@/components/SEO';
import { RELEASES_REPO, releaseUrl, releases } from '@/config/releases';
import { Link } from 'react-router-dom';

function formatDate(iso: string) {
    return new Date(`${iso}T00:00:00Z`).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        timeZone: 'UTC',
    });
}

function NoteList({ label, items, accent }: { label: string; items: string[]; accent: string }) {
    return (
        <div className="mt-4">
            <p className={`text-xs font-semibold uppercase tracking-[0.14em] mb-2 ${accent}`}>{label}</p>
            <ul className="space-y-2">
                {items.map((item) => (
                    <li key={item} className="flex items-start gap-3 text-zinc-300 text-sm leading-relaxed">
                        <span className={`mt-2 w-1.5 h-1.5 rounded-full flex-shrink-0 bg-current ${accent}`} />
                        <span>{item}</span>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default function ReleasesPage() {
    return (
        <main className="min-h-screen text-white scroll-smooth">
            <SEO
                title="CoolDesk Release Notes — Updates & New Features"
                description="Every CoolDesk release — new features and fixes for the desktop app and browser extension, from the first desktop release to Linux support."
                canonical="https://cool-desk.com/releases"
            />
            {/* Background Glow Overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-transparent to-purple-600/10 pointer-events-none z-0" />
            <Navbar />

            {/* Releases Section */}
            <section className="relative z-10 py-24">
                <div className="container mx-auto px-6 max-w-4xl">
                    {/* Header */}
                    <div className="text-center mb-16">
                        <Link
                            to="/"
                            className="inline-flex items-center text-zinc-400 hover:text-white mb-6 transition-colors"
                        >
                            <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                            </svg>
                            Back to Home
                        </Link>
                        <h1 className="text-4xl md:text-5xl font-black mb-4">
                            Release Notes
                        </h1>
                        <p className="text-zinc-400 text-lg">
                            Track all updates, new features, and improvements in CoolDesk
                        </p>
                    </div>

                    {/* Timeline */}
                    <div className="relative">
                        {/* Timeline line */}
                        <div className="absolute left-8 top-0 bottom-0 w-px bg-gradient-to-b from-blue-500 via-purple-500 to-zinc-800" />

                        {/* Release Cards */}
                        <div className="space-y-8">
                            {releases.map((release, index) => (
                                <div key={release.version} className="relative pl-20">
                                    {/* Timeline dot */}
                                    <div className={`absolute left-6 w-5 h-5 rounded-full border-4 ${release.isMajor
                                            ? 'bg-blue-500 border-blue-400 shadow-lg shadow-blue-500/50'
                                            : 'bg-zinc-900 border-zinc-700'
                                        }`} />

                                    {/* Card */}
                                    <div className={`bg-zinc-900/50 border rounded-xl p-6 transition-all hover:bg-zinc-900 ${release.isMajor
                                            ? 'border-blue-500/50 hover:border-blue-400/70'
                                            : 'border-zinc-800 hover:border-zinc-700'
                                        }`}>
                                        {/* Version Header */}
                                        <div className="flex flex-wrap items-center gap-3">
                                            <span className={`text-2xl font-bold ${release.isMajor ? 'text-blue-400' : 'text-white'
                                                }`}>
                                                v{release.version}
                                            </span>
                                            {release.isMajor && (
                                                <span className="px-2 py-1 bg-blue-500/20 text-blue-400 text-xs font-semibold rounded-full">
                                                    Major Release
                                                </span>
                                            )}
                                            {index === 0 && (
                                                <span className="px-2 py-1 bg-green-500/20 text-green-400 text-xs font-semibold rounded-full">
                                                    Latest
                                                </span>
                                            )}
                                            <time dateTime={release.date} className="text-sm text-zinc-500 sm:ml-auto">
                                                {formatDate(release.date)}
                                            </time>
                                        </div>
                                        {release.summary && (
                                            <p className="mt-2 text-zinc-400">{release.summary}</p>
                                        )}

                                        {release.added && <NoteList label="Added" items={release.added} accent="text-blue-400" />}
                                        {release.fixed && <NoteList label="Fixed" items={release.fixed} accent="text-emerald-400" />}

                                        <a
                                            href={releaseUrl(release)}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="mt-5 inline-flex items-center gap-1 text-sm text-zinc-500 hover:text-white transition-colors"
                                        >
                                            Downloads &amp; full notes on GitHub
                                            <span aria-hidden="true">→</span>
                                        </a>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* All releases */}
                    <div className="mt-16 text-center">
                        <a
                            href={`${RELEASES_REPO}/releases`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-zinc-500 hover:text-white text-sm transition-colors"
                        >
                            See all releases on GitHub →
                        </a>
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    );
}
