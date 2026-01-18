"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "How is a mortgage broker different from a bank?",
    answer: "As a mortgage broker, I work for you—not the bank. I have access to over 50 lenders, allowing me to shop the entire market to find you the best rate and terms. Banks can only offer their own products, which may not be the best fit for your situation.",
  },
  {
    question: "Does it cost money to use a mortgage broker?",
    answer: "In most cases, my services are free to you. I'm compensated by the lender when your mortgage funds. For certain specialized products (like private lending), there may be fees, which I'll always disclose upfront.",
  },
  {
    question: "How much down payment do I need to buy a home in Canada?",
    answer: "The minimum down payment in Canada depends on the purchase price: 5% for homes up to $500,000, 10% for the portion between $500,000 and $1 million, and 20% for homes over $1 million. First-time buyers may also access the RRSP Home Buyers' Plan.",
  },
  {
    question: "What is the mortgage stress test?",
    answer: "The stress test ensures you can afford payments at a higher rate than your actual mortgage rate. You must qualify at either your contract rate plus 2%, or 5.25%—whichever is higher. This applies to both insured and uninsured mortgages.",
  },
  {
    question: "How long does mortgage pre-approval take?",
    answer: "With complete documentation, I can often provide a pre-approval within 24-48 hours. Having your pre-approval ready before house hunting gives you confidence and makes your offers stronger to sellers.",
  },
  {
    question: "Can I get a mortgage if I'm self-employed?",
    answer: "Absolutely! While self-employed mortgages require more documentation, I specialize in finding solutions for business owners, contractors, and freelancers. Alternative income verification options are available.",
  },
  {
    question: "Should I choose a fixed or variable rate mortgage?",
    answer: "This depends on your risk tolerance and financial situation. Fixed rates offer payment certainty, while variable rates historically average lower over time. I'll help you analyze your specific situation to make the right choice.",
  },
  {
    question: "What happens when my mortgage term ends?",
    answer: "At renewal time, don't just sign what your lender sends. Contact me 120 days before your maturity date—I'll shop the market to find you a better rate, potentially saving you thousands over your next term.",
  },
];

export const FAQSection = () => {
  // FAQ Schema for SEO
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer,
      },
    })),
  };

  return (
    <section id="faq" className="py-20 bg-secondary/30 scroll-mt-28">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <div className="container">
        <div className="text-center mb-12">
          <span className="inline-block px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
            FAQ
          </span>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Get answers to common mortgage questions. Can't find what you're looking for?
            Contact me directly for personalized advice.
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="bg-card rounded-xl border border-border px-6 shadow-card"
              >
                <AccordionTrigger className="text-left font-display font-semibold hover:no-underline py-5">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground pb-5 leading-relaxed">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
};
