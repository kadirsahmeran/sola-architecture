import type { Metadata } from "next";
import { site } from "@/lib/site";

type PageMeta = {
  title: string;
  description: string;
  path: string;
  image?: string;
  absoluteTitle?: boolean;
};

export function createMetadata({
  title,
  description,
  path,
  image,
  absoluteTitle = false,
}: PageMeta): Metadata {
  const images = image ? [{ url: image, alt: title }] : undefined;

  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    alternates: { canonical: path },
    openGraph: {
      title,
      description,
      url: path,
      siteName: site.name,
      locale: site.locale,
      type: "website",
      images,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: image ? [image] : undefined,
    },
  };
}

export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": ["Organization", "ProfessionalService"],
    name: site.legalName,
    url: site.url,
    email: site.email,
    description: site.description,
    areaServed: "TR",
    address: {
      "@type": "PostalAddress",
      addressLocality: site.city,
      addressCountry: "TR",
    },
    image: `${site.url}/images/u/hero.jpg`,
  };
}
