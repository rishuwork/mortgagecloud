import type { Metadata } from "next";
import { DM_Sans, Plus_Jakarta_Sans } from "next/font/google";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import "./globals.css";

const dmSans = DM_Sans({
    subsets: ["latin"],
    variable: "--font-dm-sans",
    display: "swap",
});

const plusJakartaSans = Plus_Jakarta_Sans({
    subsets: ["latin"],
    variable: "--font-plus-jakarta",
    display: "swap",
});

export const metadata: Metadata = {
    metadataBase: new URL("https://rishabahuja.ca"),
    title: {
        default: "Rishab Ahuja | Mortgage Agent Level #2 Ontario | Serving All of Canada",
        template: "%s | Rishab Ahuja Mortgage Agent",
    },
    description:
        "Ontario-based Mortgage Agent Level #2 helping Canadians get the best rates. Free calculators, pre-approval, first-time buyers, refinancing. Access to 50+ lenders.",
    keywords: [
        "mortgage agent Ontario",
        "mortgage agent Canada",
        "mortgage rates",
        "first-time home buyer",
        "mortgage pre-approval",
        "refinancing",
        "Toronto mortgage agent",
        "best mortgage rates Canada",
    ],
    authors: [{ name: "Rishab Ahuja" }],
    creator: "Rishab Ahuja",
    publisher: "Rishab Ahuja",
    robots: {
        index: true,
        follow: true,
        googleBot: {
            index: true,
            follow: true,
            "max-video-preview": -1,
            "max-image-preview": "large",
            "max-snippet": -1,
        },
    },
    openGraph: {
        type: "website",
        locale: "en_CA",
        url: "https://rishabahuja.ca",
        siteName: "Rishab Ahuja - Mortgage Agent Level #2",
        title: "Rishab Ahuja | Mortgage Agent Level #2 Ontario",
        description:
            "Ontario-based Mortgage Agent Level #2 helping Canadians get the best rates. Free calculators and pre-approval.",
        images: [
            {
                url: "/og-image.png",
                width: 1200,
                height: 630,
                alt: "Rishab Ahuja - Trusted Mortgage Agent Level #2 in Ontario",
            },
        ],
    },
    twitter: {
        card: "summary_large_image",
        site: "@rishabahuja",
        creator: "@rishabahuja",
        title: "Rishab Ahuja | Mortgage Agent Level #2 Ontario",
        description:
            "Ontario-based Mortgage Agent Level #2 helping Canadians get the best rates. Free calculators and pre-approval.",
        images: ["/og-image.png"],
    },
    icons: {
        icon: "/favicon.ico",
        apple: "/apple-touch-icon.png",
    },
    manifest: "/site.webmanifest",
    alternates: {
        canonical: "https://rishabahuja.ca",
    },
    category: "Finance",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" className={`${dmSans.variable} ${plusJakartaSans.variable}`}>
            <body className="min-h-screen bg-background text-foreground font-sans antialiased">
                <TooltipProvider>
                    <Toaster />
                    <Sonner />
                    {children}
                </TooltipProvider>
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{
                        __html: JSON.stringify({
                            "@context": "https://schema.org",
                            "@graph": [
                                {
                                    "@type": "Person",
                                    "@id": "https://rishabahuja.ca/#person",
                                    "name": "Rishab Ahuja",
                                    "jobTitle": "Mortgage Agent Level #2",
                                    "url": "https://rishabahuja.ca",
                                    "image": "https://rishabahuja.ca/og-image.png",
                                    "description": "Ontario-based Mortgage Agent Level #2 helping Canadians get the best rates."
                                },
                                {
                                    "@type": "FinancialService",
                                    "@id": "https://rishabahuja.ca/#business",
                                    "name": "Rishab Ahuja - Mortgage Agent",
                                    "image": "https://rishabahuja.ca/og-image.png",
                                    "url": "https://rishabahuja.ca",
                                    "telephone": "+17426880055",
                                    "priceRange": "$$",
                                    "address": {
                                        "@type": "PostalAddress",
                                        "addressRegion": "Ontario",
                                        "addressCountry": "CA"
                                    },
                                    "openingHoursSpecification": {
                                        "@type": "OpeningHoursSpecification",
                                        "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
                                        "opens": "09:00",
                                        "closes": "17:00"
                                    },
                                    "founder": {
                                        "@id": "https://rishabahuja.ca/#person"
                                    }
                                }
                            ]
                        })
                    }}
                />
            </body>
        </html>
    );
}
