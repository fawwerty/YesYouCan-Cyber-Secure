import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function CyberSuitePage() {
  return (
    <div style={{ minHeight: "100vh", color: "var(--text-primary)", padding: "120px 40px 80px", maxWidth: "1000px", margin: "0 auto", fontFamily: "var(--font-body)", position: "relative" }}>
      
      {/* Back Navigation */}
      <Link href="/" style={{ position: "absolute", top: "40px", left: "40px", display: "flex", alignItems: "center", gap: "8px", color: "var(--color-primary)", textDecoration: "none", fontSize: "13px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em" }} className="hover:opacity-70 transition-opacity">
        <ArrowLeft size={16} /> Hub
      </Link>

      <p style={{ fontFamily: "monospace", fontSize: "11px", color: "var(--color-primary)", letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: "16px", fontWeight: 700 }}>Platform · Cyber Suite</p>
      <h1 className="text-depth-hero" style={{ fontSize: "clamp(2.5rem, 5vw, 4rem)", marginBottom: "24px", color: "#fff" }}>Enterprise Cyber Suite</h1>
      <p className="text-depth-body" style={{ fontSize: "17px", color: "var(--text-secondary)", lineHeight: 1.8, maxWidth: "720px", marginBottom: "56px" }}>
        A unified cybersecurity command center covering incident management, vulnerability assessment, compliance tracking, and advanced risk quantification — built for complex enterprise environments.
      </p>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "24px" }}>
        {[
          { title: "Incident Response", body: "Structured incident lifecycle management from detection through resolution, with regulatory notification tracking." },
          { title: "Vulnerability Management", body: "Continuous scanning and prioritized remediation workflows aligned to CVSS scoring and business impact." },
          { title: "GRC Automation", body: "Automate governance, risk, and compliance workflows mapped to ISO 27001, NIST CSF, SOC2, and GDPR." },
          { title: "Risk Quantification", body: "Financial quantification of cyber risk using FAIR methodology to support board-level decision making." },
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
