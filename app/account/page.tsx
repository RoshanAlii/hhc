import type { Metadata } from "next";
import Link from "next/link";
import AccountNav from "@/components/AccountNav";
import Icon from "@/components/Icon";

export const metadata: Metadata = { title: "My account" };

export default function AccountPage() {
  return (
    <div className="wrap dash">
      <div>
        <span className="tag dark" style={{ marginBottom: 12 }}><span className="dot" />R2 preview</span>
        <div style={{ marginTop: 8 }}><AccountNav /></div>
      </div>
      <div>
        <h1 style={{ fontSize: 26, fontWeight: "var(--fw-extra)" }}>Good evening, Member</h1>
        <p className="muted" style={{ fontSize: 14, margin: "4px 0 20px" }}>Here&rsquo;s what&rsquo;s coming up.</p>
        <div className="kpi">
          <div className="k"><div className="n">1</div><div className="l">Upcoming visit</div></div>
          <div className="k"><div className="n">4</div><div className="l">Nurse hours left</div></div>
          <div className="k"><div className="n">2</div><div className="l">Results ready</div></div>
        </div>
        <div className="panel" style={{ paddingBlock: 12 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", paddingBlock: 8 }}>
            <b style={{ color: "var(--text-strong)" }}>Upcoming</b>
            <Link href="/account" style={{ fontSize: 13 }}>See all</Link>
          </div>
          <div className="brow">
            <div className="ic"><Icon name="calendar" size={17} /></div>
            <div style={{ flex: 1 }}><div className="t">Doctor visit · GP</div><div className="sub">Today · 6:00 PM · Oud Metha</div></div>
            <span className="tag"><span className="dot" />Confirmed</span>
            <Link className="btn btn-quiet btn-sm" href="/account">Track</Link>
          </div>
          <div className="brow">
            <div className="ic"><Icon name="wellness" size={17} /></div>
            <div style={{ flex: 1 }}><div className="t">IV Therapy · Hydration</div><div className="sub">Thu · 8:30 PM</div></div>
            <span className="tag orange"><span className="dot" />Pending</span>
            <Link className="btn btn-quiet btn-sm" href="/account">Manage</Link>
          </div>
          <div className="brow">
            <div className="ic"><Icon name="lab" size={17} /></div>
            <div style={{ flex: 1 }}><div className="t">Blood panel results</div><div className="sub">Ready to view</div></div>
            <span className="tag dark"><span className="dot" />New</span>
            <Link className="btn btn-quiet btn-sm" href="/account">View</Link>
          </div>
        </div>
        <div style={{ marginTop: 16, display: "flex", gap: 10 }}>
          <Link className="btn btn-primary" href="/services">Book a new visit</Link>
          <Link className="btn btn-outline" href="/services">Reorder last</Link>
        </div>
      </div>
    </div>
  );
}
