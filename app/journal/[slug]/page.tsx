import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { articles, getArticle, getService, COMPANY } from "@/lib/data";

export function generateStaticParams() {
  return articles.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const a = getArticle(slug);
  return a ? { title: a.title, description: a.excerpt } : { title: "Journal" };
}

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) notFound();
  const related = article.relatedServiceSlug ? getService(article.relatedServiceSlug) : undefined;

  return (
    <div className="wrap" style={{ maxWidth: 760, paddingBlock: 48 }}>
      <span className="crumb">
        <Link href="/journal">Journal</Link> / {article.category} / <b>{article.title}</b>
      </span>
      <h1 style={{ fontSize: "clamp(28px,3.4vw,40px)", fontWeight: "var(--fw-extra)", margin: "14px 0 10px" }}>{article.title}</h1>
      <p className="muted" style={{ fontSize: 13, marginBottom: 18 }}>
        Reviewed by HealthServe clinical team · {article.readMins} min read
      </p>
      <div className="imgph" style={{ height: 240, marginBottom: 24 }}>Article hero photo</div>

      {article.body.map((p, i) => (
        <p className="muted" key={i} style={{ fontSize: 16, marginBottom: 14 }}>{p}</p>
      ))}

      {related && (
        <div className="band" style={{ marginTop: 36 }}>
          <div style={{ flex: 1, minWidth: 220 }}>
            <div className="lbl">Related service</div>
            <b style={{ fontSize: 18, color: "var(--text-strong)" }}>{related.name}</b>
            <p className="muted" style={{ fontSize: 13, marginTop: 4 }}>{related.blurb}</p>
          </div>
          <Link className="btn btn-primary" href={`/services/${related.slug}`}>See available times</Link>
          <a className="btn btn-quiet" href={COMPANY.whatsapp} target="_blank" rel="noreferrer">WhatsApp</a>
        </div>
      )}
    </div>
  );
}
