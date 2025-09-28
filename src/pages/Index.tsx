import FAQ from "@/components/new/FAQ";
import FeatureBloom from "@/components/new/FeatureBloom";
import Hero from "@/components/new/Hero";
import PrivacySettings from "@/components/new/PrivacySettings";
import UsersTestimonials from "@/components/new/UsersTestimonials";

const Index = () => {
  return (
    <main className="min-h-screen bg-black text-white scroll-smooth">
      {/* Background Glow Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-transparent to-purple-600/10 pointer-events-none z-0" />

      {/* Navigation Bar */}
      <nav className="fixed top-0 left-0 right-0 z-30 bg-black/50 backdrop-blur-md border-b border-white/10">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          {/* Logo */}
          <div className="text-2xl font-bold text-blue-400">CoolDesk</div>

          {/* Links */}
          <div className="hidden md:flex space-x-8 text-sm font-medium">
            <a href="#home" className="hover:text-blue-400 transition-colors">Home</a>
            <a href="#features" className="hover:text-blue-400 transition-colors">Features</a>
            <a href="#faq" className="hover:text-blue-400 transition-colors">FAQ</a>
            <a href="#testimonials" className="hover:text-blue-400 transition-colors">Testimonials</a>
            <a href="#permissions" className="hover:text-blue-400 transition-colors">Permissions</a>
            <a href="#contact" className="hover:text-blue-400 transition-colors">Contact</a>
            <a href="/contact" className="hover:text-blue-400 transition-colors">Privacy</a>
          </div>

          {/* CTA */}
          <a
            href="#get-started"
            className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg font-medium transition-colors shadow-lg shadow-blue-500/20"
          >
            Get Started
          </a>
        </div>
      </nav>

      {/* Hero Section */}
      <section
        id="home"
        className="relative z-10 min-h-screen flex items-center justify-center bg-cover bg-center"
        style={{ backgroundImage: "url('/src/assets/hero-background.svg')" }}
      >
        <div className="container mx-auto px-6 text-center">
          <Hero />
        </div>
      </section>

      {/* Feature Bloom Section */}
      <section
        id="features"
        className="relative z-10 py-24 bg-gradient-to-b from-black via-[#1a1a1a] to-[#2c2c2c]"
      >
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-12 ">
            Powerful Features
          </h2>
          <FeatureBloom />
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="relative z-10 py-24 bg-gradient-to-b from-black via-gray-900 to-black">
        <div className="container mx-auto px-6">
          <FAQ />
        </div>
      </section>

      {/* Users Testimonials */}
      <section id="testimonials" className="relative z-10 py-24 bg-gradient-to-b from-black via-gray-900 to-black
">
        <div className="container mx-auto px-6">
          <UsersTestimonials />
        </div>
      </section>

      <section id="permissions" className="relative z-10 py-24 bg-gradient-to-b from-black via-gray-900 to-black">
        <div className="container mx-auto px-6">
          <PrivacySettings />
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-950 text-gray-400 py-10 mt-20 relative z-10 border-t border-white/10">
        <div className="container mx-auto px-6 text-center">
          <p>© {new Date().getFullYear()} CoolDesk. All rights reserved.</p>
          <div className="mt-6 flex justify-center space-x-8 text-sm">
            <a href="#privacy" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#terms" className="hover:text-white transition-colors">Terms of Service</a>
            <a href="#contact" className="hover:text-white transition-colors">Contact Us</a>
          </div>
        </div>
      </footer>
    </main>
  );
};

export default Index;
