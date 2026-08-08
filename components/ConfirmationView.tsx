import Link from "next/link";
import { COMPANY } from "@/lib/data";

export default function ConfirmationView() {
  return (
    <div className="wrap portal-notice">
      <span className="premium-kicker dark"><span />Booking confirmation</span>
      <h1>Confirmations come from our care team.</h1>
      <p>This website does not create a booking or take payment by itself. A visit is confirmed only when HealthServe sends you the appointment details directly.</p>
      <div className="inline-actions"><a className="btn btn-primary btn-lg" href={COMPANY.whatsapp} target="_blank" rel="noreferrer">Check on WhatsApp</a><Link className="btn btn-quiet btn-lg" href="/services">Browse care</Link></div>
    </div>
  );
}
