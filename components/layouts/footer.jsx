import React from "react";
import Link from "next/link";
import { Caveat } from "next/font/google";
import clsx from "clsx";
import { BadgeMarquee } from "../BadgeMarquee";

const caveat = Caveat({
  weight: "700",
  subsets: ["latin"],
});

export function Footer({ bg, showBadgeMarquee = false }) {
  return (
    <footer className={clsx(bg, "py-12")}>
      <div className="container mx-auto px-4 xl:px-0">
        <div className="flex flex-col md:flex-row justify-between items-center md:items-start">
          <div className="mb-4 md:mb-0 text-center md:text-left">
            <Link
              href="/"
              className={clsx(
                "text-4xl font-bold text-base-content flex items-center gap-2 justify-center md:justify-start",
                caveat.className,
              )}
              aria-label="Pippin Home"
            >
              <img
                src="/logos/app-icon-mix-2.jpg"
                alt="Pippin Mascot"
                className="w-8 h-8 md:w-12 md:h-12 inline-block align-middle rounded-2xl overflow-clip object-cover"
              />
              Pippin
            </Link>
            <p className="mt-2 mb-4 text-base-content/60 font-semibold max-w-sm">
              Minimalist journal for overthinkers. Quiet your mind, lock it
              away, and let it go.
            </p>
            <p>
              Made with ❤️ by{" "}
              <a
                className="font-semibold text-slate-500 hover:text-blue-500 transition-colors"
                href="https://www.syauqy.dev"
                target="_blank"
                rel="noopener noreferrer"
              >
                Syauqy
              </a>
            </p>
            <p className="text-base-content">
              © 2025 Pippin. All rights reserved.
            </p>
          </div>
          <div className="w-full md:w-fit order-first text-center md:text-left flex flex-col gap-2 mb-6 md:mb-0 md:order-0">
            <Link
              href="/blog/night-overthinking"
              className="font-semibold text-lg text-base-content/70 hover:text-primary/80 transition-colors flex items-center justify-center md:justify-start gap-2"
            >
              <span>💭</span>
              <span>Overthinking at Night Guide</span>
            </Link>
            <Link
              href="/blog"
              className="font-semibold text-lg text-base-content/70 hover:text-primary transition-colors"
            >
              Blog
            </Link>
            <Link
              href="/support"
              className="font-semibold text-lg text-base-content/70 hover:text-primary"
            >
              Support
            </Link>
            <Link
              href="/privacy"
              className="font-semibold text-lg text-base-content/70 hover:text-primary"
            >
              Privacy Policy
            </Link>
            <Link
              href="/terms"
              className="font-semibold text-lg text-base-content/70 hover:text-primary"
            >
              Terms of Service
            </Link>
            <div className="mt-3 text-sm flex flex-col items-center md:items-start md:gap-2">
              From the maker of{" "}
              <Link
                href="https://www.matcharge.app"
                className={clsx(
                  "text-lg font-bold text-base-content flex items-center gap-2 justify-center md:justify-start py-2",
                )}
                aria-label="Matcharge Home"
              >
                <img
                  src="/logos/matcharge-icon.jpg"
                  alt="Matcharge Mascot"
                  className="w-8 h-8 md:w-12 md:h-12 inline-block align-middle shadow-2xl rounded-xl md:rounded-2xl overflow-clip object-cover"
                />
                <div className="flex flex-col">
                  <p className="leading-5">Matcharge</p>
                  <p className=" text-xs max-w-sm font-light text-center hidden md:block text-base-content/70">
                    Calm way to track your subscriptions
                  </p>
                </div>
              </Link>
            </div>
            <a
              href="https://www.tiktok.com/@the_overthinkerclub"
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-lg text-base-content/70 hover:text-primary flex items-center justify-center md:justify-start gap-2"
            >
              <img
                src="/logos/tiktok.svg"
                alt="TikTok"
                className="size-10 inline-block align-middle"
                style={{ display: "inline" }}
              />
            </a>

            {/* <a href="/faq" className="text-gray-600 hover:text-batik-text">
              FAQ
            </a> */}
          </div>
        </div>
        {/* Directories Badge Section - Marquee */}
        {showBadgeMarquee && <BadgeMarquee />}
      </div>
    </footer>
  );
}
