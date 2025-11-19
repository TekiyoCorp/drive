import OrderForm from "@/components/order/order-form";
import { SnapScrollContentBox } from "@/components/global/scroll-snap";
import { getAgencies } from "@/lib/agencies";
import { fetchInfinitiaVehicleById, type InfinitiaVehicle } from "@/lib/infinitia";
import { notFound } from "next/navigation";

interface OrderPageProps {
  params: Promise<{ id: string }>;
}

const OrderPage = async ({ params }: OrderPageProps) => {
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
    <SnapScrollContentBox>
      <OrderForm vehicle={vehicle} />
    </SnapScrollContentBox>
  );
};

export default OrderPage;
