import React from "react";
import Wrapper from "../global/wrapper";
import Container from "../global/container";
import Image from "next/image";

const VehicleCondition = () => {
  return (
    <div>
      <Wrapper className="pt-24 md:pt-32 w-full px-2.5 md:px-8 lg:px-24 flex-col gap-2 min-h-screen flex items-center justify-center">
        <Container
          animation="fadeUp"
          delay={0}
          className="h-full flex gap-2 w-full max-md:flex-col max-w-4xl mx-auto"
        >
          <Container
            animation="fadeLeft"
            delay={1}
            className="bg-[#212121] w-full rounded-4xl h-[285px] col-span-3 pt-6 pl-8 pr-0 overflow-hidden flex-[1]"
          >
            <Container animation="fadeUp" delay={2}>
              <h2 className="text-lg font-medium">Estimation</h2>
              <p className="text-white/60 text-sm font-medium max-w-72 mt-1">
                Entrez votre immatriculation et votre kilométrage : nous
                comparons des milliers de ventes récentes pour générer une
                fourchette fiable. Ajoutez 10 photos guidées pour affiner.
                Résultat immédiat, sans engagement.
              </p>
            </Container>
            <Container animation="scaleUp" delay={3}>
              <Image
                src="/images/vendre/vehicle-condition/1.webp"
                alt="Vehicle Condition 1"
                width={1024}
                height={1024}
                className="w-full object-cover ml-[50%] sm:ml-[60%] min-h-[193px] -mt-20 sm:-mt-36 object-left"
              />
            </Container>
          </Container>

          <Container
            animation="fadeRight"
            delay={1}
            className="bg-[#212121] w-full rounded-4xl min-h-[285px] col-span-3 py-6 pl-8 pr-0 overflow-hidden flex-[0.8] flex"
          >
            <Container animation="fadeUp" delay={2} className="flex-1 w-full">
              <h2 className="text-lg font-medium">Inspection</h2>
              <p className="text-white/60 text-sm font-medium max-w-72 mt-1">
                30 minutes à l&apos;agence ou chez vous. Contrôle de 100 points,
                vérification du VIN et des documents, mini-essai si nécessaire.
                Rapport photo horodaté envoyé avant décision.
              </p>
            </Container>
            <Container
              animation="scaleUp"
              delay={3}
              className="flex-1 w-full mt-auto"
            >
              <Image
                src="/images/vendre/vehicle-condition/2.webp"
                alt="Vehicle Condition 2"
                width={1024}
                height={1024}
                className="w-full object-cover object-left min-h-[193px]"
              />
            </Container>
          </Container>
        </Container>

        <Container
          animation="fadeUp"
          delay={4}
          className="h-full flex gap-2 w-full max-md:flex-col max-w-4xl mx-auto"
        >
          <Container
            animation="fadeLeft"
            delay={5}
            className="bg-[#212121] w-full rounded-4xl min-h-[300px] col-span-3 pb-6 px-6 !pt-0 overflow-hidden flex-[0.3] flex flex-col justify-between"
          >
            <Container
              animation="scaleUp"
              delay={6}
              className="flex-1 w-full h-full -mt-[5%] max-sm:-mt-[20%] max-md:-mt-[35%]"
            >
              <Image
                src="/images/vendre/vehicle-condition/3.png"
                alt="Vehicle Condition 3"
                width={1024}
                height={1024}
                className="-rotate-90 w-full h-full max-sm:min-h-[200px] object-left object-cover"
              />
            </Container>

            <Container
              animation="fadeUp"
              delay={7}
              className="text-center flex-[0.1] md:flex-[0.3] w-full"
            >
              <h2 className="text-lg font-medium">Offre ferme</h2>
              <p className="text-white/60 text-sm font-medium max-w-72 mx-auto mt-1">
                Prix garanti après inspection, valable 48 h.
              </p>
            </Container>
          </Container>

          <Container
            animation="fadeRight"
            delay={5}
            className="bg-[#212121] w-full rounded-4xl min-h-[300px] col-span-3 pt-6 overflow-hidden flex-[1] flex flex-col justify-between"
          >
            <Container
              animation="fadeUp"
              delay={6}
              className="text-center flex-[0.3] w-full"
            >
              <h2 className="text-lg font-medium">Paiement & cession</h2>
              <p className="text-white/60 text-sm font-medium max-w-lg mx-auto mt-1">
                Virement instantané confirmé avant remise des clés. Nous gérons
                carte grise, certificat de cession et logistique
                d&apos;enlèvement. Zéro avance, zéro paperasse, tout simplement.
              </p>
            </Container>

            <Container
              animation="scaleUp"
              delay={7}
              className="flex-1 w-full h-full"
            >
              <Image
                src="/images/vendre/vehicle-condition/4.svg"
                alt="Vehicle Condition 4"
                width={1024}
                height={1024}
              />
            </Container>
          </Container>
        </Container>
      </Wrapper>
    </div>
  );
};

export default VehicleCondition;
