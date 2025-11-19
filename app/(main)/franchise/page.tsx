import FeaturedAgencies from "@/components/franchise/featured-agencies";
import {
  SnapElement,
  SnapScrollContentBox,
} from "@/components/global/scroll-snap";
import FAQsWrapper from "@/components/main/faqs-wrapper";
import LazyFindDriveAgency from "@/components/optimized/lazy-find-drive-agency";
import OurCatalogWrapper from "@/components/main/our-catalog-wrapper";
import OurTestimonials from "@/components/main/our-testimonials";

const FranchisePage = () => {
  return (
    <div className="w-full relative flex flex-col pt-24 lg:pt-0">
      <SnapElement>
        <div className="md:pt-24 lg:pt-32">
          <LazyFindDriveAgency />
        </div>
      </SnapElement>
      <SnapScrollContentBox>
        <FeaturedAgencies />
      </SnapScrollContentBox>
      <SnapElement>
        <OurTestimonials />
      </SnapElement>
      <SnapElement>
        <OurCatalogWrapper />
      </SnapElement>
      <SnapScrollContentBox>
        <FAQsWrapper />
      </SnapScrollContentBox>
    </div>
  );
};

export default FranchisePage;
