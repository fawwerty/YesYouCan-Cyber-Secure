const express = require("express");
module.exports = (model) => {
  const router = express.Router();
  const { authenticate, authorize } = require("../middleware/auth");
  router.get("/", authenticate, async (req, res) => {
    try {
      const data = await model.find({ tenant_id: req.tenantId, deleted_at: null }).sort("-createdAt").limit(100);
      res.json({ success: true, data });
    } catch (err) { res.status(500).json({ success: false, message: err.message }); }
  });
  router.post("/", authenticate, async (req, res) => {
    try {
      const doc = await model.create({ ...req.body, tenant_id: req.tenantId });
      res.status(201).json({ success: true, data: doc });
    } catch (err) { res.status(400).json({ success: false, message: err.message }); }
  });
  router.put("/:id", authenticate, async (req, res) => {
    try {
      const doc = await model.findOneAndUpdate({ _id: req.params.id, tenant_id: req.tenantId }, req.body, { new: true });
      if (!doc) return res.status(404).json({ success: false, message: "Not found" });
      res.json({ success: true, data: doc });
    } catch (err) { res.status(400).json({ success: false, message: err.message }); }
  });
  router.delete("/:id", authenticate, authorize("super_admin", "admin"), async (req, res) => {
    try {
      await model.findOneAndUpdate({ _id: req.params.id, tenant_id: req.tenantId }, { deleted_at: new Date() });
      res.json({ success: true, message: "Deleted" });
    } catch (err) { res.status(500).json({ success: false, message: err.message }); }
  });
  return router;
};
