import Footer from "@/components/new/Footer";
import Navbar from "@/components/new/Navbar";
import WorkspaceSection from "@/components/new/WorkspaceSection";
import SEO from "@/components/SEO";
import { useEffect } from 'react';

export default function Search() {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <main className="min-h-screen text-white scroll-smooth relative overflow-hidden">
            {/* Background Glow Overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-transparent to-purple-600/10 pointer-events-none z-0" />
            <SEO
                title="Curated Tool Library"
                description="Explore a curated library of tools, apps, and workspaces — launch them instantly from CoolDesk."
                canonical="https://cool-desk.com/search"
            />
            {/* Dot Grid Pattern */}
            <div className="absolute inset-0 pointer-events-none z-0" style={{
                backgroundImage: 'radial-gradient(circle, rgba(255, 255, 255, 0.04) 1px, transparent 1px)',
                backgroundSize: '40px 40px'
            }} />

            {/* Animated Gradient Mesh Orbs */}
            <div className="absolute inset-0 pointer-events-none z-0">
                {/* Main blue orb - top left */}
                <div className="absolute top-[5%] left-[10%] w-[600px] h-[600px] bg-blue-500/12 rounded-full blur-[120px] animate-pulse-slow" />

                {/* Secondary purple orb - bottom right */}
                <div className="absolute bottom-[10%] right-[5%] w-[700px] h-[700px] bg-purple-600/10 rounded-full blur-[140px] animate-pulse-slower" />

                {/* Accent cyan orb - center */}
                <div className="absolute top-[40%] left-[50%] -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-cyan-500/8 rounded-full blur-[100px] animate-float-slow" />

                {/* Small accent orb - top right */}
                <div className="absolute top-[15%] right-[20%] w-[300px] h-[300px] bg-fuchsia-500/8 rounded-full blur-[80px] animate-pulse-slow" style={{ animationDelay: '2s' }} />

                {/* Small accent orb - bottom left */}
                <div className="absolute bottom-[20%] left-[15%] w-[350px] h-[350px] bg-indigo-500/8 rounded-full blur-[90px] animate-pulse-slower" style={{ animationDelay: '1s' }} />
            </div>

            <Navbar />

            {/* Unified Search Section */}
            <section className="relative z-10 pt-24 pb-12">
                <div className="container mx-auto px-6">
                    {/* Title */}
                    <div className="text-center mb-8 animate-fade-in">
                        <h1 className="text-2xl sm:text-3xl font-bold text-txt-primary">
                            Curated Tool Library
                        </h1>
                    </div>

                    {/* Content Area */}
                    <div className="animate-fade-in-content">
                        <WorkspaceSection />
                    </div>
                </div>
            </section>

            <Footer />

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
                        transform: translate(-50%, -50%) translateY(-30px);
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

                .animate-pulse-slow {
                    animation: pulse-slow 8s ease-in-out infinite;
                }

                .animate-pulse-slower {
                    animation: pulse-slower 12s ease-in-out infinite;
                }

                .animate-float-slow {
                    animation: float-slow 15s ease-in-out infinite;
                }
            `}</style>
        </main>
    );
}
