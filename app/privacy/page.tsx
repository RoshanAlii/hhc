import type { Metadata } from "next";
import { COMPANY } from "@/lib/data";

export const metadata: Metadata = { title: "Privacy policy" };

const sections = [
  { id: "collect", title: "Information we collect", body: "Contact details, address and booking information you provide; health information you volunteer so we can plan your care safely." },
  { id: "use", title: "How we use it", body: "To deliver care, schedule visits, process payment and meet legal duties. Never sold. No advertising profiles." },
  { id: "health", title: "Health data & consent", body: "Health information is collected with your explicit consent and accessed only by your treating team, in line with UAE health-data law. Clinical records are held in clinical systems — this website stores booking data only." },
  { id: "sharing", title: "Sharing & insurers", body: "Shared with insurers only for direct billing you request." },
  { id: "rights", title: "Your rights", body: "You may request access to, correction of, or deletion of your booking data at any time by contacting us." },
  { id: "retention", title: "Retention", body: "Booking data is retained only as long as needed for care, billing and legal obligations, then securely deleted." },
  { id: "contact", title: "Contact", body: `Questions about your data? Email ${COMPANY.email} or call ${COMPANY.phoneLabel}.` },
];

export default function PrivacyPage() {
  return (
    <div className="wrap polgrid">
      <nav className="toc" aria-label="On this page">
        <div className="lbl">On this page</div>
        {sections.map((s, i) => (
          <a key={s.id} className={i === 0 ? "on" : undefined} href={`#${s.id}`}>{s.title}</a>
        ))}
      </nav>
      <div className="polbody">
        <span className="crumb">Home / Legal / <b>Privacy Policy</b></span>
        <h1 style={{ fontSize: 32, fontWeight: "var(--fw-extra)", margin: "10px 0 4px" }}>Privacy Policy</h1>
        <p style={{ fontSize: 13, marginBottom: 20 }}>{COMPANY.name} · {COMPANY.dha}</p>
        {sections.map((s) => (
          <section key={s.id} id={s.id}>
            <h2>{s.title}</h2>
            <p>{s.body}</p>
          </section>
        ))}
      </div>
    </div>
  );
}
