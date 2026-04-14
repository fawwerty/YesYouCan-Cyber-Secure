const express = require("express");
const router = express.Router();
const { authenticate, authorize } = require("../middleware/auth");
const User = require("../models/User");

router.get("/", authenticate, authorize("super_admin", "admin"), async (req, res) => {
  try {
    const users = await User.find({ tenant_id: req.tenantId, deleted_at: null }).sort("-createdAt");
    res.json({ success: true, data: users });
  } catch (err) { res.status(500).json({ success: false, message: err.message }); }
});

router.put("/:id", authenticate, async (req, res) => {
  try {
    if (req.user._id.toString() !== req.params.id && !["super_admin", "admin"].includes(req.user.role)) {
      return res.status(403).json({ success: false, message: "Forbidden" });
    }
    const { password, role, ...updates } = req.body;
    if (role && ["super_admin", "admin"].includes(req.user.role)) updates.role = role;
    const user = await User.findOneAndUpdate(
      { _id: req.params.id, tenant_id: req.tenantId },
      updates, { new: true, runValidators: true }
    );
    if (!user) return res.status(404).json({ success: false, message: "User not found" });
    res.json({ success: true, data: user });
  } catch (err) { res.status(400).json({ success: false, message: err.message }); }
});

router.delete("/:id", authenticate, authorize("super_admin", "admin"), async (req, res) => {
  try {
    await User.findOneAndUpdate({ _id: req.params.id, tenant_id: req.tenantId }, { deleted_at: new Date(), isActive: false });
    res.json({ success: true, message: "User deactivated" });
  } catch (err) { res.status(500).json({ success: false, message: err.message }); }
});

module.exports = router;
