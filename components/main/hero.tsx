import { ArrowRight } from "lucide-react";
import Image from "next/image";
import LiquidGlassButton from "../common/liquid-glass-button";
import Container from "../global/container";
import Wrapper from "../global/wrapper";
import { getHeroData } from "@/lib/strapi-actions";
import { getStrapiMediaURL } from "@/lib/strapi";

const Hero = async () => {
  const heroResponse = await getHeroData();

  const heroContent =
    heroResponse.success && heroResponse.data
      ? heroResponse.data
      : {
          title: "La confiance au volant.",
          subtitle:
            "Simplifiez la vente ou l'achat de votre voiture premium grâce à notre réseau de courtiers certifiés.",
          sellButtonText: "Vendre",
          buyButtonText: "Acheter",
          ctaText: "Découvrir le réseau DRIVE",
          backgroundImage: null,
        };

  return (
    <div className="relative z-0 w-full p-2.5 md:p-4 h-screen">
      <Container animation="scaleUp" delay={0.3} className="w-full h-screen">
        <Image
          src={
            heroContent.backgroundImage
              ? getStrapiMediaURL(heroContent.backgroundImage)
              : "/images/main/hero.svg"
          }
          alt="Hero Image"
          width={1024}
          height={1024}
          className="object-cover object-center top-0 z-10 rounded-3xl w-full h-screen"
        />
      </Container>

      <Wrapper className="py-12 absolute bottom-0 left-1/2 -translate-x-1/2 h-fit">
        <div className="flex flex-col items-center justify-center w-full z-10">
          <Container delay={0.6}>
            <h2 className="text-balance !leading-[1.25] text-center text-[32px] font-semibold tracking-tight mt-6 w-full">
              {heroContent.title}
            </h2>
          </Container>

          <Container delay={1}>
            <p className="text-base font-normal text-center text-balance text-white/70 max-w-3xl mx-auto mt-4">
              {heroContent.subtitle}
            </p>
          </Container>

          <Container delay={1.5}>
            <div className="mt-6 flex items-center gap-3">
              <LiquidGlassButton className="px-8 md:px-12">
                <span>{heroContent.sellButtonText}</span>
              </LiquidGlassButton>
              <LiquidGlassButton className="px-8 md:px-12">
                <span>{heroContent.buyButtonText}</span>
              </LiquidGlassButton>
            </div>
          </Container>

          <Container delay={2}>
            <button className="mt-6 flex items-center gap-1 text-base font-medium group cursor-pointer">
              {heroContent.ctaText}{" "}
              <ArrowRight className="size-5 ml-0 group-hover:ml-1 transition-all" />
            </button>
          </Container>
        </div>
      </Wrapper>
    </div>
  );
};

export default Hero;
