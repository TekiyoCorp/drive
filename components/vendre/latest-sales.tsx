import React from "react";
import Wrapper from "../global/wrapper";
import { OUR_CATALOGUES } from "@/constants/catalogues";
import CatalogueCard from "../catalogue/catalogue-card";
import Container from "../global/container";

const LatestSales = () => {
  return (
    <div className="w-full">
      <Wrapper className="pt-24 md:pt-32 w-full px-2.5 md:px-8 lg:px-24 flex flex-col gap-4 md:gap-8">
        <Container animation="fadeDown" delay={0.2}>
          <h2 className="text-2xl md:text-4xl text-white">Dernières ventes</h2>
        </Container>

        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-6">
          {OUR_CATALOGUES.slice(0, 6).map((card, idx) => (
            <CatalogueCard
              key={idx}
              data={card}
              animation="fadeUp"
              delay={0.3 + idx * 0.5}
              priority={idx === 0}
              className="snap-start max-w-full md:h-[500px] md:rounded-4xl"
            />
          ))}
        </div>
      </Wrapper>
    </div>
  );
};

export default LatestSales;
