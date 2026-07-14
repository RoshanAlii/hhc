import type { Metadata } from "next";
import Link from "next/link";
import Icon from "@/components/Icon";
import { COMPANY } from "@/lib/data";

export const metadata: Metadata = {
  title: "The Dispensary — pharmacy delivered",
  description:
    "Prescriptions, chronic refills and everyday health essentials — reviewed by DHA-licensed pharmacists and delivered across Dubai, often the same day.",
};

const items = [
  { icon: "doc", cat: "cat-medical", t: "Prescription fulfilment", d: "Share a prescription; our pharmacists prepare and deliver it, often the same day." },
  { icon: "refresh", cat: "cat-nursing", t: "Chronic medication refills", d: "Set-and-forget auto-refills for long-term medications, right on schedule." },
  { icon: "cart", cat: "cat-medical", t: "Over-the-counter essentials", d: "Pain relief, first aid and everyday remedies without leaving home." },
  { icon: "wellness", cat: "cat-therapy", t: "Vitamins & supplements", d: "A curated, pharmacist-approved range for energy, immunity and recovery." },
  { icon: "child", cat: "cat-nursing", t: "Baby & mother care", d: "Formula, nappies and postnatal essentials, delivered discreetly." },
  { icon: "shield", cat: "cat-medical", t: "Medical devices", d: "BP monitors, glucometers, nebulisers and mobility aids." },
];

const steps = [
  "Share your prescription on WhatsApp, or upload it when you order.",
  "A DHA-licensed pharmacist reviews it and confirms your order.",
  "We deliver discreetly to your door — with cold-chain handling where needed.",
];

export default function DispensaryPage() {
  return (
    <>
      <header className="pagehd wrap warmtop">
        <span className="crumb"><Link href="/">Home</Link> / <b>The Dispensary</b></span>
        <span className="tag orange" style={{ marginTop: 10 }}><span className="dot" />New service · launching 2026</span>
        <h1>Your pharmacy, delivered.</h1>
        <p>Prescriptions, refills and everyday health essentials — reviewed by DHA-licensed pharmacists and brought to your door across Dubai, often the same day.</p>
      </header>

      <div className="wrap">
        <div className="grid3" style={{ marginTop: 12 }}>
          {items.map((x) => (
            <article className="svc" key={x.t}>
              <span className={`ic ${x.cat}`}><Icon name={x.icon} /></span>
              <h3>{x.t}</h3>
              <p>{x.d}</p>
            </article>
          ))}
        </div>

        <div className="grid2" style={{ marginTop: 32, alignItems: "start" }}>
          <div className="panel">
            <h2 className="blk">How it works</h2>
            <ol className="how">{steps.map((s) => <li key={s}>{s}</li>)}</ol>
            <h2 className="blk">Why The Dispensary</h2>
            <ul className="inc">
              <li>DHA-licensed pharmacy and pharmacists</li>
              <li>Cold-chain handling for temperature-sensitive medicines</li>
              <li>Same-day delivery across most of Dubai</li>
              <li>Refills synced with your care plan and home visits</li>
            </ul>
          </div>
          <aside className="aside" style={{ position: "static" }}>
            <div className="lbl">Have a prescription ready?</div>
            <p className="muted" style={{ fontSize: 14 }}>Send it to our pharmacy team on WhatsApp and we&rsquo;ll take care of the rest.</p>
            <a className="btn btn-primary btn-full" style={{ marginTop: 12 }} href={COMPANY.whatsapp} target="_blank" rel="noreferrer">Send a prescription</a>
            <a className="btn btn-quiet btn-full" style={{ marginTop: 8 }} href={COMPANY.phoneHref}>Call {COMPANY.phoneLabel}</a>
            <div className="truststrip">{COMPANY.dha} · MOHAP approved<br />Daily 8:30 AM – 6:30 PM</div>
          </aside>
        </div>
      </div>

      <section className="wrap" style={{ paddingBlock: "8px 64px" }}>
        <div className="ctaband">
          <div className="txt">
            <h2>Need a prescription filled?</h2>
            <p>Our pharmacists are ready to help — message us and we&rsquo;ll confirm your order in minutes.</p>
          </div>
          <div className="actions">
            <a className="btn btn-white btn-lg" href={COMPANY.whatsapp} target="_blank" rel="noreferrer">WhatsApp the pharmacy</a>
            <Link className="btn btn-clear btn-lg" href="/services/chronic-disease">Chronic care programs</Link>
          </div>
        </div>
      </section>
    </>
  );
}
