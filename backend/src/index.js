require("dotenv").config();
const express = require("express");
const http = require("http");
const cors = require("cors");
const helmet = require("helmet");
const compression = require("compression");
const morgan = require("morgan");
const rateLimit = require("express-rate-limit");
const { Server } = require("socket.io");

const connectDB = require("./config/database");
const { connectRedis } = require("./config/redis");
const logger = require("./utils/logger");

// Routes
const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/users");
const riskRoutes = require("./routes/risks");
const complianceRoutes = require("./routes/compliance");
const emissionRoutes = require("./routes/emissions");
const esgRoutes = require("./routes/esg");
const supplierRoutes = require("./routes/suppliers");
const auditRoutes = require("./routes/audits");
const incidentRoutes = require("./routes/incidents");
const employeeRoutes = require("./routes/employees");
const reportRoutes = require("./routes/reports");
const dashboardRoutes = require("./routes/dashboard");
const frameworkRoutes = require("./routes/frameworks");
const policyRoutes = require("./routes/policies");
const vendorRoutes = require("./routes/vendors");
const notificationRoutes = require("./routes/notifications");
const approvalRoutes = require("./routes/approvals");
const commentRoutes = require("./routes/comments");

const app = express();
const server = http.createServer(app);

// Socket.IO
const io = new Server(server, {
  cors: {
    origin: process.env.FRONTEND_URL || "http://localhost:3000",
    methods: ["GET", "POST"],
    credentials: true,
  },
});

// Attach io to app for use in routes
app.set("io", io);

// Security middleware
app.use(helmet({ contentSecurityPolicy: false }));
app.use(compression());
app.use(morgan("combined", { stream: { write: (msg) => logger.info(msg.trim()) } }));

// CORS — allow Vercel deployments, localhost, and custom domains
const allowedOrigins = [
  "http://localhost:3000",
  "http://localhost:3001",
  process.env.FRONTEND_URL,
  process.env.FRONTEND_URL_PROD,
].filter(Boolean);

app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests with no origin (mobile apps, curl, Postman)
      if (!origin) return callback(null, true);
      // Allow all Vercel deployment URLs for this project
      if (
        allowedOrigins.includes(origin) ||
        /\.vercel\.app$/.test(origin) ||
        origin.includes("yesyoucan")
      ) {
        return callback(null, true);
      }
      logger.warn(`CORS blocked origin: ${origin}`);
      return callback(new Error("Not allowed by CORS"));
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization", "x-tenant-id"],
  })
);

// Handle preflight for all routes
app.options("*", cors());

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 500,
  standardHeaders: true,
  legacyHeaders: false,
});
app.use(limiter);

const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 20,
});

// Body parsing
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));

// Health check
app.get("/health", (req, res) => {
  res.json({
    status: "ok",
    service: "YesYouCan GRC & Sustainability MIS",
    timestamp: new Date().toISOString(),
    version: "1.0.0",
  });
});

// API Routes
app.use("/api/auth", authLimiter, authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/risks", riskRoutes);
app.use("/api/compliance", complianceRoutes);
app.use("/api/emissions", emissionRoutes);
app.use("/api/esg", esgRoutes);
app.use("/api/suppliers", supplierRoutes);
app.use("/api/audits", auditRoutes);
app.use("/api/incidents", incidentRoutes);
app.use("/api/employees", employeeRoutes);
app.use("/api/reports", reportRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/frameworks", frameworkRoutes);
app.use("/api/policies", policyRoutes);
app.use("/api/vendors", vendorRoutes);
app.use("/api/notifications", notificationRoutes);
app.use("/api/approvals", approvalRoutes);
app.use("/api/comments", commentRoutes);

// Socket.IO events
io.on("connection", (socket) => {
  logger.info(`Socket connected: ${socket.id}`);

  socket.on("join-tenant", (tenantId) => {
    socket.join(`tenant:${tenantId}`);
    logger.info(`Socket ${socket.id} joined tenant:${tenantId}`);
  });

  socket.on("disconnect", () => {
    logger.info(`Socket disconnected: ${socket.id}`);
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ success: false, message: "Route not found" });
});

// Global error handler
app.use((err, req, res, next) => {
  logger.error(err.stack);
  res.status(err.status || 500).json({
    success: false,
    message: err.message || "Internal Server Error",
    ...(process.env.NODE_ENV === "development" && { stack: err.stack }),
  });
});

const PORT = process.env.PORT || 5000;

const start = async () => {
  // Production Environment Validation
  const requiredVars = ["MONGODB_URI", "JWT_SECRET"];
  const missingVars = requiredVars.filter(v => !process.env[v]);
  
  if (missingVars.length > 0) {
    logger.error(`❌ CRITICAL ERROR: Missing required environment variables: ${missingVars.join(", ")}`);
    logger.error("Please add these in your Render/Deployment dashboard Environment settings.");
    process.exit(1);
  }

  try {
    await connectDB();
    await connectRedis();
    server.listen(PORT, () => {
      logger.info(`🚀 YesYouCan MIS Backend running on port ${PORT}`);
      logger.info(`🌐 Environment: ${process.env.NODE_ENV}`);
    });
  } catch (err) {
    logger.error("Failed to start server:", err);
    process.exit(1);
  }
};

start();
