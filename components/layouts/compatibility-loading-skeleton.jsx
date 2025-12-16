import React from "react";

export function CompatibilityLoadingSkeleton({ compatibilityType }) {
  return (
    <div className="flex-col items-center text-center mb-4 p-5 animate-pulse pb-16">
      <div className="flex flex-col items-center gap-2 my-5">
        <div className="h-4 w-full bg-slate-200 rounded-2xl"></div>
        <div className="h-4 w-1/2 bg-slate-200 rounded-2xl"></div>
      </div>
      <div className="flex my-4 flex-row justify-between">
        <div className="p-2 flex-col flex items-center w-[45%]">
          <div className="h-6 w-2/3 bg-slate-200 rounded-2xl mb-3"></div>
          <div className="avatar">
            <div className="size-24 bg-slate-200 rounded-full"></div>
          </div>
          <div className="mt-3">
            <p className="text-xl font-bold text-batik-black"></p>
            <div className="flex flex-col items-center text-sm">
              <div className="h-4 w-1/2 bg-slate-200 rounded-2xl"></div>
            </div>
          </div>
        </div>
        <div className="flex-grow w-fit">
          <div className="flex h-full justify-center items-center text-2xl font-semibold"></div>
        </div>
        <button className="p-2 flex-col flex items-center w-[45%] ">
          <div className="h-6 w-2/3 bg-slate-200 rounded-2xl mb-3"></div>
          <div className="avatar">
            <div className="size-24 bg-slate-200 rounded-full"></div>
          </div>
          <div className="mt-3">
            <div className="flex flex-col items-center text-sm">
              <div className="h-5 w-1/2 bg-slate-200 rounded-2xl"></div>
            </div>
          </div>
        </button>
      </div>
    </div>
  );
}
