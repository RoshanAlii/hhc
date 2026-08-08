"use client";

import { useState } from "react";

export default function ApplyForm({ role }: { role: string }) {
  const [form, setForm] = useState({ name: "", email: "", mobile: "", cover: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [sent, setSent] = useState(false);

  function set(f: string, v: string) {
    setForm((s) => ({ ...s, [f]: v }));
  }

  function submit(e: React.FormEvent) {
    e.preventDefault();
    const err: Record<string, string> = {};
    if (!form.name.trim()) err.name = "Please enter your name.";
    if (!/^\S+@\S+\.\S+$/.test(form.email.trim())) err.email = "Enter a valid email.";
    if (!/^[+\d][\d\s]{7,}$/.test(form.mobile.trim())) err.mobile = "Enter a valid mobile number.";
    setErrors(err);
    if (Object.keys(err).length === 0) setSent(true);
  }

  if (sent) {
    return (
      <div className="panel">
        <div className="notice">
          <svg width="18" height="18" viewBox="0 0 24 24" style={{ stroke: "var(--green-600)", fill: "none", strokeWidth: 2 }}><path d="M5 12l5 5L20 6" /></svg>
          Application received for {role}.
        </div>
        <p className="muted" style={{ fontSize: 15, marginTop: 12 }}>
          Thanks, {form.name.split(" ")[0]}. Our HR team reviews every application and will be in touch if there&rsquo;s a fit.
        </p>
      </div>
    );
  }

  return (
    <form className="panel" onSubmit={submit} noValidate>
      <div className="lbl">Apply for this role</div>
      <div className={`field${errors.name ? " invalid" : ""}`}>
        <label>Full name</label>
        <input value={form.name} onChange={(e) => set("name", e.target.value)} />
        {errors.name && <span className="err">{errors.name}</span>}
      </div>
      <div className={`field${errors.email ? " invalid" : ""}`}>
        <label>Email</label>
        <input value={form.email} onChange={(e) => set("email", e.target.value)} placeholder="you@example.com" />
        {errors.email && <span className="err">{errors.email}</span>}
      </div>
      <div className={`field${errors.mobile ? " invalid" : ""}`}>
        <label>Mobile</label>
        <input value={form.mobile} onChange={(e) => set("mobile", e.target.value)} placeholder="+971" />
        {errors.mobile && <span className="err">{errors.mobile}</span>}
      </div>
      <div className="field">
        <label>CV (PDF)</label>
        <input type="file" accept=".pdf,.doc,.docx" />
      </div>
      <div className="field">
        <label>Cover note (optional)</label>
        <textarea rows={4} value={form.cover} onChange={(e) => set("cover", e.target.value)} placeholder="Tell us why you'd be a great fit" />
      </div>
      <button className="btn btn-primary btn-full" type="submit">Submit application</button>
    </form>
  );
}
