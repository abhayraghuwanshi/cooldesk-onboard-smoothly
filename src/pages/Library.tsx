import Footer from "@/components/new/Footer";
import Navbar from "@/components/new/Navbar";
import WorkspaceSection from "@/components/new/WorkspaceSection";
import SEO from "@/components/SEO";
import { categoryLabels, workspaces } from "@/config/workspaces";
import { useEffect } from 'react';

const LIBRARY_URL = "https://cool-desk.com/library";
const TOOL_COUNT = workspaces.length;

// Structured data so search engines & AI answers can understand this as a
// curated software directory and surface the individual tools.
const collectionSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Curated Tool Library",
    description: `A hand-picked directory of ${TOOL_COUNT}+ developer, design, and AI tools, organized by build stage and launchable instantly from CoolDesk.`,
    url: LIBRARY_URL,
    isPartOf: { "@type": "WebSite", name: "CoolDesk", url: "https://cool-desk.com" },
    mainEntity: {
        "@type": "ItemList",
        name: "Curated developer, design & AI tools",
        numberOfItems: TOOL_COUNT,
        itemListElement: workspaces.map((w, i) => ({
            "@type": "ListItem",
            position: i + 1,
            item: {
                "@type": "SoftwareApplication",
                name: w.title,
                description: w.description,
                applicationCategory: categoryLabels[w.category] ?? "Developer Tool",
                operatingSystem: "Web, Windows, macOS, Linux",
                ...(w.urls.main || w.urls.demo || w.urls.docs
                    ? { url: w.urls.main || w.urls.demo || w.urls.docs }
                    : {}),
            },
        })),
    },
};

const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: "https://cool-desk.com" },
        { "@type": "ListItem", position: 2, name: "Curated Tool Library", item: LIBRARY_URL },
    ],
};

export default function Library() {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <main className="min-h-screen text-white scroll-smooth relative overflow-hidden">
            {/* Background Glow Overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-transparent to-purple-600/10 pointer-events-none z-0" />
            <SEO
                title={`Curated Tool Library — ${TOOL_COUNT}+ Developer, Design & AI Tools | CoolDesk`}
                description={`Browse a curated directory of ${TOOL_COUNT}+ developer, design & AI tools — Radix, Tailwind, Vercel, Hugging Face and more. Filter by build stage and launch any of them instantly in CoolDesk.`}
                canonical={LIBRARY_URL}
                jsonLd={[collectionSchema, breadcrumbSchema]}
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
                    <div className="text-center mb-8 animate-fade-in max-w-2xl mx-auto">
                        <h1 className="text-2xl sm:text-3xl font-bold text-txt-primary">
                            Curated Tool Library
                        </h1>
                        <p className="mt-3 text-sm sm:text-base text-txt-secondary leading-relaxed">
                            A hand-picked directory of {TOOL_COUNT}+ developer, design, and AI tools — from
                            Radix and Tailwind to Vercel and Hugging Face. Filter by build stage and launch
                            any of them instantly in CoolDesk.
                        </p>
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
