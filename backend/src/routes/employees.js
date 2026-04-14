// employees.js
const express = require("express");
const router = express.Router();
const { authenticate } = require("../middleware/auth");
const { Employee } = require("../models/secondary");

router.get("/", authenticate, async (req, res) => {
  try {
    const employees = await Employee.find({ tenant_id: req.tenantId, deleted_at: null })
      .populate("user", "firstName lastName email avatar department role")
      .sort("-sustainabilityPoints");
    res.json({ success: true, data: employees });
  } catch (err) { res.status(500).json({ success: false, message: err.message }); }
});

router.post("/submit-idea", authenticate, async (req, res) => {
  try {
    const emp = await Employee.findOneAndUpdate(
      { user: req.user._id, tenant_id: req.tenantId },
      { $push: { ideas: { title: req.body.title, description: req.body.description } } },
      { new: true }
    );
    res.json({ success: true, data: emp });
  } catch (err) { res.status(400).json({ success: false, message: err.message }); }
});

module.exports = router;
