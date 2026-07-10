import type { Metadata } from "next";
import { LazyMotion, domAnimation } from "framer-motion";
import { GoogleAnalytics } from "@next/third-parties/google";
import "./globals.css";

const playfair = { variable: '--font-playfair' };
const inter = { variable: '--font-inter' };

/* ─── Site-wide metadata ─────────────────────────────────────────────────── */
export const metadata: Metadata = {
  title: {
    default: "Cochin Snacks — Authentic Kerala Flavours",
    template: "%s | Cochin Snacks",
  },
  description:
    "Discover the bold, authentic taste of Kerala with Cochin Snacks. Traditional recipes, premium ingredients, shipped fresh.",
  metadataBase: new URL("https://cochinsnacks.com"),
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://cochinsnacks.com",
    siteName: "Cochin Snacks",
    title: "Cochin Snacks — Authentic Kerala Flavours",
    description:
      "Discover the bold, authentic taste of Kerala with Cochin Snacks.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Cochin Snacks — Authentic Kerala Flavours",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Cochin Snacks — Authentic Kerala Flavours",
    description:
      "Discover the bold, authentic taste of Kerala with Cochin Snacks.",
    images: ["/og-image.png"],
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
  },
};

/* ─── Root layout ────────────────────────────────────────────────────────── */
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const orgJsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Cochin Snacks",
    "url": "https://cochinsnacks.com",
    "logo": "https://cochinsnacks.com/logo.png",
    "telephone": "+91-94460-06447",
    "email": "export@cochinsnacks.com",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Mullankunnu, Ponjassery P.O.",
      "addressLocality": "Ernakulam",
      "addressRegion": "Kerala",
      "postalCode": "683547",
      "addressCountry": "IN"
    },
    "parentOrganization": {
      "@type": "Organization",
      "name": "Pavithram Group"
    }
  };

  return (
    <html lang="en" className={`${playfair.variable} ${inter.variable}`}>
      <head>
        {/* Preconnect to Google Fonts */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        
        {/* Load Google Fonts via stylesheet link */}
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Playfair+Display:ital,wght@0,400..900;1,400..900&display=swap" rel="stylesheet" />

        {/* Organization Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }}
        />

        {/* ── Brand CSS variables ───────────────────────────────────────── */}
        <style dangerouslySetInnerHTML={{ __html: `
          :root {
            /* Greens */
            --color-green-brand: #3D8B3D;
            --color-green-dark:  #2B612B;
            --color-green-mid:   #3D8B3D;
            --color-green-light: #4A9C4A;

            /* Yellows */
            --color-yellow:       #E8A33D;
            --color-yellow-light: #F0BB6A;
            --color-yellow-dark:  #C78B30;

            /* Flame */
            --color-flame-orange: #FF6B00;
            --color-flame-red:    #E8230A;

            /* Neutrals */
            --color-dark:      #2B2B2B;
            --color-off-white: #FAF8F1;

            /* Fonts */
            --font-playfair: 'Helvetica Neue', Helvetica, Arial, sans-serif;
            --font-inter: 'Helvetica Neue', Helvetica, Arial, sans-serif;
            --font-heading: var(--font-playfair);
            --font-body:    var(--font-inter);
          }
        `}} />
      </head>
      <body
        className="font-body antialiased min-h-screen"
        style={{ color: "#0F0F0F" }}
      >
        <div className="site-bg" aria-hidden="true" />

        {/* Skip to Content Link (A11y) */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 bg-[#FFD600] text-dark px-4 py-2 rounded-lg font-bold outline-none ring-2 ring-[#1E6B2E]"
        >
          Skip to content
        </a>

        {/* Framer Motion — lazy-load animation features for bundle efficiency */}
        <LazyMotion features={domAnimation} strict>
          {children}
        </LazyMotion>

        {/* Google Analytics temporarily disabled */}
        {/* {process.env.NEXT_PUBLIC_GA_ID && (
          <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_ID} />
        )} */}
      </body>
    </html>
  );
}
