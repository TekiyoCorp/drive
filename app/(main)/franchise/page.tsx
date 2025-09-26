import FeaturedAgencies from "@/components/franchise/featured-agencies";
import {
  SnapElement,
  SnapScrollContentBox,
} from "@/components/global/scroll-snap";
import FAQs from "@/components/main/faqs";
import FindDriveAgency from "@/components/main/find-drive-agency";
import OurCatalog from "@/components/main/our-catalog";
import OurTestimonials from "@/components/main/our-testimonials";

const FranchisePage = () => {
  return (
    <div className="w-full relative flex flex-col pt-24 lg:pt-0">
      <SnapElement>
        <FindDriveAgency />
      </SnapElement>
      <SnapScrollContentBox>
        <FeaturedAgencies />
      </SnapScrollContentBox>
      <SnapElement>
        <OurTestimonials />
      </SnapElement>
      <SnapElement>
        <OurCatalog />
      </SnapElement>
      <SnapScrollContentBox>
        <FAQs />
      </SnapScrollContentBox>
    </div>
  );
};

export default FranchisePage;
