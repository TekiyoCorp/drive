/**
 * Performance optimization script for reducing critical request chains
 * This script preloads critical resources and optimizes loading sequences
 */

(function performanceOptimization() {
  "use strict";

  // Performance metrics tracking
  const performanceMetrics = {
    startTime: performance.now(),
    lcpTime: null,
    fcpTime: null,
    criticalResourcesLoaded: 0,
    totalCriticalResources: 3, // hero image, critical CSS, critical font
  };

  // Critical resource preloading with optimized priorities
  function preloadCriticalResources() {
    const criticalResources = [
      {
        href: "/images/main/hero.avif",
        as: "image",
        type: "image/avif",
        priority: "high",
        crossorigin: false,
      },
      {
        href: "/images/main/hero.webp",
        as: "image",
        type: "image/webp",
        priority: "high",
        crossorigin: false,
      },
      {
        href: "/fonts/InterDisplay-Regular.ttf",
        as: "font",
        type: "font/ttf",
        priority: "high",
        crossorigin: true,
      },
    ];

    criticalResources.forEach((resource, index) => {
      // Stagger requests slightly to avoid overwhelming the browser
      setTimeout(() => {
        const link = document.createElement("link");
        link.rel = "preload";
        link.as = resource.as;
        link.href = resource.href;
        link.type = resource.type;
        link.fetchPriority = resource.priority;

        if (resource.crossorigin) {
          link.crossOrigin = "anonymous";
        }

        link.onload = () => {
          performanceMetrics.criticalResourcesLoaded++;
          console.log(`Critical resource loaded: ${resource.href}`);

          if (
            performanceMetrics.criticalResourcesLoaded ===
            performanceMetrics.totalCriticalResources
          ) {
            console.log("All critical resources loaded");
            // Trigger any deferred operations
            loadNonCriticalResources();
          }
        };

        link.onerror = () => {
          console.warn(`Failed to load critical resource: ${resource.href}`);
        };

        document.head.appendChild(link);
      }, index * 10); // 10ms stagger
    });
  }

  // Load non-critical resources after critical path is complete
  function loadNonCriticalResources() {
    // Defer loading of non-essential CSS
    const nonCriticalCSS = ["/styles/components.css", "/styles/animations.css"];

    nonCriticalCSS.forEach((cssFile) => {
      const link = document.createElement("link");
      link.rel = "stylesheet";
      link.href = cssFile;
      link.media = "print";
      link.onload = function () {
        this.media = "all";
      };
      document.head.appendChild(link);
    });

    // Preload next page resources
    const nextPageResources = [
      "/images/catalogue/preview.webp",
      "/images/about/hero.webp",
    ];

    nextPageResources.forEach((resource) => {
      const link = document.createElement("link");
      link.rel = "prefetch";
      link.href = resource;
      document.head.appendChild(link);
    });
  }

  // Optimize image loading with intersection observer
  function optimizeImageLoading() {
    if ("IntersectionObserver" in window) {
      const imageObserver = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              const img = entry.target;
              if (img.dataset.src) {
                img.src = img.dataset.src;
                img.removeAttribute("data-src");
                imageObserver.unobserve(img);
              }
            }
          });
        },
        {
          rootMargin: "50px 0px",
          threshold: 0.01,
        }
      );

      // Observe lazy images
      document.querySelectorAll("img[data-src]").forEach((img) => {
        imageObserver.observe(img);
      });
    }
  }

  // Performance monitoring
  function monitorPerformance() {
    if ("PerformanceObserver" in window) {
      // Monitor LCP (Largest Contentful Paint)
      const lcpObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        const lastEntry = entries[entries.length - 1];
        performanceMetrics.lcpTime = lastEntry.startTime;
        console.log(`LCP: ${performanceMetrics.lcpTime}ms`);

        // Log performance improvement
        if (performanceMetrics.lcpTime < 2500) {
          console.log("✅ Good LCP performance");
        } else if (performanceMetrics.lcpTime < 4000) {
          console.log("⚠️ Needs improvement");
        } else {
          console.log("❌ Poor LCP performance");
        }
      });

      lcpObserver.observe({ type: "largest-contentful-paint", buffered: true });

      // Monitor FCP (First Contentful Paint)
      const fcpObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        performanceMetrics.fcpTime = entries[0].startTime;
        console.log(`FCP: ${performanceMetrics.fcpTime}ms`);
      });

      fcpObserver.observe({ type: "first-contentful-paint", buffered: true });
    }
  }

  // Reduce main thread blocking
  function optimizeMainThread() {
    // Use requestIdleCallback for non-critical operations
    if ("requestIdleCallback" in window) {
      requestIdleCallback(() => {
        // Defer analytics loading
        if (typeof gtag !== "undefined") {
          gtag("config", "GA_MEASUREMENT_ID");
        }

        // Initialize non-critical libraries
        initNonCriticalLibraries();
      });
    } else {
      // Fallback for browsers without requestIdleCallback
      setTimeout(() => {
        initNonCriticalLibraries();
      }, 100);
    }
  }

  function initNonCriticalLibraries() {
    // Initialize libraries that don't affect LCP
    console.log("Initializing non-critical libraries");
  }

  // Connection optimization
  function optimizeConnections() {
    // Add preconnect hints for external resources
    const externalDomains = [
      "https://fonts.gstatic.com",
      "https://fonts.googleapis.com",
    ];

    externalDomains.forEach((domain) => {
      const link = document.createElement("link");
      link.rel = "preconnect";
      link.href = domain;
      link.crossOrigin = "";
      document.head.appendChild(link);
    });
  }

  // Initialize optimizations
  function init() {
    console.log("🚀 Performance optimization started");

    // Start performance monitoring
    monitorPerformance();

    // Optimize connections first
    optimizeConnections();

    // Preload critical resources
    preloadCriticalResources();

    // Optimize main thread usage
    optimizeMainThread();

    // Set up image loading optimization
    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", optimizeImageLoading);
    } else {
      optimizeImageLoading();
    }

    // Log total initialization time
    const initTime = performance.now() - performanceMetrics.startTime;
    console.log(
      `Performance optimization completed in ${initTime.toFixed(2)}ms`
    );
  }

  // Start optimization immediately
  init();

  // Expose performance metrics for debugging
  window.performanceMetrics = performanceMetrics;
})();
