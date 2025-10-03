import Image from "next/image";
import LiquidGlassButton from "../common/liquid-glass-button";
import Container from "../global/container";
import Wrapper from "../global/wrapper";

const OpenDriveAgency = () => {
  return (
    <div className="relative z-0 w-full p-2.5 md:p-4 h-screen">
      <Container
        animation="scaleUp"
        delay={0.2}
        className="relative w-full h-full min-h-screen"
      >
        <Image
          src="/images/main/open-drive-agency.jpg"
          alt="Open Drive Agency"
          fill
          sizes="100vw"
          className="object-cover object-center -z-10 rounded-3xl"
          loading="lazy" // Change to lazy loading
          priority={false} // Remove priority to defer loading
        />
      </Container>

      <Wrapper className="py-12 absolute bottom-0 left-1/2 -translate-x-1/2 h-fit">
        <div className="flex flex-col items-center justify-center w-full z-10">
          <Container delay={0.2}>
            <h2 className="text-balance !leading-[1.25] text-center text-[28px] md:text-[48px] font-medium tracking-tight mt-4 md:mt-6 w-full">
              Ouvrir une agence DRIVE.
            </h2>
          </Container>

          <Container delay={0.2}>
            <p className="text-lg md:text-xl font-medium text-center text-balance max-w-3xl mx-auto mt-4">
              Devenez partenaire DRIVE en 90jours.
            </p>
          </Container>

          <Container delay={0.3}>
            <div className="mt-4 md:mt-6 flex items-center gap-3">
              <LiquidGlassButton className="px-6 text-xl">
                <span>Ouvrir mon agence</span>
              </LiquidGlassButton>
            </div>
          </Container>

          <Container delay={0.4}>
            <p className="mt-4 md:mt-6 flex items-center gap-1 text-sm font-medium group cursor-pointer">
              +12 agences actives · 97 % franchisés satisfaits
            </p>
          </Container>
        </div>
      </Wrapper>
    </div>
  );
};

export default OpenDriveAgency;
