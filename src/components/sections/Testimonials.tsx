"use client";

import { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { A11y, EffectFade, Keyboard } from "swiper/modules";
import type { Swiper as SwiperInstance } from "swiper";
import "swiper/css";
import "swiper/css/effect-fade";
import { StudioImage } from "@/components/ui/StudioImage";
import { testimonials } from "@/lib/site";
import { cn } from "@/lib/utils";
import type { Testimonial } from "@/types/content";

function Slide({ item }: { item: Testimonial }) {
  return (
    <article className="relative min-h-[88svh] overflow-hidden bg-ink text-paper">
      <StudioImage src={item.image.src} alt={item.image.alt} sizes="100vw" className="object-cover" />
      <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/45 to-ink/20" />
      <div className="editorial relative z-10 flex min-h-[88svh] flex-col justify-end pb-32 pt-28 md:pb-36">
        <p className="label text-paper/65">07 — Referans metinleri</p>
        <figure className="mt-8 max-w-4xl">
          <blockquote className="font-serif text-[clamp(2rem,4.4vw,4.4rem)] leading-[1.05]">
            <span aria-hidden className="mr-2 text-accent">
              “
            </span>
            {item.quote}
          </blockquote>
          <figcaption className="mt-8 flex flex-wrap items-center gap-x-4 gap-y-1 text-[0.72rem] tracking-[0.18em] text-paper/75 uppercase">
            <span>{item.role}</span>
            <span aria-hidden className="hidden h-px w-8 bg-paper/40 sm:block" />
            <span>{item.context}</span>
          </figcaption>
        </figure>
      </div>
    </article>
  );
}

export function Testimonials() {
  const swiperRef = useRef<SwiperInstance | null>(null);
  const [ready, setReady] = useState(false);
  const [index, setIndex] = useState(0);
  const total = testimonials.length;
  const current = testimonials[index] ?? testimonials[0];

  useEffect(() => {
    const frame = requestAnimationFrame(() => setReady(true));
    return () => cancelAnimationFrame(frame);
  }, []);

  return (
    <section className="relative bg-ink text-paper">
      {ready ? (
        <Swiper
          modules={[A11y, EffectFade, Keyboard]}
          effect="fade"
          fadeEffect={{ crossFade: true }}
          slidesPerView={1}
          speed={800}
          loop
          keyboard={{ enabled: true }}
          a11y={{
            enabled: true,
            prevSlideMessage: "Önceki yorum",
            nextSlideMessage: "Sonraki yorum",
          }}
          onSwiper={(instance) => {
            swiperRef.current = instance;
          }}
          onSlideChange={(instance) => setIndex(instance.realIndex)}
        >
          {testimonials.map((item) => (
            <SwiperSlide key={item.id}>
              <Slide item={item} />
            </SwiperSlide>
          ))}
        </Swiper>
      ) : current ? (
        <Slide item={current} />
      ) : null}

      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-20">
        <div className="editorial flex justify-end pb-8 md:pb-10">
          <div className="pointer-events-auto flex items-center gap-3 sm:gap-4">
            <p className="text-[0.7rem] tracking-[0.22em] text-paper/70 uppercase">
              {String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
            </p>
            <div className="flex items-center gap-1.5" role="tablist" aria-label="Yorumlar">
              {testimonials.map((item, itemIndex) => (
                <button
                  key={item.id}
                  type="button"
                  role="tab"
                  aria-label={`${itemIndex + 1}. yorum`}
                  aria-selected={index === itemIndex}
                  onClick={() => swiperRef.current?.slideToLoop(itemIndex)}
                  className={cn(
                    "h-1.5 rounded-full transition-all",
                    index === itemIndex ? "w-8 bg-paper" : "w-1.5 bg-paper/35",
                  )}
                />
              ))}
            </div>
            <div className="flex gap-2">
              <button
                type="button"
                aria-label="Önceki yorum"
                onClick={() => swiperRef.current?.slidePrev()}
                className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-paper/35 text-paper transition-colors hover:border-paper hover:bg-paper/10"
              >
                <ChevronLeft aria-hidden className="h-4 w-4" />
              </button>
              <button
                type="button"
                aria-label="Sonraki yorum"
                onClick={() => swiperRef.current?.slideNext()}
                className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-paper/35 text-paper transition-colors hover:border-paper hover:bg-paper/10"
              >
                <ChevronRight aria-hidden className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
