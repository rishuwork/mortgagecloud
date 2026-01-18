import { Card, CardContent } from "@/components/ui/card";
import {
  Home,
  RefreshCw,
  DollarSign,
  Building,
  Briefcase,
  ShieldCheck
} from "lucide-react";

const services = [
  {
    icon: Home,
    title: "First-Time Home Buyers",
    description: "Navigate your first home purchase with confidence. I'll guide you through every step, from pre-approval to closing.",
  },
  {
    icon: RefreshCw,
    title: "Mortgage Renewals",
    description: "Don't just sign your renewal. Let me shop the market and find you a better rate that could save you thousands.",
  },
  {
    icon: DollarSign,
    title: "Refinancing",
    description: "Access your home equity for renovations, debt consolidation, or investments with competitive refinancing options.",
  },
  {
    icon: Building,
    title: "Investment Properties",
    description: "Grow your portfolio with specialized financing for rental properties and multi-unit buildings.",
  },
  {
    icon: Briefcase,
    title: "Self-Employed",
    description: "Flexible income verification solutions for business owners, contractors, and freelancers.",
  },
  {
    icon: ShieldCheck,
    title: "Alternative & Private Lending",
    description: "Solutions for unique situations including bruised credit, new immigrants, and non-traditional income.",
  },
];

export const ServicesSection = () => {
  return (
    <section id="services" className="py-20 bg-secondary/30 scroll-mt-28">
      <div className="container">
        <div className="text-center mb-12">
          <span className="inline-block px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
            Services
          </span>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
            Mortgage Solutions for Every Situation
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Whether you're buying your first home or expanding your investment portfolio,
            I have the expertise and lender relationships to find the right solution for you.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <Card
              key={index}
              variant="elevated"
              className="group hover:-translate-y-1 transition-all duration-300"
            >
              <CardContent className="p-6">
                <div className="w-12 h-12 rounded-xl gradient-hero flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  <service.icon className="h-6 w-6 text-primary-foreground" />
                </div>
                <h3 className="font-display text-lg font-bold text-foreground mb-2">
                  {service.title}
                </h3>
                <p className="text-base text-muted-foreground leading-relaxed">
                  {service.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
