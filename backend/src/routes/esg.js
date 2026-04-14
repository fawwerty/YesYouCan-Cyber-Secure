const express = require("express");
const router = express.Router();
const { authenticate, authorize } = require("../middleware/auth");
const { ESGMetric } = require("../models/index");

router.get("/", authenticate, async (req, res) => {
  try {
    const { category, year, quarter } = req.query;
    const filter = { tenant_id: req.tenantId, deleted_at: null };
    if (category) filter.category = category;
    if (year) filter["period.year"] = parseInt(year);
    if (quarter) filter["period.quarter"] = parseInt(quarter);
    const metrics = await ESGMetric.find(filter).sort("-createdAt").limit(200);
    res.json({ success: true, data: metrics });
  } catch (err) { res.status(500).json({ success: false, message: err.message }); }
});

router.get("/kpis", authenticate, async (req, res) => {
  try {
    const year = parseInt(req.query.year) || new Date().getFullYear();
    const kpis = await ESGMetric.aggregate([
      { $match: { tenant_id: req.tenantId, "period.year": year, deleted_at: null } },
      { $group: { _id: { category: "$category", metric: "$metric" }, latestValue: { $last: "$value" }, target: { $last: "$target" }, unit: { $last: "$unit" } } },
      { $sort: { "_id.category": 1 } },
    ]);
    res.json({ success: true, data: kpis });
  } catch (err) { res.status(500).json({ success: false, message: err.message }); }
});

router.post("/", authenticate, authorize("super_admin", "admin", "analyst"), async (req, res) => {
  try {
    const metric = await ESGMetric.create({ ...req.body, tenant_id: req.tenantId, recordedBy: req.user._id });
    res.status(201).json({ success: true, data: metric });
  } catch (err) { res.status(400).json({ success: false, message: err.message }); }
});

module.exports = router;
