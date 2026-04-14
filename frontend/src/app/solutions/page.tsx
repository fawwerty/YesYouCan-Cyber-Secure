import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function SolutionsPage() {
  return (
    <div style={{ minHeight: "100vh", color: "var(--text-primary)", padding: "120px 40px 80px", maxWidth: "1000px", margin: "0 auto", fontFamily: "var(--font-body)", position: "relative" }}>
      
      {/* Back Navigation */}
      <Link href="/" style={{ position: "absolute", top: "40px", left: "40px", display: "flex", alignItems: "center", gap: "8px", color: "var(--color-primary)", textDecoration: "none", fontSize: "13px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em" }} className="hover:opacity-70 transition-opacity">
        <ArrowLeft size={16} /> Hub
      </Link>

      <p style={{ fontFamily: "monospace", fontSize: "11px", color: "var(--color-primary)", letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: "16px", fontWeight: 700 }}>Enterprise · Solutions</p>
      <h1 className="text-depth-hero" style={{ fontSize: "clamp(2.5rem, 5vw, 4rem)", marginBottom: "24px", color: "#fff" }}>Enterprise Solutions</h1>
      <p className="text-depth-body" style={{ fontSize: "17px", color: "rgba(255,255,255,0.7)", lineHeight: 1.8, maxWidth: "720px", marginBottom: "56px" }}>
        YesYouCan delivers purpose-built solutions for organizations navigating the intersection of cybersecurity, regulatory compliance, and sustainability. From SMEs to large enterprises, our platform scales with your ambition.
      </p>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "24px" }}>
        {[
          { title: "Financial Services", body: "Meet DORA, PCI DSS, and Basel IV requirements while managing your climate risk disclosures under TCFD." },
          { title: "Healthcare", body: "HIPAA-aligned incident management, data protection controls, and supply chain transparency for medical organizations." },
          { title: "Energy & Utilities", body: "Integrated Scope 1/2/3 emissions tracking alongside NERC CIP and NIS2 cybersecurity compliance." },
          { title: "Professional Services", body: "Multi-client GRC management, ISO 27001 certification support, and automated ESG reporting for consulting firms." },
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
