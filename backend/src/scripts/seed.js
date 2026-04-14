require("dotenv").config();
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const User = require("../models/User");
const Tenant = require("../models/Tenant");
const Risk = require("../models/Risk");
const CarbonEmission = require("../models/CarbonEmission");
const Framework = require("../models/Framework");
const { ESGMetric, Supplier, Incident } = require("../models/index");
const { Audit, Policy, Employee, AuditLog } = require("../models/secondary");

const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost:27017/yesyoucan";

const seed = async () => {
  await mongoose.connect(MONGODB_URI);
  console.log("✅ Connected to MongoDB");

  // Clean existing
  await Promise.all([
    User.deleteMany({}), Tenant.deleteMany({}), Risk.deleteMany({}),
    CarbonEmission.deleteMany({}), Framework.deleteMany({}),
    ESGMetric.deleteMany({}), Supplier.deleteMany({}), Incident.deleteMany({}),
    Audit.deleteMany({}), Policy.deleteMany({}), Employee.deleteMany({}), AuditLog.deleteMany({}),
  ]);
  console.log("🧹 Cleared existing data");

  // --- Tenant ---
  const tenant = await Tenant.create({
    name: "YesYouCan Cyber Secure",
    slug: "yesyoucan-cybersecure",
    industry: "Cybersecurity & Consulting",
    country: "GH",
    timezone: "Africa/Accra",
    currency: "GHS",
    subscriptionTier: "enterprise",
    settings: { carbonNeutralityTarget: 2030, enabledModules: ["grc", "emissions", "esg", "suppliers", "audit", "incidents", "employees"] },
  });
  console.log("🏢 Tenant created");

  // --- Users ---
  const hashedPw = await bcrypt.hash("Password123!", 12);
  const [superAdmin, admin, analyst, executive, employee1, employee2] = await User.insertMany([
    { tenant_id: tenant._id, email: "superadmin@yesyoucan.com", password: hashedPw, firstName: "Noah", lastName: "Darko-Adjei", role: "super_admin", department: "Executive" },
    { tenant_id: tenant._id, email: "admin@yesyoucan.com", password: hashedPw, firstName: "Christiana", lastName: "Kennedy", role: "admin", department: "Strategy" },
    { tenant_id: tenant._id, email: "analyst@yesyoucan.com", password: hashedPw, firstName: "Kwame", lastName: "Mensah", role: "analyst", department: "GRC" },
    { tenant_id: tenant._id, email: "executive@yesyoucan.com", password: hashedPw, firstName: "Ama", lastName: "Asante", role: "executive", department: "C-Suite" },
    { tenant_id: tenant._id, email: "employee1@yesyoucan.com", password: hashedPw, firstName: "Kofi", lastName: "Boateng", role: "employee", department: "Engineering" },
    { tenant_id: tenant._id, email: "employee2@yesyoucan.com", password: hashedPw, firstName: "Abena", lastName: "Owusu", role: "employee", department: "Operations" },
  ]);
  console.log("👥 Users created");

  // --- Employee profiles ---
  await Employee.insertMany([
    { tenant_id: tenant._id, user: superAdmin._id, sustainabilityPoints: 980, badges: ["pioneer", "carbon-saver", "compliance-champion"], actionsCount: 47, carbonSaved: 2.3 },
    { tenant_id: tenant._id, user: admin._id, sustainabilityPoints: 845, badges: ["strategist", "esg-leader"], actionsCount: 38, carbonSaved: 1.8 },
    { tenant_id: tenant._id, user: analyst._id, sustainabilityPoints: 720, badges: ["data-wizard", "risk-analyst"], actionsCount: 30, carbonSaved: 1.2 },
    { tenant_id: tenant._id, user: executive._id, sustainabilityPoints: 650, badges: ["executive-champion"], actionsCount: 22, carbonSaved: 0.9 },
    { tenant_id: tenant._id, user: employee1._id, sustainabilityPoints: 540, badges: ["green-engineer"], actionsCount: 18, carbonSaved: 0.7 },
    { tenant_id: tenant._id, user: employee2._id, sustainabilityPoints: 430, badges: ["eco-advocate"], actionsCount: 14, carbonSaved: 0.5 },
  ]);

  // --- Frameworks ---
  const frameworks = await Framework.insertMany([
    {
      tenant_id: tenant._id, name: "ISO/IEC 27001:2022", code: "ISO27001", version: "2022", category: "cybersecurity",
      description: "Information Security Management System standard",
      complianceScore: 78, lastAssessed: new Date("2025-10-01"),
      controls: [
        { controlId: "A.5.1", title: "Policies for information security", status: "compliant", category: "Organizational" },
        { controlId: "A.5.2", title: "Information security roles and responsibilities", status: "compliant", category: "Organizational" },
        { controlId: "A.6.1", title: "Screening", status: "partial", category: "People" },
        { controlId: "A.6.3", title: "Information security awareness, education and training", status: "compliant", category: "People" },
        { controlId: "A.7.1", title: "Physical security perimeters", status: "compliant", category: "Physical" },
        { controlId: "A.8.1", title: "User endpoint devices", status: "partial", category: "Technological" },
        { controlId: "A.8.2", title: "Privileged access rights", status: "non_compliant", category: "Technological" },
        { controlId: "A.8.7", title: "Protection against malware", status: "compliant", category: "Technological" },
        { controlId: "A.8.9", title: "Configuration management", status: "partial", category: "Technological" },
        { controlId: "A.8.15", title: "Logging", status: "compliant", category: "Technological" },
      ],
    },
    {
      tenant_id: tenant._id, name: "NIST Cybersecurity Framework", code: "NIST-CSF", version: "2.0", category: "cybersecurity",
      description: "Framework for improving critical infrastructure cybersecurity",
      complianceScore: 82,
      controls: [
        { controlId: "GV.OC", title: "Organizational Context", status: "compliant", category: "GOVERN" },
        { controlId: "GV.RM", title: "Risk Management Strategy", status: "compliant", category: "GOVERN" },
        { controlId: "ID.AM", title: "Asset Management", status: "partial", category: "IDENTIFY" },
        { controlId: "ID.RA", title: "Risk Assessment", status: "compliant", category: "IDENTIFY" },
        { controlId: "PR.AA", title: "Identity Management & Access Control", status: "partial", category: "PROTECT" },
        { controlId: "PR.DS", title: "Data Security", status: "compliant", category: "PROTECT" },
        { controlId: "DE.CM", title: "Continuous Monitoring", status: "partial", category: "DETECT" },
        { controlId: "RS.MA", title: "Incident Management", status: "compliant", category: "RESPOND" },
        { controlId: "RC.RP", title: "Incident Recovery Plan Execution", status: "non_compliant", category: "RECOVER" },
      ],
    },
    {
      tenant_id: tenant._id, name: "GRI Standards 2021", code: "GRI", version: "2021", category: "esg",
      description: "Global Reporting Initiative sustainability disclosure standards",
      complianceScore: 65,
      controls: [
        { controlId: "GRI-2-1", title: "Organizational details", status: "compliant", category: "General Disclosures" },
        { controlId: "GRI-2-6", title: "Activities, value chain and other business relationships", status: "compliant", category: "General Disclosures" },
        { controlId: "GRI-302-1", title: "Energy consumption within organization", status: "partial", category: "Energy" },
        { controlId: "GRI-305-1", title: "Direct (Scope 1) GHG emissions", status: "compliant", category: "Emissions" },
        { controlId: "GRI-305-2", title: "Energy indirect (Scope 2) GHG emissions", status: "compliant", category: "Emissions" },
        { controlId: "GRI-305-3", title: "Other indirect (Scope 3) GHG emissions", status: "partial", category: "Emissions" },
        { controlId: "GRI-401-1", title: "New employee hires and turnover", status: "partial", category: "Employment" },
        { controlId: "GRI-403-1", title: "Occupational health and safety management system", status: "non_compliant", category: "Health & Safety" },
      ],
    },
    {
      tenant_id: tenant._id, name: "GDPR", code: "GDPR", version: "2018", category: "privacy",
      description: "General Data Protection Regulation",
      complianceScore: 71,
      controls: [
        { controlId: "Art-5", title: "Principles relating to processing of personal data", status: "compliant", category: "Principles" },
        { controlId: "Art-6", title: "Lawfulness of processing", status: "compliant", category: "Lawful Basis" },
        { controlId: "Art-13", title: "Information to be provided", status: "partial", category: "Transparency" },
        { controlId: "Art-17", title: "Right to erasure", status: "partial", category: "Data Subject Rights" },
        { controlId: "Art-25", title: "Data protection by design and by default", status: "non_compliant", category: "Privacy by Design" },
        { controlId: "Art-32", title: "Security of processing", status: "compliant", category: "Security" },
        { controlId: "Art-33", title: "Notification of personal data breach", status: "compliant", category: "Breach Notification" },
        { controlId: "Art-35", title: "Data protection impact assessment", status: "partial", category: "DPIA" },
      ],
    },
  ]);

  // --- Risks ---
  await Risk.insertMany([
    { tenant_id: tenant._id, title: "Ransomware Attack on Core Systems", description: "Risk of ransomware encrypting critical business data and systems, leading to operational downtime.", category: "cybersecurity", owner: analyst._id, status: "in_progress", likelihood: 4, impact: 5, residualLikelihood: 2, residualImpact: 4, treatmentStrategy: "mitigate", treatmentPlan: "Deploy EDR solution, offline backups, staff training", linkedFrameworks: ["ISO27001", "NIST-CSF"], tags: ["ransomware", "critical"] },
    { tenant_id: tenant._id, title: "Third-Party Data Breach via Supplier API", description: "Sensitive data exposure through insecure API integrations with third-party vendors.", category: "third_party", owner: analyst._id, status: "open", likelihood: 3, impact: 5, treatmentStrategy: "mitigate", treatmentPlan: "API security review, vendor risk assessments", linkedFrameworks: ["ISO27001", "GDPR"] },
    { tenant_id: tenant._id, title: "Non-Compliance with GDPR Data Retention", description: "Failure to enforce data retention policies may result in regulatory fines.", category: "compliance", owner: admin._id, status: "open", likelihood: 3, impact: 4, treatmentStrategy: "mitigate", treatmentPlan: "Implement automated data lifecycle management", linkedFrameworks: ["GDPR"] },
    { tenant_id: tenant._id, title: "Carbon Emissions Exceeding Annual Target", description: "Scope 3 emissions from supply chain may cause the organization to miss its 2025 carbon targets.", category: "environmental", owner: analyst._id, status: "in_progress", likelihood: 3, impact: 3, treatmentStrategy: "mitigate", treatmentPlan: "Supplier ESG audits, emission offsetting program" },
    { tenant_id: tenant._id, title: "Insider Threat — Privileged User Misuse", description: "Malicious or negligent actions by users with elevated system privileges.", category: "cybersecurity", owner: analyst._id, status: "open", likelihood: 2, impact: 5, treatmentStrategy: "mitigate", treatmentPlan: "PAM solution, access reviews quarterly", linkedFrameworks: ["ISO27001"] },
    { tenant_id: tenant._id, title: "ESG Disclosure Non-Compliance", description: "Failure to meet GRI/TCFD reporting requirements could damage investor relations.", category: "compliance", owner: admin._id, status: "open", likelihood: 2, impact: 3, treatmentStrategy: "mitigate", treatmentPlan: "Automated ESG reporting module implementation" },
    { tenant_id: tenant._id, title: "DDoS Attack on Customer Portal", description: "Distributed denial of service attack targeting the public-facing web application.", category: "cybersecurity", owner: analyst._id, status: "mitigated", likelihood: 3, impact: 3, residualLikelihood: 1, residualImpact: 3, treatmentStrategy: "mitigate", treatmentPlan: "CDN with DDoS protection, rate limiting" },
    { tenant_id: tenant._id, title: "Supply Chain Disruption Risk", description: "Critical suppliers failing to deliver, causing operational delays.", category: "operational", owner: admin._id, status: "accepted", likelihood: 2, impact: 4, treatmentStrategy: "accept", treatmentPlan: "Maintain secondary supplier relationships" },
  ]);
  console.log("⚠️  Risks seeded");

  // --- Carbon Emissions (12 months) ---
  const emissionsData = [];
  const currentYear = 2025;
  for (let month = 1; month <= 12; month++) {
    emissionsData.push(
      { tenant_id: tenant._id, scope: "scope1", category: "Stationary Combustion", source: "Diesel Generator", facility: "Head Office", quantity: 800 + Math.random() * 200, unit: "litres", emissionFactor: 2.68, co2Equivalent: (800 + Math.random() * 200) * 2.68 / 1000, period: { year: currentYear, month }, recordedBy: analyst._id, dataSource: "manual", verified: true },
      { tenant_id: tenant._id, scope: "scope2", category: "Purchased Electricity", source: "Grid Power", facility: "Head Office", quantity: 15000 + Math.random() * 3000, unit: "kWh", emissionFactor: 0.215, co2Equivalent: (15000 + Math.random() * 3000) * 0.215 / 1000, period: { year: currentYear, month }, recordedBy: analyst._id, dataSource: "api", verified: true },
      { tenant_id: tenant._id, scope: "scope3", category: "Business Travel", source: "Air Travel", department: "Sales", quantity: 5000 + Math.random() * 2000, unit: "km", emissionFactor: 0.133, co2Equivalent: (5000 + Math.random() * 2000) * 0.133 / 1000, period: { year: currentYear, month }, recordedBy: analyst._id, dataSource: "manual", verified: false },
      { tenant_id: tenant._id, scope: "scope3", category: "Supply Chain", source: "Purchased Goods", department: "Procurement", quantity: 50000 + Math.random() * 10000, unit: "GHS", emissionFactor: 0.0008, co2Equivalent: (50000 + Math.random() * 10000) * 0.0008 / 1000, period: { year: currentYear, month }, recordedBy: analyst._id, dataSource: "manual", verified: false }
    );
  }
  await CarbonEmission.insertMany(emissionsData);
  console.log("🌿 Carbon emissions seeded");

  // --- ESG Metrics ---
  await ESGMetric.insertMany([
    { tenant_id: tenant._id, category: "environmental", metric: "Total Energy Consumption", value: 180000, unit: "kWh", target: 160000, baseline: 210000, period: { year: 2025, quarter: 3 }, recordedBy: analyst._id },
    { tenant_id: tenant._id, category: "environmental", metric: "Water Usage", value: 1200, unit: "m3", target: 1000, baseline: 1500, period: { year: 2025, quarter: 3 }, recordedBy: analyst._id },
    { tenant_id: tenant._id, category: "environmental", metric: "Waste Diverted from Landfill", value: 68, unit: "%", target: 80, baseline: 55, period: { year: 2025, quarter: 3 }, recordedBy: analyst._id },
    { tenant_id: tenant._id, category: "environmental", metric: "Renewable Energy Share", value: 35, unit: "%", target: 60, baseline: 20, period: { year: 2025, quarter: 3 }, recordedBy: analyst._id },
    { tenant_id: tenant._id, category: "social", metric: "Employee Training Hours", value: 2400, unit: "hours", target: 3000, baseline: 1800, period: { year: 2025, quarter: 3 }, recordedBy: analyst._id },
    { tenant_id: tenant._id, category: "social", metric: "Female Leadership Ratio", value: 42, unit: "%", target: 50, baseline: 35, period: { year: 2025, quarter: 3 }, recordedBy: analyst._id },
    { tenant_id: tenant._id, category: "social", metric: "Employee Satisfaction Score", value: 78, unit: "score/100", target: 85, baseline: 70, period: { year: 2025, quarter: 3 }, recordedBy: analyst._id },
    { tenant_id: tenant._id, category: "governance", metric: "Board Independence", value: 60, unit: "%", target: 67, baseline: 50, period: { year: 2025, quarter: 3 }, recordedBy: analyst._id },
    { tenant_id: tenant._id, category: "governance", metric: "Policy Compliance Rate", value: 91, unit: "%", target: 95, baseline: 80, period: { year: 2025, quarter: 3 }, recordedBy: analyst._id },
    { tenant_id: tenant._id, category: "governance", metric: "Incidents Resolved within SLA", value: 87, unit: "%", target: 95, baseline: 75, period: { year: 2025, quarter: 3 }, recordedBy: analyst._id },
  ]);
  console.log("📊 ESG metrics seeded");

  // --- Suppliers ---
  await Supplier.insertMany([
    { tenant_id: tenant._id, name: "AfriTech Solutions Ltd", country: "GH", industry: "IT Services", contactName: "Kojo Acheampong", contactEmail: "kojo@afritech.gh", tier: "critical", esgScore: 82, riskScore: 25, environmentalScore: 78, socialScore: 85, governanceScore: 80, cyberHygieneScore: 88, rating: "green", certifications: ["ISO 27001", "ISO 14001"], lastAssessmentDate: new Date("2025-09-15") },
    { tenant_id: tenant._id, name: "DataVault West Africa", country: "GH", industry: "Cloud Services", contactName: "Akosua Frempong", contactEmail: "a.frempong@datavault.com", tier: "critical", esgScore: 74, riskScore: 42, environmentalScore: 68, socialScore: 76, governanceScore: 78, cyberHygieneScore: 72, rating: "amber", certifications: ["SOC 2 Type II"], lastAssessmentDate: new Date("2025-08-20") },
    { tenant_id: tenant._id, name: "GreenBuild Contractors", country: "GH", industry: "Construction", contactName: "Yaw Darko", contactEmail: "y.darko@greenbuild.gh", tier: "major", esgScore: 58, riskScore: 61, environmentalScore: 72, socialScore: 50, governanceScore: 52, cyberHygieneScore: 40, rating: "amber", certifications: ["ISO 14001"], lastAssessmentDate: new Date("2025-07-10") },
    { tenant_id: tenant._id, name: "LogiMove Freight", country: "GH", industry: "Logistics", contactName: "Esi Koomson", contactEmail: "esi@logimove.com", tier: "major", esgScore: 43, riskScore: 72, environmentalScore: 38, socialScore: 45, governanceScore: 46, cyberHygieneScore: 35, rating: "red", certifications: [], lastAssessmentDate: new Date("2025-06-01") },
    { tenant_id: tenant._id, name: "SecureNet Ghana", country: "GH", industry: "Cybersecurity", contactName: "Nana Addo-Kwapong", contactEmail: "n.addo@securenet.gh", tier: "critical", esgScore: 88, riskScore: 18, environmentalScore: 82, socialScore: 90, governanceScore: 92, cyberHygieneScore: 95, rating: "green", certifications: ["ISO 27001", "CREST", "PCI DSS"], lastAssessmentDate: new Date("2025-10-01") },
    { tenant_id: tenant._id, name: "PowerGen Energy Co.", country: "GH", industry: "Energy", contactName: "Bismark Asare", contactEmail: "b.asare@powergen.gh", tier: "major", esgScore: 61, riskScore: 48, environmentalScore: 55, socialScore: 65, governanceScore: 63, cyberHygieneScore: 58, rating: "amber", certifications: ["ISO 14001"], lastAssessmentDate: new Date("2025-07-30") },
  ]);
  console.log("🏭 Suppliers seeded");

  // --- Incidents ---
  await Incident.insertMany([
    { tenant_id: tenant._id, title: "Phishing Attack — Finance Department", description: "Multiple employees in finance received targeted spear-phishing emails. Two employees clicked malicious links.", type: "phishing", severity: "high", status: "resolved", reportedBy: analyst._id, assignedTo: admin._id, affectedSystems: ["Email", "Finance Portal"], dataBreachInvolved: false, regulatoryNotificationRequired: false, rootCause: "Lack of phishing simulation training", lessonsLearned: "Quarterly phishing simulations scheduled", resolvedAt: new Date("2025-09-20") },
    { tenant_id: tenant._id, title: "Unauthorized Database Access Attempt", description: "IDS detected 3 failed attempts to access the customer database from an external IP address.", type: "unauthorized_access", severity: "critical", status: "investigating", reportedBy: analyst._id, assignedTo: analyst._id, affectedSystems: ["Customer Database", "API Gateway"], dataBreachInvolved: false, regulatoryNotificationRequired: true, regulatoryNotificationDeadline: new Date(Date.now() + 72 * 60 * 60 * 1000) },
    { tenant_id: tenant._id, title: "Malware Detected on Workstation", description: "Antivirus flagged a trojan on a developer workstation. Machine isolated immediately.", type: "malware", severity: "medium", status: "contained", reportedBy: employee1._id, assignedTo: analyst._id, affectedSystems: ["Workstation DEV-04"], dataBreachInvolved: false, regulatoryNotificationRequired: false },
    { tenant_id: tenant._id, title: "Power Outage — Data Center", description: "4-hour power outage at primary data center. UPS sustained operations but generator failed to start.", type: "environmental", severity: "high", status: "closed", reportedBy: admin._id, assignedTo: admin._id, affectedSystems: ["Primary Data Center"], rootCause: "Generator maintenance overdue", lessonsLearned: "Monthly generator tests implemented", resolvedAt: new Date("2025-08-15") },
  ]);
  console.log("🚨 Incidents seeded");

  // --- Audits ---
  await Audit.insertMany([
    { tenant_id: tenant._id, title: "Q3 2025 ISO 27001 Internal Audit", type: "internal", framework: "ISO27001", status: "completed", lead: analyst._id, scope: "All IT systems and security controls", startDate: new Date("2025-09-01"), endDate: new Date("2025-09-30"), summary: "Overall compliance at 78%. Key gaps in privileged access management and incident response testing.", findings: [
      { title: "Privileged Access Rights Not Reviewed", severity: "high", status: "in_remediation", description: "Quarterly privileged access reviews not conducted as required by A.8.2", recommendation: "Implement PAM tool and schedule quarterly reviews", dueDate: new Date("2025-12-31") },
      { title: "Incomplete Security Awareness Training", severity: "medium", status: "open", description: "30% of staff have not completed mandatory security awareness training", recommendation: "Make training mandatory with manager sign-off", dueDate: new Date("2025-11-30") },
    ]},
    { tenant_id: tenant._id, title: "Annual GDPR Compliance Review", type: "regulatory", framework: "GDPR", status: "in_progress", lead: admin._id, scope: "Data processing activities, consent mechanisms, DSAR handling", startDate: new Date("2025-10-15"), summary: "Review in progress. Initial findings show gaps in privacy by design implementation." },
    { tenant_id: tenant._id, title: "Supplier Cybersecurity Audit — AfriTech", type: "supplier", status: "planned", lead: analyst._id, scope: "Third-party security controls for AfriTech Solutions", startDate: new Date("2026-01-15") },
  ]);
  console.log("📋 Audits seeded");

  // --- Policies ---
  await Policy.insertMany([
    { tenant_id: tenant._id, title: "Information Security Policy", category: "cybersecurity", status: "published", version: "3.2", owner: admin._id, approvedBy: superAdmin._id, approvedAt: new Date("2025-06-01"), effectiveDate: new Date("2025-07-01"), reviewDate: new Date("2026-07-01"), frameworks: ["ISO27001", "NIST-CSF"], content: "This policy establishes the framework for information security management at YesYouCan Cyber Secure..." },
    { tenant_id: tenant._id, title: "Sustainability & Environmental Policy", category: "environmental", status: "published", version: "2.1", owner: admin._id, approvedBy: superAdmin._id, approvedAt: new Date("2025-05-15"), effectiveDate: new Date("2025-06-01"), reviewDate: new Date("2026-06-01"), frameworks: ["GRI", "ISO14001"], content: "YesYouCan Cyber Secure is committed to environmental sustainability and carbon neutrality by 2030..." },
    { tenant_id: tenant._id, title: "Data Protection & Privacy Policy", category: "privacy", status: "published", version: "2.0", owner: admin._id, approvedBy: superAdmin._id, frameworks: ["GDPR"], reviewDate: new Date("2026-01-01") },
    { tenant_id: tenant._id, title: "Third-Party Risk Management Policy", category: "cybersecurity", status: "review", version: "1.1", owner: analyst._id, frameworks: ["ISO27001", "NIST-CSF"], reviewDate: new Date("2025-12-01") },
    { tenant_id: tenant._id, title: "Incident Response Policy", category: "cybersecurity", status: "published", version: "2.3", owner: admin._id, approvedBy: superAdmin._id, frameworks: ["ISO27001", "NIST-CSF", "GDPR"] },
  ]);
  console.log("📄 Policies seeded");

  console.log("\n✅ ============================================");
  console.log("   SEED COMPLETE — YesYouCan Cyber Secure");
  console.log("============================================");
  console.log("\n📧 TEST ACCOUNTS:");
  console.log("   superadmin@yesyoucan.com  | Password123!");
  console.log("   admin@yesyoucan.com       | Password123!");
  console.log("   analyst@yesyoucan.com     | Password123!");
  console.log("   executive@yesyoucan.com   | Password123!");
  console.log("   employee1@yesyoucan.com   | Password123!");
  console.log("============================================\n");

  await mongoose.disconnect();
};

seed().catch((err) => { console.error("Seed failed:", err); process.exit(1); });
