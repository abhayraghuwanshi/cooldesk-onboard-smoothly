import Footer from "@/components/new/Footer";
import FounderNote from "@/components/new/FounderNote";
import Navbar from '@/components/new/Navbar';

export default function FounderPage() {
    return (
        <main className="min-h-screen text-white scroll-smooth">
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
