import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <meta charSet="utf-8" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, maximum-scale=5.0, user-scalable=yes"
        />
        <meta name="theme-color" content="#FF6B35" />
        <link rel="canonical" href="https://www.getpippin.app" />
        <meta name="description" content="Pippin – Your Overthinking Journal" />
        <script
          src="https://analytics.ahrefs.com/analytics.js"
          data-key="17Qf8HVhOW6orqywwIiksg"
          async
        ></script>
      </Head>
      <body className="antialiased">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
