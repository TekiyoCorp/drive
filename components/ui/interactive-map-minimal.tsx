"use client";

import dynamic from "next/dynamic";

// Dynamically import the client-only map component
// Using explicit default export handling to avoid webpack resolution issues with leaflet
const InteractiveMapClient = dynamic(
  () =>
    import("./interactive-map-client").then((mod) => {
      // Ensure we have a valid default export
      if (!mod || !mod.default) {
        throw new Error("InteractiveMapClient module is not properly exported");
      }
      return { default: mod.default };
    }),
  {
    ssr: false,
    loading: () => (
      <div className="h-full w-full bg-gray-100 animate-pulse rounded-lg flex items-center justify-center">
        <div className="text-gray-500">Loading map...</div>
      </div>
    ),
  }
);

// Minimal types for essential functionality only
export interface MinimalMarkerData {
  id?: string | number;
  position: [number, number];
  color?: string;
  popup?: {
    title: string;
    content: string;
  };
  // Accessibility properties
  ariaLabel?: string;
  title?: string;
}

export interface MinimalMapProps {
  center?: [number, number];
  zoom?: number;
  markers?: MinimalMarkerData[];
  className?: string;
  style?: React.CSSProperties;
}

// Minimal map component wrapper with dynamic loading
const MinimalInteractiveMap: React.FC<MinimalMapProps> = (props) => {
  return <InteractiveMapClient {...props} />;
};

export default MinimalInteractiveMap;
