import type { Metadata } from "next";
import Link from "next/link";
import { COMPANY } from "@/lib/data";

export const metadata: Metadata = { title: "Cancellation & refund" };

export default function CancellationPage() {
  return (
    <>
      <header className="pagehd wrap">
        <span className="crumb">Home / Legal / <b>Cancellation &amp; Refund</b></span>
        <h1>Clear, fair windows.</h1>
        <p>Shown again at checkout — no surprises.</p>
      </header>
      <div className="wrap" style={{ paddingBottom: 60 }}>
        <div className="kpi" style={{ marginTop: 20 }}>
          <div className="k">
            <span className="tag"><span className="dot" />Free</span>
            <div className="n" style={{ fontSize: 19, marginTop: 10 }}>2+ hours before</div>
            <div className="l">Full refund, no fee</div>
          </div>
          <div className="k">
            <span className="tag orange"><span className="dot" />Partial</span>
            <div className="n" style={{ fontSize: 19, marginTop: 10 }}>Under 2 hours</div>
            <div className="l">Call-out fee may apply</div>
          </div>
          <div className="k">
            <span className="tag dark"><span className="dot" />No refund</span>
            <div className="n" style={{ fontSize: 19, marginTop: 10 }}>Clinician arrived</div>
            <div className="l">Visit fee charged</div>
          </div>
        </div>
        <div className="panel" style={{ marginTop: 8 }}>
          <b style={{ color: "var(--text-strong)" }}>How to cancel</b>
          <p className="muted" style={{ fontSize: 14, margin: "8px 0 14px" }}>
            Reply to your confirmation on WhatsApp, or call us. Refunds: card 5–10 business days · Tabby per
            Tabby&rsquo;s schedule · packages refundable within 30 days minus used hours.
          </p>
          <details><summary>How long do refunds take?</summary><p>Card refunds 5–10 business days; Tabby per their schedule.</p></details>
          <details><summary>How are prepaid packages refunded?</summary><p>Unused hours refundable within 30 days of purchase, minus used hours at the single-visit rate.</p></details>
          <div style={{ marginTop: 16, display: "flex", gap: 10 }}>
            <a className="btn btn-primary" href={COMPANY.whatsapp} target="_blank" rel="noreferrer">Manage a booking</a>
            <Link className="btn btn-quiet" href="/help">Help centre</Link>
          </div>
        </div>
      </div>
    </>
  );
}
