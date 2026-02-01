import Footer from '@/components/new/Footer';
import Navbar from '@/components/new/Navbar';
import PricingComponent from "@/components/new/Pricing";
import SEO from "@/components/SEO";

export default function PricingPage() {
    return (
        <main className="min-h-screen text-white scroll-smooth">
            <SEO
                title="Pricing"
                description="Choose the perfect plan for your productivity needs. Free and Pro options available."
                canonical="https://cool-desk.com/pricing"
            />
            {/* Background Glow Overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-transparent to-purple-600/10 pointer-events-none z-0" />
            <Navbar />

            {/* Pricing Section */}
            <PricingComponent />

            <Footer />
        </main>
    );
}
