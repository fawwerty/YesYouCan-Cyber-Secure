export default function SolutionsPage() {
  return (
    <div style={{ minHeight: "100vh", background: "#000", color: "#fff", padding: "120px 40px 80px", maxWidth: "900px", margin: "0 auto", fontFamily: "var(--font-body)" }}>
      <p style={{ fontFamily: "monospace", fontSize: "10px", color: "#10b981", letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: "16px" }}>Enterprise · Solutions</p>
      <h1 style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "clamp(2rem, 4vw, 3rem)", marginBottom: "20px", letterSpacing: "-0.02em" }}>Enterprise Solutions</h1>
      <p style={{ fontSize: "16px", color: "rgba(255,255,255,0.6)", lineHeight: 1.8, maxWidth: "680px", marginBottom: "48px" }}>
        YesYouCan delivers purpose-built solutions for organizations navigating the intersection of cybersecurity, regulatory compliance, and sustainability. From SMEs to large enterprises, our platform scales with your ambition.
      </p>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "24px" }}>
        {[
          { title: "Financial Services", body: "Meet DORA, PCI DSS, and Basel IV requirements while managing your climate risk disclosures under TCFD." },
          { title: "Healthcare", body: "HIPAA-aligned incident management, data protection controls, and supply chain transparency for medical organizations." },
          { title: "Energy & Utilities", body: "Integrated Scope 1/2/3 emissions tracking alongside NERC CIP and NIS2 cybersecurity compliance." },
          { title: "Professional Services", body: "Multi-client GRC management, ISO 27001 certification support, and automated ESG reporting for consulting firms." },
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
