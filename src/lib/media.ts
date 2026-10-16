import type { Media } from "@/types/content";

export function media(file: string, alt: string): Media {
  return { src: `/images/u/${file}.jpg`, alt };
}
