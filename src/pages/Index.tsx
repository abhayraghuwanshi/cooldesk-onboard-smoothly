import Downloads from "@/components/new/Downloads";
import FAQ from "@/components/new/FAQ";
import Footer from "@/components/new/Footer";
import Hero from "@/components/new/Hero";
import HowItWorks from "@/components/new/HowItWorks";
import HowToUseSection from "@/components/new/HowToUseSection";
import Navbar from '@/components/new/Navbar';
import SEO from "@/components/SEO";
import { site } from "@/config/site";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

// Hero, the four-step walkthrough, how to use (videos + shortcuts),
// download (with "which one do I need?"), FAQ.
// /how-to-use redirects to #how-to-use here.
const Index = () => {
  const { hash } = useLocation();

  // Arriving from another page (or the /how-to-use redirect) with a hash: the
  // browser's own jump happens before these sections exist, so do it once
  // they've rendered.
  useEffect(() => {
    if (!hash) return;
    const t = window.setTimeout(() => {
      document.getElementById(hash.slice(1))?.scrollIntoView({ block: "start" });
    }, 60);
    return () => window.clearTimeout(t);
  }, [hash]);

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

        <section id="how-it-works" className="relative z-10 pt-8 pb-20">
          <HowItWorks />
        </section>

        <section id="how-to-use" className="relative z-10 pt-8 pb-24 scroll-mt-20">
          <HowToUseSection />
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
