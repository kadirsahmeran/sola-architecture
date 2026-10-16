"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ImageReveal } from "@/components/animations/ImageReveal";
import { StudioImage } from "@/components/ui/StudioImage";
import { registerGsap } from "@/lib/gsap";
import { cn } from "@/lib/utils";

type Props = {
  src: string;
  alt: string;
  sizes: string;
  className?: string;
  priority?: boolean;
  reveal?: boolean;
  parallax?: boolean;
};

export function ParallaxImage({
  src,
  alt,
  sizes,
  className,
  priority = false,
  reveal = false,
  parallax = true,
}: Props) {
  const mover = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const element = mover.current;
    if (!element || !parallax) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const desktop = window.matchMedia("(min-width: 1024px)").matches;
    if (reduce || !desktop) return;

    registerGsap();
    const context = gsap.context(() => {
      gsap.to(element, {
        yPercent: 5,
        ease: "none",
        scrollTrigger: {
          trigger: element.parentElement,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });
    }, element);

    return () => context.revert();
  }, [parallax]);

  const image = (
    <StudioImage
      src={src}
      alt={alt}
      sizes={sizes}
      priority={priority}
      className="object-cover"
    />
  );

  return (
    <div className={cn("relative overflow-hidden", className)}>
      <div ref={mover} className="absolute inset-x-0 -top-[12%] h-[124%]">
        {reveal ? (
          <ImageReveal className="relative h-full w-full">{image}</ImageReveal>
        ) : (
          <div className="relative h-full w-full">{image}</div>
        )}
      </div>
    </div>
  );
}
