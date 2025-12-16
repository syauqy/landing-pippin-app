import { useState, useEffect } from "react";
import Markdown from "markdown-to-jsx";
import { Navbar } from "@/components/layouts/navbar";
import { Inter } from "next/font/google";
import { Footer } from "@/components/layouts/footer";
import { NextSeo } from "next-seo";
const inter = Inter({ subsets: ["latin"] });

export default function Privacy() {
  const [content, setContent] = useState("");

  useEffect(() => {
    // Fetch the markdown content
    fetch("/content/privacy.md")
      .then((res) => res.text())
      .then((text) => setContent(text))
      .catch((err) => console.error("Error loading privacy policy:", err));
  }, []);

  return (
    <div
      className={`min-h-screen flex flex-col bg-[#F0F5F1] relative ${inter.className}`}
    >
      <NextSeo
        title="Privacy Policy – Pippin"
        description="Privacy Policy for the Pippin journal app. We are committed to protecting your personal information and your right to privacy."
        openGraph={{
          type: "website",
          locale: "en_US",
          url: "https://pippin.app/privacy",
          siteName: "Pippin",
          title: "Privacy Policy – Pippin",
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
              "pippin, privacy policy, journal, overthinking, mental health, minimalist, diary, lockbox, voice input, privacy, capybara, app, ios, android, premium, subscription",
          },
          {
            name: "application-name",
            content: "Pippin",
          },
        ]}
      />
      <Navbar bg={"bg-[#F0F5F1]"} />

      <main className="grow p-5 md:p-6 pb-24 text-[#3A4D39]">
        <div className="max-w-3xl mx-auto ">
          <article className="prose max-w-none">
            <Markdown
              options={{
                overrides: {
                  h1: {
                    props: {
                      className: "text-3xl font-bold text-[#3A4D39] mb-6",
                    },
                  },
                  h3: {
                    props: {
                      className:
                        "text-xl font-semibold text-[#3A4D39] mt-8 mb-4",
                    },
                  },
                  p: {
                    props: {
                      className: "text-[#5A785A] mb-4",
                    },
                  },
                  strong: {
                    component: ({ children }) => (
                      <strong className="font-semibold ">{children}</strong>
                    ),
                  },
                  ul: {
                    component: ({ children }) => (
                      <ul className="list-disc pl-6 mb-4 text-[#5A785A]">
                        {children}
                      </ul>
                    ),
                  },
                  li: {
                    props: { className: "mb-2" },
                  },
                  a: {
                    component: ({ children, href }) => (
                      <a className="text-[#6A8A69] underline" href={href}>
                        {children}
                      </a>
                    ),
                  },
                },
              }}
            >
              {content}
            </Markdown>
          </article>
        </div>
      </main>

      <Footer bg={"bg-[#F0F5F1]"} />
    </div>
  );
}
