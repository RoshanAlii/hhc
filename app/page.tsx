import Image from "next/image";
import Link from "next/link";
import heroPremium from "@/public/img/hero-premium-v2.jpg";
import Icon from "@/components/Icon";
import ServiceVisual from "@/components/ServiceVisual";
import { homeServiceList, articles, COMPANY, priceLabel, type Category } from "@/lib/data";

const toneFor = (category: Category): "forest" | "copper" | "plum" =>
  category === "Medical" ? "copper" : category === "Nursing & care" ? "forest" : "plum";

const popularCare = [
  { name: "Comprehensive health profiles", meta: "Home sample collection", price: "from AED 89", href: "/services/lab-tests", icon: "lab" },
  { name: "Sports injury physiotherapy", meta: "Single visits & recovery plans", price: "from AED 289", href: "/services/physiotherapy/#sports-performance", icon: "physio" },
  { name: "NAD+ clinician-led programmes", meta: "Dose and suitability assessment", price: "from AED 449", href: "/services/nad-therapy", icon: "wellness" },
  { name: "Home nurse visit", meta: "Focused clinical support", price: "from AED 149", href: "/services/home-nursing", icon: "nursing" },
];

const careStandards = [
  { icon: "shield", title: "Licensed clinical teams", body: "Care is delivered by appropriately licensed professionals, with credentials available on request." },
  { icon: "calendar", title: "Coordinated around you", body: "A care coordinator confirms availability, location and preparation before the visit." },
  { icon: "doc", title: "Clear records & next steps", body: "Understand what is included, what happens next and when follow-up is required." },
];

