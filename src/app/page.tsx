import { FinalCta } from "@/components/sections/FinalCta";
import { Hero } from "@/components/sections/Hero";
import { Journal } from "@/components/sections/Journal";
import { Manifesto } from "@/components/sections/Manifesto";
import { ScrollTimeline } from "@/components/sections/ScrollTimeline";
import { SelectedProjects } from "@/components/sections/SelectedProjects";
import { Services } from "@/components/sections/Services";
import { Testimonials } from "@/components/sections/Testimonials";
import { Values } from "@/components/sections/Values";
import { createMetadata } from "@/lib/seo";
import { site } from "@/lib/site";
import type { Metadata } from "next";

export const metadata: Metadata = createMetadata({
  title: site.title,
  description: site.description,
  path: "/",
  image: "/images/u/hero.jpg",
  absoluteTitle: true,
});

export default function HomePage() {
  return (
    <>
      <Hero />
      <Manifesto />
      <SelectedProjects />
      <Services />
      <Values />
      <ScrollTimeline />
      <Testimonials />
      <Journal />
      <FinalCta />
    </>
  );
}
