import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Critical resource optimization
  images: {
    formats: ["image/avif", "image/webp"],
    minimumCacheTTL: 60 * 60 * 24 * 365, // 1 year
    qualities: [60, 75, 85, 95], // Optimized quality options
    unoptimized: false,
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    remotePatterns: [
      // Localhost for development (Strapi)
      {
        protocol: "http" as const,
        hostname: "localhost",
        pathname: "/uploads/**",
      },
      // Strapi images
      ...(process.env.NEXT_PUBLIC_STRAPI_URL
        ? [
            {
              protocol: new URL(process.env.NEXT_PUBLIC_STRAPI_URL).protocol.replace(
                ":",
                ""
              ) as "http" | "https",
              hostname: new URL(process.env.NEXT_PUBLIC_STRAPI_URL).hostname,
            },
          ]
        : []),
      // Infinitia API images
      {
        protocol: "https" as const,
        hostname: "api.infinitia.fr",
        pathname: "/car/documents/**",
      },
    ],
  },

  // Enhanced bundle optimization
  experimental: {
    esmExternals: 'loose', // Allow ESM packages to be handled more leniently
    optimizePackageImports: [
      "lucide-react",
      "framer-motion",
      "motion-dom",
      "react-intersection-observer",
      // Remove leaflet from optimizePackageImports to ensure proper lazy loading
      // "leaflet",
      // "react-leaflet",
      // "react-leaflet-cluster",
      "@radix-ui/react-slot",
      "@radix-ui/react-accordion",
      "@radix-ui/react-avatar",
      "@radix-ui/react-checkbox",
      "@radix-ui/react-dialog",
      "@radix-ui/react-select",
      "tailwind-merge",
      "clsx",
      "class-variance-authority",
    ],
  },

  // External packages for server components (fixed for Next.js 15)
  serverExternalPackages: ["leaflet", "react-leaflet", "react-leaflet-cluster", "@strapi/client"],

  // Modern browser targets and enhanced compiler optimizations
  compiler: {
    removeConsole: process.env.NODE_ENV === "production",
    reactRemoveProperties: process.env.NODE_ENV === "production" ? true : false,
  },

  // Target modern browsers to reduce polyfills
  transpilePackages: [],

  // Bundle size optimization
  compress: true,

  // Enhanced webpack configuration for better minification
  webpack: (config, { dev, isServer }) => {
    // Ensure leaflet and react-leaflet are properly resolved for client-side dynamic imports
    if (!isServer) {
      // Don't externalize leaflet for client-side bundles
      config.externals = config.externals || [];
      if (Array.isArray(config.externals)) {
        config.externals = config.externals.filter(
          (external) =>
            typeof external !== "string" ||
            !["leaflet", "react-leaflet", "react-leaflet-cluster"].includes(external)
        );
      }
    }

    // Disable polyfills for modern browsers to reduce bundle size
    config.resolve.fallback = {
      ...config.resolve.fallback,
      // Disable Node.js polyfills that aren't needed in modern browsers
      fs: false,
      net: false,
      tls: false,
      crypto: false,
      stream: false,
      url: false,
      zlib: false,
      http: false,
      https: false,
      assert: false,
      os: false,
      path: false,
      buffer: false,
      process: false,
    };

    // Production optimizations only - simplified for development
    if (!dev && !isServer) {
      // Target modern browsers to reduce polyfills
      config.target = ["web", "es2020"];

      // Basic bundle splitting optimization
      config.optimization = {
        ...config.optimization,
        usedExports: true,
        sideEffects: false,
        splitChunks: {
          chunks: "all",
          minSize: 20000,
          maxSize: 244000,
          cacheGroups: {
            // React and Next.js framework
            framework: {
              chunks: "all",
              name: "framework",
              test: /[\\/]node_modules[\\/](react|react-dom|scheduler|prop-types|use-subscription)[\\/]/,
              priority: 40,
              enforce: true,
            },
            // Heavy interactive libraries (completely lazy loaded)
            interactive: {
              test: /[\\/]node_modules[\\/](leaflet|react-leaflet|react-leaflet-cluster)[\\/]/,
              name: "interactive",
              priority: 35,
              chunks: "async", // Only load when needed
              enforce: true, // Force this rule
              reuseExistingChunk: false, // Create separate chunk
            },
            // Intersection observer (lighter, can be loaded with other components)
            observer: {
              test: /[\\/]node_modules[\\/](react-intersection-observer)[\\/]/,
              name: "observer",
              priority: 28,
              chunks: "async",
            },
            // Animation libraries
            animations: {
              test: /[\\/]node_modules[\\/](framer-motion|motion-dom)[\\/]/,
              name: "animations",
              priority: 32,
              chunks: "async", // Load on demand for better performance
            },
            // UI libraries
            lib: {
              test: /[\\/]node_modules[\\/](@radix-ui|lucide-react|class-variance-authority|clsx|tailwind-merge)[\\/]/,
              name: "lib",
              priority: 30,
              chunks: "all",
            },
            // Default group
            default: {
              minChunks: 2,
              chunks: "all",
              priority: 10,
            },
            // Font optimization
            fonts: {
              test: /\.(woff|woff2|eot|ttf|otf)$/,
              name: "fonts",
              priority: 20,
              chunks: "all",
              enforce: true,
            },
          },
        },
      };
    }

    return config;
  },

  // Optimized performance headers
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          {
            key: "X-DNS-Prefetch-Control",
            value: "on",
          },
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "Cache-Control",
            value:
              process.env.NODE_ENV === "production"
                ? "public, max-age=31536000, immutable"
                : "no-cache, no-store, must-revalidate",
          },
        ],
      },
      // Ensure proper MIME types for static assets
      {
        source: "/_next/static/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
      {
        source: "/fonts/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
          {
            key: "Cross-Origin-Resource-Policy",
            value: "cross-origin",
          },
        ],
      },
      {
        source: "/images/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
          {
            key: "Accept",
            value: "image/avif,image/webp,image/*,*/*;q=0.8",
          },
        ],
      },
      // Enhanced caching for tile images
      {
        source: "/:path*.png",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=86400, stale-while-revalidate=3600",
          },
          {
            key: "Vary",
            value: "Accept",
          },
        ],
      },
      {
        source: "/_next/static/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
      // Disable cache for API routes and dynamic content
      {
        source: "/api/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "no-store, max-age=0",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
