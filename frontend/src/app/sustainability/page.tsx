import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function SustainabilityPage() {
  return (
    <div style={{ minHeight: "100vh", color: "var(--text-primary)", padding: "120px 40px 80px", maxWidth: "1000px", margin: "0 auto", fontFamily: "var(--font-body)", position: "relative" }}>
      
      {/* Back Navigation */}
      <Link href="/" style={{ position: "absolute", top: "40px", left: "40px", display: "flex", alignItems: "center", gap: "8px", color: "var(--color-primary)", textDecoration: "none", fontSize: "13px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em" }} className="hover:opacity-70 transition-opacity">
        <ArrowLeft size={16} /> Hub
      </Link>

      <p style={{ fontFamily: "monospace", fontSize: "11px", color: "var(--color-primary)", letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: "16px", fontWeight: 700 }}>Enterprise · Sustainability</p>
      <h1 className="text-depth-hero" style={{ fontSize: "clamp(2.5rem, 5vw, 4rem)", marginBottom: "24px", color: "#fff" }}>Sustainability Intelligence</h1>
      <p className="text-depth-body" style={{ fontSize: "17px", color: "var(--text-secondary)", lineHeight: 1.8, maxWidth: "720px", marginBottom: "56px" }}>
        Sustainability is no longer optional — it's a strategic imperative. YesYouCan provides the measurement, reporting, and improvement tools to make your sustainability journey credible, auditable, and impactful.
      </p>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "24px" }}>
        {[
          { title: "Carbon Accounting", body: "Automated Scope 1, 2, and 3 GHG emissions tracking with emission factors and data verification workflows." },
          { title: "ESG Reporting", body: "Produce GRI, TCFD, SASB, and CDP-aligned reports with audit trails that satisfy investor and regulator scrutiny." },
          { title: "Net Zero Pathways", body: "Model decarbonization scenarios and track progress against your 2030 and 2050 net-zero commitments." },
          { title: "Supplier Sustainability", body: "Assess and score your supply chain's environmental and social performance to address Scope 3 emissions at source." },
        ].map(card => (
          <div key={card.title} className="glass-surface" style={{ borderRadius: "16px", padding: "32px" }}>
            <h3 style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "18px", marginBottom: "12px", color: "var(--text-primary)" }}>{card.title}</h3>
            <p style={{ fontSize: "14px", color: "var(--text-secondary)", lineHeight: 1.7, fontWeight: 500 }}>{card.body}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
