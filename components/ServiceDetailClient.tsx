"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Placeholder from "@/components/Placeholder";
import Icon from "@/components/Icon";
import OptionPicker from "@/components/OptionPicker";
import ProductCatalog from "@/components/ProductCatalog";
import { useCart } from "@/lib/cart";
import { COMPANY, formatAED, formatSlot, localDate, type Service } from "@/lib/data";
import { productsFor, addonsFor } from "@/lib/variants";

export default function ServiceDetailClient({ service }: { service: Service }) {
  const router = useRouter();
  const { addItem, count } = useCart();

  const products = productsFor(service.slug);
  const addons = addonsFor(service.slug);
  const comingSoon = service.cta === "soon" || service.phase2;
  // A category (multiple distinct products, e.g. the 16 physio types) is shown
  // as a browsable catalogue; a single product keeps the simple booking panel.
  const isCatalog = !comingSoon && products.length > 1;

  const single = products[0]; // single-product services (doctor visit, flu, …)
  const singleOptions = single?.options ?? [];
  const [optIndex, setOptIndex] = useState(0);
  const [date, setDate] = useState("");
  const [time, setTime] = useState("18:00");
  const [today, setToday] = useState("");
  const [error, setError] = useState("");
  const [toast, setToast] = useState(false);

  const option = singleOptions[optIndex] ?? singleOptions[0];
  const activePrice = option?.price ?? service.price;
  const bookable = service.cta === "book" && (isCatalog ? true : activePrice != null);
  const optionLabel = option ? [option.name, option.label].filter(Boolean).join(" · ") : undefined;

  useEffect(() => {
    setToday(localDate());
    const when = new URLSearchParams(window.location.search).get("when");
    setDate(localDate(when === "Tomorrow" ? 1 : 0));
  }, []);

  const fromPrice = products.length ? Math.min(...products.map((p) => p.from)) : service.price;
  const priceMain = comingSoon
    ? "Coming soon"
    : isCatalog
      ? "from " + formatAED(fromPrice!)
      : activePrice != null
        ? (singleOptions.length > 1 ? "" : service.priceType === "from" ? "from " : "") + formatAED(activePrice)
        : "Enquire";

  const slotLabel = formatSlot(date, time);

  function addSingle(dest: "checkout" | "cart" | "stay") {
    if (!bookable) {
      window.open(COMPANY.whatsapp, "_blank");
      return;
    }
    if (!date || !time) {
      setError("Please choose a date and time for your appointment.");
      return;
    }
    setError("");
    addItem({
      key: `${service.slug}:${optIndex}`,
      slug: service.slug,
      name: option ? `${service.shortName} - ${option.name}` : service.name,
      meta: option?.label,
      price: activePrice!,
      kind: "service",
      date,
      time,
    });
    if (dest === "checkout") router.push("/checkout");
    else if (dest === "cart") router.push("/cart");
    else {
      setToast(true);
      setTimeout(() => setToast(false), 2600);
    }
  }

  return (
    <>
      <div className="wrap pagehd">
        <span className="crumb"><Link href="/services">Services</Link> / <b>{service.name}</b></span>
        <h1>{service.heroTitle}</h1>
        <p>{service.heroBlurb}</p>

        <div className="buybar">
          <span className="bigprice">
            <span className="n">{priceMain}</span>
            <span className="s">{comingSoon ? "Phase 2" : isCatalog ? `${products.length} to choose from` : service.priceType === "from" || bookable ? service.unit : "on request"}</span>
          </span>
          {isCatalog && <span className="tag orange"><span className="dot" />{products.length} options</span>}
          {!isCatalog && singleOptions.length > 1 && <span className="tag orange"><span className="dot" />{singleOptions.length} options</span>}
          <span className="tag"><span className="dot" />{comingSoon ? "Phase 2 · coming soon" : "Care delivered at home"}</span>
          <div className="cta">
            {comingSoon ? (
              <button className="btn btn-primary btn-lg" type="button" disabled>Coming soon</button>
            ) : isCatalog ? (
              <>
                <a className="btn btn-primary btn-lg" href="#catalogue">{bookable ? "Choose a service" : "See options"}</a>
                <a className="btn btn-quiet btn-lg" href={COMPANY.whatsapp} target="_blank" rel="noreferrer">WhatsApp</a>
              </>
            ) : (
              <>
                <button className="btn btn-primary btn-lg" onClick={() => addSingle("checkout")} type="button">
                  {bookable ? "Book now" : "Enquire now"}
                </button>
                {bookable && (
                  <button className="btn btn-outline btn-lg" onClick={() => addSingle("stay")} type="button">Add to booking</button>
                )}
                <a className="btn btn-quiet btn-lg" href={COMPANY.whatsapp} target="_blank" rel="noreferrer">WhatsApp</a>
              </>
            )}
          </div>
        </div>
        <p className="muted" style={{ fontSize: 13, marginBottom: 20 }}>
          Card · Tabby · Pay on visit &nbsp;·&nbsp; Serving most of Dubai
        </p>
      </div>

      <div className="wrap detail">
        <main className={`panel${isCatalog ? " catalogue-panel" : ""}`}>
          {isCatalog ? (
            <div className="catalogue-banner">
              <span><Icon name={service.icon} size={24} /></span>
              <div><b>Guided service finder</b><small>Browse by care goal, then choose the right package.</small></div>
            </div>
          ) : (
            <Placeholder caption={service.photo ?? `Service photography - ${service.shortName}`} tone="orange" style={{ borderRadius: "var(--radius-md)", marginBottom: 26 }} />
          )}

          {isCatalog ? (
            <div id="catalogue" style={{ scrollMarginTop: 90 }}>
              <h2 className="blk">{bookable ? "Find your service" : "Explore your options"} <span style={{ color: "var(--text-muted)", fontWeight: 400 }}>· {products.length}</span></h2>
              <ProductCatalog service={service} products={products} canBook={bookable} />
              {addons.length > 0 && (
                <details className="addon-browser">
                  <summary><span><b>Looking for an individual test?</b><small>Browse and search {addons.length} optional add-on tests</small></span><span>View tests</span></summary>
                  <OptionPicker options={addons} />
                </details>
              )}
            </div>
          ) : singleOptions.length > 1 ? (
            <>
              <h2 className="blk">Choose an option <span style={{ color: "var(--text-muted)", fontWeight: 400 }}>· {singleOptions.length}</span></h2>
              <OptionPicker options={singleOptions} selectedIndex={bookable ? optIndex : undefined} onSelect={bookable ? setOptIndex : undefined} />
            </>
          ) : null}

          <h2 className="blk">What&rsquo;s included</h2>
          <ul className="inc">{service.includes.map((i) => <li key={i}>{i}</li>)}</ul>

          <h2 className="blk">How it works</h2>
          <ol className="how">{service.howItWorks.map((i) => <li key={i}>{i}</li>)}</ol>

          <h2 className="blk">Good to know</h2>
          <p className="muted" style={{ fontSize: 15 }}>
            Male and female clinicians available on request. Keep your Emirates ID and current
            medications handy. We issue claim-ready invoices, with direct billing for partner insurers.
          </p>

          <h2 className="blk">Frequently asked</h2>
          {service.faqs.map((f) => (
            <details key={f.q}><summary>{f.q}</summary><p>{f.a}</p></details>
          ))}
        </main>

        <aside className="aside">
          {isCatalog ? (
            <>
              <div className="lbl">Your booking</div>
              <div className="srow"><span>From</span><b>{priceMain}</b></div>
              <div className="srow"><span>In your booking</span><b>{count} item{count === 1 ? "" : "s"}</b></div>
              {count > 0 ? (
                <Link className="btn btn-primary btn-full" style={{ marginTop: 12 }} href="/checkout">Go to checkout</Link>
              ) : (
                <a className="btn btn-primary btn-full" style={{ marginTop: 12 }} href="#catalogue">Choose a service</a>
              )}
              <a className="btn btn-quiet btn-full" style={{ marginTop: 8 }} href={COMPANY.whatsapp} target="_blank" rel="noreferrer">Ask on WhatsApp</a>
            </>
          ) : comingSoon ? (
            <>
              <div className="lbl">Booking summary</div>
              <div className="srow"><span>Service</span><b>{service.shortName}</b></div>
              <div className="srow"><span>Status</span><b>Phase 2 · pending DHA/MOHAP</b></div>
              <button className="btn btn-primary btn-full" style={{ marginTop: 12 }} type="button" disabled>Coming soon</button>
              <p className="muted" style={{ textAlign: "center", fontSize: 12, marginTop: 8 }}>
                We&rsquo;ll open bookings once it&rsquo;s cleared. <a href={COMPANY.whatsapp} target="_blank" rel="noreferrer">Ask us on WhatsApp</a>.
              </p>
            </>
          ) : bookable ? (
            <>
              <div className="lbl">Book your appointment</div>
              <div className="srow"><span>Service</span><b>{option?.name ?? service.shortName}</b></div>
              <div className="srow"><span>Price</span><b>{priceMain}</b></div>
              <div className="field" style={{ marginTop: 12, marginBottom: 10 }}>
                <label>Appointment date</label>
                <input type="date" min={today} value={date} onChange={(e) => setDate(e.target.value)} />
              </div>
              <div className="field" style={{ marginBottom: 4 }}>
                <label>Preferred time</label>
                <input type="time" value={time} onChange={(e) => setTime(e.target.value)} />
              </div>
              <p className="muted" style={{ fontSize: 12, marginBottom: 8 }}>Selected: <b>{slotLabel}</b></p>
              {error && <p className="err" style={{ color: "var(--danger)", fontSize: 13, marginBottom: 8 }}>{error}</p>}
              <button className="btn btn-primary btn-full" onClick={() => addSingle("checkout")} type="button">Book now &amp; check out</button>
              <button className="btn btn-outline btn-full" style={{ marginTop: 8 }} onClick={() => addSingle("stay")} type="button">Add to booking</button>
            </>
          ) : (
            <>
              <div className="lbl">Booking summary</div>
              <div className="srow"><span>Service</span><b>{service.shortName}</b></div>
              <div className="srow"><span>Pricing</span><b>{priceMain}</b></div>
              <a className="btn btn-primary btn-full" style={{ marginTop: 12 }} href={COMPANY.whatsapp} target="_blank" rel="noreferrer">Enquire on WhatsApp</a>
            </>
          )}
          <p className="muted" style={{ textAlign: "center", fontSize: 12, marginTop: 10 }}>Card · Tabby · Pay on visit</p>
          <div className="truststrip">{COMPANY.dha} · MOHAP approved<br />Caring for Dubai homes since {COMPANY.since}</div>
        </aside>
      </div>

      {toast && (
        <div className="toast-live" role="status">
          <div className="toast">
            <div className="ic">
              <svg width="16" height="16" viewBox="0 0 24 24" style={{ stroke: "var(--green-600)", fill: "none", strokeWidth: 2 }}><path d="M5 12l5 5L20 6" /></svg>
            </div>
            <div>
              <div className="t">Added to your booking</div>
              <div className="s">
                {option?.name ?? service.shortName} · {slotLabel}
                <br />
                <Link href="/checkout">Check out</Link> · <Link href="/cart">View cart</Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
