import Image from "next/image";
import Container from "../global/container";
import Wrapper from "../global/wrapper";

const MaximizeYourProfitability = () => {
  return (
    <div className="w-full py-10 lg:py-16 h-screen">
      <Wrapper className="grid lg:grid-cols-2 gap-10 h-full">
        <Container delay={1} className="relative">
          <Image
            src="/images/about/maximize-your-profitablity-banner.webp"
            alt="About Us Banner"
            width={1024}
            height={1024}
            className="object-cover object-left rounded-3xl w-full h-full max-sm:aspect-square"
          />
        </Container>

        <Container
          animation="fadeUp"
          delay={0.4}
          className="w-full lg:h-full flex flex-col lg:justify-between text-center lg:text-right gap-5"
        >
          <Container
            animation="fadeDown"
            delay={2}
            className="lg:max-w-sm lg:ml-auto"
          >
            <h1 className="text-white text-2xl lg:text-4xl font-semibold">
              MODÈLE UNIQUE POUR MAXIMISER VOTRE RENTABILITÉ
            </h1>
          </Container>
          <Container
            animation="fadeUp"
            delay={2}
            className="lg:max-w-lg lg:ml-auto"
          >
            <p className="text-white text-base lg:text-[22px]">
              Drive propose une approche innovante en combinant la force du
              digital et un réseau physique d&apos;agences locales, permettant ainsi
              d&apos;optimiser la génération de leads et d&apos;accélérer le closing des
              ventes.
            </p>
          </Container>
        </Container>
      </Wrapper>
    </div>
  );
};

export default MaximizeYourProfitability;
