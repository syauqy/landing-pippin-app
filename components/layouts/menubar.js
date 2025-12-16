import React from "react";
import Link from "next/link";
import { House, User, Heart, CircleUserRound, LoveIcon } from "lucide-react";
import { CrystalBall } from "@/components/icons";
import clsx from "clsx";

export function Menubar({ page }) {
  return (
    <div className="dock dock-lg pb-5 z-20 drop-shadow-md border-t">
      <Link
        href="/home"
        className={clsx(
          page === "home" && "font-semibold text-rose-400",
          "text-batik-text flex flex-col items-center relative mt-2"
        )}
      >
        {page === "home" && (
          <span className="absolute -top-2 inset-0 border-t-[3px] border-rose-400 w-1/2 left-1/2 transform -translate-x-1/2"></span>
        )}
        <House className="h-6 w-6" />
        <span className="dock-label">Home</span>
      </Link>
      <Link
        href="/compatibility"
        className={clsx(
          page === "compatibility" && "font-semibold text-rose-400",
          "text-batik-text flex flex-col items-center mt-2 relative"
        )}
      >
        {page === "compatibility" && (
          <span className="absolute -top-2 inset-0 border-t-[3px] border-rose-400 w-1/2 left-1/2 transform -translate-x-1/2"></span>
        )}
        <Heart className="h-6 w-6" />
        <span className="dock-label">Compatibility</span>
      </Link>
      <Link
        href="/readings"
        className={clsx(
          page === "readings" && "font-semibold text-rose-400",
          "text-batik-text flex flex-col items-center mt-2 relative"
        )}
      >
        {page === "readings" && (
          <span className="absolute -top-2 inset-0 border-t-[3px] bborder-rose-400 w-1/2 left-1/2 transform -translate-x-1/2"></span>
        )}
        <CrystalBall className="h-6 w-6" />
        <span className="dock-label">Readings</span>
      </Link>
      <Link
        href="/profile"
        className={clsx(
          page === "profile" && "font-semibold text-rose-400",
          "text-batik-text flex flex-col items-center mt-2 relative"
        )}
      >
        {page === "profile" && (
          <span className="absolute -top-2 inset-0 border-t-[3px] border-rose-400 w-1/2 left-1/2 transform -translate-x-1/2"></span>
        )}
        <CircleUserRound className="h-6 w-6" />
        <span className="dock-label">Profile</span>
      </Link>
    </div>
  );
}
