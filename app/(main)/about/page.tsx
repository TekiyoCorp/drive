import AboutUs from "@/components/about/about-us";
import Hero from "@/components/about/hero";
import KeyFigures from "@/components/about/key-figures";
import MaximizeYourProfitability from "@/components/about/maximize-your-profitability";
import OurStory from "@/components/about/our-story";
import WhyDrive from "@/components/about/why-drive";
import {
  SnapElement,
  SnapScrollContentBox,
} from "@/components/global/scroll-snap";
import FAQs from "@/components/main/faqs";
import OurCatalog from "@/components/main/our-catalog";
import OurTestimonials from "@/components/main/our-testimonials";

const AboutUsPage = () => {
  return (
    <div className="w-full relative flex flex-col">
      <SnapElement>
        <Hero />
      </SnapElement>
      <SnapScrollContentBox>
        <AboutUs />
      </SnapScrollContentBox>
      <SnapScrollContentBox>
        <KeyFigures />
      </SnapScrollContentBox>
      <SnapElement>
        <MaximizeYourProfitability />
      </SnapElement>
      <SnapScrollContentBox>
        <WhyDrive />
      </SnapScrollContentBox>
      <SnapElement>
        <OurStory />
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

export default AboutUsPage;
