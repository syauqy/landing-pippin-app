import React from "react";
import { format } from "date-fns";
import { getDayInformation } from "@/utils";
import Markdown from "markdown-to-jsx";
import clsx from "clsx";
import { AnimatedLoadingText } from "./AnimatedLoadingText";
import { dailyLoadingMessages } from "@/lib/loading-content";

export function DailyReadingSection({
  dailyReading,
  setShowDailyReadingSheet,
  showDailyReadingSheet,
  loadingDailyReading,
}) {
  if (!dailyReading) return null;
  const reading = dailyReading?.reading;
  const dailyData = dailyReading?.created_at
    ? getDayInformation(
        format(new Date(dailyReading?.created_at), "yyyy-MM-dd")
      )
    : "";

  // console.log(dailyData);
  const energyLevel =
    (dailyData?.dayInfo?.dayEnergy + dailyData?.dayInfo?.dayFinancialEnergy) /
      2 || 0;

  let formattedDate = "Date unavailable";
  try {
    formattedDate = dailyReading?.created_at
      ? format(new Date(dailyReading?.created_at), "MMMM d")
      : "";
  } catch (e) {
    console.error("Error formatting todayReading.date:", e);
  }
  if (dailyReading?.status === "loading") {
    return (
      <div className="card bg-base-100 border border-[var(--color-batik-border)]">
        <div className="card-body p-4 flex items-center justify-center">
          <AnimatedLoadingText
            messages={dailyLoadingMessages}
            className="text-center text-lg font-semibold"
          />
        </div>
      </div>
    );
  }

  if (dailyReading?.status === "completed") {
    return (
      <div className="card bg-base-100 border border-[var(--color-batik-border)] shadow-sm">
        <div className="card-body p-4">
          <p className="text-sm font-semibold">
            🗓️ {formattedDate} ({reading?.energy?.weton})
          </p>
          <p className="text-lg font-semibold mb-2 text-base-content">
            {reading?.energy?.vibe}
          </p>
          <div className="flex flex-col gap-2">
            <div className="flex flex-row items-center gap-2">
              <div className="w-8 shrink-0 flex flex-col text-2xl">✅</div>
              <Markdown className="leading-5 text-gray-800">
                {reading?.guidance?.do?.replace(/—/gi, ", ")}
              </Markdown>
            </div>
            <div className="flex flex-row items-center gap-2">
              <div className="w-8 shrink-0 text-2xl">❌</div>
              <Markdown className="leading-5 text-gray-800">
                {reading?.guidance?.dont?.replace(/—/gi, ", ")}
              </Markdown>
            </div>
          </div>
          <button
            onClick={() => setShowDailyReadingSheet(true)}
            className="btn border-batik-border text-batik-text font-semibold rounded-2xl mt-2"
          >
            Reveal Your Reading
          </button>

          {showDailyReadingSheet && (
            <div className="fixed inset-0 bg-slate-500/40 bg-opacity-10 z-40 flex items-end justify-center">
              <div className="bg-base-100 rounded-t-lg p-4 w-full max-w-md shadow-lg h-[90vh] flex flex-col">
                <div className="flex justify-between items-center mb-4 pb-2 border-b border-base-300">
                  <div className="flex flex-col">
                    <h3 className="text-lg font-bold text-batik-black">
                      🗓️ Daily Reading
                    </h3>
                    <p className="text-sm font-semibold">
                      {formattedDate} ({reading?.energy?.weton})
                    </p>
                  </div>

                  <button
                    onClick={() => setShowDailyReadingSheet(false)}
                    className="btn btn-sm btn-circle btn-ghost"
                  >
                    CLOSE
                  </button>
                </div>
                <div className="flex-grow overflow-y-auto space-y-4">
                  <div className="overflow-y-scroll flex flex-col gap-2">
                    <div className="flex flex-row justify-between items-start">
                      <div className="flex flex-col w-[75%]">
                        <p className="text-lg font-semibold mb-2">
                          {reading?.energy?.vibe}
                        </p>
                      </div>
                      <div className="flex flex-col mr-2 text-center">
                        <div className="text-xs">Energy Level</div>
                        <div
                          className={clsx(
                            "text-2xl font-bold",
                            energyLevel < 5
                              ? "text-rose-500"
                              : energyLevel < 8
                              ? "text-amber-500"
                              : "text-green-500"
                          )}
                        >
                          {energyLevel}
                          <span className="text-xs font-light text-slate-800">
                            /10
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-col mb-2">
                      <Markdown className="text-gray-700">
                        {reading?.focus?.replace(/—/gi, ", ")}
                      </Markdown>
                    </div>
                    <div className="flex flex-col my-3 gap-2">
                      <div className="flex flex-row items-center gap-2">
                        <div className="w-8 shrink-0 flex flex-col text-2xl">
                          ✅
                        </div>
                        <Markdown className="leading-5 text-gray-800">
                          {reading?.guidance?.do?.replace(/—/gi, ", ")}
                        </Markdown>
                      </div>
                      <div className="flex flex-row items-center gap-2">
                        <div className="w-8 shrink-0 text-2xl">❌</div>
                        <Markdown className="leading-5 text-gray-800">
                          {reading?.guidance?.dont?.replace(/—/gi, ", ")}
                        </Markdown>
                      </div>
                    </div>
                    <div className="flex flex-col my-3 gap-2">
                      <div className="text-lg font-semibold">
                        💌 Message for You
                      </div>
                      <Markdown className="text-gray-700">
                        {reading?.wisdom?.replace(/—/gi, ", ")}
                      </Markdown>
                    </div>
                    <div className="flex flex-col mt-2 mb-5 gap-2">
                      <div className="text-lg font-semibold">
                        ☀️ Day Character
                      </div>
                      <div className="text-base font-semibold capitalize">
                        {dailyData?.dayInfo?.values}
                      </div>
                      <div className="text-gray-700">
                        {dailyData?.dayInfo?.financialDescription}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }
}
