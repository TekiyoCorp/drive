import Image from "next/image";
import Link from "next/link";
import LiquidGlassButton from "../../common/liquid-glass-button";
import Container from "../../global/container";
import Wrapper from "../../global/wrapper";
import type { AgencySummary } from "@/types/agency";

interface FranchiseHeroProps {
  agency: AgencySummary;
}

const FranchiseHero = ({ agency }: FranchiseHeroProps) => {

  return (
    <div className="relative z-0 w-full h-screen p-2.5 md:p-4">
      <Container
        animation="scaleUp"
        delay={0.1}
        className="w-full h-screen relative overflow-hidden rounded-3xl"
      >
        <div className="w-full h-full bg-gradient-to-t from-black/70 to-transparent absolute top-0 left-0"></div>
        <Image
          src={agency.imageUrl}
          alt={agency.name}
          width={1024}
          height={1024}
          className="object-cover object-center top-0 z-10 rounded-3xl w-full h-screen"
          priority
          fetchPriority="high"
        />
      </Container>

      <Wrapper className="absolute bottom-0 left-0 w-full h-full md:h-fit py-6 z-10 flex items-center md:items-end justify-between !px-12 flex-col md:flex-row max-md:text-center">
        <div className="flex flex-col md:justify-end gap-2">
          <h3 className="text-2xl font-medium">{agency.name}</h3>
          <div>
            <p className="text-lg font-medium text-[#CBCBCB]">
              {agency.displayAddress}
            </p>
            <p className="text-lg font-medium text-[#CBCBCB]">
              {agency.phone}
            </p>
          </div>
          <div className="w-fit max-md:mx-auto">
            <Link href={"/franchise"}>
              <LiquidGlassButton className="px-12">
                <span>Voir le stock</span>
              </LiquidGlassButton>
            </Link>
          </div>
        </div>

        <div className="w-full z-10 flex flex-col gap-2 items-center md:items-end justify-center md:max-w-md md:justify-end md:ml-auto">
          <Container delay={0.2}>
            <p className="text-lg font-medium text-balance text-white md:text-right">
              Besoin d&apos;une réponse rapide ? Écrivez-nous sur WhatsApp
              Business, on répond dans la journée.
            </p>
          </Container>

          <Container
            delay={0.4}
            className="w-full sm:w-fit flex max-sm:justify-center"
          >
            <LiquidGlassButton className="!w-full min-w-[300px] sm:min-w-[420px] h-[42px]">
              <Image
                src="/icons/whatsapp.svg"
                alt="Whatsapp Icon"
                width={18}
                height={18}
                className="cursor-pointer"
              />
            </LiquidGlassButton>
          </Container>
        </div>
      </Wrapper>
    </div>
  );
};

export default FranchiseHero;
