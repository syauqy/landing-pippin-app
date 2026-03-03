import "@/styles/globals.css";
import { NuqsAdapter } from "nuqs/adapters/next/pages";
import { PostHogPageview } from "@/components/PostHogPageview";
import { useEffect } from "react";
import { initPostHog } from "@/lib/posthog";

export default function MyApp({ Component, pageProps }) {
  useEffect(() => {
    // Initialize PostHog on client side
    initPostHog();
  }, []);

  return (
    <NuqsAdapter>
      <PostHogPageview />
      <Component {...pageProps} />
    </NuqsAdapter>
  );
}
