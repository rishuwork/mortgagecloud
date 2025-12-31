import { useState, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Home, DollarSign, CreditCard, Wallet, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

export const AffordabilityCalculator = () => {
  const [annualIncome, setAnnualIncome] = useState(100000);
  const [monthlyDebts, setMonthlyDebts] = useState(500);
  const [downPayment, setDownPayment] = useState(50000);
  const [creditScore, setCreditScore] = useState<"excellent" | "good" | "fair" | "poor">("good");
  const [interestRate, setInterestRate] = useState(5.5);

  const affordability = useMemo(() => {
    const monthlyIncome = annualIncome / 12;
    
    // GDS (Gross Debt Service) ratio - max 32-39% depending on credit
    // TDS (Total Debt Service) ratio - max 40-44% depending on credit
    const gdsLimit = creditScore === "excellent" ? 0.39 : 
                     creditScore === "good" ? 0.35 : 
                     creditScore === "fair" ? 0.32 : 0.30;
    
    const tdsLimit = creditScore === "excellent" ? 0.44 : 
                     creditScore === "good" ? 0.42 : 
                     creditScore === "fair" ? 0.40 : 0.38;
    
    // Stress test rate (higher of contract rate + 2% or 5.25%)
    const stressTestRate = Math.max(interestRate + 2, 5.25) / 100 / 12;
    
    // Estimate property tax (0.8%) and heating ($150/month)
    const estimatedPropertyTax = 0.008 / 12;
    const estimatedHeating = 150;
    
    // Maximum housing payment based on GDS
    const maxHousingPayment = (monthlyIncome * gdsLimit) - estimatedHeating;
    
    // Maximum total debt payments based on TDS
    const maxTotalDebt = monthlyIncome * tdsLimit;
    const availableForMortgage = maxTotalDebt - monthlyDebts - estimatedHeating;
    
    // Use the lower of GDS or TDS constraints
    const maxPaymentConstrained = Math.min(maxHousingPayment, availableForMortgage);
    
    // Calculate maximum mortgage amount (25-year amortization with stress test)
    const amortizationMonths = 25 * 12;
    const maxMortgage = maxPaymentConstrained / 
      ((stressTestRate * Math.pow(1 + stressTestRate, amortizationMonths)) / 
       (Math.pow(1 + stressTestRate, amortizationMonths) - 1) + estimatedPropertyTax);
    
    // Maximum purchase price
    const maxPurchasePrice = maxMortgage + downPayment;
    
    // Calculate actual monthly payment at contract rate
    const monthlyRate = interestRate / 100 / 12;
    const actualMonthlyPayment = maxMortgage * 
      (monthlyRate * Math.pow(1 + monthlyRate, amortizationMonths)) /
      (Math.pow(1 + monthlyRate, amortizationMonths) - 1);
    
    return {
      maxPurchasePrice: Math.max(0, maxPurchasePrice),
      maxMortgage: Math.max(0, maxMortgage),
      monthlyPayment: actualMonthlyPayment,
      gdsRatio: ((actualMonthlyPayment + estimatedHeating + (maxPurchasePrice * estimatedPropertyTax)) / monthlyIncome) * 100,
      tdsRatio: ((actualMonthlyPayment + monthlyDebts + estimatedHeating + (maxPurchasePrice * estimatedPropertyTax)) / monthlyIncome) * 100,
    };
  }, [annualIncome, monthlyDebts, downPayment, creditScore, interestRate]);

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("en-CA", {
      style: "currency",
      currency: "CAD",
      maximumFractionDigits: 0,
    }).format(value);
  };

  const creditScoreOptions = [
    { value: "excellent", label: "Excellent", range: "760+" },
    { value: "good", label: "Good", range: "680-759" },
    { value: "fair", label: "Fair", range: "620-679" },
    { value: "poor", label: "Rebuilding", range: "<620" },
  ] as const;

  return (
    <Card variant="elevated" className="overflow-hidden">
      <CardHeader className="bg-secondary pb-8">
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2 bg-primary/10 rounded-lg">
            <Home className="h-5 w-5 text-primary" />
          </div>
          <CardTitle>Affordability Calculator</CardTitle>
        </div>
        <CardDescription>
          Estimate your maximum purchase price based on Canadian lending guidelines
        </CardDescription>
      </CardHeader>
      
      <CardContent className="p-6 space-y-6">
        {/* Annual Income */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <Label className="font-medium flex items-center gap-2">
              <Wallet className="h-4 w-4 text-muted-foreground" />
              Annual Household Income
            </Label>
            <span className="text-lg font-bold text-primary">{formatCurrency(annualIncome)}</span>
          </div>
          <Slider
            min={30000}
            max={500000}
            step={5000}
            value={[annualIncome]}
            onValueChange={([value]) => setAnnualIncome(value)}
            className="py-2"
          />
        </div>

        {/* Monthly Debts */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <Label className="font-medium flex items-center gap-2">
              <CreditCard className="h-4 w-4 text-muted-foreground" />
              Monthly Debt Payments
            </Label>
            <span className="text-lg font-bold text-primary">{formatCurrency(monthlyDebts)}</span>
          </div>
          <Slider
            min={0}
            max={5000}
            step={50}
            value={[monthlyDebts]}
            onValueChange={([value]) => setMonthlyDebts(value)}
            className="py-2"
          />
          <p className="text-xs text-muted-foreground">
            Include car payments, credit cards, loans, etc.
          </p>
        </div>

        {/* Down Payment */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <Label className="font-medium flex items-center gap-2">
              <DollarSign className="h-4 w-4 text-muted-foreground" />
              Down Payment
            </Label>
            <span className="text-lg font-bold text-primary">{formatCurrency(downPayment)}</span>
          </div>
          <Slider
            min={5000}
            max={500000}
            step={5000}
            value={[downPayment]}
            onValueChange={([value]) => setDownPayment(value)}
            className="py-2"
          />
        </div>

        {/* Interest Rate */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <Label className="font-medium">Expected Interest Rate</Label>
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

        {/* Credit Score */}
        <div className="space-y-3">
          <Label className="font-medium">Credit Score Range</Label>
          <div className="grid grid-cols-2 gap-2">
            {creditScoreOptions.map((option) => (
              <button
                key={option.value}
                onClick={() => setCreditScore(option.value)}
                className={cn(
                  "p-3 rounded-lg text-left transition-all",
                  creditScore === option.value
                    ? "bg-primary text-primary-foreground shadow-primary"
                    : "bg-muted text-muted-foreground hover:bg-muted/80"
                )}
              >
                <span className="block text-sm font-medium">{option.label}</span>
                <span className={cn(
                  "block text-xs",
                  creditScore === option.value ? "text-primary-foreground/70" : "text-muted-foreground"
                )}>
                  {option.range}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Results */}
        <div className="mt-8 p-6 rounded-xl gradient-hero text-primary-foreground">
          <p className="text-sm text-primary-foreground/70 mb-2">You can afford up to</p>
          <p className="text-4xl font-display font-bold mb-4">
            {formatCurrency(affordability.maxPurchasePrice)}
          </p>
          
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <p className="text-primary-foreground/70">Maximum Mortgage</p>
              <p className="font-semibold">{formatCurrency(affordability.maxMortgage)}</p>
            </div>
            <div>
              <p className="text-primary-foreground/70">Est. Monthly Payment</p>
              <p className="font-semibold">{formatCurrency(affordability.monthlyPayment)}</p>
            </div>
          </div>
          
          <div className="mt-4 pt-4 border-t border-primary-foreground/20 text-xs text-primary-foreground/60">
            Based on stress test rate of {Math.max(interestRate + 2, 5.25).toFixed(2)}% and 25-year amortization.
            Actual approval may vary.
          </div>
        </div>

        <Button variant="cta" className="w-full" asChild>
          <a href="#contact">
            Get Pre-Approved Today
            <ArrowRight className="h-4 w-4" />
          </a>
        </Button>
      </CardContent>
    </Card>
  );
};
