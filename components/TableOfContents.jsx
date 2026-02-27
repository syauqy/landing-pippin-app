import React, { useState, useEffect } from "react";
import { Plus_Jakarta_Sans } from "next/font/google";

const plusJakartaSans = Plus_Jakarta_Sans({
  weight: ["400", "600", "800"],
  subsets: ["latin"],
});

export default function TableOfContents() {
  const [headings, setHeadings] = useState([]);
  const [activeId, setActiveId] = useState(null);

  useEffect(() => {
    // Extract all H2 and H3 headings from the article
    const article = document.querySelector("article");
    if (!article) return;

    const headingElements = Array.from(article.querySelectorAll("h2, h3"));
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
      element.scrollIntoView({ behavior: "smooth" });
      setActiveId(id);
    }
  };

  return (
    <div className="mb-8 p-6 bg-base-200/50 rounded-lg border border-base-300">
      <h3
        className={`${plusJakartaSans.className} text-sm font-bold uppercase tracking-wider text-base-content mb-4`}
      >
        Quick Navigation
      </h3>
      <nav className="space-y-2">
        {headings.map((heading) => (
          <button
            key={heading.id}
            onClick={() => handleClick(heading.id)}
            className={`block w-full text-left transition-colors ${
              heading.level === 3 ? "pl-4 text-sm" : "text-base font-medium"
            } ${
              activeId === heading.id
                ? "text-primary font-semibold"
                : "text-base-content/70 hover:text-primary"
            }`}
          >
            {heading.text}
          </button>
        ))}
      </nav>
    </div>
  );
}
