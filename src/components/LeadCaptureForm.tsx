import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Send, CheckCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface LeadFormProps {
  source?: string;
  title?: string;
  description?: string;
  compact?: boolean;
}

const provinces = [
  "Alberta",
  "British Columbia",
  "Manitoba",
  "New Brunswick",
  "Newfoundland and Labrador",
  "Nova Scotia",
  "Ontario",
  "Prince Edward Island",
  "Quebec",
  "Saskatchewan",
  "Northwest Territories",
  "Nunavut",
  "Yukon",
];

const mortgageTypes = [
  "First-Time Buyer",
  "Renewal",
  "Refinancing",
  "Investment Property",
  "Self-Employed",
  "Other",
];

export const LeadCaptureForm = ({ 
  source = "contact", 
  title = "Get Your Free Consultation",
  description = "Fill out the form below and I'll get back to you within 24 hours.",
  compact = false 
}: LeadFormProps) => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    province: "",
    mortgageType: "",
    message: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call - would connect to backend
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    console.log("Lead captured:", { ...formData, source });
    
    setIsSubmitting(false);
    setIsSubmitted(true);
    
    toast({
      title: "Request Received!",
      description: "I'll get back to you within 24 hours.",
    });
  };

  if (isSubmitted) {
    return (
      <Card variant="elevated">
        <CardContent className="p-8 text-center">
          <div className="w-16 h-16 rounded-full gradient-success flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="h-8 w-8 text-success-foreground" />
          </div>
          <h3 className="font-display text-2xl font-bold mb-2">Thank You!</h3>
          <p className="text-muted-foreground">
            I've received your request and will get back to you within 24 hours.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card variant="elevated">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className={compact ? "space-y-4" : "grid grid-cols-1 md:grid-cols-2 gap-4"}>
            <div className="space-y-2">
              <Label htmlFor="name">Full Name *</Label>
              <Input
                id="name"
                placeholder="John Smith"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email *</Label>
              <Input
                id="email"
                type="email"
                placeholder="john@example.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number *</Label>
              <Input
                id="phone"
                type="tel"
                placeholder="(416) 555-1234"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="province">Province *</Label>
              <Select
                value={formData.province}
                onValueChange={(value) => setFormData({ ...formData, province: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select province" />
                </SelectTrigger>
                <SelectContent>
                  {provinces.map((province) => (
                    <SelectItem key={province} value={province}>
                      {province}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="mortgageType">Mortgage Type *</Label>
            <Select
              value={formData.mortgageType}
              onValueChange={(value) => setFormData({ ...formData, mortgageType: value })}
            >
              <SelectTrigger>
                <SelectValue placeholder="What are you looking for?" />
              </SelectTrigger>
              <SelectContent>
                {mortgageTypes.map((type) => (
                  <SelectItem key={type} value={type}>
                    {type}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {!compact && (
            <div className="space-y-2">
              <Label htmlFor="message">Additional Details (Optional)</Label>
              <Textarea
                id="message"
                placeholder="Tell me about your situation..."
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                rows={4}
              />
            </div>
          )}

          <Button 
            type="submit" 
            variant="cta" 
            className="w-full" 
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              "Submitting..."
            ) : (
              <>
                <Send className="h-4 w-4" />
                Get Free Consultation
              </>
            )}
          </Button>

          <p className="text-xs text-muted-foreground text-center">
            By submitting, you agree to be contacted about mortgage options. 
            Your information is secure and will never be shared.
          </p>
        </form>
      </CardContent>
    </Card>
  );
};
