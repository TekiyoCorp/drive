"use client";

import Container from "@/components/global/container";
import { SnapScrollContentBox } from "@/components/global/scroll-snap";
import Wrapper from "@/components/global/wrapper";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { OUR_CATALOGUES } from "@/constants/catalogues";
import Image from "next/image";
import { useState, use } from "react";

const OrderPage = ({ params }: { params: Promise<{ id: string }> }) => {
  const [deliveryOption, setDeliveryOption] = useState<"pickup" | "delivery">(
    "delivery"
  );

  const resolvedParams = use(params);
  const carId = parseInt(resolvedParams.id);
  const car = OUR_CATALOGUES.find((c) => c.id === carId) || {
    id: 1,
    title: "Audi",
    subtitle: "RS6",
    price: "129 000€",
    km: "25 000 km",
    year: "2021",
    fuel: "Essence",
    trans: "Auto",
    img: "/images/main/features/feature-2.jpg",
  };

  return (
    <SnapScrollContentBox>
      <div className="w-full relative flex flex-col text-white min-h-screen">
        <Wrapper className="pt-24 md:pt-28 lg:pt-40 w-full px-2.5 md:px-8 lg:px-28 xl:px-40 flex flex-col lg:flex-row gap-8 lg:gap-16 xl:gap-24">
          <div className="flex-1 lg:sticky lg:top-32 lg:h-fit">
            <Container animation="fadeLeft" delay={0}>
              <h1 className="text-3xl md:text-4xl font-medium mb-8">
                Votre commande
              </h1>
            </Container>

            <Container
              animation="scaleUp"
              delay={0.2}
              className="relative mb-8"
            >
              <div className="relative w-full h-64 flex items-center justify-center">
                <Image
                  src="/images/main/car.svg"
                  alt="Blue car"
                  width={500}
                  height={500}
                  className="w-full h-auto object-contain"
                />
              </div>
            </Container>

            <Container animation="fadeUp" delay={0.4} className="space-y-4">
              <h2 className="text-2xl font-normal">{car.title}</h2>
              <p className="text-white/70 text-lg">
                Lorem Ipsum is a dummy text for Tekiyo presentation. Lorem Ipsum
                is a dummy text for Tekiyo presentation. Lorem Ipsum is a dummy
                text for Tekiyo presentation. Lorem Ipsum is a dummy text for
                Tekiyo presentation. Lorem Ipsum is a dummy text for Tekiyo
                presentation. Lorem Ipsum is a dummy text for Tekiyo
                presentation.
              </p>
            </Container>
          </div>

          <div className="flex-1 w-full max-lg:mt-10 lg:max-w-sm">
            <div className="space-y-6 w-full">
              <Container animation="fadeRight" delay={0.1}>
                <h2 className="text-[28px] font-normal mb-1">
                  Paiement et réservation
                </h2>
                <p className="text-lg text-white/70 mb-4">
                  Complétez les détails de paiement pour finaliser votre
                  réservation.
                </p>

                <div className="text-[48px] font-regular mb-4">{car.price}</div>
              </Container>

              <Container animation="fadeUp" delay={0.3} className="space-y-3">
                <h3 className="text-lg font-medium text-white/70">
                  Récupération du véhicule
                </h3>

                <div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="pickup"
                      checked={deliveryOption === "pickup"}
                      onCheckedChange={() => setDeliveryOption("pickup")}
                    />
                    <label
                      htmlFor="pickup"
                      className="text-base cursor-pointer"
                    >
                      Récupérer sur place
                    </label>
                  </div>

                  <p className="text-base text-white/80 mt-1">
                    12 Rue de la vie, 75000 Paris, France
                  </p>
                </div>

                <div className="flex items-center space-x-2 pt-1">
                  <Checkbox
                    id="delivery"
                    checked={deliveryOption === "delivery"}
                    onCheckedChange={() => setDeliveryOption("delivery")}
                  />
                  <label
                    htmlFor="delivery"
                    className="text-base cursor-pointer"
                  >
                    Livraison à votre domicile
                  </label>
                </div>

                {deliveryOption === "delivery" && (
                  <>
                    <div className="grid grid-cols-2 gap-3">
                      <Input placeholder="Adresse" className="col-span-2" />
                      <Input placeholder="Ville" />
                      <Input placeholder="Code postal" />
                    </div>

                    <div className="text-base text-white">
                      490€ supplémentaires
                    </div>
                  </>
                )}
              </Container>

              <Container animation="fadeLeft" delay={0.5} className="space-y-3">
                <h3 className="text-lg font-semibold text-white/70">
                  Informations
                </h3>

                <Input placeholder="Nom complet" />
                <Input placeholder="Adresse mail" />
                <Input placeholder="Téléphone" />
              </Container>

              <Container
                animation="fadeRight"
                delay={0.7}
                className="space-y-3"
              >
                <h3 className="text-lg font-semibold text-white/70">
                  Adresse postal
                </h3>

                <Input placeholder="Rue" />
                <Input placeholder="Ville" />
                <Input placeholder="Code postal" />
              </Container>

              <Container animation="scaleUp" delay={0.9} className="space-y-3">
                <h3 className="text-lg font-semibold text-white/70">
                  Moyen de paiement
                </h3>

                <div className="relative">
                  <Input
                    placeholder="Numéro de carte MM/AA | CCV"
                    className="pl-12"
                  />
                  <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                    <Image
                      src="/icons/credit-card.svg"
                      alt="Credit Card"
                      width={24}
                      height={24}
                    />
                  </div>
                </div>
                <div className="text-sm font-medium text-white/70 text-center">
                  ou
                </div>
                <Button
                  size={"lg"}
                  className="w-full bg-white text-black hover:bg-gray-200 rounded-lg"
                >
                  Apple Pay 
                </Button>
              </Container>

              <Container animation="fadeUp" delay={1.1}>
                <div className="text-base text-white/70">
                  Lorem Ipsum Mention légales
                </div>
              </Container>
            </div>
          </div>
        </Wrapper>
      </div>
    </SnapScrollContentBox>
  );
};

export default OrderPage;
