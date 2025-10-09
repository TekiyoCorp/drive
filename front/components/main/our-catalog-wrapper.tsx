import { OUR_CATALOGUES } from "@/constants/catalogues";
import OurCatalog from "./our-catalog";

// Server Component wrapper that fetches data and passes it to the client component
export default async function OurCatalogWrapper() {
  let featuredVehicles: any[] = [];
  let error: string | null = null;

  try {
    // Fetch featured vehicles from Strapi API server-side
    const baseURL = process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337';
    const response = await fetch(`${baseURL}/api/vehicles?filters[featured][$eq]=true&populate[0]=images`, {
      headers: {
        'Authorization': `Bearer ${process.env.STRAPI_API_TOKEN}`,
        'Content-Type': 'application/json',
      },
      // Enable caching for better performance
      next: { revalidate: 1800 }, // Revalidate every 30 minutes
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch featured vehicles: ${response.status}`);
    }

    const result = await response.json();
    featuredVehicles = result.data || [];
  } catch (err) {
    console.error('Error fetching featured vehicles:', err);
    error = err instanceof Error ? err.message : 'Failed to load vehicles';
    featuredVehicles = OUR_CATALOGUES; // Fallback to static data
  }

  return (
    <OurCatalog 
      featuredVehicles={featuredVehicles}
      error={error}
    />
  );
}
