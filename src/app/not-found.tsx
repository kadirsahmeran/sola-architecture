import type { Metadata } from "next";
import { ButtonLink } from "@/components/ui/ButtonLink";

export const metadata: Metadata = {
  title: "Sayfa bulunamadı",
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <div className="relative flex min-h-svh flex-col justify-center overflow-hidden pt-28 pb-24">
      <p
        aria-hidden
        className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[58%] font-serif text-[clamp(11rem,38vw,26rem)] leading-none font-medium text-ink/[0.045] select-none"
      >
        404
      </p>
      <article className="editorial relative max-w-3xl">
        <p className="label">Sayfa bulunamadı</p>
        <h1 className="mt-5 font-serif text-[clamp(2.8rem,6vw,5.5rem)] leading-[0.92]">
          Bu adres stüdyoda yok.
        </h1>
        <p className="mt-6 max-w-md text-lg leading-8 text-muted">
          Yazılan yol tanınmıyor, taşınmış ya da hiç açılmamış olabilir. Ana sayfadan veya proje
          arşivinden devam edebilirsiniz.
        </p>
        <div className="btn-group mt-10">
          <ButtonLink href="/">Ana sayfa</ButtonLink>
          <ButtonLink href="/projeler">Projeler</ButtonLink>
        </div>
      </article>
    </div>
  );
}
