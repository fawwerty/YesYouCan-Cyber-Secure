const mongoose = require("mongoose");

const tenantSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, lowercase: true },
    industry: { type: String, default: "Technology" },
    country: { type: String, default: "GH" },
    timezone: { type: String, default: "Africa/Accra" },
    currency: { type: String, default: "GHS" },
    logo: { type: String, default: null },
    website: { type: String, default: null },
    subscriptionTier: { type: String, enum: ["free", "pro", "enterprise"], default: "pro" },
    isActive: { type: Boolean, default: true },
    settings: {
      enabledModules: {
        type: [String],
        default: ["grc", "emissions", "esg", "suppliers", "audit", "incidents", "employees"],
      },
      carbonNeutralityTarget: { type: Number, default: 2030 },
      reportingCurrency: { type: String, default: "GHS" },
    },
    deleted_at: { type: Date, default: null },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Tenant", tenantSchema);
