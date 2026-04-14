const mongoose = require("mongoose");

const emissionSchema = new mongoose.Schema(
  {
    tenant_id: { type: mongoose.Schema.Types.ObjectId, ref: "Tenant", required: true, index: true },
    scope: { type: String, enum: ["scope1", "scope2", "scope3"], required: true },
    category: { type: String, required: true },
    source: { type: String, required: true },
    facility: { type: String },
    department: { type: String },
    quantity: { type: Number, required: true },
    unit: { type: String, required: true },
    emissionFactor: { type: Number, required: true },
    co2Equivalent: { type: Number, required: true },
    period: {
      year: { type: Number, required: true },
      month: { type: Number, required: true, min: 1, max: 12 },
    },
    recordedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    dataSource: { type: String, enum: ["manual", "sensor", "api", "import"], default: "manual" },
    verified: { type: Boolean, default: false },
    verifiedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    notes: { type: String },
    deleted_at: { type: Date, default: null },
  },
  { timestamps: true }
);

emissionSchema.index({ tenant_id: 1, createdAt: -1 });
emissionSchema.index({ tenant_id: 1, "period.year": 1, "period.month": 1 });
emissionSchema.index({ tenant_id: 1, scope: 1 });

module.exports = mongoose.model("CarbonEmission", emissionSchema);
