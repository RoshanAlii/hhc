"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { articles } from "@/lib/data";

const FILTERS = ["All", "Health guides", "News & press"] as const;

export default function JournalGrid() {
  const [filter, setFilter] = useState<(typeof FILTERS)[number]>("All");

  const visible = articles.filter((a) => {
    if (filter === "All") return true;
    if (filter === "Health guides") return a.category === "Health guide";
    return a.category === "News & press";
  });

  return (
    <div className="wrap">
      <div className="filters">
        {FILTERS.map((f) => (
          <button key={f} className={`chip${filter === f ? " on" : ""}`} onClick={() => setFilter(f)} type="button">{f}</button>
        ))}
        <span className="count">{articles.length} articles</span>
      </div>
      <div className="grid3" style={{ paddingBottom: 80 }}>
        {visible.map((a) => (
          <Link className="pcard" key={a.slug} href={`/journal/${a.slug}`}>
            <Image className="img" src={a.image!} width={760} height={440} alt={a.title} style={{ objectFit: "cover" }} />
            <div className="body">
              <span className={`tag${a.category === "News & press" ? " orange" : ""}`} style={{ alignSelf: "flex-start", marginBottom: 8 }}>
                <span className="dot" />{a.category}
              </span>
              <h3 style={{ fontSize: 16 }}>{a.title}</h3>
              <div className="foot" style={{ marginTop: "auto", paddingTop: 12, display: "flex", justifyContent: "space-between" }}>
                <span className="muted" style={{ fontSize: 12 }}>{a.readMins} min read</span>
                <span className="btn btn-quiet btn-sm">Read</span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
