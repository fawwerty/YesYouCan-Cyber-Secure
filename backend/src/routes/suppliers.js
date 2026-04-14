const express = require("express");
const { authenticate, authorize } = require("../middleware/auth");
const { Supplier } = require("../models/index");

const router = express.Router();

router.get("/", authenticate, async (req, res) => {
  try {
    const { page = 1, limit = 20, rating, tier } = req.query;
    const filter = { tenant_id: req.tenantId, deleted_at: null };
    if (rating) filter.rating = rating;
    if (tier) filter.tier = tier;
    const [suppliers, total] = await Promise.all([
      Supplier.find(filter).sort("-esgScore").skip((page - 1) * limit).limit(parseInt(limit)),
      Supplier.countDocuments(filter),
    ]);
    res.json({ success: true, data: suppliers, pagination: { page: +page, limit: +limit, total, pages: Math.ceil(total / limit) } });
  } catch (err) { res.status(500).json({ success: false, message: err.message }); }
});

router.post("/", authenticate, authorize("super_admin", "admin", "analyst"), async (req, res) => {
  try {
    const supplier = await Supplier.create({ ...req.body, tenant_id: req.tenantId });
    res.status(201).json({ success: true, data: supplier });
  } catch (err) { res.status(400).json({ success: false, message: err.message }); }
});

router.put("/:id", authenticate, authorize("super_admin", "admin", "analyst"), async (req, res) => {
  try {
    const supplier = await Supplier.findOneAndUpdate(
      { _id: req.params.id, tenant_id: req.tenantId, deleted_at: null },
      req.body, { new: true, runValidators: true }
    );
    if (!supplier) return res.status(404).json({ success: false, message: "Supplier not found" });
    res.json({ success: true, data: supplier });
  } catch (err) { res.status(400).json({ success: false, message: err.message }); }
});

router.delete("/:id", authenticate, authorize("super_admin", "admin"), async (req, res) => {
  try {
    await Supplier.findOneAndUpdate({ _id: req.params.id, tenant_id: req.tenantId }, { deleted_at: new Date() });
    res.json({ success: true, message: "Supplier deleted" });
  } catch (err) { res.status(500).json({ success: false, message: err.message }); }
});

module.exports = router;
