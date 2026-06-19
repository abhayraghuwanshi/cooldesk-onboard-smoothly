import Footer from "@/components/new/Footer";
import FounderNote from "@/components/new/FounderNote";
import Navbar from '@/components/new/Navbar';
import SEO from "@/components/SEO";

export default function FounderPage() {
    return (
        <main className="min-h-screen text-white scroll-smooth">
            <SEO
                title="The CoolDesk Story — A Note from the Founder"
                description="Why we built CoolDesk: a note from the founder on ending tab chaos and giving builders one calm surface for every project across browser and desktop."
                canonical="https://cool-desk.com/founder"
            />
            {/* Background Glow Overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-transparent to-purple-600/10 pointer-events-none z-0" />
            <Navbar />

            {/* Founder Note Section */}
            <section id="vision" className="relative z-10 py-24 backdrop-blur-sm">
                <div className="container mx-auto px-6 relative z-10">
                    <FounderNote />
                </div>
            </section>

            <Footer />
        </main>
    );
}
