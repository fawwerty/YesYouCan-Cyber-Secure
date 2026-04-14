const express = require("express");
const router = express.Router();
const { authenticate, authorize } = require("../middleware/auth");
const CarbonEmission = require("../models/CarbonEmission");

// GET /api/emissions
router.get("/", authenticate, async (req, res) => {
  try {
    const { page = 1, limit = 20, scope, year, month } = req.query;
    const filter = { tenant_id: req.tenantId, deleted_at: null };
    if (scope) filter.scope = scope;
    if (year) filter["period.year"] = parseInt(year);
    if (month) filter["period.month"] = parseInt(month);

    const [emissions, total] = await Promise.all([
      CarbonEmission.find(filter)
        .populate("recordedBy", "firstName lastName")
        .sort("-createdAt")
        .skip((page - 1) * limit)
        .limit(parseInt(limit)),
      CarbonEmission.countDocuments(filter),
    ]);

    res.json({ success: true, data: emissions, pagination: { page: +page, limit: +limit, total, pages: Math.ceil(total / limit) } });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// GET /api/emissions/summary
router.get("/summary", authenticate, async (req, res) => {
  try {
    const year = parseInt(req.query.year) || new Date().getFullYear();
    const summary = await CarbonEmission.aggregate([
      { $match: { tenant_id: req.tenantId, "period.year": year, deleted_at: null } },
      {
        $group: {
          _id: { scope: "$scope", category: "$category" },
          totalCO2: { $sum: "$co2Equivalent" },
          count: { $sum: 1 },
        },
      },
      { $sort: { totalCO2: -1 } },
    ]);

    const byScope = await CarbonEmission.aggregate([
      { $match: { tenant_id: req.tenantId, "period.year": year, deleted_at: null } },
      { $group: { _id: "$scope", totalCO2: { $sum: "$co2Equivalent" } } },
    ]);

    res.json({ success: true, data: { byCategory: summary, byScope } });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// POST /api/emissions
router.post("/", authenticate, authorize("super_admin", "admin", "analyst"), async (req, res) => {
  try {
    const emission = await CarbonEmission.create({ ...req.body, tenant_id: req.tenantId, recordedBy: req.user._id });
    res.status(201).json({ success: true, data: emission });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
});

// PUT /api/emissions/:id
router.put("/:id", authenticate, authorize("super_admin", "admin", "analyst"), async (req, res) => {
  try {
    const emission = await CarbonEmission.findOneAndUpdate(
      { _id: req.params.id, tenant_id: req.tenantId, deleted_at: null },
      req.body,
      { new: true, runValidators: true }
    );
    if (!emission) return res.status(404).json({ success: false, message: "Record not found" });
    res.json({ success: true, data: emission });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
});

// DELETE /api/emissions/:id
router.delete("/:id", authenticate, authorize("super_admin", "admin"), async (req, res) => {
  try {
    await CarbonEmission.findOneAndUpdate({ _id: req.params.id, tenant_id: req.tenantId }, { deleted_at: new Date() });
    res.json({ success: true, message: "Record deleted" });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

module.exports = router;
