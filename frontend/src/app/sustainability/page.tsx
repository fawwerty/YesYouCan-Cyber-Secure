export default function SustainabilityPage() {
  return (
    <div style={{ minHeight: "100vh", background: "#000", color: "#fff", padding: "120px 40px 80px", maxWidth: "900px", margin: "0 auto", fontFamily: "var(--font-body)" }}>
      <p style={{ fontFamily: "monospace", fontSize: "10px", color: "#10b981", letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: "16px" }}>Enterprise · Sustainability</p>
      <h1 style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "clamp(2rem, 4vw, 3rem)", marginBottom: "20px", letterSpacing: "-0.02em" }}>Sustainability Intelligence</h1>
      <p style={{ fontSize: "16px", color: "rgba(255,255,255,0.6)", lineHeight: 1.8, maxWidth: "680px", marginBottom: "48px" }}>
        Sustainability is no longer optional — it's a strategic imperative. YesYouCan provides the measurement, reporting, and improvement tools to make your sustainability journey credible, auditable, and impactful.
      </p>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "24px" }}>
        {[
          { title: "Carbon Accounting", body: "Automated Scope 1, 2, and 3 GHG emissions tracking with emission factors and data verification workflows." },
          { title: "ESG Reporting", body: "Produce GRI, TCFD, SASB, and CDP-aligned reports with audit trails that satisfy investor and regulator scrutiny." },
          { title: "Net Zero Pathways", body: "Model decarbonization scenarios and track progress against your 2030 and 2050 net-zero commitments." },
          { title: "Supplier Sustainability", body: "Assess and score your supply chain's environmental and social performance to address Scope 3 emissions at source." },
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
