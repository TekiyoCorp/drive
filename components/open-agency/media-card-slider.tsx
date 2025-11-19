"use client";

import { MEDIA_CARD_SLIDER } from "@/constants/media-card-slider";
import useEmblaCarousel, { UseEmblaCarouselType } from "embla-carousel-react";
import Image from "next/image";
import React, { useEffect, useState } from "react";

interface SlideImage {
  id: string;
  url: string;
  alt: string;
}

interface Slide {
  id: string;
  image: SlideImage | null;
  text: string;
}

interface StrapiSlide {
  id?: string | number;
  text?: string;
  image?: {
    data?: {
      attributes?: {
        url?: string;
        alternativeText?: string;
      };
      url?: string;
    };
    attributes?: {
      url?: string;
      alternativeText?: string;
    };
    url?: string;
    alternativeText?: string;
  };
}

function MediaCardSlider() {
  const [title, setTitle] = useState<string>("iOS 26. Nouveau look. <br /> Nouvelle magie.");
  const [slides, setSlides] = useState<Slide[]>(MEDIA_CARD_SLIDER);

  useEffect(() => {
    let isMounted = true;

    const fetchContent = async () => {
      try {
        const baseURL = process.env.NEXT_PUBLIC_STRAPI_URL || "http://localhost:1337";
        const apiToken = process.env.NEXT_PUBLIC_STRAPI_API_TOKEN || process.env.STRAPI_API_TOKEN;

        const response = await fetch(
          `${baseURL}/api/open-agency-media-slider?populate[slides][populate]=image`,
          {
            headers: {
              ...(apiToken ? { Authorization: `Bearer ${apiToken}` } : {}),
              "Content-Type": "application/json",
            },
          }
        );

        if (!response.ok) {
          console.error("MediaSlider API Error:", response.status, response.statusText);
          return;
        }

        const result = await response.json();
        console.log("MediaSlider API Response:", result); // Debug log
        const node = result?.data;
        const attributes = node ? node.attributes ?? node : null;
        console.log("MediaSlider Attributes:", attributes); // Debug log

        if (!isMounted) return;

        if (attributes?.title) {
          setTitle(attributes.title);
        }

          // Handle slides - components can be in different formats
          if (attributes?.slides && Array.isArray(attributes.slides)) {
            console.log("Processing slides:", attributes.slides); // Debug log
            const processedSlides = attributes.slides.map((slide: StrapiSlide) => {
              // Handle image data - can be in different formats
              let imageUrl = null;
              let altText = "";
              
              if (slide.image) {
                const img = slide.image;
                
                // Try different formats
                if (img.data?.attributes?.url) {
                  const url = img.data.attributes.url;
                  imageUrl = url.startsWith('http') ? url : `${baseURL}${url}`;
                  altText = img.data.attributes.alternativeText || slide.text || "";
                } else if (img.attributes?.url) {
                  const url = img.attributes.url;
                  imageUrl = url.startsWith('http') ? url : `${baseURL}${url}`;
                  altText = img.attributes.alternativeText || slide.text || "";
                } else if (img.url) {
                  const url = img.url;
                  imageUrl = url.startsWith('http') ? url : `${baseURL}${url}`;
                  altText = img.alternativeText || slide.text || "";
                } else if (img.data?.url) {
                  const url = img.data.url;
                  imageUrl = url.startsWith('http') ? url : `${baseURL}${url}`;
                  altText = slide.text || "";
                }
              }
              
              console.log("Slide image URL:", imageUrl, "for slide:", slide); // Debug log
              
              return {
                id: slide.id || Math.random().toString(),
                image: imageUrl && imageUrl.trim() !== "" ? {
                  id: slide.id || Math.random().toString(),
                  url: imageUrl,
                  alt: altText,
                } : null,
                text: slide.text || "",
              };
            }).filter((slide: Slide) => slide.image); // Filter out slides without images

            console.log("Processed slides:", processedSlides); // Debug log
            if (processedSlides.length > 0) {
              setSlides(processedSlides);
            }
          }
      } catch (err) {
        console.error("MediaSlider fetch error:", err);
        // Fall back to defaults
      }
    };

    fetchContent();
    return () => {
      isMounted = false;
    };
  }, []);

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
        <h2 
          className="font-['Inter_Display'] font-normal text-[36px] text-white m-0 whitespace-nowrap max-[900px]:text-[28px] max-[900px]:whitespace-normal"
          dangerouslySetInnerHTML={{ __html: title }}
        />
        <div className="relative w-[calc(100%-201px)] pb-[43px] max-[900px]:w-full">
          <div className="overflow-visible w-full" ref={emblaRef}>
            <div className="flex gap-7 items-center max-[900px]:gap-4">
              {slides?.map((item, idx) => {
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
