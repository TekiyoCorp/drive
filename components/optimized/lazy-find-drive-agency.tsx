"use client";

import dynamic from "next/dynamic";

// Create a client-side wrapper specifically for the map component
const LazyFindDriveAgency = dynamic(
  () => import("@/components/main/find-drive-agency"),
  {
    loading: () => (
      <div className="min-h-screen flex items-center justify-center">
        <div className="space-y-4 text-center">
          <div className="h-96 w-full bg-gradient-to-br from-gray-50 to-gray-100 animate-pulse rounded-lg" />
          <div className="h-4 bg-gray-200 rounded w-48 mx-auto animate-pulse" />
          <div className="h-4 bg-gray-200 rounded w-32 mx-auto animate-pulse" />
        </div>
      </div>
    ),
    ssr: false, // Maps don't need SSR
  }
);

export default LazyFindDriveAgency;
