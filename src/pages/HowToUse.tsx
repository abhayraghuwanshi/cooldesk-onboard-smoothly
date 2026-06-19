import { useEffect } from 'react';
import Footer from "@/components/new/Footer";
import NavigationComparison from "@/components/new/NavigationComparison";
import Navbar from '@/components/new/Navbar';
import SEO from "@/components/SEO";

export default function HowToUsePage() {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <main className="min-h-screen text-white scroll-smooth">
            <SEO
                title="How to Use CoolDesk — New Tab Workspace Guide"
                description="Learn how to set up project workspaces in CoolDesk: group tabs, links, notes and apps in your new tab, use Spotlight search, and switch projects in seconds."
                canonical="https://cool-desk.com/how-to-use"
            />
            {/* Background Glow Overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-transparent to-purple-600/10 pointer-events-none z-0" />
            <Navbar />

            {/* How to Use — combined step-by-step walkthrough */}
            <NavigationComparison />

            <Footer />
        </main>
    );
}
