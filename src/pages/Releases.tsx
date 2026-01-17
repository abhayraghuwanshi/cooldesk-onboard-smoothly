import Navbar from '@/components/new/Navbar';
import { Link } from 'react-router-dom';

interface Release {
    version: string;
    date?: string;
    features: string[];
    isMajor?: boolean;
}

const releases: Release[] = [
    {
        version: '1.0.1',
        features: [
            'Team Screen UI fixes - fixes for create, invite and join team',
            'Speed and memory improvement',
            'Workspace Shell UI improvement with on hover expansion since it covers some screen size'
        ]
    },
    {
        version: '1.0.0',
        features: [
            'UI revamp with significant improvement from last release',
            'New Team UI',
            'Spatial navigation horizontal based',
            'Button available on every page to highlight on page, sticky notes and voice control start'
        ],
        isMajor: true
    },
    {
        version: '0.0.3',
        features: [
            'Layout and bug fixes',
            'Wallpaper support',
            'UI fixes'
        ]
    },
    {
        version: '0.0.2',
        features: [
            'Horizontal layout with drag and drop section',
            'Bug fix and UI improvement',
            'Voice command fixes'
        ]
    },
    {
        version: '0.0.1',
        features: [
            'Notes',
            'Workspace categorization',
            'Search and activity track',
            'Favorite',
            'Voice navigation',
            'Horizontal layout'
        ]
    }
];

export default function ReleasesPage() {
    return (
        <main className="min-h-screen bg-black text-white scroll-smooth">
            {/* Background Glow Overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-transparent to-purple-600/10 pointer-events-none z-0" />
            <Navbar />

            {/* Releases Section */}
            <section className="relative z-10 py-24">
                <div className="container mx-auto px-6 max-w-4xl">
                    {/* Header */}
                    <div className="text-center mb-16">
                        <Link
                            to="/resources"
                            className="inline-flex items-center text-zinc-400 hover:text-white mb-6 transition-colors"
                        >
                            <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                            </svg>
                            Back to Resources
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
                                    <div className={`absolute left-6 w-5 h-5 rounded-full border-4 ${
                                        release.isMajor
                                            ? 'bg-blue-500 border-blue-400 shadow-lg shadow-blue-500/50'
                                            : 'bg-zinc-900 border-zinc-700'
                                    }`} />

                                    {/* Card */}
                                    <div className={`bg-zinc-900/50 border rounded-xl p-6 transition-all hover:bg-zinc-900 ${
                                        release.isMajor
                                            ? 'border-blue-500/50 hover:border-blue-400/70'
                                            : 'border-zinc-800 hover:border-zinc-700'
                                    }`}>
                                        {/* Version Header */}
                                        <div className="flex items-center gap-3 mb-4">
                                            <span className={`text-2xl font-bold ${
                                                release.isMajor ? 'text-blue-400' : 'text-white'
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
                                        </div>

                                        {/* Features List */}
                                        <ul className="space-y-2">
                                            {release.features.map((feature, featureIndex) => (
                                                <li key={featureIndex} className="flex items-start gap-3 text-zinc-300">
                                                    <svg className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                                    </svg>
                                                    <span>{feature}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Footer */}
                    <div className="mt-16 text-center">
                        <p className="text-zinc-500 text-sm">
                            More updates coming soon. Stay tuned!
                        </p>
                    </div>
                </div>
            </section>
        </main>
    );
}
