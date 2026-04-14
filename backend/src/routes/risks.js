const express = require("express");
const router = express.Router();
const { authenticate, authorize } = require("../middleware/auth");
const Risk = require("../models/Risk");

// GET /api/risks
router.get("/", authenticate, async (req, res) => {
  try {
    const { page = 1, limit = 20, status, category, minScore, sort = "-createdAt" } = req.query;
    const filter = { tenant_id: req.tenantId, deleted_at: null };
    if (status) filter.status = status;
    if (category) filter.category = category;
    if (minScore) filter.riskScore = { $gte: parseInt(minScore) };

    const [risks, total] = await Promise.all([
      Risk.find(filter)
        .populate("owner", "firstName lastName email")
        .sort(sort)
        .skip((page - 1) * limit)
        .limit(parseInt(limit)),
      Risk.countDocuments(filter),
    ]);

    res.json({ success: true, data: risks, pagination: { page: +page, limit: +limit, total, pages: Math.ceil(total / limit) } });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// GET /api/risks/:id
router.get("/:id", authenticate, async (req, res) => {
  try {
    const risk = await Risk.findOne({ _id: req.params.id, tenant_id: req.tenantId, deleted_at: null })
      .populate("owner", "firstName lastName email")
      .populate("linkedControls");
    if (!risk) return res.status(404).json({ success: false, message: "Risk not found" });
    res.json({ success: true, data: risk });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// POST /api/risks
router.post("/", authenticate, authorize("super_admin", "admin", "analyst"), async (req, res) => {
  try {
    const risk = await Risk.create({ ...req.body, tenant_id: req.tenantId, owner: req.body.owner || req.user._id });
    const io = req.app.get("io");
    io.to(`tenant:${req.tenantId}`).emit("risk:created", { risk });
    res.status(201).json({ success: true, data: risk });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
});

// PUT /api/risks/:id
router.put("/:id", authenticate, authorize("super_admin", "admin", "analyst"), async (req, res) => {
  try {
    const risk = await Risk.findOneAndUpdate(
      { _id: req.params.id, tenant_id: req.tenantId, deleted_at: null },
      { ...req.body, $push: { history: { changedBy: req.user._id, changes: req.body } } },
      { new: true, runValidators: true }
    ).populate("owner", "firstName lastName email");
    if (!risk) return res.status(404).json({ success: false, message: "Risk not found" });
    const io = req.app.get("io");
    io.to(`tenant:${req.tenantId}`).emit("risk:updated", { risk });
    res.json({ success: true, data: risk });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
});

// DELETE /api/risks/:id (soft delete)
router.delete("/:id", authenticate, authorize("super_admin", "admin"), async (req, res) => {
  try {
    await Risk.findOneAndUpdate({ _id: req.params.id, tenant_id: req.tenantId }, { deleted_at: new Date() });
    res.json({ success: true, message: "Risk deleted" });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

module.exports = router;
