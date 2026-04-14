export default function AIInsightsPage() {
  return (
    <div style={{ minHeight: "100vh", background: "#000", color: "#fff", padding: "120px 40px 80px", maxWidth: "900px", margin: "0 auto", fontFamily: "var(--font-body)" }}>
      <p style={{ fontFamily: "monospace", fontSize: "10px", color: "#10b981", letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: "16px" }}>Platform · AI Insights</p>
      <h1 style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "clamp(2rem, 4vw, 3rem)", marginBottom: "20px", letterSpacing: "-0.02em" }}>AI-Powered Intelligence</h1>
      <p style={{ fontSize: "16px", color: "rgba(255,255,255,0.6)", lineHeight: 1.8, maxWidth: "680px", marginBottom: "48px" }}>
        Our AI engine transforms raw compliance, emissions, and risk data into actionable intelligence — predicting threats, recommending controls, and surfacing patterns that human analysis alone would miss.
      </p>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "24px" }}>
        {[
          { title: "Predictive Risk Scoring", body: "Machine learning models trained on global threat data to predict emerging risks before they materialize." },
          { title: "Anomaly Detection", body: "Behavioral analytics surface unusual patterns in emissions data, access logs, and compliance posture." },
          { title: "Natural Language Reporting", body: "Generate board-ready compliance and ESG reports in seconds using AI-assisted narrative generation." },
          { title: "Smart Recommendations", body: "Context-aware control recommendations prioritized by your organization's unique risk profile and industry." },
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
