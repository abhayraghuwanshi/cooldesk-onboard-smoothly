import { HeroButton, SecondaryButton } from "./ui/button-variants";
import { Chrome, Download, ArrowRight, Github } from "lucide-react";

export const CTA = () => {
  return (
    <section className="py-24 bg-gradient-hero relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
      <div className="absolute top-10 left-10 w-64 h-64 bg-tech-cyan/20 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-10 right-10 w-80 h-80 bg-tech-purple/20 rounded-full blur-3xl animate-pulse delay-1000" />
      
      <div className="relative z-10 container mx-auto px-6 text-center">
        <div className="max-w-3xl mx-auto animate-slide-up">
          <h2 className="text-4xl md:text-6xl font-bold mb-6 text-foreground">
            Ready to Transform
            <span className="block text-primary animate-glow">Your Browsing?</span>
          </h2>
          
          <p className="text-xl text-muted-foreground mb-10 max-w-2xl mx-auto leading-relaxed">
            Join users who've already discovered a smarter way to browse. 
            Install Cooldesk today and take control of your digital workspace.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <HeroButton className="group">
              <Chrome className="mr-2 h-5 w-5 group-hover:rotate-12 transition-transform" />
              Install Chrome Extension
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </HeroButton>
            <SecondaryButton>
              <Download className="mr-2 h-5 w-5" />
              Download Desktop App
            </SecondaryButton>
          </div>
          
          <div className="flex items-center justify-center gap-6 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
              <span>Open Source</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-primary rounded-full animate-pulse delay-300"></div>
              <span>Privacy First</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-primary rounded-full animate-pulse delay-500"></div>
              <span>Local Data</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};