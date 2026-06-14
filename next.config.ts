import type { NextConfig } from "next";

const nextConfig: NextConfig = {

  output: "standalone",

  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "ireland.apollo.olxcdn.com",
        port: "",
        pathname: "/v1/files/**", // Added leading slash
      },
    ],
  },

  async rewrites() {
    const analyticsHost = process.env.ANALYTICS_PROXY_HOST;

    if (!analyticsHost) {
      // No host configured -> no proxying. Avoids broken rewrites in local dev.
      return [];
    }

    return [
      {
        source: "/_vercel/insights/:path*",
        destination: `${analyticsHost}/_vercel/insights/:path*`,
      },
      {
        source: "/_vercel/speed-insights/:path*",
        destination: `${analyticsHost}/_vercel/speed-insights/:path*`,
      },
    ];
  },

  webpack(config) {
    // Grab the existing rule that handles SVG imports
    const fileLoaderRule = config.module.rules.find(
      (rule: { test: { test: (arg0: string) => any } }) =>
        rule.test?.test?.(".svg")
    );

    config.module.rules.push(
      // Reapply the existing rule, but only for svg imports ending in ?url
      {
        ...fileLoaderRule,
        test: /\.svg$/i,
        resourceQuery: /url/, // *.svg?url
      },
      // Convert all other *.svg imports to React components
      {
        test: /\.svg$/i,
        issuer: fileLoaderRule.issuer,
        resourceQuery: { not: [...fileLoaderRule.resourceQuery.not, /url/] }, // exclude if *.svg?url
        use: ["@svgr/webpack"],
      }
    );

    // Modify the file loader rule to ignore *.svg, since we have it handled now.
    fileLoaderRule.exclude = /\.svg$/i;

    return config;
  },
};

export default nextConfig;
