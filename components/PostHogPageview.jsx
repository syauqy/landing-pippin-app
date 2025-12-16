import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/router";
import { Posthog } from "@capawesome/capacitor-posthog";
import { useEffect } from "react";
import { Capacitor } from "@capacitor/core";

export function PostHogPageview() {
  const router = useRouter();
  const { user } = useAuth();

  // Track page views
  useEffect(() => {
    if (!Capacitor.isNativePlatform()) {
      return;
    }
    const handleRouteChange = (url) => {
      Posthog.capture({
        event: "$pageview",
        properties: {
          $current_url: url,
        },
      });
    };
    router.events.on("routeChangeComplete", handleRouteChange);

    return () => {
      router.events.off("routeChangeComplete", handleRouteChange);
    };
  }, [router.events]);

  // Associate user with PostHog
  useEffect(() => {
    if (!Capacitor.isNativePlatform()) {
      return;
    }
    if (user) {
      Posthog.identify({
        distinctId: user.id,
        userProperties: {
          email: user.email,
          name: user.user_metadata?.full_name,
        },
      });
    } else {
      Posthog.reset();
    }
  }, [user]);

  return null;
}
