import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ServiceDetailClient from "@/components/ServiceDetailClient";
import { services, getService } from "@/lib/data";

export function generateStaticParams() {
  return services.filter((service) => !service.phase2).map((service) => ({ slug: service.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const service = getService(slug);
  if (!service || service.phase2) return { title: "Service", robots: { index: false, follow: false } };
  return { title: service.name, description: service.heroBlurb };
}

export default async function ServiceDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const service = getService(slug);
  if (!service || service.phase2) notFound();
  return (
    <div className="has-mbar-page">
      <ServiceDetailClient service={service} />
    </div>
  );
}
