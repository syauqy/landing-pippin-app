import Airtable from "airtable";
import xss from "xss";
import { checkRateLimit } from "@/lib/rateLimit";

const base = new Airtable({ apiKey: process.env.AIRTABLE_API_KEY }).base(
  process.env.AIRTABLE_BASE_ID
);
const TABLE_NAME = "feedbacks";

// Email validation function
function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email) && email.length <= 254;
}

// Input sanitization
function sanitizeInput(input) {
  return xss(input.trim(), {
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

  let { name, email, comment } = req.body;

  // Sanitize inputs
  if (name) {
    name = sanitizeInput(name);
  }
  if (email) {
    email = sanitizeInput(email.toLowerCase());
  }
  if (comment) {
    comment = sanitizeInput(comment);
  }

  // Validate all fields
  if (!name || name.length > 100) {
    return res.status(400).json({ error: "Invalid name" });
  }

  if (!email || !isValidEmail(email)) {
    return res.status(400).json({ error: "Invalid email address" });
  }

  if (!comment || comment.length > 5000) {
    return res.status(400).json({ error: "Comment must be 1-5000 characters" });
  }

  try {
    const recordId = `LP-${Date.now()}`;

    await base(TABLE_NAME).create([
      {
        fields: {
          id: recordId,
          name: name,
          email: email,
          feedback: comment,
        },
      },
    ]);

    return res.status(201).json({ success: true });
  } catch (err) {
    console.error("Support submission error:", err);
    // Don't expose internal error details
    return res
      .status(500)
      .json({ error: "Failed to submit feedback. Please try again." });
  }
}
