import { useState, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { ArrowLeftRight, TrendingUp, CheckCircle, XCircle } from "lucide-react";
import { cn } from "@/lib/utils";

interface Scenario {
  name: string;
  rate: number;
  amortization: number;
  type: "fixed" | "variable";
}

export const ScenarioComparison = () => {
  const [mortgageAmount, setMortgageAmount] = useState(400000);
  const [scenarioA, setScenarioA] = useState<Scenario>({
    name: "Fixed Rate",
    rate: 5.5,
    amortization: 25,
    type: "fixed",
  });
  const [scenarioB, setScenarioB] = useState<Scenario>({
    name: "Variable Rate",
    rate: 4.8,
    amortization: 25,
    type: "variable",
  });

  const calculateScenario = (scenario: Scenario) => {
    const monthlyRate = scenario.rate / 100 / 12;
    const totalMonths = scenario.amortization * 12;
    
    const monthlyPayment = mortgageAmount * 
      (monthlyRate * Math.pow(1 + monthlyRate, totalMonths)) /
      (Math.pow(1 + monthlyRate, totalMonths) - 1);
    
    const totalPaid = monthlyPayment * totalMonths;
    const totalInterest = totalPaid - mortgageAmount;
    
    return {
      monthlyPayment,
      totalPaid,
      totalInterest,
    };
  };

  const resultsA = useMemo(() => calculateScenario(scenarioA), [scenarioA, mortgageAmount]);
  const resultsB = useMemo(() => calculateScenario(scenarioB), [scenarioB, mortgageAmount]);

  const comparison = useMemo(() => {
    const paymentDiff = resultsA.monthlyPayment - resultsB.monthlyPayment;
    const interestDiff = resultsA.totalInterest - resultsB.totalInterest;
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
    label 
  }: { 
    scenario: Scenario; 
    setScenario: (s: Scenario) => void;
    results: ReturnType<typeof calculateScenario>;
    isBetter: boolean;
    label: string;
  }) => (
    <div className={cn(
      "flex-1 p-5 rounded-xl border-2 transition-all",
      isBetter ? "border-success bg-success/5" : "border-border bg-card"
    )}>
      <div className="flex items-center justify-between mb-4">
        <Input
          value={scenario.name}
          onChange={(e) => setScenario({ ...scenario, name: e.target.value })}
          className="font-bold text-lg border-none bg-transparent p-0 h-auto focus-visible:ring-0"
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
              onClick={() => setScenario({ ...scenario, type })}
              className={cn(
                "flex-1 py-2 rounded-lg text-xs font-medium transition-all capitalize",
                scenario.type === type
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-muted-foreground hover:bg-muted/80"
              )}
            >
              {type}
            </button>
          ))}
        </div>

        {/* Rate */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label className="text-sm">Rate</Label>
            <span className="font-bold text-primary">{scenario.rate}%</span>
          </div>
          <Slider
            min={1}
            max={10}
            step={0.05}
            value={[scenario.rate]}
            onValueChange={([value]) => setScenario({ ...scenario, rate: value })}
          />
        </div>

        {/* Amortization */}
        <div className="space-y-2">
          <Label className="text-sm">Amortization</Label>
          <div className="flex gap-2">
            {[25, 30].map((years) => (
              <button
                key={years}
                onClick={() => setScenario({ ...scenario, amortization: years })}
                className={cn(
                  "flex-1 py-2 rounded-lg text-xs font-medium transition-all",
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
            <span className="text-muted-foreground">Monthly Payment</span>
            <span className="font-bold">{formatCurrency(results.monthlyPayment)}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Total Interest</span>
            <span className="font-bold text-destructive">{formatCurrency(results.totalInterest)}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Total Paid</span>
            <span className="font-bold">{formatCurrency(results.totalPaid)}</span>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <Card variant="elevated" className="overflow-hidden">
      <CardHeader className="bg-secondary pb-8">
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2 bg-primary/10 rounded-lg">
            <ArrowLeftRight className="h-5 w-5 text-primary" />
          </div>
          <CardTitle>Scenario Comparison</CardTitle>
        </div>
        <CardDescription>
          Compare two mortgage scenarios side-by-side to find the best option
        </CardDescription>
      </CardHeader>
      
      <CardContent className="p-6 space-y-6">
        {/* Mortgage Amount */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <Label className="font-medium">Mortgage Amount</Label>
            <span className="text-lg font-bold text-primary">{formatCurrency(mortgageAmount)}</span>
          </div>
          <Slider
            min={50000}
            max={1500000}
            step={10000}
            value={[mortgageAmount]}
            onValueChange={([value]) => setMortgageAmount(value)}
            className="py-2"
          />
        </div>

        {/* Comparison Cards */}
        <div className="flex flex-col md:flex-row gap-4">
          <ScenarioCard
            scenario={scenarioA}
            setScenario={setScenarioA}
            results={resultsA}
            isBetter={comparison.betterScenario === "A"}
            label="Scenario A"
          />
          <ScenarioCard
            scenario={scenarioB}
            setScenario={setScenarioB}
            results={resultsB}
            isBetter={comparison.betterScenario === "B"}
            label="Scenario B"
          />
        </div>

        {/* Summary */}
        <div className="p-5 rounded-xl gradient-success text-success-foreground">
          <div className="flex items-center gap-2 mb-3">
            <TrendingUp className="h-5 w-5" />
            <span className="font-bold">Comparison Summary</span>
          </div>
          <p className="text-sm opacity-90">
            <strong>{comparison.betterName}</strong> saves you{" "}
            <strong>{formatCurrency(comparison.interestSaved)}</strong> in interest over the life of the mortgage.
            Monthly payment difference: <strong>{formatCurrency(comparison.paymentDiff)}</strong>.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};
