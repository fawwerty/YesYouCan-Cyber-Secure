export default function TermsOfServicePage() {
  return (
    <div style={{ minHeight: "100vh", background: "#000", color: "#fff", padding: "120px 40px 80px", maxWidth: "800px", margin: "0 auto", fontFamily: "var(--font-body)" }}>
      <p style={{ fontFamily: "monospace", fontSize: "10px", color: "#10b981", letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: "16px" }}>Legal</p>
      <h1 style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "clamp(2rem, 4vw, 3rem)", marginBottom: "12px", letterSpacing: "-0.02em" }}>Terms of Service</h1>
      <p style={{ fontSize: "13px", color: "rgba(255,255,255,0.35)", marginBottom: "40px", fontFamily: "monospace" }}>Effective: 1 January 2025 · Last updated: 14 April 2025</p>
      {[
        { heading: "1. Acceptance of Terms", body: "By accessing or using the YesYouCan Cyber Secure platform (\"Platform\"), you agree to be bound by these Terms of Service. If you do not agree, do not use the Platform." },
        { heading: "2. Platform License", body: "We grant you a limited, non-exclusive, non-transferable license to access and use the Platform for your internal business purposes during the subscription term. All rights not expressly granted are reserved." },
        { heading: "3. User Obligations", body: "You are responsible for maintaining the confidentiality of your account credentials, ensuring all users comply with these Terms, and providing accurate information. You must not use the Platform for unlawful purposes." },
        { heading: "4. Data Ownership", body: "You retain full ownership of all data you input into the Platform. We act as a data processor under GDPR. We do not claim any rights over your organizational data." },
        { heading: "5. Service Availability", body: "We target 99.9% uptime (excluding scheduled maintenance). In the event of outages, we will communicate status via our status page and email. Planned maintenance is scheduled outside business hours." },
        { heading: "6. Fees and Payment", body: "Subscription fees are invoiced in advance on a monthly or annual basis. Overdue payments may result in service suspension after a 14-day grace period. All fees are exclusive of applicable taxes." },
        { heading: "7. Limitation of Liability", body: "To the maximum extent permitted by law, YesYouCan Cyber Secure's total liability for any claim arising from use of the Platform shall not exceed the fees paid in the preceding 12 months." },
        { heading: "8. Governing Law", body: "These Terms are governed by the laws of the Republic of Ghana. Any disputes shall be resolved through binding arbitration in Accra, Ghana, under the UNCITRAL Arbitration Rules." },
      ].map(section => (
        <div key={section.heading} style={{ marginBottom: "32px" }}>
          <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "17px", marginBottom: "10px", color: "#fff" }}>{section.heading}</h2>
          <p style={{ fontSize: "14px", color: "rgba(255,255,255,0.55)", lineHeight: 1.8 }}>{section.body}</p>
        </div>
      ))}
    </div>
  );
}
