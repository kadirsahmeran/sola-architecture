"use client";

import { useEffect, useId, useRef } from "react";
import { StudioImage } from "@/components/ui/StudioImage";
import type { Media } from "@/types/content";
import "glightbox/dist/css/glightbox.min.css";

export function LightboxGallery({ images, label }: { images: Media[]; label: string }) {
  const galleryId = useId().replace(/:/g, "");
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let active = true;
    let lightbox: { destroy: () => void } | null = null;
    const timer = window.setTimeout(() => {
      if (!active || !root.current) return;
      void import("glightbox").then((module) => {
        if (!active) return;
        const GLightbox = module.default ?? module;
        lightbox = GLightbox({
          selector: `[data-lightbox="${galleryId}"]`,
          touchNavigation: true,
          loop: true,
          zoomable: true,
          draggable: true,
        });
      });
    }, 0);

    return () => {
      active = false;
      window.clearTimeout(timer);
      lightbox?.destroy();
    };
  }, [galleryId, images]);

  if (images.length === 0) return null;

  return (
    <div ref={root} className="grid gap-4 md:grid-cols-12 md:gap-6">
      {images.map((image, index) => (
        <a
          key={image.src}
          href={image.src}
          data-lightbox={galleryId}
          data-title={label}
          data-description={image.alt}
          className={
            index === 0
              ? "relative block aspect-[16/10] bg-canvas-2 md:col-span-12"
              : "relative block aspect-[4/5] bg-canvas-2 md:col-span-6"
          }
        >
          <StudioImage
            src={image.src}
            alt={image.alt}
            sizes={index === 0 ? "100vw" : "(min-width: 768px) 45vw, 100vw"}
          />
        </a>
      ))}
    </div>
  );
}
