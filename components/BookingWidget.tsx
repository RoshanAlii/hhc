"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { coreServiceList } from "@/lib/data";

// Only services with a real price can be booked directly; program/enquire
// services (e.g. chronic disease, travel medical) go through enquiry instead.
const bookable = coreServiceList.filter((s) => s.price != null);

export default function BookingWidget() {
  const router = useRouter();
  const [service, setService] = useState("");
  const [when, setWhen] = useState("Today");
  const [area, setArea] = useState("Address");

  function seeTimes() {
    if (service) {
      router.push(`/services/${service}?when=${encodeURIComponent(when)}`);
    } else {
      router.push("/services");
    }
  }

  return (
    <>
      <div className="book" role="group" aria-label="Book a visit">
        <div className="f">
          <label htmlFor="bw-service">Service</label>
          <select id="bw-service" value={service} onChange={(e) => setService(e.target.value)}>
            <option value="">Choose</option>
            {bookable.map((s) => (
              <option key={s.slug} value={s.slug}>{s.shortName}</option>
            ))}
          </select>
        </div>
        <div className="f">
          <label htmlFor="bw-when">When</label>
          <select id="bw-when" value={when} onChange={(e) => setWhen(e.target.value)}>
            <option>Today</option>
            <option>Tomorrow</option>
            <option>Choose date</option>
          </select>
        </div>
        <div className="f">
          <label htmlFor="bw-area">Area</label>
          <select id="bw-area" value={area} onChange={(e) => setArea(e.target.value)}>
            <option>Address</option>
            <option>Oud Metha</option>
            <option>Downtown</option>
            <option>Marina</option>
            <option>Business Bay</option>
            <option>JVC</option>
          </select>
        </div>
        <button type="button" className="btn btn-primary" onClick={seeTimes}>
          See available times
        </button>
      </div>
      <p className="avail">
        <span className="dot" /> Next availability: today 6:00 PM · serves most of Dubai
      </p>
    </>
  );
}
