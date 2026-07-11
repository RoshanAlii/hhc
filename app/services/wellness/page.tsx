import type { Metadata } from "next";
import Link from "next/link";
import Icon from "@/components/Icon";
import { wellnessServiceList, priceLabel } from "@/lib/data";

export const metadata: Metadata = {
  title: "Wellness services",
  description: "Clinician-delivered wellness — every drip, panel and program administered by DHA-licensed clinicians, at your home or office.",
};

export default function WellnessPage() {
  return (
    <>
      <header className="pagehd wrap">
        <span className="crumb"><Link href="/services">Services</Link> / <b>Wellness</b></span>
        <h1>Clinician-delivered wellness — not a spa menu.</h1>
        <p>Every drip, panel and program is administered by DHA-licensed clinicians, at your home or office.</p>
      </header>
      <div className="wrap" style={{ paddingBottom: 80 }}>
        <div className="grid4" style={{ marginTop: 24 }}>
          {wellnessServiceList.map((s) => (
            <article className="svc" key={s.slug}>
              <span className="ic cat-therapy"><Icon name={s.icon} /></span>
              <h3>{s.name}</h3>
              <p>{s.blurb}</p>
              <div className="foot">
                <span className="price">{priceLabel(s)}<small>{s.priceType === "enquire" ? "quote" : "per session"}</small></span>
                <Link className="btn btn-quiet btn-sm" href={`/services/${s.slug}`}>
                  {s.priceType === "enquire" ? "Learn more" : "Book"}
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </>
  );
}
