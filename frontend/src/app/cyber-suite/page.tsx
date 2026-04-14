export default function CyberSuitePage() {
  return (
    <div style={{ minHeight: "100vh", background: "#000", color: "#fff", padding: "120px 40px 80px", maxWidth: "900px", margin: "0 auto", fontFamily: "var(--font-body)" }}>
      <p style={{ fontFamily: "monospace", fontSize: "10px", color: "#10b981", letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: "16px" }}>Platform · Cyber Suite</p>
      <h1 style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "clamp(2rem, 4vw, 3rem)", marginBottom: "20px", letterSpacing: "-0.02em" }}>Enterprise Cyber Suite</h1>
      <p style={{ fontSize: "16px", color: "rgba(255,255,255,0.6)", lineHeight: 1.8, maxWidth: "680px", marginBottom: "48px" }}>
        A unified cybersecurity command center covering incident management, vulnerability assessment, compliance tracking, and advanced risk quantification — built for complex enterprise environments.
      </p>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "24px" }}>
        {[
          { title: "Incident Response", body: "Structured incident lifecycle management from detection through resolution, with regulatory notification tracking." },
          { title: "Vulnerability Management", body: "Continuous scanning and prioritized remediation workflows aligned to CVSS scoring and business impact." },
          { title: "GRC Automation", body: "Automate governance, risk, and compliance workflows mapped to ISO 27001, NIST CSF, SOC2, and GDPR." },
          { title: "Risk Quantification", body: "Financial quantification of cyber risk using FAIR methodology to support board-level decision making." },
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
