const mongoose = require("mongoose");

const frameworkSchema = new mongoose.Schema(
  {
    tenant_id: { type: mongoose.Schema.Types.ObjectId, ref: "Tenant", required: true },
    name: { type: String, required: true },
    code: { type: String, required: true },
    version: { type: String },
    category: { type: String, enum: ["cybersecurity", "privacy", "esg", "financial", "general"], required: true },
    description: { type: String },
    isActive: { type: Boolean, default: true },
    controls: [
      {
        controlId: { type: String, required: true },
        title: { type: String, required: true },
        description: { type: String },
        category: { type: String },
        status: { type: String, enum: ["compliant", "partial", "non_compliant", "not_applicable"], default: "non_compliant" },
        evidence: [{ type: String }],
        notes: { type: String },
        lastReviewed: { type: Date },
      },
    ],
    complianceScore: { type: Number, default: 0 },
    lastAssessed: { type: Date },
    nextReview: { type: Date },
    deleted_at: { type: Date, default: null },
  },
  { timestamps: true }
);

frameworkSchema.index({ tenant_id: 1, createdAt: -1 });

module.exports = mongoose.model("Framework", frameworkSchema);
