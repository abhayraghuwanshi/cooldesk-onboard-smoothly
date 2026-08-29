import { Play } from 'lucide-react';
import { useState } from 'react';

interface TutorialVideo {
    videoId: string;
    title: string;
    description: string;
}

// One video per topic from the CoolDesk usage playlist (youtube.com/playlist?list=PLRu0-50I8F2A).
const tutorialVideos: TutorialVideo[] = [
    {
        videoId: 'i-YWjZbntoM',
        title: '3 Ways to Use CoolDesk: Full Desktop, Sidebar & Dock Mode',
        description: 'Full Desktop, Sidebar, or Dock — see all three layouts and pick the one that fits your flow.',
    },
    {
        videoId: 'RYt17aXt6e8',
        title: 'New Tab by CoolDesk',
        description: 'A tour of the CoolDesk new tab — projects, tabs, notes, and apps in one view.',
    },
    {
        videoId: '4t4GZeTl8mY',
        title: 'Build a Custom Widget in 20 Seconds',
        description: 'Add a custom widget to your new tab in under 20 seconds.',
    },
    {
        videoId: 'aRP8MLp4Dt8',
        title: 'CoolDesk Spotlight: Search Everything, Ask AI',
        description: 'One shortcut to search tabs, files, and apps — or ask AI — from anywhere.',
    },
];

function TutorialVideoCard({ video }: { video: TutorialVideo }) {
    const [playing, setPlaying] = useState(false);

    return (
        <div className="group/card relative rounded-[20px] border border-white/10 bg-white/[0.02] overflow-hidden hover:border-white/20 transition-colors">
            <div className="relative aspect-video overflow-hidden bg-[#0A0A0A]">
                {playing ? (
                    <iframe
                        className="absolute inset-0 w-full h-full"
                        src={`https://www.youtube.com/embed/${video.videoId}?autoplay=1`}
                        title={video.title}
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        allowFullScreen
                    />
                ) : (
                    <button
                        type="button"
                        onClick={() => setPlaying(true)}
                        aria-label={`Play video: ${video.title}`}
                        className="absolute inset-0 w-full h-full group"
                    >
                        <img
                            src={`https://img.youtube.com/vi/${video.videoId}/hqdefault.jpg`}
                            alt={video.title}
                            loading="lazy"
                            className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
                        <div className="absolute inset-0 flex items-center justify-center">
                            <div className="w-14 h-14 rounded-full bg-btn-primary/90 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                                <Play className="w-6 h-6 text-white ml-0.5" fill="currentColor" />
                            </div>
                        </div>
                    </button>
                )}
            </div>
            <div className="p-6 space-y-2">
                <h4 className="heading-5 text-txt-primary">{video.title}</h4>
                <p className="text-sm text-txt-secondary leading-relaxed">{video.description}</p>
            </div>
        </div>
    );
}

export default function NavigationComparison() {
    return (
        <section id="how-to-use" className="relative pt-40 md:pt-52 pb-32 overflow-hidden bg-black/40">
            {/* Dot Grid Pattern */}
            <div className="absolute inset-0 opacity-50" style={{
                backgroundImage: 'radial-gradient(circle, rgba(255, 255, 255, 0.04) 1px, transparent 1px)',
                backgroundSize: '32px 32px'
            }}></div>

            {/* Animated Gradient Mesh Orbs */}
            <div className="absolute inset-0">
                {/* Main blue orb - top left */}
                <div className="absolute top-[10%] left-[15%] w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-[120px] animate-pulse-slow"></div>

                {/* Secondary blue orb - bottom right */}
                <div className="absolute bottom-[15%] right-[10%] w-[600px] h-[600px] bg-blue-600/8 rounded-full blur-[140px] animate-pulse-slower"></div>

                {/* Accent orb - center */}
                <div className="absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-cyan-500/6 rounded-full blur-[100px] animate-float-slow"></div>
            </div>

            <div className="container mx-auto px-6 relative z-10">

                {/* Video walkthrough — one video per topic from the CoolDesk usage playlist */}
                <div className="max-w-6xl mx-auto">
                    <div className="text-center mb-12">
                        <h3 className="heading-2 text-txt-primary mb-4">
                            Watch the full walkthrough
                        </h3>
                        <p className="body-lg text-txt-secondary max-w-2xl mx-auto">
                            Everything you need to know, one short video per topic.
                        </p>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-6 md:gap-8">
                        {tutorialVideos.map((video) => (
                            <TutorialVideoCard key={video.videoId} video={video} />
                        ))}
                    </div>
                </div>

                {/* CTA */}
                <div className="text-center mt-12 md:mt-16 px-4">
                    <a
                        href="https://chromewebstore.google.com/detail/cooldesk/ioggffobciopdddacpclplkeodllhjko"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-primary btn-xl group inline-flex items-center gap-2 md:gap-3 hover:shadow-2xl hover:shadow-blue-500/50 hover:scale-105 transition-all duration-300 relative overflow-hidden"
                    >
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000"></div>
                        <span className="relative">Get CoolDesk Free</span>
                        <svg className="w-4 h-4 md:w-5 md:h-5 group-hover:translate-x-1 transition-transform relative" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                    </a>

                    <p className="mt-6 caption text-txt-muted flex flex-wrap items-center justify-center gap-x-3 gap-y-2">
                        <span className="inline-flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-txt-success animate-pulse"></span>
                            100% Free Forever
                        </span>
                        <span className="hidden sm:inline">•</span>
                        <span>No Credit Card Required</span>
                        <span className="hidden sm:inline">•</span>
                        <span>Privacy First</span>
                        <span className="hidden sm:inline">•</span>
                        <span>Windows · Mac · Linux</span>
                    </p>
                </div>
            </div>

            <style>{`
                @keyframes pulse-slow {
                    0%, 100% {
                        opacity: 0.8;
                        transform: scale(1);
                    }
                    50% {
                        opacity: 1;
                        transform: scale(1.05);
                    }
                }

                @keyframes pulse-slower {
                    0%, 100% {
                        opacity: 0.6;
                        transform: scale(1);
                    }
                    50% {
                        opacity: 0.9;
                        transform: scale(1.1);
                    }
                }

                @keyframes float-slow {
                    0%, 100% {
                        transform: translate(-50%, -50%) translateY(0px);
                    }
                    50% {
                        transform: translate(-50%, -50%) translateY(-20px);
                    }
                }

                .animate-pulse-slow {
                    animation: pulse-slow 8s ease-in-out infinite;
                }

                .animate-pulse-slower {
                    animation: pulse-slower 10s ease-in-out infinite;
                }

                .animate-float-slow {
                    animation: float-slow 12s ease-in-out infinite;
                }
            `}</style>
        </section>
    );
}
