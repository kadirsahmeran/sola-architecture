import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Manrope } from "next/font/google";
import { NetlifyDetectForm } from "@/components/forms/NetlifyDetectForm";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { SmoothScrollProvider } from "@/components/providers/SmoothScrollProvider";
import { JsonLd } from "@/components/ui/JsonLd";
import { organizationJsonLd } from "@/lib/seo";
import { site } from "@/lib/site";
import "./globals.css";

const serif = Cormorant_Garamond({
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500", "600"],
  variable: "--font-cormorant",
  display: "swap",
});

const sans = Manrope({
  subsets: ["latin", "latin-ext"],
  variable: "--font-manrope",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: site.title,
    template: "%s · SOLA",
  },
  description: site.description,
  applicationName: site.name,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: site.locale,
    siteName: site.name,
    title: site.title,
    description: site.description,
    images: [{ url: "/images/u/hero.jpg", alt: "Ahşap kaplamalı modern bir ev, alacakaranlık." }],
  },
  twitter: {
    card: "summary_large_image",
    title: site.title,
    description: site.description,
    images: ["/images/u/hero.jpg"],
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#F5F3EF",
  colorScheme: "light",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="tr" className={`${serif.variable} ${sans.variable} h-full antialiased`}>
      <body className="min-h-svh bg-canvas text-ink">
        <a
          href="#icerik"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[70] focus:bg-paper focus:px-4 focus:py-2"
        >
          İçeriğe geç
        </a>
        <SmoothScrollProvider>
          <div className="flex min-h-svh flex-col">
            <Header />
            <main id="icerik" className="flex min-h-svh flex-1 shrink-0 flex-col">
              {children}
            </main>
            <Footer />
          </div>
        </SmoothScrollProvider>
        <JsonLd data={organizationJsonLd()} />
        <NetlifyDetectForm />
      </body>
    </html>
  );
}
