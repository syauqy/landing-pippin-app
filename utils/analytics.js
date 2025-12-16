import { Capacitor } from "@capacitor/core";
// import { Preferences } from "@capacitor/preferences";

class Analytics {
  constructor() {
    this.isNative = Capacitor.isNativePlatform();
  }

  async init(apiKey) {
    if (typeof window !== "undefined") {
      const { default: posthog } = await import("posthog-js");

      posthog.init(apiKey, {
        api_host: "https://app.posthog.com",
        // Better mobile configuration
        persistence: this.isNative ? "localStorage" : "localStorage+cookie",
        cross_subdomain_cookie: !this.isNative,
        secure_cookie: true,
      });

      this.posthog = posthog;
    }
  }

  track(event, properties = {}) {
    if (this.posthog) {
      // Add platform info to all events
      this.posthog.capture(event, {
        ...properties,
        platform: Capacitor.getPlatform(),
        is_native: this.isNative,
      });
    }
  }
}

export const analytics = new Analytics();
