import Image from "next/image";
import Container from "../global/container";
import Wrapper from "../global/wrapper";

const Hero = () => {
  return (
    <div className="relative z-0 w-full p-2.5 md:p-4 min-h-screen">
      <Container
        animation="scaleUp"
        delay={0.1}
        className="w-full h-screen relative rounded-3xl overflow-hidden"
      >
        <Image
          src="/images/about/hero.png"
          alt="Hero Image"
          width={1024}
          height={1024}
          className="object-bottom object-cover md:absolute md:bottom-0 z-10 rounded-3xl w-full h-screen min-h-screen"
        />
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-t from-black/80 via-black/30 to-transparent rounded-3xl z-20" />
      </Container>

      <Wrapper className="py-16 absolute bottom-0 left-1/2 -translate-x-1/2 h-fit !px-6 md:!px-16 lg:!px-24 z-30">
        <div className="flex flex-col justify-center max-md:items-center max-md:text-center w-full z-10">
          <Container delay={0.2}>
            <h2 className="text-[56px] font-medium w-full">À propos</h2>
          </Container>
        </div>
      </Wrapper>
    </div>
  );
};

export default Hero;
