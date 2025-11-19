import CatalogueContent from "@/components/catalogue/catalogue-content";
import {
  SnapElement,
  SnapScrollContentBox,
} from "@/components/global/scroll-snap";
import FAQsWrapper from "@/components/main/faqs-wrapper";
import OurTestimonials from "@/components/main/our-testimonials";
import { getAgencies } from "@/lib/agencies";
import { fetchAllInfinitiaVehicles, transformInfinitiaVehicleToCatalogueCard } from "@/lib/infinitia";
import { OUR_CATALOGUES } from "@/constants/catalogues";
import type { CatalogueCardData } from "@/components/catalogue/catalogue-card";

const CataloguePage = async () => {
  let vehicles: CatalogueCardData[] = [];
  let error: string | null = null;

  try {
    // Get all agencies
    const agencies = await getAgencies();
    const agencyIds = agencies.map(agency => agency.id);

    if (agencyIds.length === 0) {
      // Fallback to static data if no agencies
      vehicles = OUR_CATALOGUES;
    } else {
      // Fetch vehicles from all agencies
      const allVehicles = await fetchAllInfinitiaVehicles(agencyIds, {
        pageSize: 100, // Fetch more vehicles per agency
        revalidateSeconds: 300, // Revalidate every 5 minutes
      });

      // Filter vehicles that are for sale and transform them
      const vehiclesForSale = allVehicles
        .filter(vehicle => vehicle.status === 'FOR_SALE')
        .map(transformInfinitiaVehicleToCatalogueCard);

      vehicles = vehiclesForSale.length > 0 ? vehiclesForSale : OUR_CATALOGUES;
    }
  } catch (err) {
    console.error('Error fetching vehicles from Infinitia API:', err);
    error = err instanceof Error ? err.message : 'Failed to load vehicles';
    // Fallback to static data if API fails
    vehicles = OUR_CATALOGUES;
  }

  return (
    <div className="w-full relative flex flex-col">
      <SnapScrollContentBox>
        <CatalogueContent vehicles={vehicles} error={error} />
      </SnapScrollContentBox>

      <SnapElement>
        <OurTestimonials />
      </SnapElement>
      <SnapScrollContentBox>
        <FAQsWrapper />
      </SnapScrollContentBox>
    </div>
  );
};

export default CataloguePage;
