import { Button } from "@/components/ui/button";
import { ArrowRight, Shield, Award, Users, CheckCircle, Percent } from "lucide-react";

export const Hero = () => {
  const trustBadges = [
    { icon: Shield, label: "Licensed in Ontario" },
    { icon: Award, label: "5-Star Rated" },
    { icon: Percent, label: "Best Rates in the Market" },
  ];

  return (
    <section className="relative min-h-[90vh] flex items-center gradient-hero overflow-hidden pt-32 pb-20">
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-primary-foreground/5 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-accent/10 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary-foreground/3 rounded-full blur-3xl" />
      </div>

      <div className="container relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Trust indicator */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-foreground/10 backdrop-blur-sm border border-primary-foreground/20 mb-8 animate-fade-in">
            <CheckCircle className="h-4 w-4 text-accent" />
            <span className="text-sm text-primary-foreground/90">Trusted by Canadian homeowners</span>
          </div>

          {/* Main headline */}
          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-primary-foreground mb-6 leading-tight animate-slide-up">
            Smarter Mortgage Solutions{" "}
            <span className="text-accent">Across Canada</span>
          </h1>

          {/* Subheadline */}
          <p className="text-lg md:text-xl text-primary-foreground/80 mb-10 max-w-2xl mx-auto animate-slide-up" style={{ animationDelay: "0.1s" }}>
            Ontario-based mortgage expert serving clients nationwide. Get personalized solutions, competitive rates, and guidance you can trust.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16 animate-slide-up" style={{ animationDelay: "0.2s" }}>
            <Button variant="hero" size="xl" asChild>
              <a href="#calculators" className="group">
                Calculate My Mortgage
                <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </a>
            </Button>
            <Button variant="heroOutline" size="xl" asChild>
              <a href="#contact">Get Pre-Approved Free</a>
            </Button>
          </div>

          {/* Trust badges */}
          <div className="flex flex-wrap items-center justify-center gap-6 md:gap-12 animate-slide-up" style={{ animationDelay: "0.3s" }}>
            {trustBadges.map((badge, index) => (
              <div key={index} className="flex items-center gap-2 text-primary-foreground/70">
                <badge.icon className="h-5 w-5" />
                <span className="text-sm font-medium">{badge.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom wave */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
          <path
            d="M0 120L60 110C120 100 240 80 360 70C480 60 600 60 720 65C840 70 960 80 1080 85C1200 90 1320 90 1380 90L1440 90V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z"
            fill="hsl(var(--background))"
          />
        </svg>
      </div>
    </section>
  );
};
