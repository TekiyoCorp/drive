"use client";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";
import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import LiquidGlassButton from "../common/liquid-glass-button";
import Container from "../global/container";
import Wrapper from "../global/wrapper";
import CarFilters from "./car-filters";
import LiquidGlass from "../common/liquid-glass";

const Hero = () => {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [, setCount] = useState(0);

  const carImages = [
    {
      src: "/images/vendre/hero.webp",
      alt: "Audi A5 Sportback - Side View",
    },
    {
      src: "/images/vendre/hero2.webp",
      alt: "Porsche 911 Carrera - Side View",
    },
  ];

  // Auto-play functionality
  const scrollNext = useCallback(() => {
    if (api) {
      api.scrollNext();
    }
  }, [api]);

  useEffect(() => {
    if (!api) {
      return;
    }

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap() + 1);

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api]);

  // Auto-play every 3 seconds
  useEffect(() => {
    if (!api) {
      return;
    }

    const autoplay = setInterval(() => {
      scrollNext();
    }, 3000);

    return () => clearInterval(autoplay);
  }, [api, scrollNext]);

  return (
    <div className="relative z-0 w-full p-2.5 md:p-4 min-h-screen">
      <Container animation="scaleUp" delay={0.1} className="w-full h-screen">
        <Carousel
          setApi={setApi}
          opts={{
            align: "start",
            loop: true,
          }}
          className="w-full h-screen"
        >
          <CarouselContent>
            {carImages.map((image, index) => (
              <CarouselItem key={index}>
                <div className="relative w-full h-screen">
                  <Image
                    src={image.src}
                    alt={image.alt}
                    width={1920}
                    height={1080}
                    className="object-cover object-center lg:object-right-bottom bg-no-repeat top-0 z-10 rounded-3xl w-full h-screen"
                  />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </Container>

      <Wrapper className="py-12 absolute bottom-0 left-1/2 -translate-x-1/2 h-fit">
        <div className="flex flex-col items-center justify-center w-full z-10">
          <Container delay={0.1}>
            <h2 className="text-center text-2xl md:text-[32px] font-medium w-full leading-tight">
              Vendez en toute sécurité. <br /> Estimez votre voiture en 2 min.
            </h2>
          </Container>

          <Container delay={0.2}>
            <p className="text-base font-meddium text-center text-white/70 mx-auto mt-2">
              Estimation basée sur ventes réelles. Sans engagement.
            </p>
          </Container>

          <Container
            delay={0.3}
            className="w-full max-lg:max-w-lg px-4 mx-auto"
          >
            <LiquidGlass
              brightness={1.5}
              className="border border-white/50 border-x-0 relative mt-6 !w-full lg:!w-fit mx-auto"
            >
              <CarFilters />
            </LiquidGlass>
          </Container>

          <Container delay={0.3} className="lg:hidden">
            <div className="mt-6 flex items-center gap-3">
              <LiquidGlassButton className="px-10">
                <span>Suivant</span>
              </LiquidGlassButton>
            </div>
          </Container>

          <Container delay={0.5}>
            <div className="flex space-x-1.5 z-20 my-6">
              {carImages.map((_, index) => (
                <button
                  key={index}
                  className={`h-2 cursor-pointer rounded-full transition-all duration-300 ${
                    current === index + 1
                      ? "bg-white w-8"
                      : "bg-white/20 hover:bg-white/70 w-2"
                  }`}
                  onClick={() => api?.scrollTo(index)}
                />
              ))}
            </div>
          </Container>

          <Container delay={0.4}>
            <p className="text-xs text-white/50 font-medium">
              J&apos;ai besoin d&apos;aide ㉿
            </p>
          </Container>
        </div>
      </Wrapper>
    </div>
  );
};

export default Hero;
