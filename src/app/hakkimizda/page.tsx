import { ParallaxImage } from "@/components/animations/ParallaxImage";
import { Reveal } from "@/components/animations/Reveal";
import { FinalCta } from "@/components/sections/FinalCta";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { roles, values } from "@/lib/site";
import { createMetadata } from "@/lib/seo";
import type { Metadata } from "next";

export const metadata: Metadata = createMetadata({
  title: "Hakkımızda",
  description:
    "SOLA, mekânı ışık, malzeme ve gündelik ritim üzerinden okuyan bir mimarlık stüdyosudur.",
  path: "/hakkimizda",
  image: "/images/u/museum.jpg",
});

export default function AboutPage() {
  return (
    <>
      <Breadcrumbs
        items={[
          { name: "Ana Sayfa", path: "/" },
          { name: "Hakkımızda", path: "/hakkimizda" },
        ]}
      />
      <header className="editorial grid items-end gap-10 pb-12 lg:grid-cols-12">
        <div className="lg:col-span-8">
          <p className="label">Stüdyo</p>
          <h1 className="mt-4 font-serif text-[clamp(3rem,7vw,6.4rem)] leading-[0.9]">
            Mekânı acele etmeden okumak.
          </h1>
        </div>
        <p className="text-lg leading-8 text-muted lg:col-span-4">
          Işık, malzeme ve gündelik ritim. Stüdyonun işi bu üçünden bir mekân kurmaktır.
        </p>
      </header>
      <div className="editorial">
        <ParallaxImage
          src="/images/u/museum.jpg"
          alt="Bulutlu gökyüzünde cam cepheli yüksek yapılar."
          sizes="100vw"
          priority
          reveal
          className="aspect-[16/8]"
        />
      </div>
      <section className="editorial grid gap-12 py-24 lg:grid-cols-12">
        <h2 className="font-serif text-5xl lg:col-span-4">Firmanın hikâyesi</h2>
        <div className="space-y-5 text-lg leading-8 lg:col-span-7 lg:col-start-6">
          <p>
            SOLA, mekânı ışık, malzeme ve gündelik ritim üzerinden okur. Plan bir şema, cephe bir
            vitrin değildir. Her iş, yerin ve içinde yaşanacak günün birlikte kurulmasıyla başlar.
          </p>
          <p>
            Çizim, malzeme ve uygulama aynı dili konuşur. Kararlar masada görünür; sürpriz, mekânın
            kendisine bırakılır.
          </p>
        </div>
      </section>
      <section className="bg-canvas-2">
        <div className="editorial grid items-center gap-12 py-24 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <ParallaxImage
              src="/images/u/detail.jpg"
              alt="İç mekânda malzeme ve birleşim detayı."
              sizes="(min-width: 1024px) 40vw, 100vw"
              reveal
              className="aspect-[4/5]"
            />
          </div>
          <div className="lg:col-span-6 lg:col-start-7">
            <h2 className="font-serif text-5xl">Mimari yaklaşım</h2>
            <p className="mt-6 leading-8 text-muted">
              Önce yer, sonra program, en son yüzey. Işık bir süs değil, planın malzemesidir.
              Eşikler odaları birbirinden ayırır ama evi parçalamaz. Yeni olan, eski olanın
              taklidine girmez.
            </p>
            <p className="mt-5 leading-8 text-muted">
              Ticari işte vitrin ile çalışma masası karışmaz. Konutta manzara her odaya
              bölüştürülmez. Renovasyonda korunan, onarılan ve eklenen aynı sayfada durur.
            </p>
          </div>
        </div>
      </section>
      <section className="editorial py-24">
        <h2 className="max-w-3xl font-serif text-5xl leading-[0.95]">
          Tasarım felsefesi, az kararın doğru yerde verilmesidir.
        </h2>
        <div className="mt-16 grid gap-12 md:grid-cols-3">
          {values.map((value, index) => (
            <Reveal key={value.number} delay={index * 0.08}>
              <p className="text-sm text-accent">{value.number}</p>
              <h3 className="mt-4 font-serif text-3xl">{value.title}</h3>
              <p className="mt-4 leading-7 text-muted">{value.text}</p>
            </Reveal>
          ))}
        </div>
      </section>
      <section className="border-t border-ink/10">
        <div className="editorial py-24">
          <h2 className="font-serif text-5xl">Kadro</h2>
          <ul className="mt-12 divide-y divide-ink/15 border-y border-ink/15">
            {roles.map((role) => (
              <li key={role.title} className="grid gap-3 py-8 md:grid-cols-12">
                <h3 className="font-serif text-3xl md:col-span-4">{role.title}</h3>
                <p className="leading-7 text-muted md:col-span-7">{role.text}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>
      <FinalCta />
    </>
  );
}
