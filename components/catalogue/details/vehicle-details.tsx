"use client";

import Wrapper from "@/components/global/wrapper";
import { useIsMobile } from "@/hooks/use-mobile";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import React from "react";

const VehicleDetails = () => {
  const isMobile = useIsMobile();

  const sections = [
    {
      id: "caracteristiques",
      title: "1. Caractéristiques",
      content: (
        <div className="flex flex-col gap-1 text-left text-lg text-white">
          <div className="flex max-md:flex-col max-md:mb-2">
            <span className="mr-3 font-medium">Motorisation</span>
            <span className="text-white/80">6 cyl. 3.0 L Biturbo</span>
          </div>
          <div className="flex max-md:flex-col max-md:mb-2">
            <span className="mr-3 font-medium">Puissance</span>
            <span className="text-white/80">510 ch / 375 kW</span>
          </div>
          <div className="flex max-md:flex-col max-md:mb-2">
            <span className="mr-3 font-medium">Couple</span>
            <span className="text-white/80">470 Nm</span>
          </div>
          <div className="flex max-md:flex-col max-md:mb-2">
            <span className="mr-3 font-medium">0-100 km/h</span>
            <span className="text-white/80">3.4 s (Launch Control)</span>
          </div>
          <div className="flex max-md:flex-col max-md:mb-2">
            <span className="mr-3 font-medium">Vitesse max</span>
            <span className="text-white/80">308 km/h</span>
          </div>
          <div className="flex max-md:flex-col max-md:mb-2">
            <span className="mr-3 font-medium">Transmission</span>
            <span className="text-white/80">
              Boîte PDK automatique 8 rapports
            </span>
          </div>
          <div className="flex max-md:flex-col max-md:mb-2">
            <span className="mr-3 font-medium">Traction</span>
            <span className="text-white/80">Propulsion</span>
          </div>
          <div className="flex max-md:flex-col max-md:mb-2">
            <span className="mr-3 font-medium">Consommation mixte WLTP</span>
            <span className="text-white/80">10.8 L/100 km</span>
          </div>
          <div className="flex max-md:flex-col max-md:mb-2">
            <span className="mr-3 font-medium">Émissions CO₂</span>
            <span className="text-white/80">224 g/km</span>
          </div>
          <div className="flex max-md:flex-col max-md:mb-2">
            <span className="mr-3 font-medium">Dimensions (L x l x H)</span>
            <span className="text-white/80">4 519 x 1 852 x 1 298 mm</span>
          </div>
          <div className="flex max-md:flex-col max-md:mb-2">
            <span className="mr-3 font-medium">Poids à vide</span>
            <span className="text-white/80">1 580 kg</span>
          </div>
          <div className="flex max-md:flex-col max-md:mb-2">
            <span className="mr-3 font-medium">Couleur extérieure</span>
            <span className="text-white/80">Gris Dolomite métallisé</span>
          </div>
          <div className="flex max-md:flex-col max-md:mb-2">
            <span className="mr-3 font-medium">Intérieur</span>
            <span className="text-white/80">
              Cuir noir pleine fleur, surpiqûres argent
            </span>
          </div>
        </div>
      ),
    },
    {
      id: "historique",
      title: "2. Historique & entretien",
      content: (
        <div className="flex flex-col gap-1 text-lg">
          <div className="flex max-md:flex-col max-md:mb-2">
            <p className="text-white/80">
              1er propriétaire, factures d&apos;achat et d&apos;entretien
              disponibles.
            </p>
          </div>
          <div className="max-md:flex max-md:flex-col max-md:mb-2">
            <p className="text-white/80">
              Carnet d&apos;entretien 100 % Porsche Center, dernières révisions
              :
            </p>
            <div className="mt-2 space-y-1">
              <p className="ml-4 text-white/80">
                • 18 000 km : vidange + filtres (07/2023)
              </p>
              <p className="ml-4 text-white/80">
                • 24 000 km : remplacement plaquettes AV (02/2024)
              </p>
            </div>
          </div>
          <div className="flex max-md:flex-col max-md:mb-2">
            <p className="text-white/80">
              Aucun sinistre déclaré (rapport Histovec + CarVertical clean).
            </p>
          </div>
          <div className="flex max-md:flex-col max-md:mb-2">
            <p className="text-white/80">
              Pneus Michelin Pilot Sport 4S neufs (&lt; 500 km).
            </p>
          </div>
        </div>
      ),
    },
    {
      id: "options",
      title: "3. Options & packs",
      content: (
        <div className="space-y-1 text-lg">
          <div>
            <span className="mr-3 font-medium">Pack Sport Chrono</span>
            <span className="text-right text-white/80">2 580 €</span>
          </div>
          <div>
            <span className="mr-3 font-medium">
              Échappement Sport (commande variable)
            </span>
            <span className="text-right text-white/80">3 300 €</span>
          </div>
          <div>
            <span className="mr-3 font-medium">Toit vitré panoramique</span>
            <span className="text-right text-white/80">1 990 €</span>
          </div>
          <div>
            <span className="mr-3 font-medium">
              Sièges Adaptive Sports Plus 18 voies
            </span>
            <span className="text-right text-white/80">3 420 €</span>
          </div>
          <div>
            <span className="mr-3 font-medium">
              Système audio Bose® Surround
            </span>
            <span className="text-right text-white/80">1 290 €</span>
          </div>
          <div>
            <span className="mr-3 font-medium">
              Jantes Carrera Classic 20&quot; / 21&quot;
            </span>
            <span className="text-right text-white/80">2 150 €</span>
          </div>
          <div>
            <span className="mr-3 font-medium">
              Peinture métallisée spéciale
            </span>
            <span className="text-right text-white/80">1 380 €</span>
          </div>
          <div>
            <span className="mr-3 font-medium">Intérieur</span>
            <span className="text-right text-white/80">
              Cuir noir pleine fleur, surpiqûres argent
            </span>
          </div>
          <div className="flex justify-between items-center mt-4">
            <p>Total options : ≈ 16 110 €</p>
          </div>
        </div>
      ),
    },
    {
      id: "garantie",
      title: "4. Garantie & services",
      content: (
        <div className="space-y-1 text-lg">
          <div className="flex max-md:flex-col max-md:mb-2">
            <p className="text-white">
              <span className="font-medium text-white">Garantie Premium</span>{" "}
              12 mois pièces & main-d&apos;œuvre (moteur, boîte, trains
              roulants, électronique).
            </p>
          </div>
          <div className="flex max-md:flex-col max-md:mb-2">
            <p className="text-white">
              <span className="font-medium text-white">
                Possibilité d&apos;extension
              </span>{" "}
              : +12 mois (500 €) ou +24 mois (1 390 €).
            </p>
          </div>
          <div className="flex max-md:flex-col max-md:mb-2">
            <p className="text-white">
              <span className="font-medium text-white">
                Livraison incluse partout en France métropolitaine
              </span>{" "}
              (camion fermé).
            </p>
          </div>
          <div className="flex max-md:flex-col max-md:mb-2">
            <p className="text-white">
              <span className="font-medium text-white">
                Reprise de votre véhicule actuel possible
              </span>{" "}
              : estimation sous 24 h.
            </p>
          </div>
          <div className="flex max-md:flex-col max-md:mb-2">
            <p className="text-white">
              <span className="font-medium text-white">
                Dossier administratif
              </span>{" "}
              pris en charge.
            </p>
          </div>
        </div>
      ),
    },
  ];

  if (isMobile) {
    return (
      <div className="flex flex-col items-center justify-center w-full py-8">
        <Wrapper className="px-4 md:px-24">
          <Accordion
            type="single"
            collapsible
            defaultValue="caracteristiques"
            className="w-full space-y-4"
          >
            {sections.map((section) => (
              <AccordionItem
                key={section.id}
                value={section.id}
                className="border-0 px-4"
              >
                <AccordionTrigger className="text-xl font-medium text-white hover:no-underline cursor-pointer">
                  {section.title}
                </AccordionTrigger>
                <AccordionContent className="text-white/80 pl-4">
                  {section.content}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </Wrapper>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center w-full md:py-16 lg:py-24">
      <Wrapper className="md:px-10 lg:!px-24">
        {sections.map((section, index) => (
          <div
            key={section.id}
            className={`flex items-start justify-between ${
              index < sections.length - 1 ? "mb-20" : ""
            } ${index === sections.length - 1 ? "text-lg" : ""}`}
          >
            <h2 className="text-2xl font-medium mb-6">{section.title}</h2>
            <div className="max-w-md w-full">{section.content}</div>
          </div>
        ))}
      </Wrapper>
    </div>
  );
};

export default VehicleDetails;
