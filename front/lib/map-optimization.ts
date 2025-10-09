// Map performance optimization utilities

export const optimizedTileLayer = {
  // Optimized tile server configuration
  url: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
  options: {
    attribution:
      '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    maxZoom: 18, // Reduced max zoom to limit tile requests
    minZoom: 10, // Set min zoom to avoid unnecessary tiles
    tileSize: 256,
    updateWhenZooming: false, // Reduce tile requests during zoom
    updateWhenIdle: true, // Only update tiles when user stops interacting
    keepBuffer: 1, // Reduce tile buffer for better performance
    // Enhanced caching
    crossOrigin: true,
  },
};

// Map performance optimization configuration
export const mapOptimizationConfig = {
  // Lazy loading configuration
  intersectionOptions: {
    root: null,
    rootMargin: "100px", // Load map when it's 100px from viewport
    threshold: 0.1,
  },

  // Tile optimization
  tileOptions: {
    preferCanvas: true, // Use canvas renderer for better performance
    updateWhenIdle: true,
    updateWhenZooming: false,
    keepBuffer: 1,
  },

  // Cache optimization
  cacheConfig: {
    maxAge: 86400, // 24 hours
    staleWhileRevalidate: 3600, // 1 hour
  },
};

// Performance monitoring for maps
export const trackMapPerformance = () => {
  if (typeof window !== "undefined" && "performance" in window) {
    const observer = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        if (entry.name.includes("tile.openstreetmap.org")) {
          // Log slow tile loads
          if (entry.duration > 1000) {
            console.warn(
              `Slow tile load: ${entry.name} took ${entry.duration}ms`
            );
          }
        }
      }
    });

    observer.observe({ entryTypes: ["resource"] });

    // Cleanup after 30 seconds
    setTimeout(() => observer.disconnect(), 30000);
  }
};

// Optimize tile requests with service worker caching (if available)
export const enableTileCaching = () => {
  if ("serviceWorker" in navigator) {
    // This would be implemented with a service worker
    // for now, we'll use browser caching headers
    console.log("Service worker tile caching could be implemented here");
  }
};
