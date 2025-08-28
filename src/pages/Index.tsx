import { Hero } from "@/components/Hero";
import { FeatureTrios } from "@/components/FeatureTrios";
import { DemoTrialCTA } from "@/components/DemoTrialCTA";
import { Footer } from "@/components/Footer";

const Index = () => {
  return (
    <main className="min-h-screen bg-gradient-main relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5 pointer-events-none"></div>
      <div className="content-70 relative z-10">
        <div className="backdrop-blur-sm bg-white/[0.02] rounded-3xl shadow-2xl shadow-primary/10 p-6 space-y-12">
          {/* 1. Hook Hero - Problem-First */}
          <Hero />
          
          <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
          
          {/* 2. Feature Trios - Core Capabilities */}
          <FeatureTrios />
          
          <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
          
          {/* 3. Demo/Trial CTA */}
          <DemoTrialCTA />
          
          <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
          
          {/* 6. Footer */}
          <Footer />
        </div>
      </div>
    </main>
  );
};

export default Index;
