import {
  SnapElement,
  SnapScrollContentBox,
} from "@/components/global/scroll-snap";
import FAQsWrapper from "@/components/main/faqs-wrapper";
import Features from "@/components/main/features";
import LazyFindDriveAgency from "@/components/optimized/lazy-find-drive-agency";
import HeroWrapper from "@/components/main/hero-wrapper";
import OpenDriveAgency from "@/components/main/open-drive-agency";
import OurCatalogWrapper from "@/components/main/our-catalog-wrapper";
import OurTestimonialsWrapper from "@/components/main/our-testimonials-wrapper";
import SellMyCar from "@/components/main/sell-my-car";

const HomePage = () => {
  return (
    <div className="w-full relative flex flex-col">
      <SnapElement>
        <HeroWrapper />
      </SnapElement>
      <SnapElement>
        <OurCatalogWrapper />
      </SnapElement>
      <SnapElement>
        <OurTestimonialsWrapper />
      </SnapElement>
      <SnapElement>
        <Features />
      </SnapElement>
      <SnapElement>
        <OpenDriveAgency />
      </SnapElement>
      <SnapElement>
        <SellMyCar />
      </SnapElement>
      <SnapElement>
        <LazyFindDriveAgency />
      </SnapElement>
      <SnapScrollContentBox>
        <FAQsWrapper />
      </SnapScrollContentBox>
    </div>
  );
};

export default HomePage;
