import { fileSubmissionRepository } from "@/lib/submissions/file-repository";
import type { SubmissionRepository } from "@/lib/submissions/types";

export function getSubmissionRepository(): SubmissionRepository {
  return fileSubmissionRepository;
}
