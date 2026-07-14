import type { Metadata } from "next";
import Link from "next/link";
import HealthTools from "@/components/HealthTools";

export const metadata: Metadata = {
  title: "Your Health — free health tools & calculators",
  description:
    "Handy health calculators — BMI, daily calories, healthy weight range, water intake, waist-to-height ratio and heart-rate zones. Quick, private and free.",
};

export default function YourHealthPage() {
  return (
    <>
      <header className="pagehd wrap warmtop">
        <span className="crumb"><Link href="/">Home</Link> / <b>Your Health</b></span>
        <span className="tag" style={{ marginTop: 10 }}><span className="dot" />Free tools · nothing to sign up for</span>
        <h1>Little tools for a healthier you.</h1>
        <p>Quick, private health calculators you can use right now — no login, nothing stored. For a full picture, book a check-up with one of our clinicians.</p>
      </header>

      <div className="wrap" style={{ paddingBottom: 24 }}>
        <HealthTools />

        <div className="policy-note" style={{ marginTop: 20 }}>
          These tools are for general guidance only and aren&rsquo;t a medical diagnosis. For advice tailored to
          you, <Link href="/services/doctor-visit">book a doctor visit</Link> or speak to our team.
        </div>
      </div>

      <section className="wrap" style={{ paddingBlock: "8px 64px" }}>
        <div className="ctaband">
          <div className="txt">
            <h2>Want the full picture?</h2>
            <p>Book a home health check — panels, vitals and a doctor review, all without leaving your door.</p>
          </div>
          <div className="actions">
            <Link className="btn btn-white btn-lg" href="/services/lab-tests">Book a health check</Link>
            <Link className="btn btn-clear btn-lg" href="/account/profile">Your health records</Link>
          </div>
        </div>
      </section>
    </>
  );
}
