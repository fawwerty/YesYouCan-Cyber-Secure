const express = require("express");
const router = express.Router();
const { authenticate, authorize } = require("../middleware/auth");
const { Incident } = require("../models/index");

router.get("/", authenticate, async (req, res) => {
  try {
    const { page = 1, limit = 20, status, severity, type } = req.query;
    const filter = { tenant_id: req.tenantId, deleted_at: null };
    if (status) filter.status = status;
    if (severity) filter.severity = severity;
    if (type) filter.type = type;
    const [incidents, total] = await Promise.all([
      Incident.find(filter).populate("reportedBy assignedTo", "firstName lastName email").sort("-createdAt").skip((page - 1) * limit).limit(parseInt(limit)),
      Incident.countDocuments(filter),
    ]);
    res.json({ success: true, data: incidents, pagination: { page: +page, limit: +limit, total, pages: Math.ceil(total / limit) } });
  } catch (err) { res.status(500).json({ success: false, message: err.message }); }
});

router.post("/", authenticate, async (req, res) => {
  try {
    const incident = await Incident.create({ ...req.body, tenant_id: req.tenantId, reportedBy: req.user._id });
    const io = req.app.get("io");
    if (incident.severity === "critical") {
      io.to(`tenant:${req.tenantId}`).emit("incident:critical", { incident });
    }
    res.status(201).json({ success: true, data: incident });
  } catch (err) { res.status(400).json({ success: false, message: err.message }); }
});

router.put("/:id", authenticate, async (req, res) => {
  try {
    const incident = await Incident.findOneAndUpdate(
      { _id: req.params.id, tenant_id: req.tenantId, deleted_at: null },
      { ...req.body, $push: { timeline: { action: `Status updated to ${req.body.status}`, actor: req.user._id, notes: req.body.notes } } },
      { new: true, runValidators: true }
    ).populate("reportedBy assignedTo", "firstName lastName email");
    if (!incident) return res.status(404).json({ success: false, message: "Incident not found" });
    res.json({ success: true, data: incident });
  } catch (err) { res.status(400).json({ success: false, message: err.message }); }
});

module.exports = router;
