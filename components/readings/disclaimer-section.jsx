import React from "react";

export function DisclaimerSection({ title, description }) {
  return (
    <section className="flex flex-col gap-2 p-4 border-slate-100 border rounded-2xl bg-base-100 shadow-sm mt-10">
      <div className="flex flex-row gap-5 justify-between items-center">
        <div className="text-batik-black font-medium leading-5">{title}</div>
        <div className="text-2xl">⚠️</div>
      </div>

      <p className="text-sm text-gray-500">{description}</p>
    </section>
  );
}
