import type { Metadata } from "next";
import Link from "next/link";
import ContactForm from "@/components/ContactForm";
import { COMPANY } from "@/lib/data";

export const metadata: Metadata = {
  title: "Contact",
  description: "Talk to us — WhatsApp or call and a human answers during clinic hours, 8:30 AM – 6:30 PM daily.",
};

export default function ContactPage() {
  return (
    <>
      <header className="pagehd wrap">
        <span className="crumb"><Link href="/">Home</Link> / <b>Contact</b></span>
        <h1>Talk to us.</h1>
        <p>Fastest: WhatsApp or call — a human answers during clinic hours (8:30 AM – 6:30 PM daily).</p>
      </header>
      <div className="wrap detail" style={{ marginTop: 16 }}>
        <ContactForm />
        <aside className="aside">
          <div className="lbl">Direct</div>
          <div className="srow"><span>Call</span><b>{COMPANY.phoneLabel}</b></div>
          <div className="srow"><span>WhatsApp</span><b>{COMPANY.whatsappLabel}</b></div>
          <div className="srow"><span>Email</span><b>{COMPANY.email}</b></div>
          <div className="srow"><span>Office</span><b>{COMPANY.address}</b></div>
          <div className="imgph" style={{ height: 130, marginTop: 12 }}>Map</div>
        </aside>
      </div>
    </>
  );
}
