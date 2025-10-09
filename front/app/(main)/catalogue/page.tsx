'use client';

import CatalogueCard from "@/components/catalogue/catalogue-card";
import CatalogueFilter from "@/components/catalogue/catalogue-filter";
import {
  SnapElement,
  SnapScrollContentBox,
} from "@/components/global/scroll-snap";
import Wrapper from "@/components/global/wrapper";
import FAQs from "@/components/main/faqs";
import OurTestimonials from "@/components/main/our-testimonials";
import { OUR_CATALOGUES } from "@/constants/catalogues";
import { useAvailableVehicles } from "@/hooks/use-strapi";

const CataloguePage = () => {
  const { data: vehicles, loading, error } = useAvailableVehicles(24);
  return (
    <div className="w-full relative flex flex-col">
      <SnapScrollContentBox>
        <Wrapper className="pt-24 md:pt-32 w-full px-2.5 md:px-8 lg:px-24 flex flex-col gap-4 md:gap-8">
          <CatalogueFilter />

          <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-6">
            {loading ? (
              // Loading skeleton
              Array.from({ length: 6 }).map((_, idx) => (
                <div
                  key={`loading-${idx}`}
                  className="snap-start max-w-full md:h-[500px] md:rounded-4xl bg-gray-800 animate-pulse rounded-[28px]"
                />
              ))
            ) : vehicles && vehicles.length > 0 ? (
              vehicles.map((vehicle, idx) => (
                <CatalogueCard
                  key={vehicle.id}
                  data={vehicle}
                  animation="fadeUp"
                  delay={0.3 + idx * 0.5}
                  priority={idx === 0}
                  className="snap-start max-w-full md:h-[500px] md:rounded-4xl"
                />
              ))
            ) : (
              // Fallback to static data if no vehicles from Strapi
              OUR_CATALOGUES.map((card, idx) => (
                <CatalogueCard
                  key={idx}
                  data={card}
                  animation="fadeUp"
                  delay={0.3 + idx * 0.5}
                  priority={idx === 0}
                  className="snap-start max-w-full md:h-[500px] md:rounded-4xl"
                />
              ))
            )}
          </div>
        </Wrapper>
      </SnapScrollContentBox>

      <SnapElement>
        <OurTestimonials />
      </SnapElement>
      <SnapScrollContentBox>
        <FAQs />
      </SnapScrollContentBox>
    </div>
  );
};

export default CataloguePage;
