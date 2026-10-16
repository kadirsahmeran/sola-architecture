import { NETLIFY_FORM_NAME, NETLIFY_FORM_PATH } from "@/lib/submissions/channel";
import type { InquiryInput } from "@/lib/validations/inquiry";

export async function submitNetlifyForm(values: InquiryInput, file: File | null) {
  const fields: Record<string, string> = {
    "form-name": NETLIFY_FORM_NAME,
    name: values.name,
    email: values.email,
    phone: values.phone,
    projectType: values.projectType,
    location: values.location,
    budget: values.budget,
    message: values.message,
    kvkk: values.kvkk ? "true" : "false",
    company: values.company ?? "",
  };

  let response: Response;
  if (file) {
    const body = new FormData();
    for (const [key, value] of Object.entries(fields)) body.set(key, value);
    body.set("file", file);
    response = await fetch(NETLIFY_FORM_PATH, {
      method: "POST",
      body,
    });
  } else {
    response = await fetch(NETLIFY_FORM_PATH, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams(fields).toString(),
    });
  }

  return response.ok;
}
