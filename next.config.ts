import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
        port: "1337",
        pathname: "/uploads/**",
      },
      {
        protocol: "http",
        hostname: "localhost",
        port: "1337",
        pathname: "/images/**",
      },
      {
        protocol: "https",
        hostname: "your-strapi-domain.com",
        pathname: "/uploads/**",
      },
      {
        protocol: "https",
        hostname: "your-strapi-domain.com",
        pathname: "/images/**",
      },
    ],
  },
};

export default nextConfig;
