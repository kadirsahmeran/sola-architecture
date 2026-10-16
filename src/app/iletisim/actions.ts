"use server";

import { headers } from "next/headers";
import { rateLimit } from "@/lib/security/rate-limit";
import { getSubmissionRepository } from "@/lib/submissions/repository";
import {
  fieldErrorsFromZod,
  inquirySchema,
  validateUpload,
} from "@/lib/validations/inquiry";

export type InquiryResult =
  | { ok: true; id: string }
  | { ok: false; message: string; fieldErrors?: Record<string, string> };

export async function submitInquiry(formData: FormData): Promise<InquiryResult> {
  const headerList = await headers();
  const ip = headerList.get("x-forwarded-for")?.split(",")[0]?.trim() || "local";

  if (!rateLimit(`inquiry:${ip}`)) {
    return {
      ok: false,
      message: "Çok fazla deneme yapıldı. Lütfen bir süre sonra yeniden deneyin.",
    };
  }

  const company = String(formData.get("company") ?? "");
  if (company.trim().length > 0) {
    return { ok: false, message: "Başvuru kabul edilmedi." };
  }

  const parsed = inquirySchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    phone: formData.get("phone"),
    projectType: formData.get("projectType"),
    location: formData.get("location"),
    budget: formData.get("budget"),
    message: formData.get("message"),
    kvkk: formData.get("kvkk") === "true",
    company: "",
  });

  if (!parsed.success) {
    return {
      ok: false,
      message: "Bazı alanlar düzeltilmeli.",
      fieldErrors: fieldErrorsFromZod(parsed.error),
    };
  }

  const uploaded = formData.get("file");
  const file = uploaded instanceof File && uploaded.size > 0 ? uploaded : null;
  const fileError = await validateUpload(file);
  if (fileError) {
    return { ok: false, message: fileError, fieldErrors: { file: fileError } };
  }

  const id = crypto.randomUUID();
  try {
    await getSubmissionRepository().save(
      {
        id,
        createdAt: new Date().toISOString(),
        name: parsed.data.name,
        email: parsed.data.email,
        phone: parsed.data.phone,
        projectType: parsed.data.projectType,
        location: parsed.data.location,
        budget: parsed.data.budget,
        message: parsed.data.message,
      },
      file
        ? { originalName: file.name, bytes: new Uint8Array(await file.arrayBuffer()) }
        : undefined,
    );
  } catch {
    return {
      ok: false,
      message:
        "Başvuru kaydedilemedi. Sunucu dosyaya yazamadı; gönderdiğiniz bilgiler saklanmadı.",
    };
  }

  return { ok: true, id };
}
