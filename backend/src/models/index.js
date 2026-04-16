const mongoose = require("mongoose");

// ESG Metrics
const esgMetricSchema = new mongoose.Schema(
  {
    tenant_id: { type: mongoose.Schema.Types.ObjectId, ref: "Tenant", required: true, index: true },
    category: { type: String, enum: ["environmental", "social", "governance"], required: true },
    metric: { type: String, required: true },
    value: { type: Number, required: true },
    unit: { type: String },
    target: { type: Number },
    baseline: { type: Number },
    period: {
      year: { type: Number, required: true },
      quarter: { type: Number, min: 1, max: 4 },
      month: { type: Number, min: 1, max: 12 },
    },
    department: { type: String },
    framework: { type: String },
    recordedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    deleted_at: { type: Date, default: null },
  },
  { timestamps: true }
);
esgMetricSchema.index({ tenant_id: 1, createdAt: -1 });

// Supplier
const supplierSchema = new mongoose.Schema(
  {
    tenant_id: { type: mongoose.Schema.Types.ObjectId, ref: "Tenant", required: true, index: true },
    name: { type: String, required: true },
    country: { type: String, default: "GH" },
    industry: { type: String },
    contactName: { type: String },
    contactEmail: { type: String },
    tier: { type: String, enum: ["critical", "major", "minor"], default: "minor" },
    esgScore: { type: Number, min: 0, max: 100, default: 0 },
    riskScore: { type: Number, min: 0, max: 100, default: 0 },
    environmentalScore: { type: Number, min: 0, max: 100, default: 0 },
    socialScore: { type: Number, min: 0, max: 100, default: 0 },
    governanceScore: { type: Number, min: 0, max: 100, default: 0 },
    cyberHygieneScore: { type: Number, min: 0, max: 100, default: 0 },
    rating: { type: String, enum: ["green", "amber", "red"], default: "amber" },
    certifications: [{ type: String }],
    lastAssessmentDate: { type: Date },
    nextReviewDate: { type: Date },
    questionnaireSent: { type: Boolean, default: false },
    questionnaireCompleted: { type: Boolean, default: false },
    notes: { type: String },
    deleted_at: { type: Date, default: null },
  },
  { timestamps: true }
);
supplierSchema.index({ tenant_id: 1, createdAt: -1 });

// Incident
const incidentSchema = new mongoose.Schema(
  {
    tenant_id: { type: mongoose.Schema.Types.ObjectId, ref: "Tenant", required: true, index: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    type: {
      type: String,
      enum: ["data_breach", "malware", "phishing", "unauthorized_access", "ddos", "insider_threat", "physical", "environmental", "other"],
      required: true,
    },
    severity: { type: String, enum: ["critical", "high", "medium", "low"], required: true },
    status: { type: String, enum: ["reported", "investigating", "contained", "resolved", "closed"], default: "reported" },
    reportedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    assignedTo: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    affectedSystems: [{ type: String }],
    dataBreachInvolved: { type: Boolean, default: false },
    regulatoryNotificationRequired: { type: Boolean, default: false },
    regulatoryNotificationSent: { type: Boolean, default: false },
    regulatoryNotificationDeadline: { type: Date },
    timeline: [
      {
        timestamp: { type: Date, default: Date.now },
        action: { type: String },
        actor: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        notes: { type: String },
      },
    ],
    rootCause: { type: String },
    lessonsLearned: { type: String },
    resolvedAt: { type: Date },
    deleted_at: { type: Date, default: null },
  },
  { timestamps: true }
);
incidentSchema.index({ tenant_id: 1, createdAt: -1 });

const Approval = require("./Approval");
const Comment = require("./Comment");

module.exports = {
  ESGMetric: mongoose.model("ESGMetric", esgMetricSchema),
  Supplier: mongoose.model("Supplier", supplierSchema),
  Incident: mongoose.model("Incident", incidentSchema),
  Approval,
  Comment,
};
