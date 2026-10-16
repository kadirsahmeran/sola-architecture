"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { ImageReveal } from "@/components/animations/ImageReveal";
import { StudioImage } from "@/components/ui/StudioImage";
import type { Project } from "@/types/content";
import { cn } from "@/lib/utils";

export function ProjectCard({
  project,
  className,
  aspect = "aspect-[4/5]",
  priority = false,
  sizes = "(min-width: 1024px) 40vw, 100vw",
  overlay = false,
}: {
  project: Project;
  className?: string;
  aspect?: string;
  priority?: boolean;
  sizes?: string;
  overlay?: boolean;
}) {
  return (
    <article className={className}>
      <Link href={`/projeler/${project.slug}`} className="group block">
        <ImageReveal className={cn("relative overflow-hidden bg-canvas-2", aspect)}>
          <StudioImage
            src={project.cover.src}
            alt={project.cover.alt}
            sizes={sizes}
            priority={priority}
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
          />
          {overlay ? (
            <>
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/25 to-ink/10" />
              <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-5 text-paper md:p-6">
                <div>
                  <h3 className="font-serif text-3xl leading-none">{project.title}</h3>
                  <p className="mt-2 text-sm text-paper/80">{project.location}</p>
                </div>
                <p className="shrink-0 pb-1 text-right text-[0.68rem] tracking-[0.16em] text-paper/75 uppercase">
                  {project.categoryLabel}
                  <span className="mt-1 block">{project.year}</span>
                </p>
              </div>
            </>
          ) : (
            <>
              <div className="pointer-events-none absolute inset-0 bg-ink/0 transition-colors duration-500 group-hover:bg-ink/25" />
              <span className="absolute right-4 bottom-4 text-paper opacity-0 transition-all duration-500 group-hover:translate-x-1 group-hover:opacity-100">
                <ArrowUpRight aria-hidden />
              </span>
            </>
          )}
        </ImageReveal>
        {overlay ? null : (
        <div className="mt-4 flex items-start justify-between gap-6">
          <div>
            <h3 className="font-serif text-3xl">{project.title}</h3>
            <p className="mt-1 text-sm text-muted">{project.location}</p>
          </div>
          <p className="pt-2 text-right text-xs tracking-[0.16em] text-muted uppercase">
            {project.categoryLabel}
            <span className="mt-1 block">{project.year}</span>
          </p>
        </div>
        )}
      </Link>
    </article>
  );
}
