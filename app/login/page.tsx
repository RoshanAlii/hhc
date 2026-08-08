import type { Metadata } from "next";
import Link from "next/link";
import { COMPANY } from "@/lib/data";

export const metadata: Metadata = { title: "Care portal", robots: { index: false, follow: false } };

export default function LoginPage() {
  return <div className="wrap portal-notice"><span className="premium-kicker dark"><span />Care portal</span><h1>Your secure care portal is being prepared.</h1><p>Online records and account access are not available on this website yet. Contact the HealthServe team directly for an appointment update, result or care document.</p><div className="inline-actions"><a className="btn btn-primary btn-lg" href={COMPANY.whatsapp} target="_blank" rel="noreferrer">Contact on WhatsApp</a><Link className="btn btn-quiet btn-lg" href="/contact">Other contact options</Link></div></div>;
}
