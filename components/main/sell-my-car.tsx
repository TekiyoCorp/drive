import React from "react";
import Wrapper from "../global/wrapper";
import Container from "../global/container";
import Image from "next/image";
import { cn } from "@/lib/utils";

const SellMyCar = () => {
  const features = [
    {
      id: 1,
      title: "Estimation instantanée",
      description: "Recevez un prix précis en < 2 min.",
      icon: "/images/main/sell-my-car/1.svg",
    },
    {
      id: 2,
      title: "Inspection photo",
      description: "5 clichés suffisant pour valider l'état.",
      icon: "/images/main/sell-my-car/2.svg",
    },
    {
      id: 3,
      title: "Acompte sécurisé",
      description: "Strict bloqué l'acheteur sous 24 h.",
      icon: "/images/main/sell-my-car/3.svg",
    },
    {
      id: 4,
      title: "Paiement garanti",
      description: "Fonds viré avant remise des clés.",
      icon: "/images/main/sell-my-car/4.svg",
    },
  ];

  return (
    <div className="flex flex-col items-center justify-center w-full py-16 lg:py-24 text-white">
      <Wrapper className="lg:!px-24">
        <div className="flex flex-col items-center justify-center text-center space-y-8">
          {/* Header */}
          <Container animation="fadeUp" delay={0.1}>
            <div className="space-y-6">
              <div className="text-blue-400 text-base">Vendre ma voiture →</div>
              <h1 className="text-4xl font-medium max-w-4xl">
                Nous estimons la valeur de votre voiture,
                <br className="max-md:hidden" />
                puis nous sécurisons l&apos;acheteur pour vous.
              </h1>
            </div>
          </Container>

          {/* Car Image */}
          <Container animation="fadeUp" delay={0.3}>
            <div className="my-12">
              <Image
                src="/images/main/car.svg"
                alt="Blue car"
                width={600}
                height={300}
                className="w-full max-w-lg h-auto"
              />
            </div>
          </Container>

          {/* Features Grid */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-8 w-full max-w-6xl">
            {features.map((feature, index) => (
              <Container
                key={feature.id}
                animation="fadeUp"
                delay={0.6 + index * 0.5}
              >
                <div className="flex flex-col items-start justify-between text-left space-y-8 relative max-lg:border max-lg:p-4 rounded-xl max-lg:h-full border-white/40">
                  <div
                    className={cn(
                      "lg:w-12 lg:h-12 rounded-full border flex items-center justify-center",
                      index === 0
                        ? "border-transparent lg:border-blue-400/70"
                        : "border-transparent"
                    )}
                  >
                    <Image
                      src={feature.icon}
                      alt=""
                      width={25}
                      height={25}
                      className="w-fit h-fit object-contain"
                    />
                  </div>
                  {index !== features?.length - 1 && (
                    <div className="absolute top-6 left-20 rounded-lg h-[1px] w-[65%] bg-white/40 border-gray-600 pointer-events-none max-lg:hidden" />
                  )}

                  <div>
                    <h2 className="font-medium text-lg text-white mb-2">
                      {feature.title}
                    </h2>
                    <p className="text-xs">{feature.description}</p>
                  </div>
                </div>
              </Container>
            ))}
          </div>

          {/* Bottom Text */}
          <Container animation="fadeUp" delay={2.6}>
            <div className="text-center space-y-2 max-w-2xl mt-12 text-base">
              <p className="text-white font-medium">
                Nous gérons chaque étape : <br /> évaluation, visibilité,
                réservation et transfert d&apos;argent sans frais cachés, sans
                stress.
              </p>
            </div>
          </Container>
        </div>
      </Wrapper>
    </div>
  );
};

export default SellMyCar;
