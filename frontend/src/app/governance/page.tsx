import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function GovernancePage() {
  return (
    <div style={{ minHeight: "100vh", color: "var(--text-primary)", padding: "120px 40px 80px", maxWidth: "1000px", margin: "0 auto", fontFamily: "var(--font-body)", position: "relative" }}>
      
      {/* Back Navigation */}
      <Link href="/" style={{ position: "absolute", top: "40px", left: "40px", display: "flex", alignItems: "center", gap: "8px", color: "var(--color-primary)", textDecoration: "none", fontSize: "13px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em" }} className="hover:opacity-70 transition-opacity">
        <ArrowLeft size={16} /> Back to Hub
      </Link>

      <p style={{ fontFamily: "monospace", fontSize: "11px", color: "var(--color-primary)", letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: "16px", fontWeight: 700 }}>Enterprise · Governance</p>
      <h1 className="text-depth-hero" style={{ fontSize: "clamp(2.5rem, 5vw, 4rem)", marginBottom: "24px", color: "#fff" }}>Governance Framework</h1>
      <p className="text-depth-body" style={{ fontSize: "17px", color: "var(--text-secondary)", lineHeight: 1.8, maxWidth: "720px", marginBottom: "56px" }}>
        Strong governance is the foundation of resilient organizations. Our governance module gives your board, executives, and compliance teams a single source of truth for policy, risk, and control status.
      </p>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "24px" }}>
        {[
          { title: "Policy Management", body: "Centralize all organizational policies with version control, approval workflows, and mandatory attestation tracking." },
          { title: "Board Reporting", body: "Automated board-level dashboards presenting risk posture, compliance status, and ESG performance in plain language." },
          { title: "Audit Management", body: "Schedule, conduct, and track internal and external audits with finding management and remediation oversight." },
          { title: "Three Lines Model", body: "Embed the Three Lines of Defence model into your GRC workflow for clear accountability and oversight." },
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
