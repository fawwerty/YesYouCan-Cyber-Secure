import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function AIInsightsPage() {
  return (
    <div style={{ minHeight: "100vh", color: "var(--text-primary)", padding: "120px 40px 80px", maxWidth: "1000px", margin: "0 auto", fontFamily: "var(--font-body)", position: "relative" }}>
      
      {/* Back Navigation */}
      <Link href="/" style={{ position: "absolute", top: "40px", left: "40px", display: "flex", alignItems: "center", gap: "8px", color: "var(--color-primary)", textDecoration: "none", fontSize: "13px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em" }} className="hover:opacity-70 transition-opacity">
        <ArrowLeft size={16} /> Hub
      </Link>

      <p style={{ fontFamily: "monospace", fontSize: "11px", color: "var(--color-primary)", letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: "16px", fontWeight: 700 }}>Platform · AI Insights</p>
      <h1 className="text-depth-hero" style={{ fontSize: "clamp(2.5rem, 5vw, 4rem)", marginBottom: "24px", color: "#fff" }}>AI-Powered Intelligence</h1>
      <p className="text-depth-body" style={{ fontSize: "17px", color: "var(--text-secondary)", lineHeight: 1.8, maxWidth: "720px", marginBottom: "56px" }}>
        Our AI engine transforms raw compliance, emissions, and risk data into actionable intelligence — predicting threats, recommending controls, and surfacing patterns that human analysis alone would miss.
      </p>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "24px" }}>
        {[
          { title: "Predictive Risk Scoring", body: "Machine learning models trained on global threat data to predict emerging risks before they materialize." },
          { title: "Anomaly Detection", body: "Behavioral analytics surface unusual patterns in emissions data, access logs, and compliance posture." },
          { title: "Natural Language Reporting", body: "Generate board-ready compliance and ESG reports in seconds using AI-assisted narrative generation." },
          { title: "Smart Recommendations", body: "Context-aware control recommendations prioritized by your organization's unique risk profile and industry." },
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
