import { Inter } from "next/font/google";

export const heading = Inter({
  subsets: ["latin"],
  variable: "--font-heading",
  display: "swap",
  weight: ["400", "500", "600", "700", "800", "900"],
});

export const base = Inter({
  subsets: ["latin"],
  variable: "--font-base",
  display: "swap",
  weight: ["300", "400", "500", "600"],
});
