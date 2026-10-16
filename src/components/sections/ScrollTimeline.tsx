"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { StudioImage } from "@/components/ui/StudioImage";
import { registerGsap } from "@/lib/gsap";
import { processSteps } from "@/lib/site";

export function ScrollTimeline() {
  const root = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const section = root.current;
    if (!section) return;
    registerGsap();
    const match = gsap.matchMedia();

    match.add("(min-width: 1024px) and (prefers-reduced-motion: no-preference)", () => {
      const panels = gsap.utils.toArray<HTMLElement>("[data-panel]", section);
      const labels = gsap.utils.toArray<HTMLElement>("[data-step]", section);
      let current = 0;

      const setActive = (index: number) => {
        panels.forEach((panel, panelIndex) => {
          gsap.to(panel, {
            autoAlpha: panelIndex === index ? 1 : 0,
            duration: 0.4,
            overwrite: true,
          });
        });
        labels.forEach((label, labelIndex) => {
          label.dataset.active = labelIndex === index ? "true" : "false";
        });
      };

      setActive(0);
      const trigger = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "+=280%",
          pin: "[data-pin]",
          scrub: 0.4,
          onUpdate: (self) => {
            const index = Math.min(
              processSteps.length - 1,
              Math.floor(self.progress * processSteps.length),
            );
            if (index !== current) {
              current = index;
              setActive(index);
            }
          },
        },
      });

      return () => {
        trigger.scrollTrigger?.kill();
        trigger.kill();
      };
    });

    return () => match.revert();
  }, []);

  return (
    <section className="bg-canvas-2">
      <div className="editorial py-20 lg:hidden">
        <p className="label">06 — Süreç</p>
        <h2 className="mt-4 font-serif text-[clamp(2.6rem,8vw,4rem)] leading-[0.92]">
          Bir Fikir Nasıl Mekâna Dönüşür?
        </h2>
        <ol className="mt-12 space-y-14">
          {processSteps.map((step) => (
            <li key={step.number} className="border-t border-ink/15 pt-6">
              <p className="text-sm text-accent">{step.number}</p>
              <h3 className="mt-3 font-serif text-4xl">{step.title}</h3>
              <p className="mt-4 leading-7 text-muted">{step.text}</p>
              <div className="relative mt-6 aspect-[16/10]">
                <StudioImage src={step.image.src} alt={step.image.alt} sizes="100vw" />
              </div>
            </li>
          ))}
        </ol>
      </div>

      <div ref={root} className="relative hidden lg:block">
        <div data-pin className="flex h-svh items-center">
          <div className="editorial grid w-full grid-cols-12 gap-12">
            <div className="col-span-5">
              <p className="label">06 — Süreç</p>
              <h2 className="mt-4 font-serif text-6xl leading-[0.92]">
                Bir Fikir Nasıl Mekâna Dönüşür?
              </h2>
              <ol className="mt-12 space-y-6">
                {processSteps.map((step, index) => (
                  <li
                    key={step.number}
                    data-step
                    data-active={index === 0 ? "true" : "false"}
                    className="border-t border-ink/15 pt-4 opacity-40 transition-opacity data-[active=true]:opacity-100"
                  >
                    <p className="text-sm text-accent">{step.number}</p>
                    <h3 className="mt-2 font-serif text-3xl">{step.title}</h3>
                  </li>
                ))}
              </ol>
            </div>
            <div className="relative col-span-6 col-start-7 h-[70vh]">
              {processSteps.map((step, index) => (
                <article
                  key={step.number}
                  data-panel
                  className="absolute inset-0"
                  style={{ opacity: index === 0 ? 1 : 0 }}
                >
                  <div className="relative h-[46vh]">
                    <StudioImage src={step.image.src} alt={step.image.alt} sizes="42vw" />
                  </div>
                  <p className="mt-6 max-w-lg leading-7 text-muted">{step.text}</p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
