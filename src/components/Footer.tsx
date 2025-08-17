import { Github, Twitter, Mail, Heart } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="py-16 bg-background border-t border-border/50">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div className="col-span-2">
            <h3 className="text-2xl font-bold text-foreground mb-4">
              Cooldesk
            </h3>
            <p className="text-muted-foreground leading-relaxed mb-4 max-w-md">
              Transform your Chrome experience with an intelligent, privacy-first 
              dashboard that keeps your data local and your browsing organized.
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 bg-primary/20 rounded-lg flex items-center justify-center text-primary hover:bg-primary hover:text-primary-foreground transition-all duration-300">
                <Github className="h-5 w-5" />
              </a>
              <a href="#" className="w-10 h-10 bg-tech-blue/20 rounded-lg flex items-center justify-center text-tech-blue hover:bg-tech-blue hover:text-white transition-all duration-300">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="w-10 h-10 bg-tech-purple/20 rounded-lg flex items-center justify-center text-tech-purple hover:bg-tech-purple hover:text-white transition-all duration-300">
                <Mail className="h-5 w-5" />
              </a>
            </div>
          </div>
          
          {/* Product */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">Product</h4>
            <ul className="space-y-2 text-muted-foreground">
              <li><a href="#" className="hover:text-primary transition-colors">Chrome Extension</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Desktop App</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Features</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Roadmap</a></li>
            </ul>
          </div>
          
          {/* Support */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">Support</h4>
            <ul className="space-y-2 text-muted-foreground">
              <li><a href="#" className="hover:text-primary transition-colors">Documentation</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Installation Guide</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Contact</a></li>
            </ul>
          </div>
        </div>
        
        <div className="pt-8 border-t border-border/50 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-muted-foreground text-sm">
            © 2024 Cooldesk. Built with privacy in mind.
          </p>
          <div className="flex items-center gap-2 text-muted-foreground text-sm">
            <span>Made with</span>
            <Heart className="h-4 w-4 text-red-500 animate-pulse" />
            <span>for better browsing</span>
          </div>
        </div>
      </div>
    </footer>
  );
};