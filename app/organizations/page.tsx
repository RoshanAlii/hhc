import type { Metadata } from "next";
import Link from "next/link";
import OrgForm from "@/components/OrgForm";
import { COMPANY } from "@/lib/data";

export const metadata: Metadata = {
  title: "For organizations",
  description: "Corporate wellness days, on-site nurses, group vaccinations and travel medical support — one provider, one invoice.",
};

const tiles = [
  { t: "Corporate wellness days", d: "Screenings & IV bars at the office." },
  { t: "On-site nurse placement", d: "Events, sites and offices." },
  { t: "Group flu vaccination", d: "Seasonal drives, min. 3 staff." },
  { t: "Travel medical (groups)", d: "Medical support for delegations." },
];

export default function OrganizationsPage() {
  return (
    <>
      <header className="pagehd wrap">
        <span className="crumb"><Link href="/">Home</Link> / <b>For Organizations</b></span>
        <h1>Healthcare where your people are.</h1>
        <p>Corporate wellness days, on-site nurses, group vaccinations and travel medical support — one provider, one invoice.</p>
      </header>
      <div className="wrap">
        <div className="grid4" style={{ marginTop: 20 }}>
          {tiles.map((x) => (
            <div className="svc" style={{ minHeight: 150 }} key={x.t}>
              <h3 style={{ fontSize: 16 }}>{x.t}</h3>
              <p>{x.d}</p>
            </div>
          ))}
        </div>
        <div className="detail" style={{ paddingInline: 0, marginTop: 24 }}>
          <OrgForm />
          <aside className="aside">
            <div className="lbl">Prefer to talk?</div>
            <p className="muted" style={{ fontSize: 14 }}>Our business team replies within one working day.</p>
            <a className="btn btn-outline btn-full" style={{ marginTop: 12 }} href={COMPANY.phoneHref}>Request callback</a>
            <a className="btn btn-quiet btn-full" style={{ marginTop: 8 }} href={COMPANY.whatsapp} target="_blank" rel="noreferrer">WhatsApp business team</a>
          </aside>
        </div>
      </div>
    </>
  );
}
