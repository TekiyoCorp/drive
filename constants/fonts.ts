import localFont from "next/font/local";

export const heading = localFont({
  src: [
    {
      path: "../public/fonts/optimized/InterDisplay-SemiBold.woff2",
      weight: "600",
      style: "normal",
    },
  ],
  variable: "--font-heading",
  display: "swap", // Use swap for optimal font display
  preload: true, // Preload critical heading font
  fallback: ["sans-serif"],
  adjustFontFallback: "Arial", // Reduce layout shift with font metric overrides
});

export const base = localFont({
  src: [
    {
      path: "../public/fonts/optimized/InterDisplay-Regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../public/fonts/optimized/InterDisplay-Medium.woff2",
      weight: "500",
      style: "normal",
    },
  ],
  variable: "--font-base",
  display: "swap", // Use swap for optimal font display
  preload: true, // Preload critical base font
  fallback: ["sans-serif"],
  adjustFontFallback: "Arial", // Reduce layout shift with font metric overrides
});

// Optional: Light weight for subtle text
export const light = localFont({
  src: [
    {
      path: "../public/fonts/optimized/InterDisplay-Light.woff2",
      weight: "300",
      style: "normal",
    },
  ],
  variable: "--font-light",
  display: "swap",
  preload: false, // Don't preload light weight as it's not critical
  fallback: ["sans-serif"],
  adjustFontFallback: "Arial",
});
