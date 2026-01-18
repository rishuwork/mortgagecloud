import { Button } from "@/components/ui/button";
import { Phone, Mail, MapPin, Clock, Instagram, Facebook } from "lucide-react";

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  // LocalBusiness Schema for SEO
  const businessSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "Rishab Ahuja - Mortgage Agent Level #2",
    "image": "https://rishabahuja.ca/og-image.png",
    "telephone": "+1-742-688-0055",
    "email": "Rishab.Ahuja@outlook.com",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Toronto",
      "addressRegion": "ON",
      "addressCountry": "CA",
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": "43.6532",
      "longitude": "-79.3832",
    },
    "areaServed": {
      "@type": "Country",
      "name": "Canada",
    },
    "priceRange": "Free Consultation",
    "openingHoursSpecification": [
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        "opens": "09:00",
        "closes": "18:00",
      },
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Saturday"],
        "opens": "10:00",
        "closes": "14:00",
      },
    ],
    "sameAs": [
      "https://share.google/RAuketw3YKi2tNvm5",
      "https://www.facebook.com/profile.php?id=61586242478085",
      "https://www.instagram.com/mortgagesbyrishab/"
    ],
  };

  return (
    <footer id="contact" className="gradient-hero text-primary-foreground">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(businessSchema) }}
      />

      {/* CTA Section */}
      <div className="container py-16">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">
            Ready to Get Started?
          </h2>
          <p className="text-lg text-primary-foreground/80 mb-8">
            Whether you're buying your first home or refinancing, I'm here to help you
            navigate the mortgage process with confidence.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="hero" size="lg" asChild>
              <a href="tel:+17426880055">
                <Phone className="h-5 w-5" />
                Call Now: (742) 688-0055
              </a>
            </Button>
            <Button variant="heroOutline" size="lg" asChild>
              <a href="mailto:Rishab.Ahuja@outlook.com">
                <Mail className="h-5 w-5" />
                Email Me
              </a>
            </Button>
          </div>
        </div>

        {/* Contact Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 py-12 border-t border-primary-foreground/20">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-lg bg-primary-foreground/20 flex items-center justify-center">
                <span className="text-primary-foreground font-bold">RA</span>
              </div>
              <div>
                <span className="font-display font-bold">Rishab Ahuja</span>
                <span className="block text-xs text-primary-foreground/70">Mortgage Agent Level #2</span>
              </div>
            </div>
            <p className="text-sm text-primary-foreground/70 mb-4">
              Licensed Mortgage Agent Level #2 helping Canadians achieve their homeownership dreams
              with personalized solutions and competitive rates.
            </p>
            <div className="flex gap-3">
              <a href="https://www.facebook.com/profile.php?id=61586242478085" target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-lg bg-primary-foreground/10 flex items-center justify-center hover:bg-primary-foreground/20 transition-colors">
                <Facebook className="h-4 w-4" />
              </a>
              <a href="https://www.instagram.com/mortgagesbyrishab/" target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-lg bg-primary-foreground/10 flex items-center justify-center hover:bg-primary-foreground/20 transition-colors">
                <Instagram className="h-4 w-4" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-display font-bold mb-4">Contact</h4>
            <ul className="space-y-3 text-base">
              <li className="flex items-center gap-3 text-primary-foreground/80">
                <Phone className="h-4 w-4 flex-shrink-0" />
                <a href="tel:+17426880055" className="hover:text-primary-foreground">(742) 688-0055</a>
              </li>
              <li className="flex items-center gap-3 text-primary-foreground/80">
                <Mail className="h-4 w-4 flex-shrink-0" />
                <a href="mailto:Rishab.Ahuja@outlook.com" className="hover:text-primary-foreground">Rishab.Ahuja@outlook.com</a>
              </li>
              <li className="flex items-start gap-3 text-primary-foreground/80">
                <MapPin className="h-4 w-4 flex-shrink-0 mt-0.5" />
                <span>Toronto, Ontario<br />Serving clients across Canada</span>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-display font-bold mb-4">Hours</h4>
            <ul className="space-y-2 text-base text-primary-foreground/80">
              <li className="flex items-center gap-3">
                <Clock className="h-4 w-4 flex-shrink-0" />
                <span>Mon-Fri: 9am - 6pm</span>
              </li>
              <li className="flex items-center gap-3">
                <Clock className="h-4 w-4 flex-shrink-0" />
                <span>Saturday: 10am - 2pm</span>
              </li>
              <li className="flex items-center gap-3">
                <Clock className="h-4 w-4 flex-shrink-0" />
                <span>Sunday: By Appointment</span>
              </li>
            </ul>
            <p className="text-xs text-primary-foreground/60 mt-4">
              Evening & weekend appointments available upon request.
            </p>
          </div>

          <div>
            <h4 className="font-display font-bold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-base">
              <li>
                <a href="#calculators" className="text-primary-foreground/80 hover:text-primary-foreground">Mortgage Calculators</a>
              </li>
              <li>
                <a href="#services" className="text-primary-foreground/80 hover:text-primary-foreground">Services</a>
              </li>
              <li>
                <a href="#about" className="text-primary-foreground/80 hover:text-primary-foreground">About Rishab</a>
              </li>
              <li>
                <a href="#faq" className="text-primary-foreground/80 hover:text-primary-foreground">FAQ</a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-primary-foreground/20 text-center text-sm text-primary-foreground/60">
          <p>
            © {currentYear} Rishab Ahuja, Mortgage Agent Level #2. All rights reserved.
            Licensed in Ontario, serving clients across Canada.
          </p>
          <p className="mt-2">
            Mortgage services are subject to approval. Rates and terms subject to change without notice.
          </p>
        </div>
      </div>
    </footer>
  );
};
