import { ServiceList } from "@/components/sections/ServiceList";
import { getServices } from "@/lib/content";

export function Services() {
  const services = getServices();

  return (
    <section className="editorial py-24 md:py-32">
      <p className="label">04 — Uzmanlık</p>
      <h2 className="mt-4 max-w-3xl font-serif text-[clamp(2.8rem,5vw,5rem)] leading-[0.92]">
        Ne üzerine çalışırız
      </h2>
      <div className="mt-14">
        <ServiceList services={services} />
      </div>
    </section>
  );
}
