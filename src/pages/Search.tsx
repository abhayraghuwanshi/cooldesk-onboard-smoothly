import LinkSection from "@/components/new/LinkSection";
import Navbar from "@/components/new/Navbar";
import ProfileSection from "@/components/new/ProfileSection";
import WorkspaceSection from "@/components/new/WorkspaceSection";
import { useEffect, useState } from 'react';
import { FaLink, FaRocket, FaUser } from 'react-icons/fa';

type ViewMode = 'workspaces' | 'links' | 'profiles';

export default function Search() {
    const [viewMode, setViewMode] = useState<ViewMode>(() => {
        if (typeof window !== 'undefined') {
            const saved = localStorage.getItem('cooldesk_view_mode');
            return (saved === 'workspaces' || saved === 'links' || saved === 'profiles') ? saved : 'workspaces';
        }
        return 'workspaces';
    });

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    useEffect(() => {
        localStorage.setItem('cooldesk_view_mode', viewMode);
    }, [viewMode]);

    return (
        <main className="min-h-screen text-white scroll-smooth bg-black">
            {/* Background Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-transparent to-purple-600/10 pointer-events-none z-0" />

            {/* Dot Grid Pattern */}
            <div className="absolute inset-0 pointer-events-none z-0" style={{
                backgroundImage: 'radial-gradient(circle, rgba(255, 255, 255, 0.03) 1px, transparent 1px)',
                backgroundSize: '32px 32px'
            }} />

            {/* Animated Background Gradients */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-1/4 left-1/4 w-[800px] h-[800px] bg-blue-500/10 rounded-full blur-[150px] animate-pulse" />
                <div className="absolute bottom-1/4 right-1/4 w-[700px] h-[700px] bg-purple-500/10 rounded-full blur-[140px] animate-pulse"
                    style={{ animationDelay: '1s' }} />
            </div>

            <Navbar />

            {/* Unified Search Section */}
            <section className="relative z-10 pt-24 pb-12">
                <div className="container mx-auto px-6">
                    {/* Hero Header */}
                    <div className="text-center mb-12 animate-fade-in">
                        <h1 className="heading-1 text-gradient leading-tight mb-6">
                            Curated for Productivity
                        </h1>
                        <p className="body-lg text-txt-secondary mb-8 max-w-3xl mx-auto leading-relaxed px-4">
                            Hand-picked workspaces, developer profiles, and quick links — ready to supercharge your browser
                        </p>
                    </div>

                    {/* View Mode Toggle */}
                    <div className="flex justify-center mb-12 animate-fade-in-delay">
                        <div className="inline-flex bg-zinc-900/80 backdrop-blur-sm border border-zinc-700/50 rounded-2xl p-1.5 overflow-x-auto max-w-full">
                            <button
                                onClick={() => setViewMode('workspaces')}
                                className={`
                                    flex items-center gap-3 px-6 py-3 rounded-xl font-semibold transition-all duration-300 whitespace-nowrap
                                    ${viewMode === 'workspaces'
                                        ? 'bg-white text-zinc-900 shadow-lg shadow-white/20'
                                        : 'text-gray-400 hover:text-white hover:bg-zinc-800'}
                                `}
                            >
                                <FaRocket size={18} />
                                <span className="hidden sm:inline">Workspaces</span>
                                <span className="sm:hidden">Workspaces</span>
                            </button>
                            <button
                                onClick={() => setViewMode('profiles')}
                                className={`
                                    flex items-center gap-3 px-6 py-3 rounded-xl font-semibold transition-all duration-300 whitespace-nowrap
                                    ${viewMode === 'profiles'
                                        ? 'bg-white text-zinc-900 shadow-lg shadow-white/20'
                                        : 'text-gray-400 hover:text-white hover:bg-zinc-800'}
                                `}
                            >
                                <FaUser size={18} />
                                <span className="hidden sm:inline">Profiles</span>
                                <span className="sm:hidden">Profiles</span>
                            </button>
                            <button
                                onClick={() => setViewMode('links')}
                                className={`
                                    flex items-center gap-3 px-6 py-3 rounded-xl font-semibold transition-all duration-300 whitespace-nowrap
                                    ${viewMode === 'links'
                                        ? 'bg-white text-zinc-900 shadow-lg shadow-white/20'
                                        : 'text-gray-400 hover:text-white hover:bg-zinc-800'}
                                `}
                            >
                                <FaLink size={18} />
                                <span className="hidden sm:inline">Links</span>
                                <span className="sm:hidden">Links</span>
                            </button>
                        </div>
                    </div>

                    {/* Content Area */}
                    <div className="animate-fade-in-content">
                        {viewMode === 'workspaces' ? (
                            <WorkspaceSection />
                        ) : viewMode === 'profiles' ? (
                            <ProfileSection />
                        ) : (
                            <LinkSection />
                        )}
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="bg-black/40 py-10 mt-20 relative z-10 border-t border-white/10">
                <div className="container mx-auto px-6 text-center">
                    <p className="caption text-txt-muted">© {new Date().getFullYear()} CoolDesk. All rights reserved.</p>
                    <div className="mt-6 flex justify-center space-x-8 caption">
                        <a href="/privacy-details" className="link text-txt-secondary hover:text-txt-primary">Privacy Policy</a>
                        <a href="/terms" className="link text-txt-secondary hover:text-txt-primary">Terms of Service</a>
                        <a href="/contact" className="link text-txt-secondary hover:text-txt-primary">Contact Us</a>
                    </div>
                </div>
            </footer>

            <style>{`
                @keyframes fade-in {
                    from {
                        opacity: 0;
                        transform: translateY(20px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }

                .animate-fade-in {
                    animation: fade-in 0.6s ease-out forwards;
                }

                .animate-fade-in-delay {
                    opacity: 0;
                    animation: fade-in 0.6s ease-out 0.2s forwards;
                }

                .animate-fade-in-content {
                    opacity: 0;
                    animation: fade-in 0.4s ease-out 0.1s forwards;
                }
            `}</style>
        </main>
    );
}
