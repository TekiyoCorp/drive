"use client";

import { useEffect } from "react";

interface PerformanceOptimizerProps {
  criticalImages?: string[];
  preloadFonts?: string[];
  enableMetrics?: boolean;
}

const PerformanceOptimizer: React.FC<PerformanceOptimizerProps> = ({
  criticalImages = ["/images/main/hero.avif", "/images/main/hero.webp"],
  preloadFonts = ["/fonts/InterDisplay-Regular.ttf"],
  enableMetrics = process.env.NODE_ENV === "development",
}) => {
  useEffect(() => {
    // Critical resource preloading
    const preloadCriticalResources = () => {
      // Preload critical images
      criticalImages.forEach((imageSrc, index) => {
        const link = document.createElement("link");
        link.rel = "preload";
        link.as = "image";
        link.href = imageSrc;
        link.fetchPriority = index === 0 ? "high" : "low";

        if (imageSrc.includes(".avif")) {
          link.type = "image/avif";
        } else if (imageSrc.includes(".webp")) {
          link.type = "image/webp";
        }

        document.head.appendChild(link);
      });

      // Preload critical fonts
      preloadFonts.forEach((fontSrc) => {
        const link = document.createElement("link");
        link.rel = "preload";
        link.as = "font";
        link.href = fontSrc;
        link.type = "font/ttf";
        link.crossOrigin = "anonymous";
        link.fetchPriority = "high";
        document.head.appendChild(link);
      });
    };

    // Performance metrics collection
    const collectMetrics = () => {
      if (!enableMetrics || !("PerformanceObserver" in window)) return;

      // LCP tracking
      const lcpObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        const lastEntry = entries[entries.length - 1] as PerformanceEntry & {
          startTime: number;
          size: number;
          element?: Element;
        };

        const lcpTime = lastEntry.startTime;

        console.group("🎯 LCP Performance Metrics");
        console.log(`LCP Time: ${lcpTime.toFixed(2)}ms`);
        console.log(`LCP Element:`, lastEntry.element);

        if (lcpTime < 2500) {
          console.log("✅ Excellent LCP performance");
        } else if (lcpTime < 4000) {
          console.log("⚠️ LCP needs improvement");
        } else {
          console.log("❌ Poor LCP performance");
        }
        console.groupEnd();
      });

      lcpObserver.observe({ type: "largest-contentful-paint", buffered: true });

      // FCP tracking
      const fcpObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        const fcpTime = entries[0].startTime;

        console.log(`🎨 FCP: ${fcpTime.toFixed(2)}ms`);
      });

      fcpObserver.observe({ type: "first-contentful-paint", buffered: true });

      // CLS tracking
      let clsValue = 0;
      const clsObserver = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          const layoutShift = entry as PerformanceEntry & {
            value: number;
            hadRecentInput: boolean;
          };

          if (!layoutShift.hadRecentInput) {
            clsValue += layoutShift.value;
          }
        }

        console.log(`📐 CLS: ${clsValue.toFixed(4)}`);

        if (clsValue < 0.1) {
          console.log("✅ Good CLS");
        } else if (clsValue < 0.25) {
          console.log("⚠️ CLS needs improvement");
        } else {
          console.log("❌ Poor CLS");
        }
      });

      clsObserver.observe({ type: "layout-shift", buffered: true });
    };

    // Resource hints optimization
    const addResourceHints = () => {
      const hints = [
        { rel: "dns-prefetch", href: "//fonts.gstatic.com" },
        { rel: "dns-prefetch", href: "//fonts.googleapis.com" },
        {
          rel: "preconnect",
          href: "https://fonts.gstatic.com",
          crossOrigin: "",
        },
      ];

      hints.forEach((hint) => {
        const existingHint = document.querySelector(
          `link[href="${hint.href}"]`
        );
        if (!existingHint) {
          const link = document.createElement("link");
          link.rel = hint.rel;
          link.href = hint.href;
          if (hint.crossOrigin !== undefined) {
            link.crossOrigin = hint.crossOrigin;
          }
          document.head.appendChild(link);
        }
      });
    };

    // Image optimization - avoid forced reflows
    const optimizeImages = () => {
      // Use requestIdleCallback to avoid forced reflows
      const idleCallback =
        (window as Window & { requestIdleCallback?: (cb: () => void) => void })
          .requestIdleCallback || ((cb: () => void) => setTimeout(cb, 1));

      idleCallback(() => {
        // Find all images and optimize loading
        const images = document.querySelectorAll("img");
        const rects = new Map(); // Cache getBoundingClientRect calls

        // Batch DOM reads to avoid forced reflows
        images.forEach((img) => {
          rects.set(img, img.getBoundingClientRect());
        });

        images.forEach((img, index) => {
          const imgRect = rects.get(img);

          // Set loading attribute based on position
          if (index === 0 || imgRect.top < window.innerHeight) {
            // Above the fold - load immediately
            img.loading = "eager";
            img.fetchPriority = "high";
            img.decoding = "sync";
          } else {
            // Below the fold - lazy load
            img.loading = "lazy";
            img.fetchPriority = "low";
            img.decoding = "async";
          }

          // Add error handling for AVIF fallbacks
          img.addEventListener(
            "error",
            function (this: HTMLImageElement) {
              if (this.src.includes(".avif")) {
                this.src = this.src.replace(".avif", ".webp");
              } else if (this.src.includes(".webp")) {
                this.src = this.src.replace(".webp", ".jpg");
              }
            },
            { once: true }
          );
        });
      });
    };

    // Defer non-critical operations
    const deferNonCritical = () => {
      if ("requestIdleCallback" in window) {
        requestIdleCallback(() => {
          // Load non-critical CSS
          const nonCriticalStyles = [
            "/styles/animations.css",
            "/styles/components.css",
          ];

          nonCriticalStyles.forEach((href) => {
            const link = document.createElement("link");
            link.rel = "stylesheet";
            link.href = href;
            link.media = "print";
            link.onload = () => {
              link.media = "all";
            };
            document.head.appendChild(link);
          });
        });
      }
    };

    // Initialize optimizations
    const init = () => {
      preloadCriticalResources();
      addResourceHints();

      if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", () => {
          optimizeImages();
          collectMetrics();
          deferNonCritical();
        });
      } else {
        optimizeImages();
        collectMetrics();
        deferNonCritical();
      }
    };

    init();

    // Cleanup function
    return () => {
      // Remove any event listeners if needed
    };
  }, [criticalImages, preloadFonts, enableMetrics]);

  return null; // This component doesn't render anything
};

export default PerformanceOptimizer;
