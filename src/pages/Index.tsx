import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { CalculatorsSection } from "@/components/CalculatorsSection";
import { ServicesSection } from "@/components/ServicesSection";
import { TrustSection } from "@/components/TrustSection";
import { FAQSection } from "@/components/FAQSection";
import { LeadCaptureForm } from "@/components/LeadCaptureForm";
import { Footer } from "@/components/Footer";

const Index = () => {
  return (
    <main className="min-h-screen">
      <Header />
      <Hero />
      <CalculatorsSection />
      <ServicesSection />
      <TrustSection />
      <FAQSection />
      
      {/* Contact Section */}
      <section className="py-20">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-12">
            <div>
              <span className="inline-block px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
                Get Started
              </span>
              <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
                Let's Discuss Your <span className="text-primary">Mortgage Options</span>
              </h2>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                Ready to take the next step? Fill out the form and I'll provide you with a 
                personalized assessment of your mortgage options. There's no obligation and 
                the consultation is completely free.
              </p>
              <div className="space-y-4 text-sm">
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-success/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-success text-xs">✓</span>
                  </div>
                  <span className="text-muted-foreground">Free, no-obligation consultation</span>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-success/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-success text-xs">✓</span>
                  </div>
                  <span className="text-muted-foreground">Response within 24 hours</span>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-success/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-success text-xs">✓</span>
                  </div>
                  <span className="text-muted-foreground">Personalized rate quotes from 50+ lenders</span>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-success/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-success text-xs">✓</span>
                  </div>
                  <span className="text-muted-foreground">Expert guidance throughout the process</span>
                </div>
              </div>
            </div>
            <div>
              <LeadCaptureForm source="contact-section" />
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default Index;
