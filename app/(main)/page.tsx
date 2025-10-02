import {
  SnapElement,
  SnapScrollContentBox,
} from "@/components/global/scroll-snap";
import FAQs from "@/components/main/faqs";
import Features from "@/components/main/features";
import LazyFindDriveAgency from "@/components/optimized/lazy-find-drive-agency";
import Hero from "@/components/main/hero";
import OpenDriveAgency from "@/components/main/open-drive-agency";
import OurCatalog from "@/components/main/our-catalog";
import OurTestimonials from "@/components/main/our-testimonials";
import SellMyCar from "@/components/main/sell-my-car";

const HomePage = () => {
  return (
    <div className="w-full relative flex flex-col">
      <SnapElement>
        <Hero />
      </SnapElement>
      <SnapElement>
        <OurCatalog />
      </SnapElement>
      <SnapElement>
        <OurTestimonials />
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
        <FAQs />
      </SnapScrollContentBox>
    </div>
  );
};

export default HomePage;
