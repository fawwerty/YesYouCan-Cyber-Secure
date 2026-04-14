const mongoose = require("mongoose");

const riskSchema = new mongoose.Schema(
  {
    tenant_id: { type: mongoose.Schema.Types.ObjectId, ref: "Tenant", required: true, index: true },
    title: { type: String, required: true, trim: true },
    description: { type: String, required: true },
    category: {
      type: String,
      enum: ["cybersecurity", "operational", "financial", "compliance", "strategic", "environmental", "reputational", "third_party"],
      required: true,
    },
    owner: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    department: { type: String },
    status: { type: String, enum: ["open", "in_progress", "mitigated", "accepted", "closed"], default: "open" },
    likelihood: { type: Number, min: 1, max: 5, required: true },
    impact: { type: Number, min: 1, max: 5, required: true },
    riskScore: { type: Number },
    residualLikelihood: { type: Number, min: 1, max: 5 },
    residualImpact: { type: Number, min: 1, max: 5 },
    residualScore: { type: Number },
    treatmentStrategy: { type: String, enum: ["mitigate", "accept", "transfer", "avoid"], default: "mitigate" },
    treatmentPlan: { type: String },
    dueDate: { type: Date },
    reviewDate: { type: Date },
    linkedControls: [{ type: mongoose.Schema.Types.ObjectId, ref: "Control" }],
    linkedFrameworks: [{ type: String }],
    tags: [{ type: String }],
    history: [
      {
        changedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        changedAt: { type: Date, default: Date.now },
        changes: { type: Object },
      },
    ],
    deleted_at: { type: Date, default: null },
  },
  { timestamps: true }
);

riskSchema.index({ tenant_id: 1, createdAt: -1 });
riskSchema.index({ tenant_id: 1, status: 1 });
riskSchema.index({ tenant_id: 1, category: 1 });

riskSchema.pre("save", function (next) {
  this.riskScore = this.likelihood * this.impact;
  if (this.residualLikelihood && this.residualImpact) {
    this.residualScore = this.residualLikelihood * this.residualImpact;
  }
  next();
});

module.exports = mongoose.model("Risk", riskSchema);
