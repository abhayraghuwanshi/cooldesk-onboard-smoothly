import { HeroButton, SecondaryButton } from "./ui/button-variants";
import { Chrome, Download } from "lucide-react";
import heroImage from "@/assets/hero-dashboard.jpg";

export const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-hero">
      {/* Background effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-background/50 to-background" />
      <div className="absolute top-20 left-20 w-72 h-72 bg-primary/20 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-20 right-20 w-96 h-96 bg-tech-purple/20 rounded-full blur-3xl animate-pulse delay-1000" />
      
      <div className="relative z-10 container mx-auto px-6 text-center">
        <div className="max-w-4xl mx-auto animate-slide-up">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-foreground to-primary-glow bg-clip-text text-transparent">
            Transform Your
            <span className="block text-primary animate-glow">Chrome Experience</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
            Cooldesk replaces your New Tab with an intelligent dashboard that tracks your activity, 
            suggests revisits, and keeps you organized—all while keeping your data private and local.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <HeroButton className="group">
              <Chrome className="mr-2 h-5 w-5 group-hover:animate-spin" />
              Install Chrome Extension
            </HeroButton>
            <SecondaryButton>
              <Download className="mr-2 h-5 w-5" />
              Download Desktop App
            </SecondaryButton>
          </div>
          
          {/* Hero image */}
          <div className="relative max-w-4xl mx-auto">
            <div className="relative rounded-2xl overflow-hidden shadow-card border border-border/50">
              <img 
                src={heroImage} 
                alt="Cooldesk dashboard interface showing current tabs and activity feed"
                className="w-full h-auto animate-float"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/20 to-transparent" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};