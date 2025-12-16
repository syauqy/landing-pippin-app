import Airtable from "airtable";

const base = new Airtable({ apiKey: process.env.AIRTABLE_API_KEY }).base(
  process.env.AIRTABLE_BASE_ID
);
const TABLE_NAME = "waitlist";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }
  const { email } = req.body;
  if (!email || typeof email !== "string") {
    return res.status(400).json({ error: "Invalid email" });
  }
  try {
    await base(TABLE_NAME).create([{ fields: { email: email } }]);
    return res.status(200).json({ success: true });
  } catch (err) {
    return res
      .status(500)
      .json({ error: `Failed to join waitlist. ${err.message}` });
  }
}
