import { useEffect } from "react";
import { useRouter } from "next/router";
import posthog from "@/lib/posthog";

export function PostHogPageview() {
  const router = useRouter();

  useEffect(() => {
    // Track page views
    const handleRouteChange = (url) => {
      if (posthog) {
        posthog.capture("$pageview", {
          $current_url: url,
          path: url,
          page_title: document.title,
        });
      }
    };

    router.events.on("routeChangeComplete", handleRouteChange);

    return () => {
      router.events.off("routeChangeComplete", handleRouteChange);
    };
  }, [router.events]);

  return null;
}

/**
 * Track custom events
 */
export function trackEvent(eventName, properties = {}) {
  if (posthog) {
    posthog.capture(eventName, properties);
  }
}

/**
 * Track form submissions
 */
export function trackFormSubmit(formName, data = {}) {
  trackEvent("form_submitted", {
    form_name: formName,
    ...data,
  });
}

/**
 * Track button clicks
 */
export function trackButtonClick(buttonName, metadata = {}) {
  trackEvent("button_clicked", {
    button_name: buttonName,
    ...metadata,
  });
}

/**
 * Set user properties
 */
export function setUserProperty(key, value) {
  if (posthog) {
    posthog.people.set({ [key]: value });
  }
}

/**
 * Identify user
 */
export function identifyUser(userId, properties = {}) {
  if (posthog) {
    posthog.identify(userId, {
      ...properties,
    });
  }
}
