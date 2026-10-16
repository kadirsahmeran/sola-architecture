"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { StudioImage } from "@/components/ui/StudioImage";
import type { Service } from "@/types/content";

export function ServiceList({ services }: { services: Service[] }) {
  const [active, setActive] = useState(0);
  const reduce = useReducedMotion();
  const current = services[active] ?? services[0];

  return (
    <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
      <div className="lg:col-span-7">
        {services.map((service, index) => (
          <Link
            key={service.slug}
            href={`/hizmetler/${service.slug}`}
            className="group block border-t border-ink/15 py-7 last:border-b"
            onMouseEnter={() => setActive(index)}
            onFocus={() => setActive(index)}
          >
            <div className="flex items-baseline gap-6 transition-transform duration-500 ease-out group-hover:translate-x-2">
              <span className="w-10 text-sm text-accent">{service.number}</span>
              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between gap-4">
                  <h3 className="font-serif text-3xl md:text-5xl">{service.title}</h3>
                  <ArrowUpRight
                    aria-hidden
                    className="h-5 w-5 shrink-0 transition-transform duration-500 group-hover:translate-x-1 group-hover:-translate-y-1"
                  />
                </div>
                <p className="mt-3 max-w-lg text-sm leading-6 text-muted">{service.summary}</p>
                <span className="mt-4 block h-px w-0 bg-ink transition-all duration-500 group-hover:w-24" />
              </div>
            </div>
            <div className="relative mt-5 aspect-[16/9] overflow-hidden lg:hidden">
              <StudioImage src={service.image.src} alt={service.image.alt} sizes="100vw" />
            </div>
          </Link>
        ))}
      </div>
      {current ? (
        <div className="relative hidden lg:col-span-5 lg:block">
          <div className="sticky top-28 aspect-[4/5] overflow-hidden bg-canvas-2">
            <AnimatePresence mode="wait">
              <motion.div
                key={current.slug}
                className="absolute inset-0"
                initial={reduce ? false : { opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={reduce ? undefined : { opacity: 0 }}
                transition={{ duration: 0.45 }}
              >
                <StudioImage
                  src={current.image.src}
                  alt={current.image.alt}
                  sizes="36vw"
                />
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      ) : null}
    </div>
  );
}
