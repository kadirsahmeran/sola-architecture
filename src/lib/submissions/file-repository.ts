import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import type {
  InquiryAttachment,
  InquiryRecord,
  SubmissionRepository,
} from "@/lib/submissions/types";

const directory = path.join(process.cwd(), "data", "submissions");
const recordId = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

function safeFileName(name: string) {
  const cleaned = name.replace(/[^a-zA-Z0-9._-]/g, "_").replace(/_+/g, "_");
  return cleaned.slice(0, 80) || "ek";
}

function isInquiryRecord(value: unknown): value is InquiryRecord {
  if (!value || typeof value !== "object") return false;
  const record = value as Record<string, unknown>;
  return (
    typeof record.id === "string" &&
    typeof record.createdAt === "string" &&
    typeof record.name === "string" &&
    typeof record.email === "string" &&
    typeof record.phone === "string" &&
    typeof record.projectType === "string" &&
    typeof record.location === "string" &&
    typeof record.budget === "string" &&
    typeof record.message === "string" &&
    (record.fileName === undefined || typeof record.fileName === "string")
  );
}

export class FileSubmissionRepository implements SubmissionRepository {
  async save(record: InquiryRecord, attachment?: InquiryAttachment) {
    await mkdir(directory, { recursive: true });
    let fileName: string | undefined;

    if (attachment) {
      fileName = `${record.id}-${safeFileName(attachment.originalName)}`;
      await writeFile(path.join(directory, fileName), attachment.bytes);
    }

    const stored: InquiryRecord = { ...record, fileName };
    await writeFile(
      path.join(directory, `${record.id}.json`),
      JSON.stringify(stored, null, 2),
      "utf8",
    );
  }

  async find(id: string) {
    if (!recordId.test(id)) return null;
    try {
      const raw = await readFile(path.join(directory, `${id}.json`), "utf8");
      const parsed: unknown = JSON.parse(raw);
      if (!isInquiryRecord(parsed) || parsed.id !== id) return null;
      return parsed;
    } catch {
      return null;
    }
  }
}

export const fileSubmissionRepository = new FileSubmissionRepository();
