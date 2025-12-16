import { useState, useEffect } from "react";
import Markdown from "markdown-to-jsx";
import { Navbar } from "@/components/layouts/navbar";
import { Footer } from "@/components/layouts/footer";
import { NextSeo } from "next-seo";

const MARKDOWN_OVERRIDES = {
  h1: {
    component: "h1",
    props: {
      className: "text-2xl font-bold text-base-content mb-4",
    },
  },
  h2: {
    component: "h2",
    props: {
      className: "text-xl font-semibold text-base-content mt-6 mb-3",
    },
  },
  h3: {
    component: "h3",
    props: {
      className: "text-lg font-semibold text-base-content mt-4 mb-2",
    },
  },
  h4: {
    component: "h4",
    props: {
      className: "text-base font-semibold text-base-content mt-3 mb-2",
    },
  },
  p: {
    component: "p",
    props: {
      className: "text-base-content/80 mb-4 leading-relaxed",
    },
  },
  ul: {
    component: "ul",
    props: {
      className: "list-disc list-inside text-base-content/80 mb-4 space-y-2",
    },
  },
  li: {
    component: "li",
    props: {
      className: "text-base-content/80",
    },
  },
  a: {
    component: "a",
    props: {
      className: "text-primary hover:underline",
    },
  },
  strong: {
    component: "strong",
    props: {
      className: "font-semibold text-base-content",
    },
  },
};

export default function Terms() {
  const [content, setContent] = useState("");

  useEffect(() => {
    // Fetch the markdown content
    fetch("/content/terms.md")
      .then((res) => res.text())
      .then((text) => setContent(text))
      .catch((err) => console.error("Error loading terms of service:", err));
  }, []);

  return (
    <div
      className={`min-h-screen flex flex-col bg-gradient-to-b from-[#F8F7F4] to-[#E9E6DF] text-[#2D2A26] relative`}
    >
      <NextSeo
        title="Terms of Service – Pippin"
        description="Terms of Service for the Pippin journal app. Your access to and use of the Service is conditioned upon your acceptance of and compliance with these Terms."
        openGraph={{
          type: "website",
          locale: "en_US",
          url: "https://pippin.app/terms",
          siteName: "Pippin",
          title: "Terms of Service – Pippin",
          description:
            "Minimalist journal for overthinkers. Quiet your mind, lock it away, and let it go.",
          images: [
            {
              url: "/logos/puppin.png",
              width: 1200,
              height: 630,
              alt: "Pippin Mascot Logo",
            },
          ],
        }}
        additionalMetaTags={[
          {
            name: "keywords",
            content:
              "pippin, terms of service, journal, overthinking, mental health, minimalist, diary, lockbox, voice input, privacy, capybara, app, ios, android, premium, subscription",
          },
          {
            name: "application-name",
            content: "Pippin",
          },
        ]}
      />
      <Navbar />

      <main className="flex-grow p-5 md:p-6 pb-24">
        <div className="max-w-3xl mx-auto">
          <article className="prose max-w-none prose-h1:text-4xl prose-h1:font-bold prose-h1:mb-6 prose-h1:mt-0 prose-h2:text-2xl prose-h2:font-semibold prose-h2:mb-4 prose-h2:mt-10 prose-h3:text-xl prose-h3:font-semibold prose-h3:mb-2 prose-h3:mt-8 prose-p:text-lg prose-p:leading-relaxed prose-p:mb-4 prose-a:text-[#6A8A69] prose-a:underline prose-a:font-medium prose-strong:font-bold prose-ul:pl-6 prose-li:mb-2 prose-li:marker:text-[#B6A16B] prose-headings:font-serif prose-headings:text-[#2D2A26] prose-p:text-[#4B463E]">
            <Markdown
              options={{
                overrides: MARKDOWN_OVERRIDES,
              }}
            >
              {content}
            </Markdown>
          </article>
        </div>
      </main>

      <Footer />
    </div>
  );
}
