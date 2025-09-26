"use client";

import Image from "next/image";
import LiquidGlass from "../common/liquid-glass";
import LiquidGlassButton from "../common/liquid-glass-button";
import Container from "../global/container";
import Wrapper from "../global/wrapper";
import CarFilters from "./car-filters";
import ImageUpload from "./image-upload";
import UserInfo from "./user-info";

const Hero = () => {
  return (
    <div className="relative z-0 w-full p-2.5 md:p-4 min-h-screen">
      <Container animation="scaleUp" delay={0.1} className="w-full h-screen">
        <div className="relative w-full h-screen">
          <Image
            src={"/images/vendre/hero.webp"}
            alt={"Hero Image"}
            width={1920}
            height={1080}
            className="object-cover object-center lg:object-right-bottom bg-no-repeat top-0 z-10 rounded-3xl w-full h-screen"
          />
        </div>
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
              contrast={1.2}
              elasticity={0.8}
              displacementScale={1}
              className="border border-white/50 border-x-0 relative mt-6 !w-full lg:!w-fit mx-auto"
            >
              <CarFilters />
            </LiquidGlass>
          </Container>

          <Container
            delay={0.3}
            className="!w-fit max-w-2xl flex items-center justify-center mx-auto max-lg:hidden"
          >
            <LiquidGlass
              blur={12}
              brightness={1.5}
              contrast={1.2}
              className="border border-white/50 border-x-0 relative mt-6 !w-full lg:!w-fit mx-auto"
            >
              <UserInfo />
            </LiquidGlass>
          </Container>

          <Container
            delay={0.3}
            className="w-full max-lg:max-w-lg px-4 mx-auto max-lg:hidden"
          >
            <LiquidGlass
              blur={8}
              brightness={1.5}
              className="border border-white/50 border-x-0 relative mt-6 !w-full lg:!w-fit mx-auto"
            >
              <ImageUpload />
            </LiquidGlass>
          </Container>

          <Container
            delay={0.3}
            className="w-full max-lg:max-w-lg px-4 mx-auto mt-6 max-lg:hidden"
          >
            <div className="flex items-center justify-center gap-3 flex-col">
              <div className="relative w-[336px] bg-white/40 rounded-full h-2">
                <div className="w-4 absolute top-0 left-0 bg-white h-full rounded-full" />
              </div>
              <p>16%</p>
            </div>
          </Container>

          <Container delay={0.3} className="lg:hidden">
            <div className="mt-6 flex items-center gap-3">
              <LiquidGlassButton className="px-10">
                <span>Suivant</span>
              </LiquidGlassButton>
            </div>
          </Container>

          <Container delay={0.4}>
            <p className="text-xs text-white/50 font-medium mt-6">
              J&apos;ai besoin d&apos;aide ㉿
            </p>
          </Container>
        </div>
      </Wrapper>
    </div>
  );
};

export default Hero;
