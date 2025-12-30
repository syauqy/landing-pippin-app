import React from "react";
import { motion } from "framer-motion";

const badges = [
  {
    href: "https://fazier.com/launches/pippin-overthiking-journal",
    src: "https://fazier.com/api/v1/public/badges/embed_image.svg?launch_id=6389&badge_type=daily&theme=light",
    alt: "Fazier badge",
  },
  {
    href: "https://turbo0.com/item/pippin-overthinking-journal",
    src: "https://img.turbo0.com/badge-listed-light.svg",
    alt: "Listed on Turbo0",
  },
  {
    href: "https://findly.tools/pippin-overthinking-journal?utm_source=pippin-overthinking-journal",
    src: "https://findly.tools/badges/findly-tools-badge-light.svg",
    alt: "Featured on findly.tools",
  },
  {
    href: "https://launchigniter.com/product/pippin-overthinking-journal?ref=badge-pippin-overthinking-journal",
    src: "https://launchigniter.com/api/badge/pippin-overthinking-journal?theme=light",
    alt: "Featured on LaunchIgniter",
  },
  {
    href: "https://twelve.tools",
    src: "https://twelve.tools/badge1-white.svg",
    alt: "Featured on Twelve Tools",
  },
  {
    href: "https://saasfame.com/item/pippin",
    src: "https://saasfame.com/badge-light.svg",
    alt: "Featured on saasfame.com",
  },
  {
    href: "https://auraplusplus.com/projects/pippin-overthinking-journal",
    src: "https://auraplusplus.com/images/badges/featured-on-light.svg",
    alt: "Featured on Aura++",
  },
  {
    href: "https://wired.business",
    src: "https://wired.business/badge1-white.svg",
    alt: "Featured on Wired Business",
  },
  {
    href: "https://dofollow.tools",
    src: "https://dofollow.tools/badge/badge_light.svg",
    alt: "Featured on Dofollow.Tools",
  },
];

export function BadgeMarquee() {
  // Duplicate badges for seamless loop
  const duplicatedBadges = [...badges, ...badges];

  return (
    <div className="mt-5 w-full overflow-hidden">
      <motion.div
        className="flex gap-4 md:gap-6"
        animate={{ x: [0, -2000] }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "linear",
          repeatType: "loop",
        }}
        style={{ whiteSpace: "nowrap", display: "flex" }}
      >
        {duplicatedBadges.map((badge, index) => (
          <a
            key={index}
            href={badge.href}
            target="_blank"
            rel={
              badge.href.includes("dofollow.tools")
                ? "noopener"
                : "noopener noreferrer"
            }
            className="flex-shrink-0"
          >
            <img
              src={badge.src}
              alt={badge.alt}
              style={{ height: "35px", width: "auto" }}
              loading="lazy"
            />
          </a>
        ))}
      </motion.div>
    </div>
  );
}
