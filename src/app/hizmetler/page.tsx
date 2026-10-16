import { ServiceList } from "@/components/sections/ServiceList";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { PageIntro } from "@/components/ui/PageIntro";
import { getServices } from "@/lib/content";
import { createMetadata } from "@/lib/seo";
import type { Metadata } from "next";

export const metadata: Metadata = createMetadata({
  title: "Hizmetler",
  description:
    "Mimari tasarım, iç mimarlık, villa, ticari mekân, renovasyon ve görselleştirme. Her hizmetin kendi kapsamı ve süreci vardır.",
  path: "/hizmetler",
  image: "/images/u/concrete.jpg",
});

export default function ServicesPage() {
  return (
    <>
      <Breadcrumbs
        items={[
          { name: "Ana Sayfa", path: "/" },
          { name: "Hizmetler", path: "/hizmetler" },
        ]}
      />
      <PageIntro
        eyebrow="Uzmanlık"
        title="Hizmetler"
        text="Kart dizisi yerine, her işin kendi ölçüsü olan bir liste. Satıra geldiğinizde ilgili mekân fotoğrafı değişir; mobilde her hizmet kendi görseliyle açılır."
      />
      <div className="editorial pb-28">
        <ServiceList services={getServices()} />
      </div>
    </>
  );
}
