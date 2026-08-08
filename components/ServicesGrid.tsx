"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import Icon from "@/components/Icon";
import ServiceVisual from "@/components/ServiceVisual";
import { homeServiceList, type Category } from "@/lib/data";
import { LAB_GROUPS, NURSING_PATHS, PHYSIO_GROUPS, SPECIALIST_PATHS, type CarePath } from "@/lib/taxonomy";

const toneFor = (category: Category): "forest" | "copper" | "plum" =>
  category === "Medical" ? "copper" : category === "Nursing & care" ? "forest" : "plum";

const physioPaths: CarePath[] = PHYSIO_GROUPS.map((group) => ({
  id: group.id,
  name: group.name,
  description: group.description,
  href: `/services/physiotherapy/#${group.id}`,
  icon: "physio",
}));

const labPaths: CarePath[] = LAB_GROUPS.map((group) => ({
  id: group.id,
  name: group.name,
  description: group.description,
  href: `/services/lab-tests/#${group.id}`,
  icon: "lab",
}));

function PathGrid({ paths, query }: { paths: CarePath[]; query: string }) {
  const visible = paths.filter((path) => `${path.name} ${path.description}`.toLowerCase().includes(query));
  if (!visible.length) return null;
  return (
    <div className="care-path-grid">
      {visible.map((path) => (
        <Link href={path.href} key={path.id}>
          <span><Icon name={path.icon} size={21} /></span>
          <div><h3>{path.name}</h3><p>{path.description}</p></div>
          <Icon name="arrow" size={15} />
        </Link>
      ))}
    </div>
  );
}

export default function ServicesGrid() {
  const [search, setSearch] = useState("");
  const query = search.trim().toLowerCase();
  const primary = useMemo(
    () => homeServiceList.filter((service) => `${service.name} ${service.blurb}`.toLowerCase().includes(query)),
    [query],
  );

  const sections = [
    { id: "nursing-care", eyebrow: "Nursing & daily care", title: "Support for a visit, a recovery or every day.", copy: "Choose focused clinical support, longer nursing coverage or ongoing family care.", paths: NURSING_PATHS },
    { id: "physiotherapy", eyebrow: "Physiotherapy & rehabilitation", title: "Six focused paths—not one overwhelming list.", copy: "Start with the type of recovery you need, then select the individual treatment and session plan.", paths: physioPaths },
    { id: "diagnostics", eyebrow: "Diagnostics & preventive health", title: "Find tests by health goal.", copy: "Browse clinically meaningful groups instead of scanning dozens of laboratory names.", paths: labPaths },
    { id: "specialist", eyebrow: "Specialist & organisational care", title: "Additional ways we support patients and teams.", copy: "Telehealth, focused health pathways, travel support and workplace care.", paths: SPECIALIST_PATHS },
  ];

  const hasSecondary = sections.some((section) => section.paths.some((path) => `${path.name} ${path.description}`.toLowerCase().includes(query)));

  return (
    <div className="wrap services-directory">
      <div className="directory-search">
        <Icon name="search" size={20} />
        <label htmlFor="care-search" className="sr-only">Search services and care pathways</label>
        <input id="care-search" value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search a service, symptom or care need" />
        <span>{query ? "Filtered results" : "30+ care pathways"}</span>
      </div>

      {primary.length > 0 && (
        <section className="directory-section" aria-labelledby="primary-services-title">
          <div className="directory-heading">
            <span className="kicker">Most requested</span>
            <h2 id="primary-services-title">Primary home care</h2>
            <p>Seven clear starting points for the services families request most often.</p>
          </div>
          <div className="directory-primary-grid">
            {primary.map((service, index) => (
              <Link href={`/services/${service.slug}`} key={service.slug}>
                <ServiceVisual icon={service.icon} eyebrow={`0${index + 1}`} title={service.shortName} tone={toneFor(service.category)} />
                <div><h3>{service.shortName}</h3><p>{service.blurb}</p><span>Explore care <Icon name="arrow" size={14} /></span></div>
              </Link>
            ))}
          </div>
        </section>
      )}

      {sections.map((section) => {
        const matches = section.paths.some((path) => `${path.name} ${path.description}`.toLowerCase().includes(query));
        if (!matches) return null;
        return (
          <section className="directory-section" id={section.id} key={section.id} aria-labelledby={`${section.id}-title`}>
            <div className="directory-heading split">
              <div><span className="kicker">{section.eyebrow}</span><h2 id={`${section.id}-title`}>{section.title}</h2></div>
              <p>{section.copy}</p>
            </div>
            <PathGrid paths={section.paths} query={query} />
          </section>
        );
      })}

      {!primary.length && !hasSecondary && (
        <div className="directory-empty" role="status">
          <h2>No exact match yet</h2>
          <p>Tell our care team what you need and we will guide you to the right service.</p>
          <Link className="btn btn-primary" href="/contact">Ask the care team</Link>
        </div>
      )}

      <section className="directory-dispensary">
        <div><span className="kicker light">The Dispensary</span><h2>IV, NAD+, injections, vaccinations and diagnostics.</h2></div>
        <Link className="btn btn-white btn-lg" href="/dispensary">Explore wellness care <Icon name="arrow" size={16} /></Link>
      </section>
    </div>
  );
}
