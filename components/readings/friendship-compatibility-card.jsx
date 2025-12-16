import React from "react";
import { getCompatibilitySlug, getWetonEmojiScore } from "@/utils";
import Link from "next/link";

export function FriendshipCompatibilityCard({ reading, type }) {
  return (
    <div className="w-full justify-center bg-base-100 rounded-2xl p-4 border border-[var(--color-batik-border)] hover:shadow-lg cursor-pointer">
      <div className="flex flex-col gap-2">
        <div className="flex flex-row gap-2 items-center">
          <div className="text-lg font-bold text-slate-600 leading-6">
            {reading?.title}
          </div>
        </div>
        <div className="p-2 rounded-2xl border-slate-200 border w-fit">
          <div className="flex flex-row gap-1 text-sm font-medium">
            <div>{getWetonEmojiScore(reading?.reading?.score)}</div>
            <div>{reading?.reading?.score}%</div>
            <div className="font-normal text-slate-600">Compatibility</div>
          </div>
        </div>
        <div className="text-sm text-slate-600 text-ellipsis overflow-hidden line-clamp-2">
          {reading?.reading?.header || ""}
        </div>
        <div className="flex flex-row gap-2 items-center overflow-x-scroll">
          <div className="shrink-0 flex flex-row gap-1 items-center px-2 border border-slate-200 rounded-2xl text-sm text-slate-600">
            <span>🎭</span>
            {reading?.reading?.summary?.archetype}
          </div>
          <div className="shrink-0 flex flex-row gap-1 items-center px-2 border border-slate-200 rounded-2xl text-sm text-slate-600">
            <span>🏠</span>
            {reading?.reading?.friendship?.fortune?.result}
          </div>
          <div className="shrink-0 flex flex-row gap-1 items-center px-2 border border-slate-200 rounded-2xl text-sm text-slate-600">
            <span>🤝</span>
            {reading?.reading?.friendship?.character?.result}
          </div>
          <div className="shrink-0 flex flex-row gap-1 items-center px-2 border border-slate-200 rounded-2xl text-sm text-slate-600">
            <span>🔥</span>
            {reading?.reading?.friendship?.power_level?.result}
          </div>
        </div>
      </div>

      <div className="text-right mt-3">
        <Link
          href={`/readings/compatibility/${getCompatibilitySlug(
            reading.slug
          )}?slug=${reading.slug}${type ? `&type=${type}` : ""}`}
          passHref
          className="text-sm font-semibold text-batik-text hover:underline"
        >
          Read More &rarr;
        </Link>
      </div>
    </div>
  );
}
