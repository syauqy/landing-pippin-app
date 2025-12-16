import "@/styles/globals.css";
import { NuqsAdapter } from "nuqs/adapters/next/pages";

export default function MyApp({ Component, pageProps }) {
  return (
    <NuqsAdapter>
      <Component {...pageProps} />
    </NuqsAdapter>
  );
}
