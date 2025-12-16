import React from "react";

export function ProfileLoadingSkeleton() {
  return (
    <div className="flex-grow overflow-y-auto pt-4 sm:pt-6 pb-20 animate-pulse">
      <div className="px-5 mb-6 flex items-center gap-4">
        <div className="avatar">
          <div className="w-16 h-16 rounded-full bg-gray-200" />
        </div>
        <div className="flex flex-col gap-2 max-w-[80%]">
          <div className="h-6 bg-gray-200 rounded w-32 mb-2" />
          <div className="h-4 bg-gray-200 rounded w-20" />
          <div className="flex items-center gap-2 text-sm mt-2">
            <div className="h-4 w-12 bg-gray-200 rounded" />
            <div className="h-4 w-12 bg-gray-200 rounded" />
          </div>
          <div className="h-7 w-32 bg-gray-200 rounded mt-2" />
        </div>
      </div>
      <div className="px-5">
        <div className="mb-4 border-2 rounded-2xl border-gray-100 bg-gray-100">
          <nav className="grid grid-cols-3 gap-2 py-2 px-4">
            <div className="h-8 bg-gray-200 rounded" />
            <div className="h-8 bg-gray-200 rounded" />
            <div className="h-8 bg-gray-200 rounded" />
          </nav>
        </div>
        <div className="flex flex-col gap-5">
          <div className="flex flex-row gap-4 text-sm">
            <div className="flex flex-col ">
              <div className="h-5 w-24 p-2 bg-gray-200 rounded mb-2" />
              <div className="h-5 w-24 p-2 bg-gray-200 rounded mb-2" />
              <div className="h-5 w-24 p-2 bg-gray-200 rounded mb-2" />
              <div className="h-5 w-24 p-2 bg-gray-200 rounded mb-2" />
            </div>
            <div className="flex flex-col ">
              <div className="h-5 w-32 bg-gray-200 rounded mb-2" />
              <div className="h-5 w-32 bg-gray-200 rounded mb-2" />
              <div className="h-5 w-32 bg-gray-200 rounded mb-2" />
              <div className="h-5 w-32 bg-gray-200 rounded mb-2" />
            </div>
          </div>
          <div className="bg-base-100 rounded-2xl p-4 md:p-6 mb-6 border border-[var(--color-batik-border)]">
            <div className="space-y-4 text-sm">
              <div className="h-5 w-40 bg-gray-200 rounded mb-2" />
              <div className="h-4 w-full bg-gray-200 rounded mb-2" />
              <div className="h-4 w-3/4 bg-gray-200 rounded mb-2" />
              <div className="h-4 w-1/2 bg-gray-200 rounded mb-2" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
