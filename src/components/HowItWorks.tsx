import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { ArrowRight, Chrome, Download, Settings, CheckCircle } from "lucide-react";

const steps = [
  {
    number: "01",
    icon: Chrome,
    title: "Install Extension",
    description: "Go to chrome://extensions → Enable Developer mode → Load unpacked → Choose the extension/ folder",
    details: "The extension replaces your New Tab and adds a Side Panel dashboard"
  },
  {
    number: "02", 
    icon: Download,
    title: "Download Desktop App (Optional)",
    description: "Download and install the desktop companion for enhanced features and AI capabilities",
    details: "Runs locally on 127.0.0.1:4000 with token authentication"
  },
  {
    number: "03",
    icon: Settings,
    title: "Connect & Configure",
    description: "Copy the Bridge Token from the desktop app and paste it in the extension Options page",
    details: "This enables secure local communication between extension and desktop app"
  },
  {
    number: "04",
    icon: CheckCircle,
    title: "Start Using",
    description: "Open a new tab and access the Side Panel to see your Current Tabs and Activity Feed",
    details: "Your browsing data stays local while you get intelligent insights"
  }
];

export const HowItWorks = () => {
  return (
    <section className="py-24 bg-gradient-quantum relative">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16 animate-slide-up">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">
            How It Works
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Get up and running in minutes with our simple installation process.
          </p>
        </div>

        {/* Architecture Diagram */}
        <div className="mb-16 p-8 bg-background/50 rounded-2xl border border-border/50 animate-slide-up">
          <h3 className="text-2xl font-semibold mb-6 text-center text-foreground">Architecture Overview</h3>
          <div className="font-mono text-sm text-muted-foreground max-w-4xl mx-auto overflow-x-auto">
            <pre className="whitespace-pre text-center leading-relaxed">
{`┌─────────────────┐    HTTP/WS     ┌──────────────────┐
│ Chrome Extension│◄─────────────►│ Desktop App      │
│ • New Tab UI    │  127.0.0.1:4000│ • Local Server   │
│ • Side Panel    │   Token Auth   │ • Rate Limiting   │
│ • Content Script│                │ • Gemini API      │
└─────────────────┘                └──────────────────┘
         │                                   │
         │ Engagement Data                   │ AI Features
         ▼                                   ▼
┌─────────────────┐                ┌──────────────────┐
│ Local Storage   │                │ Google Gemini    │
│ • Tab History   │                │ • Summaries      │
│ • Activity Feed │                │ • Suggestions    │
│ • User Prefs    │                │ (Optional)       │
└─────────────────┘                └──────────────────┘`}
            </pre>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {steps.map((step, index) => (
            <Card 
              key={step.number}
              className="bg-background border-border/50 hover:shadow-card transition-all duration-300 animate-slide-up group"
              style={{ animationDelay: `${index * 150}ms` }}
            >
              <CardHeader className="pb-4">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-lg">
                    {step.number}
                  </div>
                  <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center group-hover:shadow-glow transition-all duration-300">
                    <step.icon className="h-5 w-5 text-primary" />
                  </div>
                </div>
                <CardTitle className="text-xl font-semibold text-foreground">
                  {step.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-foreground mb-3 font-medium">
                  {step.description}
                </p>
                <p className="text-muted-foreground text-sm">
                  {step.details}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};