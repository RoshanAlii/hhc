import type { Metadata } from "next";
import Link from "next/link";
import Icon from "@/components/Icon";
import { jobs } from "@/lib/data";

export const metadata: Metadata = {
  title: "Careers",
  description: "Do meaningful work in people's homes. DHA-licensed employer with a clinical training program, caring for Dubai since 2016.",
};

export default function CareersPage() {
  return (
    <>
      <header className="pagehd wrap">
        <span className="crumb"><Link href="/">Home</Link> / <b>Careers</b></span>
        <h1>Do meaningful work, in people&rsquo;s homes.</h1>
        <p>DHA-licensed employer · clinical training program · caring for Dubai since 2016.</p>
      </header>
      <div className="wrap">
        <div className="grid2" style={{ marginTop: 20 }}>
          <div className="imgph" style={{ minHeight: 200 }}>Team culture photo</div>
          <div className="panel">
            <h2 className="blk">Why HealthServe</h2>
            <p className="muted" style={{ fontSize: 15 }}>
              Structured clinical and soft-skills training, real career progression, and a team that
              celebrates its people — from talent shows to service awards.
            </p>
          </div>
        </div>
        <h2 className="blk" style={{ marginTop: 32 }}>Open roles</h2>
        <div className="panel" style={{ paddingBlock: 8, marginBottom: 60 }}>
          {jobs.map((j) => (
            <div className="brow" key={j.slug}>
              <div className="ic"><Icon name="user" size={17} /></div>
              <div style={{ flex: 1 }}>
                <div className="t">{j.title}</div>
                <div className="sub">{j.type} · {j.location}</div>
              </div>
              <Link className="btn btn-quiet btn-sm" href={`/careers/${j.slug}`}>View &amp; apply</Link>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
