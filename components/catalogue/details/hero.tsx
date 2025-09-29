"use client";

import LiquidGlassButton from "@/components/common/liquid-glass-button";
import Container from "@/components/global/container";
import Wrapper from "@/components/global/wrapper";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";
import { HeartIcon } from "lucide-react";
import Image from "next/image";
import { redirect, useParams } from "next/navigation";
import { useState, useEffect, useCallback } from "react";

const Hero = () => {
  const { id } = useParams<{ id: string }>();
  const [isReserved, setIsReserved] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [, setCount] = useState(0);

  const handleReserve = () => {
    setIsReserved(!isReserved);
    if (!isReserved) {
      redirect(`/order/${id}`);
    }
  };

  const carImages = [
    {
      src: "/images/catalogue/hero.jpg",
      alt: "Porsche 911 Carrera - Front View",
    },
    {
      src: "/images/catalogue/hero.jpg",
      alt: "Porsche 911 Carrera - Side View",
    },
    {
      src: "/images/catalogue/hero.jpg",
      alt: "Porsche 911 Carrera - Rear View",
    },
    {
      src: "/images/catalogue/hero.jpg",
      alt: "Porsche 911 Carrera - Interior View",
    },
    {
      src: "/images/catalogue/hero.jpg",
      alt: "Porsche 911 Carrera - Engine View",
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
    <div className="relative z-0 w-full p-2.5 md:p-4 flex flex-col min-h-screen max-lg:!pt-24">
      <div className="lg:hidden">
        <Container delay={0.1}>
          <h2 className="text-balance !leading-[1.25] text-[48px] md:text-[60px] font-normal tracking-tight mt-6 w-full">
            PORSCHE 911 <br /> CARRERA
          </h2>
        </Container>
        <Container delay={0.2}>
          <p className="text-[28px] font-normal text-balance text-white mt-2">
            169 000€
          </p>
        </Container>

        <Container delay={0.4} className="lg:hidden">
          <div className="grid grid-cols-2 gap-8 text-white pb-10 pt-5">
            <div className="flex items-center gap-2">
              <span className="text-lg font-medium">Essence</span>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-lg font-medium">Automatique</span>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-lg font-medium">2021</span>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-lg font-medium">510 ch</span>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-lg font-medium">
                1<sup>er</sup> proprio
              </span>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-lg font-medium">25 000 km</span>
            </div>
          </div>
        </Container>
      </div>

      <div className="relative h-fit lg:h-full w-full">
        <Container
          animation="scaleUp"
          delay={0.1}
          className="w-full h-[500px] min-h-[500px] lg:h-full lg:min-h-screen"
        >
          <Carousel
            setApi={setApi}
            opts={{
              align: "start",
              loop: true,
            }}
            className="w-full min-h-[500px] lg:h-full lg:min-h-screen"
          >
            <CarouselContent>
              {carImages.map((image, index) => (
                <CarouselItem key={index}>
                  <div className="relative w-full min-h-[500px] lg:h-full lg:min-h-screen">
                    <Image
                      src={image.src}
                      alt={image.alt}
                      width={1920}
                      height={1080}
                      className="object-cover object-center lg:object-right-bottom bg-no-repeat top-0 z-10 rounded-3xl w-full min-h-[500px] lg:h-full lg:min-h-screen"
                      priority={index === 0}
                      fetchPriority={index === 0 ? "high" : "auto"}
                    />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        </Container>

        <Wrapper className="pb-8 lg:pb-16 lg:pt-28 !px-4 lg:!px-28 absolute bottom-0 left-1/2 -translate-x-1/2 h-fit lg:h-full flex flex-col justify-between">
          <div className="max-lg:hidden">
            <Container delay={0.1}>
              <h2 className="text-balance !leading-[1.25] text-[60px] font-normal tracking-tight mt-6 w-full">
                PORSCHE 911 <br /> CARRERA
              </h2>
            </Container>
            <Container delay={0.2}>
              <p className="text-[28px] font-normal text-balance text-white mt-2">
                169 000€
              </p>
            </Container>
          </div>

          <div className="flex flex-col items-center justify-center w-full z-10">
            <Container delay={0.3}>
              <div className="mt-6 flex items-center gap-2">
                <LiquidGlassButton className="aspect-square flex items-center justify-center h-[42px] w-[45px] p-0">
                  <Image
                    src="/icons/whatsapp.svg"
                    alt="Whatsapp Icon"
                    width={20}
                    height={20}
                    className="cursor-pointer"
                  />
                </LiquidGlassButton>

                <LiquidGlassButton
                  onClick={handleReserve}
                  className={`px-6 lg:px-8 h-[44px] transition-all duration-300 ${
                    isReserved
                      ? "!bg-[#FF00007E] !border-[#FF0000] !border"
                      : ""
                  }`}
                >
                  <span className={isReserved ? "text-white" : ""}>
                    {isReserved
                      ? "Ce véhicule est déjà réservé"
                      : "Réserver ce véhicule"}
                  </span>
                </LiquidGlassButton>

                <LiquidGlassButton
                  onClick={() => setIsLiked(!isLiked)}
                  className={`aspect-square flex items-center justify-center h-[42px] w-[45px] p-0 transition-all duration-300 ${
                    isLiked ? "!bg-[#FF00007E] !border-[#FF0000] !border" : ""
                  }`}
                >
                  <HeartIcon
                    className={`size-5 transition-all duration-300 ${
                      isLiked
                        ? "fill-[#FF0000] text-[#FF0000]"
                        : "fill-white text-white"
                    }`}
                  />
                </LiquidGlassButton>
              </div>
            </Container>

            <Container delay={0.2}>
              <p className="text-base font-normal text-center text-balance text-white/70 max-w-3xl mx-auto mt-4">
                Fiche vérifiée par DRIVE Lyon
              </p>
            </Container>

            <Container delay={0.4} className="max-lg:hidden">
              <div className="flex items-center justify-center gap-8 text-white mt-2">
                <div className="flex items-center gap-2">
                  <span className="text-lg font-medium">Essence</span>
                </div>

                <div className="w-px h-4 bg-white/40"></div>

                <div className="flex items-center gap-2">
                  <span className="text-lg font-medium">Automatique</span>
                </div>

                <div className="w-px h-4 bg-white/40"></div>

                <div className="flex items-center gap-2">
                  <span className="text-lg font-medium">2021</span>
                </div>

                <div className="w-px h-4 bg-white/40"></div>

                <div className="flex items-center gap-2">
                  <span className="text-lg font-medium">510 ch</span>
                </div>

                <div className="w-px h-4 bg-white/40"></div>

                <div className="flex items-center gap-2">
                  <span className="text-lg font-medium">
                    1<sup>er</sup> proprio
                  </span>
                </div>

                <div className="w-px h-4 bg-white/40"></div>

                <div className="flex items-center gap-2">
                  <span className="text-lg font-medium">25 000 km</span>
                </div>
              </div>
            </Container>

            <Container delay={0.5}>
              <div className="flex space-x-1.5 z-20 mt-6">
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
          </div>
        </Wrapper>
      </div>
    </div>
  );
};

export default Hero;
