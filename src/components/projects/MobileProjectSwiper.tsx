"use client";

import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { A11y, Keyboard } from "swiper/modules";
import "swiper/css";
import { ProjectCard } from "@/components/projects/ProjectCard";
import type { Project } from "@/types/content";

function ProjectStrip({ projects }: { projects: Project[] }) {
  return (
    <div className="flex gap-4 overflow-x-auto pb-2">
      {projects.map((project) => (
        <div key={project.slug} className="w-[86%] shrink-0">
          <ProjectCard project={project} overlay aspect="aspect-[4/5]" sizes="86vw" />
        </div>
      ))}
    </div>
  );
}

export function MobileProjectSwiper({ projects }: { projects: Project[] }) {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const frame = requestAnimationFrame(() => setReady(true));
    return () => cancelAnimationFrame(frame);
  }, []);

  if (!ready) return <ProjectStrip projects={projects} />;

  return (
    <Swiper
      modules={[A11y, Keyboard]}
      slidesPerView={1.12}
      spaceBetween={16}
      keyboard={{ enabled: true }}
      a11y={{ enabled: true }}
    >
      {projects.map((project) => (
        <SwiperSlide key={project.slug}>
          <ProjectCard project={project} overlay aspect="aspect-[4/5]" sizes="86vw" />
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
