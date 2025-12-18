import { useState } from "react";
import { NextSeo } from "next-seo";
import { Navbar } from "@/components/layouts/navbar";
import { Footer } from "@/components/layouts/footer";
import { Plus_Jakarta_Sans } from "next/font/google";

const plusJakartaSans = Plus_Jakarta_Sans({
  weight: "800",
  subsets: ["latin"],
});

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", comment: "" });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/support", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        setSuccess(true);
        setForm({ name: "", email: "", comment: "" });
        setTimeout(() => setSuccess(false), 5000);
      } else {
        const data = await res.json();
        setError(data.error || "Something went wrong.");
      }
    } catch (err) {
      setError("Network error. Please try again.");
    }
    setLoading(false);
  }

  return (
    <div className="min-h-screen bg-base-100 text-base-content flex flex-col">
      <NextSeo
        title="Contact & Support – Pippin"
        description="Have feedback or questions about Pippin? We'd love to hear from you. Send us a message and we'll get back to you soon."
        openGraph={{
          type: "website",
          locale: "en_US",
          url: "https://getpippin.app/contact",
          siteName: "Pippin",
          title: "Contact & Support – Pippin",
          description:
            "Have feedback or questions about Pippin? We'd love to hear from you.",
          images: [
            {
              url: "/pippin-banner.jpg",
              width: 1200,
              height: 630,
              alt: "Pippin – Contact & Support",
            },
          ],
        }}
        additionalMetaTags={[
          {
            name: "keywords",
            content: "pippin, contact, support, feedback, help, journal, app",
          },
          {
            name: "application-name",
            content: "Pippin",
          },
        ]}
      />
      <Navbar />
      <main className="flex-1 flex flex-col items-center justify-center px-4 py-16 md:py-24">
        <div className="max-w-lg mx-auto w-full">
          <h1 className="text-3xl font-bold mb-6 text-center">
            Submit a Request or Feedback
          </h1>
          {success ? (
            <div className="text-center py-6 bg-base-200 rounded-3xl shadow-lg p-8">
              <div className="text-2xl font-semibold mb-2">
                ✨ Thank you for your feedback!
              </div>
              <div className="text-base-content/60">
                We appreciate your input and will review it soon.
              </div>
            </div>
          ) : (
            <div className="bg-base-200 rounded-3xl shadow-lg p-8">
              <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
                <div>
                  <label className="block text-sm font-semibold mb-2 text-base-content">
                    Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    required
                    value={form.name}
                    onChange={handleChange}
                    placeholder="Your name"
                    className="w-full px-4 py-3 rounded-xl border border-base-300 bg-base-100 focus:outline-none focus:ring-2 focus:ring-primary text-base-content placeholder-base-content/40"
                    disabled={loading}
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-2 text-base-content">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    required
                    value={form.email}
                    onChange={handleChange}
                    placeholder="your@email.com"
                    className="w-full px-4 py-3 rounded-xl border border-base-300 bg-base-100 focus:outline-none focus:ring-2 focus:ring-primary text-base-content placeholder-base-content/40"
                    disabled={loading}
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-2 text-base-content">
                    Message
                  </label>
                  <textarea
                    name="comment"
                    required
                    value={form.comment}
                    onChange={handleChange}
                    placeholder="Your feedback or comment"
                    rows={5}
                    className="w-full px-4 py-3 rounded-xl border border-base-300 bg-base-100 focus:outline-none focus:ring-2 focus:ring-primary text-base-content placeholder-base-content/40 resize-none"
                    disabled={loading}
                  />
                </div>
                {error && (
                  <div className="bg-error/10 border border-error rounded-xl p-3 text-error text-sm">
                    {error}
                  </div>
                )}
                <button
                  type="submit"
                  className="btn btn-primary disabled:opacity-50"
                  disabled={loading}
                >
                  {loading ? "Submitting..." : "Submit Feedback"}
                </button>
              </form>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
