import AboutUs from "@/components/franchise/details/about-us";
import Hero from "@/components/franchise/details/hero";
import OurTeam from "@/components/franchise/details/our-team";
import {
  SnapElement,
  SnapScrollContentBox,
} from "@/components/global/scroll-snap";
import FAQs from "@/components/main/faqs";
import NeedAssistance from "@/components/main/need-assistance";
import OurCatalog from "@/components/main/our-catalog";
import OurTestimonials from "@/components/main/our-testimonials";

const FranchiseDetailsPage = () => {
  return (
    <div className="w-full relative flex flex-col">
      <SnapElement>
        <Hero />
      </SnapElement>
      <SnapScrollContentBox>
        <div className="flex flex-col w-full min-h-screen md:gap-20 pt-20">
          <OurTeam />
          <AboutUs />
        </div>
      </SnapScrollContentBox>
      <SnapElement>
        <NeedAssistance />
      </SnapElement>
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

export default FranchiseDetailsPage;
