import React from "react";
import AppMockupSlideshow from "@/components/AppMockupSlideshow";
import WaitlistFormHero from "@/components/WaitlistFormHero";
import { NextSeo } from "next-seo";
import { Navbar } from "@/components/layouts/navbar";
import { Footer } from "@/components/layouts/footer";
import { Plus_Jakarta_Sans } from "next/font/google";
import FAQAccordion from "@/components/FAQAccordion";
import { faqData } from "@/lib/faqdata";

const plusJakartaSans = Plus_Jakarta_Sans({
  weight: "800",
  subsets: ["latin"],
});

export default function PippinHomePage() {
  return (
    <div className="min-h-screen bg-base-100 text-base-content flex flex-col">
      <NextSeo
        title="Pippin – Overthinking Journal"
        description="Pippin is a minimalist journal app for overthinkers. The simplest way to quiet your mind: write it down, lock it away, and let it go."
        openGraph={{
          type: "website",
          locale: "en_US",
          url: "https://getpippin.app/",
          siteName: "Pippin",
          title: "Pippin – Overthinking Journal",
          description:
            "Minimalist journal app for overthinkers. Quiet your mind: write it down, lock it away, and let it go.",
          images: [
            {
              url: "/pippin-banner.jpg",
              width: 1200,
              height: 630,
              alt: "Pippin – Overthinking Journal",
            },
          ],
        }}
        additionalMetaTags={[
          {
            name: "keywords",
            content:
              "journal, overthinking, mental health, minimalist, diary, lockbox, voice input, privacy, pippin, capybara, app, ios, android, revenuecat, firebase, zen, flower, bloom, lock, archive, ai, sentiment, premium, subscription",
          },
          {
            name: "application-name",
            content: "Pippin",
          },
        ]}
      />
      <Navbar />

      <main className="flex-1 flex flex-col items-center justify-center px-4">
        {/* Hero Section */}
        <section className="w-full max-w-2xl text-center py-16 md:py-24 relative">
          <img
            src="/logos/app-icon-mix-2.jpg"
            alt="Pippin mascot thinking"
            className="mx-auto mb-6 w-14 md:w-20 h-auto drop-shadow-lg rounded-2xl object-contain overflow-hidden"
          />
          <h1
            className={`text-4xl md:text-6xl font-bold mb-4 font-serif ${plusJakartaSans.className}`}
          >
            A safe place for overthinking
          </h1>
          <div className="text-lg md:text-xl text-base-content/60 my-8">
            <p>
              Pippin is a minimalist journaling space for when your thoughts
              feel loud. Write it out, step away, and come back lighter.
            </p>
          </div>
          <div className="mt-8 flex justify-center mx-auto">
            <WaitlistFormHero />
          </div>
          {/* <div className="flex flex-col items-center gap-2">
            <a
              href="https://apps.apple.com/us/app/bill-organizer-matcharge/id6752604627?itscg=30200&itsct=apps_box_badge&mttnsubad=6752604627"
              className="mt-4 inline-block"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                src="https://toolbox.marketingtools.apple.com/api/v2/badges/download-on-the-app-store/black/en-us?releaseDate=1761091200"
                alt="Download on the App Store"
                className="w-[246px] h-15 align-vertical-middle object-contain"
              />
            </a>
            <span className="text-slate-500 text-sm">
              No credit card required
            </span>
          </div> */}
        </section>

        {/* How It Works Section */}
        <section className="w-full max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-center gap-12 py-12 md:py-20">
          {/* App mockup or mascot illustration */}
          <div className="flex-1 flex justify-center mb-8 md:mb-0">
            <AppMockupSlideshow />
          </div>
          {/* Steps */}
          <div className="flex-1 flex flex-col gap-8">
            <div className="flex items-start gap-4">
              <span className="text-3xl font-bold text-primary">1</span>
              <div>
                <h4 className="text-xl font-semibold mb-1">
                  Write or speak freely
                </h4>
                <p className="text-base-content/60">
                  Capture thoughts the moment they appear, whether you want to
                  type or just talk it out.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <span className="text-3xl font-bold text-primary">2</span>
              <div>
                <h4 className="text-xl font-semibold mb-1">
                  See your thoughts grow
                </h4>
                <p className="text-base-content/60">
                  Each entry becomes a plant in your garden, helping you notice
                  patterns without overanalyzing.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <span className="text-3xl font-bold text-primary">3</span>
              <div>
                <h4 className="text-xl font-semibold mb-1">Watch it bloom</h4>
                <p className="text-base-content/60">
                  After time passes, your thought becomes part of your garden, a
                  visual reminder that you moved through it.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <span className="text-3xl font-bold text-primary">4</span>
              <div>
                <h4 className="text-xl font-semibold mb-1">Reflect, gently</h4>
                <p className="text-base-content/60">
                  Pippin offers supportive reflections, not advice, not
                  judgment, just perspective.
                </p>
              </div>
            </div>
          </div>
        </section>
        {/* Feature Section - Reference Style */}
        <section className="w-full max-w-6xl mx-auto py-16 md:py-24">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-2">
            Gentle tools for a lighter mind 🌱
          </h2>
          <p className="text-center text-lg text-base-content/60 mb-12 max-w-2xl mx-auto">
            Everything in Pippin is designed to help you let go, reflect, and
            grow—at your own pace, in your own way. No pressure, just gentle
            support.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {/* Feature Card 1 */}
            <div className="flex flex-col items-center text-center rounded-2xl space-y-5">
              <div className="overflow-clip bg-linear-to-b from-[#D1F8EF] via-[#A1E3F9] to-[#578FCA] h-92 w-full flex justify-center rounded-3xl bg-base-200 shadow">
                <img
                  src="/mockups/pippin_mockup_1.webp"
                  alt="Vent thoughts"
                  className="w-2/3 max-w-xs mt-4 object-cover object-top shadow-2xl"
                />
              </div>
              <h3 className="text-xl font-bold mb-2">Vent freely</h3>
              <p className="text-base-content/60">
                Type or speak your thoughts as they come. No formatting, no
                rules — just release what’s been sitting in your head.
              </p>
            </div>
            {/* Feature Card 2 */}
            <div className="flex flex-col items-center text-center rounded-2xl space-y-5">
              <div className="overflow-clip bg-linear-to-b from-[#D1F8EF] via-[#A1E3F9] to-[#578FCA] h-92 w-full flex justify-center rounded-3xl bg-base-200 shadow">
                <img
                  src="/mockups/pippin_mockup_2.webp"
                  alt="Plant and wait"
                  className="w-2/3 max-w-xs mt-4 object-cover object-top shadow-2xl"
                />
              </div>
              <h3 className="text-xl font-bold mb-2">Lock it away</h3>
              <p className="text-base-content/60">
                Once you’re done, your entry is planted and locked. You don’t
                have to reread or overanalyze it right away.
              </p>
            </div>
            {/* Feature Card 3 */}
            <div className="flex flex-col items-center text-center rounded-2xl space-y-5">
              <div className="overflow-clip bg-linear-to-b from-[#D1F8EF] via-[#A1E3F9] to-[#578FCA] h-92 w-full flex justify-center rounded-3xl bg-base-200 shadow">
                <img
                  src="/mockups/pippin_mockup_3.webp"
                  alt="Watch it bloom"
                  className="w-2/3 max-w-xs mt-4 object-cover object-top shadow-2xl"
                />
              </div>
              <h3 className="text-xl font-bold mb-2">Watch it bloom</h3>
              <p className="text-base-content/60">
                After time passes, your thought blooms into a plant. A gentle,
                visual reminder that you moved through it.
              </p>
            </div>
            <div className="flex flex-col items-center text-center rounded-2xl space-y-5">
              <div className="overflow-clip bg-linear-to-b from-[#D1F8EF] via-[#A1E3F9] to-[#578FCA] h-92 w-full flex justify-center rounded-3xl bg-base-200 shadow">
                <img
                  src="/mockups/pippin_mockup_6.webp"
                  alt="Your thoughts stay yours"
                  className="w-2/3 max-w-xs mt-4 object-cover object-top shadow-2xl"
                />
              </div>
              <h3 className="text-xl font-bold mb-2">
                Your thoughts stay yours
              </h3>
              <p className="text-base-content/60">
                Face ID, privacy screen, and secure storage keep your diary
                personal. Nothing is shared unless you choose.
              </p>
            </div>
            <div className="flex flex-col items-center text-center rounded-2xl space-y-5">
              <div className="overflow-clip bg-linear-to-b from-[#D1F8EF] via-[#A1E3F9] to-[#578FCA] h-92 w-full flex justify-center rounded-3xl bg-base-200 shadow">
                <img
                  src="/mockups/pippin_mockup_4.webp"
                  alt="Gentle insights"
                  className="w-2/3 max-w-xs mt-4 object-cover object-top shadow-2xl"
                />
              </div>
              <h3 className="text-xl font-bold mb-2">
                Gentle insights, not advice
              </h3>
              <p className="text-base-content/60">
                Receive supportive letters that help you pause and reframe —
                without telling you what to do.
              </p>
            </div>
            <div className="flex flex-col items-center text-center rounded-2xl space-y-5">
              <div className="overflow-clip bg-linear-to-b from-[#D1F8EF] via-[#A1E3F9] to-[#578FCA] h-92 w-full flex justify-center rounded-3xl bg-base-200 shadow">
                <img
                  src="/mockups/pippin_mockup_5.webp"
                  alt="Gentle insights"
                  className="w-2/3 max-w-xs mt-4 object-cover object-top shadow-2xl"
                />
              </div>
              <h3 className="text-xl font-bold mb-2">Grow at your own pace</h3>
              <p className="text-base-content/60">
                Let thoughts bloom naturally, or unlock faster growth and full
                history when you’re ready.
              </p>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="w-full bg-base-200 py-16 md:py-24 px-4 rounded-2xl">
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

        {/* Flower Divider */}
        {/* <div className="flex justify-center gap-4 mb-12">
          <img
            src="/illustrations/flowers/daisy.png"
            alt="Daisy"
            className="w-10 h-10"
          />
          <img
            src="/illustrations/flowers/rose.png"
            alt="Rose"
            className="w-10 h-10"
          />
          <img
            src="/illustrations/flowers/sunflower.png"
            alt="Sunflower"
            className="w-10 h-10"
          />
          <img
            src="/illustrations/flowers/lavender.png"
            alt="Lavender"
            className="w-10 h-10"
          />
        </div> */}
      </main>
      <Footer />
    </div>
  );
}
