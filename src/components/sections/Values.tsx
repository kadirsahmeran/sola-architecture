import { Reveal } from "@/components/animations/Reveal";
import { values } from "@/lib/site";

export function Values() {
  return (
    <section className="border-t border-ink/10">
      <div className="editorial py-24 md:py-32">
        <h2 className="max-w-3xl font-serif text-[clamp(2.8rem,5vw,5rem)] leading-[0.92]">
          Tasarımda Her Detay Önemlidir.
        </h2>
        <div className="mt-16 grid gap-12 md:grid-cols-3 md:gap-10">
          {values.map((value, index) => (
            <Reveal key={value.number} delay={index * 0.08}>
              <p className="font-serif text-6xl text-accent">{value.number}</p>
              <div className="mt-6 h-px w-full origin-left bg-ink/20" />
              <h3 className="mt-6 font-serif text-3xl">{value.title}</h3>
              <p className="mt-4 leading-7 text-muted">{value.text}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
