import { ContactForm } from "@/components/forms/ContactForm";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { createMetadata } from "@/lib/seo";
import { site } from "@/lib/site";
import type { Metadata } from "next";

export const metadata: Metadata = createMetadata({
  title: "İletişim",
  description:
    "Proje türü, konum ve kısa bir açıklamayla stüdyoya yazın. Form, doğrulanmış başvuruyu sunucuda saklar.",
  path: "/iletisim",
});

export default function ContactPage() {
  return (
    <>
      <Breadcrumbs
        items={[
          { name: "Ana Sayfa", path: "/" },
          { name: "İletişim", path: "/iletisim" },
        ]}
      />
      <div className="editorial grid gap-16 pb-28 lg:grid-cols-12">
        <header className="lg:col-span-5">
          <p className="label">İletişim</p>
          <h1 className="mt-4 font-serif text-[clamp(3rem,6vw,5.5rem)] leading-[0.92]">
            Projenizi konuşalım.
          </h1>
          <p className="mt-6 max-w-md text-lg leading-8 text-muted">
            Yeni bir yaşam alanı veya ticari mekân projeniz mi var? Kısa bir not yeterli. Çizim
            ya da keşif fotoğrafı ekleyebilirsiniz.
          </p>
          <dl className="mt-10 space-y-4 text-sm">
            <div>
              <dt className="text-muted">E-posta</dt>
              <dd>
                <a className="link-underline" href={`mailto:${site.email}`}>
                  {site.email}
                </a>
              </dd>
            </div>
            <div>
              <dt className="text-muted">Şehir</dt>
              <dd>
                {site.city}, {site.country}
              </dd>
            </div>
          </dl>
        </header>
        <div className="lg:col-span-6 lg:col-start-7">
          <ContactForm />
        </div>
      </div>
    </>
  );
}
