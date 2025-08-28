import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Shield, Lock, Eye, Server, UserCheck, FileText } from "lucide-react";
import { SecondaryButton } from "./ui/button-variants";

const privacyFeatures = [
  {
    icon: Server,
    title: "Local-First Architecture",
    description: "Extension ↔ desktop app communication happens entirely over 127.0.0.1. No external servers involved."
  },
  {
    icon: Lock,
    title: "Token Authentication",
    description: "Secure communication between components using user-controlled authentication tokens."
  },
  {
    icon: Eye,
    title: "Transparent AI Usage",
    description: "When AI features are enabled, only minimal context (URLs/titles) and user prompts are sent to Gemini API."
  },
  {
    icon: UserCheck,
    title: "User Control",
    description: "AI features can be disabled at any time. Per-site allow/block lists. Local data can be cleared easily."
  }
];

export const Privacy = () => {
  return (
    <section className="py-16 relative">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16 animate-slide-up">
          <div className="inline-flex items-center gap-3 mb-6">
            <Shield className="h-8 w-8 text-primary" />
            <h2 className="text-4xl md:text-5xl font-bold text-foreground">
              Privacy First
            </h2>
          </div>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Your data belongs to you. Cooldesk is designed with privacy as a core principle, 
            keeping everything local and giving you complete control.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {privacyFeatures.map((feature, index) => (
            <Card 
              key={feature.title}
              className="bg-gradient-card border-border/50 hover:shadow-card transition-all duration-300 animate-slide-up group"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <CardHeader>
                <div className="w-12 h-12 rounded-lg bg-primary/20 flex items-center justify-center mb-4 group-hover:shadow-glow transition-all duration-300">
                  <feature.icon className="h-6 w-6 text-primary" />
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

        {/* Privacy Policy Summary */}
        <Card className="bg-gradient-accent border-border/50 p-8 animate-slide-up">
          <div className="text-center">
            <FileText className="h-12 w-12 text-foreground mx-auto mb-4" />
            <h3 className="text-2xl font-semibold text-foreground mb-4">
              Privacy Policy Highlights
            </h3>
            <div className="max-w-4xl mx-auto text-left space-y-4 text-foreground/90">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold mb-2">🔒 Data Storage</h4>
                  <p className="text-sm">All browsing data, preferences, and activity logs are stored locally on your device using Chrome's storage APIs.</p>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">🌐 Network Communication</h4>
                  <p className="text-sm">Extension communicates only with your local desktop app (127.0.0.1:4000) and optionally with Google's Gemini API for AI features.</p>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">🧠 AI Features</h4>
                  <p className="text-sm">When enabled, minimal context (page URLs, titles) and user prompts are sent to Gemini API. No personal content or browsing history.</p>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">🛡️ No Tracking</h4>
                  <p className="text-sm">We don't collect analytics, track usage patterns, or store any data on external servers. Your privacy is absolute.</p>
                </div>
              </div>
            </div>
            <div className="mt-8">
              <SecondaryButton>
                <FileText className="mr-2 h-4 w-4" />
                View Full Privacy Policy
              </SecondaryButton>
            </div>
          </div>
        </Card>
      </div>
    </section>
  );
};