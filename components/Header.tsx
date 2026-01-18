"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X, Phone, Mail } from "lucide-react";

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navLinks = [
    { href: "#services", label: "Services" },
    { href: "#calculators", label: "Calculators" },
    { href: "#about", label: "About" },
    { href: "#faq", label: "FAQ" },
    { href: "#contact", label: "Contact" },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-md border-b border-border/50">
      {/* Top bar */}
      <div className="hidden md:block bg-primary text-primary-foreground py-2">
        <div className="container flex items-center justify-between text-sm">
          <div className="flex items-center gap-6">
            <a href="tel:+17426880055" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
              <Phone className="h-4 w-4" />
              <span>(742) 688-0055</span>
            </a>
            <a href="mailto:Rishab.Ahuja@outlook.com" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
              <Mail className="h-4 w-4" />
              <span>Rishab.Ahuja@outlook.com</span>
            </a>
          </div>
          <p className="text-primary-foreground/80">Serving clients across Canada from Ontario</p>
        </div>
      </div>

      {/* Main navigation */}
      <nav className="container py-4">
        <div className="flex items-center">
          {/* Logo Section */}
          <div className="flex-1 flex justify-start">
            <a href="/" className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg gradient-hero flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-lg">RA</span>
              </div>
              <div>
                <span className="font-display font-bold text-xl text-foreground">Rishab Ahuja</span>
                <span className="hidden sm:block text-xs text-muted-foreground">Mortgage Agent Level #2</span>
              </div>
            </a>
          </div>

          {/* Desktop nav - Centered */}
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-base font-medium text-muted-foreground hover:text-foreground transition-colors"
                style={{ whiteSpace: "nowrap" }}
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Right Section: Buttons & Mobile Menu Toggle */}
          <div className="flex-1 flex justify-end items-center gap-3">
            <div className="hidden lg:flex items-center gap-3">
              <Button variant="cta" asChild className="text-[14px]">
                <a href="#consultation">Get Pre-Approved</a>
              </Button>
            </div>

            {/* Mobile menu button */}
            <button
              className="lg:hidden p-2 text-foreground"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="lg:hidden mt-4 pb-4 border-t border-border pt-4 animate-fade-in">
            <div className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="text-base font-medium text-muted-foreground hover:text-foreground transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.label}
                </a>
              ))}
              <div className="flex flex-col gap-2 pt-4">
                <Button variant="cta" asChild className="text-[14px]">
                  <a href="#consultation">Get Pre-Approved</a>
                </Button>
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};
