import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { TabletSmartphone, Activity, Shield, Zap, Brain, Monitor, Lock, Eye, Server, UserCheck } from "lucide-react";

const features = [
  {
    icon: Brain,
    title: "Drowning in Digital Chaos?",
    problem: "Your bookmarks are a mess, you can't find important pages, and your browsing feels chaotic and unproductive.",
    solution: "AI-powered auto-categorization and intelligent workspace suggestions organize everything automatically.",
    color: "tech-cyan",
    category: "problem"
  },
  {
    icon: TabletSmartphone,
    title: "Managing Multiple Projects?",
    problem: "You're juggling research for work, personal projects, and studies with no way to separate them.",
    solution: "Create unlimited custom workspaces with drag-and-drop organization and visual filters.",
    color: "tech-blue",
    category: "problem"
  },
  {
    icon: Activity,
    title: "Can't Find What You Saved?",
    problem: "You bookmarked that perfect article weeks ago but now it's lost in hundreds of other bookmarks.",
    solution: "Lightning-fast universal search across bookmarks, history, and workspaces with content previews.",
    color: "tech-purple",
    category: "problem"
  },
  {
    icon: Zap,
    title: "Tired of Browser Slowdown?",
    problem: "Extensions make your browser crawl, crash, or consume all your RAM with poor performance.",
    solution: "Built with React 19 + Vite and Chrome MV3 for lightning-fast performance without the bloat.",
    color: "tech-blue",
    category: "problem"
  },
  {
    icon: Monitor,
    title: "Need Better Productivity Tools?",
    problem: "You're switching between multiple apps for notes, tracking, and managing your digital workflow.",
    solution: "Daily notes, activity analytics, and seamless multitasking tools built right into your browser.",
    color: "primary",
    category: "problem"
  },
  {
    icon: Eye,
    title: "Want Smarter Search?",
    problem: "You're limited to basic Google search when you need comprehensive research across multiple sources.",
    solution: "Multi-engine search integration (Google, Perplexity, ChatGPT, Grok) with context-aware suggestions.",
    color: "tech-cyan",
    category: "problem"
  },
  {
    icon: Server,
    title: "Worried About Your Data?",
    problem: "Other productivity tools harvest your browsing data and sell it to advertisers without consent.",
    solution: "Local-first architecture with optional cloud sync. Your data stays on your device unless you choose otherwise.",
    color: "primary",
    category: "privacy"
  },
  {
    icon: UserCheck,
    title: "Want Complete Control?",
    problem: "Extensions make decisions for you with no customization, themes, or ability to disable features.",
    solution: "10 stunning themes, customizable shortcuts, and granular control over every feature—it's your workspace.",
    color: "tech-purple",
    category: "privacy"
  }
];

export const Features = () => {
  const problemFeatures = features.filter(f => f.category === "problem");
  const privacyFeatures = features.filter(f => f.category === "privacy");

  return (
    <section className="py-16 relative">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12 animate-slide-up">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">
            Why Do You Need CoolDesk?
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Transform browser chaos into organized productivity. CoolDesk solves the real problems that 
            researchers, professionals, and power users face every day.
          </p>
        </div>

        {/* Problem-Solution Features */}
        <div className="mb-16">
          <div className="flex items-center gap-3 mb-8 justify-center">
            <Zap className="h-6 w-6 text-primary" />
            <h3 className="text-2xl font-semibold text-foreground">Productivity Challenges</h3>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {problemFeatures.map((feature, index) => (
              <Card 
                key={feature.title}
                className="backdrop-blur-md bg-white/[0.02] border border-white/[0.08] hover:border-primary/20 hover:bg-white/[0.04] transition-all duration-300 animate-slide-up group"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <CardHeader className="pb-4">
                  <div className={`w-12 h-12 rounded-lg bg-${feature.color}/20 flex items-center justify-center mb-4 group-hover:shadow-glow transition-all duration-300`}>
                    <feature.icon className={`h-6 w-6 text-${feature.color}`} />
                  </div>
                  <CardTitle className="text-lg font-semibold text-foreground">
                    {feature.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <p className="text-red-400/90 text-sm leading-relaxed">
                      <strong>Problem:</strong> {feature.problem}
                    </p>
                    <p className="text-primary/90 text-sm leading-relaxed">
                      <strong>Solution:</strong> {feature.solution}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Privacy Concerns */}
        <div>
          <div className="flex items-center gap-3 mb-8 justify-center">
            <Shield className="h-6 w-6 text-primary" />
            <h3 className="text-2xl font-semibold text-foreground">Privacy & Control</h3>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {privacyFeatures.map((feature, index) => (
              <Card 
                key={feature.title}
                className="backdrop-blur-md bg-white/[0.02] border border-white/[0.08] hover:border-primary/20 hover:bg-white/[0.04] transition-all duration-300 animate-slide-up group"
                style={{ animationDelay: `${(index + 4) * 100}ms` }}
              >
                <CardHeader className="pb-4">
                  <div className={`w-12 h-12 rounded-lg bg-${feature.color}/20 flex items-center justify-center mb-4 group-hover:shadow-glow transition-all duration-300`}>
                    <feature.icon className={`h-6 w-6 text-${feature.color}`} />
                  </div>
                  <CardTitle className="text-lg font-semibold text-foreground">
                    {feature.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <p className="text-red-400/90 text-sm leading-relaxed">
                      <strong>Concern:</strong> {feature.problem}
                    </p>
                    <p className="text-primary/90 text-sm leading-relaxed">
                      <strong>How we solve it:</strong> {feature.solution}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};