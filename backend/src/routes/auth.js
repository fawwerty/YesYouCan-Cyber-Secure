const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const { body, validationResult } = require("express-validator");
const User = require("../models/User");
const Tenant = require("../models/Tenant");
const { Employee } = require("../models/secondary");
const { authenticate } = require("../middleware/auth");

const generateTokens = (userId) => {
  const accessToken = jwt.sign({ id: userId }, process.env.JWT_SECRET, { expiresIn: "15m" });
  const refreshToken = jwt.sign({ id: userId }, process.env.JWT_REFRESH_SECRET, { expiresIn: "7d" });
  return { accessToken, refreshToken };
};

// POST /api/auth/register
router.post(
  "/register",
  [
    body("email").isEmail().normalizeEmail(),
    body("password").isLength({ min: 8 }),
    body("firstName").notEmpty().trim(),
    body("lastName").notEmpty().trim(),
    body("organizationName").notEmpty().trim(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ success: false, errors: errors.array() });

    try {
      const { email, password, firstName, lastName, organizationName } = req.body;

      // Create tenant
      const slug = organizationName.toLowerCase().replace(/\s+/g, "-") + "-" + Date.now();
      const tenant = await Tenant.create({ name: organizationName, slug });

      // Check if user exists for this tenant
      const existingUser = await User.findOne({ email, tenant_id: tenant._id });
      if (existingUser) return res.status(409).json({ success: false, message: "Email already registered" });

      const user = await User.create({
        tenant_id: tenant._id,
        email,
        password,
        firstName,
        lastName,
        role: "admin",
      });

      // Create employee profile
      await Employee.create({ tenant_id: tenant._id, user: user._id });

      const { accessToken, refreshToken } = generateTokens(user._id);

      // Store refresh token
      await User.findByIdAndUpdate(user._id, { $push: { refreshTokens: refreshToken }, lastLogin: new Date() });

      res.status(201).json({
        success: true,
        message: "Account created successfully",
        data: { user, tenant, accessToken, refreshToken },
      });
    } catch (err) {
      res.status(500).json({ success: false, message: err.message });
    }
  }
);

// POST /api/auth/login
router.post(
  "/login",
  [body("email").isEmail().normalizeEmail(), body("password").notEmpty()],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ success: false, errors: errors.array() });

    try {
      const { email, password } = req.body;

      const user = await User.findOne({ email, deleted_at: null }).select("+password +refreshTokens").populate("tenant_id");
      if (!user) return res.status(401).json({ success: false, message: "Invalid credentials" });

      if (user.lockUntil && user.lockUntil > Date.now()) {
        return res.status(423).json({ success: false, message: "Account locked. Try again later." });
      }

      const isValid = await user.comparePassword(password);
      if (!isValid) {
        user.failedLoginAttempts += 1;
        if (user.failedLoginAttempts >= 5) {
          user.lockUntil = new Date(Date.now() + 15 * 60 * 1000);
        }
        await user.save();
        return res.status(401).json({ success: false, message: "Invalid credentials" });
      }

      user.failedLoginAttempts = 0;
      user.lockUntil = null;
      user.lastLogin = new Date();

      const { accessToken, refreshToken } = generateTokens(user._id);
      user.refreshTokens = [...(user.refreshTokens || []).slice(-4), refreshToken];
      await user.save();

      const userObj = user.toJSON();

      res.json({
        success: true,
        data: { user: userObj, tenant: user.tenant_id, accessToken, refreshToken },
      });
    } catch (err) {
      res.status(500).json({ success: false, message: err.message });
    }
  }
);

// POST /api/auth/refresh
router.post("/refresh", async (req, res) => {
  try {
    const { refreshToken } = req.body;
    if (!refreshToken) return res.status(401).json({ success: false, message: "No refresh token" });

    const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);
    const user = await User.findById(decoded.id).select("+refreshTokens");
    if (!user || !user.refreshTokens.includes(refreshToken)) {
      return res.status(401).json({ success: false, message: "Invalid refresh token" });
    }

    const { accessToken, refreshToken: newRefreshToken } = generateTokens(user._id);
    user.refreshTokens = user.refreshTokens.filter((t) => t !== refreshToken);
    user.refreshTokens.push(newRefreshToken);
    await user.save();

    res.json({ success: true, data: { accessToken, refreshToken: newRefreshToken } });
  } catch (err) {
    res.status(401).json({ success: false, message: "Invalid refresh token" });
  }
});

// POST /api/auth/logout
router.post("/logout", authenticate, async (req, res) => {
  try {
    const { refreshToken } = req.body;
    await User.findByIdAndUpdate(req.user._id, { $pull: { refreshTokens: refreshToken } });
    res.json({ success: true, message: "Logged out" });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// GET /api/auth/me
router.get("/me", authenticate, async (req, res) => {
  try {
    const user = await User.findById(req.user._id).populate("tenant_id");
    res.json({ success: true, data: user });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

module.exports = router;
