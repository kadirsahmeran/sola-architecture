import { ParallaxImage } from "@/components/animations/ParallaxImage";
import { Reveal } from "@/components/animations/Reveal";
import { AnimatedLink } from "@/components/ui/AnimatedLink";

export function Manifesto() {
  return (
    <section id="manifesto" className="editorial grid items-center gap-12 py-24 md:py-36 lg:grid-cols-12 lg:gap-x-16 lg:gap-y-4">
      <Reveal className="lg:col-span-6 lg:row-start-1">
        <p className="label">02 — Manifesto</p>
        <h2 className="mt-6 font-serif text-[clamp(2.8rem,5vw,5.4rem)] leading-[0.92]">
          Her Mekânın Anlatacak Bir Hikâyesi Vardır.
        </h2>
        <div className="mt-8 max-w-xl space-y-5 text-base leading-8 text-muted md:text-lg">
          <p>
            İyi bir mekân, ilk bakışta bağırmaz. Işığın düştüğü saatte, eşikten içeri girildiğinde ve malzemenin ele değdiği anda anlaşılır.
          </p>
          <p>
            SOLA, planı bir şema, cepheyi bir vitrin olarak görmez. Her iş; yerin, gündelik ritmin ve korunması gereken izlerin birlikte okunmasıyla başlar.
          </p>
        </div>
        <div className="mt-10">
          <AnimatedLink href="/hakkimizda">Hakkımızda</AnimatedLink>
        </div>
      </Reveal>
      <div className="lg:col-span-5 lg:col-start-8 lg:row-start-1">
        <ParallaxImage
          src="/images/u/tower.jpg"
          alt="Cam cepheli yüksek bir yapının yukarı doğru kadrajı."
          sizes="(min-width: 1024px) 36vw, 100vw"
          reveal
          className="aspect-[3/4]"
        />
      </div>
      <p className="max-w-xs text-sm leading-6 text-muted lg:col-span-5 lg:col-start-8">
        Dikey bir kütle, yere nasıl oturduğuyla okunur. Yükseklik tek başına bir karakter değildir.
      </p>
    </section>
  );
}
