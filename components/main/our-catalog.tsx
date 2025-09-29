import { cn } from "@/lib/utils";
import Link from "next/link";
import CatalogueCard from "../catalogue/catalogue-card";
import Container from "../global/container";
import Wrapper from "../global/wrapper";
import { Carousel, CarouselContent, CarouselItem } from "../ui/carousel";
import { OUR_CATALOGUES } from "@/constants/catalogues";

const OurCatalog = () => {
  return (
    <div className="w-full py-28 select-none">
      <Wrapper className="px-6 md:!px-24">
        <Container animation="fadeDown" delay={1}>
          <div className="flex items-end gap-3 justify-between mb-8">
            <h2 className="text-2xl md:text-4xl text-white">Notre catalogue</h2>
            <Link href={"/catalogue"} className="text-lg text-white/60">
              Voir plus
            </Link>
          </div>
        </Container>
      </Wrapper>

      <div className="w-full">
        <Carousel
          opts={{
            breakpoints: {
              "(max-width: 768px)": {
                dragFree: false,
              },
            },
          }}
        >
          <CarouselContent className="ml-0 2xl:ml-[max(8rem,calc(50vw-750px))] 2xl:mr-[max(0rem,calc(50vw-750px))]">
            <CarouselItem className="!w-2.5 !max-w-2.5 md:!max-w-[60px] md:w-[60px] !p-0" />
            {OUR_CATALOGUES.map((card, idx) => (
              <CarouselItem
                key={idx}
                aria-label={`${card.title} card`}
                className="w-[346px] max-w-[346px] h-[450px]"
              >
                <CatalogueCard
                  data={card}
                  animation="fadeUp"
                  priority={idx === 0}
                  className={cn(
                    "snap-start",
                    idx !== OUR_CATALOGUES.length - 1 ? "mr-5" : ""
                  )}
                />
              </CarouselItem>
            ))}
            <CarouselItem className="!w-2.5 !max-w-2.5 md:!max-w-[60px] md:w-[60px] !p-0" />
          </CarouselContent>
        </Carousel>
      </div>
    </div>
  );
};

export default OurCatalog;
