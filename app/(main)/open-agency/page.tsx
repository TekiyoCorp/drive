import {
  SnapElement,
  SnapScrollContentBox,
} from "@/components/global/scroll-snap";
import FAQsWrapper from "@/components/main/faqs-wrapper";
import OurTestimonials from "@/components/main/our-testimonials";
import ApplicationForm from "@/components/open-agency/application-form";
import Hero from "@/components/open-agency/hero";
import MediaCardSlider from "@/components/open-agency/media-card-slider";
import VehicleFeatures from "@/components/open-agency/vehicle-features";
import VehicleShowcase from "@/components/open-agency/vehicle-showcase";
import { MEDIA_CARD_SLIDER } from "@/constants/media-card-slider";

const OpenAgencyPage = () => {
  return (
    <div className="w-full relative flex flex-col">
      <SnapElement>
        <Hero />
      </SnapElement>
      <SnapScrollContentBox>
        <MediaCardSlider />
      </SnapScrollContentBox>
      <SnapScrollContentBox>
        <VehicleShowcase />
      </SnapScrollContentBox>
      <SnapScrollContentBox>
        <VehicleFeatures />
      </SnapScrollContentBox>
      <SnapElement>
        <OurTestimonials />
      </SnapElement>
      <SnapScrollContentBox>
        <ApplicationForm />
      </SnapScrollContentBox>
      <SnapScrollContentBox>
        <FAQsWrapper />
      </SnapScrollContentBox>
    </div>
  );
};

export default OpenAgencyPage;
