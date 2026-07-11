"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { COMPANY } from "@/lib/data";

const CATEGORIES = [
  { t: "Bookings & scheduling", d: "Change, reschedule, coverage areas.", href: "/cancellation" },
  { t: "Payments & invoices", d: "Methods, timing, company invoices.", href: "/cart" },
  { t: "Cancellation & refunds", d: "Windows, package refunds.", href: "/cancellation" },
  { t: "Results & reports", d: "Lab results, visit summaries.", href: "/account" },
  { t: "Privacy & data", d: "Your information, consent.", href: "/privacy" },
  { t: "Contact a human", d: "We reply on WhatsApp in minutes.", href: "/contact" },
];

export default function HelpSearch() {
  const [q, setQ] = useState("");

  const results = useMemo(() => {
    const term = q.trim().toLowerCase();
    if (!term) return CATEGORIES;
    return CATEGORIES.filter((c) => (c.t + " " + c.d).toLowerCase().includes(term));
  }, [q]);

  return (
    <>
      <div className="field" style={{ maxWidth: 440, marginTop: 14 }}>
        <input placeholder="Search help articles…" value={q} onChange={(e) => setQ(e.target.value)} aria-label="Search help" />
      </div>
      <div className="wrap" style={{ paddingBottom: 60, paddingInline: 0 }}>
        {results.length === 0 ? (
          <div className="empty">
            <p style={{ marginBottom: 16 }}>No articles match &ldquo;{q}&rdquo;. Try a different term, or message us.</p>
            <a className="btn btn-primary" href={COMPANY.whatsapp} target="_blank" rel="noreferrer">WhatsApp us</a>
          </div>
        ) : (
          <div className="grid3" style={{ marginTop: 12 }}>
            {results.map((c) => (
              <Link className="svc" style={{ minHeight: 140 }} href={c.href} key={c.t}>
                <h3 style={{ fontSize: 16 }}>{c.t}</h3>
                <p>{c.d}</p>
              </Link>
            ))}
          </div>
        )}
        <div className="band" style={{ marginTop: 24 }}>
          <div>
            <b style={{ color: "var(--text-strong)" }}>Still need help?</b>
            <p className="muted" style={{ fontSize: 13 }}>Our team replies on WhatsApp within minutes.</p>
          </div>
          <div style={{ display: "flex", gap: 10 }}>
            <a className="btn btn-primary" href={COMPANY.whatsapp} target="_blank" rel="noreferrer">WhatsApp us</a>
            <a className="btn btn-outline" href={COMPANY.phoneHref}>Request callback</a>
          </div>
        </div>
      </div>
    </>
  );
}
