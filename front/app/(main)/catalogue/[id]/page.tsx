import Hero from "@/components/catalogue/details/hero";
import VehicleDetails from "@/components/catalogue/details/vehicle-details";
import {
  SnapElement,
  SnapScrollContentBox,
} from "@/components/global/scroll-snap";
import FAQs from "@/components/main/faqs";
import OurCatalog from "@/components/main/our-catalog";

const CatalogueDetailsPage = () => {
  return (
    <div className="w-full relative flex flex-col">
      <SnapElement>
        <Hero />
      </SnapElement>
      <SnapScrollContentBox>
        <VehicleDetails />
      </SnapScrollContentBox>
      <SnapElement>
        <OurCatalog />
      </SnapElement>
      <SnapScrollContentBox>
        <FAQs />
      </SnapScrollContentBox>
    </div>
  );
};

export default CatalogueDetailsPage;
