// audits.js
const express = require("express");
const router = express.Router();
const { authenticate, authorize } = require("../middleware/auth");
const { Audit } = require("../models/secondary");

router.get("/", authenticate, async (req, res) => {
  try {
    const filter = { tenant_id: req.tenantId, deleted_at: null };
    if (req.query.status) filter.status = req.query.status;
    const audits = await Audit.find(filter).populate("lead", "firstName lastName").sort("-createdAt").limit(50);
    res.json({ success: true, data: audits });
  } catch (err) { res.status(500).json({ success: false, message: err.message }); }
});

router.post("/", authenticate, authorize("super_admin", "admin"), async (req, res) => {
  try {
    const audit = await Audit.create({ ...req.body, tenant_id: req.tenantId });
    res.status(201).json({ success: true, data: audit });
  } catch (err) { res.status(400).json({ success: false, message: err.message }); }
});

router.put("/:id", authenticate, authorize("super_admin", "admin", "analyst"), async (req, res) => {
  try {
    const audit = await Audit.findOneAndUpdate({ _id: req.params.id, tenant_id: req.tenantId }, req.body, { new: true });
    if (!audit) return res.status(404).json({ success: false, message: "Audit not found" });
    res.json({ success: true, data: audit });
  } catch (err) { res.status(400).json({ success: false, message: err.message }); }
});

module.exports = router;
