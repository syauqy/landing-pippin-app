import React from "react";
import { ArrowLeft } from "lucide-react";

export function ReadingNavbar({
  title,
  profileData,
  showTitleInNavbar,
  router = { back: () => window.history.back() },
}) {
  return (
    <div
      className={`navbar px-5 bg-base-100 sticky top-0 z-50 transition-all duration-300 ${
        showTitleInNavbar ? "border-b border-batik-border" : ""
      }`}
    >
      <div className="navbar-start">
        <button
          onClick={() => router.back()}
          className="p-2 rounded-full text-xl border border-batik-text hover:bg-base-200 active:bg-batik"
        >
          <ArrowLeft size={20} className="text-batik-text" />
        </button>
      </div>
      {showTitleInNavbar && profileData && (
        <div className="navbar-center flex-col">
          <div className="text-sm text-batik-text font-semibold uppercase">
            {title}
          </div>
        </div>
      )}
      <div className="navbar-end"></div>
    </div>
  );
}
