"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useMemo, useRef, useState } from "react";
import Icon from "@/components/Icon";
import { searchSite } from "@/lib/siteSearch";

export default function NavSearch() {
  const router = useRouter();
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);
  const results = useMemo(() => searchSite(query), [query]);

  function reveal(focus = false) {
    setOpen(true);
    if (focus) window.setTimeout(() => inputRef.current?.focus(), 0);
  }

  function close() {
    setOpen(false);
    setActiveIndex(0);
  }

  function choose(index: number) {
    const result = results[index];
    if (!result) return;
    close();
    setQuery("");
    router.push(result.href);
  }

  function onKeyDown(event: React.KeyboardEvent<HTMLInputElement>) {
    if (event.key === "ArrowDown") {
      event.preventDefault();
      setActiveIndex((index) => Math.min(index + 1, Math.max(results.length - 1, 0)));
    } else if (event.key === "ArrowUp") {
      event.preventDefault();
      setActiveIndex((index) => Math.max(index - 1, 0));
    } else if (event.key === "Enter" && results.length) {
      event.preventDefault();
      choose(activeIndex);
    } else if (event.key === "Escape") {
      event.preventDefault();
      close();
      inputRef.current?.blur();
    }
  }

  return (
    <div
      className={`nav-search${open ? " open" : ""}`}
      ref={containerRef}
      onMouseEnter={() => reveal(false)}
      onMouseLeave={() => {
        if (!containerRef.current?.contains(document.activeElement)) close();
      }}
      onFocusCapture={() => reveal(false)}
      onBlurCapture={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget as Node | null)) close();
      }}
    >
      <button className="nav-search-trigger" type="button" aria-label="Search HealthServe" aria-expanded={open} aria-controls="nav-search-panel" onClick={() => open ? close() : reveal(true)}>
        <Icon name="search" size={18} />
      </button>
      {open && (
        <div className="nav-search-panel" id="nav-search-panel">
          <div className="nav-search-field">
            <Icon name="search" size={18} />
            <input
              ref={inputRef}
              value={query}
              onChange={(event) => { setQuery(event.target.value); setActiveIndex(0); }}
              onKeyDown={onKeyDown}
              placeholder="Search services, treatments, tests…"
              aria-label="Search services, treatments and articles"
              role="combobox"
              aria-autocomplete="list"
              aria-expanded={open}
              aria-controls="nav-search-results"
              aria-activedescendant={results[activeIndex] ? `nav-result-${results[activeIndex].id}` : undefined}
              autoComplete="off"
            />
            {query && <button className="nav-search-clear" type="button" aria-label="Clear search" onClick={() => { setQuery(""); inputRef.current?.focus(); }}>×</button>}
          </div>

          {!query.trim() ? (
            <div className="nav-search-hint">Try “physiotherapy”, “blood test”, “baby nurse” or a treatment name.</div>
          ) : results.length ? (
            <div className="nav-search-results" id="nav-search-results" role="listbox" aria-label="Search results">
              {results.map((result, index) => (
                <Link
                  id={`nav-result-${result.id}`}
                  className={`nav-search-result${activeIndex === index ? " active" : ""}`}
                  href={result.href}
                  key={result.id}
                  role="option"
                  aria-selected={activeIndex === index}
                  onMouseEnter={() => setActiveIndex(index)}
                  onClick={() => { close(); setQuery(""); }}
                >
                  <span className="nav-search-result-icon"><Icon name={result.icon} size={17} /></span>
                  <span><b>{result.title}</b><small>{result.section} · {result.description}</small></span>
                  <Icon name="arrow" size={15} />
                </Link>
              ))}
              <div className="nav-search-count">{results.length} best result{results.length === 1 ? "" : "s"} · exact, partial and similar matching</div>
            </div>
          ) : (
            <div className="nav-search-empty"><b>No close match found.</b><span>Try fewer words or search “All Services”.</span><Link href="/services" onClick={() => { close(); setQuery(""); }}>Browse all services</Link></div>
          )}
        </div>
      )}
    </div>
  );
}
