"use client";

import { useState, useMemo } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { DollarSign, TrendingDown, RefreshCw, Percent } from "lucide-react";
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

    const monthlyPayment = mortgageAmount *
      (monthlyRate * Math.pow(1 + monthlyRate, totalMonths)) /
      (Math.pow(1 + monthlyRate, totalMonths) - 1);

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

    const effectiveInterestCost = (totalInterestPaid / mortgageAmount) / termYears * 100;

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
      <CardContent className="p-4">
        {/* Two column layout for inputs */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          {/* Left Column */}
          <div className="space-y-4">
            {/* Mortgage Amount */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label className="text-base font-medium">Mortgage Amount</Label>
                <Input
                  type="number"
                  value={mortgageAmount}
                  onChange={(e) => setMortgageAmount(Number(e.target.value) || 0)}
                  className="w-32 h-10 text-right font-bold text-xl text-primary"
                />
              </div>
              <Slider
                min={50000}
                max={1500000}
                step={10000}
                value={[mortgageAmount]}
                onValueChange={([value]) => setMortgageAmount(value)}
              />
            </div>

            {/* Interest Rate */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label className="text-base font-medium">Interest Rate (%)</Label>
                <Input
                  type="number"
                  step="0.05"
                  value={interestRate}
                  onChange={(e) => setInterestRate(Number(e.target.value) || 0)}
                  className="w-24 h-10 text-right font-bold text-xl text-primary"
                />
              </div>
              <Slider
                min={1}
                max={10}
                step={0.05}
                value={[interestRate]}
                onValueChange={([value]) => setInterestRate(value)}
              />
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-4">
            {/* Term Length */}
            <div className="space-y-3">
              <Label className="text-base font-medium">Term Length</Label>
              <div className="grid grid-cols-5 gap-1">
                {[1, 2, 3, 4, 5].map((years) => (
                  <button
                    key={years}
                    onClick={() => setTermYears(years)}
                    className={cn(
                      "py-3 rounded-lg text-sm font-medium transition-all",
                      termYears === years
                        ? "bg-primary text-primary-foreground"
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
              <Label className="text-base font-medium">Amortization</Label>
              <div className="flex gap-2">
                {[25, 30].map((years) => (
                  <button
                    key={years}
                    onClick={() => setAmortization(years)}
                    className={cn(
                      "flex-1 py-3 rounded-lg text-sm font-medium transition-all",
                      amortization === years
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted text-muted-foreground hover:bg-muted/80"
                    )}
                  >
                    {years} Years
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Results - Compact Grid */}
        <div className="bg-secondary rounded-xl p-4">
          <div className="text-center mb-4">
            <p className="text-sm text-muted-foreground mb-1">Monthly Payment</p>
            <p className="text-3xl md:text-4xl font-display font-bold text-primary">
              {formatCurrency(breakdown.monthlyPayment)}
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <div className="p-3 rounded-lg bg-success/10 border border-success/20 text-center">
              <DollarSign className="h-4 w-4 text-success mx-auto mb-1" />
              <p className="text-[10px] uppercase tracking-wider text-muted-foreground">Principal</p>
              <p className="text-sm font-bold text-success">{formatCurrency(breakdown.principalPaid)}</p>
            </div>

            <div className="p-3 rounded-lg bg-destructive/10 border border-destructive/20 text-center">
              <TrendingDown className="h-4 w-4 text-destructive mx-auto mb-1" />
              <p className="text-[10px] uppercase tracking-wider text-muted-foreground">Interest</p>
              <p className="text-sm font-bold text-destructive">{formatCurrency(breakdown.interestPaid)}</p>
            </div>

            <div className="p-3 rounded-lg bg-info/10 border border-info/20 text-center">
              <RefreshCw className="h-4 w-4 text-info mx-auto mb-1" />
              <p className="text-[10px] uppercase tracking-wider text-muted-foreground">Balance</p>
              <p className="text-sm font-bold text-info">{formatCurrency(breakdown.remainingBalance)}</p>
            </div>

            <div className="p-3 rounded-lg bg-accent/10 border border-accent/20 text-center">
              <Percent className="h-4 w-4 text-accent mx-auto mb-1" />
              <p className="text-[10px] uppercase tracking-wider text-muted-foreground">Eff. Rate</p>
              <p className="text-sm font-bold text-accent">{breakdown.effectiveInterestCost.toFixed(2)}%</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
