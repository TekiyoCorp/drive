"use client";

import { cn } from "@/lib/utils";
import { SlidersHorizontal } from "lucide-react";
import { useState } from "react";
import Container from "../global/container";
import Wrapper from "../global/wrapper";
import LiquidGlass from "../common/liquid-glass";

const filters = [
  { id: "nouveaute", label: "Nouveauté", isActive: true },
  { id: "price", label: "< 50 000 €", isActive: false },
  { id: "age", label: "< 2 ans", isActive: false },
  { id: "electric", label: "Électrique", isActive: false },
  { id: "suv", label: "SUV", isActive: false },
  { id: "automatic", label: "Automatique", isActive: false },
  { id: "city", label: "Ville", isActive: false },
];

const CatalogueFilter = () => {
  const [showFilters, setShowFilters] = useState(false);

  return (
    <Wrapper className="flex items-center justify-between w-full !px-0">
      <Container animation="fadeRight" delay={0.1} className="w-full">
        <LiquidGlass
          className={cn(
            "border border-white/50 border-r-0 border-l-0 rounded-[40px] !w-full !items-start flex-col md:flex-row transition-all duration-500",
            showFilters ? "!h-96" : "max-md:!h-12 !h-fit"
          )}
        >
          <div
            onClick={() => setShowFilters(!showFilters)}
            className="flex flex-row items-center justify-center gap-4 text-sm font-medium px-8 py-4 w-full md:hidden cursor-pointer"
          >
            Voir les filtres
            <SlidersHorizontal className="size-5" />
          </div>
          <div
            className={cn(
              "flex flex-col md:flex-row items-center justify-between gap-4 md:gap-6 xl:gap-10 text-sm font-medium px-8 w-full transition-all duration-500",
              showFilters ? "h-80 py-4" : "h-0 py-0 md:!h-12"
            )}
          >
            {filters.map((filter, index) => (
              <div
                key={filter.id}
                className={cn(
                  "text-sm font-medium transition-all duration-200 whitespace-nowrap md:border-r border-white/40 w-full",
                  index === filters.length - 1 ? "!border-r-0" : ""
                )}
              >
                {filter.label}
              </div>
            ))}

            <div className="max-md:hidden">
              <SlidersHorizontal className="size-5" />
            </div>
          </div>
        </LiquidGlass>
      </Container>
    </Wrapper>
  );
};

export default CatalogueFilter;
