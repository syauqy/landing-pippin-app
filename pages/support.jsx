import { useState } from "react";
import { NextSeo } from "next-seo";
import { Navbar } from "@/components/layouts/navbar";
import { Footer } from "@/components/layouts/footer";
import FAQAccordion from "@/components/FAQAccordion";
import { Plus_Jakarta_Sans } from "next/font/google";
import { faqData } from "@/lib/faqdata";

const plusJakartaSans = Plus_Jakarta_Sans({
  weight: "800",
  subsets: ["latin"],
});

export default function SupportPage() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function generateId() {
    // Generate random ID with LP prefix: LP-XXXXXXXX
    const randomPart = Math.random()
      .toString(36)
      .substring(2, 10)
      .toUpperCase();
    return `LP-${randomPart}`;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const recordId = generateId();
      const airtablePayload = {
        fields: {
          id: recordId,
          name: form.name,
          email: form.email,
          feedback: form.message,
        },
      };

      const res = await fetch(
        `https://api.airtable.com/v0/${process.env.NEXT_PUBLIC_AIRTABLE_BASE_ID}/feedbacks`,
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
        setForm({ name: "", email: "", message: "" });
        setTimeout(() => setSuccess(false), 5000);
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
    <div className="min-h-screen bg-base-100 text-base-content flex flex-col">
      <NextSeo
        title="Support & Feedback – Pippin"
        description="Have feedback or questions about Pippin? We'd love to hear from you. Send us a message and we'll get back to you soon."
        openGraph={{
          type: "website",
          locale: "en_US",
          url: "https://getpippin.app/support",
          siteName: "Pippin",
          title: "Support & Feedback – Pippin",
          description:
            "Have feedback or questions about Pippin? We'd love to hear from you.",
          images: [
            {
              url: "/pippin-banner.jpg",
              width: 1200,
              height: 630,
              alt: "Pippin – Support & Feedback",
            },
          ],
        }}
        additionalMetaTags={[
          {
            name: "keywords",
            content: "pippin, support, feedback, contact, help, journal, app",
          },
          {
            name: "application-name",
            content: "Pippin",
          },
        ]}
      />

      <Navbar />

      <main className="flex-1 flex flex-col items-center justify-center px-4 py-16 md:py-24">
        {/* Header Section */}
        <section className="w-full max-w-2xl text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            We'd love to hear from you
          </h1>
          <img
            src="/illustrations/pippin-writing-300.png"
            alt="Support and Feedback"
            className="mx-auto mb-6 rounded-lg"
          />
          <p className="text-lg text-base-content/60">
            Have feedback, questions, or found a bug? Send us a message and
            we'll get back to you as soon as we can.
          </p>
        </section>

        {/* Form Section */}
        <section className="w-full max-w-2xl">
          {success ? (
            <div className="bg-base-200 rounded-3xl shadow-lg p-8 md:p-10 text-center">
              <div className="mb-4">
                <span className="text-5xl">✨</span>
              </div>
              <h2 className="text-2xl font-bold mb-2">Thank you!</h2>
              <p className="text-base-content/60 mb-4">
                We appreciate your feedback and will review it soon. We'll be in
                touch if needed.
              </p>
              <button
                onClick={() => setSuccess(false)}
                className="text-primary hover:text-primary/80 font-semibold transition-colors"
              >
                Send another message →
              </button>
            </div>
          ) : (
            <div className="bg-base-200 rounded-3xl shadow-lg p-8 md:p-10">
              <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
                {/* Name Field */}
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

                {/* Email Field */}
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

                {/* Message Field */}
                <div>
                  <label className="block text-sm font-semibold mb-2 text-base-content">
                    Message
                  </label>
                  <textarea
                    name="message"
                    required
                    value={form.message}
                    onChange={handleChange}
                    placeholder="Tell us what's on your mind..."
                    rows={6}
                    className="w-full px-4 py-3 rounded-xl border border-base-300 bg-base-100 focus:outline-none focus:ring-2 focus:ring-primary text-base-content placeholder-base-content/40 resize-none"
                    disabled={loading}
                  />
                </div>

                {/* Error Message */}
                {error && (
                  <div className="bg-error/10 border border-error rounded-xl p-3 text-error text-sm">
                    {error}
                  </div>
                )}

                {/* Submit Button */}
                <button
                  type="submit"
                  className="btn btn-primary shadow-md disabled:opacity-50"
                  disabled={loading}
                >
                  {loading ? "Sending..." : "Send Message"}
                </button>
              </form>
            </div>
          )}
        </section>

        {/* Additional Info */}
        <section className="w-full max-w-2xl mt-12 text-center">
          <p className="text-base-content/60 text-sm">
            We typically respond within 24-48 hours. Thank you for your
            patience!
          </p>
        </section>
      </main>

      {/* FAQ Section */}
      <section className="w-full bg-base-200 py-16 md:py-24 px-4">
        <div className="flex flex-col items-center">
          <div className="w-full max-w-2xl mb-8 text-center">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-lg text-base-content/60">
              Find answers to common questions about Pippin
            </p>
          </div>
          <FAQAccordion faqData={faqData} />
        </div>
      </section>

      <Footer />
    </div>
  );
}
