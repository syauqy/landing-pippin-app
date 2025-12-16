import React, { useState } from "react";
import { supabase } from "@/utils/supabaseClient";
import { Toaster, toast } from "sonner";
import { InAppReview } from "@capacitor-community/in-app-review";

export function FeedbackSession({ user, reading }) {
  const [feedback, setFeedback] = useState(null);
  const [feedbackLoading, setFeedbackLoading] = useState(false);
  const [feedbackError, setFeedbackError] = useState(null);

  const promptAppRating = async () => {
    try {
      await InAppReview.requestReview();
    } catch (error) {
      console.warn("In-app review not available.", error);
    }
  };
  // console.log(reading);

  const handleFeedback = async (value) => {
    if (!user || !reading) return;
    setFeedbackLoading(true);
    setFeedbackError(null);
    try {
      const { error } = await supabase
        .from("readings")
        .update({ rating: value })
        .eq("id", reading.id);
      if (error) throw error;
      setFeedback(value);
      toast.success("Thank you for your feedback!");
      if (value === 1) {
        await promptAppRating();
      }
    } catch (err) {
      setFeedbackError("Failed to submit feedback. Please try again.");
      toast.error("Failed to submit feedback. Please try again.");
    } finally {
      setFeedbackLoading(false);
    }
  };
  return (
    <div className="mt-8 flex flex-col items-center justify-center">
      <Toaster richColors />
      <div className="flex flex-row rounded-2xl py-4 border-slate-200 mt-4 gap-2 items-center w-full">
        <span className="font-medium text-batik-black">Was it useful?</span>
        <div className="flex gap-3">
          <button
            className={`btn btn-circle btn-ghost border ${
              feedback === 1
                ? "border-green-500 bg-green-100"
                : "border-batik-border"
            }`}
            onClick={() => handleFeedback(1)}
            disabled={feedbackLoading}
            aria-label="Thumbs up"
          >
            👍
          </button>
          <button
            className={`btn btn-circle btn-ghost border ${
              feedback === -1
                ? "border-red-500 bg-red-100"
                : "border-batik-border"
            }`}
            onClick={() => handleFeedback(-1)}
            disabled={feedbackLoading}
            aria-label="Thumbs down"
          >
            👎
          </button>
        </div>
      </div>
    </div>
  );
}
