import Link from "next/link";
import { getServices } from "@/lib/content";
import { navigation, site } from "@/lib/site";

export function Footer() {
  const services = getServices();

  return (
    <footer className="border-t border-ink/10 bg-canvas">
      <div className="editorial grid gap-14 py-16 md:grid-cols-12 md:py-24">
        <div className="md:col-span-5">
          <p className="font-serif text-4xl tracking-[0.16em]">SOLA</p>
          <p className="mt-6 max-w-sm text-sm leading-7 text-muted">
            Mimari tasarım, iç mimarlık ve yaşam alanlarına özgün bir bakış.
          </p>
        </div>
        <div className="md:col-span-3">
          <p className="label">Sayfalar</p>
          <ul className="mt-5 space-y-3">
            {navigation.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="link-underline text-sm">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="md:col-span-4">
          <p className="label">Hizmetler</p>
          <ul className="mt-5 space-y-3">
            {services.map((service) => (
              <li key={service.slug}>
                <Link href={`/hizmetler/${service.slug}`} className="link-underline text-sm">
                  {service.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="editorial flex flex-col gap-4 border-t border-ink/10 py-6 text-sm text-muted md:flex-row md:items-end md:justify-between">
        <div>
          <a className="link-underline text-ink" href={`mailto:${site.email}`}>
            {site.email}
          </a>
          <p className="mt-2">
            {site.city}, {site.country}
          </p>
        </div>
        <p className="text-xs tracking-[0.14em] text-muted uppercase">
          © {site.contentUpdated.slice(0, 4)} SOLA
        </p>
      </div>
    </footer>
  );
}
