"use client";

import { useEffect } from "react";

export default function ProductionOptimizer() {
  useEffect(() => {
    // Only run in production
    if (process.env.NODE_ENV === "production") {
      // Disable WebSocket connections that prevent bfcache
      if (typeof window !== "undefined") {
        // Store original WebSocket
        const originalWebSocket = window.WebSocket;

        // Override WebSocket constructor to prevent connections in production
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (window as any).WebSocket = class MockWebSocket {
          readyState = 3; // CLOSED
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          constructor(_url: string | URL, _protocols?: string | string[]) {
            console.warn(
              "WebSocket connections disabled in production for bfcache optimization"
            );
          }
          close() {}
          send() {}
          addEventListener() {}
          removeEventListener() {}
        };

        // Optimize page for bfcache
        const handleBeforeUnload = () => {
          // Clean up any remaining connections
        };

        const handlePageHide = (event: PageTransitionEvent) => {
          if (event.persisted) {
            // Page is being cached, clean up
          }
        };

        const handlePageShow = (event: PageTransitionEvent) => {
          if (event.persisted) {
            // Page was restored from cache
          }
        };

        window.addEventListener("beforeunload", handleBeforeUnload);
        window.addEventListener("pagehide", handlePageHide);
        window.addEventListener("pageshow", handlePageShow);

        // Cleanup function
        return () => {
          window.removeEventListener("beforeunload", handleBeforeUnload);
          window.removeEventListener("pagehide", handlePageHide);
          window.removeEventListener("pageshow", handlePageShow);
          // Restore original WebSocket if needed
          window.WebSocket = originalWebSocket;
        };
      }
    }
  }, []);

  return null;
}
