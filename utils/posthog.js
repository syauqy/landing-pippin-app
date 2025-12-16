import { Capacitor } from "@capacitor/core";

let posthog = null;

const initPostHog = async () => {
  if (typeof window !== "undefined") {
    const { default: posthogWeb } = await import("posthog-js");

    posthogWeb.init("phc_4O2KwlSWpIpxTw7xkZttic1kMmkjywQ5GN8esGBBwZ9", {
      api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST,
      // Mobile-specific configs
      persistence: Capacitor.isNativePlatform() ? "localStorage" : "cookie",
      disable_session_recording: Capacitor.isNativePlatform(), // Optional: disable on mobile
    });

    posthog = posthogWeb;
  }
};

export { initPostHog, posthog };
