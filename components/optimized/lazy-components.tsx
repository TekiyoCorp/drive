import dynamic from "next/dynamic";

// Lazy load heavy components with proper loading states
export const LazyInteractiveMap = dynamic(
  () =>
    import("@/components/ui/interactive-map").then((mod) => ({
      default: mod.AdvancedMap,
    })),
  {
    loading: () => (
      <div className="h-64 bg-gray-100 animate-pulse rounded-lg" />
    ),
  }
);

// Optimized scroll snap component that loads intersection observer on demand
export const LazyScrollSnap = dynamic(
  () =>
    import("@/components/global/scroll-snap").then((mod) => ({
      default: mod.ScrollSnap,
    })),
  {
    loading: () => <div className="min-h-screen" />,
  }
);

export const LazyPerformanceMonitor = dynamic(
  () => import("@/components/performance/performance-monitor"),
  {
    loading: () => null,
  }
);

export const LazyCarFilters = dynamic(
  () => import("@/components/vendre/car-filters"),
  {
    loading: () => (
      <div className="h-32 bg-gray-100 animate-pulse rounded-lg" />
    ),
  }
);

export const LazyCatalogueDetails = dynamic(
  () => import("@/components/catalogue/details/hero"),
  {
    loading: () => (
      <div className="h-64 bg-gray-100 animate-pulse rounded-lg" />
    ),
  }
);

export const LazyFranchiseDetails = dynamic(
  () => import("@/components/franchise/details/hero"),
  {
    loading: () => (
      <div className="h-64 bg-gray-100 animate-pulse rounded-lg" />
    ),
  }
);

// Lucide icons - commonly used ones can be pre-loaded, others lazy loaded
export const LazySearchIcon = dynamic(
  () => import("lucide-react").then((mod) => ({ default: mod.Search })),
  { ssr: true }
);

export const LazyHeartIcon = dynamic(
  () => import("lucide-react").then((mod) => ({ default: mod.Heart })),
  { ssr: true }
);

export const LazyMenuIcon = dynamic(
  () => import("lucide-react").then((mod) => ({ default: mod.Menu })),
  { ssr: true }
);
