import { OUR_CATALOGUES } from "@/constants/catalogues";
import OurCatalog from "./our-catalog";
import { getAgencies } from "@/lib/agencies";
import { fetchAllInfinitiaVehicles, transformInfinitiaVehicleToCatalogueCard } from "@/lib/infinitia";
import type { CatalogueCardData } from "@/components/catalogue/catalogue-card";

// Server Component wrapper that fetches data and passes it to the client component
export default async function OurCatalogWrapper() {
  let featuredVehicles: CatalogueCardData[] = [];
  let error: string | null = null;

  try {
    // Get all agencies
    const agencies = await getAgencies();
    const agencyIds = agencies.map(agency => agency.id);

    if (agencyIds.length === 0) {
      // Fallback to static data if no agencies
      featuredVehicles = OUR_CATALOGUES;
    } else {
      // Fetch vehicles from all agencies (like catalogue page)
      const allVehicles = await fetchAllInfinitiaVehicles(agencyIds, {
        pageSize: 100, // Fetch more vehicles per agency
        revalidateSeconds: 300, // Revalidate every 5 minutes
      });

      // Filter vehicles that are for sale and transform them
      const vehiclesForSale = allVehicles
        .filter(vehicle => vehicle.status === 'FOR_SALE')
        .map(transformInfinitiaVehicleToCatalogueCard);

      featuredVehicles = vehiclesForSale.length > 0 ? vehiclesForSale : OUR_CATALOGUES;
    }
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
