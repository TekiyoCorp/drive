/**
 * Browser detection utilities
 * Used to detect specific browsers for applying conditional styles
 */

import { useEffect, useState } from "react";

/**
 * Detects if the current browser is Safari
 * @returns {boolean} True if Safari browser is detected
 */
export const isSafari = (): boolean => {
  if (typeof window === "undefined") {
    return false; // Server-side rendering
  }

  const userAgent = window.navigator.userAgent.toLowerCase();

  // Check for Safari but exclude Chrome and other WebKit browsers
  // Safari contains 'safari' but Chrome also contains 'safari' in its user agent
  // So we need to exclude Chrome, Edge, and other Chromium-based browsers
  return (
    userAgent.includes("safari") &&
    !userAgent.includes("chrome") &&
    !userAgent.includes("chromium") &&
    !userAgent.includes("edg") && // Microsoft Edge
    !userAgent.includes("opr") && // Opera
    !userAgent.includes("firefox")
  );
};

/**
 * Detects if the current browser is Safari on iOS
 * @returns {boolean} True if Safari on iOS is detected
 */
export const isSafariIOS = (): boolean => {
  if (typeof window === "undefined") {
    return false;
  }

  const userAgent = window.navigator.userAgent.toLowerCase();

  return (
    (userAgent.includes("iphone") ||
      userAgent.includes("ipad") ||
      userAgent.includes("ipod")) &&
    userAgent.includes("safari") &&
    !userAgent.includes("chrome") &&
    !userAgent.includes("crios") && // Chrome on iOS
    !userAgent.includes("fxios") // Firefox on iOS
  );
};

/**
 * Detects if the current browser is Safari on macOS
 * @returns {boolean} True if Safari on macOS is detected
 */
export const isSafariMacOS = (): boolean => {
  if (typeof window === "undefined") {
    return false;
  }

  const userAgent = window.navigator.userAgent.toLowerCase();

  return (
    userAgent.includes("macintosh") &&
    userAgent.includes("safari") &&
    !userAgent.includes("chrome") &&
    !userAgent.includes("chromium") &&
    !userAgent.includes("edg") &&
    !userAgent.includes("opr")
  );
};

/**
 * Custom hook for Safari detection (for React components)
 * @returns {object} Object containing Safari detection flags
 */
export const useSafariDetection = () => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (typeof window === "undefined" || !isClient) {
    return {
      isSafari: false,
      isSafariIOS: false,
      isSafariMacOS: false,
      safariClass: "",
    };
  }

  return {
    isSafari: isSafari(),
    isSafariIOS: isSafariIOS(),
    isSafariMacOS: isSafariMacOS(),
  };
};
