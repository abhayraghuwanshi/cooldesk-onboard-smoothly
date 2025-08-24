import { Hero } from "@/components/Hero";
import { Features } from "@/components/Features";
import { HowItWorks } from "@/components/HowItWorks";
import { Privacy } from "@/components/Privacy";
import { CTA } from "@/components/CTA";
import { Footer } from "@/components/Footer";

const Index = () => {
  return (
    <main className="min-h-screen bg-gradient-main">
      <div className="content-70">
        <Hero />
        <Features />
        <HowItWorks />
        <Privacy />
        <CTA />
        <Footer />
      </div>
    </main>
  );
};

export default Index;
