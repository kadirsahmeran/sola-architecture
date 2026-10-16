import { media } from "@/lib/media";
import type { ProcessStep, StudioValue, Testimonial } from "@/types/content";

export const site = {
  name: "SOLA",
  legalName: "SOLA Atelier",
  title: "SOLA — Mimarlık ve İç Mimarlık",
  description:
    "Mimari tasarım, iç mimarlık ve yaşam alanlarına özgün bir bakış. SOLA, mekânın ışığını, malzemesini ve gündelik ritmini birlikte kuran bir stüdyo kimliğidir.",
  url: process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
  locale: "tr_TR",
  email: "studio@example.com",
  city: "İstanbul",
  country: "Türkiye",
  contentUpdated: "2026-10-01",
} as const;

export const navigation = [
  { href: "/", label: "Ana Sayfa" },
  { href: "/projeler", label: "Projeler" },
  { href: "/hizmetler", label: "Hizmetler" },
  { href: "/hakkimizda", label: "Hakkımızda" },
  { href: "/blog", label: "Blog" },
  { href: "/iletisim", label: "İletişim" },
] as const;

export const values: StudioValue[] = [
  {
    number: "01",
    title: "Özgün Tasarım",
    text: "Her iş, arsanın ışığından, yapının izinden ve içinde yaşanacak günden türer. Hazır bir dil tekrarlanmaz.",
  },
  {
    number: "02",
    title: "İşlevsel Mekânlar",
    text: "Güzellik, kullanımın önüne geçmez. Eşikler, depolama, gölge ve dolaşım tasarımın görünür parçasıdır.",
  },
  {
    number: "03",
    title: "Şeffaf Süreç Yönetimi",
    text: "Kararlar, çizim ve malzeme notlarıyla birlikte paylaşılır. Süreç, sürpriz bırakmayan bir tempo tutar.",
  },
];

export const processSteps: ProcessStep[] = [
  {
    number: "01",
    title: "Tanışma ve İhtiyaç Analizi",
    text: "Arsa, mevcut yapı ya da boş bir hacim birlikte okunur. Bütçe, takvim ve gündelik alışkanlıklar masaya konur. Bu aşamanın çıktısı bir niyet notudur: neyin korunacağı, neyin değişeceği ve neyin henüz erken olduğu.",
    image: media(
      "workspace",
      "Uzun bir masa etrafında toplanmış çalışma alanı.",
    ),
  },
  {
    number: "02",
    title: "Konsept Geliştirme",
    text: "Işık yönü, eşikler ve malzeme ailesi birkaç güçlü karara indirilir. Plan hâlâ esnektir; amaç, mekânın karakterini erken ve sade bir dille görmektir.",
    image: media(
      "living-stone",
      "Taş dokulu duvarın önünde sakin bir oturma alanı.",
    ),
  },
  {
    number: "03",
    title: "Tasarım ve 3D Görselleştirme",
    text: "Plan, kesit ve malzeme kararları birbirini doğrular. Görseller bir vitrin değil, ışığın, ölçünün ve birleşimlerin kontrolüdür.",
    image: media(
      "material",
      "Yüksek pencereli, ahşap merdivenli aydınlık bir yaşam alanı.",
    ),
  },
  {
    number: "04",
    title: "Uygulama ve Teslim",
    text: "Şantiye notları, numuneler ve son yerleşim aynı dosyada tutulur. Teslim, anahtar anı değil; mekânın kullanıma hazır olduğu andır.",
    image: media(
      "villa-dusk",
      "Havuzlu, ahşap tavanlı beyaz bir villa.",
    ),
  },
];

export const testimonials: Testimonial[] = [
  {
    id: "ornek-1",
    quote:
      "İlk eskizden uygulama notuna kadar her kararın nedenini masada gördük. Sürpriz, yalnızca mekânın kendisiydi.",
    role: "İşveren",
    context: "Konut",
    image: media(
      "night-villa",
      "Akşam ışığında içeriden aydınlanan bir konut.",
    ),
  },
  {
    id: "ornek-2",
    quote:
      "Malzeme seçimi aceleye gelmedi. Numuneler gün ışığında, akşam ışığında ve yağmurda ayrı ayrı konuşuldu.",
    role: "İşveren",
    context: "Villa",
    image: media(
      "villa-dusk",
      "Havuz kenarında, ahşap tavanlı beyaz bir villa.",
    ),
  },
  {
    id: "ornek-3",
    quote:
      "Ticari mekânda vitrin ile çalışma alanı birbirine karışmadı. Misafir bir ritim, ekip başka bir ritim buldu.",
    role: "İşveren",
    context: "Ticari mekân",
    image: media(
      "office",
      "Geniş pencereli, aydınlık bir çalışma mekânı.",
    ),
  },
  {
    id: "ornek-4",
    quote:
      "Eski taşı kapatmadılar. Avlu yine odaların ortak yeri oldu; yeni ek, geride durmayı bildi.",
    role: "İşveren",
    context: "Renovasyon",
    image: media(
      "courtyard",
      "Avluya açılan bir yaşam katı.",
    ),
  },
];

export const roles = [
  {
    title: "Tasarım yönetimi",
    text: "İşin çerçevesini, takvimini ve karar sırasını tutar. Çizim ile şantiye arasındaki dili sadeleştirir.",
  },
  {
    title: "Mimari proje",
    text: "Plan, kesit ve cephe kararlarını aynı ölçü disiplini içinde ilerletir.",
  },
  {
    title: "İç mimarlık",
    text: "Işık, malzeme, sabit mobilya ve gündelik kullanımı birlikte kurar.",
  },
  {
    title: "Uygulama koordinasyonu",
    text: "Numune, imalat ve teslim notlarını tek bir kayıtta toplar.",
  },
] as const;
