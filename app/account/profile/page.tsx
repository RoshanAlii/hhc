import type { Metadata } from "next";
import Link from "next/link";
import Icon from "@/components/Icon";

export const metadata: Metadata = { title: "Profile" };

const health = [
  { icon: "doc", cat: "cat-nursing", t: "Health records", d: "Visit summaries and your care history, in one secure place." },
  { icon: "lab", cat: "cat-medical", t: "Lab results", d: "Results delivered to your phone, with a doctor review on request." },
  { icon: "heart", cat: "cat-therapy", t: "Care plans", d: "Chronic and recovery plans, tracked with your care team." },
  { icon: "bell", cat: "cat-medical", t: "Medication reminders", d: "Gentle nudges so you never miss a dose or a refill." },
  { icon: "user", cat: "cat-nursing", t: "Family profiles", d: "Manage care for parents and children from one account." },
  { icon: "calendar", cat: "cat-therapy", t: "Checkup reminders", d: "Timely prompts for screenings, panels and vaccinations." },
];

export default function ProfilePage() {
  return (
    <div className="wrap" style={{ paddingBlock: 40, maxWidth: 1000 }}>
      <span className="tag dark" style={{ marginBottom: 16 }}><span className="dot" />R2 preview</span>
      <h1 style={{ fontSize: 26, fontWeight: "var(--fw-extra)", marginBottom: 20 }}>Profile</h1>
      <div className="grid2">
        <div className="panel">
          <div className="lbl">Personal details</div>
          <div className="field"><label>Full name</label><input defaultValue="Member" /></div>
          <div className="field"><label>Mobile</label><input defaultValue="+971 •• ••• 4291 · verified" /></div>
          <div className="field"><label>Email</label><input placeholder="you@example.com" /></div>
          <div className="field"><label>Date of birth</label><input placeholder="DD / MM / YYYY" /></div>
          <button className="btn btn-primary btn-sm" type="button">Save changes</button>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <div className="panel">
            <div className="lbl">Saved addresses</div>
            <div className="pay"><span>Home · Oud Metha, Villa —</span><a href="#" style={{ fontSize: 13 }}>Edit</a></div>
            <div className="pay"><span>Office · DIFC —</span><a href="#" style={{ fontSize: 13 }}>Edit</a></div>
            <button className="btn btn-quiet btn-sm" style={{ marginTop: 8 }} type="button">+ Add address</button>
          </div>
          <div className="panel">
            <div className="lbl">Preferences</div>
            <div className="srow"><span>WhatsApp updates</span><span className="tag"><span className="dot" />On</span></div>
            <div className="srow"><span>Language</span><b>English · العربية</b></div>
          </div>
        </div>
      </div>

      {/* Your health — moved here from the Your Health page */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", margin: "40px 0 4px", gap: 12, flexWrap: "wrap" }}>
        <h2 className="sec" style={{ fontSize: 22 }}>Your health</h2>
        <Link href="/your-health" style={{ fontSize: 13 }}>Health tools &amp; calculators →</Link>
      </div>
      <p className="muted" style={{ fontSize: 14, marginBottom: 16 }}>Your records, results, care plans and reminders — all in one secure place.</p>
      <div className="grid3">
        {health.map((x) => (
          <article className="svc" style={{ minHeight: 0 }} key={x.t}>
            <span className={`ic ${x.cat}`}><Icon name={x.icon} /></span>
            <h3 style={{ fontSize: 17 }}>{x.t}</h3>
            <p>{x.d}</p>
          </article>
        ))}
      </div>
    </div>
  );
}
