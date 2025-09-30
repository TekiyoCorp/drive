import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Optimize image loading
    formats: ["image/webp", "image/avif"],
    // Add image optimization for better LCP
    minimumCacheTTL: 60 * 60 * 24 * 365, // 1 year
    // Configure allowed quality values for Next.js 16+ compatibility
    qualities: [75, 85, 90, 95, 100],
  },
  // Enable experimental optimizations
  experimental: {
    optimizePackageImports: ["lucide-react"],
  },
};

export default nextConfig;
