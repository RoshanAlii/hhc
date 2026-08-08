import Link from "next/link";
import ServiceVisual from "@/components/ServiceVisual";

export default function PackagesGrid() {
  const plans = [
    { name: "Recovery care plan", tagline: "After surgery, injury or hospital discharge", icon: "physio", tone: "copper" as const, features: ["Care needs reviewed with you", "Physiotherapy and nursing coordinated where appropriate", "Visit frequency tailored to the recovery plan"], href: "/services/physiotherapy" },
    { name: "Ongoing nursing plan", tagline: "For longer or recurring support at home", icon: "nursing", tone: "forest" as const, features: ["Focused visits or longer nursing shifts", "Continuity preferences discussed before care", "Family and treating-team coordination where needed"], href: "/services/home-nursing" },
    { name: "Preventive health plan", tagline: "For scheduled checks and follow-up", icon: "lab", tone: "plum" as const, features: ["Home sample collection options", "Profiles selected around the health goal", "Clinical review arranged where appropriate"], href: "/services/lab-tests" },
  ];

  return (
    <div className="grid3" style={{ marginTop: 32 }}>
      {plans.map((plan) => (
        <div className="pkg" key={plan.name}>
          <ServiceVisual icon={plan.icon} eyebrow="Tailored care" title={plan.name} tone={plan.tone} />
          <h3 style={{ marginTop: 20 }}>{plan.name}</h3>
          <p className="muted" style={{ fontSize: 13 }}>{plan.tagline}</p>
          <ul>{plan.features.map((feature) => <li key={feature}>{feature}</li>)}</ul>
          <Link className="btn btn-outline btn-full" style={{ marginTop: "auto" }} href={plan.href}>Explore related care</Link>
        </div>
      ))}
    </div>
  );
}
