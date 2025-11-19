'use client';

import { cn } from "@/lib/utils";
import Image from "next/image";
import Container from "../global/container";
import Wrapper from "../global/wrapper";
import { Carousel, CarouselContent, CarouselItem } from "../ui/carousel";
import { getImageUrl } from "@/lib/strapi";

interface TestimonialData {
  id?: number;
  attributes?: {
    name?: string;
    location?: string;
    quote?: string;
    avatar?: unknown;
  };
  name?: string;
  location?: string;
  quote?: string;
  avatar?: unknown;
}

interface OurTestimonialsProps {
  testimonials?: TestimonialData[];
  error?: string | null;
}

const OurTestimonials = ({ testimonials }: OurTestimonialsProps) => {
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
            {testimonials && testimonials.length > 0 ? (
              testimonials.map((testimonial, idx) => {
                // Handle both Strapi format (testimonial.attributes.name) and static format (testimonial.name)
                const name = testimonial.attributes?.name || testimonial.name;
                const location = testimonial.attributes?.location || testimonial.location;
                const quote = testimonial.attributes?.quote || testimonial.quote;
                const avatar = testimonial.attributes?.avatar || testimonial.avatar;
                const testimonialId = testimonial.id || idx;
                
                return (
                  <CarouselItem
                    key={testimonialId}
                    className="w-[266px] max-w-[266px] p-1.5"
                    aria-label={`${name || 'Testimonial'} card`}
                  >
                    <Container
                      animation="fadeUp"
                      delay={0.3 + idx * 0.3}
                      className={cn(
                        "snap-start w-full max-w-[266px] min-h-[325px] relative rounded-[28px] overflow-hidden bg-[#1C1C1C] p-6 flex flex-col justify-between",
                        idx !== testimonials.length - 1 ? "mr-3" : ""
                      )}
                    >
                      <div className="relative w-[45px] h-[45px] rounded-full overflow-hidden">
                        {avatar ? (() => {
                          const avatarUrl = typeof avatar === 'string' ? avatar : getImageUrl(avatar);
                          let altText = "Avatar";
                          if (typeof avatar !== 'string' && avatar && typeof avatar === 'object') {
                            if ('data' in avatar && avatar.data && typeof avatar.data === 'object' && 'attributes' in avatar.data) {
                              const attrs = avatar.data.attributes as { alternativeText?: string };
                              if (attrs.alternativeText) {
                                altText = attrs.alternativeText;
                              }
                            }
                          }
                          return avatarUrl ? (
                            <Image
                              src={avatarUrl}
                              alt={altText}
                              fill
                              sizes="45px"
                              className="object-cover object-top"
                            />
                          ) : (
                            <div className="w-full h-full bg-white/20 rounded-full flex items-center justify-center">
                              <span className="text-white text-sm font-medium">
                                {name?.charAt(0) || '?'}
                              </span>
                            </div>
                          );
                        })() : (
                          <div className="w-full h-full bg-white/20 rounded-full flex items-center justify-center">
                            <span className="text-white text-sm font-medium">
                              {name?.charAt(0) || '?'}
                            </span>
                          </div>
                        )}
                      </div>

                      <Image
                        src={"/icons/quote.svg"}
                        alt="Quote Icon"
                        width={32}
                        height={32}
                        className="w-[28px] h-auto"
                      />

                      <div>
                        <p className="text-white text-base font-medium">
                          {quote}
                        </p>

                        <h3 className="text-white font-medium text-[28px]">
                          {name || 'Anonymous'}
                        </h3>
                        <p className="text-white/70 text-lg -mt-2">
                          {location}
                        </p>
                      </div>
                    </Container>
                  </CarouselItem>
                );
              })
            ) : (
              // Fallback to static content if no testimonials
              <CarouselItem className="w-[266px] max-w-[266px] p-1.5">
                <div className="snap-start w-full max-w-[266px] min-h-[325px] relative rounded-[28px] overflow-hidden bg-[#1C1C1C] p-6 flex flex-col justify-center items-center text-center">
                  <p className="text-white/70 text-base">
                    Aucun témoignage disponible pour le moment.
                  </p>
                </div>
              </CarouselItem>
            )}
            <CarouselItem className="!w-2.5 !max-w-2.5 md:!max-w-[70px] md:w-[70px] !p-0" />
          </CarouselContent>
        </Carousel>
      </div>
    </div>
  );
};

export default OurTestimonials;
