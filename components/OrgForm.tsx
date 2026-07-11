"use client";

import { useState } from "react";

export default function OrgForm() {
  const [form, setForm] = useState({ company: "", contact: "", mobile: "", need: "Corporate wellness" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [sent, setSent] = useState(false);

  function set(f: string, v: string) {
    setForm((s) => ({ ...s, [f]: v }));
  }

  function submit(e: React.FormEvent) {
    e.preventDefault();
    const err: Record<string, string> = {};
    if (!form.company.trim()) err.company = "Please enter your company.";
    if (!form.contact.trim()) err.contact = "Please enter a contact name.";
    if (!/^[+\d][\d\s]{7,}$/.test(form.mobile.trim())) err.mobile = "Enter a valid mobile number.";
    setErrors(err);
    if (Object.keys(err).length === 0) setSent(true);
  }

  if (sent) {
    return (
      <main className="panel">
        <div className="notice">
          <svg width="18" height="18" viewBox="0 0 24 24" style={{ stroke: "var(--green-600)", fill: "none", strokeWidth: 2 }}><path d="M5 12l5 5L20 6" /></svg>
          Request received — thank you.
        </div>
        <p className="muted" style={{ fontSize: 15, marginTop: 12 }}>
          Our business team will reply within one working day with a tailored proposal for {form.company}.
        </p>
      </main>
    );
  }

  return (
    <form className="panel" onSubmit={submit} noValidate>
      <div className="lbl">Request a proposal</div>
      <div className={`field${errors.company ? " invalid" : ""}`}>
        <label>Company</label>
        <input value={form.company} onChange={(e) => set("company", e.target.value)} />
        {errors.company && <span className="err">{errors.company}</span>}
      </div>
      <div className={`field${errors.contact ? " invalid" : ""}`}>
        <label>Contact name</label>
        <input value={form.contact} onChange={(e) => set("contact", e.target.value)} />
        {errors.contact && <span className="err">{errors.contact}</span>}
      </div>
      <div className={`field${errors.mobile ? " invalid" : ""}`}>
        <label>Mobile</label>
        <input value={form.mobile} onChange={(e) => set("mobile", e.target.value)} placeholder="+971" />
        {errors.mobile && <span className="err">{errors.mobile}</span>}
      </div>
      <div className="field">
        <label>What do you need?</label>
        <select value={form.need} onChange={(e) => set("need", e.target.value)}>
          <option>Corporate wellness</option>
          <option>On-site nurse</option>
          <option>Group vaccination</option>
          <option>Travel medical</option>
        </select>
      </div>
      <button className="btn btn-primary btn-full" type="submit">Send request</button>
    </form>
  );
}
