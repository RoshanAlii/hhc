import type { Metadata } from "next";
import Link from "next/link";
import { COMPANY } from "@/lib/data";

export const metadata: Metadata = { title: "Website terms" };

export default function TermsPage() {
  return (
    <div className="wrap legal-document">
      <span className="crumb"><Link href="/">Home</Link> / Legal / <b>Terms</b></span>
      <h1>Website terms</h1>
      <p className="legal-updated">Last reviewed 8 August 2026 · {COMPANY.name}</p>
      <section><h2>Information, not emergency care</h2><p>This website helps you explore and request home healthcare. It is not an emergency service and does not replace an individual clinical assessment. If someone may be experiencing a medical emergency, contact the appropriate UAE emergency service immediately.</p></section>
      <section><h2>Care requests and confirmation</h2><p>Submitting or sending a care request does not create a confirmed appointment. A booking exists only after HealthServe confirms the service, location, timing, clinical suitability and final charges directly with you.</p></section>
      <section><h2>Prices and availability</h2><p>Displayed prices are starting estimates unless stated otherwise. Final pricing, VAT, inclusions and availability are confirmed before care is booked.</p></section>
      <section><h2>Clinical content</h2><p>Service descriptions and journal content are general information. Treatment decisions are made with an appropriately qualified professional after assessment.</p></section>
      <section><h2>Acceptable use</h2><p>Do not misuse the website, attempt unauthorised access, submit unlawful content or interfere with the site’s operation.</p></section>
      <section><h2>Privacy and cancellations</h2><p>How information is handled is explained in our <Link href="/privacy">Privacy Policy</Link>. Confirmed appointment changes are subject to our <Link href="/cancellation">Cancellation &amp; Refund Policy</Link>.</p></section>
      <section><h2>Contact</h2><p>Questions about these terms can be sent to <a href={`mailto:${COMPANY.email}`}>{COMPANY.email}</a> or discussed by calling <a href={COMPANY.phoneHref}>{COMPANY.phoneLabel}</a>.</p></section>
    </div>
  );
}
