import { useState, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Calculator, DollarSign, Percent, TrendingUp, Mail } from "lucide-react";
import { cn } from "@/lib/utils";

interface CalculatorInputs {
  homePrice: number;
  downPayment: number;
  downPaymentType: "dollar" | "percent";
  interestRate: number;
  amortization: 25 | 30;
  paymentFrequency: "monthly" | "biweekly" | "accelerated";
}

export const MortgageCalculator = () => {
  const [inputs, setInputs] = useState<CalculatorInputs>({
    homePrice: 500000,
    downPayment: 100000,
    downPaymentType: "dollar",
    interestRate: 5.5,
    amortization: 25,
    paymentFrequency: "monthly",
  });

  const [showEmailForm, setShowEmailForm] = useState(false);
  const [email, setEmail] = useState("");

  const calculations = useMemo(() => {
    const downPaymentAmount = inputs.downPaymentType === "dollar"
      ? inputs.downPayment
      : (inputs.homePrice * inputs.downPayment) / 100;
    
    const principal = inputs.homePrice - downPaymentAmount;
    
    // CMHC insurance calculation for down payments less than 20%
    const downPaymentPercent = (downPaymentAmount / inputs.homePrice) * 100;
    let cmhcRate = 0;
    if (downPaymentPercent < 10) cmhcRate = 0.04;
    else if (downPaymentPercent < 15) cmhcRate = 0.031;
    else if (downPaymentPercent < 20) cmhcRate = 0.028;
    
    const cmhcPremium = principal * cmhcRate;
    const totalPrincipal = principal + cmhcPremium;
    
    const monthlyRate = inputs.interestRate / 100 / 12;
    const totalPayments = inputs.amortization * 12;
    
    // Monthly payment calculation using amortization formula
    const monthlyPayment = totalPrincipal * 
      (monthlyRate * Math.pow(1 + monthlyRate, totalPayments)) /
      (Math.pow(1 + monthlyRate, totalPayments) - 1);
    
    let displayPayment = monthlyPayment;
    let paymentsPerYear = 12;
    
    if (inputs.paymentFrequency === "biweekly") {
      displayPayment = (monthlyPayment * 12) / 26;
      paymentsPerYear = 26;
    } else if (inputs.paymentFrequency === "accelerated") {
      displayPayment = monthlyPayment / 2;
      paymentsPerYear = 26;
    }
    
    const totalPaid = monthlyPayment * totalPayments;
    const totalInterest = totalPaid - totalPrincipal;
    
    return {
      payment: displayPayment,
      totalInterest,
      totalPaid,
      principal: totalPrincipal,
      cmhcPremium,
      downPaymentPercent,
    };
  }, [inputs]);

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("en-CA", {
      style: "currency",
      currency: "CAD",
      maximumFractionDigits: 0,
    }).format(value);
  };

  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Would connect to backend for lead capture
    console.log("Lead captured:", { email, calculations, inputs });
    setShowEmailForm(false);
    setEmail("");
  };

  return (
    <Card variant="elevated" className="overflow-hidden">
      <CardHeader className="gradient-hero text-primary-foreground pb-8">
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2 bg-primary-foreground/20 rounded-lg">
            <Calculator className="h-5 w-5" />
          </div>
          <CardTitle className="text-primary-foreground">Mortgage Payment Calculator</CardTitle>
        </div>
        <CardDescription className="text-primary-foreground/70">
          Calculate your monthly payment and see the total cost of your mortgage
        </CardDescription>
      </CardHeader>
      
      <CardContent className="p-6 space-y-6">
        {/* Home Price */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <Label htmlFor="homePrice" className="font-medium">Home Price</Label>
            <span className="text-lg font-bold text-primary">{formatCurrency(inputs.homePrice)}</span>
          </div>
          <Slider
            id="homePrice"
            min={100000}
            max={2000000}
            step={10000}
            value={[inputs.homePrice]}
            onValueChange={([value]) => setInputs({ ...inputs, homePrice: value })}
            className="py-2"
          />
          <Input
            type="number"
            value={inputs.homePrice}
            onChange={(e) => setInputs({ ...inputs, homePrice: Number(e.target.value) })}
            className="mt-2"
          />
        </div>

        {/* Down Payment */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <Label className="font-medium">Down Payment</Label>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setInputs({ ...inputs, downPaymentType: "dollar" })}
                className={cn(
                  "px-3 py-1 rounded-md text-sm font-medium transition-colors",
                  inputs.downPaymentType === "dollar"
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-muted-foreground hover:bg-muted/80"
                )}
              >
                <DollarSign className="h-4 w-4 inline" />
              </button>
              <button
                onClick={() => setInputs({ ...inputs, downPaymentType: "percent" })}
                className={cn(
                  "px-3 py-1 rounded-md text-sm font-medium transition-colors",
                  inputs.downPaymentType === "percent"
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-muted-foreground hover:bg-muted/80"
                )}
              >
                <Percent className="h-4 w-4 inline" />
              </button>
            </div>
          </div>
          <Input
            type="number"
            value={inputs.downPayment}
            onChange={(e) => setInputs({ ...inputs, downPayment: Number(e.target.value) })}
            placeholder={inputs.downPaymentType === "dollar" ? "100000" : "20"}
          />
          <p className="text-sm text-muted-foreground">
            {calculations.downPaymentPercent.toFixed(1)}% down payment
            {calculations.cmhcPremium > 0 && (
              <span className="ml-2 text-accent">
                (includes {formatCurrency(calculations.cmhcPremium)} CMHC insurance)
              </span>
            )}
          </p>
        </div>

        {/* Interest Rate */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <Label htmlFor="interestRate" className="font-medium">Interest Rate</Label>
            <span className="text-lg font-bold text-primary">{inputs.interestRate}%</span>
          </div>
          <Slider
            id="interestRate"
            min={1}
            max={10}
            step={0.05}
            value={[inputs.interestRate]}
            onValueChange={([value]) => setInputs({ ...inputs, interestRate: value })}
            className="py-2"
          />
        </div>

        {/* Amortization */}
        <div className="space-y-3">
          <Label className="font-medium">Amortization Period</Label>
          <div className="flex gap-2">
            {([25, 30] as const).map((years) => (
              <button
                key={years}
                onClick={() => setInputs({ ...inputs, amortization: years })}
                className={cn(
                  "flex-1 py-3 rounded-lg text-sm font-medium transition-all",
                  inputs.amortization === years
                    ? "bg-primary text-primary-foreground shadow-primary"
                    : "bg-muted text-muted-foreground hover:bg-muted/80"
                )}
              >
                {years} Years
              </button>
            ))}
          </div>
        </div>

        {/* Payment Frequency */}
        <div className="space-y-3">
          <Label className="font-medium">Payment Frequency</Label>
          <div className="grid grid-cols-3 gap-2">
            {[
              { value: "monthly", label: "Monthly" },
              { value: "biweekly", label: "Bi-Weekly" },
              { value: "accelerated", label: "Accelerated" },
            ].map((option) => (
              <button
                key={option.value}
                onClick={() => setInputs({ ...inputs, paymentFrequency: option.value as any })}
                className={cn(
                  "py-3 rounded-lg text-sm font-medium transition-all",
                  inputs.paymentFrequency === option.value
                    ? "bg-primary text-primary-foreground shadow-primary"
                    : "bg-muted text-muted-foreground hover:bg-muted/80"
                )}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>

        {/* Results */}
        <div className="mt-8 p-6 rounded-xl bg-secondary border border-border">
          <div className="text-center mb-6">
            <p className="text-sm text-muted-foreground mb-1">
              Your {inputs.paymentFrequency === "monthly" ? "Monthly" : "Bi-Weekly"} Payment
            </p>
            <p className="text-4xl font-display font-bold text-primary">
              {formatCurrency(calculations.payment)}
            </p>
          </div>
          
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div className="p-3 rounded-lg bg-background">
              <p className="text-muted-foreground">Total Principal</p>
              <p className="font-semibold text-foreground">{formatCurrency(calculations.principal)}</p>
            </div>
            <div className="p-3 rounded-lg bg-background">
              <p className="text-muted-foreground">Total Interest</p>
              <p className="font-semibold text-destructive">{formatCurrency(calculations.totalInterest)}</p>
            </div>
          </div>
        </div>

        {/* Email Results CTA */}
        {!showEmailForm ? (
          <Button
            variant="cta"
            className="w-full"
            onClick={() => setShowEmailForm(true)}
          >
            <Mail className="h-4 w-4" />
            Email My Results
          </Button>
        ) : (
          <form onSubmit={handleEmailSubmit} className="space-y-3">
            <Input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <div className="flex gap-2">
              <Button type="submit" variant="cta" className="flex-1">
                Send Results
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={() => setShowEmailForm(false)}
              >
                Cancel
              </Button>
            </div>
          </form>
        )}
      </CardContent>
    </Card>
  );
};
