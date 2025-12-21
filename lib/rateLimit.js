import rateLimit from "next-rate-limit";

const limiter = rateLimit({
  interval: 60 * 1000, // 1 minute
  tokensPerInterval: 5, // 5 requests per minute per IP
});

export async function checkRateLimit(res) {
  try {
    const success = await limiter.check(res, 1, "RATE_LIMIT_TOKEN");
    return success;
  } catch (err) {
    console.error("Rate limit check failed:", err);
    // Don't block if rate limiter fails - fail open for availability
    return true;
  }
}
