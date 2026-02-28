import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { NextSeo } from "next-seo";
import { motion, AnimatePresence } from "framer-motion";
import { Navbar } from "@/components/layouts/navbar";
import { Footer } from "@/components/layouts/footer";
import { Plus_Jakarta_Sans } from "next/font/google";
import { classifyThought, generateShareText } from "@/utils/decoder";
import { generateShareImage, copyToClipboard } from "@/utils/shareImage";

const plusJakartaSans = Plus_Jakarta_Sans({
  weight: "700",
  subsets: ["latin"],
});

const MAX_CHARS = 500;

export default function OverthinkingDecoderPage() {
  const [input, setInput] = useState("");
  const [result, setResult] = useState(null);
  const [showSafetyMessage, setShowSafetyMessage] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [copySuccess, setCopySuccess] = useState(false);
  const [shareImageLoading, setShareImageLoading] = useState(false);
  const [shareImageError, setShareImageError] = useState("");
  const resultRef = useRef(null);

  const charCount = input.length;
  const isOverLimit = charCount > MAX_CHARS;

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!input.trim() || isOverLimit) return;

    setIsProcessing(true);

    // Gentle delay for processing state
    setTimeout(() => {
      const classification = classifyThought(input);

      if (classification.isSafetyConcern) {
        setShowSafetyMessage(true);
        setResult(null);
      } else {
        setShowSafetyMessage(false);
        setResult(classification.category);
      }

      setIsProcessing(false);

      // Smooth scroll to result
      setTimeout(() => {
        if (resultRef.current) {
          resultRef.current.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
        }
      }, 100);
    }, 800);
  };

  const handleCopy = async () => {
    if (!result) return;

    try {
      const shareText = generateShareText(result);
      await copyToClipboard(shareText);
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 3000);
    } catch (error) {
      console.error("Copy failed:", error);
    }
  };

  const handleShareImage = async () => {
    if (!result) return;

    setShareImageLoading(true);
    setShareImageError("");

    try {
      await generateShareImage(result);
    } catch (error) {
      setShareImageError("Failed to generate image. Please try again.");
    } finally {
      setShareImageLoading(false);
    }
  };

  const handleReset = () => {
    setInput("");
    setResult(null);
    setShowSafetyMessage(false);
    setCopySuccess(false);
    setShareImageError("");
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "Why do thoughts feel louder at night?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "At night, external distractions fade away, leaving your mind with fewer competing inputs. This lack of external stimulation allows internal thoughts to feel more prominent and intense. Additionally, fatigue can reduce your ability to regulate worry, making thoughts feel more overwhelming.",
        },
      },
      {
        "@type": "Question",
        name: "Is overthinking at night normal?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes, nighttime overthinking is extremely common. Many people experience racing thoughts before sleep. It's often a combination of tiredness lowering mental defenses, silence amplifying internal noise, and the brain's natural attempt to process the day. While common, it doesn't mean you have to accept it as permanent.",
        },
      },
      {
        "@type": "Question",
        name: "How do I calm racing thoughts before sleep?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Start by externalizing the thought—write it down or speak it aloud to take it out of your head. Use a simple ritual like three slow breaths or a grounding statement. The goal isn't to solve the thought or make it disappear, but to acknowledge it and give your mind permission to rest. Tools like journaling can help create distance between you and your thoughts.",
        },
      },
    ],
  };

  return (
    <div className="min-h-screen bg-[#faf8f5] text-base-content flex flex-col">
      <NextSeo
        title="What Is Your 2AM Thought? | Free Overthinking Decoder"
        description="Can't sleep because of racing thoughts? Paste your 2AM thought and understand what your mind may be trying to protect."
        canonical="https://getpippin.app/overthinking-decoder"
        openGraph={{
          type: "website",
          locale: "en_US",
          url: "https://getpippin.app/overthinking-decoder",
          siteName: "Pippin",
          title: "What Is Your 2AM Thought? | Free Overthinking Decoder",
          description:
            "Can't sleep because of racing thoughts? Paste your 2AM thought and understand what your mind may be trying to protect.",
          images: [
            {
              url: "/pippin-banner.jpg",
              width: 1200,
              height: 630,
              alt: "Pippin Overthinking Decoder",
            },
          ],
        }}
        additionalMetaTags={[
          {
            name: "keywords",
            content:
              "overthinking, racing thoughts, 2am thoughts, anxiety, night thoughts, sleep anxiety, mental health, thought decoder, pippin",
          },
        ]}
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <Navbar />

      <main className="grow w-full">
        {/* Hero Section */}
        <section className="w-full max-w-2xl mx-auto px-4 py-20 md:py-28">
          <div
            className="text-center mb-16"
            style={{
              background:
                "radial-gradient(circle at top, rgba(147, 197, 253, 0.08) 0%, transparent 60%)",
            }}
          >
            <motion.p
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-base md:text-lg text-slate-500 mb-10 tracking-wide"
              style={{ letterSpacing: "0.02em" }}
            >
              If your mind is still awake...
            </motion.p>
            <motion.h1
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className={`text-3xl md:text-4xl lg:text-5xl mb-8 leading-relaxed ${plusJakartaSans.className}`}
              style={{ fontWeight: 700, lineHeight: 1.4 }}
            >
              Your 2AM Thought Might Be Trying To Protect Something.
            </motion.h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-base md:text-lg text-slate-600 max-w-xl mx-auto leading-relaxed"
            >
              Paste the thought that won&apos;t let you sleep.
            </motion.p>
          </div>

          <motion.form
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            onSubmit={handleSubmit}
            className="w-full"
          >
            <div className="form-control w-full mb-3">
              <label htmlFor="thought-input" className="label mb-2">
                <span className="text-sm font-normal text-slate-600 bg-slate-50/80 px-3 py-1.5 rounded-full">
                  This stays here. Nothing is saved.
                </span>
                <span
                  className={`label-text-alt text-xs ${
                    isOverLimit ? "text-rose-400" : "text-slate-400"
                  }`}
                >
                  {charCount}/{MAX_CHARS}
                </span>
              </label>
              <textarea
                id="thought-input"
                className={`w-full h-40 text-base px-4 py-3 rounded-xl border-2 bg-[#fffbf7]/80 backdrop-blur-sm resize-none transition-all duration-200 placeholder:text-slate-300 ${
                  isOverLimit
                    ? "border-rose-300 focus:border-rose-400"
                    : "border-slate-200 focus:border-slate-300"
                } focus:outline-none shadow-inner`}
                placeholder="I keep replaying what I said in that meeting earlier. Why did I phrase it that way? They probably think I'm so awkward..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                maxLength={MAX_CHARS + 50}
                aria-describedby="char-count-hint"
                style={{
                  lineHeight: 1.6,
                }}
              />
              <label className="label">
                <span className="label-text-alt text-xs text-slate-400 italic">
                  Write it exactly as it shows up in your head.
                </span>
              </label>
              {isOverLimit && (
                <label className="label">
                  <span className="label-text-alt text-sm text-rose-400">
                    Please keep your thought under {MAX_CHARS} characters
                  </span>
                </label>
              )}
            </div>

            <button
              type="submit"
              className="w-full py-3.5 text-base font-medium rounded-full transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed bg-slate-700 text-white hover:bg-slate-800 hover:scale-[1.01] active:scale-[0.99] shadow-sm"
              disabled={!input.trim() || isOverLimit || isProcessing}
            >
              {isProcessing ? "Taking a quiet look..." : "Decode My Thought"}
            </button>
          </motion.form>
        </section>

        {/* Result Section */}
        <AnimatePresence mode="wait">
          {(result || showSafetyMessage) && (
            <motion.section
              key="result-section"
              ref={resultRef}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="w-full max-w-2xl mx-auto px-4 py-12 md:py-16"
            >
              {/* Safety Message */}
              {showSafetyMessage && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3 }}
                  className="bg-white/80 backdrop-blur-sm shadow-sm rounded-2xl p-8 border border-slate-100"
                >
                  <p className="text-base mb-4 leading-relaxed text-slate-700">
                    If your thoughts feel overwhelming or unsafe, you deserve
                    real support.
                  </p>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    Please consider reaching out to trusted support in your
                    area.
                  </p>
                  <div className="mt-6 flex justify-end">
                    <button
                      onClick={handleReset}
                      className="text-sm text-slate-600 hover:text-slate-800 transition-colors"
                    >
                      Start Over
                    </button>
                  </div>
                </motion.div>
              )}

              {/* Category Result */}
              {result && (
                <div className="space-y-8">
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.4, delay: 0.1 }}
                    className="text-sm text-slate-500 text-center"
                  >
                    Here&apos;s what your mind may be trying to protect.
                  </motion.p>

                  {/* Main Result Card */}
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.2 }}
                    className="bg-white/80 backdrop-blur-sm shadow-sm rounded-2xl p-8 md:p-10 border border-slate-100"
                  >
                    <h2
                      className={`text-2xl md:text-3xl mb-8 ${plusJakartaSans.className}`}
                      style={{ fontWeight: 700 }}
                    >
                      {result.title}
                    </h2>

                    <div className="space-y-8">
                      <div>
                        <h3 className="text-sm font-normal text-slate-500 mb-3">
                          Why this shows up at night
                        </h3>
                        <p className="text-base text-slate-700 leading-relaxed">
                          {result.explanation}
                        </p>
                      </div>

                      <div>
                        <h3 className="text-sm font-normal text-slate-500 mb-3">
                          What you might be needing
                        </h3>
                        <p className="text-base text-slate-700 leading-relaxed">
                          {result.emotionalNeed}
                        </p>
                      </div>

                      <div>
                        <h3 className="text-sm font-normal text-slate-500 mb-3">
                          A gentle reframe
                        </h3>
                        <p className="text-base text-slate-700 leading-relaxed">
                          {result.reframe}
                        </p>
                      </div>

                      <div className="bg-slate-50/80 p-6 rounded-xl border border-slate-100">
                        <h3 className="text-sm font-normal text-slate-500 mb-4">
                          60-second release ritual
                        </h3>
                        <ol className="space-y-3">
                          {result.ritual.map((step, index) => (
                            <li
                              key={index}
                              className="text-base text-slate-700 leading-relaxed flex gap-3"
                            >
                              <span className="text-slate-400 font-medium min-w-6">
                                {index + 1}.
                              </span>
                              <span>{step}</span>
                            </li>
                          ))}
                        </ol>
                      </div>

                      <div className="bg-blue-50/30 p-6 rounded-xl border-l-2 border-blue-200/50">
                        <h3 className="text-sm font-normal text-slate-500 mb-3">
                          Reflection
                        </h3>
                        <p className="text-base italic text-slate-700 leading-relaxed">
                          {result.reflectionQuestion}
                        </p>
                      </div>
                    </div>

                    {/* Share Buttons */}
                    <div className="flex flex-wrap gap-3 mt-8 justify-end">
                      <button
                        onClick={handleCopy}
                        className="text-sm text-slate-600 hover:text-slate-800 transition-colors px-4 py-2"
                      >
                        {copySuccess ? "✓ Copied" : "Copy Result"}
                      </button>
                      <button
                        onClick={handleShareImage}
                        className="text-sm text-slate-600 hover:text-slate-800 transition-colors px-4 py-2"
                        disabled={shareImageLoading}
                      >
                        {shareImageLoading ? "Generating..." : "Share as Image"}
                      </button>
                    </div>

                    {shareImageError && (
                      <div className="mt-3 text-sm text-rose-400">
                        {shareImageError}
                      </div>
                    )}

                    <button
                      onClick={handleReset}
                      className="text-sm text-slate-500 hover:text-slate-700 transition-colors mt-4 block"
                    >
                      Decode Another Thought
                    </button>
                  </motion.div>

                  {/* Conversion Block */}
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.4 }}
                    className="bg-linear-to-br from-slate-50/80 to-blue-50/20 backdrop-blur-sm rounded-2xl p-8 md:p-10 border border-slate-100"
                  >
                    <div className="text-center max-w-lg mx-auto">
                      <p className="text-sm text-slate-500 mb-6 italic">
                        Now that you&apos;ve seen it more clearly...
                      </p>
                      <h3
                        className={`text-xl md:text-2xl mb-4 ${plusJakartaSans.className}`}
                        style={{ fontWeight: 700 }}
                      >
                        You don&apos;t have to carry this into tomorrow.
                      </h3>
                      <p className="text-base text-slate-600 mb-6 leading-relaxed">
                        If it helps, you can gently lock this thought away
                        inside Pippin so it doesn&apos;t follow you into the
                        morning.
                      </p>
                      <a
                        href="https://apps.apple.com/us/app/pippin-overthinking-journal/id6755423327"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-block px-8 py-3 text-base font-medium rounded-full bg-slate-700 text-white hover:bg-slate-800 transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] shadow-sm"
                      >
                        Lock It Away in Pippin
                      </a>
                      <p className="text-xs text-slate-500 mt-4">
                        No credit card required
                      </p>
                    </div>
                  </motion.div>
                </div>
              )}
            </motion.section>
          )}
        </AnimatePresence>

        {/* Subtle Divider */}
        <div className="w-full max-w-2xl mx-auto px-4 py-20 md:py-24">
          <div className="border-t border-slate-200/30"></div>
        </div>

        {/* Why Overthinking Feels Worse at Night */}
        <section className="w-full max-w-2xl mx-auto px-4 py-8 bg-white/30">
          <h2
            className={`text-xl md:text-2xl mb-4 text-slate-600 ${plusJakartaSans.className}`}
            style={{ fontWeight: 700 }}
          >
            Why Overthinking Feels Worse at Night
          </h2>
          <div className="prose prose-base max-w-none">
            <p className="text-slate-500 leading-relaxed text-base">
              When the world quiets down and external distractions fade, your
              internal thoughts naturally move to the foreground. During the
              day, your attention is divided across tasks, conversations, and
              stimuli—but at night, that buffer disappears. Additionally,
              tiredness lowers your mental defenses, making it harder to
              regulate worry or redirect your focus. Your thoughts aren&apos;t
              actually louder—they&apos;re just competing with less. This
              creates the perfect conditions for overthinking to take hold,
              turning small concerns into spiraling loops that feel impossible
              to escape.
            </p>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="w-full max-w-2xl mx-auto px-4 py-8 bg-white/30">
          <h2
            className={`text-xl md:text-2xl mb-6 text-slate-600 ${plusJakartaSans.className}`}
            style={{ fontWeight: 700 }}
          >
            Common Questions
          </h2>
          <div className="space-y-3">
            <details className="group bg-white/50 rounded-lg border border-slate-100/50">
              <summary className="cursor-pointer px-5 py-4 text-sm font-medium text-slate-600 hover:text-slate-800 transition-colors list-none flex items-center justify-between">
                <span>Why do thoughts feel louder at night?</span>
                <span className="text-slate-400 group-open:rotate-45 transition-transform">
                  +
                </span>
              </summary>
              <div className="px-5 pb-4">
                <p className="text-sm text-slate-500 leading-relaxed">
                  At night, external distractions fade away, leaving your mind
                  with fewer competing inputs. This lack of external stimulation
                  allows internal thoughts to feel more prominent and intense.
                  Additionally, fatigue can reduce your ability to regulate
                  worry, making thoughts feel more overwhelming.
                </p>
              </div>
            </details>

            <details className="group bg-white/50 rounded-lg border border-slate-100/50">
              <summary className="cursor-pointer px-5 py-4 text-sm font-medium text-slate-600 hover:text-slate-800 transition-colors list-none flex items-center justify-between">
                <span>Is overthinking at night normal?</span>
                <span className="text-slate-400 group-open:rotate-45 transition-transform">
                  +
                </span>
              </summary>
              <div className="px-5 pb-4">
                <p className="text-sm text-slate-500 leading-relaxed">
                  Yes, nighttime overthinking is extremely common. Many people
                  experience racing thoughts before sleep. It&apos;s often a
                  combination of tiredness lowering mental defenses, silence
                  amplifying internal noise, and the brain&apos;s natural
                  attempt to process the day. While common, it doesn&apos;t mean
                  you have to accept it as permanent.
                </p>
              </div>
            </details>

            <details className="group bg-white/50 rounded-lg border border-slate-100/50">
              <summary className="cursor-pointer px-5 py-4 text-sm font-medium text-slate-600 hover:text-slate-800 transition-colors list-none flex items-center justify-between">
                <span>How do I calm racing thoughts before sleep?</span>
                <span className="text-slate-400 group-open:rotate-45 transition-transform">
                  +
                </span>
              </summary>
              <div className="px-5 pb-4">
                <p className="text-sm text-slate-500 leading-relaxed">
                  Start by externalizing the thought—write it down or speak it
                  aloud to take it out of your head. Use a simple ritual like
                  three slow breaths or a grounding statement. The goal
                  isn&apos;t to solve the thought or make it disappear, but to
                  acknowledge it and give your mind permission to rest. Tools
                  like journaling can help create distance between you and your
                  thoughts.
                </p>
              </div>
            </details>
          </div>
        </section>

        {/* Related Reading */}
        <section className="w-full max-w-2xl mx-auto px-4 py-8 pb-16 bg-white/30">
          <h2
            className={`text-xl md:text-2xl mb-6 text-slate-600 ${plusJakartaSans.className}`}
            style={{ fontWeight: 700 }}
          >
            Related Reading
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <Link
              href="/blog/night-overthinking/why-you-overthink-at-night"
              className="group bg-white/60 border border-slate-100/50 rounded-lg p-5 hover:bg-white/80 hover:shadow-sm transition-all duration-300"
            >
              <div className="flex items-center gap-2 text-xs text-slate-500 mb-3">
                <span>5 min read</span>
              </div>
              <h3 className="font-medium text-sm text-slate-700 mb-2 group-hover:text-slate-900 transition-colors">
                Why You Overthink More at Night
              </h3>
              <p className="text-xs text-slate-500 line-clamp-2 mb-4">
                Understanding the psychology behind nighttime thought patterns.
              </p>
              <div className="flex items-center gap-2 text-xs text-slate-600 font-medium group-hover:gap-3 transition-all">
                <span>Read article</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                  className="w-3 h-3"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                  />
                </svg>
              </div>
            </Link>

            <Link
              href="/blog/night-overthinking/racing-thoughts-before-sleep"
              className="group bg-white/60 border border-slate-100/50 rounded-lg p-5 hover:bg-white/80 hover:shadow-sm transition-all duration-300"
            >
              <div className="flex items-center gap-2 text-xs text-slate-500 mb-3">
                <span>6 min read</span>
              </div>
              <h3 className="font-medium text-sm text-slate-700 mb-2 group-hover:text-slate-900 transition-colors">
                Racing Thoughts Before Bed
              </h3>
              <p className="text-xs text-slate-500 line-clamp-2 mb-4">
                Practical approaches to calm your mind when it won&apos;t slow
                down.
              </p>
              <div className="flex items-center gap-2 text-xs text-slate-600 font-medium group-hover:gap-3 transition-all">
                <span>Read article</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                  className="w-3 h-3"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                  />
                </svg>
              </div>
            </Link>

            <Link
              href="/blog/night-overthinking/stop-anxious-overthinking-quiet-thoughts-night"
              className="group bg-white/60 border border-slate-100/50 rounded-lg p-5 hover:bg-white/80 hover:shadow-sm transition-all duration-300"
            >
              <div className="flex items-center gap-2 text-xs text-slate-500 mb-3">
                <span>7 min read</span>
              </div>
              <h3 className="font-medium text-sm text-slate-700 mb-2 group-hover:text-slate-900 transition-colors">
                How to Stop Replaying Conversations at 2AM
              </h3>
              <p className="text-xs text-slate-500 line-clamp-2 mb-4">
                Breaking free from social overthinking loops.
              </p>
              <div className="flex items-center gap-2 text-xs text-slate-600 font-medium group-hover:gap-3 transition-all">
                <span>Read article</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                  className="w-3 h-3"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                  />
                </svg>
              </div>
            </Link>
          </div>
        </section>
      </main>

      <div className="bg-slate-50/50">
        <Footer />
      </div>
    </div>
  );
}
