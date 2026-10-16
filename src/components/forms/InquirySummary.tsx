import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { ButtonLink } from "@/components/ui/ButtonLink";

type InquirySummaryProps = {
  title: string;
  intro: string;
  crumb: string;
  crumbPath: string;
  stampLabel: string;
  stamp: string;
  when: string;
  rows: readonly (readonly [string, string])[];
  message: string;
};

export function InquirySummary({
  title,
  intro,
  crumb,
  crumbPath,
  stampLabel,
  stamp,
  when,
  rows,
  message,
}: InquirySummaryProps) {
  return (
    <>
      <Breadcrumbs
        items={[
          { name: "Ana Sayfa", path: "/" },
          { name: "İletişim", path: "/iletisim" },
          { name: crumb, path: crumbPath },
        ]}
      />
      <article className="editorial pb-28">
        <p className="label">{crumb}</p>
        <h1 className="mt-4 max-w-3xl font-serif text-[clamp(3rem,6vw,5.5rem)] leading-[0.92]">
          {title}
        </h1>
        <p className="mt-6 max-w-xl text-lg leading-8 text-muted">{intro}</p>

        <div className="mt-14 grid gap-12 border-t border-ink/10 pt-10 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <p className="label">{stampLabel}</p>
            <p className="mt-4 font-serif text-3xl leading-tight break-all">{stamp}</p>
            <p className="mt-4 text-sm text-muted">{when}</p>
          </div>
          <dl className="divide-y divide-ink/10 border-y border-ink/10 lg:col-span-8">
            {rows.map(([label, value]) => (
              <div key={label} className="grid gap-2 py-5 sm:grid-cols-[11rem_1fr] sm:gap-8">
                <dt className="text-xs tracking-[0.16em] text-muted uppercase">{label}</dt>
                <dd className="text-lg leading-7">{value}</dd>
              </div>
            ))}
          </dl>
        </div>

        <section className="mt-14 border-t border-ink/10 pt-10">
          <h2 className="label">Proje açıklaması</h2>
          <p className="mt-6 max-w-3xl font-serif text-[clamp(1.7rem,3vw,2.6rem)] leading-snug whitespace-pre-wrap">
            {message}
          </p>
        </section>

        <div className="btn-group mt-12">
          <ButtonLink href="/">Ana sayfa</ButtonLink>
          <ButtonLink href="/iletisim">Yeni başvuru</ButtonLink>
        </div>
      </article>
    </>
  );
}

export function formatInquiryWhen(iso: string) {
  const created = new Date(iso);
  if (Number.isNaN(created.getTime())) return iso;
  return new Intl.DateTimeFormat("tr-TR", {
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(created);
}
