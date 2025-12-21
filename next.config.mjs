/** @type {import('next').NextConfig} */

// const webpack = require("webpack");

const nextConfig = {
  reactStrictMode: true,
  eslint: {
    ignoreDuringBuilds: true,
  },
  devIndicators: false,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "imagekit.io",
      },
    ],
  },
  // output: "export",
  // images: {
  //   unoptimized: true,
  // },
  // allowedDevOrigins: [
  //   "local-origin.dev",
  //   "*.local-origin.dev",
  //   "http://192.168.1.2",
  // ],

  // Export statically for native builds
  ...(process.env.IS_NATIVE && {
    env: {
      IS_NATIVE: "true",
    },
    output: "export",
    images: {
      unoptimized: true,
    },
  }),

  ...(!process.env.IS_NATIVE && {
    // Security headers and CORS configuration
    async headers() {
      return [
        // Security headers for all routes
        {
          source: "/:path*",
          headers: [
            {
              key: "X-Content-Type-Options",
              value: "nosniff",
            },
            {
              key: "X-Frame-Options",
              value: "SAMEORIGIN",
            },
            {
              key: "X-XSS-Protection",
              value: "1; mode=block",
            },
            {
              key: "Referrer-Policy",
              value: "strict-origin-when-cross-origin",
            },
            {
              key: "Strict-Transport-Security",
              value: "max-age=31536000; includeSubDomains; preload",
            },
          ],
        },
        // API-specific CORS headers
        {
          source: "/api/:path*",
          headers: [
            {
              key: "Access-Control-Allow-Origin",
              value: process.env.ALLOWED_CORS_ORIGIN || "https://getpippin.app",
            },
            {
              key: "Access-Control-Allow-Methods",
              value: "POST, OPTIONS",
            },
            {
              key: "Access-Control-Allow-Headers",
              value: "Content-Type",
            },
            {
              key: "Access-Control-Max-Age",
              value: "3600",
            },
          ],
        },
      ];
    },
  }),

  // Add webpack config to exclude NextJS API routes for native builds
  webpack: (config, { isServer, buildId, dev, webpack: nextWebpack }) => {
    // Add markdown loader
    config.module.rules.push({
      test: /\.md$/,
      use: "raw-loader",
    });

    // Only apply this modification during the native build
    if (process.env.IS_NATIVE) {
      // Replace requests for modules in app/api with an empty module
      config.plugins.push(
        new nextWebpack.NormalModuleReplacementPlugin(
          /app[\/]api/, // Match requests for anything under app/api
          (resource) => {
            // Set the request to a data URI representing an empty module
            resource.request = "data:text/javascript,module.exports = {};";
          }
        )
      );
    }

    return config;
  },
};

export default nextConfig;
