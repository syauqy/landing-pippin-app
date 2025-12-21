import Airtable from "airtable";
import xss from "xss";
import { checkRateLimit } from "@/lib/rateLimit";

const base = new Airtable({ apiKey: process.env.AIRTABLE_API_KEY }).base(
  process.env.AIRTABLE_BASE_ID
);
const TABLE_NAME = "waitlist";

// Email validation function
function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email) && email.length <= 254;
}

// Input sanitization
function sanitizeEmail(email) {
  return xss(email.trim().toLowerCase(), {
    whiteList: {},
    stripIgnoredTag: true,
  });
}

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  // Check rate limit
  const rateLimitOk = await checkRateLimit(res);
  if (!rateLimitOk) {
    return res.status(429).json({
      error: "Too many requests. Please try again later.",
    });
  }

  let { email } = req.body;

  // Sanitize input
  if (email) {
    email = sanitizeEmail(email);
  }

  // Validate email
  if (!email || !isValidEmail(email)) {
    return res.status(400).json({ error: "Invalid email address" });
  }

  try {
    await base(TABLE_NAME).create([
      {
        fields: {
          email: email,
          joinedAt: new Date().toISOString(),
        },
      },
    ]);

    return res.status(200).json({ success: true });
  } catch (err) {
    console.error("Waitlist error:", err);
    // Don't expose internal error details
    return res
      .status(500)
      .json({ error: "Failed to join waitlist. Please try again." });
  }
}
