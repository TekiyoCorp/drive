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
import { InfinitiaVehicle } from "@/lib/infinitia";

interface VehicleDetailsProps {
  vehicle: InfinitiaVehicle;
}

const VehicleDetails = ({ vehicle }: VehicleDetailsProps) => {
  const isMobile = useIsMobile();

  // Format vehicle data
  const formattedYear = vehicle.year 
    ? String(vehicle.year)
    : vehicle.data?.debut_modele 
      ? String(vehicle.data.debut_modele).split('-')[0]
      : null;

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
      : null;

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
      : null;

  // Build characteristics section
  const characteristicsItems: Array<{ label: string; value: string | number | null }> = [];
  
  if (vehicle.data?.motorisation) {
    characteristicsItems.push({ label: 'Motorisation', value: String(vehicle.data.motorisation) });
  }
  if (vehicle.data?.puissance) {
    characteristicsItems.push({ label: 'Puissance', value: `${vehicle.data.puissance} ch` });
  }
  if (vehicle.data?.couple) {
    characteristicsItems.push({ label: 'Couple', value: `${vehicle.data.couple} Nm` });
  }
  if (vehicle.data?.acceleration_0_100) {
    characteristicsItems.push({ label: '0-100 km/h', value: `${vehicle.data.acceleration_0_100} s` });
  }
  if (vehicle.data?.vitesse_max) {
    characteristicsItems.push({ label: 'Vitesse max', value: `${vehicle.data.vitesse_max} km/h` });
  }
  if (formattedTrans) {
    characteristicsItems.push({ label: 'Transmission', value: formattedTrans });
  }
  if (vehicle.data?.traction) {
    characteristicsItems.push({ label: 'Traction', value: String(vehicle.data.traction) });
  }
  if (vehicle.data?.consommation) {
    characteristicsItems.push({ label: 'Consommation mixte WLTP', value: `${vehicle.data.consommation} L/100 km` });
  }
  if (vehicle.data?.emissions_co2) {
    characteristicsItems.push({ label: 'Émissions CO₂', value: `${vehicle.data.emissions_co2} g/km` });
  }
  if (vehicle.data?.dimensions) {
    characteristicsItems.push({ label: 'Dimensions (L x l x H)', value: String(vehicle.data.dimensions) });
  }
  if (vehicle.data?.poids) {
    characteristicsItems.push({ label: 'Poids à vide', value: `${vehicle.data.poids} kg` });
  }
  if (vehicle.color) {
    characteristicsItems.push({ label: 'Couleur extérieure', value: vehicle.color });
  }
  if (vehicle.data?.interieur) {
    characteristicsItems.push({ label: 'Intérieur', value: String(vehicle.data.interieur) });
  }

  // Build history section
  const historyContent: React.ReactNode[] = [];
  
  if (vehicle.data?.nb_proprietaires) {
    const nbProprietaires = vehicle.data.nb_proprietaires;
    historyContent.push(
      <div key="proprietaires" className="flex max-md:flex-col max-md:mb-2">
        <p className="text-white/80">
          {nbProprietaires === 1 ? '1er' : `${nbProprietaires}e`} propriétaire{nbProprietaires > 1 ? 's' : ''}
          {vehicle.data.factures_disponibles ? ', factures d\'achat et d\'entretien disponibles.' : '.'}
        </p>
      </div>
    );
  }
  
  if (vehicle.comment) {
    historyContent.push(
      <div key="comment" className="flex max-md:flex-col max-md:mb-2">
        <p className="text-white/80">{vehicle.comment}</p>
      </div>
    );
  }

  // Build options section
  const optionsItems: Array<{ name: string; price?: number | string }> = [];
  
  if (vehicle.carEquipements && vehicle.carEquipements.length > 0) {
    vehicle.carEquipements.forEach((equipment) => {
      optionsItems.push({ name: equipment.name });
    });
  }

  const sections = [
    {
      id: "caracteristiques",
      title: "1. Caractéristiques",
      content: (
        <div className="flex flex-col gap-1 text-left text-lg text-white">
          {characteristicsItems.length > 0 ? (
            characteristicsItems.map((item, index) => (
              <div key={index} className="flex max-md:flex-col max-md:mb-2">
                <span className="mr-3 font-medium">{item.label}</span>
                <span className="text-white/80">{item.value || 'Non renseigné'}</span>
              </div>
            ))
          ) : (
            <div className="flex max-md:flex-col max-md:mb-2">
              <p className="text-white/80">Informations non disponibles</p>
            </div>
          )}
        </div>
      ),
    },
    {
      id: "historique",
      title: "2. Historique & entretien",
      content: (
        <div className="flex flex-col gap-1 text-lg">
          {historyContent.length > 0 ? (
            historyContent
          ) : (
            <div className="flex max-md:flex-col max-md:mb-2">
              <p className="text-white/80">Informations non disponibles</p>
            </div>
          )}
        </div>
      ),
    },
    {
      id: "options",
      title: "3. Options & packs",
      content: (
        <div className="space-y-1 text-lg">
          {optionsItems.length > 0 ? (
            optionsItems.map((option, index) => (
              <div key={index}>
                <span className="mr-3 font-medium">{option.name}</span>
                {option.price && (
                  <span className="text-right text-white/80">{option.price}</span>
                )}
              </div>
            ))
          ) : (
            <div>
              <p className="text-white/80">Aucune option renseignée</p>
            </div>
          )}
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
