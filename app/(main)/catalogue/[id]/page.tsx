import Hero from "@/components/catalogue/details/hero";
import VehicleDetails from "@/components/catalogue/details/vehicle-details";
import {
  SnapElement,
  SnapScrollContentBox,
} from "@/components/global/scroll-snap";
import FAQsWrapper from "@/components/main/faqs-wrapper";
import OurCatalog from "@/components/main/our-catalog";
import { getAgencies } from "@/lib/agencies";
import { fetchInfinitiaVehicleById, InfinitiaVehicle } from "@/lib/infinitia";
import { notFound } from "next/navigation";

interface CatalogueDetailsPageProps {
  params: Promise<{ id: string }>;
}

const CatalogueDetailsPage = async ({ params }: CatalogueDetailsPageProps) => {
  const { id } = await params;
  const vehicleId = parseInt(id, 10);

  if (isNaN(vehicleId)) {
    notFound();
  }

  let vehicle: InfinitiaVehicle | null = null;

  try {
    // Get all agencies
    const agencies = await getAgencies();
    const agencyIds = agencies.map(agency => agency.id);

    if (agencyIds.length > 0) {
      // Fetch the vehicle by ID
      vehicle = await fetchInfinitiaVehicleById(vehicleId, agencyIds, {
        revalidateSeconds: 300, // Revalidate every 5 minutes
      });
    }
  } catch (err) {
    console.error('Error fetching vehicle:', err);
  }

  if (!vehicle) {
    notFound();
  }

  return (
    <div className="w-full relative flex flex-col">
      <SnapElement>
        <Hero vehicle={vehicle} />
      </SnapElement>
      <SnapScrollContentBox>
        <VehicleDetails vehicle={vehicle} />
      </SnapScrollContentBox>
      <SnapElement>
        <OurCatalog />
      </SnapElement>
      <SnapScrollContentBox>
        <FAQsWrapper />
      </SnapScrollContentBox>
    </div>
  );
};

export default CatalogueDetailsPage;
