import localFont from "next/font/local";

export const heading = localFont({
  src: [
    {
      path: "../public/fonts/InterDisplay-SemiBold.ttf",
      weight: "600",
      style: "normal",
    },
  ],
  variable: "--font-heading",
  display: "swap", // Use swap for optimal font display
  preload: true, // Preload critical heading font
  fallback: [
    "-apple-system",
    "BlinkMacSystemFont",
    "Segoe UI",
    "system-ui",
    "Roboto",
    "Helvetica Neue",
    "Arial",
    "sans-serif",
  ],
  adjustFontFallback: "Arial", // Reduce layout shift with font metric overrides
});

export const base = localFont({
  src: [
    {
      path: "../public/fonts/InterDisplay-Regular.ttf",
      weight: "400",
      style: "normal",
    },
  ],
  variable: "--font-base",
  display: "swap", // Use swap for optimal font display
  preload: true, // Preload critical base font
  fallback: [
    "-apple-system",
    "BlinkMacSystemFont",
    "Segoe UI",
    "system-ui",
    "Roboto",
    "Helvetica Neue",
    "Arial",
    "sans-serif",
  ],
  adjustFontFallback: "Arial", // Reduce layout shift with font metric overrides
});
