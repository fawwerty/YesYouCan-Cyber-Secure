const express = require("express");
const router = express.Router();
const { authenticate, authorize } = require("../middleware/auth");
const { Approval } = require("../models");
const Risk = require("../models/Risk");
// Import other models as needed

// GET /api/approvals
router.get("/", authenticate, authorize("super_admin"), async (req, res) => {
  try {
    const approvals = await Approval.find({ tenant_id: req.tenantId })
      .populate("requester", "firstName lastName email")
      .sort("-createdAt");
    res.json({ success: true, data: approvals });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// PUT /api/approvals/:id (Review / Approve / Reject)
router.put("/:id", authenticate, authorize("super_admin"), async (req, res) => {
  try {
    const { status, note } = req.body;
    const approval = await Approval.findOne({ _id: req.params.id, tenant_id: req.tenantId });
    if (!approval) return res.status(404).json({ success: false, message: "Request not found" });

    if (approval.status !== "pending") {
      return res.status(400).json({ success: false, message: "Request already processed" });
    }

    approval.status = status;
    approval.approver = req.user._id;
    approval.approverNote = note;
    approval.approvedAt = new Date();

    if (status === "approved") {
      // Apply the change
      if (approval.resourceType === "Risk") {
        if (approval.actionType === "DELETE") {
          await Risk.findByIdAndUpdate(approval.resourceId, { deleted_at: new Date() });
        } else if (approval.actionType === "STATUS_CHANGE") {
          await Risk.findByIdAndUpdate(approval.resourceId, { 
            status: approval.requestedChanges.status,
            $push: { history: { changedBy: approval.requester, changes: { status: approval.requestedChanges.status, note: "Approved by Superadmin" } } }
          });
        }
      }
      // Add more resource handling as needed
    }

    await approval.save();
    res.json({ success: true, data: approval });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

module.exports = router;
