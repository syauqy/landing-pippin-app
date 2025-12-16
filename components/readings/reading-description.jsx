import React from "react";

export function ReadingDescription({
  reading_category,
  title,
  description,
  topics,
}) {
  return (
    <div className="flex flex-col gap-3 pb-10">
      <div className="px-4 py-2 rounded-full text-xs bg-rose-50 w-fit font-medium">
        {reading_category}
      </div>
      <div className="flex flex-col gap-1">
        <h2 className="text-2xl font-semibold text-left">{title}</h2>
        {description}
      </div>
      <div className="flex flex-col gap-3 py-4">
        <div className="text-lg font-semibold">What You Will Get</div>
        <div className="flex flex-col gap-3">
          {topics?.map((topic, i) => (
            <div key={i} className="flex flex-row gap-4 items-center">
              <div className="text-3xl">{topic?.icon}</div>
              <div className="flex flex-col">
                <div className="font-semibold text-sm">{topic?.title}</div>
                <div className="text-sm text-slate-600">
                  {topic?.description}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
