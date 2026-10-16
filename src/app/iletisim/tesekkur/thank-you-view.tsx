"use client";

import { useSyncExternalStore } from "react";
import { InquirySummary, formatInquiryWhen } from "@/components/forms/InquirySummary";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { readInquiryReceipt } from "@/lib/submissions/receipt";

function subscribe() {
  return () => {};
}

export function ThankYouView() {
  const ready = useSyncExternalStore(subscribe, () => true, () => false);

  if (!ready) {
    return (
      <article className="editorial pb-28">
        <p className="label">Başvuru</p>
        <h1 className="mt-4 font-serif text-[clamp(3rem,6vw,5.5rem)] leading-[0.92]">
          Kontrol ediliyor.
        </h1>
      </article>
    );
  }

  const receipt = readInquiryReceipt();

  if (!receipt) {
    return (
      <>
        <Breadcrumbs
          items={[
            { name: "Ana Sayfa", path: "/" },
            { name: "İletişim", path: "/iletisim" },
            { name: "Teşekkür", path: "/iletisim/tesekkur" },
          ]}
        />
        <article className="editorial pb-28">
          <p className="label">Başvuru</p>
          <h1 className="mt-4 max-w-3xl font-serif text-[clamp(3rem,6vw,5.5rem)] leading-[0.92]">
            Özet bulunamadı.
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-8 text-muted">
            Bu sayfa yalnızca gönderimden sonra, aynı tarayıcı oturumunda açılır. Başvuru
            durumunu buradan varsaymıyoruz.
          </p>
          <div className="btn-group mt-12">
            <ButtonLink href="/iletisim">İletişime dön</ButtonLink>
          </div>
        </article>
      </>
    );
  }

  const rows = [
    ["Ad soyad", receipt.name],
    ["E-posta", receipt.email],
    ["Telefon", receipt.phone],
    ["Proje türü", receipt.projectType],
    ["Konum", receipt.location],
    ["Yaklaşık bütçe", receipt.budget],
    ["Dosya", receipt.fileName],
  ] as const;

  return (
    <InquirySummary
      title="Başvurunuz alındı."
      intro="İlettiğiniz bilgiler Netlify Forms üzerinden kaydedildi. Aşağıdaki özet bu tarayıcı oturumundan okunur."
      crumb="Teşekkür"
      crumbPath="/iletisim/tesekkur"
      stampLabel="Kanal"
      stamp="Netlify Forms"
      when={formatInquiryWhen(receipt.createdAt)}
      rows={rows}
      message={receipt.message}
    />
  );
}
