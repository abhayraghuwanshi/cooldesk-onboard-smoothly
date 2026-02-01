import Footer from '@/components/new/Footer';
import Navbar from '@/components/new/Navbar';
import PreviewGallery from '@/components/new/PreviewGallery';

export default function GalleryPage() {
    return (
        <main className="min-h-screen text-white scroll-smooth">
            {/* Background Glow Overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-transparent to-purple-600/10 pointer-events-none z-0" />
            <Navbar />

            {/* Preview Gallery Section */}
            <section id="gallery" className="relative z-10 py-24 backdrop-blur-sm">
                <div className="container mx-auto px-6 relative z-10">
                    <PreviewGallery />
                </div>
            </section>

            <Footer />
        </main>
    );
}
