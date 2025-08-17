import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { TabletSmartphone, Activity, Shield, Zap, Brain, Monitor } from "lucide-react";

const features = [
  {
    icon: TabletSmartphone,
    title: "Smart Tab Management",
    description: "View all your current tabs with favicons and one-click access. Never lose track of what you're working on.",
    color: "tech-blue"
  },
  {
    icon: Activity,
    title: "Intelligent Activity Feed",
    description: "Get revisit suggestions ranked by your engagement—time spent, clicks, forms filled, and scroll activity.",
    color: "tech-purple"
  },
  {
    icon: Shield,
    title: "Privacy-First Design",
    description: "All communication happens locally via 127.0.0.1. Your data never leaves your device unless you choose AI features.",
    color: "primary"
  },
  {
    icon: Brain,
    title: "Optional AI Insights",
    description: "Enable Gemini AI integration for smart summaries and suggestions. Completely optional and user-controlled.",
    color: "tech-cyan"
  },
  {
    icon: Monitor,
    title: "Desktop Integration",
    description: "Optional desktop app enhances functionality with token-authenticated local server on port 4000.",
    color: "tech-purple"
  },
  {
    icon: Zap,
    title: "Lightning Fast",
    description: "MV3 extension with background service worker ensures smooth performance without slowing down your browser.",
    color: "tech-blue"
  }
];

export const Features = () => {
  return (
    <section className="py-24 bg-gradient-quantum relative">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16 animate-slide-up">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">
            Powerful Features
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Everything you need to stay organized and productive, built with privacy and performance in mind.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card 
              key={feature.title}
              className="bg-gradient-card border-border/50 hover:shadow-card transition-all duration-300 hover:scale-105 animate-slide-up group"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <CardHeader>
                <div className={`w-12 h-12 rounded-lg bg-${feature.color}/20 flex items-center justify-center mb-4 group-hover:shadow-glow transition-all duration-300`}>
                  <feature.icon className={`h-6 w-6 text-${feature.color}`} />
                </div>
                <CardTitle className="text-xl font-semibold text-foreground">
                  {feature.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};