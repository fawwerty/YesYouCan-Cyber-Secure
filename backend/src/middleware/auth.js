const jwt = require("jsonwebtoken");
const User = require("../models/User");
const { AuditLog } = require("../models/secondary");

const authenticate = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ success: false, message: "No token provided" });
    }

    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findById(decoded.id).select("+password");
    if (!user || !user.isActive || user.deleted_at) {
      return res.status(401).json({ success: false, message: "User not found or inactive" });
    }

    req.user = user;
    req.tenantId = user.tenant_id;

    // Audit log
    AuditLog.create({
      tenant_id: user.tenant_id,
      actor: user._id,
      actorEmail: user.email,
      action: `${req.method} ${req.path}`,
      resource: req.path.split("/")[3] || "unknown",
      ip: req.ip,
      userAgent: req.headers["user-agent"],
    }).catch(() => {});

    next();
  } catch (err) {
    if (err.name === "TokenExpiredError") {
      return res.status(401).json({ success: false, message: "Token expired", code: "TOKEN_EXPIRED" });
    }
    return res.status(401).json({ success: false, message: "Invalid token" });
  }
};

const authorize = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({
        success: false,
        message: `Role '${req.user.role}' is not authorized for this action`,
      });
    }
    next();
  };
};

module.exports = { authenticate, authorize };
