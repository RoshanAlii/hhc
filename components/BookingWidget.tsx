"use client";

import { useRouter } from "next/navigation";
import { useRef, useState } from "react";
import { flushSync } from "react-dom";
import { coreServiceList } from "@/lib/data";

const EMIRATES = ["Dubai", "Abu Dhabi", "Sharjah", "Ajman", "Umm Al Quwain", "Ras Al Khaimah", "Fujairah"];

export default function BookingWidget() {
  const router = useRouter();
  const [service, setService] = useState("");
  const [when, setWhen] = useState("Today");
  const [customDate, setCustomDate] = useState("");
  const [area, setArea] = useState("Dubai");
  const dateRef = useRef<HTMLInputElement>(null);

  function openCalendar() {
    const calendar = dateRef.current;
    if (!calendar) return;
    calendar.focus({ preventScroll: true });
    try {
      calendar.showPicker?.();
    } catch {
      // Focusing the native date field is the fallback on browsers that do not expose showPicker.
    }
  }

  function changeWhen(value: string) {
    if (value !== "Choose a date") {
      setWhen(value);
      return;
    }
    flushSync(() => setWhen(value));
    openCalendar();
  }

  function seeTimes() {
    if (when === "Choose a date" && !customDate) {
      openCalendar();
      return;
    }
    if (service) {
      const params = new URLSearchParams({ when: customDate || when, area });
      router.push(`/services/${service}?${params.toString()}`);
    } else {
      router.push("/services");
    }
  }

  return (
      <div className="book" role="group" aria-label="Book a visit">
        <div className="f">
          <label htmlFor="bw-service">Service</label>
          <select id="bw-service" value={service} onChange={(e) => setService(e.target.value)}>
            <option value="">Choose</option>
            {coreServiceList.map((s) => (
              <option key={s.slug} value={s.slug}>{s.shortName}</option>
            ))}
          </select>
        </div>
        <div className="f">
          <label htmlFor="bw-when">When</label>
          <select id="bw-when" value={when} onChange={(e) => changeWhen(e.target.value)}>
            <option>Today</option>
            <option>Tomorrow</option>
            <option>Day after tomorrow</option>
            <option>Choose date</option>
          </select>
        </div>
        {when === "Choose a date" && (
          <div className="f bw-date-field">
            <label htmlFor="bw-date">Date</label>
            <input ref={dateRef} id="bw-date" type="date" value={customDate} onChange={(e) => setCustomDate(e.target.value)} />
          </div>
        )}
        <div className="f">
          <label htmlFor="bw-area">Emirate</label>
          <select id="bw-area" value={area} onChange={(e) => setArea(e.target.value)}>
            {EMIRATES.map((emirate) => <option key={emirate}>{emirate}</option>)}
          </select>
        </div>
        <button type="button" className="btn btn-primary" onClick={seeTimes}>
          See available times
        </button>
      </div>
  );
}
