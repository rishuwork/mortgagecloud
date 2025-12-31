import { useState } from "react";
import { MortgageCalculator } from "@/components/calculators/MortgageCalculator";
import { TermBreakdownCalculator } from "@/components/calculators/TermBreakdownCalculator";
import { ScenarioComparison } from "@/components/calculators/ScenarioComparison";
import { AffordabilityCalculator } from "@/components/calculators/AffordabilityCalculator";
import { cn } from "@/lib/utils";
import { Calculator, Clock, ArrowLeftRight, Home } from "lucide-react";

const calculators = [
  { id: "payment", label: "Payment", icon: Calculator, component: MortgageCalculator },
  { id: "term", label: "Term Breakdown", icon: Clock, component: TermBreakdownCalculator },
  { id: "comparison", label: "Compare", icon: ArrowLeftRight, component: ScenarioComparison },
  { id: "affordability", label: "Affordability", icon: Home, component: AffordabilityCalculator },
];

export const CalculatorsSection = () => {
  const [activeCalculator, setActiveCalculator] = useState("payment");
  
  const ActiveComponent = calculators.find(c => c.id === activeCalculator)?.component || MortgageCalculator;

  return (
    <section id="calculators" className="py-20">
      <div className="container">
        <div className="text-center mb-12">
          <span className="inline-block px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
            Free Tools
          </span>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
            Mortgage Calculators
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Use our free calculators to explore your options. Get accurate estimates for 
            payments, affordability, and compare different scenarios.
          </p>
        </div>

        {/* Calculator Tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {calculators.map((calc) => (
            <button
              key={calc.id}
              onClick={() => setActiveCalculator(calc.id)}
              className={cn(
                "flex items-center gap-2 px-4 py-3 rounded-xl text-sm font-medium transition-all",
                activeCalculator === calc.id
                  ? "bg-primary text-primary-foreground shadow-primary"
                  : "bg-secondary text-muted-foreground hover:bg-secondary/80"
              )}
            >
              <calc.icon className="h-4 w-4" />
              <span className="hidden sm:inline">{calc.label}</span>
            </button>
          ))}
        </div>

        {/* Active Calculator */}
        <div className="max-w-2xl mx-auto">
          <ActiveComponent />
        </div>
      </div>
    </section>
  );
};
