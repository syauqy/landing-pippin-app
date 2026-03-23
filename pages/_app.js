import "@/styles/globals.css";
import { NuqsAdapter } from "nuqs/adapters/next/pages";
import { DefaultSeo } from "next-seo";
import { PostHogPageview } from "@/components/PostHogPageview";
import { useEffect } from "react";
import { initPostHog } from "@/lib/posthog";
import SEO from "@/next-seo.config";

export default function MyApp({ Component, pageProps }) {
  useEffect(() => {
    // Initialize PostHog on client side
    initPostHog();
  }, []);

  return (
    <>
      <DefaultSeo {...SEO} />
      <NuqsAdapter>
        <PostHogPageview />
        <Component {...pageProps} />
      </NuqsAdapter>
    </>
  );
}
