import { ArrowRight } from "lucide-react";
import Image from "next/image";
import LiquidGlassButton from "../common/liquid-glass-button";
import Container from "../global/container";
import Wrapper from "../global/wrapper";

const Hero = () => {
  return (
    <div className="relative z-0 w-full p-2.5 md:p-4 h-screen">
      <Container animation="scaleUp" delay={0.3} className="w-full h-screen">
        <Image
          src="/images/main/hero.svg"
          alt="Hero Image"
          width={1024}
          height={1024}
          className="object-cover object-center top-0 z-10 rounded-3xl w-full h-screen"
          priority
          fetchPriority="high"
        />
      </Container>

      <Wrapper className="py-12 absolute bottom-0 left-1/2 -translate-x-1/2 h-fit">
        <div className="flex flex-col items-center justify-center w-full z-10">
          <Container delay={0.6}>
            <h2 className="text-balance !leading-[1.25] text-center text-[32px] font-semibold tracking-tight mt-6 w-full">
              La confiance au volant.
            </h2>
          </Container>

          <Container delay={1}>
            <p className="text-base font-normal text-center text-balance text-white/70 max-w-3xl mx-auto mt-4">
              Simplifiez la vente ou l&apos;achat de votre voiture <br />{" "}
              premium grâce à notre réseau de courtiers certifiés.
            </p>
          </Container>

          <Container delay={1.5}>
            <div className="mt-6 flex items-center gap-3">
              <LiquidGlassButton className="px-8 md:px-12">
                <span>Vendre</span>
              </LiquidGlassButton>
              <LiquidGlassButton className="px-8 md:px-12">
                <span>Acheter</span>
              </LiquidGlassButton>
            </div>
          </Container>

          <Container delay={2}>
            <button
              className="mt-6 flex items-center gap-1 text-base font-medium group cursor-pointer"
              aria-label="Discover the DRIVE network"
            >
              Découvrir le réseau DRIVE{" "}
              <ArrowRight className="size-5 ml-0 group-hover:ml-1 transition-all" />
            </button>
          </Container>
        </div>
      </Wrapper>
    </div>
  );
};

export default Hero;
