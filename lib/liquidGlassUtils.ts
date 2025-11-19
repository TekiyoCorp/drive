/**
 * Utility functions for LiquidGlass component responsiveness
 */

import { useEffect, useState } from "react";

// Hook to detect screen size
export const useScreenSize = () => {
  const [screenSize, setScreenSize] = useState<"mobile" | "tablet" | "desktop">(
    "desktop"
  );
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);

    const checkScreenSize = () => {
      if (typeof window === "undefined") return;

      const width = window.innerWidth;
      if (width < 640) {
        // Mobile
        setScreenSize("mobile");
      } else if (width < 1024) {
        // Tablet
        setScreenSize("tablet");
      } else {
        // Desktop
        setScreenSize("desktop");
      }
    };

    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);

    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  // Return default value during SSR to avoid hydration mismatch
  if (!isClient) {
    return "desktop";
  }

  return screenSize;
};

// Get responsive elasticity value based on screen size
export const getResponsiveElasticity = (
  screenSize: "mobile" | "tablet" | "desktop",
  desktopValue: number = 1
) => {
  // Disable elasticity on mobile and tablet
  if (screenSize === "mobile" || screenSize === "tablet") {
    return 0;
  }

  return desktopValue;
};

// Get responsive blur value based on screen size
export const getResponsiveBlur = (
  screenSize: "mobile" | "tablet" | "desktop",
  desktopValue: number = 1,
  mobileValue: number = 3
) => {
  // Higher blur on mobile for better readability
  if (screenSize === "mobile") {
    return mobileValue;
  } else if (screenSize === "tablet") {
    return Math.min(desktopValue + 1, mobileValue); // Medium blur on tablet
  }

  return desktopValue;
};

// Custom hook for responsive LiquidGlass props
export const useResponsiveLiquidGlassProps = (
  baseProps: Record<string, unknown> = {},
  desktopElasticity: number = 1,
  desktopBlur: number = 1,
  mobileBlur: number = 3
) => {
  const screenSize = useScreenSize();
  const elasticity = getResponsiveElasticity(screenSize, desktopElasticity);
  const blur = getResponsiveBlur(screenSize, desktopBlur, mobileBlur);

  return {
    ...baseProps,
    elasticity,
    blur,
  };
};
