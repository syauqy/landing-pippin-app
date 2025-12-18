import React from "react";
import Link from "next/link";
import { Caveat } from "next/font/google";
import clsx from "clsx";

const caveat = Caveat({
  weight: "700",
  subsets: ["latin"],
});

export function Footer({ bg }) {
  return (
    <footer className={clsx(bg, "py-12")}>
      <div className="container mx-auto px-4 xl:px-0">
        <div className="flex flex-col md:flex-row justify-between items-center md:items-start">
          <div className="mb-4 md:mb-0 text-center md:text-left">
            <Link
              href="/"
              className={clsx(
                "text-4xl font-bold text-base-content flex items-center gap-2 justify-center md:justify-start",
                caveat.className
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
            <p className="text-base-content">
              © 2025 Pippin. All rights reserved.
            </p>
          </div>
          <div className="w-full md:w-fit order-first text-center md:text-left flex flex-col gap-2 mb-6 md:mb-0 md:order-0">
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
        <div className="mt-5 flex justify-center items-center md:justify-start gap-2">
          <a
            href="https://fazier.com/launches/getpippin.app"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              src="https://fazier.com/api/v1//public/badges/launch_badges.svg?badge_type=launched&theme=light"
              // width={120}
              alt="Fazier badge"
            />
          </a>
          <a
            href="https://turbo0.com/item/pippin-overthinking-journal"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              src="https://img.turbo0.com/badge-listed-light.svg"
              alt="Listed on Turbo0"
              style={{ height: "54px", width: "auto" }}
            />
          </a>
        </div>
      </div>
    </footer>
  );
}
