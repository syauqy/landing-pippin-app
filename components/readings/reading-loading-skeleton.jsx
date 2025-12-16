import React from "react";

export function ReadingLoadingSkeleton() {
  return (
    <div className="py-5 animate-pulse bg-base-100 md:p-6 max-w-3xl mx-auto space-y-6 pb-16">
      <div className="space-y-4">
        <div className="space-y-3">
          <h2 className="h-7 w-1/2 bg-slate-200 rounded-2xl"></h2>
          <p className="bg-slate-200 rounded-2xl h-5 mb-2"></p>
          <p className="bg-slate-200 rounded-2xl h-5 mb-2 w-1/2"></p>
        </div>
        <div className="space-y-3 py-4">
          <h2 className="h-7 w-3/5 bg-slate-200 rounded-2xl"></h2>
          <p className="bg-slate-200 rounded-2xl h-5 mb-2"></p>
          <p className="bg-slate-200 rounded-2xl h-5 mb-2"></p>
          <p className="bg-slate-200 rounded-2xl h-5 mb-2"></p>
          <p className="bg-slate-200 rounded-2xl h-5 mb-2"></p>
        </div>
        <div className="space-y-3 py-4">
          <h2 className="h-7 w-1/2 bg-slate-200 rounded-2xl"></h2>
          <p className="bg-slate-200 rounded-2xl h-5 mb-2"></p>
          <p className="bg-slate-200 rounded-2xl h-5 mb-2"></p>
          <p className="bg-slate-200 rounded-2xl h-5 mb-2"></p>
          <p className="bg-slate-200 rounded-2xl h-5 mb-2"></p>
        </div>
        <div className="space-y-3 py-4">
          <h2 className="h-7 w-1/2 bg-slate-200 rounded-2xl"></h2>
          <p className="bg-slate-200 rounded-2xl h-5 mb-2"></p>
          <p className="bg-slate-200 rounded-2xl h-5 mb-2"></p>
          <p className="bg-slate-200 rounded-2xl h-5 mb-2"></p>
          <p className="bg-slate-200 rounded-2xl h-5 mb-2"></p>
        </div>
      </div>
    </div>
  );
}
