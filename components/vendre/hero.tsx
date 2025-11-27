"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import LiquidGlass from "../common/liquid-glass";
import LiquidGlassButton from "../common/liquid-glass-button";
import Container from "../global/container";
import Wrapper from "../global/wrapper";
import CarFilters from "./car-filters";
import ImageUpload from "./image-upload";
import UserInfo from "./user-info";
import { useVendreForm } from "@/contexts/vendre-form-context";

const Hero = () => {
  const router = useRouter();
  const { progress, fullName } = useVendreForm();

  const handleSubmit = async () => {
    // Extract first name from fullName
    const firstName = fullName.split(" ")[0] || fullName || "Thomas";
    const encodedName = encodeURIComponent(firstName);
    
    // Redirect to thank you page with client name
    router.push(`/thankyou?name=${encodedName}`);
  };
  return (
    <div className="relative z-0 w-full p-2.5 md:p-4 min-h-screen max-lg:min-h-[150vh]">
      <Container animation="scaleUp" delay={0.1} className="w-full h-screen min-h-screen max-lg:min-h-[150vh]">
        <div className="relative w-full h-full min-h-screen max-lg:min-h-[150vh]">
          <Image
            src={"/images/vendre/hero.webp"}
            alt={"Hero Image"}
            fill
            sizes="100vw"
            className="object-cover object-center lg:object-right-bottom bg-no-repeat -z-10 rounded-3xl"
            priority
            fetchPriority="high"
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
              className="border border-white/50 border-x-0 relative mt-6 !w-full lg:!w-fit mx-auto bg-black/60"
            >
              <div className="flex flex-col bg-transparent rounded-full py-4 px-6 min-w-[335px] w-full lg:py-0.5">
                <CarFilters />
                <div className="lg:hidden">
                  <div className="w-full h-px bg-white/40 my-3" />
                  <UserInfo />
                </div>
              </div>
            </LiquidGlass>
          </Container>

          <Container
            delay={0.3}
            className="!w-fit max-w-2xl flex items-center justify-center mx-auto max-lg:hidden"
          >
            <LiquidGlass
              blur={2}
              brightness={1.5}
              contrast={1.2}
              className="border border-white/50 border-x-0 relative mt-6 !w-full lg:!w-fit mx-auto"
            >
              <UserInfo />
            </LiquidGlass>
          </Container>

          <Container
            delay={0.3}
            className="w-full max-lg:max-w-lg px-4 mx-auto"
          >
            <LiquidGlass
              blur={2}
              brightness={1.5}
              className="border border-white/50 border-x-0 relative mt-6 !w-full lg:!w-fit mx-auto"
            >
              <ImageUpload />
            </LiquidGlass>
          </Container>

          <Container
            delay={0.3}
            className="w-full max-lg:max-w-lg px-4 mx-auto mt-6"
          >
            <div className="flex items-center justify-center gap-3 flex-col">
              <div className="relative w-[336px] bg-white/40 rounded-full h-2 overflow-hidden">
                <div
                  className="absolute top-0 left-0 bg-white h-full rounded-full transition-all duration-300 ease-out"
                  style={{ width: `${progress}%` }}
                />
              </div>
              <p className="text-white text-sm">{progress}%</p>
              {progress === 100 && (
                <Container delay={0.4} className="mt-4">
                  <LiquidGlassButton 
                    className="px-10"
                    onClick={handleSubmit}
                  >
                    <span>Envoyer</span>
                  </LiquidGlassButton>
                </Container>
              )}
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
