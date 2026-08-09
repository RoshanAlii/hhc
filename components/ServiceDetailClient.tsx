"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Placeholder from "@/components/Placeholder";
import Icon from "@/components/Icon";
import OptionPicker from "@/components/OptionPicker";
import ProductCatalog from "@/components/ProductCatalog";
import { useCart } from "@/lib/cart";
import { COMPANY, formatAED, formatSlot, localDate, services, type Service } from "@/lib/data";
import { productsFor, addonsFor } from "@/lib/variants";

const TIME_SLOTS = ["09:00", "11:30", "15:00", "18:00", "20:00"];

const DETAIL_BY_SLUG: Record<string, { duration: string; clinician: string; outcome: string; audience: string; prepare: string }> = {
  "doctor-visit": { duration: "30-45 min", clinician: "DHA-licensed GP", outcome: "Assessment & care plan", audience: "Adults, children and families who need a medical assessment without travelling to a clinic.", prepare: "Keep your Emirates ID, medication list and any recent reports nearby." },
  physiotherapy: { duration: "45-60 min", clinician: "Licensed physiotherapist", outcome: "Personal recovery plan", audience: "People recovering from injury or surgery, managing pain, or improving strength and mobility.", prepare: "Wear comfortable clothing and clear a small, safe area for movement." },
  "home-nursing": { duration: "Flexible shifts", clinician: "DHA-licensed nurse", outcome: "Coordinated home care", audience: "Patients needing clinical support, recovery monitoring or longer-term nursing at home.", prepare: "Share the discharge plan, medication list and treating physician details." },
  "elderly-care": { duration: "4-24 hour care", clinician: "Trained caregiver", outcome: "Daily comfort & support", audience: "Older adults who benefit from dignified personal, mobility and medication support.", prepare: "Tell us about mobility needs, routines, medication and language preferences." },
  "newborn-child-care": { duration: "Flexible visits", clinician: "Paediatric nurse", outcome: "Family guidance", audience: "New parents and families needing feeding, jaundice or overnight newborn support.", prepare: "Keep the baby health record and feeding or medication notes available." },
  "lab-tests": { duration: "15-25 min", clinician: "Licensed phlebotomist", outcome: "Secure digital results", audience: "Individuals, families and care-plan patients needing convenient laboratory testing.", prepare: "Fasting requirements vary by panel. We confirm preparation before the visit." },
  "iv-therapy": { duration: "45-75 min", clinician: "DHA-licensed nurse", outcome: "Screened wellness care", audience: "Eligible adults seeking clinician-administered hydration, recovery or wellness support.", prepare: "Eat a light meal, hydrate and share your conditions, allergies and medications." },
  "nad-therapy": { duration: "60-180 min", clinician: "DHA-licensed nurse", outcome: "Dose-based infusion", audience: "Eligible adults seeking a clinically screened NAD+ infusion at home.", prepare: "Clinical screening is required. Eat beforehand and allow time for a slow infusion." },
  "flu-vaccination": { duration: "20-30 min", clinician: "Licensed nurse", outcome: "Seasonal protection", audience: "Eligible adults, children and families looking for convenient seasonal vaccination.", prepare: "Have your Emirates ID and vaccination history ready, and tell us about allergies or fever." },
};

function serviceDetails(service: Service) {
  const fallback = service.category === "Nursing & care"
    ? { duration: "Flexible visit", clinician: "Licensed care professional", outcome: "Personal care plan", audience: "Individuals and families who need reliable, coordinated support at home.", prepare: "Share current medications, relevant reports and any mobility or access needs." }
    : service.category === "Medical"
      ? { duration: "30-45 min", clinician: "DHA-licensed clinician", outcome: "Clear clinical next steps", audience: "Patients who want convenient, clinically governed care without unnecessary travel.", prepare: "Keep your Emirates ID, medication list and relevant health records available." }
      : { duration: "45-60 min", clinician: "Licensed clinician", outcome: "Personalised wellness plan", audience: "Eligible adults looking for safe, clinician-led wellness support at home.", prepare: "Share your medical history, allergies and current medications during screening." };
  return DETAIL_BY_SLUG[service.slug] ?? fallback;
}

