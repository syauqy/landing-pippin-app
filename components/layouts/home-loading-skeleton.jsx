import React from "react";

export function HomeLoadingSkeleton() {
  return (
    <div className="p-5 animate-pulse pb-16">
      <div className="space-y-4">
        <p className="h-60 w-full bg-slate-200 rounded-2xl"></p>
        <p className="h-20 w-full bg-slate-200 rounded-2xl"></p>
        <p className="h-80 bg-slate-200 rounded-2xl w-full"></p>
        <p className="h-32 w-full bg-slate-200 rounded-2xl"></p>
        <p className="h-8 w-1/3 bg-slate-200 rounded-2xl"></p>
        <div className="flex flex-row gap-4">
          <p className="h-32 w-full bg-slate-200 rounded-2xl"></p>
          <p className="h-32 w-full bg-slate-200 rounded-2xl"></p>
          <p className="h-32 w-full bg-slate-200 rounded-2xl"></p>
        </div>
      </div>
    </div>
  );
}
