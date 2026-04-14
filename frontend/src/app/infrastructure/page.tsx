import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function InfrastructurePage() {
  return (
    <div style={{ minHeight: "100vh", color: "var(--text-primary)", padding: "120px 40px 80px", maxWidth: "1000px", margin: "0 auto", fontFamily: "var(--font-body)", position: "relative" }}>
      
      {/* Back Navigation */}
      <Link href="/" style={{ position: "absolute", top: "40px", left: "40px", display: "flex", alignItems: "center", gap: "8px", color: "var(--color-primary)", textDecoration: "none", fontSize: "13px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em" }} className="hover:opacity-70 transition-opacity">
        <ArrowLeft size={16} /> Back to Hub
      </Link>

      <p style={{ fontFamily: "monospace", fontSize: "11px", color: "var(--color-primary)", letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: "16px", fontWeight: 700 }}>Platform · Infrastructure</p>
      <h1 className="text-depth-hero" style={{ fontSize: "clamp(2.5rem, 5vw, 4rem)", marginBottom: "24px", color: "#fff" }}>Secure Infrastructure Management</h1>
      <p className="text-depth-body" style={{ fontSize: "17px", color: "var(--text-secondary)", lineHeight: 1.8, maxWidth: "720px", marginBottom: "56px" }}>
        YesYouCan's infrastructure layer provides enterprise-grade visibility into your entire IT landscape — from cloud workloads to on-premise assets — with continuous monitoring, automated policy enforcement, and real-time threat intelligence.
      </p>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "24px" }}>
        {[
          { title: "Asset Discovery", body: "Automatically discover and catalog all infrastructure assets across cloud, hybrid, and on-premise environments." },
          { title: "Continuous Monitoring", body: "24/7 monitoring with AI-driven anomaly detection, alerting you to configuration drifts and vulnerabilities instantly." },
          { title: "Policy Enforcement", body: "Define and enforce security baselines across your infrastructure with automated remediation workflows." },
          { title: "Threat Intelligence", body: "Real-time threat feeds integrated with your asset inventory to prioritize risks based on exploitability and impact." },
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
