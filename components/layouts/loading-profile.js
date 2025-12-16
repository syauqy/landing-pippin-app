import React from "react";

export function LoadingProfile() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-base-100 text-base-content">
      <span className="loading loading-spinner loading-lg text-batik-text"></span>
      <p className="mt-4">Loading...</p>
    </div>
  );
}
