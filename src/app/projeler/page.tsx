import { Suspense } from "react";
import { ProjectBrowser } from "@/components/projects/ProjectBrowser";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { PageIntro } from "@/components/ui/PageIntro";
import { getProjects } from "@/lib/content";
import { createMetadata } from "@/lib/seo";
import type { Metadata } from "next";

export const metadata: Metadata = createMetadata({
  title: "Projeler",
  description:
    "Konut, villa, iç mekân, ticari mekân ve renovasyon işleri.",
  path: "/projeler",
  image: "/images/u/villa-dusk.jpg",
});

export default function ProjectsPage() {
  const projects = getProjects();

  return (
    <>
      <Breadcrumbs
        items={[
          { name: "Ana Sayfa", path: "/" },
          { name: "Projeler", path: "/projeler" },
        ]}
      />
      <PageIntro
        eyebrow="İşler"
        title="Projeler"
        text="Konut, villa, iç mekân, ticari mekân ve renovasyon."
      />
      <div className="editorial pb-24">
        <Suspense fallback={<p className="text-muted">Projeler hazırlanıyor.</p>}>
          <ProjectBrowser projects={projects} />
        </Suspense>
      </div>
    </>
  );
}
