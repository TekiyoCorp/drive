"use client";

import { MEDIA_CARD_SLIDER } from "@/constants/media-card-slider";
import useEmblaCarousel, { UseEmblaCarouselType } from "embla-carousel-react";
import Image from "next/image";
import React from "react";

function MediaCardSlider() {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "start",
    containScroll: "trimSnaps",
    slidesToScroll: 1,
  });

  const [prevBtnDisabled, setPrevBtnDisabled] = React.useState(true);
  const [nextBtnDisabled, setNextBtnDisabled] = React.useState(true);

  const scrollPrev = React.useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = React.useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  const onSelect = React.useCallback((emblaApi: UseEmblaCarouselType[1]) => {
    if (!emblaApi) return;
    setPrevBtnDisabled(!emblaApi.canScrollPrev());
    setNextBtnDisabled(!emblaApi.canScrollNext());
  }, []);

  React.useEffect(() => {
    if (!emblaApi) return;

    onSelect(emblaApi);
    emblaApi.on("reInit", onSelect);
    emblaApi.on("select", onSelect);
  }, [emblaApi, onSelect]);

  return (
    <section className="relative w-full !min-h-screen h-full bg-transparent flex items-center justify-center pl-[201px] overflow-x-clip overflow-y-visible py-20 max-[900px]:px-[18px] max-[900px]:pl-[18px]">
      <div className="w-full max-w-[1232px] flex flex-col gap-9 mx-auto max-[900px]:gap-[18px] items-stretch">
        <h2 className="font-['Inter_Display'] font-normal text-[36px] text-white m-0 whitespace-nowrap max-[900px]:text-[28px] max-[900px]:whitespace-normal">
          iOS 26. Nouveau look. <br /> Nouvelle magie.
        </h2>
        <div className="relative w-[calc(100%-201px)] pb-[43px] max-[900px]:w-full">
          <div className="overflow-visible w-full" ref={emblaRef}>
            <div className="flex gap-7 items-center max-[900px]:gap-4">
              {MEDIA_CARD_SLIDER?.map((item, idx) => {
                const media = item.image;
                const mediaObj =
                  typeof media === "object"
                    ? (media as { id: string; url: string; alt?: string })
                    : undefined;
                return (
                  <div
                    className="flex-[0_0_287px] min-w-0 max-[900px]:flex-[0_0_80%]"
                    key={`slide-${idx}-${mediaObj?.id ?? "no-id"}`}
                  >
                    <div className="w-full flex flex-col gap-[18px] items-start">
                      {mediaObj?.url && (
                        <div className="w-full max-h-[348px] aspect-[287/348] rounded-xl overflow-hidden bg-[#f5f5f7]">
                          <Image
                            alt={mediaObj.alt || ""}
                            src={mediaObj.url}
                            width={287}
                            height={348}
                            className="w-full h-full object-cover block"
                          />
                        </div>
                      )}
                      {item.text && (
                        <div className="w-full">
                          <p className="font-['SF_Pro_Display'] font-normal text-xl leading-normal m-0">
                            <span className="text-white">Liquid Glass.</span>
                            <span className="text-[#86868b] font-normal">
                              {" "}
                              {item.text}
                            </span>
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          <div className="absolute right-[43px] bottom-[-43px] flex gap-5 items-center max-[900px]:right-[18px]">
            <button
              className="w-[38px] h-[38px] rounded-full bg-[rgba(210,210,215,0.84)] border-none flex items-center justify-center cursor-pointer transition-all duration-200 ease-in-out text-[#1d1d1f] hover:bg-[rgba(210,210,215,1)] disabled:opacity-50 disabled:cursor-not-allowed"
              onClick={scrollPrev}
              disabled={prevBtnDisabled}
              aria-label="Previous slide"
            >
              <svg width="11" height="15" viewBox="0 0 11 15" fill="none">
                <path
                  d="M10 1L2 7.5L10 14"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
            <button
              className="w-[38px] h-[38px] rounded-full bg-[rgba(210,210,215,0.84)] border-none flex items-center justify-center cursor-pointer transition-all duration-200 ease-in-out text-[#1d1d1f] hover:bg-[rgba(210,210,215,1)] disabled:opacity-50 disabled:cursor-not-allowed"
              onClick={scrollNext}
              disabled={nextBtnDisabled}
              aria-label="Next slide"
            >
              <svg width="11" height="15" viewBox="0 0 11 15" fill="none">
                <path
                  d="M1 14L9 7.5L1 1"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default MediaCardSlider;
