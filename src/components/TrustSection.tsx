import { Building2, GraduationCap, HeartHandshake, Shield, Star } from "lucide-react";

const benefits = [
  {
    icon: Building2,
    title: "Access to 50+ Lenders",
    description: "Shop the entire market with one application. I work with major banks, credit unions, and alternative lenders.",
  },
  {
    icon: GraduationCap,
    title: "Education-First Approach",
    description: "I believe in empowering you with knowledge. Understand your options before making any decisions.",
  },
  {
    icon: HeartHandshake,
    title: "Personalized Service",
    description: "No call centers. Work directly with me throughout your entire mortgage journey.",
  },
  {
    icon: Shield,
    title: "Best Rate Guarantee",
    description: "If you find a better rate for the same product within 10 days, I'll match it or beat it.",
  },
];

const stats = [
  { value: "1,000+", label: "Happy Clients" },
  { value: "50+", label: "Lender Partners" },
  { value: "4.9/5", label: "Google Rating" },
  { value: "$500M+", label: "Mortgages Funded" },
];

export const TrustSection = () => {
  return (
    <section id="about" className="py-20">
      <div className="container">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left side - About */}
          <div>
            <span className="inline-block px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
              Why Work With Me
            </span>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-6">
              Your Trusted Partner in{" "}
              <span className="text-primary">Mortgage Solutions</span>
            </h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              Hi, I'm Rishab Ahuja, a licensed mortgage broker based in Ontario, serving clients across Canada. 
              With years of experience and access to over 50 lenders, I'm committed to finding you the best 
              mortgage solution tailored to your unique situation.
            </p>
            <p className="text-muted-foreground mb-8 leading-relaxed">
              As an independent broker, I work for YOU, not the banks. This means I can shop the entire 
              market to find the most competitive rates and terms, often with products and options that 
              aren't available to the public.
            </p>

            {/* Benefits */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {benefits.map((benefit, index) => (
                <div key={index} className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center flex-shrink-0">
                    <benefit.icon className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground text-sm">{benefit.title}</h4>
                    <p className="text-xs text-muted-foreground">{benefit.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right side - Stats & Testimonial */}
          <div className="space-y-6">
            {/* Stats */}
            <div className="grid grid-cols-2 gap-4">
              {stats.map((stat, index) => (
                <div 
                  key={index} 
                  className="p-6 rounded-xl bg-secondary text-center hover:bg-primary hover:text-primary-foreground transition-colors duration-300 group"
                >
                  <p className="font-display text-3xl font-bold mb-1">{stat.value}</p>
                  <p className="text-sm text-muted-foreground group-hover:text-primary-foreground/70">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>

            {/* Testimonial */}
            <div className="p-6 rounded-xl gradient-hero text-primary-foreground">
              <div className="flex items-center gap-1 mb-4">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star key={star} className="h-5 w-5 fill-accent text-accent" />
                ))}
              </div>
              <blockquote className="text-lg leading-relaxed mb-4">
                "Rishab made buying our first home so much easier. He explained everything clearly, 
                got us an amazing rate, and was available whenever we had questions. Highly recommend!"
              </blockquote>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary-foreground/20 flex items-center justify-center">
                  <span className="font-bold">SM</span>
                </div>
                <div>
                  <p className="font-semibold">Sarah & Michael</p>
                  <p className="text-sm text-primary-foreground/70">First-Time Buyers, Toronto</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
