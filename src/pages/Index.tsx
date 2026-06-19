import Downloads from "@/components/new/Downloads";
import ExtensionShowcase from "@/components/new/ExtensionShowcase";
import FAQ from "@/components/new/FAQ";
import Footer from "@/components/new/Footer";
import Hero from "@/components/new/Hero";
import Navbar from '@/components/new/Navbar';
import SolutionSection from "@/components/new/SolutionSection";
import SwitchingSurface from "@/components/new/SwitchingSurface";
import SEO from "@/components/SEO";
import { site } from "@/config/site";

const Index = () => {
  return (
    <>

      <main className="min-h-screen text-white scroll-smooth">
        <SEO
          title={site.seo.title}
          description={site.seo.description}
          canonical={`${site.url}/`}
        />

        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-transparent to-purple-600/10 pointer-events-none z-0" />
        <Navbar />

        <section id="problem" className="relative z-10">
          <SwitchingSurface />
        </section>

        <section id="home" className="relative z-10">
          <Hero />
        </section>

        <section id="solution" className="relative z-10">
          <SolutionSection />
        </section>

        <section id="showcase" className="relative z-10">
          <ExtensionShowcase />
        </section>

        <section id="downloads" className="relative z-10">
          <Downloads />
        </section>

        <section id="faq" className="relative z-10 py-24">
          <div className="container mx-auto px-6 relative z-10">
            <FAQ />
          </div>
        </section>

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
    </>
  );
};

export default Index;
