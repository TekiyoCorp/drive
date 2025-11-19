import OurCatalog from "@/components/main/our-catalog";
import { fetchInfinitiaVehicles, transformInfinitiaVehicleToCatalogueCard } from "@/lib/infinitia";
import type { CatalogueCardData } from "@/components/catalogue/catalogue-card";

interface AgencyVehiclesWrapperProps {
  agencyId: number;
}

// Server Component wrapper that fetches vehicles from Infinitia API and passes them to the client component
export default async function AgencyVehiclesWrapper({ agencyId }: AgencyVehiclesWrapperProps) {
  let featuredVehicles: CatalogueCardData[] = [];
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
    // Don't fallback to static data for franchise pages - show empty state instead
    featuredVehicles = [];
  }

  return (
    <OurCatalog 
      featuredVehicles={featuredVehicles}
      error={error}
      isFranchisePage={true}
    />
  );
}

