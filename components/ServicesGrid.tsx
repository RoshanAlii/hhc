"use client";

import Link from "next/link";
import Icon from "@/components/Icon";
import { useState } from "react";
import Placeholder from "@/components/Placeholder";
import { serviceList, priceLabel, type Category } from "@/lib/data";

const toneFor = (c: Category): "orange" | "green" | "red" =>
  c === "Medical" ? "orange" : c === "Nursing & care" ? "green" : "red";

const FILTERS: ("All" | Category)[] = ["All", "Medical", "Nursing & care", "Therapy & wellness"];

export default function ServicesGrid() {
  const [filter, setFilter] = useState<(typeof FILTERS)[number]>("All");

  const featured = serviceList.find((s) => s.featured)!;
  const rest = serviceList.filter((s) => !s.featured);

  const matches = (cat: Category) => filter === "All" || filter === cat;
  const showFeatured = matches(featured.category);
  const visibleRest = rest.filter((s) => matches(s.category));
  const count = (showFeatured ? 1 : 0) + visibleRest.length;

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
            <Placeholder caption={featured.photo} tone={toneFor(featured.category)} />
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
            <Placeholder caption={s.photo} tone={toneFor(s.category)} />
            <div className="body">
              <h3 style={{ fontSize: 17 }}>{s.name}</h3>
              <p className="muted" style={{ fontSize: 14, marginTop: 4 }}>{s.blurb}</p>
              <div className="foot" style={{ marginTop: "auto", paddingTop: 14, borderTop: "1px solid var(--border-subtle)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span className="price">{priceLabel(s)}<small>{s.priceType === "from" ? s.unit : "quote"}</small></span>
                <span className="btn btn-quiet btn-sm">{s.cta === "book" ? "Book" : <>Explore <Icon name="arrow" size={13} /></>}</span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
