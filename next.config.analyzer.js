const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
  openAnalyzer: true,
});

// Import the main config
const nextConfig = require("./next.config.ts").default;

module.exports = withBundleAnalyzer(nextConfig);
