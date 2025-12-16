import Airtable from "airtable";

const base = new Airtable({ apiKey: process.env.AIRTABLE_API_KEY }).base(
  process.env.AIRTABLE_BASE_ID
);
const TABLE_NAME = "support";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }
  const { name, email, comment } = req.body;
  if (!name || !email || !comment) {
    return res.status(400).json({ error: "All fields are required." });
  }
  try {
    await base(TABLE_NAME).create([
      { fields: { name: name, email: email, comment: comment } },
    ]);
    return res.status(200).json({ success: true });
  } catch (err) {
    return res.status(500).json({ error: "Failed to submit feedback." });
  }
}
