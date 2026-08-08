import type { Metadata } from "next";
import { COMPANY } from "@/lib/data";

export const metadata: Metadata = { title: "Privacy policy" };

const sections = [
  { id: "collect", title: "Information you choose to share", body: "The website lets you prepare a care request. Contact forms open a draft in WhatsApp; nothing is sent until you choose to send it. Selected services may remain in your browser so you can review the request." },
  { id: "use", title: "How HealthServe uses information", body: "Information you send directly to HealthServe may be used to respond, assess the requested service, coordinate care, prepare documentation and meet applicable clinical or legal duties." },
  { id: "health", title: "Health information", body: "Only share information needed for the care request. Clinical records and medical documents should be handled through the channel the HealthServe team confirms is appropriate for your care." },
  { id: "sharing", title: "Service providers and insurers", body: "Information may be shared where needed to arrange care, meet a legal duty or support an insurance process you request. Ask the care team if you need details for a specific request." },
  { id: "rights", title: "Questions and requests", body: "You can contact HealthServe to ask about access, correction or other requests relating to information held about you, subject to applicable record-keeping duties." },
  { id: "retention", title: "Retention", body: "Information is kept for the period required for care, administration and applicable record-keeping obligations." },
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
