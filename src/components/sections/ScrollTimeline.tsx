"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { StudioImage } from "@/components/ui/StudioImage";
import { registerGsap } from "@/lib/gsap";
import { processSteps } from "@/lib/site";

function ProcessPlate({
  number,
  title,
  text,
}: {
  number: string;
  title: string;
  text: string;
}) {
  return (
    <div className="max-w-md bg-canvas/95 p-6 shadow-[0_18px_40px_-28px_rgb(36_36_36_/_0.55)] backdrop-blur-sm md:p-7">
      <p className="text-sm text-accent">{number}</p>
      <h3 className="mt-2 font-serif text-3xl leading-tight md:text-[2rem]">{title}</h3>
      <p className="mt-3 text-sm leading-7 text-muted md:text-base">{text}</p>
    </div>
  );
}

export function ScrollTimeline() {
  const root = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const section = root.current;
    if (!section) return;
    registerGsap();
    const match = gsap.matchMedia();

    match.add("(min-width: 1024px) and (prefers-reduced-motion: no-preference)", () => {
      const pin = section.querySelector<HTMLElement>("[data-pin]");
      const panels = gsap.utils.toArray<HTMLElement>("[data-panel]", section);
      const labels = gsap.utils.toArray<HTMLElement>("[data-step]", section);
      if (!pin) return;
      let current = 0;

      const setActive = (index: number, instant: boolean) => {
        panels.forEach((panel, panelIndex) => {
          const show = panelIndex === index;
          if (instant) {
            gsap.set(panel, { autoAlpha: show ? 1 : 0 });
            return;
          }
          gsap.to(panel, {
            autoAlpha: show ? 1 : 0,
            duration: 0.35,
            overwrite: true,
          });
        });
        labels.forEach((label, labelIndex) => {
          label.dataset.active = labelIndex === index ? "true" : "false";
        });
      };

      setActive(0, true);
      const trigger = ScrollTrigger.create({
        trigger: pin,
        start: "top top",
        end: "+=240%",
        pin,
        pinSpacing: true,
        pinType: "transform",
        anticipatePin: 1,
        fastScrollEnd: true,
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          const index = Math.min(
            processSteps.length - 1,
            Math.floor(self.progress * processSteps.length),
          );
          if (index === current) return;
          current = index;
          setActive(index, Math.abs(self.getVelocity()) > 1200);
        },
      });

      return () => trigger.kill();
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
        <ol className="mt-12 space-y-12">
          {processSteps.map((step) => (
            <li key={step.number}>
              <div className="relative aspect-[16/10] overflow-hidden bg-ink">
                <StudioImage src={step.image.src} alt={step.image.alt} sizes="100vw" />
              </div>
              <div className="relative z-10 -mt-12 px-4">
                <ProcessPlate number={step.number} title={step.title} text={step.text} />
              </div>
            </li>
          ))}
        </ol>
      </div>

      <div ref={root} className="relative hidden lg:block">
        <div data-pin className="h-svh overflow-clip">
          <div className="editorial grid h-full w-full grid-cols-12 gap-10 py-16 xl:gap-16">
            <div className="col-span-5 flex flex-col justify-center">
              <p className="label">06 — Süreç</p>
              <h2 className="mt-4 max-w-md font-serif text-[clamp(2.8rem,4vw,4.4rem)] leading-[0.92]">
                Bir Fikir Nasıl Mekâna Dönüşür?
              </h2>
              <ol className="relative mt-12 space-y-1 border-l border-ink/15 pl-6">
                {processSteps.map((step, index) => (
                  <li
                    key={step.number}
                    data-step
                    data-active={index === 0 ? "true" : "false"}
                    className="group relative py-4 transition-opacity duration-500 data-[active=true]:opacity-100 data-[active=false]:opacity-35"
                  >
                    <span
                      aria-hidden
                      className="absolute top-6 -left-[1.62rem] size-2.5 rounded-full border border-ink/30 bg-canvas-2 transition-colors duration-500 group-data-[active=true]:border-accent group-data-[active=true]:bg-accent"
                    />
                    <p className="text-sm text-accent">{step.number}</p>
                    <h3 className="mt-1 font-serif text-[1.85rem] leading-tight">{step.title}</h3>
                  </li>
                ))}
              </ol>
            </div>
            <div className="relative col-span-7 h-full min-h-0">
              {processSteps.map((step, index) => (
                <article
                  key={step.number}
                  data-panel
                  className="absolute inset-0"
                  style={{ opacity: index === 0 ? 1 : 0 }}
                >
                  <div className="relative h-full overflow-hidden bg-ink">
                    <StudioImage src={step.image.src} alt={step.image.alt} sizes="52vw" />
                    <div className="absolute inset-0 bg-gradient-to-t from-ink/40 via-transparent to-ink/10" />
                    <div className="absolute inset-x-0 bottom-0 p-8">
                      <ProcessPlate number={step.number} title={step.title} text={step.text} />
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
