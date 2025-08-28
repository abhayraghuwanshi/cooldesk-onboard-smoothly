import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { ArrowRight, Chrome, Download, Settings, CheckCircle, Zap } from "lucide-react";

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
    <section className="py-16 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-accent/5 pointer-events-none"></div>
      
      <div className="container mx-auto px-6 relative">
        <div className="text-center mb-12 animate-slide-up">
          <div className="inline-flex items-center gap-2 bg-primary/10 backdrop-blur-sm border border-primary/20 rounded-full px-6 py-2 mb-6">
            <Zap className="h-4 w-4 text-primary" />
            <span className="text-sm font-medium text-primary">Simple Setup</span>
          </div>
          <h2 className="text-5xl md:text-6xl font-bold mb-6 text-foreground bg-gradient-to-br from-foreground via-foreground to-muted-foreground bg-clip-text text-transparent">
            How It Works
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Transform your browsing experience in minutes with our seamless installation process. 
            Privacy-first, locally-powered intelligence at your fingertips.
          </p>
        </div>


        {/* Steps Grid */}
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-10">
          {steps.map((step, index) => (
            <Card 
              key={step.number}
              className="backdrop-blur-md bg-white/[0.02] border border-white/[0.08] hover:border-primary/20 hover:bg-white/[0.04] transition-all duration-500 animate-slide-up group shadow-xl shadow-primary/5 hover:shadow-primary/10 rounded-2xl overflow-hidden"
              style={{ animationDelay: `${index * 150}ms` }}
            >
              <CardHeader className="pb-6 relative">
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-primary/10 to-accent/10 rounded-full -translate-y-16 translate-x-16 group-hover:scale-110 transition-transform duration-500"></div>
                <div className="flex items-start gap-6 relative z-10">
                  <div className="flex flex-col items-center gap-3">
                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary to-accent text-white flex items-center justify-center font-bold text-lg shadow-lg shadow-primary/25 group-hover:shadow-primary/40 transition-all duration-300 group-hover:scale-110">
                      {step.number}
                    </div>
                    <div className="w-12 h-12 rounded-xl bg-primary/10 backdrop-blur-sm border border-primary/20 flex items-center justify-center group-hover:bg-primary/20 group-hover:shadow-lg group-hover:shadow-primary/25 transition-all duration-300 group-hover:scale-105">
                      <step.icon className="h-6 w-6 text-primary group-hover:text-primary/90" />
                    </div>
                  </div>
                  <div className="flex-1">
                    <CardTitle className="text-2xl font-bold text-foreground mb-3 group-hover:text-primary/90 transition-colors duration-300">
                      {step.title}
                    </CardTitle>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="pt-0">
                <p className="text-foreground/90 mb-4 text-lg leading-relaxed">
                  {step.description}
                </p>
                <div className="bg-gradient-to-r from-primary/5 to-accent/5 rounded-xl p-4 border border-primary/10">
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {step.details}
                  </p>
                </div>
                {index < steps.length - 1 && (
                  <div className="flex justify-center mt-6 lg:hidden">
                    <ArrowRight className="h-6 w-6 text-primary/50" />
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

      </div>
    </section>
  );
};