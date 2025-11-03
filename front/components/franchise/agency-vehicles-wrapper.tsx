import { OUR_CATALOGUES } from "@/constants/catalogues";
import OurCatalog from "@/components/main/our-catalog";
import { fetchInfinitiaVehicles, transformInfinitiaVehicleToCatalogueCard } from "@/lib/infinitia";

interface AgencyVehiclesWrapperProps {
  agencyId: number;
}

// Server Component wrapper that fetches vehicles from Infinitia API and passes them to the client component
export default async function AgencyVehiclesWrapper({ agencyId }: AgencyVehiclesWrapperProps) {
  let featuredVehicles: any[] = [];
  let error: string | null = null;

  try {
    // Fetch vehicles from Infinitia API server-side
    const response = await fetchInfinitiaVehicles(agencyId, {
      page: 1,
      pageSize: 20,
      revalidateSeconds: 300, // Revalidate every 5 minutes
    });

    // Filter vehicles that are for sale and transform them
    const vehiclesForSale = response.items
      .filter(vehicle => vehicle.status === 'FOR_SALE')
      .map(transformInfinitiaVehicleToCatalogueCard);

    featuredVehicles = vehiclesForSale;
  } catch (err) {
    console.error('Error fetching vehicles from Infinitia API:', err);
    error = err instanceof Error ? err.message : 'Failed to load vehicles';
    // Fallback to static data if API fails
    featuredVehicles = OUR_CATALOGUES;
  }

  return (
    <OurCatalog 
      featuredVehicles={featuredVehicles}
      error={error}
    />
  );
}

