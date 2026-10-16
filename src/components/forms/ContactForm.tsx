"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { CircleAlert } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState, type ReactNode } from "react";
import { useForm, type Resolver } from "react-hook-form";
import { submitInquiry } from "@/app/iletisim/actions";
import {
  budgetOptions,
  inquirySchema,
  projectTypeOptions,
  validateUpload,
  type InquiryInput,
} from "@/lib/validations/inquiry";
import { cn } from "@/lib/utils";

const sentFlag = "sola-inquiry-sent";

const defaults: InquiryInput = {
  name: "",
  email: "",
  phone: "",
  projectType: "" as InquiryInput["projectType"],
  location: "",
  budget: "" as InquiryInput["budget"],
  message: "",
  kvkk: false as unknown as true,
  company: "",
};

function FieldError({ id, message }: { id: string; message?: string }) {
  if (!message) return null;
  return (
    <p
      id={id}
      role="alert"
      className="mt-2 bg-[#8c3d32]/8 px-3 py-2 text-sm font-medium leading-5 text-[#8c3d32]"
    >
      {message}
    </p>
  );
}

function InvalidMark({ place }: { place: "middle" | "start" | "select" }) {
  return (
    <CircleAlert
      aria-hidden
      className={cn(
        "pointer-events-none absolute h-4 w-4 text-[#8c3d32]",
        place === "middle" && "top-1/2 right-0 -translate-y-1/2",
        place === "start" && "top-3.5 right-0",
        place === "select" && "top-1/2 right-7 -translate-y-1/2",
      )}
    />
  );
}

function Field({
  id,
  label,
  error,
  mark = "middle",
  children,
}: {
  id: string;
  label: string;
  error?: string;
  mark?: "middle" | "start" | "select";
  children: ReactNode;
}) {
  return (
    <div>
      <label htmlFor={id} className={cn("label", error && "text-[#8c3d32]")}>
        {label}
      </label>
      <div className="relative">
        {children}
        {error ? <InvalidMark place={mark} /> : null}
      </div>
      <FieldError id={`${id}-error`} message={error} />
    </div>
  );
}

function clearFormDom() {
  const form = document.getElementById("basvuru-formu");
  if (form instanceof HTMLFormElement) form.reset();
  const file = document.getElementById("file");
  if (file instanceof HTMLInputElement) file.value = "";
}

function readSentFlag() {
  try {
    return sessionStorage.getItem(sentFlag) === "1";
  } catch {
    return false;
  }
}

function writeSentFlag() {
  try {
    sessionStorage.setItem(sentFlag, "1");
  } catch {
    /* private mode may block storage */
  }
}

function clearSentFlag() {
  try {
    sessionStorage.removeItem(sentFlag);
  } catch {
    /* ignore */
  }
}

