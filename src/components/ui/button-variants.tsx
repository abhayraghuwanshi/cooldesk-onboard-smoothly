import { Button } from "./button";
import { cn } from "@/lib/utils";
import { ButtonProps } from "./button";

// Hero button variant
export const HeroButton = ({ className, children, ...props }: ButtonProps) => (
  <Button
    className={cn(
      "bg-gradient-hero text-primary-foreground hover:shadow-glow transition-all duration-300 hover:scale-105 px-8 py-6 text-lg font-semibold rounded-xl border-0",
      className
    )}
    {...props}
  >
    {children}
  </Button>
);

// Secondary button variant  
export const SecondaryButton = ({ className, children, ...props }: ButtonProps) => (
  <Button
    className={cn(
      "bg-background border-2 border-primary text-foreground hover:bg-primary/10 transition-all duration-300 px-8 py-6 text-lg font-semibold rounded-xl",
      className
    )}
    {...props}
  >
    {children}
  </Button>
);

// Feature card button
export const FeatureButton = ({ className, children, ...props }: ButtonProps) => (
  <Button
    className={cn(
      "bg-tech-blue/20 text-tech-blue hover:bg-tech-blue/30 transition-all duration-300 border border-tech-blue/30 rounded-lg",
      className
    )}
    {...props}
  >
    {children}
  </Button>
);