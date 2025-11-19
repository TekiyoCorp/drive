"use client";

import Container from "@/components/global/container";
import Wrapper from "@/components/global/wrapper";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import { useState } from "react";
import { InfinitiaVehicle } from "@/lib/infinitia";

interface OrderFormProps {
  vehicle: InfinitiaVehicle;
}

const OrderForm = ({ vehicle }: OrderFormProps) => {
  const [deliveryOption, setDeliveryOption] = useState<"pickup" | "delivery">(
    "delivery"
  );

  // Get cover image or first image
  const coverImage = vehicle.carMedias?.find(media => media.isCover);
  const firstImage = vehicle.carMedias?.[0];
  const carImageUrl = coverImage?.url || firstImage?.url || '/images/main/car.svg';

  // Format vehicle data
  const formattedPrice = vehicle.price 
    ? `${vehicle.price.toLocaleString('fr-FR')} €`
    : 'Prix sur demande';

  const title = vehicle.brand || 'Marque non renseignée';
  const subtitle = vehicle.model || 'Modèle non renseigné';
  const description = vehicle.comment || '';

  // Format other vehicle details
  const formattedKm = vehicle.km 
    ? `${vehicle.km.toLocaleString('fr-FR')} km`
    : 'Kilométrage non renseigné';

  const formattedYear = vehicle.year 
    ? String(vehicle.year)
    : vehicle.data?.debut_modele 
      ? String(vehicle.data.debut_modele).split('-')[0]
      : 'Année non renseignée';

  const energyMap: Record<string, string> = {
    'DIESEL': 'Diesel',
    'ESSENCE': 'Essence',
    'ELECTRIC': 'Électrique',
    'HYBRID': 'Hybride',
  };
  const formattedFuel = vehicle.energy 
    ? energyMap[vehicle.energy] || vehicle.energy
    : vehicle.data?.energieNGC 
      ? energyMap[vehicle.data.energieNGC as string] || String(vehicle.data.energieNGC)
      : 'Non renseigné';

  const transmissionMap: Record<string, string> = {
    'A': 'Automatique',
    'M': 'Manuelle',
    'AUTO': 'Automatique',
    'MANUAL': 'Manuelle',
  };
  const formattedTrans = vehicle.transmission 
    ? transmissionMap[vehicle.transmission] || vehicle.transmission
    : vehicle.data?.boite_vitesse 
      ? transmissionMap[vehicle.data.boite_vitesse as string] || String(vehicle.data.boite_vitesse)
      : 'Non renseigné';

  return (
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
                src={carImageUrl}
                alt={`${title} ${subtitle}`}
                width={500}
                height={500}
                className="w-full h-auto object-contain"
                unoptimized={carImageUrl.startsWith('http') && !carImageUrl.includes('api.infinitia.fr/car/documents')}
              />
            </div>
          </Container>

          <Container animation="fadeUp" delay={0.4} className="space-y-4">
            <h2 className="text-2xl font-normal">
              {title} {subtitle}
            </h2>
            {description && (
              <p className="text-white/70 text-lg">{description}</p>
            )}
            <div className="flex flex-wrap gap-4 text-sm text-white/60">
              <span>{formattedYear}</span>
              <span>•</span>
              <span>{formattedKm}</span>
              <span>•</span>
              <span>{formattedFuel}</span>
              <span>•</span>
              <span>{formattedTrans}</span>
            </div>
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

              <div className="text-[48px] font-regular mb-4">{formattedPrice}</div>
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
                  {vehicle.business?.name || 'Agence DRIVE'}
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
  );
};

export default OrderForm;
export { OrderForm };

