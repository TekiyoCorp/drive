import { ArrowRight } from "lucide-react";
import Image from "next/image";
import LiquidGlassButton from "../common/liquid-glass-button";
import Container from "../global/container";
import Wrapper from "../global/wrapper";

const Hero = () => {
  return (
    <div className="relative z-0 w-full p-2.5 md:p-4 h-screen">
      <Container
        animation="scaleUp"
        delay={0.1}
        className="w-full h-screen relative"
      >
        <Image
          src="/images/open-agency/hero.webp"
          alt="Hero Image"
          width={1024}
          height={1024}
          className="object-cover object-center top-0 z-10 rounded-3xl w-full h-screen"
          style={{ height: "100%" }}
        />
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-t from-black/80 via-transparent to-black/40 rounded-3xl" />
      </Container>

      <Wrapper className="py-16 absolute bottom-0 left-1/2 -translate-x-1/2 h-fit z-10 !px-6 md:!px-16 lg:!px-24">
        <div className="flex flex-col justify-center max-md:items-center max-md:text-center w-full z-10">
          <Container delay={0.1}>
            <h2 className="text-balance !leading-[1.25] text-[28px] md:text-[48px] font-medium w-full">
              Ouvrez votre agence <br /> DRIVE en 90 jours
            </h2>
          </Container>

          <Container delay={0.2}>
            <p className="text-lg md:text-xl font-medium text-white max-w-md mt-4">
              Méthode clé en main, réseau premium,{" "}
              <br className="max-md:hidden" /> retour sur investissement rapide.
            </p>
          </Container>

          <Container delay={0.3}>
            <div className="mt-6 flex max-md:flex-col md:items-center gap-3">
              <LiquidGlassButton className="px-8 max-md:w-full">
                <span>Je candidate</span>
                <ArrowRight size={16} />
              </LiquidGlassButton>
              <LiquidGlassButton className="px-8">
                <span>Télécharger le dossier PDF</span>
              </LiquidGlassButton>
            </div>
          </Container>
        </div>
      </Wrapper>
    </div>
  );
};

export default Hero;
