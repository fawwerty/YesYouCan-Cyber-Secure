const mongoose = require("mongoose");

// Audit
const auditSchema = new mongoose.Schema(
  {
    tenant_id: { type: mongoose.Schema.Types.ObjectId, ref: "Tenant", required: true, index: true },
    title: { type: String, required: true },
    type: { type: String, enum: ["internal", "external", "regulatory", "supplier"], default: "internal" },
    framework: { type: String },
    status: { type: String, enum: ["planned", "in_progress", "completed", "cancelled"], default: "planned" },
    lead: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    team: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    scope: { type: String },
    startDate: { type: Date },
    endDate: { type: Date },
    findings: [
      {
        title: { type: String },
        severity: { type: String, enum: ["critical", "high", "medium", "low", "informational"] },
        status: { type: String, enum: ["open", "in_remediation", "closed"], default: "open" },
        description: { type: String },
        recommendation: { type: String },
        owner: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        dueDate: { type: Date },
        evidence: [{ url: String, hash: String, name: String }],
      },
    ],
    summary: { type: String },
    deleted_at: { type: Date, default: null },
  },
  { timestamps: true }
);
auditSchema.index({ tenant_id: 1, createdAt: -1 });

// Policy
const policySchema = new mongoose.Schema(
  {
    tenant_id: { type: mongoose.Schema.Types.ObjectId, ref: "Tenant", required: true, index: true },
    title: { type: String, required: true },
    category: { type: String, required: true },
    status: { type: String, enum: ["draft", "review", "approved", "published", "archived"], default: "draft" },
    version: { type: String, default: "1.0" },
    content: { type: String },
    owner: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    approvedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    approvedAt: { type: Date },
    effectiveDate: { type: Date },
    reviewDate: { type: Date },
    frameworks: [{ type: String }],
    tags: [{ type: String }],
    deleted_at: { type: Date, default: null },
  },
  { timestamps: true }
);
policySchema.index({ tenant_id: 1, createdAt: -1 });

// Employee
const employeeSchema = new mongoose.Schema(
  {
    tenant_id: { type: mongoose.Schema.Types.ObjectId, ref: "Tenant", required: true, index: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    department: { type: String },
    role: { type: String },
    sustainabilityPoints: { type: Number, default: 0 },
    badges: [{ type: String }],
    completedChallenges: [{ type: mongoose.Schema.Types.ObjectId }],
    trainingCompleted: [{ title: String, completedAt: Date, score: Number }],
    carbonSaved: { type: Number, default: 0 },
    actionsCount: { type: Number, default: 0 },
    ideas: [
      {
        title: { type: String },
        description: { type: String },
        votes: { type: Number, default: 0 },
        status: { type: String, enum: ["submitted", "reviewed", "approved", "implemented"], default: "submitted" },
        submittedAt: { type: Date, default: Date.now },
      },
    ],
    deleted_at: { type: Date, default: null },
  },
  { timestamps: true }
);
employeeSchema.index({ tenant_id: 1, createdAt: -1 });

// AuditLog
const auditLogSchema = new mongoose.Schema(
  {
    tenant_id: { type: mongoose.Schema.Types.ObjectId, ref: "Tenant", index: true },
    actor: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    actorEmail: { type: String },
    action: { type: String, required: true },
    resource: { type: String, required: true },
    resourceId: { type: mongoose.Schema.Types.ObjectId },
    changes: { type: Object },
    ip: { type: String },
    userAgent: { type: String },
    timestamp: { type: Date, default: Date.now, index: true },
  },
  { timestamps: false }
);
// Append-only — never update or delete
auditLogSchema.index({ tenant_id: 1, timestamp: -1 });

module.exports = {
  Audit: mongoose.model("Audit", auditSchema),
  Policy: mongoose.model("Policy", policySchema),
  Employee: mongoose.model("Employee", employeeSchema),
  AuditLog: mongoose.model("AuditLog", auditLogSchema),
};
