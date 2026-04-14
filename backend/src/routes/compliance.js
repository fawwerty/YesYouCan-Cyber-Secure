const express = require("express");
const router = express.Router();
const { authenticate, authorize } = require("../middleware/auth");
const Framework = require("../models/Framework");

router.get("/", authenticate, async (req, res) => {
  try {
    const frameworks = await Framework.find({ tenant_id: req.tenantId, isActive: true, deleted_at: null }).sort("name");
    res.json({ success: true, data: frameworks });
  } catch (err) { res.status(500).json({ success: false, message: err.message }); }
});

router.get("/:id", authenticate, async (req, res) => {
  try {
    const fw = await Framework.findOne({ _id: req.params.id, tenant_id: req.tenantId, deleted_at: null });
    if (!fw) return res.status(404).json({ success: false, message: "Framework not found" });
    res.json({ success: true, data: fw });
  } catch (err) { res.status(500).json({ success: false, message: err.message }); }
});

router.post("/", authenticate, authorize("super_admin", "admin"), async (req, res) => {
  try {
    const fw = await Framework.create({ ...req.body, tenant_id: req.tenantId });
    res.status(201).json({ success: true, data: fw });
  } catch (err) { res.status(400).json({ success: false, message: err.message }); }
});

router.put("/:id/control", authenticate, authorize("super_admin", "admin", "analyst"), async (req, res) => {
  try {
    const { controlId, status, notes, evidence } = req.body;
    const fw = await Framework.findOneAndUpdate(
      { _id: req.params.id, tenant_id: req.tenantId, "controls.controlId": controlId },
      { $set: { "controls.$.status": status, "controls.$.notes": notes, "controls.$.lastReviewed": new Date() } },
      { new: true }
    );
    if (!fw) return res.status(404).json({ success: false, message: "Framework or control not found" });
    // Recalculate compliance score
    const total = fw.controls.length;
    const compliant = fw.controls.filter((c) => c.status === "compliant").length;
    const partial = fw.controls.filter((c) => c.status === "partial").length;
    fw.complianceScore = total ? Math.round(((compliant + partial * 0.5) / total) * 100) : 0;
    fw.lastAssessed = new Date();
    await fw.save();
    res.json({ success: true, data: fw });
  } catch (err) { res.status(400).json({ success: false, message: err.message }); }
});

module.exports = router;
