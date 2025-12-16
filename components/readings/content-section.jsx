import React from "react";
import { ChevronDown } from "lucide-react";
import Markdown from "markdown-to-jsx";
import clsx from "clsx";

export function ContentSection({
  reading,
  setIsSectionOpen,
  isSectionOpen,
  title,
  subtitle,
  firstSection,
}) {
  if (reading) {
    return (
      <section
        className={clsx(
          "pt-4",
          firstSection ? "" : "border-t border-batik-border pt-4"
        )}
      >
        <button
          onClick={() => setIsSectionOpen(!isSectionOpen)}
          className="w-full flex justify-between items-center text-left focus:outline-none"
        >
          <h2 className="text-xl font-semibold">{title}</h2>
          <ChevronDown
            className={`w-6 h-6 transform transition-transform duration-300 text-batik-text ${
              isSectionOpen ? "rotate-180" : ""
            }`}
          />
        </button>
        <div
          className={`grid transition-all duration-500 ease-in-out ${
            isSectionOpen
              ? "grid-rows-[1fr] opacity-100 mt-4"
              : "grid-rows-[0fr] opacity-0"
          }`}
        >
          <div className="overflow-hidden">
            <div className="flex flex-col">
              {subtitle && (
                <div className="font-semibold text-lg text-batik-text">
                  {subtitle}
                </div>
              )}
              <Markdown
                className="text-gray-700"
                options={{
                  overrides: {
                    p: {
                      props: {
                        className: "pb-4 last:pb-0",
                      },
                    },
                    li: {
                      props: {
                        className: "pb-2 last:pb-0",
                      },
                    },
                  },
                }}
              >
                {reading?.replace(/—/gi, ", ")}
              </Markdown>
            </div>
          </div>
        </div>
      </section>
    );
  }
}
