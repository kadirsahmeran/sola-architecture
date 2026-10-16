import { StudioImage } from "@/components/ui/StudioImage";
import { ButtonLink } from "@/components/ui/ButtonLink";

export function FinalCta() {
  return (
    <section className="relative isolate overflow-hidden bg-ink text-paper">
      <StudioImage
        src="/images/u/house-pool.jpg"
        alt="Havuza açılan, ahşap tavanlı modern bir yaşam alanı."
        sizes="100vw"
        className="object-cover"
      />
      <div className="absolute inset-0 bg-ink/65" />
      <div className="editorial relative z-10 py-24 md:py-36">
        <p className="label text-paper/70">09 — Başlangıç</p>
        <h2 className="mt-6 max-w-4xl font-serif text-[clamp(2.8rem,6vw,6rem)] leading-[0.92]">
          Hayalinizdeki Mekânı Birlikte Tasarlayalım.
        </h2>
        <p className="mt-8 max-w-xl text-lg leading-8 text-paper/80">
          Yeni bir yaşam alanı veya ticari mekân projeniz mi var? Fikirlerinizi konuşalım.
        </p>
        <div className="btn-group mt-10">
          <ButtonLink href="/iletisim" tone="dark">
            Projenizi Konuşalım
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}
