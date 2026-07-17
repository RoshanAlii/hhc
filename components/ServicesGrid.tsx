"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { coreServiceList, priceLabel, type Category } from "@/lib/data";

const FILTERS: ("All" | Category)[] = ["All", "Medical", "Nursing & care", "Therapy & wellness"];

export default function ServicesGrid() {
  const [filter, setFilter] = useState<(typeof FILTERS)[number]>("All");

  const featured = coreServiceList.find((s) => s.featured)!;
  const rest = coreServiceList.filter((s) => !s.featured);

  const matches = (cat: Category) => filter === "All" || filter === cat;
  const showFeatured = matches(featured.category);
  const visibleRest = rest.filter((s) => matches(s.category));
  const showWellness = filter === "All" || filter === "Therapy & wellness";
  const count = (showFeatured ? 1 : 0) + visibleRest.length + (showWellness ? 1 : 0);

  return (
    <div className="wrap">
      <div className="filters">
        {FILTERS.map((f) => (
          <button key={f} className={`chip${filter === f ? " on" : ""}`} onClick={() => setFilter(f)} type="button">
            {f}
          </button>
        ))}
        <span className="count">{count} services · serving Dubai</span>
      </div>

      <div className="grid3" style={{ paddingBottom: 80 }}>
        {showFeatured && (
          <Link className="pcard feature" href={`/services/${featured.slug}`}>
            <Image className="img" src={featured.image!} width={640} height={360} alt={featured.name} style={{ objectFit: "cover" }} />
            <div className="body">
              <span className="tag orange" style={{ alignSelf: "flex-start" }}><span className="dot" />Most booked</span>
              <h3 style={{ fontSize: 24, fontWeight: "var(--fw-extra)", marginTop: 10 }}>{featured.name}</h3>
              <p className="muted" style={{ marginTop: 8, maxWidth: "44ch" }}>{featured.blurb}</p>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 22 }}>
                <span className="price">{priceLabel(featured)}<small>{featured.unit} · next: {featured.nextSlot}</small></span>
                <span className="btn btn-primary">View &amp; book</span>
              </div>
            </div>
          </Link>
        )}

        {visibleRest.map((s) => (
          <Link className="pcard" key={s.slug} href={`/services/${s.slug}`}>
            <Image className="img" src={s.image!} width={640} height={360} alt={s.shortName} style={{ objectFit: "cover" }} />
            <div className="body">
              <h3 style={{ fontSize: 17 }}>{s.name}</h3>
              <p className="muted" style={{ fontSize: 14, marginTop: 4 }}>{s.blurb}</p>
              <div className="foot" style={{ marginTop: "auto", paddingTop: 14, borderTop: "1px solid var(--border-subtle)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span className="price">{priceLabel(s)}<small>{s.priceType === "from" ? s.unit : s.priceType === "program" ? "tailored" : "quote"}</small></span>
                <span className="btn btn-quiet btn-sm">{s.priceType === "enquire" ? "Explore →" : "Book"}</span>
              </div>
            </div>
          </Link>
        ))}

        {showWellness && (
          <Link className="pcard" href="/services/wellness">
            <div className="imgph img">Wellness &amp; IV</div>
            <div className="body">
              <h3 style={{ fontSize: 17 }}>Wellness services</h3>
              <p className="muted" style={{ fontSize: 14, marginTop: 4 }}>IV drips, NAD+, panels — 8 sub-services.</p>
              <div className="foot" style={{ marginTop: "auto", paddingTop: 14, borderTop: "1px solid var(--border-subtle)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span className="price">from AED 150<small>8 services</small></span>
                <span className="btn btn-quiet btn-sm">Explore →</span>
              </div>
            </div>
          </Link>
        )}
      </div>
    </div>
  );
}
