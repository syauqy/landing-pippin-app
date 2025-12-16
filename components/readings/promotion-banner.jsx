import React from "react";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export function PromotionBanner({ title, content, url, pro, icon }) {
  return (
    <Link
      // href={"/readings/general_readings/laku"}
      href={url}
      className="border rounded-2xl p-4 border-slate-200 mt-4 flex flex-row gap-3 items-center shadow relative"
    >
      <div className="text-3xl text-batik-text">{icon}</div>
      <div className="flex flex-col gap-1">
        <div className="font-semibold text-sm">
          {/* Learn More about {profileData.weton?.laku?.name} */}
          {title}
        </div>
        <div className="text-xs text-gray-700">
          {/* Discover the archetype and behavioral pattern that
                        guides your life's journey. */}
          {content}
        </div>
      </div>
      <ArrowRight size={24} className="text-batik-text shrink-0" />
      {pro && (
        <div className="absolute rounded-xl px-3 py-0.5 z-10 font-semibold bg-amber-400 text-[10px] top-1 right-1 text-batik-black">
          PRO
        </div>
      )}
    </Link>
  );
}
