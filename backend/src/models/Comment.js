const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema(
  {
    tenant_id: { type: mongoose.Schema.Types.ObjectId, ref: "Tenant", required: true, index: true },
    author: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    resourceType: { type: String, enum: ["Risk", "Incident", "Policy", "Audit"], required: true },
    resourceId: { type: mongoose.Schema.Types.ObjectId, required: true },
    content: { type: String, required: true, trim: true },
    isInternal: { type: Boolean, default: false },
    deleted_at: { type: Date, default: null },
  },
  { timestamps: true }
);

commentSchema.index({ resourceId: 1, createdAt: 1 });

module.exports = mongoose.model("Comment", commentSchema);
