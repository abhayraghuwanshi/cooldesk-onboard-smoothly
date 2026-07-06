import ArchitectureDiagram from "@/components/new/ArchitectureDiagram";
import Downloads from "@/components/new/Downloads";
import FAQ from "@/components/new/FAQ";
import Footer from "@/components/new/Footer";
import Hero from "@/components/new/Hero";
import Navbar from '@/components/new/Navbar';
import ProjectsSlide from "@/components/new/ProjectsSlide";
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

        <section id="spotlight" className="relative z-10">
          <SwitchingSurface />
        </section>

        <section id="home" className="relative z-10">
          <Hero />
        </section>

        <section id="projects" className="relative z-10 py-24">
          <div className="container mx-auto px-6">
            <ProjectsSlide />
          </div>
        </section>

        <section id="downloads" className="relative z-10">
          <Downloads />
        </section>

        <section id="how-it-works" className="relative z-10 py-24">
          <div className="container mx-auto px-6">
            <div className="max-w-3xl mx-auto">
              <ArchitectureDiagram />
            </div>
          </div>
        </section>

        <section id="faq" className="relative z-10 py-24 pt-0">
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