export function ContactForm() {
  const router = useRouter();
  const [fileError, setFileError] = useState<string | null>(null);
  const [serverMessage, setServerMessage] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<InquiryInput>({
    resolver: zodResolver(inquirySchema) as Resolver<InquiryInput>,
    defaultValues: defaults,
    mode: "onBlur",
  });

  useEffect(() => {
    function wipeSavedDraft() {
      if (!readSentFlag()) return;
      clearFormDom();
      reset(defaults);
      setFileError(null);
      setServerMessage(null);
      clearSentFlag();
    }

    wipeSavedDraft();
    window.addEventListener("pageshow", wipeSavedDraft);
    return () => window.removeEventListener("pageshow", wipeSavedDraft);
  }, [reset]);

  async function onSubmit(values: InquiryInput) {
    setServerMessage(null);
    setFileError(null);

    const input = document.getElementById("file");
    const file = input instanceof HTMLInputElement ? (input.files?.[0] ?? null) : null;
    const uploadError = await validateUpload(file);
    if (uploadError) {
      setFileError(uploadError);
      return;
    }

    const formData = new FormData();
    formData.set("name", values.name);
    formData.set("email", values.email);
    formData.set("phone", values.phone);
    formData.set("projectType", values.projectType);
    formData.set("location", values.location);
    formData.set("budget", values.budget);
    formData.set("message", values.message);
    formData.set("kvkk", values.kvkk ? "true" : "false");
    formData.set("company", values.company ?? "");
    if (file) formData.set("file", file);

    try {
      const result = await submitInquiry(formData);
      if (!result.ok) {
        if (result.fieldErrors) {
          for (const [key, message] of Object.entries(result.fieldErrors)) {
            if (key === "file") setFileError(message);
            else setError(key as keyof InquiryInput, { message });
          }
        }
        setServerMessage(result.message);
        return;
      }
      writeSentFlag();
      clearFormDom();
      reset(defaults);
      router.push(`/iletisim/sonuc/${result.id}`);
    } catch {
      setServerMessage(
        "Ağ bağlantısı kurulamadı. Yazdıklarınız formda duruyor; bağlantı geldikten sonra yeniden gönderebilirsiniz.",
      );
    }
  }

  return (
    <form id="basvuru-formu" onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-7">
      <div className="absolute -left-[9999px] h-0 w-0 overflow-hidden" aria-hidden="true">
        <label htmlFor="company">Şirket</label>
        <input id="company" tabIndex={-1} autoComplete="off" {...register("company")} />
      </div>

      <Field id="name" label="Ad soyad" error={errors.name?.message}>
        <input
          id="name"
          className="field"
          autoComplete="name"
          aria-invalid={Boolean(errors.name)}
          aria-describedby={errors.name ? "name-error" : undefined}
          {...register("name")}
        />
      </Field>

      <div className="grid gap-7 md:grid-cols-2">
        <Field id="email" label="E-posta" error={errors.email?.message}>
          <input
            id="email"
            type="email"
            className="field"
            autoComplete="email"
            aria-invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? "email-error" : undefined}
            {...register("email")}
          />
        </Field>
        <Field id="phone" label="Telefon" error={errors.phone?.message}>
          <input
            id="phone"
            type="tel"
            className="field"
            autoComplete="tel"
            aria-invalid={Boolean(errors.phone)}
            aria-describedby={errors.phone ? "phone-error" : undefined}
            {...register("phone")}
          />
        </Field>
      </div>

      <div className="grid gap-7 md:grid-cols-2">
        <Field id="projectType" label="Proje türü" error={errors.projectType?.message} mark="select">
          <select
            id="projectType"
            className="field"
            aria-invalid={Boolean(errors.projectType)}
            aria-describedby={errors.projectType ? "projectType-error" : undefined}
            {...register("projectType")}
          >
            <option value="">Seçin</option>
            {projectTypeOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </Field>
        <Field id="budget" label="Yaklaşık bütçe" error={errors.budget?.message} mark="select">
          <select
            id="budget"
            className="field"
            aria-invalid={Boolean(errors.budget)}
            aria-describedby={errors.budget ? "budget-error" : undefined}
            {...register("budget")}
          >
            <option value="">Seçin</option>
            {budgetOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </Field>
      </div>

      <Field id="location" label="Proje konumu" error={errors.location?.message}>
        <input
          id="location"
          className="field"
          aria-invalid={Boolean(errors.location)}
          aria-describedby={errors.location ? "location-error" : undefined}
          {...register("location")}
        />
      </Field>

      <Field id="message" label="Proje açıklaması" error={errors.message?.message} mark="start">
        <textarea
          id="message"
          rows={6}
          className="field resize-y"
          aria-invalid={Boolean(errors.message)}
          aria-describedby={errors.message ? "message-error" : undefined}
          {...register("message")}
        />
      </Field>

      <div>
        <label htmlFor="file" className={cn("label", fileError && "text-[#8c3d32]")}>
          Dosya (isteğe bağlı)
        </label>
        <div
          className={cn(
            "relative border-b",
            fileError ? "border-b-2 border-[#8c3d32]" : "border-ink/20",
          )}
        >
          <input
            id="file"
            name="file"
            type="file"
            accept=".pdf,.jpg,.jpeg,.png,.webp,application/pdf,image/jpeg,image/png,image/webp"
            className="block w-full py-3 pr-8 text-sm"
            aria-invalid={Boolean(fileError)}
            aria-describedby={fileError ? "file-error" : "file-help"}
          />
          {fileError ? <InvalidMark place="middle" /> : null}
        </div>
        <p id="file-help" className="mt-2 text-sm text-muted">
          PDF, JPG, PNG veya WEBP. En fazla 8 MB.
        </p>
        <FieldError id="file-error" message={fileError ?? undefined} />
      </div>

      <div>
        <div className="flex items-start gap-3">
          <label className={cn("flex flex-1 items-start gap-3 text-sm leading-6", errors.kvkk && "text-[#8c3d32]")}>
            <input
              type="checkbox"
              aria-invalid={Boolean(errors.kvkk)}
              aria-describedby={errors.kvkk ? "kvkk-error" : undefined}
              className={cn(
                "mt-1 size-4 shrink-0",
                errors.kvkk && "outline outline-2 outline-offset-2 outline-[#8c3d32]",
              )}
              {...register("kvkk")}
            />
            <span>
              Kişisel verilerimin proje talebini değerlendirmek için işlenmesini kabul ediyorum.
            </span>
          </label>
          {errors.kvkk ? <CircleAlert aria-hidden className="mt-1 h-4 w-4 shrink-0 text-[#8c3d32]" /> : null}
        </div>
        <FieldError id="kvkk-error" message={errors.kvkk?.message} />
      </div>

      {serverMessage ? (
        <p role="alert" className="bg-[#8c3d32]/8 px-3 py-2 text-sm font-medium text-[#8c3d32]">
          {serverMessage}
        </p>
      ) : null}

      <button
        type="submit"
        disabled={isSubmitting}
        className="btn-sweep w-full border border-ink bg-ink text-paper [--sweep:#F5F3EF] hover:border-paper hover:text-ink sm:w-auto"
      >
        {isSubmitting ? "Gönderiliyor" : "Gönder"}
      </button>
    </form>
  );
}
