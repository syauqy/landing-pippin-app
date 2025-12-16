import { useState } from "react";
import Head from "next/head";
import { NextSeo } from "next-seo";
import { Navbar } from "@/components/layouts/navbar";
import { Footer } from "@/components/layouts/footer";
import { WaitlistForm } from "@/components/WaitlistForm";

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
    <div className="min-h-screen bg-base-100">
      <NextSeo
        title="Contact & Support - Wetonscope"
        description="Discover your soul's blueprint with Wetonscope, a modern guide to ancient Javanese wisdom. Get personalized daily readings, relationship compatibility insights, and deep self-discovery through traditional Weton calculations."
        openGraph={{
          type: "website",
          locale: "en_US",
          url: "https://wetonscope.com/contact",
          siteName: "Wetonscope",
          title: "Contact & Support - Wetonscope",
          description:
            "Discover your soul's blueprint with Wetonscope. Get personalized daily readings and relationship insights based on ancient Javanese wisdom.",
          images: [
            {
              url: "/wetonscope-app-hero.png",
              width: 1200,
              height: 630,
              alt: "Wetonscope App Preview",
            },
          ],
        }}
        additionalMetaTags={[
          {
            name: "keywords",
            content:
              "weton calculator, javanese astrology, horoscope, birth date calculator, relationship compatibility, daily reading, self discovery, primbon jawa, astrology",
          },
          {
            name: "application-name",
            content: "Wetonscope",
          },
        ]}
      />
      <Navbar page={"contact"} />
      <div className="max-w-lg mx-auto p-5 md:p-8 mt-20">
        <h1 className="text-3xl font-bold mb-6 text-center">
          Submit a Request or Feedback
        </h1>
        {success ? (
          <div className="text-center py-6">
            <div className="text-2xl font-semibold mb-2">
              Thank you for your feedback!
            </div>
            <div className="text-gray-600">
              We appreciate your input and will review it soon. 🙏
            </div>
          </div>
        ) : (
          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            <input
              type="text"
              name="name"
              required
              value={form.name}
              onChange={handleChange}
              placeholder="Your Name"
              className="px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-batik-black"
              disabled={loading}
            />
            <input
              type="email"
              name="email"
              required
              value={form.email}
              onChange={handleChange}
              placeholder="Your Email"
              className="px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-batik-black"
              disabled={loading}
            />
            <textarea
              name="comment"
              required
              value={form.comment}
              onChange={handleChange}
              placeholder="Your Feedback or Comment"
              rows={5}
              className="px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-batik-black"
              disabled={loading}
            />
            <button
              type="submit"
              className="bg-batik-black text-white px-6 py-3 rounded-lg font-semibold hover:bg-opacity-90 transition-colors"
              disabled={loading}
            >
              {loading ? "Submitting..." : "Submit Feedback"}
            </button>
            {error && <div className="text-red-500 mt-2 text-sm">{error}</div>}
          </form>
        )}
      </div>
      <section className="py-20 bg-gradient-to-b from-white to-batik">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-6">
            Ready to Discover Your True Self?
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Your journey to clarity, purpose, and deeper self-understanding is
            just a tap away. Download Wetonscope and start living a more aligned
            life today.
          </p>
          <div className="flex flex-col gap-3 justify-center lg:justify-start mt-4">
            <div className="text-xs md:text-sm text-gray-500 w-2/3 justify-center lg:justify-start mx-auto">
              Wetonscope is coming soon. Join our waitlist to get exclusive
              early access and a special founder's gift on launch day.
            </div>
            <WaitlistForm />
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer bg={"bg-batik"} />
    </div>
  );
}
