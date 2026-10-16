"use client";

import { useLayoutEffect, useRef } from "react";
import { ArrowDown } from "lucide-react";
import gsap from "gsap";
import { AnimatedText } from "@/components/animations/AnimatedText";
import { useSmoothScroll } from "@/components/providers/SmoothScrollProvider";
import { StudioImage } from "@/components/ui/StudioImage";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { registerGsap } from "@/lib/gsap";

export function Hero() {
  const frame = useRef<HTMLElement>(null);
  const parallax = useRef<HTMLDivElement>(null);
  const scaler = useRef<HTMLDivElement>(null);
  const { scrollTo } = useSmoothScroll();

  useLayoutEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    registerGsap();
    const context = gsap.context(() => {
      gsap.fromTo(
        scaler.current,
        { scale: 1.08 },
        { scale: 1, duration: 1.8, ease: "power2.out" },
      );
      gsap.to(parallax.current, {
        yPercent: 6,
        ease: "none",
        scrollTrigger: {
          trigger: frame.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });
    }, frame);
    return () => context.revert();
  }, []);

  return (
    <section ref={frame} className="relative h-[100svh] min-h-[640px] overflow-hidden bg-ink text-paper">
      <div className="absolute inset-0">
        <div ref={parallax} className="absolute inset-[-14%]">
          <div ref={scaler} className="relative h-full w-full">
            <StudioImage
              src="/images/u/hero.jpg"
              alt="Alacakaranlıkta, bahçedeki ağacın önünde ahşap kaplamalı modern bir ev."
              sizes="100vw"
              priority
              className="object-cover"
            />
          </div>
        </div>
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-ink/75 via-ink/20 to-ink/25" />
      <div className="editorial relative z-10 flex h-full flex-col justify-center pt-20 pb-28 md:justify-end md:pt-0 md:pb-20">
        <p className="label text-paper/75">Mimarlık ve iç mimarlık</p>
        <AnimatedText
          lines={["Mekânlara Anlam,", "Yaşama Değer Katıyoruz."]}
          className="mt-6 max-w-5xl font-serif text-[clamp(3rem,8vw,7.4rem)] leading-[0.9] font-medium"
        />
        <p className="mt-6 max-w-xl text-base leading-7 text-paper/85 md:text-lg">
          Mimari tasarım, iç mimarlık ve yaşam alanlarına özgün bir bakış açısı.
        </p>
        <div className="btn-group mt-8">
          <ButtonLink href="/projeler" tone="dark">
            Projelerimizi Keşfedin
          </ButtonLink>
          <ButtonLink href="/iletisim" tone="dark">
            Projenizi Konuşalım
          </ButtonLink>
        </div>
      </div>
      <button
        type="button"
        onClick={() => scrollTo("#manifesto")}
        className="absolute bottom-6 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-2 text-[0.68rem] tracking-[0.22em] text-paper uppercase"
      >
        Aşağı kaydır
        <ArrowDown aria-hidden className="scroll-cue h-4 w-4" />
      </button>
    </section>
  );
}
