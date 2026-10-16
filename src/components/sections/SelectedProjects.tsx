import { MobileProjectSwiper } from "@/components/projects/MobileProjectSwiper";
import { ProjectCard } from "@/components/projects/ProjectCard";
import { AnimatedLink } from "@/components/ui/AnimatedLink";
import { getFeaturedProjects } from "@/lib/content";

export function SelectedProjects() {
  const projects = getFeaturedProjects();

  return (
    <section className="bg-canvas py-8 md:py-16">
      <div className="editorial">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <p className="label">03 — Seçili işler</p>
            <h2 className="mt-4 font-serif text-[clamp(2.8rem,5vw,5.2rem)] leading-[0.92]">
              Seçili Projeler
            </h2>
          </div>
          <p className="max-w-xs text-muted">Tasarladığımız mekânlardan hikâyeler.</p>
        </div>
        <div className="mt-12 hidden grid-cols-2 gap-4 md:grid lg:gap-5">
          {projects.map((project, index) => (
            <ProjectCard
              key={project.slug}
              project={project}
              priority={index < 2}
              overlay
              aspect="aspect-[4/5]"
              sizes="(min-width: 768px) 48vw, 100vw"
            />
          ))}
        </div>
        <div className="mt-10 md:hidden">
          <MobileProjectSwiper projects={projects} />
        </div>
        <div className="mt-14">
          <AnimatedLink href="/projeler">Tüm Projeleri Keşfedin</AnimatedLink>
        </div>
      </div>
    </section>
  );
}
