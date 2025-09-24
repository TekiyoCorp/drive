import Image from "next/image";
import LiquidGlassButton from "../common/liquid-glass-button";
import Container from "../global/container";
import Wrapper from "../global/wrapper";

const ReadyToTakeAction = () => {
  return (
    <div className="relative z-0 w-full p-2.5 md:p-4 h-screen bg-[#181818]">
      <Container
        animation="scaleUp"
        delay={0.4}
        className="w-full h-full min-h-screen"
      >
        <Image
          src="/images/main/footer-bg.webp"
          alt="Footer Background"
          width={1024}
          height={1024}
          className="object-cover object-center top-0 z-10 rounded-3xl w-full h-full"
        />
      </Container>

      <Wrapper className="py-40 absolute top-0 left-1/2 -translate-x-1/2 h-fit">
        <div className="flex flex-col items-center justify-center w-full z-10">
          <Container delay={0.8}>
            <h2 className="text-balance !leading-[1.25] text-center text-[28px] md:text-[48px] font-medium tracking-tight mt-6 w-full">
              Prêt à passer à l&apos;action ?
            </h2>
          </Container>

          <Container delay={0.8}>
            <p className="text-lg font-medium text-center text-balance mx-auto mt-4">
              Aucuns frais cachés. Réponse <br className="sm:hidden" /> sous 24
              h.
            </p>
          </Container>

          <Container delay={0.8}>
            <div className="mt-6 flex max-md:flex-col md:items-center gap-3">
              <LiquidGlassButton className="px-8 w-full">
                <span>Voir le catalogue</span>
              </LiquidGlassButton>
              <LiquidGlassButton className="px-8">
                <span>Estimer mon véhicule</span>
              </LiquidGlassButton>
            </div>
          </Container>
        </div>
      </Wrapper>
    </div>
  );
};

export default ReadyToTakeAction;
