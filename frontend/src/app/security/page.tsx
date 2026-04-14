import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function SecurityPage() {
  return (
    <div style={{ minHeight: "100vh", color: "var(--text-primary)", padding: "120px 40px 80px", maxWidth: "1000px", margin: "0 auto", fontFamily: "var(--font-body)", position: "relative" }}>
      
      {/* Back Navigation */}
      <Link href="/" style={{ position: "absolute", top: "40px", left: "40px", display: "flex", alignItems: "center", gap: "8px", color: "var(--color-primary)", textDecoration: "none", fontSize: "13px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em" }} className="hover:opacity-70 transition-opacity">
        <ArrowLeft size={16} /> Hub
      </Link>

      <p style={{ fontFamily: "monospace", fontSize: "11px", color: "var(--color-primary)", letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: "16px", fontWeight: 700 }}>Enterprise · Security</p>
      <h1 className="text-depth-hero" style={{ fontSize: "clamp(2.5rem, 5vw, 4rem)", marginBottom: "24px", color: "#fff" }}>Security First</h1>
      <p className="text-depth-body" style={{ fontSize: "17px", color: "rgba(255,255,255,0.7)", lineHeight: 1.8, maxWidth: "720px", marginBottom: "56px" }}>
        YesYouCan is built on a zero-trust security architecture. Every feature, every data point, and every integration is designed with security as a first principle — not an afterthought.
      </p>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "24px" }}>
        {[
          { title: "Zero Trust Architecture", body: "No implicit trust. Every access request is verified, every session is monitored, every action is logged." },
          { title: "Data Encryption", body: "AES-256 encryption at rest and in transit. Your data is yours — isolated per tenant, never commingled." },
          { title: "Access Controls", body: "Role-based access control (RBAC) with fine-grained permissions, MFA enforcement, and SSO integration." },
          { title: "Audit Logging", body: "Immutable audit trails for every action taken within the platform, meeting SOC2 and ISO 27001 requirements." },
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
