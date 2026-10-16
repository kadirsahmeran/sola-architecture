import type { Metadata } from "next";
import { ThankYouView } from "@/app/iletisim/tesekkur/thank-you-view";

export const metadata: Metadata = {
  title: "Başvuru alındı",
  robots: { index: false, follow: false },
};

export default function InquiryThanksPage() {
  return <ThankYouView />;
}