export default function ServiceDetailClient({ service }: { service: Service }) {
  const router = useRouter();
  const { addItem, count } = useCart();
  const products = productsFor(service.slug);
  const addons = addonsFor(service.slug);
  const comingSoon = service.cta === "soon" || service.phase2;
  const isCatalog = !comingSoon && products.length > 1;
  const single = products[0];
  const singleOptions = single?.options ?? [];
  const [optIndex, setOptIndex] = useState(0);
  const [date, setDate] = useState("");
  const [time, setTime] = useState("18:00");
  const [today, setToday] = useState("");
  const [error, setError] = useState("");
  const [toast, setToast] = useState(false);
  const [mobileBooking, setMobileBooking] = useState(false);

  const option = singleOptions[optIndex] ?? singleOptions[0];
  const activePrice = option?.price ?? service.price;
  const bookable = service.cta === "book" && (isCatalog || activePrice != null);
  const details = serviceDetails(service);
  const related = services.filter((item) => item.slug !== service.slug && item.category === service.category && !item.phase2).slice(0, 3);

  useEffect(() => {
    setToday(localDate());
    const when = new URLSearchParams(window.location.search).get("when");
    setDate(localDate(when === "Tomorrow" ? 1 : 0));
  }, []);

  const fromPrice = products.length ? Math.min(...products.map((product) => product.from)) : service.price;
  const priceMain = comingSoon ? "Coming soon" : isCatalog ? `from ${formatAED(fromPrice!)}` : activePrice != null ? `${singleOptions.length > 1 ? "" : service.priceType === "from" ? "from " : ""}${formatAED(activePrice)}` : "Enquire";
  const slotLabel = formatSlot(date, time);
  const theme = service.category === "Medical" ? "medical" : service.category === "Nursing & care" ? "nursing" : "wellness";

  function addSingle(destination: "checkout" | "stay") {
    if (!bookable) { window.open(COMPANY.whatsapp, "_blank"); return; }
    if (!date || !time) { setError("Please choose a date and time for your appointment."); return; }
    setError("");
    addItem({ key: `${service.slug}:${optIndex}`, slug: service.slug, name: option ? `${service.shortName} - ${option.name}` : service.name, meta: option?.label, price: activePrice!, kind: "service", date, time });
    if (destination === "checkout") router.push("/checkout");
    else { setMobileBooking(false); setToast(true); setTimeout(() => setToast(false), 2600); }
  }

  function BookingCard({ sheet = false }: { sheet?: boolean }) {
    return <div className={`premium-book-card${sheet ? " sheet" : ""}`}>
      <div className="premium-book-head"><div><span className="kicker">{comingSoon ? "Service status" : isCatalog ? "Your booking" : "Book at home"}</span><h2>{service.shortName}</h2></div>{sheet && <button onClick={() => setMobileBooking(false)} aria-label="Close booking">×</button>}</div>
      <div className="premium-book-price"><span>{priceMain}</span><small>{comingSoon ? "Pending approval" : isCatalog ? `${products.length} services available` : service.unit}</small></div>
      {comingSoon ? <><div className="service-regulatory"><Icon name="shield" /><span><b>Bookings are not open yet</b><small>We will launch only after the required regulatory clearance.</small></span></div><a className="btn btn-primary btn-full" href={COMPANY.whatsapp} target="_blank" rel="noreferrer">Ask for an update</a></> : isCatalog ? <><div className="premium-book-summary"><span>Selected items</span><b>{count}</b></div>{count > 0 ? <Link className="btn btn-primary btn-full btn-lg" href="/checkout">Continue to checkout</Link> : <a className="btn btn-primary btn-full btn-lg" href="#catalogue" onClick={() => setMobileBooking(false)}>Choose a service</a>}</> : bookable ? <>
        {singleOptions.length > 1 && <div className="field"><label>Service option</label><select value={optIndex} onChange={(event) => setOptIndex(Number(event.target.value))}>{singleOptions.map((item, index) => <option value={index} key={`${item.name}-${index}`}>{item.name} · {formatAED(item.price)}</option>)}</select></div>}
        <div className="field"><label>Appointment date</label><input type="date" min={today} value={date} onChange={(event) => setDate(event.target.value)} /></div>
        <div className="field"><label>Preferred time</label><div className="service-time-slots">{TIME_SLOTS.map((slot) => <button className={time === slot ? "on" : ""} onClick={() => setTime(slot)} type="button" key={slot}>{formatSlot(date, slot).split(" · ").pop()}</button>)}</div></div>
        <div className="service-selected-slot"><Icon name="calendar" size={15} /><span><small>Your selected visit</small><b>{slotLabel}</b></span></div>
        {error && <p className="err service-book-error">{error}</p>}
        <button className="btn btn-primary btn-full btn-lg" onClick={() => addSingle("checkout")} type="button">Book now &amp; check out</button>
        <button className="btn btn-outline btn-full" onClick={() => addSingle("stay")} type="button">Add to booking</button>
      </> : <><div className="service-regulatory"><Icon name="heart" /><span><b>Care coordinator consultation</b><small>Tell us what you need and we will recommend the right care plan.</small></span></div><a className="btn btn-primary btn-full btn-lg" href={COMPANY.whatsapp} target="_blank" rel="noreferrer">Talk to a care coordinator</a></>}
      <div className="premium-book-trust"><span><Icon name="shield" size={14} />DHA licensed</span><span><Icon name="check" size={14} />Transparent pricing</span><span><Icon name="refresh" size={14} />Easy rescheduling</span></div>
    </div>;
  }

  return <div className={`premium-service-page service-theme-${theme}`}>
    <section className="premium-service-hero">
      <div className="wrap premium-service-hero-grid">
        <div className="premium-service-copy">
          <span className="crumb"><Link href="/services">Services</Link> / <b>{service.name}</b></span>
          <div className="service-eyebrow"><span><Icon name={service.icon} size={15} />{service.category}</span><span><Icon name="delivery" size={15} />Delivered at home</span></div>
          <h1>{service.heroTitle}</h1>
          <p>{service.heroBlurb}</p>
          <div className="service-hero-benefits"><span><Icon name="shield" />Licensed clinicians</span><span><Icon name="calendar" />Flexible appointments</span><span><Icon name="doc" />Claim-ready invoice</span></div>
          <div className="service-hero-action"><div><b>{priceMain}</b><small>{comingSoon ? "Regulatory clearance pending" : isCatalog ? `${products.length} options available` : service.unit}</small></div>{isCatalog ? <a className="btn btn-primary btn-lg" href="#catalogue">Explore options</a> : comingSoon ? <a className="btn btn-primary btn-lg" href={COMPANY.whatsapp}>Get updates</a> : bookable ? <button className="btn btn-primary btn-lg" onClick={() => setMobileBooking(true)}>Book this service</button> : <a className="btn btn-primary btn-lg" href={COMPANY.whatsapp}>Request a care plan</a>}<a className="btn btn-outline btn-lg" href={COMPANY.whatsapp} target="_blank" rel="noreferrer">WhatsApp</a></div>
          <div className="service-mini-trust"><span><b>4.9</b> <Icon name="star" size={12} /> verified care</span><span>{COMPANY.dha}</span><span>Serving Dubai since {COMPANY.since}</span></div>
        </div>
        <div className="premium-service-visual"><Placeholder caption={service.photo} tone={theme === "nursing" ? "green" : theme === "medical" ? "orange" : "red"} /><span className="service-visual-badge"><Icon name="heartSolid" size={15} /><b>Care in the comfort of home</b></span><div className="service-visual-rating"><Icon name="star" size={14} /><b>4.9</b><span>Trusted by 25,000+ families</span></div></div>
      </div>
      <div className="wrap service-facts"><div><Icon name="calendar" /><span><small>Visit length</small><b>{details.duration}</b></span></div><div><Icon name="doctor" /><span><small>Your professional</small><b>{details.clinician}</b></span></div><div><Icon name="delivery" /><span><small>Where</small><b>{service.slug === "teleconsultation" ? "Secure video call" : service.slug === "corporate-wellness" ? "At your workplace" : "At your home"}</b></span></div><div><Icon name="doc" /><span><small>After your visit</small><b>{details.outcome}</b></span></div></div>
    </section>

    <nav className="service-anchor-nav"><div className="wrap"><a href="#overview">Overview</a>{isCatalog && <a href="#catalogue">Choose a service</a>}<a href="#included">What&rsquo;s included</a><a href="#process">How it works</a><a href="#safety">Safety</a><a href="#faq">FAQs</a></div></nav>

    <div className="wrap premium-service-layout">
      <main className="premium-service-content">
        <section id="overview" className="service-story service-segment-warm"><div><span className="kicker">Designed around you</span><h2>Professional care, without the waiting room.</h2><p>{details.audience}</p></div><div className="service-story-points"><span><Icon name="check" /><b>Clear pricing before you book</b></span><span><Icon name="check" /><b>Licensed professional at your door</b></span><span><Icon name="check" /><b>Support continues after the visit</b></span></div></section>

        {isCatalog && <section id="catalogue" className="service-catalogue-section"><div className="catalogue-banner"><span><Icon name={service.icon} size={24} /></span><div><b>Guided service finder</b><small>Browse by care goal, then choose the right package.</small></div></div><ProductCatalog service={service} products={products} canBook={bookable} />{addons.length > 0 && <details className="addon-browser"><summary><span><b>Looking for an individual test?</b><small>Browse and search {addons.length} optional add-on tests</small></span><span>View tests</span></summary><OptionPicker options={addons} /></details>}</section>}
        {!isCatalog && singleOptions.length > 1 && <section className="service-option-section"><div className="service-section-heading"><span className="kicker">Choose your care</span><h2>Options for different needs</h2></div><OptionPicker options={singleOptions} selectedIndex={bookable ? optIndex : undefined} onSelect={bookable ? setOptIndex : undefined} /></section>}

        <section id="included" className="service-section"><div className="service-section-heading"><span className="kicker">What&rsquo;s included</span><h2>Everything needed for a confident home visit.</h2><p>No vague extras. Your care and next steps are explained clearly.</p></div><div className="service-benefit-grid">{service.includes.map((item, index) => <article key={item}><span><Icon name={["doctor", "shield", "doc", "heart", "refresh"][index % 5]} /></span><b>{item}</b><p>{index % 2 ? "Handled with clinical care and clear communication." : "Included as part of your coordinated home-care experience."}</p></article>)}</div></section>

        <section id="process" className="service-process service-segment-green"><div className="service-section-heading"><span className="kicker">A smoother care journey</span><h2>From booking to follow-up.</h2></div><div className="service-timeline">{service.howItWorks.map((item, index) => <article key={item}><span>{index + 1}</span><div><small>{["Book", "Home visit", "Follow-up"][index] ?? "Care"}</small><b>{item}</b></div></article>)}</div></section>

        <section id="safety" className="service-safety-grid"><div className="service-safety service-segment-blue"><span><Icon name="shield" /></span><div><small>Clinical standards</small><h2>Safe, licensed and prepared.</h2><p>{details.prepare}</p><ul><li>DHA/MOHAP governed care</li><li>Identity and suitability screening</li><li>Single-use supplies where relevant</li></ul></div></div><blockquote><Icon name="star" size={17} /><p>“The booking was easy, the clinician arrived prepared, and everything was explained with patience.”</p><cite>Verified HealthServe family · Dubai</cite></blockquote></section>

        <section id="faq" className="service-faq"><div className="service-section-heading"><span className="kicker">Frequently asked</span><h2>Useful answers before you book.</h2></div>{service.faqs.map((faq, index) => <details key={faq.q} open={index === 0}><summary>{faq.q}</summary><p>{faq.a}</p></details>)}</section>

        <section className="service-related"><div className="service-section-heading"><span className="kicker">Continue your care</span><h2>Related services</h2></div><div>{related.map((item) => <Link href={`/services/${item.slug}`} key={item.slug}><span><Icon name={item.icon} /></span><div><b>{item.shortName}</b><small>{item.blurb}</small></div><Icon name="arrow" size={16} /></Link>)}</div></section>
      </main>
      <aside className="premium-service-aside"><BookingCard /></aside>
    </div>

    <section className="service-final-cta"><div className="wrap"><div><span className="kicker">Care, coordinated around you</span><h2>Ready to arrange your home visit?</h2><p>Book online or speak with our care team for personal guidance.</p></div><div>{bookable && !isCatalog ? <button className="btn btn-primary btn-lg" onClick={() => setMobileBooking(true)}>Choose a time</button> : <a className="btn btn-primary btn-lg" href={isCatalog ? "#catalogue" : COMPANY.whatsapp}>{isCatalog ? "Explore options" : "Talk to our team"}</a>}<a className="btn btn-outline btn-lg" href={COMPANY.whatsapp}>WhatsApp</a></div></div></section>

    <div className="service-mobile-bar"><div><small>{service.shortName}</small><b>{priceMain}</b></div><button className="btn btn-primary" onClick={() => setMobileBooking(true)}>{isCatalog ? "View booking" : comingSoon ? "Get updates" : bookable ? "Book now" : "Enquire"}</button></div>
    {mobileBooking && <div className="service-book-overlay"><button className="service-book-backdrop" onClick={() => setMobileBooking(false)} aria-label="Close booking" /><BookingCard sheet /></div>}
    {toast && <div className="toast-live" role="status"><div className="toast"><div className="ic"><Icon name="check" size={16} /></div><div><div className="t">Added to your booking</div><div className="s">{option?.name ?? service.shortName} · {slotLabel}<br /><Link href="/checkout">Check out</Link> · <Link href="/cart">View cart</Link></div></div></div></div>}
  </div>;
}
