import dynamic from "next/dynamic";

// Minimal map component that only loads essential features
const MinimalInteractiveMap = dynamic(
  () => import("./interactive-map-minimal"),
  {
    loading: () => (
      <div className="h-64 bg-gray-100 animate-pulse rounded-lg" />
    ),
    ssr: false, // Maps don't need SSR for better performance
  }
);

// Full-featured map component (lazy loaded)
export const LazyInteractiveMap = dynamic(
  () =>
    import("@/components/ui/interactive-map").then((mod) => ({
      default: mod.AdvancedMap,
    })),
  {
    loading: () => (
      <div className="h-64 bg-gray-100 animate-pulse rounded-lg" />
    ),
    ssr: false,
  }
);

// Export the minimal version for lightweight usage
export default MinimalInteractiveMap;
