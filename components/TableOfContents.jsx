import React, { useState, useEffect } from "react";
import { Plus_Jakarta_Sans } from "next/font/google";

const plusJakartaSans = Plus_Jakarta_Sans({
  weight: ["400", "600", "800"],
  subsets: ["latin"],
});

export default function TableOfContents() {
  const [headings, setHeadings] = useState([]);
  const [activeId, setActiveId] = useState(null);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // Extract all H2 headings from the article
    const article = document.querySelector("article");
    if (!article) return;

    const headingElements = Array.from(article.querySelectorAll("h2"));
    const extractedHeadings = headingElements.map((heading) => ({
      id: heading.id,
      text: heading.textContent,
      level: parseInt(heading.tagName[1]),
    }));

    setHeadings(extractedHeadings);

    // Set up intersection observer for active heading
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: "-100px 0px -66% 0px" },
    );

    headingElements.forEach((heading) => observer.observe(heading));
    return () => observer.disconnect();
  }, []);

  if (headings.length === 0) return null;

  const handleClick = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
      setActiveId(id);
      setIsOpen(false); // Close mobile menu after click
    }
  };

  return (
    <>
      {/* Mobile floating button */}
      <div className="xl:hidden fixed bottom-6 right-6 z-50">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="btn btn-circle btn-primary shadow-lg"
          aria-label="Toggle Table of Contents"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
            />
          </svg>
        </button>
      </div>

      {/* Mobile modal/drawer */}
      {isOpen && (
        <div
          className="xl:hidden fixed inset-0 z-40"
          onClick={() => setIsOpen(false)}
        >
          <div className="absolute inset-0 bg-black/50" />
          <div
            className="absolute bottom-0 left-0 right-0 bg-base-100 rounded-t-2xl p-6 max-h-[80vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-4">
              <h3
                className={`${plusJakartaSans.className} text-lg font-bold text-base-content`}
              >
                Table of Contents
              </h3>
              <button
                onClick={() => setIsOpen(false)}
                className="btn btn-ghost btn-sm btn-circle"
              >
                ✕
              </button>
            </div>
            <nav className="space-y-2">
              {headings.map((heading) => (
                <button
                  key={heading.id}
                  onClick={() => handleClick(heading.id)}
                  className={`block w-full text-left transition-colors py-2 px-3 rounded-lg text-sm ${
                    activeId === heading.id
                      ? "bg-primary/10 text-primary font-semibold"
                      : "text-base-content/70 hover:bg-base-200 hover:text-primary"
                  }`}
                >
                  {heading.text}
                </button>
              ))}
            </nav>
          </div>
        </div>
      )}

      {/* Desktop sidebar */}
      <div className="hidden xl:block">
        <div className="p-4 bg-base-200/50 rounded-lg border border-base-300 ">
          <h3
            className={`${plusJakartaSans.className} text-sm font-bold uppercase tracking-wider text-base-content mb-4`}
          >
            On This Page
          </h3>
          <nav className="space-y-1">
            {headings.map((heading) => (
              <button
                key={heading.id}
                onClick={() => handleClick(heading.id)}
                className={`block w-full text-left transition-all py-1.5 px-2 rounded text-sm ${
                  activeId === heading.id
                    ? "text-primary font-semibold border-l-2 border-primary bg-primary/5"
                    : "text-base-content/70 hover:text-primary hover:bg-base-200/50 border-l-2 border-transparent"
                }`}
              >
                {heading.text}
              </button>
            ))}
          </nav>
        </div>
      </div>
    </>
  );
}
