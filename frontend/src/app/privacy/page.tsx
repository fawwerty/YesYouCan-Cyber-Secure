export default function PrivacyPolicyPage() {
  return (
    <div style={{ minHeight: "100vh", background: "#000", color: "#fff", padding: "120px 40px 80px", maxWidth: "800px", margin: "0 auto", fontFamily: "var(--font-body)" }}>
      <p style={{ fontFamily: "monospace", fontSize: "10px", color: "#10b981", letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: "16px" }}>Legal</p>
      <h1 style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "clamp(2rem, 4vw, 3rem)", marginBottom: "12px", letterSpacing: "-0.02em" }}>Privacy Policy</h1>
      <p style={{ fontSize: "13px", color: "rgba(255,255,255,0.35)", marginBottom: "40px", fontFamily: "monospace" }}>Effective: 1 January 2025 · Last updated: 14 April 2025</p>
      {[
        { heading: "1. Who We Are", body: "YesYouCan Cyber Secure (\"we\", \"our\", or \"us\") is a cybersecurity, governance, risk, compliance, and ESG intelligence platform operated by YesYouCan Cyber Secure Ltd. Our registered address and contact details are available upon request at privacy@yesyoucan.com." },
        { heading: "2. Data We Collect", body: "We collect information you provide directly (account registration details, organizational data, compliance inputs), data generated through platform use (audit logs, emissions entries, risk records), and technical data (IP addresses, browser type, access timestamps). We do not sell personal data to third parties." },
        { heading: "3. How We Use Your Data", body: "Your data is used exclusively to deliver the YesYouCan platform services, improve platform performance, comply with legal obligations, and send service-critical communications. We do not process your data for advertising purposes." },
        { heading: "4. Data Security", body: "We implement AES-256 encryption at rest and in transit, multi-factor authentication, zero-trust network access, and continuous security monitoring. Data is isolated per tenant and never commingled across organizations." },
        { heading: "5. Data Retention", body: "Personal data is retained for the duration of your subscription plus a maximum of 90 days post-termination, unless a longer period is required by law. You may request deletion at any time by contacting privacy@yesyoucan.com." },
        { heading: "6. Your Rights", body: "Under GDPR and applicable data protection laws, you have the right to access, rectify, erase, restrict, and port your data. To exercise these rights, contact us at privacy@yesyoucan.com. We respond within 30 days." },
        { heading: "7. Changes to This Policy", body: "We may update this policy from time to time. Material changes will be notified via the platform at least 14 days before taking effect." },
      ].map(section => (
        <div key={section.heading} style={{ marginBottom: "32px" }}>
          <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "17px", marginBottom: "10px", color: "#fff" }}>{section.heading}</h2>
          <p style={{ fontSize: "14px", color: "rgba(255,255,255,0.55)", lineHeight: 1.8 }}>{section.body}</p>
        </div>
      ))}
    </div>
  );
}
