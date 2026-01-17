import { useEffect } from 'react';
import HowToUseComponent from "@/components/new/HowToUse";
import Navbar from '@/components/new/Navbar';

export default function HowToUsePage() {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <main className="min-h-screen text-white scroll-smooth">
            {/* Background Glow Overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-transparent to-purple-600/10 pointer-events-none z-0" />
            <Navbar />

            {/* How to Use Section */}
            <HowToUseComponent />
        </main>
    );
}
