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
            "border border-white/50 border-r-0 border-l-0 rounded-[40px] !w-full !items-start flex-col lg:flex-row transition-all duration-500",
            showFilters ? "!h-96 lg:!h-12" : "max-lg:!h-12 !h-fit"
          )}
        >
          <div
            onClick={() => setShowFilters(!showFilters)}
            className="flex flex-row items-center justify-center gap-4 text-sm font-medium px-8 py-4 w-full lg:hidden cursor-pointer"
          >
            Voir les filtres
            <SlidersHorizontal className="size-5" />
          </div>
          <div
            className={cn(
              "flex flex-col lg:flex-row items-center lg:justify-between justify-center gap-4 lg:gap-0 text-sm font-medium px-8 w-full transition-all duration-500",
              showFilters ? "h-80 py-4 lg:h-fit" : "h-0 py-0 lg:!h-12 opacity-0 lg:opacity-100"
            )}
          >
            {filters.map((filter, index) => (
              <div
                key={filter.id}
                className={cn(
                  "text-sm font-medium transition-all duration-200 whitespace-nowrap lg:border-r border-white/40 flex-1 flex items-center justify-center",
                  index === filters.length - 1 ? "!border-r-0" : ""
                )}
              >
                {filter.label}
              </div>
            ))}

            <div className="max-lg:hidden">
              <SlidersHorizontal className="size-5" />
            </div>
          </div>
        </LiquidGlass>
      </Container>
    </Wrapper>
  );
};

export default CatalogueFilter;
