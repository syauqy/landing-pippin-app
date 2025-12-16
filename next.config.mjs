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
    // Allows mobile apps to use NextJS API
    async headers() {
      return [
        {
          source: "/api/:path*",
          headers: [
            {
              key: "Access-Control-Allow-Origin",
              value: "*",
            },
            {
              key: "Access-Control-Allow-Methods",
              value: "GET, POST, PUT, DELETE, OPTIONS",
            },
            {
              key: "Access-Control-Allow-Headers",
              value: "X-CSRF-Token, Content-Type, Authorization",
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
