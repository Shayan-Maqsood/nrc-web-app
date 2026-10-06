export type SubmitFormData = Record<string, string | string[]>;

export interface FormResult {
  success: boolean;
  message: string;
}

const GOOGLE_SHEETS_EXEC_URL =
  "https://script.google.com/macros/s/AKfycbydKy98tTVPgOlew36ycpr5_XQM5UqwSXTVfr8bQQwxjLttEpdSk4XqRYt23diYDqT3Jg/exec";

const ENDPOINTS: Record<string, string | undefined> = {
  "join-executive": process.env.NEXT_PUBLIC_FORMSPREE_EXEC,
  "join-volunteer": process.env.NEXT_PUBLIC_FORMSPREE_VOLUNTEER,
  "event-registration": process.env.NEXT_PUBLIC_FORMSPREE_REGISTRATION,
};

export async function submitForm(
  formId: string,
  data: SubmitFormData
): Promise<FormResult> {

  // Executive form goes through server-side proxy (avoids CORS)
  if (formId === "join-executive") {
    try {
      const res = await fetch("/api/submit-exec", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (res.ok) return { success: true, message: "Application received." };
      return { success: false, message: "Submission failed. Please try again." };
    } catch {
      return { success: false, message: "Submission failed. Please try again." };
    }
  }

  // All other forms use Formspree
  const endpointId = ENDPOINTS[formId];
  if (!endpointId) {
    console.log("[DEV] Form submission (no endpoint configured):", formId, data);
    return { success: true, message: "Form submitted (dev mode)." };
  }

  try {
    const res = await fetch(`https://formspree.io/f/${endpointId}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...data, _form: formId }),
    });
    if (res.ok) return { success: true, message: "Received." };
    return { success: false, message: "Submission failed. Please try again." };
  } catch {
    return { success: false, message: "Network error. Check your connection." };
  }
}
