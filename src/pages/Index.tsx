import Downloads from "@/components/new/Downloads";
import FAQ from "@/components/new/FAQ";
import Footer from "@/components/new/Footer";
import Hero from "@/components/new/Hero";
import HowItWorks from "@/components/new/HowItWorks";
import Navbar from '@/components/new/Navbar';
import SEO from "@/components/SEO";
import { site } from "@/config/site";

// Kept deliberately short: hero, the four-step walkthrough, download, FAQ.
// Deeper docs live on /how-to-use.
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

        <section className="relative z-10">
          <Hero />
        </section>

        <section id="how-it-works" className="relative z-10 pt-12 pb-20">
          <HowItWorks />
        </section>

        <section id="downloads" className="relative z-10">
          <Downloads />
        </section>

        <section className="relative z-10 pb-16">
          <div className="container mx-auto px-6 relative z-10">
            <FAQ />
          </div>
        </section>

        <Footer />
      </main>
    </>
  );
};

export default Index;
