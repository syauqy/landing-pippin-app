export default {
  titleTemplate: "%s – Pippin",
  defaultTitle: "Pippin – Your Overthinking Journal",
  description:
    "A minimalist journaling space for when your thoughts feel loud. Write it out, step away, and come back calmer.",

  openGraph: {
    type: "website",
    locale: "en_US",
    // Note: url should be set per-page via NextSeo component, not here
    siteName: "Pippin",
    title: "Pippin – Your Overthinking Journal",
    description:
      "A minimalist journaling space for when your thoughts feel loud. Write it out, step away, and come back calmer.",
    images: [
      {
        url: "https://www.getpippin.app/pippin-banner.jpg",
        width: 1200,
        height: 630,
        alt: "Pippin – Your Overthinking Journal",
        type: "image/jpeg",
      },
      {
        url: "https://www.getpippin.app/pippin-banner.jpg",
        width: 800,
        height: 600,
        alt: "Pippin – Your Overthinking Journal",
        type: "image/jpeg",
      },
    ],
  },
  twitter: {
    handle: "@getpippin",
    site: "@getpippin",
    cardType: "summary_large_image",
  },
  additionalMetaTags: [
    {
      name: "apple-mobile-web-app-capable",
      content: "yes",
    },
    {
      name: "apple-mobile-web-app-status-bar-style",
      content: "black-translucent",
    },
    {
      name: "apple-mobile-web-app-title",
      content: "Pippin",
    },
    {
      name: "format-detection",
      content: "telephone=no",
    },
    {
      name: "keywords",
      content:
        "overthinking, racing thoughts, insomnia, anxiety, mental health, journal, mindfulness, calm",
    },
  ],
  robotsProps: {
    nosnippet: false,
    notranslate: false,
    noimageindex: false,
    noarchive: false,
    maxSnippet: -1,
    maxImagePreview: "large",
    maxVideoPreview: -1,
  },
};
