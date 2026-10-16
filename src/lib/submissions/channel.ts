export const NETLIFY_FORM_NAME = "project-inquiry";
export const NETLIFY_FORM_PATH = "/netlify-forms.html";

export function usesNetlifyForms() {
  return (
    process.env.NEXT_PUBLIC_FORM_TARGET === "netlify" || process.env.NETLIFY === "true"
  );
}
