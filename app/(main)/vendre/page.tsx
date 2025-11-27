import {
  SnapElement,
  SnapScrollContentBox,
} from "@/components/global/scroll-snap";
import FAQsWrapper from "@/components/main/faqs-wrapper";
import OurCatalog from "@/components/main/our-catalog";
import OurTestimonials from "@/components/main/our-testimonials";
import HeroWrapper from "@/components/vendre/hero-wrapper";
import LatestSales from "@/components/vendre/latest-sales";
import SecureIntermediation from "@/components/vendre/secure-intermediation";
import SellingFee from "@/components/vendre/selling-fee";
import VehicleCondition from "@/components/vendre/vehicle-condition";

const SellYourCarPage = () => {
  return (
    <div className="w-full relative flex flex-col">
      <SnapElement>
        <HeroWrapper />
      </SnapElement>
      <SnapElement>
        <SecureIntermediation />
      </SnapElement>
      <SnapScrollContentBox>
        <LatestSales />
      </SnapScrollContentBox>
      <SnapElement>
        <VehicleCondition />
      </SnapElement>
      <SnapElement>
        <SellingFee />
      </SnapElement>
      <SnapElement>
        <OurTestimonials />
      </SnapElement>
      <SnapElement>
        <OurCatalog />
      </SnapElement>
      <SnapScrollContentBox>
        <FAQsWrapper />
      </SnapScrollContentBox>
    </div>
  );
};

export default SellYourCarPage;
