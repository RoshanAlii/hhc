import type { Metadata } from "next";
import Link from "next/link";
import PackagesGrid from "@/components/PackagesGrid";

export const metadata: Metadata = {
  title: "Care plans",
  description: "Explore coordinated recovery, nursing and preventive-health plans tailored by the HealthServe care team.",
};

export default function PackagesPage() {
  return (
    <>
      <header className="pagehd wrap">
        <span className="crumb"><Link href="/">Home</Link> / <b>Care plans</b></span>
        <h1>Care that adapts over time.</h1>
        <p>Explore common starting points for ongoing support. Your exact services, visit schedule and price are confirmed only after the care team understands what you need.</p>
      </header>
      <div className="wrap" style={{ paddingBottom: 80 }}>
        <PackagesGrid />
        <div className="policy-note" style={{ marginTop: 24, maxWidth: 760 }}>These are care-plan pathways, not pre-priced bundles. HealthServe confirms the individual services, clinical suitability, schedule and final charges with you before care begins.</div>
      </div>
    </>
  );
}
