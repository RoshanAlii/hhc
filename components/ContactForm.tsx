"use client";

import { useState } from "react";

export default function ContactForm() {
  const [form, setForm] = useState({ name: "", mobile: "", service: "", message: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [sent, setSent] = useState(false);

  function set(f: string, v: string) {
    setForm((s) => ({ ...s, [f]: v }));
  }

  function submit(e: React.FormEvent) {
    e.preventDefault();
    const err: Record<string, string> = {};
    if (!form.name.trim()) err.name = "Please enter your name.";
    if (!/^[+\d][\d\s]{7,}$/.test(form.mobile.trim())) err.mobile = "Enter a valid mobile number.";
    if (!form.message.trim()) err.message = "Let us know how we can help.";
    setErrors(err);
    if (Object.keys(err).length === 0) setSent(true);
  }

  if (sent) {
    return (
      <main className="panel">
        <div className="notice" style={{ marginBottom: 12 }}>
          <svg width="18" height="18" viewBox="0 0 24 24" style={{ stroke: "var(--green-600)", fill: "none", strokeWidth: 2 }}><path d="M5 12l5 5L20 6" /></svg>
          Thanks, {form.name.split(" ")[0]} — your message is in.
        </div>
        <p className="muted" style={{ fontSize: 15 }}>
          Our team will reply within 30 minutes during clinic hours. For anything urgent, message us on WhatsApp.
        </p>
      </main>
    );
  }

  return (
    <form className="panel" onSubmit={submit} noValidate>
      <div className="lbl">Send us a message</div>
      <div className={`field${errors.name ? " invalid" : ""}`}>
        <label>Name</label>
        <input value={form.name} onChange={(e) => set("name", e.target.value)} placeholder="Your name" />
        {errors.name && <span className="err">{errors.name}</span>}
      </div>
      <div className={`field${errors.mobile ? " invalid" : ""}`}>
        <label>Mobile</label>
        <input value={form.mobile} onChange={(e) => set("mobile", e.target.value)} placeholder="+971" />
        {errors.mobile && <span className="err">{errors.mobile}</span>}
      </div>
      <div className="field">
        <label>Service needed</label>
        <select value={form.service} onChange={(e) => set("service", e.target.value)}>
          <option value="">Choose service</option>
          <option>Doctor visit</option>
          <option>Home nursing</option>
          <option>Physiotherapy</option>
          <option>Wellness / IV</option>
          <option>Other</option>
        </select>
      </div>
      <div className={`field${errors.message ? " invalid" : ""}`}>
        <label>Message</label>
        <textarea rows={4} value={form.message} onChange={(e) => set("message", e.target.value)} placeholder="How can we help?" />
        {errors.message && <span className="err">{errors.message}</span>}
      </div>
      <button className="btn btn-primary btn-full" type="submit">Send</button>
      <p className="muted" style={{ fontSize: 12, marginTop: 10 }}>We reply within 30 minutes during clinic hours.</p>
    </form>
  );
}
