import FAQ from "@/components/new/FAQ";
import FeatureBloom from "@/components/new/FeatureBloom";
import FeatureComparison from "@/components/new/FeatureComparison";
import Hero from "@/components/new/Hero";
import Navbar from '@/components/new/Navbar';
import NavigationComparison from "@/components/new/NavigationComparison";
import SEO from "@/components/SEO";

const Index = () => {
  return (
    <main className="min-h-screen text-white scroll-smooth">
      <SEO
        title="Voice Navigation & AI Productivity Extension"
        description="Experience Cooldesk: The ultimate browser extension with voice navigation, AI-powered productivity tools, and an almighty search."
        canonical="https://cool-desk.com/"
      />
      {/* Background Glow Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-transparent to-purple-600/10 pointer-events-none z-0" />
      <Navbar />

      {/* Hero Section */}
      <section
        id="home"
        className="relative z-10 min-h-screen flex items-center justify-center bg-cover bg-center"
        style={{ backgroundImage: "url('/hero-background.png')" }}
      >
        <div className="container mx-auto px-6 text-center">
          <Hero />
        </div>
      </section>

      {/* Navigation Comparison Section */}
      <section id="navigation" className="relative z-10">
        <NavigationComparison />
      </section>

      {/* Preview Gallery Section */}
      {/* <section id="previews" className="relative z-10 py-24 backdrop-blur-sm">
 
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.06),transparent_70%)] pointer-events-none" />
        <div className="absolute top-10 left-1/5 w-96 h-96 bg-white/5 blur-3xl rounded-full pointer-events-none" />
        <div className="absolute bottom-10 right-1/5 w-80 h-80 bg-white/5 blur-3xl rounded-full pointer-events-none" />

        <div className="container mx-auto px-6 relative z-10">
          <PreviewGallery />
        </div>
      </section> */}
      {/* Features Section */}
      <section id="features" className="relative z-10 py-24">
        <div className="container mx-auto px-6 text-center relative z-10">
          <FeatureBloom />
        </div>
      </section>

      {/* FAQ Section */}
      <section id="f" className="relative z-10 py-24">
        <div className="container mx-auto px-6 relative z-10">
          <FAQ />
        </div>
      </section>


      {/* Feature Comparison Table */}
      <section id="compare" className="relative z-10 py-24">
        <div className="container mx-auto px-6 relative z-10">
          <FeatureComparison />
        </div>
      </section>

      {/* Users Testimonials */}
      {/* <section id="testimonials" className="relative z-10 py-24 backdrop-blur-sm">
   
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,rgba(59,130,246,0.1),transparent_70%)] pointer-events-none" />
        <div className="absolute top-20 left-1/5 w-88 h-88 bg-blue-400/12 blur-3xl rounded-full pointer-events-none" />
        <div className="absolute bottom-20 right-1/5 w-96 h-96 bg-indigo-400/12 blur-3xl rounded-full pointer-events-none" />

        <div className="container mx-auto px-6 relative z-10">
          <UsersTestimonials />
        </div>
      </section> */}

      {/* <section id="permissions" className="relative z-10 py-24 backdrop-blur-sm">
        
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center_right,rgba(147,51,234,0.1),transparent_70%)] pointer-events-none" />
        <div className="absolute top-24 left-1/4 w-80 h-80 bg-purple-400/15 blur-3xl rounded-full pointer-events-none" />
        <div className="absolute bottom-24 right-1/4 w-72 h-72 bg-violet-400/15 blur-3xl rounded-full pointer-events-none" />

        <div className="container mx-auto px-6 relative z-10">
          <PrivacySettings />
        </div>
      </section> */}

      {/* Footer */}
      <footer className="bg-black/40 text-gray-400 py-10 mt-20 relative z-10 border-t border-white/10">
        <div className="container mx-auto px-6 text-center">
          <p>© {new Date().getFullYear()} CoolDesk. All rights reserved.</p>
          <div className="mt-6 flex justify-center space-x-8 text-sm">
            <a href="/privacy-details" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="/terms" className="hover:text-white transition-colors">Terms of Service</a>
            <a href="/contact" className="hover:text-white transition-colors">Contact Us</a>
          </div>
        </div>
      </footer>
    </main>
  );
};

export default Index;
