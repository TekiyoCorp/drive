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
  display: "fallback", // Use fallback instead of swap for faster rendering
  preload: false, // Critical: Don't preload fonts to eliminate critical path blocking
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
  display: "fallback", // Use fallback for better performance
  preload: false, // Critical: Don't preload fonts to eliminate blocking
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
});
