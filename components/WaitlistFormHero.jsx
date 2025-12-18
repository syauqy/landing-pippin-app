import { useState } from "react";

export default function WaitlistForm() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const airtablePayload = {
        fields: {
          email: email,
        },
      };

      const res = await fetch(
        `https://api.airtable.com/v0/${process.env.NEXT_PUBLIC_AIRTABLE_BASE_ID}/waitlist`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_AIRTABLE_API_KEY}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(airtablePayload),
        }
      );

      if (res.ok) {
        setSuccess(true);
        setEmail("");
        // setTimeout(() => setSuccess(false), 3000);
      } else {
        const data = await res.json();
        setError(data.error?.message || "Something went wrong.");
      }
    } catch (err) {
      setError("Network error. Please try again.");
    }
    setLoading(false);
  }

  return (
    <div className="w-full max-w-md">
      {success ? (
        <div className="text-center py-3">
          <p className="text-base-content/60 font-semibold">
            ✨ Welcome to the waitlist! Check your email for updates.
          </p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <div className="flex flex-col sm:flex-row gap-2">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              required
              disabled={loading}
              className="flex-1 px-4 py-3 rounded-xl border border-base-300 bg-base-200 focus:outline-none focus:ring-2 focus:ring-primary text-base-content placeholder:text-slate-400"
            />
            <button
              type="submit"
              disabled={loading}
              className="rounded-xl py-2 px-4 font-semibold bg-primary text-primary-content whitespace-nowrap disabled:opacity-50"
            >
              {loading ? "Joining..." : "Join Waitlist"}
            </button>
          </div>
          {error && <p className="text-error text-sm">{error}</p>}
        </form>
      )}
      <p className="text-base-content/60 text-sm mt-2 text-center">
        No credit card required
      </p>
    </div>
  );
}
