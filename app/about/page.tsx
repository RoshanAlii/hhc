import type { Metadata } from "next";
import Link from "next/link";
import { COMPANY } from "@/lib/data";

export const metadata: Metadata = {
  title: "About us",
  description: "Founded in 2016, HealthServe brings hospital-grade care into Dubai homes with the standards of a licensed facility and the warmth of a house call.",
};

export default function AboutPage() {
  return (
    <>
      <header className="pagehd wrap">
        <span className="crumb"><Link href="/">Home</Link> / <b>About</b></span>
        <h1>Care built on a decade in Dubai homes.</h1>
        <p>Founded in {COMPANY.since} by clinical and health-management professionals who saw the gap between hospital care and home reality.</p>
      </header>
      <div className="wrap">
        <div className="grid2" style={{ marginTop: 24 }}>
          <div className="imgph" style={{ minHeight: 260 }}>Care photography — team</div>
          <div className="panel">
            <h2 className="blk">Our story</h2>
            <p className="muted" style={{ fontSize: 15 }}>
              Since {COMPANY.since} our doctors, nurses and physiotherapists have brought hospital-grade care into
              thousands of Dubai homes — with the standards of a licensed facility and the warmth of a house call.
            </p>
            <h2 className="blk">Our standards</h2>
            <ul className="inc">
              <li>Every clinician DHA-licensed and reference-checked</li>
              <li>Continuous clinical &amp; soft-skills training since 2022</li>
              <li>Care plans reported to your treating physician</li>
            </ul>
          </div>
        </div>
        <div className="band" style={{ marginTop: 24 }}>
          <div className="stat"><div className="big">DHA</div><div className="lb">FL-0064861 · licensed facility</div></div>
          <div className="stat"><div className="big">MOHAP</div><div className="lb">ZM0ETT1A-090224</div></div>
          <div className="stat"><div className="big">10 yrs</div><div className="lb">In Dubai homes</div></div>
          <div className="stat"><div className="big">4.9 ★</div><div className="lb">Google rating</div></div>
        </div>
        <h2 className="blk" style={{ marginTop: 40 }}>Partners &amp; insurance</h2>
        <div className="insurers" style={{ marginBottom: 60 }}>
          <span>ESAAD</span><span>Al Sanad</span><span>Al Saada</span><span>Saico</span><span>Almadallah</span>
          <span>As featured in Khaleej Times</span>
        </div>
      </div>
    </>
  );
}
