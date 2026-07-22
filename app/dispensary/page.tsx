import type { Metadata } from "next";
import Link from "next/link";
import Placeholder from "@/components/Placeholder";
import { COMPANY, dispensaryList, priceLabel } from "@/lib/data";

export const metadata: Metadata = {
  title: "The Dispensary — IV, NAD+, shots & more",
  description:
    "HealthServe's dispensary: IV therapy, NAD+ IV therapy, oxygen therapy, IM shots, flu vaccination and genetic testing — administered at home or delivered to your door. Peptides coming soon.",
};

const live = dispensaryList.filter((s) => !s.phase2);
const soon = dispensaryList.filter((s) => s.phase2);

export default function DispensaryPage() {
  return (
    <>
      <header className="pagehd wrap warmtop">
        <span className="crumb"><Link href="/">Home</Link> / <b>The Dispensary</b></span>
        <span className="tag orange" style={{ marginTop: 10 }}><span className="dot" />IV · NAD+ · Shots · delivered or at home</span>
        <h1>The Dispensary.</h1>
        <p>IV drips, NAD+ therapy, oxygen, vitamin shots, flu vaccination and genetic testing — administered at home or delivered to your door across Dubai.</p>
      </header>

      <div className="wrap" style={{ paddingBottom: 24 }}>
        <div className="grid3" style={{ marginTop: 12 }}>
          {live.map((s) => (
            <Link className="icard" key={s.slug} href={`/services/${s.slug}`}>
              <Placeholder caption={s.photo} tone={s.category === "Medical" ? "orange" : "red"} />
              <div className="b">
                <h3>{s.shortName}</h3>
                <p>{s.blurb}</p>
                <div className="foot">
                  <span className="price">{priceLabel(s)}<small>{s.priceType === "from" ? s.unit : "quote"}</small></span>
                  <span className="btn btn-quiet btn-sm">{s.cta === "book" ? "Book" : "Enquire"}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {soon.length > 0 && (
          <>
            <h2 className="sec" style={{ fontSize: 22, marginTop: 36 }}>Peptides</h2>
            <p className="muted" style={{ margin: "4px 0 16px" }}>Prescription peptide therapies — launching once DHA/MOHAP cleared.</p>
            <div className="grid4">
              {soon.map((s) => (
                <article className="svc" style={{ minHeight: 0, opacity: 0.9 }} key={s.slug}>
                  <span className="tag dark" style={{ alignSelf: "flex-start", marginBottom: 10 }}><span className="dot" />Coming soon</span>
                  <h3 style={{ fontSize: 17 }}>{s.shortName}</h3>
                  <p>{s.blurb}</p>
                </article>
              ))}
            </div>
          </>
        )}

        <div className="policy-note" style={{ marginTop: 24 }}>
          <b>Please note:</b> IM shots (Vitamin D / B12) and other prescription items are dispensed only after a
          clinician review. Peptides are pending DHA/MOHAP approval. Nothing here is a recommendation to use a specific product.
        </div>
      </div>

      <section className="wrap" style={{ paddingBlock: "8px 24px" }}>
        <div className="band">
          <div style={{ flex: 1, minWidth: 240 }}>
            <div className="lbl">Home pharmacy</div>
            <b style={{ color: "var(--text-strong)", fontSize: 18 }}>Prescriptions &amp; refills, delivered.</b>
            <p className="muted" style={{ fontSize: 14, marginTop: 4 }}>Send us your prescription and our pharmacists prepare and deliver it — with cold-chain handling where needed.</p>
          </div>
          <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
            <a className="btn btn-primary" href={COMPANY.whatsapp} target="_blank" rel="noreferrer">Send a prescription</a>
            <a className="btn btn-outline" href={COMPANY.phoneHref}>Call {COMPANY.phoneLabel}</a>
          </div>
        </div>
      </section>

      <section className="wrap" style={{ paddingBlock: "8px 64px" }}>
        <div className="ctaband">
          <div className="txt">
            <h2>Not sure what you need?</h2>
            <p>Talk to a HealthServe clinician about the right drip, shot or program for your goals.</p>
          </div>
          <div className="actions">
            <a className="btn btn-white btn-lg" href={COMPANY.whatsapp} target="_blank" rel="noreferrer">Ask a clinician</a>
            <Link className="btn btn-clear btn-lg" href="/services">All services</Link>
          </div>
        </div>
      </section>
    </>
  );
}
