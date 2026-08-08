import type { Metadata } from "next";
import Link from "next/link";
import { COMPANY } from "@/lib/data";

export const metadata: Metadata = { title: "Cancellation & refund" };

export default function CancellationPage() {
  return (
    <>
      <header className="pagehd wrap">
        <span className="crumb">Home / Legal / <b>Cancellation &amp; Refund</b></span>
        <h1>Changes to confirmed care.</h1>
        <p>Contact the care team as early as possible if your plans change.</p>
      </header>
      <div className="wrap" style={{ paddingBottom: 60 }}>
        <div className="panel" style={{ marginTop: 20 }}>
          <h2 className="blk">Before an appointment is confirmed</h2>
          <p className="muted" style={{ fontSize: 14 }}>This website does not take payment or create a confirmed booking. You can change a draft care request before sending it to HealthServe.</p>
          <h2 className="blk">After confirmation</h2>
          <p className="muted" style={{ fontSize: 14 }}>Reply to the confirmation message or call the care team. Any cancellation fee, refund eligibility and time-sensitive condition that applies to your service should be stated in the confirmation you receive directly from HealthServe.</p>
          <h2 className="blk">Refund timing</h2>
          <p className="muted" style={{ fontSize: 14 }}>Where a refund is due, processing time depends on the payment method and provider. The care team will explain the expected timing for your transaction.</p>
          <div style={{ marginTop: 16, display: "flex", gap: 10 }}>
            <a className="btn btn-primary" href={COMPANY.whatsapp} target="_blank" rel="noreferrer">Contact the care team</a>
            <Link className="btn btn-quiet" href="/help">Help centre</Link>
          </div>
        </div>
      </div>
    </>
  );
}
