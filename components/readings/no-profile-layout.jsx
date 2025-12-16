import React from "react";
import { ReadingNavbar } from "./reading-navbar";

export function NoProfileLayout({ profileData, showTitleInNavbar, router }) {
  return (
    <div className="min-h-screen bg-base-100 text-base-content">
      <ReadingNavbar
        title=""
        profileData={profileData}
        showTitleInNavbar={showTitleInNavbar}
      />
      <div className="flex flex-col items-center justify-center p-5 h-[60vh]">
        <div className="p-4 rounded-2xl shadow flex flex-col gap-3 items-center bg-base-100">
          <div className="text-4xl">⚠️</div>
          <div className="text-center">
            Could not load profile data. It might be incomplete or missing.
          </div>
          <button
            onClick={() => router.back()}
            className="btn bg-rose-400 text-white mt-4"
          >
            Go Back
          </button>
        </div>
      </div>
    </div>
  );
}
