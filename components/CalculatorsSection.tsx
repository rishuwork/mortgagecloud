"use client";

import { useState } from "react";
import { TermBreakdownCalculator } from "@/components/calculators/TermBreakdownCalculator";
import { ScenarioComparison } from "@/components/calculators/ScenarioComparison";
import { AffordabilityCalculator } from "@/components/calculators/AffordabilityCalculator";
import { cn } from "@/lib/utils";
import { Calculator, ArrowLeftRight, Home } from "lucide-react";

const calculators = [
  { id: "payment", label: "Payment", icon: Calculator, component: TermBreakdownCalculator },
  { id: "comparison", label: "Compare", icon: ArrowLeftRight, component: ScenarioComparison },
  { id: "affordability", label: "Affordability", icon: Home, component: AffordabilityCalculator },
];

export const CalculatorsSection = () => {
  const [activeCalculator, setActiveCalculator] = useState("payment");

  const ActiveComponent = calculators.find(c => c.id === activeCalculator)?.component || TermBreakdownCalculator;

  return (
    <section id="calculators" className="py-16 scroll-mt-28">
      <div className="container">
        <div className="text-center mb-8">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
            Mortgage Calculators
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Use our free calculators to explore your options. Get accurate estimates for
            payments, affordability, and compare different scenarios.
          </p>
        </div>

        {/* Calculator Tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-6">
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
              <span>{calc.label}</span>
            </button>
          ))}
        </div>

        {/* Active Calculator - compact frame */}
        <div className="max-w-3xl mx-auto">
          <ActiveComponent />
        </div>
      </div>
    </section>
  );
};
