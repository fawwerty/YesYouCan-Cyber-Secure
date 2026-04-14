export default function InfrastructurePage() {
  return (
    <div style={{ minHeight: "100vh", background: "#000", color: "#fff", padding: "120px 40px 80px", maxWidth: "900px", margin: "0 auto", fontFamily: "var(--font-body)" }}>
      <p style={{ fontFamily: "monospace", fontSize: "10px", color: "#10b981", letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: "16px" }}>Platform · Infrastructure</p>
      <h1 style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "clamp(2rem, 4vw, 3rem)", marginBottom: "20px", letterSpacing: "-0.02em" }}>Secure Infrastructure Management</h1>
      <p style={{ fontSize: "16px", color: "rgba(255,255,255,0.6)", lineHeight: 1.8, maxWidth: "680px", marginBottom: "48px" }}>
        YesYouCan's infrastructure layer provides enterprise-grade visibility into your entire IT landscape — from cloud workloads to on-premise assets — with continuous monitoring, automated policy enforcement, and real-time threat intelligence.
      </p>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "24px" }}>
        {[
          { title: "Asset Discovery", body: "Automatically discover and catalog all infrastructure assets across cloud, hybrid, and on-premise environments." },
          { title: "Continuous Monitoring", body: "24/7 monitoring with AI-driven anomaly detection, alerting you to configuration drifts and vulnerabilities instantly." },
          { title: "Policy Enforcement", body: "Define and enforce security baselines across your infrastructure with automated remediation workflows." },
          { title: "Threat Intelligence", body: "Real-time threat feeds integrated with your asset inventory to prioritize risks based on exploitability and impact." },
        ].map(card => (
          <div key={card.title} style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "12px", padding: "24px" }}>
            <h3 style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "16px", marginBottom: "10px" }}>{card.title}</h3>
            <p style={{ fontSize: "13px", color: "rgba(255,255,255,0.5)", lineHeight: 1.7 }}>{card.body}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
