import { useState, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Clock, TrendingDown, DollarSign, RefreshCw } from "lucide-react";
import { cn } from "@/lib/utils";

export const TermBreakdownCalculator = () => {
  const [mortgageAmount, setMortgageAmount] = useState(400000);
  const [interestRate, setInterestRate] = useState(5.5);
  const [termYears, setTermYears] = useState(5);
  const [amortization, setAmortization] = useState(25);

  const breakdown = useMemo(() => {
    const monthlyRate = interestRate / 100 / 12;
    const totalMonths = amortization * 12;
    const termMonths = termYears * 12;
    
    // Monthly payment calculation
    const monthlyPayment = mortgageAmount * 
      (monthlyRate * Math.pow(1 + monthlyRate, totalMonths)) /
      (Math.pow(1 + monthlyRate, totalMonths) - 1);
    
    // Calculate balance at end of term
    let balance = mortgageAmount;
    let totalInterestPaid = 0;
    let totalPrincipalPaid = 0;
    
    for (let month = 1; month <= termMonths; month++) {
      const interestPayment = balance * monthlyRate;
      const principalPayment = monthlyPayment - interestPayment;
      
      totalInterestPaid += interestPayment;
      totalPrincipalPaid += principalPayment;
      balance -= principalPayment;
    }
    
    const effectiveInterestCost = (totalInterestPaid / mortgageAmount) * 100;
    
    return {
      monthlyPayment,
      principalPaid: totalPrincipalPaid,
      interestPaid: totalInterestPaid,
      remainingBalance: Math.max(0, balance),
      effectiveInterestCost,
    };
  }, [mortgageAmount, interestRate, termYears, amortization]);

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("en-CA", {
      style: "currency",
      currency: "CAD",
      maximumFractionDigits: 0,
    }).format(value);
  };

  return (
    <Card variant="elevated" className="overflow-hidden">
      <CardHeader className="bg-secondary pb-8">
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2 bg-primary/10 rounded-lg">
            <Clock className="h-5 w-5 text-primary" />
          </div>
          <CardTitle>Term Breakdown Calculator</CardTitle>
        </div>
        <CardDescription>
          See how much you'll pay during your mortgage term and what's left at renewal
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

        {/* Interest Rate */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <Label className="font-medium">Interest Rate</Label>
            <span className="text-lg font-bold text-primary">{interestRate}%</span>
          </div>
          <Slider
            min={1}
            max={10}
            step={0.05}
            value={[interestRate]}
            onValueChange={([value]) => setInterestRate(value)}
            className="py-2"
          />
        </div>

        {/* Term Length */}
        <div className="space-y-3">
          <Label className="font-medium">Term Length</Label>
          <div className="grid grid-cols-5 gap-2">
            {[1, 2, 3, 4, 5].map((years) => (
              <button
                key={years}
                onClick={() => setTermYears(years)}
                className={cn(
                  "py-3 rounded-lg text-sm font-medium transition-all",
                  termYears === years
                    ? "bg-primary text-primary-foreground shadow-primary"
                    : "bg-muted text-muted-foreground hover:bg-muted/80"
                )}
              >
                {years}yr
              </button>
            ))}
          </div>
        </div>

        {/* Amortization */}
        <div className="space-y-3">
          <Label className="font-medium">Amortization</Label>
          <div className="flex gap-2">
            {[25, 30].map((years) => (
              <button
                key={years}
                onClick={() => setAmortization(years)}
                className={cn(
                  "flex-1 py-3 rounded-lg text-sm font-medium transition-all",
                  amortization === years
                    ? "bg-primary text-primary-foreground shadow-primary"
                    : "bg-muted text-muted-foreground hover:bg-muted/80"
                )}
              >
                {years} Years
              </button>
            ))}
          </div>
        </div>

        {/* Results */}
        <div className="mt-8 space-y-4">
          <div className="text-center p-4 rounded-xl bg-secondary border border-border">
            <p className="text-sm text-muted-foreground mb-1">Monthly Payment</p>
            <p className="text-3xl font-display font-bold text-primary">
              {formatCurrency(breakdown.monthlyPayment)}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 rounded-xl bg-success/10 border border-success/20">
              <div className="flex items-center gap-2 mb-2">
                <DollarSign className="h-4 w-4 text-success" />
                <span className="text-sm text-muted-foreground">Principal Paid</span>
              </div>
              <p className="text-xl font-bold text-success">{formatCurrency(breakdown.principalPaid)}</p>
            </div>
            
            <div className="p-4 rounded-xl bg-destructive/10 border border-destructive/20">
              <div className="flex items-center gap-2 mb-2">
                <TrendingDown className="h-4 w-4 text-destructive" />
                <span className="text-sm text-muted-foreground">Interest Paid</span>
              </div>
              <p className="text-xl font-bold text-destructive">{formatCurrency(breakdown.interestPaid)}</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 rounded-xl bg-info/10 border border-info/20">
              <div className="flex items-center gap-2 mb-2">
                <RefreshCw className="h-4 w-4 text-info" />
                <span className="text-sm text-muted-foreground">Balance at Renewal</span>
              </div>
              <p className="text-xl font-bold text-info">{formatCurrency(breakdown.remainingBalance)}</p>
            </div>
            
            <div className="p-4 rounded-xl bg-accent/10 border border-accent/20">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-sm text-muted-foreground">Effective Interest Cost</span>
              </div>
              <p className="text-xl font-bold text-accent">{breakdown.effectiveInterestCost.toFixed(1)}%</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
