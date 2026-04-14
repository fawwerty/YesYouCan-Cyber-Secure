const Redis = require("ioredis");
const logger = require("../utils/logger");

let redisClient = null;

const connectRedis = async () => {
  try {
    redisClient = new Redis(process.env.REDIS_URL || "redis://localhost:6379", {
      maxRetriesPerRequest: 3,
      lazyConnect: true,
    });

    await redisClient.connect();
    logger.info("✅ Redis connected");

    redisClient.on("error", (err) => {
      logger.warn("Redis error (non-fatal):", err.message);
    });
  } catch (err) {
    logger.warn("Redis unavailable — continuing without cache:", err.message);
    redisClient = null;
  }
};

const getRedis = () => redisClient;

const cacheGet = async (key) => {
  if (!redisClient) return null;
  try {
    const val = await redisClient.get(key);
    return val ? JSON.parse(val) : null;
  } catch { return null; }
};

const cacheSet = async (key, value, ttlSeconds = 300) => {
  if (!redisClient) return;
  try {
    await redisClient.setex(key, ttlSeconds, JSON.stringify(value));
  } catch {}
};

const cacheDel = async (key) => {
  if (!redisClient) return;
  try { await redisClient.del(key); } catch {}
};

module.exports = { connectRedis, getRedis, cacheGet, cacheSet, cacheDel };
