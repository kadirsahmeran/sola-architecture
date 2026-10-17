"use client";

import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
  type MotionValue,
} from "motion/react";
import { useRef } from "react";
import { StudioImage } from "@/components/ui/StudioImage";
import { processSteps } from "@/lib/site";

type Step = (typeof processSteps)[number];

const total = processSteps.length.toString().padStart(2, "0");

function ProcessCard({
  step,
  index,
  progress,
}: {
  step: Step;
  index: number;
  progress: MotionValue<number>;
}) {
  const reduce = useReducedMotion();
  const count = processSteps.length;
  const start = index / count;
  // Earlier cards recede slightly as the following ones stack on top.
  const scale = useTransform(progress, [start, 1], [1, 1 - (count - 1 - index) * 0.035]);
  const shade = useTransform(progress, [start, 1], [0, (count - 1 - index) * 0.12]);

  return (
    <li
      className="sticky h-[78svh] min-h-[34rem] md:h-[72svh] md:max-h-[44rem]"
      style={{ top: `calc(5.5rem + ${index * 1.4}rem)` }}
    >
      <motion.article
        style={reduce ? undefined : { scale }}
        className="relative flex h-full origin-top flex-col overflow-hidden border border-ink/10 bg-canvas shadow-[0_-12px_40px_-24px_rgb(36_36_36_/_0.45)] md:grid md:grid-cols-12"
      >
        <div className="flex flex-col justify-between p-6 md:col-span-5 md:p-10 xl:p-12">
          <div className="flex items-center justify-between text-[0.72rem] tracking-[0.26em] text-muted uppercase">
            <span>Adım {step.number}</span>
            <span>
              {step.number} / {total}
            </span>
          </div>

          <div className="mt-6 md:mt-0">
            <p className="font-serif text-[clamp(4.5rem,9vw,8.5rem)] leading-none text-accent">
              {step.number}
            </p>
            <h3 className="mt-4 max-w-sm font-serif text-[clamp(1.9rem,2.6vw,2.6rem)] leading-[1.02]">
              {step.title}
            </h3>
            <p className="mt-4 max-w-md text-sm leading-7 text-muted md:text-base">{step.text}</p>
          </div>

          <div className="mt-6 flex gap-1.5" aria-hidden>
            {processSteps.map((other, otherIndex) => (
              <span
                key={other.number}
                className={
                  otherIndex <= index ? "h-px flex-1 bg-accent" : "h-px flex-1 bg-ink/15"
                }
              />
            ))}
          </div>
        </div>

        <div className="relative min-h-48 flex-1 overflow-hidden bg-ink md:col-span-7 md:min-h-0">
          <StudioImage
            src={step.image.src}
            alt={step.image.alt}
            sizes="(min-width: 768px) 55vw, 100vw"
          />
        </div>

        {!reduce && (
          <motion.div
            aria-hidden
            style={{ opacity: shade }}
            className="pointer-events-none absolute inset-0 bg-ink"
          />
        )}
      </motion.article>
    </li>
  );
}

export function ScrollTimeline() {
  const list = useRef<HTMLOListElement>(null);
  const { scrollYProgress } = useScroll({
    target: list,
    offset: ["start start", "end end"],
  });

  return (
    <section className="bg-canvas-2">
      <div className="editorial py-24 md:py-32">
        <div className="grid gap-6 md:grid-cols-12 md:items-end">
          <div className="md:col-span-7">
            <p className="label">06 — Süreç</p>
            <h2 className="mt-4 font-serif text-[clamp(2.6rem,5vw,5rem)] leading-[0.92]">
              Bir Fikir Nasıl Mekâna Dönüşür?
            </h2>
          </div>
          <p className="max-w-sm leading-7 text-muted md:col-span-5 md:justify-self-end">
            İlk görüşmeden anahtar teslimine kadar dört adım. Her biri bir öncekinin üzerine
            kurulur.
          </p>
        </div>

        <ol ref={list} className="relative mt-16 flex flex-col gap-[12svh] md:mt-20">
          {processSteps.map((step, index) => (
            <ProcessCard key={step.number} step={step} index={index} progress={scrollYProgress} />
          ))}
        </ol>
      </div>
    </section>
  );
}
