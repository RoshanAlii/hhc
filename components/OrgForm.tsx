"use client";

import { useState } from "react";
import { COMPANY } from "@/lib/data";

export default function OrgForm() {
  const [form, setForm] = useState({ company: "", contact: "", mobile: "", need: "Corporate wellness" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const set = (field: string, value: string) => setForm((state) => ({ ...state, [field]: value }));

  function submit(event: React.FormEvent) {
    event.preventDefault();
    const next: Record<string, string> = {};
    if (!form.company.trim()) next.company = "Please enter your company.";
    if (!form.contact.trim()) next.contact = "Please enter a contact name.";
    if (!/^[+\d][\d\s-]{7,}$/.test(form.mobile.trim())) next.mobile = "Enter a valid mobile number.";
    setErrors(next);
    if (Object.keys(next).length) return;
    const text = `Hello HealthServe, I would like a corporate care proposal.\nCompany: ${form.company}\nContact: ${form.contact}\nMobile: ${form.mobile}\nNeed: ${form.need}`;
    window.open(`${COMPANY.whatsapp}?text=${encodeURIComponent(text)}`, "_blank", "noopener,noreferrer");
  }

  return (
    <form className="panel concierge-form" onSubmit={submit} noValidate>
      <div className="lbl">Request a proposal</div>
      <p className="form-intro">Review and send your request directly to our business-care team in WhatsApp.</p>
      <div className={`field${errors.company ? " invalid" : ""}`}><label htmlFor="org-company">Company</label><input id="org-company" value={form.company} onChange={(e) => set("company", e.target.value)} />{errors.company && <span className="err" role="alert">{errors.company}</span>}</div>
      <div className={`field${errors.contact ? " invalid" : ""}`}><label htmlFor="org-contact">Contact name</label><input id="org-contact" value={form.contact} onChange={(e) => set("contact", e.target.value)} autoComplete="name" />{errors.contact && <span className="err" role="alert">{errors.contact}</span>}</div>
      <div className={`field${errors.mobile ? " invalid" : ""}`}><label htmlFor="org-mobile">Mobile</label><input id="org-mobile" value={form.mobile} onChange={(e) => set("mobile", e.target.value)} placeholder="+971" inputMode="tel" autoComplete="tel" />{errors.mobile && <span className="err" role="alert">{errors.mobile}</span>}</div>
      <div className="field"><label htmlFor="org-need">What do you need?</label><select id="org-need" value={form.need} onChange={(e) => set("need", e.target.value)}><option>Corporate wellness</option><option>On-site nurse</option><option>Group vaccination</option><option>Travel medical</option></select></div>
      <button className="btn btn-primary btn-full" type="submit">Review in WhatsApp</button>
      <p className="form-privacy">Nothing is submitted until you choose to send the WhatsApp message.</p>
    </form>
  );
}
