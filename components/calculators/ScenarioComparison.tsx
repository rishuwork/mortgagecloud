"use client";

import { useState, useMemo } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { TrendingUp, CheckCircle, XCircle } from "lucide-react";
import { cn } from "@/lib/utils";

interface Scenario {
  name: string;
  rate: number;
  amortization: number;
  term: number;
  type: "fixed" | "variable";
}

export const ScenarioComparison = () => {
  const [mortgageAmount, setMortgageAmount] = useState(400000);
  const [scenarioA, setScenarioA] = useState<Scenario>({
    name: "Fixed Rate",
    rate: 5.5,
    amortization: 25,
    term: 5,
    type: "fixed",
  });
  const [scenarioB, setScenarioB] = useState<Scenario>({
    name: "Variable Rate",
    rate: 4.8,
    amortization: 25,
    term: 5,
    type: "variable",
  });

  const calculateScenario = (scenario: Scenario) => {
    const monthlyRate = scenario.rate / 100 / 12;
    const totalMonths = scenario.amortization * 12;
    const termMonths = scenario.term * 12;

    const monthlyPayment = mortgageAmount *
      (monthlyRate * Math.pow(1 + monthlyRate, totalMonths)) /
      (Math.pow(1 + monthlyRate, totalMonths) - 1);

    // Calculate interest paid over the term
    let balance = mortgageAmount;
    let totalInterestTerm = 0;

    for (let i = 0; i < termMonths; i++) {
      const interest = balance * monthlyRate;
      const principal = monthlyPayment - interest;
      totalInterestTerm += interest;
      balance -= principal;
    }

    const totalPaidTerm = monthlyPayment * termMonths;
    const totalPrincipalTerm = totalPaidTerm - totalInterestTerm;

    return {
      monthlyPayment,
      totalPaidTerm,
      totalInterestTerm,
      totalPrincipalTerm,
    };
  };

  const resultsA = useMemo(() => calculateScenario(scenarioA), [scenarioA, mortgageAmount]);
  const resultsB = useMemo(() => calculateScenario(scenarioB), [scenarioB, mortgageAmount]);

  const comparison = useMemo(() => {
    const paymentDiff = resultsA.monthlyPayment - resultsB.monthlyPayment;
    const interestDiff = resultsA.totalInterestTerm - resultsB.totalInterestTerm;
    const betterScenario = interestDiff > 0 ? "B" : "A";

    return {
      paymentDiff: Math.abs(paymentDiff),
      interestSaved: Math.abs(interestDiff),
      betterScenario,
      betterName: interestDiff > 0 ? scenarioB.name : scenarioA.name,
    };
  }, [resultsA, resultsB, scenarioA.name, scenarioB.name]);

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("en-CA", {
      style: "currency",
      currency: "CAD",
      maximumFractionDigits: 0,
    }).format(value);
  };

  const ScenarioCard = ({
    scenario,
    setScenario,
    results,
    isBetter,
  }: {
    scenario: Scenario;
    setScenario: (s: Scenario) => void;
    results: ReturnType<typeof calculateScenario>;
    isBetter: boolean;
  }) => (
    <div className={cn(
      "flex-1 p-3 rounded-xl border-2 transition-all",
      isBetter ? "border-success bg-success/5" : "border-border bg-card"
    )}>
      <div className="flex items-center justify-between mb-4">
        <Input
          value={scenario.name}
          onChange={(e) => setScenario({ ...scenario, name: e.target.value })}
          className="font-bold text-xl border-none bg-transparent p-0 h-auto focus-visible:ring-0 w-36"
        />
        {isBetter ? (
          <span className="flex items-center gap-1 text-sm font-medium text-success">
            <CheckCircle className="h-4 w-4" />
            Better
          </span>
        ) : (
          <span className="flex items-center gap-1 text-sm font-medium text-muted-foreground">
            <XCircle className="h-4 w-4" />
          </span>
        )}
      </div>

      <div className="space-y-4">
        {/* Rate Type */}
        <div className="flex gap-2">
          {(["fixed", "variable"] as const).map((type) => (
            <button
              key={type}
              onClick={() => setScenario({ ...scenario, type, term: type === 'variable' ? 5 : scenario.term })}
              className={cn(
                "flex-1 py-2 rounded-md text-sm font-medium transition-all capitalize",
                scenario.type === type
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-muted-foreground hover:bg-muted/80"
              )}
            >
              {type}
            </button>
          ))}
        </div>

        {/* Term Selection */}
        <div className="space-y-2">
          <Label className="text-sm text-muted-foreground">Term</Label>
          <div className="flex gap-1">
            {scenario.type === 'variable' ? (
              <button className="flex-1 py-2 rounded-md text-sm font-medium bg-primary text-primary-foreground">5yr</button>
            ) : (
              [1, 2, 3, 4, 5].map(yr => (
                <button
                  key={yr}
                  onClick={() => setScenario({ ...scenario, term: yr })}
                  className={cn(
                    "flex-1 py-2 rounded-md text-sm font-medium transition-all",
                    scenario.term === yr
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted text-muted-foreground hover:bg-muted/80"
                  )}
                >
                  {yr}yr
                </button>
              ))
            )}
          </div>
        </div>

        {/* Rate */}
        <div className="space-y-1">
          <div className="flex items-center justify-between">
            <Label className="text-xs text-muted-foreground">Rate (%)</Label>
            <Input
              type="number"
              step="0.05"
              value={scenario.rate}
              onChange={(e) => setScenario({ ...scenario, rate: Number(e.target.value) || 0 })}
              className="w-16 h-6 text-right font-bold text-sm p-0 border-none bg-transparent"
            />
          </div>
          <Slider
            min={1}
            max={10}
            step={0.05}
            value={[scenario.rate]}
            onValueChange={([value]) => setScenario({ ...scenario, rate: value })}
            className="py-1"
          />
        </div>

        {/* Amortization */}
        <div className="space-y-1">
          <Label className="text-xs text-muted-foreground">Amortization</Label>
          <div className="flex gap-1">
            {[25, 30].map((years) => (
              <button
                key={years}
                onClick={() => setScenario({ ...scenario, amortization: years })}
                className={cn(
                  "flex-1 py-1.5 rounded-md text-xs font-medium transition-all",
                  scenario.amortization === years
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-muted-foreground hover:bg-muted/80"
                )}
              >
                {years}yr
              </button>
            ))}
          </div>
        </div>

        {/* Results */}
        <div className="pt-4 border-t border-border space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Monthly Pmt</span>
            <span className="font-bold text-base">{formatCurrency(results.monthlyPayment)}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Term Interest</span>
            <span className="font-bold text-base text-destructive">{formatCurrency(results.totalInterestTerm)}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Principal Paid in the Term</span>
            <span className="font-bold text-base">{formatCurrency(results.totalPrincipalTerm)}</span>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <Card variant="elevated" className="overflow-hidden">
      <CardContent className="p-4 space-y-4">
        {/* Mortgage Amount */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label className="font-medium text-base">Mortgage Amount</Label>
            <Input
              type="number"
              value={mortgageAmount}
              onChange={(e) => setMortgageAmount(Number(e.target.value) || 0)}
              className="w-32 h-9 text-right font-bold text-xl text-primary"
            />
          </div>
          <Slider
            min={50000}
            max={1500000}
            step={10000}
            value={[mortgageAmount]}
            onValueChange={([value]) => setMortgageAmount(value)}
            className="py-1"
          />
        </div>

        {/* Comparison Cards */}
        <div className="flex flex-col md:flex-row gap-3">
          <ScenarioCard
            scenario={scenarioA}
            setScenario={setScenarioA}
            results={resultsA}
            isBetter={comparison.betterScenario === "A"}
          />
          <ScenarioCard
            scenario={scenarioB}
            setScenario={setScenarioB}
            results={resultsB}
            isBetter={comparison.betterScenario === "B"}
          />
        </div>

        {/* Summary */}
        <div className="p-4 rounded-xl gradient-success text-success-foreground">
          <div className="flex items-center gap-2 mb-2">
            <TrendingUp className="h-4 w-4" />
            <span className="font-bold text-sm">Comparison Summary</span>
          </div>
          <p className="text-sm opacity-90 leading-relaxed">
            <strong>{comparison.betterName}</strong> saves you{" "}
            <strong>{formatCurrency(comparison.interestSaved)}</strong> in interest over the selected terms.
            Monthly payment difference: <strong>{formatCurrency(comparison.paymentDiff)}</strong>.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};
