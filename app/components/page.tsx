import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = { title: "Overlay components" };

export default function ComponentsPage() {
  return (
    <div className="wrap" style={{ paddingBlock: 48 }}>
      <h1 style={{ fontSize: 26, fontWeight: "var(--fw-extra)", marginBottom: 6 }}>Overlay components</h1>
      <p className="muted" style={{ fontSize: 14, marginBottom: 24 }}>Toasts (transient) · notification panel · search overlay</p>
      <div className="overlay-stage">
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          <div className="toast">
            <div className="ic"><svg width="16" height="16" viewBox="0 0 24 24" style={{ stroke: "var(--green-600)", fill: "none", strokeWidth: 2 }}><path d="M5 12l5 5L20 6" /></svg></div>
            <div><div className="t">Booking confirmed</div><div className="s">GP visit today at 6:00 PM. Details on WhatsApp.</div></div>
          </div>
          <div className="toast">
            <div className="ic" style={{ background: "var(--surface-brand-soft)" }}><svg width="16" height="16" viewBox="0 0 24 24" style={{ stroke: "var(--orange-600)", fill: "none", strokeWidth: 2 }}><path d="M5 12h14M13 6l6 6-6 6" /></svg></div>
            <div><div className="t">Doctor is on the way</div><div className="s">Arriving in ~15 min. Tap to track.</div></div>
          </div>
        </div>

        <div className="npanel">
          <div className="hd"><span>Notifications</span><a href="#" style={{ fontSize: 12 }}>Mark all read</a></div>
          <div className="ni"><span className="d" /><div><b>Your doctor is on the way.</b> Track live status.<div style={{ fontSize: 11, color: "var(--gray-400)", marginTop: 3 }}>2 min ago</div></div></div>
          <div className="ni"><span className="d" /><div><b>Results ready.</b> Your blood panel is available.<div style={{ fontSize: 11, color: "var(--gray-400)", marginTop: 3 }}>1 h ago</div></div></div>
          <div className="ni read"><span className="d" /><div>Booking confirmed for today 6:00 PM.<div style={{ fontSize: 11, color: "var(--gray-400)", marginTop: 3 }}>3 h ago</div></div></div>
        </div>

        <div className="searchov">
          <div className="sb">
            <svg width="16" height="16" viewBox="0 0 24 24" style={{ stroke: "var(--gray-400)", fill: "none", strokeWidth: 2 }}><circle cx="11" cy="11" r="7" /><path d="M21 21l-4-4" /></svg>
            <input defaultValue="nurse" />
            <span className="chip" style={{ padding: "2px 8px", fontSize: 10 }}>esc</span>
          </div>
          <div className="sres">
            <div className="grp">Services</div>
            <Link href="/services/home-nursing">› <b>Home Nursing Services</b><span style={{ marginInlineStart: "auto" }} className="muted">from AED 90</span></Link>
            <Link href="/services/elderly-care">› <b>Elderly Care Nursing</b><span style={{ marginInlineStart: "auto" }} className="muted">from AED 85</span></Link>
            <div className="grp">Journal</div>
            <Link href="/journal/home-nurses-diabetes-hypertension">› Why home nurses matter for diabetes care</Link>
            <div className="grp">Quick actions</div>
            <Link href="/services/home-nursing">› Book a nurse now →</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
