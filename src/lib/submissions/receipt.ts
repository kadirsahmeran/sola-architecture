const receiptKey = "sola-inquiry-receipt";

export type InquiryReceipt = {
  name: string;
  email: string;
  phone: string;
  projectType: string;
  location: string;
  budget: string;
  message: string;
  fileName: string;
  createdAt: string;
};

export function writeInquiryReceipt(receipt: InquiryReceipt) {
  try {
    sessionStorage.setItem(receiptKey, JSON.stringify(receipt));
  } catch {
    /* private mode may block storage */
  }
}

export function readInquiryReceipt(): InquiryReceipt | null {
  try {
    const raw = sessionStorage.getItem(receiptKey);
    if (!raw) return null;
    const parsed: unknown = JSON.parse(raw);
    if (!parsed || typeof parsed !== "object") return null;
    const value = parsed as Record<string, unknown>;
    if (typeof value.name !== "string" || typeof value.message !== "string") return null;
    return {
      name: value.name,
      email: typeof value.email === "string" ? value.email : "",
      phone: typeof value.phone === "string" ? value.phone : "",
      projectType: typeof value.projectType === "string" ? value.projectType : "",
      location: typeof value.location === "string" ? value.location : "",
      budget: typeof value.budget === "string" ? value.budget : "",
      message: value.message,
      fileName: typeof value.fileName === "string" ? value.fileName : "Eklenmedi",
      createdAt: typeof value.createdAt === "string" ? value.createdAt : "",
    };
  } catch {
    return null;
  }
}

export function clearInquiryReceipt() {
  try {
    sessionStorage.removeItem(receiptKey);
  } catch {
    /* ignore */
  }
}
