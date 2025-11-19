'use client';

import CatalogueCard from "@/components/catalogue/catalogue-card";
import CatalogueFilter from "@/components/catalogue/catalogue-filter";
import Wrapper from "@/components/global/wrapper";
import { OUR_CATALOGUES } from "@/constants/catalogues";
import { Vehicle } from "@/lib/strapi";
import { CatalogueCardData } from "./catalogue-card";

interface CatalogueContentProps {
  vehicles: (Vehicle | CatalogueCardData)[];
  error?: string | null;
}

const CatalogueContent = ({ vehicles, error }: CatalogueContentProps) => {
  const displayVehicles = vehicles && vehicles.length > 0 ? vehicles : OUR_CATALOGUES;

  return (
    <Wrapper className="pt-24 md:pt-32 w-full px-2.5 md:px-8 lg:px-24 flex flex-col gap-4 md:gap-8">
      <CatalogueFilter />

      {error && (
        <div className="text-yellow-500 text-sm mb-4">
          {error}
        </div>
      )}

      <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-6">
        {displayVehicles.map((vehicle, idx) => (
          <CatalogueCard
            key={vehicle.id || idx}
            data={vehicle}
            animation="fadeUp"
            delay={0.3 + idx * 0.5}
            priority={idx === 0}
            className="snap-start max-w-full md:h-[500px] md:rounded-4xl"
          />
        ))}
      </div>
    </Wrapper>
  );
};

export default CatalogueContent;

