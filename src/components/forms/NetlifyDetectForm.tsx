import { NETLIFY_FORM_NAME } from "@/lib/submissions/channel";

export function NetlifyDetectForm() {
  return (
    <form
      name={NETLIFY_FORM_NAME}
      method="POST"
      action="/netlify-forms.html"
      data-netlify="true"
      data-netlify-honeypot="company"
      encType="multipart/form-data"
      hidden
      aria-hidden="true"
      tabIndex={-1}
    >
      <input type="hidden" name="form-name" value={NETLIFY_FORM_NAME} />
      <input name="company" />
      <input name="name" />
      <input name="email" type="email" />
      <input name="phone" />
      <input name="projectType" />
      <input name="location" />
      <input name="budget" />
      <textarea name="message" />
      <input name="kvkk" />
      <input name="file" type="file" />
    </form>
  );
}
