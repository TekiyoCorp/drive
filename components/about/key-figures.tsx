import React from "react";
import Container from "../global/container";
import Wrapper from "../global/wrapper";

const KeyFigures = () => {
  const keyFigures = [
    {
      number: "62%",
      description:
        "62 % des ventes de véhicules d'occasion se font entre particuliers.",
    },
    {
      number: "70%",
      description:
        "70 % des acheteurs privilégient un intermédiaire fiable pour sécuriser leur achat et être accompagnés pour éviter les arnaques et simplifier les démarches administratives",
    },
    {
      number: "5,5M",
      description:
        "Plus de 5,5 millions de véhicules d'occasion sont vendus chaque année en France avec une demande constante demande.",
    },
    {
      number: "57%",
      description:
        "57 % des vendeurs rencontrent des difficultés à négocier et vendre d'un véhicule (manque de temps, perte de la gestion des négociations, des démarches administratives et du manque de confiance des acheteurs",
    },
  ];

  const benefits = [
    {
      title: "Fiabilité",
      description: "Sécurisation des transactions",
    },
    {
      title: "Simplicité",
      description:
        "Un accompagnement de bout en bout de l'estimation à la vente finale",
    },
    {
      title: "Rentabilité",
      description: "Nos négociations et un modèle économique avantageux",
    },
  ];

  return (
    <div className="w-full min-h-screen text-white py-16 flex items-center justify-center">
      <Wrapper className="h-full flex flex-col">
        <Container animation="scaleUp" delay={1}>
          <h1 className="text-3xl md:text-4xl font-medium mb-10 md:mb-16 text-center">
            QUELQUES CHIFFRES
          </h1>
        </Container>

        <div className="flex flex-col md:flex-row items-start justify-center mb-14 md:mb-28 max-md:gap-5">
          {keyFigures.map((figure, index) => (
            <React.Fragment key={index}>
              <Container
                animation="fadeUp"
                delay={2 + index * 0.5}
                className="flex justify-center flex-col items-center text-center text-2xl font-normal text-white gap-2 md:gap-4 flex-1 w-full"
              >
                <h3 className="font-light text-[28px] lg:text-[52px] bg-gradient-to-r from-white to-white/80 bg-clip-text text-transparent">
                  {figure.number}
                </h3>
                <p className="text-[10px] lg:text-xs text-balance">
                  {figure.description}
                </p>
              </Container>

              {index < keyFigures.length - 1 && (
                <Container
                  animation="scaleUp"
                  delay={3 + index * 0.5}
                  className="lg:w-28 w-10 max-md:hidden"
                >
                  <div className="md:h-px h-16 bg-gradient-to-r from-transparent via-white/60 to-transparent mt-8"></div>
                </Container>
              )}
            </React.Fragment>
          ))}
        </div>

        <Container animation="fadeDown" delay={5}>
          <h2 className="text-2xl font-medium mb-10 text-center">
            Pourquoi l&apos;intermédiation ?
          </h2>
        </Container>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-32 max-w-4xl mx-auto">
          {benefits.map((benefit, index) => (
            <Container
              key={index}
              animation={index % 2 === 0 ? "fadeLeft" : "fadeRight"}
              delay={6 + index * 0.3}
              className="text-center"
            >
              <h4 className="text-sm font-semibold mb-2 text-white">
                {benefit.title}
              </h4>
              <p className="text-xs text-white/60 group-hover:text-white/70 transition-colors">
                {benefit.description}
              </p>
            </Container>
          ))}
        </div>
      </Wrapper>
    </div>
  );
};

export default KeyFigures;
