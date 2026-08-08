import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import ApplyForm from "@/components/ApplyForm";
import { jobs, getJob } from "@/lib/data";

export function generateStaticParams() {
  return jobs.map((j) => ({ slug: j.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const job = getJob(slug);
  return { title: job ? job.title : "Careers" };
}

export default async function JobPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const job = getJob(slug);
  if (!job) notFound();
  return (
    <>
      <header className="pagehd wrap">
        <span className="crumb"><Link href="/careers">Careers</Link> / <b>{job.title}</b></span>
        <h1>{job.title}</h1>
        <p>{job.type} · {job.location}</p>
      </header>
      <div className="wrap detail" style={{ marginTop: 16 }}>
        <main className="panel">
          <h2 className="blk">About the role</h2>
          <p className="muted" style={{ fontSize: 15 }}>{job.summary}</p>
          <h2 className="blk">What you&rsquo;ll do</h2>
          <ul className="inc">{job.responsibilities.map((r) => <li key={r}>{r}</li>)}</ul>
          <h2 className="blk">What we offer</h2>
          <p className="muted" style={{ fontSize: 15 }}>
            A DHA-licensed employer, structured training, real progression, and a team that celebrates its people.
          </p>
        </main>
        <ApplyForm role={job.title} />
      </div>
    </>
  );
}
