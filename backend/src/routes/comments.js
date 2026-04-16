const express = require("express");
const router = express.Router();
const { authenticate, authorize } = require("../middleware/auth");
const { Comment } = require("../models");

// GET /api/comments
router.get("/", authenticate, async (req, res) => {
  try {
    const { resourceType, resourceId } = req.query;
    if (!resourceType || !resourceId) {
      return res.status(400).json({ success: false, message: "Resource details required" });
    }

    const comments = await Comment.find({ 
      tenant_id: req.tenantId, 
      resourceType, 
      resourceId,
      deleted_at: null 
    })
    .populate("author", "firstName lastName avatar email")
    .sort("createdAt");

    res.json({ success: true, data: comments });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// POST /api/comments
router.post("/", authenticate, authorize("super_admin", "admin", "analyst"), async (req, res) => {
  try {
    const comment = await Comment.create({
      ...req.body,
      tenant_id: req.tenantId,
      author: req.user._id,
    });
    
    // We populate the author for immediate frontend use
    const populated = await comment.populate("author", "firstName lastName avatar");
    
    res.status(201).json({ success: true, data: populated });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
});

module.exports = router;
