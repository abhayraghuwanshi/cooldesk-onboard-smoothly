import Navbar from '@/components/new/Navbar';
import PricingComponent from "@/components/new/Pricing";

export default function PricingPage() {
    return (
        <main className="min-h-screen text-white scroll-smooth">
            {/* Background Glow Overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-transparent to-purple-600/10 pointer-events-none z-0" />
            <Navbar />

            {/* Pricing Section */}
            <PricingComponent />
        </main>
    );
}
