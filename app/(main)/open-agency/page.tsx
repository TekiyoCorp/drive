import {
  SnapElement,
  SnapScrollContentBox,
} from "@/components/global/scroll-snap";
import FAQs from "@/components/main/faqs";
import OurTestimonials from "@/components/main/our-testimonials";
import ApplicationForm from "@/components/open-agency/application-form";
import Hero from "@/components/open-agency/hero";
import KeyBenefits from "@/components/open-agency/key-benefits";
import VehicleFeatures from "@/components/open-agency/vehicle-features";
import VehicleShowcase from "@/components/open-agency/vehicle-showcase";

const OpenAgencyPage = () => {
  return (
    <div className="w-full relative flex flex-col">
      <SnapElement>
        <Hero />
      </SnapElement>
      <SnapScrollContentBox>
        <KeyBenefits />
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
        <FAQs />
      </SnapScrollContentBox>
    </div>
  );
};

export default OpenAgencyPage;
