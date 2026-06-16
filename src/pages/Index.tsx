import Downloads from "@/components/new/Downloads";
import FAQ from "@/components/new/FAQ";
import Footer from "@/components/new/Footer";
import Hero from "@/components/new/Hero";
import Navbar from '@/components/new/Navbar';
import NavigationComparison from "@/components/new/NavigationComparison";
import SEO from "@/components/SEO";
import { site } from "@/config/site";

const Index = () => {
  return (
    <main className="min-h-screen text-white scroll-smooth">
      <SEO
        title={site.seo.title}
        description={site.seo.description}
        canonical={`${site.url}/`}
      />
      {/* Background Glow Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-transparent to-purple-600/10 pointer-events-none z-0" />
      <Navbar />

      {/* Hero Section */}
      <section id="home" className="relative z-10">
        <Hero />
      </section>

      {/* <section id="problem" className="relative z-10">
        <ProblemSection />
      </section> */}

      <section id="navigation" className="relative z-10">
        <NavigationComparison />
      </section>



      {/* Tabbed Dashboard Showcase */}

      {/* Downloads Section */}
      <section id="downloads" className="relative z-10">
        <Downloads />
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
      {/* <section id="features" className="relative z-10 py-24">
        <div className="container mx-auto px-6 text-center relative z-10">
          <FeatureBloom />
        </div>
      </section> */}

      {/* FAQ Section */}
      <section id="f" className="relative z-10 py-24">
        <div className="container mx-auto px-6 relative z-10">
          <FAQ />
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

      {/* Cross-promo to the sister product */}
      {site.crossPromo && (
        <section className="relative z-10 pb-8">
          <div className="container mx-auto px-6">
            <a
              href={site.crossPromo.href}
              className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-3 max-w-2xl mx-auto rounded-2xl border border-white/10 bg-white/[0.03] hover:bg-white/[0.06] transition-colors px-6 py-5 text-center"
            >
              <span className="text-txt-secondary">{site.crossPromo.text}</span>
              <span className="inline-flex items-center gap-1.5 font-semibold text-blue-400">
                {site.crossPromo.linkLabel}
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                </svg>
              </span>
            </a>
          </div>
        </section>
      )}

      <Footer />
    </main>
  );
};

export default Index;
