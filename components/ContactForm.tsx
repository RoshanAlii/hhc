"use client";

import { useState } from "react";
import { COMPANY } from "@/lib/data";

export default function ContactForm() {
  const [form, setForm] = useState({ name: "", mobile: "", service: "", message: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});

  function set(field: string, value: string) {
    setForm((state) => ({ ...state, [field]: value }));
  }

  function submit(event: React.FormEvent) {
    event.preventDefault();
    const nextErrors: Record<string, string> = {};
    if (!form.name.trim()) nextErrors.name = "Please enter your name.";
    if (!/^[+\d][\d\s-]{7,}$/.test(form.mobile.trim())) nextErrors.mobile = "Enter a valid mobile number.";
    if (!form.message.trim()) nextErrors.message = "Let us know how we can help.";
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length) return;

    const text = [
      "Hello HealthServe, I would like help arranging home care.",
      `Name: ${form.name.trim()}`,
      `Mobile: ${form.mobile.trim()}`,
      form.service ? `Service: ${form.service}` : "",
      `Message: ${form.message.trim()}`,
    ].filter(Boolean).join("\n");
    window.open(`${COMPANY.whatsapp}?text=${encodeURIComponent(text)}`, "_blank", "noopener,noreferrer");
  }

  return (
    <form className="panel concierge-form" onSubmit={submit} noValidate>
      <div className="lbl">Speak to the care team</div>
      <p className="form-intro">Complete the details below, then review and send them directly to HealthServe in WhatsApp.</p>
      <div className={`field${errors.name ? " invalid" : ""}`}>
        <label htmlFor="contact-name">Name</label>
        <input id="contact-name" value={form.name} onChange={(event) => set("name", event.target.value)} autoComplete="name" aria-describedby={errors.name ? "contact-name-error" : undefined} />
        {errors.name && <span className="err" id="contact-name-error" role="alert">{errors.name}</span>}
      </div>
      <div className={`field${errors.mobile ? " invalid" : ""}`}>
        <label htmlFor="contact-mobile">Mobile</label>
        <input id="contact-mobile" value={form.mobile} onChange={(event) => set("mobile", event.target.value)} placeholder="+971" inputMode="tel" autoComplete="tel" aria-describedby={errors.mobile ? "contact-mobile-error" : undefined} />
        {errors.mobile && <span className="err" id="contact-mobile-error" role="alert">{errors.mobile}</span>}
      </div>
      <div className="field">
        <label htmlFor="contact-service">Service needed</label>
        <select id="contact-service" value={form.service} onChange={(event) => set("service", event.target.value)}>
          <option value="">Not sure yet</option>
          <option>Doctor visit</option><option>Home nursing</option><option>Physiotherapy</option>
          <option>Lab tests</option><option>Elderly care</option><option>Mother, newborn & child care</option>
          <option>Wellness / IV</option><option>Other</option>
        </select>
      </div>
      <div className={`field${errors.message ? " invalid" : ""}`}>
        <label htmlFor="contact-message">How can we help?</label>
        <textarea id="contact-message" rows={4} value={form.message} onChange={(event) => set("message", event.target.value)} placeholder="Briefly describe the care you are looking for" aria-describedby={errors.message ? "contact-message-error" : undefined} />
        {errors.message && <span className="err" id="contact-message-error" role="alert">{errors.message}</span>}
      </div>
      <button className="btn btn-primary btn-full" type="submit">Review in WhatsApp</button>
      <p className="form-privacy">Nothing is submitted on this website. WhatsApp opens with a draft that you choose whether to send.</p>
    </form>
  );
}
