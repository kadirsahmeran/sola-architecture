"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useRouter, useSearchParams } from "next/navigation";
import { ProjectCard } from "@/components/projects/ProjectCard";
import { isProjectCategory, projectFilters } from "@/lib/content";
import type { Project } from "@/types/content";
import { cn } from "@/lib/utils";

export function ProjectBrowser({ projects }: { projects: Project[] }) {
  const params = useSearchParams();
  const router = useRouter();
  const reduce = useReducedMotion();
  const raw = params.get("kategori") ?? "tumu";
  const active = raw === "tumu" || isProjectCategory(raw) ? raw : "gecersiz";
  const visible =
    active === "tumu"
      ? projects
      : active === "gecersiz"
        ? []
        : projects.filter((project) => project.category === active);

  function select(id: string) {
    const href = id === "tumu" ? "/projeler" : `/projeler?kategori=${id}`;
    router.replace(href, { scroll: false });
  }

  return (
    <div>
      <div className="flex flex-wrap gap-x-6 gap-y-3" role="toolbar" aria-label="Proje filtreleri">
        {projectFilters.map((filter) => {
          const pressed = active === filter.id;
          return (
            <button
              key={filter.id}
              type="button"
              aria-pressed={pressed}
              onClick={() => select(filter.id)}
              className={cn(
                "link-underline text-sm tracking-[0.14em] uppercase",
                pressed ? "text-ink" : "text-muted",
              )}
            >
              {filter.label}
            </button>
          );
        })}
      </div>
      {visible.length === 0 ? (
        <div className="mt-16 border-t border-ink/15 py-16">
          <p className="font-serif text-4xl">Bu filtrede proje yok.</p>
          <button type="button" onClick={() => select("tumu")} className="link-underline mt-6 text-sm uppercase">
            Tüm projelere dön
          </button>
        </div>
      ) : (
        <motion.div layout className="mt-12 grid gap-x-8 gap-y-16 md:grid-cols-2">
          <AnimatePresence mode="popLayout">
            {visible.map((project, index) => (
              <motion.div
                key={project.slug}
                layout
                className={index % 3 === 0 ? "md:col-span-2" : undefined}
                initial={reduce ? false : { opacity: 0.4 }}
                animate={{ opacity: 1 }}
                exit={reduce ? undefined : { opacity: 0 }}
                transition={{ duration: 0.35 }}
              >
                <ProjectCard
                  project={project}
                  aspect={index % 3 === 0 ? "aspect-[16/9]" : "aspect-[4/5]"}
                  sizes={index % 3 === 0 ? "(min-width: 768px) 80vw, 100vw" : "(min-width: 768px) 40vw, 100vw"}
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      )}
    </div>
  );
}
