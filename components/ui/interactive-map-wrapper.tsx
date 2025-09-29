"use client";

import dynamic from "next/dynamic";
import type { AdvancedMapProps } from "./interactive-map";

// Re-export types from the original component
export type {
  AdvancedMapProps,
  MarkerData,
  PolygonData,
  CircleData,
  PolylineData,
  MapLayers,
  SearchResult,
} from "./interactive-map";

// Dynamically import the interactive map to avoid SSR issues
const InteractiveMap = dynamic(
  () =>
    import("./interactive-map").then((mod) => ({ default: mod.AdvancedMap })),
  {
    ssr: false,
    loading: () => (
      <div className="w-full h-full flex items-center justify-center bg-gray-100 rounded-3xl">
        <div className="text-gray-500">Loading map...</div>
      </div>
    ),
  }
);

export const AdvancedMapWrapper: React.FC<AdvancedMapProps> = (props) => {
  return <InteractiveMap {...props} />;
};
