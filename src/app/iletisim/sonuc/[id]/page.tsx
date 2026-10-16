import { notFound } from "next/navigation";
import { connection } from "next/server";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { getSubmissionRepository } from "@/lib/submissions/repository";
import type { Metadata } from "next";

export const instant = false;

export const metadata: Metadata = {
  title: "Başvuru kaydı",
  robots: { index: false, follow: false },
};

function attachmentName(id: string, fileName?: string) {
  if (!fileName) return "Eklenmedi";
  const prefix = `${id}-`;
  return fileName.startsWith(prefix) ? fileName.slice(prefix.length) : fileName;
}

export default async function InquiryResultPage({
  params,
}: PageProps<"/iletisim/sonuc/[id]">) {
  await connection();
  const { id } = await params;
  const record = await getSubmissionRepository().find(id);
  if (!record) notFound();

  const created = new Date(record.createdAt);
  const when = Number.isNaN(created.getTime())
    ? record.createdAt
    : new Intl.DateTimeFormat("tr-TR", {
        day: "numeric",
        month: "long",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      }).format(created);

  const rows = [
    ["Ad soyad", record.name],
    ["E-posta", record.email],
    ["Telefon", record.phone],
    ["Proje türü", record.projectType],
    ["Konum", record.location],
    ["Yaklaşık bütçe", record.budget],
    ["Dosya", attachmentName(record.id, record.fileName)],
  ] as const;

  return (
    <>
      <Breadcrumbs
        items={[
          { name: "Ana Sayfa", path: "/" },
          { name: "İletişim", path: "/iletisim" },
          { name: "Kayıt", path: `/iletisim/sonuc/${record.id}` },
        ]}
      />
      <article className="editorial pb-28">
        <p className="label">Başvuru kaydı</p>
        <h1 className="mt-4 max-w-3xl font-serif text-[clamp(3rem,6vw,5.5rem)] leading-[0.92]">
          Başvurunuz kaydedildi.
        </h1>
        <p className="mt-6 max-w-xl text-lg leading-8 text-muted">
          İlettiğiniz bilgiler aşağıda özetlenmiştir.
        </p>

        <div className="mt-14 grid gap-12 border-t border-ink/10 pt-10 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <p className="label">Kayıt no</p>
            <p className="mt-4 font-serif text-3xl leading-tight break-all">{record.id}</p>
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
            {record.message}
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
