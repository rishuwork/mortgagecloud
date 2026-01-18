"use client";

import { useState, useMemo } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Wallet, CreditCard, DollarSign, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

export const AffordabilityCalculator = () => {
  const [annualIncome, setAnnualIncome] = useState(100000);
  const [monthlyDebts, setMonthlyDebts] = useState(500);
  const [downPayment, setDownPayment] = useState(50000);
  const [creditScore, setCreditScore] = useState<"excellent" | "good" | "fair" | "poor">("good");
  const [interestRate, setInterestRate] = useState(5.5);
  const [termYears, setTermYears] = useState(5); // Added term years

  const affordability = useMemo(() => {
    const monthlyIncome = annualIncome / 12;

    const gdsLimit = creditScore === "excellent" ? 0.39 :
      creditScore === "good" ? 0.35 :
        creditScore === "fair" ? 0.32 : 0.30;

    const tdsLimit = creditScore === "excellent" ? 0.44 :
      creditScore === "good" ? 0.42 :
        creditScore === "fair" ? 0.40 : 0.38;

    const stressTestRate = Math.max(interestRate + 2, 5.25) / 100 / 12;
    const amortizationMonths = 25 * 12;

    const annualPropertyTaxRate = 0.008;
    const estimatedHeating = 150;

    const paymentFactor = (stressTestRate * Math.pow(1 + stressTestRate, amortizationMonths)) /
      (Math.pow(1 + stressTestRate, amortizationMonths) - 1);

    let maxPurchasePrice = downPayment;

    for (let i = 0; i < 10; i++) {
      const monthlyPropertyTax = (maxPurchasePrice * annualPropertyTaxRate) / 12;

      const maxHousingPaymentGDS = monthlyIncome * gdsLimit;
      const availableForPIGDS = maxHousingPaymentGDS - monthlyPropertyTax - estimatedHeating;

      const maxTotalPaymentTDS = monthlyIncome * tdsLimit;
      const availableForPITDS = maxTotalPaymentTDS - monthlyPropertyTax - estimatedHeating - monthlyDebts;

      const availableForPI = Math.min(availableForPIGDS, availableForPITDS);

      const maxMortgage = availableForPI / paymentFactor;

      const newPurchasePrice = maxMortgage + downPayment;

      if (Math.abs(newPurchasePrice - maxPurchasePrice) < 100) {
        maxPurchasePrice = newPurchasePrice;
        break;
      }
      maxPurchasePrice = newPurchasePrice;
    }

    const maxMortgage = maxPurchasePrice - downPayment;

    // Calculate actual monthly payment at contract rate depending on term (just used for display here usually based on amoritzation but standard shows term payment if relevant or just amortization payment)
    // Standard affordability is based on 25yr amortization usually.
    // The "Term" field in affordability usually just signifies the rate term, payment is still based on 25yr amortization.
    // So calculation remains same based on amortization.

    const monthlyRate = interestRate / 100 / 12;
    const actualMonthlyPayment = maxMortgage *
      (monthlyRate * Math.pow(1 + monthlyRate, amortizationMonths)) /
      (Math.pow(1 + monthlyRate, amortizationMonths) - 1);

    const monthlyPropertyTax = (maxPurchasePrice * annualPropertyTaxRate) / 12;
    const gdsRatio = ((actualMonthlyPayment + monthlyPropertyTax + estimatedHeating) / monthlyIncome) * 100;
    const tdsRatio = ((actualMonthlyPayment + monthlyPropertyTax + estimatedHeating + monthlyDebts) / monthlyIncome) * 100;

    return {
      maxPurchasePrice: Math.max(0, maxPurchasePrice),
      maxMortgage: Math.max(0, maxMortgage),
      monthlyPayment: Math.max(0, actualMonthlyPayment),
      gdsRatio,
      tdsRatio,
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
    { value: "excellent", label: "760+" },
    { value: "good", label: "680+" },
    { value: "fair", label: "620+" },
    { value: "poor", label: "<620" },
  ] as const;

  return (
    <Card variant="elevated" className="overflow-hidden">
      <CardContent className="p-5">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Left Column: Inputs */}
          <div className="space-y-4">

            {/* Annual Income */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <Label className="text-base font-medium flex items-center gap-2">
                  <Wallet className="h-4 w-4" /> Annual Income
                </Label>
                <Input
                  type="number"
                  value={annualIncome}
                  onChange={(e) => setAnnualIncome(Number(e.target.value) || 0)}
                  className="w-28 h-10 text-right font-bold text-xl text-primary"
                />
              </div>
              <Slider
                min={30000}
                max={500000}
                step={5000}
                value={[annualIncome]}
                onValueChange={([value]) => setAnnualIncome(value)}
              />
            </div>

            {/* Monthly Debts */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <Label className="text-base font-medium flex items-center gap-2">
                  <CreditCard className="h-4 w-4" /> Monthly Debts
                </Label>
                <Input
                  type="number"
                  value={monthlyDebts}
                  onChange={(e) => setMonthlyDebts(Number(e.target.value) || 0)}
                  className="w-24 h-10 text-right font-bold text-xl text-primary"
                />
              </div>
              <Slider
                min={0}
                max={5000}
                step={50}
                value={[monthlyDebts]}
                onValueChange={([value]) => setMonthlyDebts(value)}
              />
            </div>

            {/* Down Payment */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <Label className="text-base font-medium flex items-center gap-2">
                  <DollarSign className="h-4 w-4" /> Down Payment
                </Label>
                <Input
                  type="number"
                  value={downPayment}
                  onChange={(e) => setDownPayment(Number(e.target.value) || 0)}
                  className="w-28 h-10 text-right font-bold text-xl text-primary"
                />
              </div>
              <Slider
                min={5000}
                max={500000}
                step={5000}
                value={[downPayment]}
                onValueChange={([value]) => setDownPayment(value)}
              />
            </div>

            {/* Rate & Term Row */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="text-sm font-medium">Rate (%)</Label>
                <Input
                  type="number"
                  step="0.05"
                  value={interestRate}
                  onChange={(e) => setInterestRate(Number(e.target.value) || 0)}
                  className="h-10 font-bold text-base"
                />
              </div>
              <div className="space-y-2">
                <Label className="text-sm font-medium">Term (Years)</Label>
                <div className="flex gap-2">
                  {[1, 3, 5].map(yr => (
                    <button
                      key={yr}
                      onClick={() => setTermYears(yr)}
                      className={cn(
                        "flex-1 h-10 rounded-lg text-sm font-bold border transition-all",
                        termYears === yr
                          ? "bg-primary text-primary-foreground border-primary"
                          : "bg-background hover:bg-muted border-input"
                      )}
                    >
                      {yr}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Credit Score */}
            <div className="space-y-3">
              <Label className="text-base font-medium">Credit Score</Label>
              <div className="grid grid-cols-4 gap-2">
                {creditScoreOptions.map((option) => (
                  <button
                    key={option.value}
                    onClick={() => setCreditScore(option.value)}
                    className={cn(
                      "py-3 rounded-lg text-center transition-all",
                      creditScore === option.value
                        ? "bg-primary text-primary-foreground shadow-primary"
                        : "bg-muted text-muted-foreground hover:bg-muted/80"
                    )}
                  >
                    <span className="block text-sm font-bold">{option.label}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Results */}
          <div className="flex flex-col justify-center space-y-6">
            <div className="p-8 rounded-2xl gradient-hero text-primary-foreground text-center shadow-lg">
              <p className="text-base text-primary-foreground/80 mb-2">Maximum Affordability</p>
              <p className="text-4xl md:text-5xl font-display font-bold mb-6 tracking-tight">
                {formatCurrency(affordability.maxPurchasePrice)}
              </p>
              <div className="grid grid-cols-2 gap-3 text-left bg-white/10 p-5 rounded-xl backdrop-blur-sm">
                <div>
                  <p className="text-sm text-primary-foreground/70">Max Mortgage</p>
                  <p className="text-base font-bold">{formatCurrency(affordability.maxMortgage)}</p>
                </div>
                <div>
                  <p className="text-sm text-primary-foreground/70">Est. Payment</p>
                  <p className="text-base font-bold">{formatCurrency(affordability.monthlyPayment)}/mo</p>
                </div>
              </div>
              <div className="mt-4 text-xs text-primary-foreground/50 leading-tight">
                *Stress test rate: {Math.max(interestRate + 2, 5.25).toFixed(2)}% | 25yr Amortization
              </div>
            </div>

            <Button variant="cta" size="lg" className="w-full shadow-md" asChild>
              <a href="#consultation" className="flex items-center justify-center gap-2">
                Get Pre-Approved <ArrowRight className="h-4 w-4" />
              </a>
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
