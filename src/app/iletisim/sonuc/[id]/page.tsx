import { notFound } from "next/navigation";
import { connection } from "next/server";
import { InquirySummary, formatInquiryWhen } from "@/components/forms/InquirySummary";
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
    <InquirySummary
      title="Başvurunuz kaydedildi."
      intro="İlettiğiniz bilgiler aşağıda özetlenmiştir."
      crumb="Kayıt"
      crumbPath={`/iletisim/sonuc/${record.id}`}
      stampLabel="Kayıt no"
      stamp={record.id}
      when={formatInquiryWhen(record.createdAt)}
      rows={rows}
      message={record.message}
    />
  );
}
