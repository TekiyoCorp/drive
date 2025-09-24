import { TESTIMONIALS } from "@/constants/testimonials";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Container from "../global/container";
import Wrapper from "../global/wrapper";
import { Carousel, CarouselContent, CarouselItem } from "../ui/carousel";

const OurTestimonials = () => {
  return (
    <div className="w-full min-h-screen flex items-center justify-center flex-col select-none">
      <Wrapper className="px-6 md:!px-24">
        <Container animation="fadeDown" delay={0.2}>
          <h2 className="text-4xl text-white mb-8">Les avis de nos clients</h2>
        </Container>
      </Wrapper>

      <div className="w-full">
        <Carousel
          opts={{
            breakpoints: {
              "(max-width: 768px)": {
                dragFree: false,
                startIndex: 0,
              },
            },
          }}
        >
          <CarouselContent className="ml-0 2xl:ml-[max(8rem,calc(50vw-750px))] 2xl:mr-[max(0rem,calc(50vw-750px))]">
            <CarouselItem className="!w-2.5 !max-w-2.5 md:!max-w-[70px] md:w-[70px] !p-0" />
            {TESTIMONIALS.map((testimonial, idx) => (
              <CarouselItem
                key={idx}
                className="w-[266px] max-w-[266px] p-1.5"
                aria-label={`${testimonial.name} card`}
              >
                <Container
                  key={idx}
                  animation="fadeUp"
                  delay={0.3 + idx * 0.3}
                  className={cn(
                    "snap-start w-full max-w-[266px] min-h-[325px] relative rounded-[28px] overflow-hidden bg-[#1C1C1C] p-6 flex flex-col justify-between",
                    idx !== TESTIMONIALS.length - 1 ? "mr-3" : ""
                  )}
                >
                  <Image
                    src={testimonial.avatar}
                    alt="Avatar"
                    width={45}
                    height={45}
                    className="w-[45px] h-[45px] rounded-full object-cover object-top"
                  />

                  <Image
                    src={"/icons/quote.svg"}
                    alt="Quote Icon"
                    width={32}
                    height={32}
                  />

                  <div>
                    <p className="text-white text-base font-medium">
                      {testimonial.quote}
                    </p>

                    <h4 className="text-white font-medium text-[28px]">
                      {testimonial.name}
                    </h4>
                    <p className="text-white/70 text-lg -mt-2">
                      {testimonial.location}
                    </p>
                  </div>
                </Container>
              </CarouselItem>
            ))}
            <CarouselItem className="!w-2.5 !max-w-2.5 md:!max-w-[70px] md:w-[70px] !p-0" />
          </CarouselContent>
        </Carousel>
      </div>
    </div>
  );
};

export default OurTestimonials;
