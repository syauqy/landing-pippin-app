import { useState, useEffect } from "react";
import Link from "next/link";

export function HolidayBanner() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Check if banner should be shown
    const today = new Date();
    const endDate = new Date("2026-01-08"); // Banner ends on Jan 8, 2026

    // Check if user has dismissed the banner
    const isDismissed = localStorage.getItem("holiday-banner-dismissed");

    if (today < endDate && !isDismissed) {
      setIsVisible(true);
    }
  }, []);

  const handleDismiss = () => {
    setIsVisible(false);
    localStorage.setItem("holiday-banner-dismissed", "true");
  };

  if (!isVisible) return null;

  return (
    <div className="bg-linear-to-r from-red-500 to-red-600 text-white py-3 px-4">
      <div className="container mx-auto flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-4">
        <div className="flex items-center justify-center gap-1 sm:gap-2 text-center flex-wrap">
          <span className="text-xl sm:text-2xl">🎁</span>
          <span className="text-sm sm:text-base font-semibold">
            Holiday Deal:
          </span>
          <span className="text-sm sm:text-base">
            1 month free of Pippin Pro
          </span>
          <span className="text-sm sm:text-base hidden sm:inline">•</span>
          <span className="text-sm sm:text-base">Save $4.99</span>
        </div>
        <Link
          href="/deals"
          className="bg-white text-red-600 font-semibold px-4 py-1.5 rounded-lg hover:bg-red-50 transition-colors whitespace-nowrap text-sm sm:text-base"
        >
          Claim Deal →
        </Link>
      </div>
    </div>
  );
}
