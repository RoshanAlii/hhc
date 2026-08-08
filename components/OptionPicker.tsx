"use client";

import { useMemo, useState } from "react";
import { formatAED } from "@/lib/data";
import { customerOptionLabel, customerProductName, type ServiceOption } from "@/lib/variants";

// A selectable list of purchasable options. Adds a search box + count when the
// list is long (lab panels, IV drips, etc.). Selectable when `onSelect` given;
// otherwise renders as a read-only price list (for enquiry services).
export default function OptionPicker({
  options,
  selectedIndex,
  onSelect,
}: {
  options: ServiceOption[];
  selectedIndex?: number;
  onSelect?: (index: number) => void;
}) {
  const [q, setQ] = useState("");
  const [showAll, setShowAll] = useState(false);

  const indexed = useMemo(() => options.map((o, i) => ({ o, i })), [options]);
  const filtered = useMemo(() => {
    const term = q.trim().toLowerCase();
    if (!term) return indexed;
    return indexed.filter(({ o }) => (customerProductName(o.name) + " " + (customerOptionLabel(o.label) ?? "")).toLowerCase().includes(term));
  }, [indexed, q]);

  const searchable = options.length > 10;
  const capped = !showAll && !q && filtered.length > 14 ? filtered.slice(0, 14) : filtered;

  return (
    <div className="optpicker">
      {searchable && (
        <div className="optsearch">
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder={`Search ${options.length} options…`}
            aria-label="Search options"
          />
          <span className="optcount">{filtered.length}</span>
        </div>
      )}
      <div className="optlist" role={onSelect ? "radiogroup" : undefined}>
        {capped.map(({ o, i }) => {
          const on = selectedIndex === i;
          const inner = (
            <>
              <span className="optname">
                {customerProductName(o.name)}
                {o.label ? <span className="optlabel"> · {customerOptionLabel(o.label)}</span> : null}
              </span>
              <span className="optprice">
                {formatAED(o.price)}
                {o.mrp && o.mrp > o.price ? <s>{formatAED(o.mrp)}</s> : null}
              </span>
            </>
          );
          return onSelect ? (
            <button key={i} type="button" className={`optrow${on ? " on" : ""}`} onClick={() => onSelect(i)} role="radio" aria-checked={on}>
              {inner}
            </button>
          ) : (
            <div key={i} className="optrow">{inner}</div>
          );
        })}
      </div>
      {!showAll && !q && filtered.length > 14 && (
        <button type="button" className="linkbtn" style={{ marginTop: 8, fontSize: 13 }} onClick={() => setShowAll(true)}>
          Show all {filtered.length} options
        </button>
      )}
    </div>
  );
}
