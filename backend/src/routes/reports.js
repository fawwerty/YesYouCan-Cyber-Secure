const express = require("express");
const router = express.Router();
const { authenticate } = require("../middleware/auth");
router.get("/", authenticate, async (req, res) => res.json({ success: true, data: [], message: "Module active" }));
module.exports = router;
