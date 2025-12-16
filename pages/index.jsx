import React from "react";
import { NextSeo } from "next-seo";
import { Navbar } from "@/components/layouts/navbar";
import { Footer } from "@/components/layouts/footer";
import { Plus_Jakarta_Sans } from "next/font/google";

const plusJakartaSans = Plus_Jakarta_Sans({
  weight: "800",
  subsets: ["latin"],
});

export default function PippinHomePage() {
  return (
    <div className="min-h-screen bg-linear-to-b from-[#F8F7F4] to-[#E9E6DF] text-[#2D2A26] flex flex-col">
      <NextSeo
        title="Pippin – Overthinking Journal"
        description="Pippin is a minimalist journal app for overthinkers. The simplest way to quiet your mind: write it down, lock it away, and let it go."
        openGraph={{
          type: "website",
          locale: "en_US",
          url: "https://pippin.app/",
          siteName: "Pippin",
          title: "Pippin – Overthinking Journal",
          description:
            "Minimalist journal app for overthinkers. Quiet your mind: write it down, lock it away, and let it go.",
          images: [
            {
              url: "/logos/app-icon-mix-2.jpg",
              width: 512,
              height: 512,
              alt: "Pippin Mascot Logo",
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
          <div className="text-lg md:text-xl text-[#6B665B] my-8">
            <p className="font-semibold">
              Pippin is a minimalist journal app for overthinkers.
            </p>{" "}
            <p>
              Vent thoughts, dump the stress, and let your mind feel lighter.
            </p>
          </div>
          <div className="flex flex-col items-center gap-2">
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
          </div>
          {/* Looping mascot video for visual interest */}
          {/* <div className="flex justify-center mt-10">
            <video
              className="rounded-2xl shadow-lg w-64 md:w-80 h-auto bg-[#e9e6df]"
              autoPlay
              loop
              muted
              playsInline
              preload="auto"
              poster="/illustrations/pippin-sleeping-300.png"
            >
              <source src="/videos/pippin-grow-300.mp4" type="video/mp4" />
            </video>
          </div> */}
        </section>

        {/* How It Works Section */}
        <section className="w-full max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-center gap-12 py-12 md:py-20">
          {/* App mockup or mascot illustration */}
          <div className="flex-1 flex justify-center mb-8 md:mb-0">
            <img
              src="/illustrations/pippin-dump-300.png"
              alt="Pippin app mockup"
              className="w-64 h-auto rounded-2xl shadow-lg bg-[#e9e6df] object-contain"
            />
          </div>
          {/* Steps */}
          <div className="flex-1 flex flex-col gap-8">
            <div className="flex items-start gap-4">
              <span className="text-3xl font-bold text-[#B6A16B]">1</span>
              <div>
                <h4 className="text-xl font-semibold mb-1">
                  Type or speak to vent your thoughts
                </h4>
                <p className="text-[#6B665B]">
                  Jot down or voice your worries, ideas, or feelings—no
                  pressure, no judgment.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <span className="text-3xl font-bold text-[#B6A16B]">2</span>
              <div>
                <h4 className="text-xl font-semibold mb-1">
                  Plant it, and wait for 24 hours
                </h4>
                <p className="text-[#6B665B]">
                  Lock your entry away. Give your mind a break while your
                  thought "grows" in the garden.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <span className="text-3xl font-bold text-[#B6A16B]">3</span>
              <div>
                <h4 className="text-xl font-semibold mb-1">Watch it bloom</h4>
                <p className="text-[#6B665B]">
                  After 24 hours, your thought blooms into a flower—see your
                  progress visually.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <span className="text-3xl font-bold text-[#B6A16B]">4</span>
              <div>
                <h4 className="text-xl font-semibold mb-1">
                  Get insights, not advice
                </h4>
                <p className="text-[#6B665B]">
                  Receive gentle, supportive reflections from Pippin—never
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
          <p className="text-center text-lg text-[#6B665B] mb-12 max-w-2xl mx-auto">
            Everything in Pippin is designed to help you let go, reflect, and
            grow—at your own pace, in your own way. No pressure, just gentle
            support.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {/* Feature Card 1 */}
            <div className="flex flex-col items-center text-center rounded-2xl space-y-5">
              <div className="overflow-clip h-92 w-full flex justify-center rounded-3xl bg-white/80 shadow">
                <img
                  src="/mockups/pippin_mockup_1.png"
                  alt="Vent thoughts"
                  className="w-full max-w-xs mt-4 object-cover object-top"
                />
              </div>
              <h3 className="text-xl font-bold mb-2">
                Vent thoughts, no pressure
              </h3>
              <p className="text-[#6B665B]">
                Type or speak to brain dump your worries, ideas, or feelings—no
                judgment, just relief.
              </p>
            </div>
            {/* Feature Card 2 */}
            <div className="flex flex-col items-center text-center rounded-2xl space-y-5">
              <div className="overflow-clip h-92 w-full flex justify-center rounded-3xl bg-white/80 shadow">
                <img
                  src="/mockups/pippin_mockup_2.png"
                  alt="Plant and wait"
                  className="w-full max-w-xs mt-4 object-cover object-top"
                />
              </div>
              <h3 className="text-xl font-bold mb-2">Plant it, and wait</h3>
              <p className="text-[#6B665B]">
                Lock your entry for 24 hours. Give your mind a break while your
                thought grows in your garden.
              </p>
            </div>
            {/* Feature Card 3 */}
            <div className="flex flex-col items-center text-center rounded-2xl space-y-5">
              <div className="overflow-clip h-92 w-full flex justify-center rounded-3xl bg-white/80 shadow">
                <img
                  src="/mockups/pippin_mockup_3.png"
                  alt="Watch it bloom"
                  className="w-full max-w-xs mt-4 object-cover object-top"
                />
              </div>
              <h3 className="text-xl font-bold mb-2">Watch it bloom</h3>
              <p className="text-[#6B665B]">
                After 24 hours, your thought blooms into a flower—see your
                progress visually and celebrate growth.
              </p>
            </div>
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

        {/* Privacy & Insights Section */}
        <section className="w-full max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 py-12 md:py-20">
          <div className="flex flex-col items-center text-center gap-4">
            <img
              src="/illustrations/pippin-lock.webp"
              alt="Privacy"
              className="w-20 h-20 mb-2"
            />
            <h3 className="text-2xl font-semibold mt-2">
              Your thoughts stay yours
            </h3>
            <p className="text-[#6B665B]">
              Face ID, privacy screen, and peace of mind. No one sees your diary
              except you.
            </p>
          </div>
          <div className="flex flex-col items-center text-center gap-4">
            <img
              src="/illustrations/pippin-writing-300.png"
              alt="Gentle insights"
              className="w-20 h-20 mb-2"
            />
            <h3 className="text-2xl font-semibold mt-2">
              Gentle insights, not advice
            </h3>
            <p className="text-[#6B665B]">
              Reflect without pressure. Receive supportive letters from Pippin
              after journaling.
            </p>
          </div>
        </section>
      </main>
      <Footer bg="bg-[#F8F7F4]" />
    </div>
  );
}
