export type InquiryRecord = {
  id: string;
  createdAt: string;
  name: string;
  email: string;
  phone: string;
  projectType: string;
  location: string;
  budget: string;
  message: string;
  fileName?: string;
};

export type InquiryAttachment = {
  originalName: string;
  bytes: Uint8Array;
};

/**
 * Persistence boundary for project inquiries.
 * A future Supabase (or other) adapter can implement this interface
 * without changing the form or the server action.
 */
export interface SubmissionRepository {
  save(record: InquiryRecord, attachment?: InquiryAttachment): Promise<void>;
  find(id: string): Promise<InquiryRecord | null>;
}
