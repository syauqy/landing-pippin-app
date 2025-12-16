import { useState } from "react";
import clsx from "clsx";

export function WaitlistForm({ position }) {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      if (res.ok) {
        setSuccess(true);
      } else {
        const data = await res.json();
        setError(data.error || "Something went wrong.");
      }
    } catch (err) {
      setError("Network error. Please try again.");
    }
    setLoading(false);
  }

  if (success) {
    return (
      <div className="text-center py-6">
        <div className="text-2xl font-semibold mb-2">
          Thank you! You're on the list.
        </div>
        <div className="text-gray-600">
          We'll be in touch soon with exciting news. 🙏
        </div>
      </div>
    );
  }

  return (
    <form
      className={clsx(
        position === "left" ? "justify-start" : "justify-center",
        "flex flex-col lg:flex-row gap-3 lg:gap-0 items-center"
      )}
      onSubmit={handleSubmit}
    >
      <input
        type="email"
        required
        id="small-screen-email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Enter your email"
        className="px-4 py-3 lg:rounded-s-xl lg:hidden rounded-xl border bg-white border-gray-300 focus:outline-none focus:ring focus:border-batik-black w-full md:w-1/2"
        disabled={loading}
      />
      <button
        id="small-screen-submit"
        type="submit"
        className="bg-batik-black border-black border lg:hidden cursor-pointer w-full md:w-1/2 text-white px-6 py-3 rounded-xl font-semibold hover:bg-opacity-90 transition-colors"
        disabled={loading}
      >
        {loading ? "Joining..." : "Join waitlist"}
      </button>
      <input
        type="email"
        id="large-screen-email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Enter your email"
        className="px-4 py-3 hidden border-r-0 lg:flex rounded-s-xl border bg-white border-gray-300 focus:outline-none focus:border-batik-black w-1/2"
        disabled={loading}
      />
      <button
        id="large-screen-submit"
        type="submit"
        className="bg-batik-black border border-black hidden lg:flex cursor-pointer w-full lg:w-fit text-white px-6 py-3  lg:rounded-e-xl  font-semibold hover:bg-opacity-90 transition-colors"
        disabled={loading}
      >
        {loading ? "Joining..." : "Join waitlist"}
      </button>
      {error && <div className="text-red-500 mt-2 text-sm">{error}</div>}
    </form>
  );
}
