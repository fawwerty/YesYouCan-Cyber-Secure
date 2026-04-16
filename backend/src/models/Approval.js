const mongoose = require("mongoose");

const approvalSchema = new mongoose.Schema(
  {
    tenant_id: { type: mongoose.Schema.Types.ObjectId, ref: "Tenant", required: true, index: true },
    requester: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    actionType: { type: String, enum: ["UPDATE", "DELETE", "STATUS_CHANGE"], required: true },
    resourceType: { type: String, enum: ["Risk", "Incident", "Policy", "Audit"], required: true },
    resourceId: { type: mongoose.Schema.Types.ObjectId, required: true },
    originalData: { type: Object },
    requestedChanges: { type: Object },
    status: { type: String, enum: ["pending", "approved", "rejected"], default: "pending", index: true },
    approver: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    approverNote: { type: String },
    approvedAt: { type: Date },
  },
  { timestamps: true }
);

approvalSchema.index({ tenant_id: 1, status: 1, createdAt: -1 });

module.exports = mongoose.model("Approval", approvalSchema);
