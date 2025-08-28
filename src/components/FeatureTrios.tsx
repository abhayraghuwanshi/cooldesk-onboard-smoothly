import { Brain, Folders, Search, Sparkles, Zap, Shield } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

const featurePillars = [
  {
    icon: Brain,
    title: "AI-Powered Intelligence",
    subtitle: "Let artificial intelligence organize your chaos",
    features: [
      {
        icon: Sparkles,
        title: "Auto-Categorization",
        description: "AI analyzes your bookmarks and automatically sorts them into logical workspaces"
      },
      {
        icon: Brain,
        title: "Smart Suggestions",
        description: "Gemini AI provides intelligent recommendations based on your browsing patterns"
      },
      {
        icon: Zap,
        title: "Content Enrichment",
        description: "AI enhances your saved content with summaries, tags, and contextual insights"
      }
    ],
    color: "tech-cyan",
    bgGradient: "from-cyan-500/10 to-blue-500/10"
  },
  {
    icon: Folders,
    title: "Advanced Workspace Management",
    subtitle: "Transform chaos into organized productivity",
    features: [
      {
        icon: Folders,
        title: "Unlimited Workspaces",
        description: "Create separate workspaces for each project, research topic, or area of interest"
      },
      {
        icon: Sparkles,
        title: "Drag & Drop Organization",
        description: "Intuitive interface with visual filters and instant organization capabilities"
      },
      {
        icon: Shield,
        title: "Smart Duplicate Detection",
        description: "Automatically identifies and cleans up duplicate bookmarks across workspaces"
      }
    ],
    color: "tech-purple",
    bgGradient: "from-purple-500/10 to-pink-500/10"
  },
  {
    icon: Search,
    title: "Universal Search & Integration",
    subtitle: "Find anything instantly, search everywhere",
    features: [
      {
        icon: Search,
        title: "Lightning Search",
        description: "Instant search across all bookmarks, history, and workspaces with content previews"
      },
      {
        icon: Zap,
        title: "Multi-Engine Integration",
        description: "Search Google, Perplexity, ChatGPT, and Grok simultaneously from one interface"
      },
      {
        icon: Brain,
        title: "Context-Aware Results",
        description: "AI understands what you're looking for and surfaces the most relevant content first"
      }
    ],
    color: "primary",
    bgGradient: "from-blue-500/10 to-indigo-500/10"
  }
];

export const FeatureTrios = () => {
  return (
    <section className="py-20 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/20 to-transparent pointer-events-none"></div>
      <div className="absolute top-20 left-1/4 w-64 h-64 bg-gradient-to-r from-primary/20 to-accent/15 rounded-full blur-3xl animate-float"></div>
      <div className="absolute bottom-20 right-1/4 w-80 h-80 bg-gradient-to-r from-accent/15 to-tech-cyan/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
      
      <div className="container mx-auto px-6 relative">
        <div className="text-center mb-12 animate-slide-up">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">
            Explore the Features
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Discover how each pillar works to revolutionize your browsing experience
          </p>
        </div>

        <div className="space-y-20">
          {featurePillars.map((pillar, pillarIndex) => (
            <div 
              key={pillar.title}
              className={`relative ${pillarIndex % 2 === 1 ? 'lg:flex-row-reverse' : ''} lg:flex lg:items-center lg:gap-16 animate-slide-up`}
              style={{ animationDelay: `${pillarIndex * 200}ms` }}
            >
              {/* Content */}
              <div className="lg:w-1/2 mb-12 lg:mb-0">
                <div className="w-16 h-16 rounded-2xl glass-card bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center mb-6 hover:shadow-glow transition-all duration-300">
                  <pillar.icon className={`h-8 w-8 text-${pillar.color} hover:scale-110 transition-transform duration-300`} />
                </div>
                
                <h3 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                  {pillar.title}
                </h3>
                
                <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                  {pillar.subtitle}
                </p>
                
                <div className="space-y-6">
                  {pillar.features.map((feature, featureIndex) => (
                    <div key={feature.title} className="flex items-start gap-4 group hover:bg-white/[0.02] rounded-xl p-3 -m-3 transition-all duration-300">
                      <div className="w-10 h-10 rounded-lg glass bg-gradient-to-br from-primary/20 to-accent/10 flex items-center justify-center flex-shrink-0 group-hover:shadow-glow transition-all duration-300">
                        <feature.icon className={`h-5 w-5 text-${pillar.color} group-hover:scale-110 transition-transform duration-300`} />
                      </div>
                      <div className="flex-1">
                        <h4 className="text-lg font-semibold text-foreground mb-2 group-hover:text-primary transition-colors duration-300">
                          {feature.title}
                        </h4>
                        <p className="text-muted-foreground leading-relaxed">
                          {feature.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Visual/Demo Area */}
              <div className="lg:w-1/2">
                <div className="glass-card rounded-3xl p-8 h-80 flex items-center justify-center group hover:border-primary/30 hover:-translate-y-2 transition-all duration-500 cursor-pointer overflow-hidden relative">
                  {/* Animated background effect */}
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-accent/5 to-tech-cyan/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <div className="absolute top-4 right-4 w-20 h-20 bg-gradient-to-br from-primary/20 to-accent/20 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  
                  <div className="text-center relative z-10">
                    <div className="w-24 h-24 mx-auto mb-6 rounded-2xl glass-card bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center group-hover:shadow-glow group-hover:scale-110 transition-all duration-500">
                      <pillar.icon className={`h-12 w-12 text-${pillar.color} group-hover:rotate-12 transition-transform duration-500`} />
                    </div>
                    <h4 className="text-xl font-semibold text-foreground mb-2 group-hover:text-primary transition-colors duration-300">
                      Interactive Demo
                    </h4>
                    <p className="text-muted-foreground text-sm group-hover:text-foreground/80 transition-colors duration-300">
                      See {pillar.title.toLowerCase()} in action
                    </p>
                    <div className="mt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-200">
                      <div className="inline-flex items-center gap-2 text-primary text-sm font-medium">
                        <span>Click to explore</span>
                        <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom transition */}
        <div className="text-center mt-16 animate-slide-up">
          <div className="glass-card rounded-2xl p-8 max-w-3xl mx-auto group hover:border-primary/30 transition-all duration-300">
            <div className="w-12 h-12 mx-auto mb-4 rounded-xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center group-hover:shadow-glow transition-all duration-300">
              <Sparkles className="h-6 w-6 text-primary group-hover:scale-110 transition-transform duration-300" />
            </div>
            <p className="text-lg text-muted-foreground group-hover:text-foreground/90 transition-colors duration-300">
              Experience the power of AI-driven organization, advanced workspace management, 
              and lightning-fast search working in perfect harmony.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};