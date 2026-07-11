"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useCart } from "@/lib/cart";
import { COMPANY, formatAED, type Service } from "@/lib/data";

export default function ServiceDetailClient({ service }: { service: Service }) {
  const router = useRouter();
  const { addItem } = useCart();
  const [variantId, setVariantId] = useState(service.variants?.[0]?.id ?? "");
  const [toast, setToast] = useState(false);

  const variant = service.variants?.find((v) => v.id === variantId);
  const activePrice = variant?.price ?? service.price;
  const bookable = activePrice != null && service.priceType !== "enquire" && service.priceType !== "program";

  const priceMain = bookable
    ? (service.priceType === "from" && !variant ? "from " : "") + formatAED(activePrice!)
    : service.priceType === "program"
      ? "Program"
      : "Enquire";

  function addToBooking(goToCart: boolean) {
    if (!bookable) {
      window.open(COMPANY.whatsapp, "_blank");
      return;
    }
    addItem({
      key: `${service.slug}:${variantId || "std"}`,
      slug: service.slug,
      name: service.name,
      meta: [variant?.name, service.nextSlot].filter(Boolean).join(" · "),
      price: activePrice!,
      kind: "service",
    });
    if (goToCart) {
      router.push("/cart");
    } else {
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
            <span className="s">{service.priceType === "from" || bookable ? service.unit : service.priceType === "program" ? "tailored program" : "on request"}</span>
          </span>
          {service.variants && (
            <div className="seg" role="group" aria-label="Options">
              {service.variants.map((v) => (
                <button key={v.id} className={variantId === v.id ? "on" : ""} onClick={() => setVariantId(v.id)} type="button">
                  {v.name}
                </button>
              ))}
            </div>
          )}
          <span className="tag"><span className="dot" />Next: {service.nextSlot}</span>
          <div className="cta">
            <button className="btn btn-primary btn-lg" onClick={() => addToBooking(true)} type="button">
              {bookable ? "See available times" : "Enquire now"}
            </button>
            <a className="btn btn-quiet btn-lg" href={COMPANY.whatsapp} target="_blank" rel="noreferrer">WhatsApp</a>
          </div>
        </div>
        <p className="muted" style={{ fontSize: 13, marginBottom: 20 }}>
          Card · Tabby · Pay on visit &nbsp;·&nbsp; Serving most of Dubai
        </p>
      </div>

      <div className="wrap detail">
        <main className="panel">
          <div className="imgph" style={{ height: 220, marginBottom: 26 }}>Service photography — {service.shortName}</div>

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
          <div className="lbl">Booking summary</div>
          <div className="srow"><span>Service</span><b>{variant?.name ?? service.shortName}</b></div>
          <div className="srow"><span>{bookable ? "Price" : "Pricing"}</span><b>{priceMain}</b></div>
          <div className="srow"><span>Next slot</span><b>{service.nextSlot}</b></div>
          {bookable ? (
            <>
              <button className="btn btn-primary btn-full" style={{ marginTop: 12 }} onClick={() => addToBooking(false)} type="button">
                Add to booking
              </button>
              <button className="btn btn-outline btn-full" style={{ marginTop: 8 }} onClick={() => addToBooking(true)} type="button">
                See available times
              </button>
            </>
          ) : (
            <a className="btn btn-primary btn-full" style={{ marginTop: 12 }} href={COMPANY.whatsapp} target="_blank" rel="noreferrer">
              Enquire on WhatsApp
            </a>
          )}
          <p className="muted" style={{ textAlign: "center", fontSize: 12, marginTop: 10 }}>Card · Tabby · Pay on visit</p>
          <div className="truststrip">{COMPANY.dha} · MOHAP approved<br />Caring for Dubai homes since {COMPANY.since}</div>
        </aside>
      </div>

      <div className="mbar">
        <span className="p"><b>{priceMain}</b> · {variant?.name ?? service.shortName}</span>
        <button className="btn" onClick={() => addToBooking(true)} type="button">{bookable ? "See times" : "Enquire"}</button>
      </div>

      {toast && (
        <div className="toast-live" role="status">
          <div className="toast">
            <div className="ic">
              <svg width="16" height="16" viewBox="0 0 24 24" style={{ stroke: "var(--green-600)", fill: "none", strokeWidth: 2 }}><path d="M5 12l5 5L20 6" /></svg>
            </div>
            <div>
              <div className="t">Added to your booking</div>
              <div className="s">{variant?.name ?? service.shortName} · <Link href="/cart">View cart →</Link></div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
