import React from "react";

export function ReadingLoading() {
  return (
    <div className="flex h-[30rem] flex-col items-center justify-center bg-base-100 text-base-content">
      <span className="loading loading-spinner loading-lg text-rose-400"></span>
      <p className="mt-4">Generating Your Reading...</p>
    </div>
  );
}
