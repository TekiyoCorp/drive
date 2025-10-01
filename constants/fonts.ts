import localFont from "next/font/local";

export const heading = localFont({
  src: [
    {
      path: "../public/fonts/InterDisplay-Regular.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../public/fonts/InterDisplay-Medium.ttf",
      weight: "500",
      style: "normal",
    },
    {
      path: "../public/fonts/InterDisplay-SemiBold.ttf",
      weight: "600",
      style: "normal",
    },
  ],
  variable: "--font-heading",
  display: "optional",
  preload: true,
});

export const base = localFont({
  src: [
    {
      path: "../public/fonts/InterDisplay-Light.ttf",
      weight: "300",
      style: "normal",
    },
    {
      path: "../public/fonts/InterDisplay-Regular.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../public/fonts/InterDisplay-Medium.ttf",
      weight: "500",
      style: "normal",
    },
    {
      path: "../public/fonts/InterDisplay-SemiBold.ttf",
      weight: "600",
      style: "normal",
    },
  ],
  variable: "--font-base",
  display: "optional",
  preload: true,
});
