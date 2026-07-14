import type { Metadata } from "next";
import Link from "next/link";
import Icon from "@/components/Icon";

export const metadata: Metadata = {
  title: "Your Health — records, results & care plans",
  description:
    "Every visit summary, lab result and care plan in one secure place — with reminders that keep you and your family on track.",
};

const items = [
  { icon: "doc", cat: "cat-nursing", t: "Health records", d: "Visit summaries and your care history, organised in one secure place." },
  { icon: "lab", cat: "cat-medical", t: "Lab results", d: "Results delivered to your phone, with a doctor review on request." },
  { icon: "heart", cat: "cat-therapy", t: "Care plans", d: "Chronic and recovery plans, tracked together with your care team." },
  { icon: "bell", cat: "cat-medical", t: "Medication reminders", d: "Gentle nudges so you never miss a dose or a refill." },
  { icon: "user", cat: "cat-nursing", t: "Family profiles", d: "Manage care for parents and children from one account." },
  { icon: "calendar", cat: "cat-therapy", t: "Checkup reminders", d: "Timely prompts for screenings, panels and vaccinations." },
];

export default function YourHealthPage() {
  return (
    <>
      <header className="pagehd wrap warmtop">
        <span className="crumb"><Link href="/">Home</Link> / <b>Your Health</b></span>
        <span className="tag" style={{ marginTop: 10 }}><span className="dot" />Account feature · in preview</span>
        <h1>Your health, all in one place.</h1>
        <p>Every visit summary, lab result and care plan — organised, secure, and always with you. So the next appointment always picks up where the last one left off.</p>
      </header>

      <div className="wrap">
        <div className="grid3" style={{ marginTop: 12 }}>
          {items.map((x) => (
            <article className="svc" key={x.t}>
              <span className={`ic ${x.cat}`}><Icon name={x.icon} /></span>
              <h3>{x.t}</h3>
              <p>{x.d}</p>
            </article>
          ))}
        </div>

        <div className="grid2" style={{ marginTop: 32, alignItems: "start" }}>
          <div className="panel">
            <h2 className="blk">Built around you</h2>
            <ul className="inc">
              <li>One secure profile for your whole family</li>
              <li>Results and summaries shared straight to your phone</li>
              <li>Care plans visible to you and your treating team</li>
              <li>Health data handled under UAE health-data law, never sold</li>
            </ul>
            <h2 className="blk">Preview snapshot</h2>
            <div className="kpi" style={{ marginBottom: 0 }}>
              <div className="k"><div className="n">1</div><div className="l">Upcoming visit</div></div>
              <div className="k"><div className="n">4</div><div className="l">Nurse hours left</div></div>
              <div className="k"><div className="n">2</div><div className="l">Results ready</div></div>
            </div>
          </div>
          <aside className="aside" style={{ position: "static" }}>
            <div className="lbl">Start your health profile</div>
            <p className="muted" style={{ fontSize: 14 }}>Log in with your mobile — no passwords. Your profile is created automatically after your first booking.</p>
            <Link className="btn btn-primary btn-full" style={{ marginTop: 12 }} href="/login">Log in / register</Link>
            <Link className="btn btn-quiet btn-full" style={{ marginTop: 8 }} href="/account">See the dashboard</Link>
            <p className="muted" style={{ textAlign: "center", fontSize: 12, marginTop: 10 }}>
              Read our <Link href="/privacy">privacy &amp; consent</Link> approach
            </p>
          </aside>
        </div>
      </div>

      <section className="wrap" style={{ paddingBlock: "8px 64px" }}>
        <div className="ctaband">
          <div className="txt">
            <h2>Care that remembers you.</h2>
            <p>Book your first visit and your health profile builds itself — records, results and reminders, all in one place.</p>
          </div>
          <div className="actions">
            <Link className="btn btn-white btn-lg" href="/services">Book a visit</Link>
            <Link className="btn btn-clear btn-lg" href="/login">Log in</Link>
          </div>
        </div>
      </section>
    </>
  );
}
