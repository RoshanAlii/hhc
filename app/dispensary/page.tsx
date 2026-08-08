import type { Metadata } from "next";
import Link from "next/link";
import Icon from "@/components/Icon";
import ServiceVisual from "@/components/ServiceVisual";
import { COMPANY, dispensaryList, priceLabel } from "@/lib/data";
import { IV_GROUPS } from "@/lib/taxonomy";

export const metadata: Metadata = {
  title: "The Dispensary — clinician-led wellness at home",
  description: "Explore clinician-led IV therapy, NAD+, injections, vaccinations, oxygen support and genetic testing at home in Dubai.",
};

const live = dispensaryList.filter((service) => !service.phase2);

export default function DispensaryPage() {
  return (
    <>
      <header className="pagehd wrap warmtop dispensary-head">
        <span className="crumb"><Link href="/">Home</Link> / <b>The Dispensary</b></span>
        <span className="premium-kicker dark"><span />Clinician-led · At home</span>
        <h1>Modern wellness,<br />with clinical judgement.</h1>
        <p>IV therapy, NAD+, injections, vaccination and specialist diagnostics—reviewed for suitability and delivered by licensed professionals across Dubai.</p>
        <div className="inline-actions">
          <a className="btn btn-primary btn-lg" href={COMPANY.whatsapp} target="_blank" rel="noreferrer">Ask a clinician</a>
          <a className="text-link" href="#dispensary-care">Explore treatments <Icon name="arrow" size={15} /></a>
        </div>
      </header>

      <div className="wrap dispensary-directory" id="dispensary-care">
        <section className="directory-section" aria-labelledby="dispensary-primary-title">
          <div className="directory-heading">
            <span className="kicker">Treatment families</span>
            <h2 id="dispensary-primary-title">Choose a care category.</h2>
            <p>Final suitability, formulation, timing and pricing are confirmed by the clinical team before treatment.</p>
          </div>
          <div className="directory-primary-grid dispensary-grid">
            {live.map((service, index) => (
              <Link href={`/services/${service.slug}`} key={service.slug}>
                <ServiceVisual icon={service.icon} eyebrow={`0${index + 1}`} title={service.shortName} tone={service.category === "Medical" ? "copper" : "plum"} />
                <div>
                  <h3>{service.shortName}</h3>
                  <p>{service.blurb}</p>
                  <span>{priceLabel(service)} <Icon name="arrow" size={14} /></span>
                </div>
              </Link>
            ))}
          </div>
        </section>

        <section className="directory-section" aria-labelledby="iv-families-title">
          <div className="directory-heading split">
            <div><span className="kicker">IV therapy</span><h2 id="iv-families-title">Browse by wellness goal.</h2></div>
            <p>These categories organise the catalogue; they are not a recommendation or a substitute for clinical assessment.</p>
          </div>
          <div className="care-path-grid">
            {IV_GROUPS.map((group) => (
              <Link href={`/services/iv-therapy/#${group.id}`} key={group.id}>
                <span><Icon name="wellness" size={21} /></span>
                <div><h3>{group.name}</h3><p>{group.description}</p></div>
                <Icon name="arrow" size={15} />
              </Link>
            ))}
          </div>
        </section>

        <section className="clinical-note" aria-labelledby="clinical-note-title">
          <span><Icon name="shield" size={24} /></span>
          <div>
            <h2 id="clinical-note-title">Clinical review comes first.</h2>
            <p>Prescription items and clinician-administered treatments are provided only where appropriate after review. Treatment availability can change as clinical and regulatory requirements evolve.</p>
          </div>
          <a className="btn btn-primary" href={COMPANY.whatsapp} target="_blank" rel="noreferrer">Discuss suitability</a>
        </section>

        <section className="directory-dispensary prescription-support">
          <div><span className="kicker light">Prescription support</span><h2>Need help arranging a prescribed treatment?</h2><p>Send your prescription securely through WhatsApp and the team will explain the available next step. Do not send medical documents until you are ready to share them with HealthServe.</p></div>
          <div className="inline-actions">
            <a className="btn btn-white" href={COMPANY.whatsapp} target="_blank" rel="noreferrer">Contact the care team</a>
            <a className="btn btn-clear" href={COMPANY.phoneHref}>Call {COMPANY.phoneLabel}</a>
          </div>
        </section>
      </div>
    </>
  );
}