export default function HomePage() {
  const latest = articles.slice(0, 3);

  return (
    <>
      <section className="premium-hero">
        <Image
          className="premium-hero-image"
          src={heroPremium}
          alt="A home healthcare clinician speaking with an older patient in a Dubai residence"
          fill
          priority
          sizes="100vw"
        />
        <div className="premium-hero-shade" />
        <div className="wrap premium-hero-inner">
          <div className="premium-hero-copy">
            <span className="premium-kicker"><span />Home healthcare · Dubai · Since {COMPANY.since}</span>
            <h1>Advanced care.<br /><em>Deeply personal.</em></h1>
            <p>Licensed doctors, nurses and physiotherapists bringing attentive, hospital-grade care into the comfort of your home.</p>
            <div className="premium-hero-actions">
              <Link className="btn btn-primary btn-lg" href="#primary-care">Explore home care <Icon name="arrow" size={17} /></Link>
              <a className="btn btn-glass btn-lg" href={COMPANY.whatsapp} target="_blank" rel="noreferrer">Speak to our care team</a>
            </div>
            <div className="premium-hero-proof" aria-label="HealthServe credentials">
              <span><b>DHA</b> licensed facility</span>
              <span><b>MOHAP</b> approved</span>
              <span><b>10 years</b> caring in Dubai</span>
            </div>
          </div>
        </div>
        <div className="premium-hero-status">
          <div className="wrap">
            <span><i />Care requests reviewed during clinic hours</span>
            <span>Dubai-wide coverage confirmed before booking</span>
            <a href={COMPANY.phoneHref}>Call {COMPANY.phoneLabel}</a>
          </div>
        </div>
      </section>

      <section className="wrap premium-section" id="primary-care">
        <div className="premium-section-head">
          <div>
            <span className="kicker">Primary home care</span>
            <h2 className="sec">The care you need, brought home.</h2>
            <p>Start with the type of support you need. We will help you choose the right visit or programme.</p>
          </div>
          <Link className="text-link" href="/services">Explore all care <Icon name="arrow" size={15} /></Link>
        </div>
        <div className="primary-care-grid">
          {homeServiceList.map((service, index) => (
            <Link className={`primary-care-card ${index === 0 ? "feature" : ""}`} key={service.slug} href={`/services/${service.slug}`}>
              <ServiceVisual
                icon={service.icon}
                eyebrow={`0${index + 1}`}
                title={service.shortName}
                tone={toneFor(service.category)}
                large={index === 0}
              />
              <div className="primary-care-body">
                <h3>{service.shortName}</h3>
                <p>{service.blurb}</p>
                <div className="primary-care-foot">
                  <span>{priceLabel(service)}</span>
                  <span>View care <Icon name="arrow" size={14} /></span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="premium-dark-section">
        <div className="wrap premium-dark-grid">
          <div className="premium-dark-intro">
            <span className="kicker light">A calmer care journey</span>
            <h2>Clinical precision, with a human at every step.</h2>
            <p>No anonymous marketplace hand-offs. Our care team helps clarify the service, confirms the visit and remains available for follow-up.</p>
            <a className="btn btn-white btn-lg" href={COMPANY.whatsapp} target="_blank" rel="noreferrer">Talk to a care coordinator</a>
          </div>
          <div className="premium-steps">
            {[
              ["01", "Tell us what you need", "Choose a service or describe the situation to our care team."],
              ["02", "Confirm the care plan", "We confirm suitability, location, timing and the final price."],
              ["03", "Welcome your clinician", "Your licensed professional arrives prepared, with follow-up arranged."],
            ].map(([n, title, body]) => (
              <div className="premium-step" key={n}>
                <span>{n}</span><div><h3>{title}</h3><p>{body}</p></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="wrap premium-section">
        <div className="premium-section-head">
          <div>
            <span className="kicker">Popular care options</span>
            <h2 className="sec">Specific services. Clear starting prices.</h2>
            <p>Browse commonly requested treatments and profiles, then confirm suitability with the clinical team.</p>
          </div>
        </div>
        <div className="product-rail">
          {popularCare.map((item) => (
            <Link className="product-rail-card" href={item.href} key={item.name}>
              <span className="product-rail-icon"><Icon name={item.icon} size={23} /></span>
              <div><h3>{item.name}</h3><p>{item.meta}</p></div>
              <b>{item.price}</b>
              <Icon name="arrow" size={16} />
            </Link>
          ))}
        </div>
      </section>

      <section className="wrap premium-section compact">
        <div className="dispensary-feature">
          <div className="dispensary-visual" aria-hidden="true">
            <span className="orb orb-one" /><span className="orb orb-two" />
            <Icon name="wellness" size={58} />
            <small>Clinician-led wellness</small>
          </div>
          <div className="dispensary-copy">
            <span className="kicker">The Dispensary</span>
            <h2>Wellness, diagnostics and home treatment—clinically guided.</h2>
            <p>Explore IV therapy, NAD+, vitamin shots, vaccinations and genetic testing with suitability reviewed before care.</p>
            <div className="inline-actions">
              <Link className="btn btn-primary btn-lg" href="/dispensary">Explore the Dispensary</Link>
              <a className="text-link" href={COMPANY.whatsapp} target="_blank" rel="noreferrer">Ask a clinician <Icon name="arrow" size={15} /></a>
            </div>
          </div>
        </div>
      </section>

      <section className="wrap premium-section compact">
        <div className="premium-section-head">
          <div>
            <span className="kicker">Our care standard</span>
            <h2 className="sec">Confidence before the door opens.</h2>
          </div>
        </div>
        <div className="standards-grid">
          {careStandards.map((item) => (
            <article key={item.title}>
              <span><Icon name={item.icon} size={23} /></span>
              <h3>{item.title}</h3>
              <p>{item.body}</p>
            </article>
          ))}
        </div>
        <div className="licence-line">
          <span><b>DHA</b> {COMPANY.dha.replace("DHA ", "")}</span>
          <span><b>MOHAP</b> {COMPANY.mohap.replace("MOHAP ", "")}</span>
          <span><b>Clinic</b> {COMPANY.address}</span>
          <Link href="/about">Our standards <Icon name="arrow" size={14} /></Link>
        </div>
      </section>

      <section className="wrap premium-section compact">
        <div className="premium-section-head">
          <div>
            <span className="kicker">Clinical journal</span>
            <h2 className="sec">Guidance for care at home.</h2>
          </div>
          <Link className="text-link" href="/journal">View all insights <Icon name="arrow" size={15} /></Link>
        </div>
        <div className="journal-editorial-grid">
          {latest.map((article, index) => (
            <Link href={`/journal/${article.slug}`} key={article.slug}>
              <span className="journal-number">0{index + 1}</span>
              <small>{article.category} · {article.readMins} min</small>
              <h3>{article.title}</h3>
              <span className="text-link">Read insight <Icon name="arrow" size={14} /></span>
            </Link>
          ))}
        </div>
      </section>

      <section className="wrap premium-section">
        <div className="final-concierge">
          <div>
            <span className="kicker light">Not sure where to begin?</span>
            <h2>Tell us what is happening. We’ll guide the next step.</h2>
          </div>
          <div className="inline-actions">
            <a className="btn btn-white btn-lg" href={COMPANY.whatsapp} target="_blank" rel="noreferrer">WhatsApp our care team</a>
            <Link className="btn btn-clear btn-lg" href="/contact">Contact HealthServe</Link>
          </div>
        </div>
      </section>
    </>
  );
}
