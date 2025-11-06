"use client";

import Image from "next/image";
import Container from "../global/container";
import Wrapper from "../global/wrapper";

interface MaximizeYourProfitabilityProps {
  title?: string;
  description?: string;
  imageUrl?: string;
}

const DEFAULT_TITLE = "MODÈLE UNIQUE POUR MAXIMISER VOTRE RENTABILITÉ";
const DEFAULT_DESCRIPTION =
  "Drive propose une approche innovante en combinant la force du digital et un réseau physique d'agences locales, permettant ainsi d'optimiser la génération de leads et d'accélérer le closing des ventes.";
const DEFAULT_IMAGE = "/images/about/maximize-your-profitablity-banner.webp";

const MaximizeYourProfitability = ({
  title,
  description,
  imageUrl,
}: MaximizeYourProfitabilityProps) => {
  const resolvedTitle = title || DEFAULT_TITLE;
  const resolvedDescription = description || DEFAULT_DESCRIPTION;
  const resolvedImageUrl = imageUrl || DEFAULT_IMAGE;

  return (
    <div className="w-full py-10 lg:py-16 h-screen">
      <Wrapper className="grid lg:grid-cols-2 gap-10 h-full">
        <Container delay={1} className="relative">
          <Image
            src={resolvedImageUrl}
            alt="About Us Banner"
            width={1024}
            height={1024}
            className="object-cover object-left rounded-3xl w-full h-full max-sm:aspect-square"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.src = DEFAULT_IMAGE;
            }}
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
              {resolvedTitle}
            </h1>
          </Container>
          <Container
            animation="fadeUp"
            delay={2}
            className="lg:max-w-lg lg:ml-auto"
          >
            <p className="text-white text-base lg:text-[22px]">
              {resolvedDescription}
            </p>
          </Container>
        </Container>
      </Wrapper>
    </div>
  );
};

export default MaximizeYourProfitability;
