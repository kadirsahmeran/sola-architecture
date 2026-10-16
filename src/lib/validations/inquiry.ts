import { z } from "zod";

export const projectTypeOptions = [
  "Konut",
  "Villa",
  "İç mekân",
  "Ticari mekân",
  "Renovasyon",
  "Henüz net değil",
] as const;

export const budgetOptions = [
  "Henüz belirlenmedi",
  "2–5 milyon TL",
  "5–10 milyon TL",
  "10–20 milyon TL",
  "20 milyon TL üzeri",
] as const;

const phoneMessage = "Geçerli bir telefon numarası girin. Örnek: 0532 000 00 00";

export function isTurkishPhone(value: string) {
  const digits = value.replace(/\D/g, "");
  if (digits.length === 12 && digits.startsWith("90")) {
    return /^90[1-9]\d{9}$/.test(digits);
  }
  if (digits.length === 11 && digits.startsWith("0")) {
    return /^0[1-9]\d{9}$/.test(digits);
  }
  if (digits.length === 10) {
    return /^[1-9]\d{9}$/.test(digits);
  }
  return false;
}

export const inquirySchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Ad soyad en az 2 karakter olmalıdır.")
    .max(80, "Ad soyad en fazla 80 karakter olabilir.")
    .regex(/^[\p{L}\s'.-]+$/u, "Ad soyad yalnızca harf içermelidir."),
  email: z
    .string()
    .trim()
    .min(1, "E-posta adresinizi yazın.")
    .email("Geçerli bir e-posta adresi girin.")
    .max(120, "E-posta adresi çok uzun."),
  phone: z
    .string()
    .trim()
    .min(1, "Telefon numaranızı yazın.")
    .refine(isTurkishPhone, phoneMessage),
  projectType: z.enum(projectTypeOptions, { error: "Proje türünü seçin." }),
  location: z
    .string()
    .trim()
    .min(2, "Proje konumunu yazın.")
    .max(120, "Konum en fazla 120 karakter olabilir."),
  budget: z.enum(budgetOptions, { error: "Yaklaşık bütçeyi seçin." }),
  message: z
    .string()
    .trim()
    .min(20, "Proje açıklaması en az 20 karakter olmalıdır.")
    .max(2000, "Proje açıklaması en fazla 2000 karakter olabilir."),
  kvkk: z.literal(true, {
    error: "KVKK metnini onaylamanız gerekir.",
  }),
  company: z.string().max(0, "Başvuru kabul edilmedi.").optional(),
});

export type InquiryInput = z.infer<typeof inquirySchema>;

export const MAX_UPLOAD_BYTES = 8 * 1024 * 1024;

const allowedTypes = new Set([
  "application/pdf",
  "image/jpeg",
  "image/png",
  "image/webp",
]);

const extensionByType: Record<string, string[]> = {
  "application/pdf": ["pdf"],
  "image/jpeg": ["jpg", "jpeg"],
  "image/png": ["png"],
  "image/webp": ["webp"],
};

function startsWith(bytes: Uint8Array, signature: number[]) {
  return signature.every((value, index) => bytes[index] === value);
}

function matchesSignature(type: string, bytes: Uint8Array) {
  if (type === "application/pdf") return startsWith(bytes, [0x25, 0x50, 0x44, 0x46]);
  if (type === "image/jpeg") return startsWith(bytes, [0xff, 0xd8, 0xff]);
  if (type === "image/png") return startsWith(bytes, [0x89, 0x50, 0x4e, 0x47]);
  if (type === "image/webp") {
    const riff = startsWith(bytes, [0x52, 0x49, 0x46, 0x46]);
    const webp =
      bytes[8] === 0x57 && bytes[9] === 0x45 && bytes[10] === 0x42 && bytes[11] === 0x50;
    return riff && webp;
  }
  return false;
}

export async function validateUpload(file: File | null) {
  if (!file || file.size === 0) return null;
  if (file.size > MAX_UPLOAD_BYTES) return "Dosya 8 MB sınırını aşıyor.";
  if (!allowedTypes.has(file.type)) {
    return "Yalnızca PDF, JPG, PNG veya WEBP yükleyebilirsiniz.";
  }
  const extension = file.name.split(".").pop()?.toLowerCase() ?? "";
  if (!extensionByType[file.type]?.includes(extension)) {
    return "Dosya uzantısı, dosya türüyle eşleşmiyor.";
  }
  const bytes = new Uint8Array(await file.slice(0, 16).arrayBuffer());
  if (!matchesSignature(file.type, bytes)) {
    return "Dosya içeriği, belirtilen türle eşleşmiyor.";
  }
  return null;
}

export function fieldErrorsFromZod(error: z.ZodError) {
  const fields: Record<string, string> = {};
  for (const issue of error.issues) {
    const key = issue.path[0];
    if (typeof key === "string" && !fields[key]) fields[key] = issue.message;
  }
  return fields;
}
