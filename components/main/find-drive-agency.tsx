"use client";

import Container from "@/components/global/container";
import { LOCATIONS } from "@/constants/locations";
import { Search } from "lucide-react";
import { useState } from "react";
import LiquidGlass from "../common/liquid-glass";
import {
  AdvancedMapWrapper as AdvancedMap,
  type MarkerData,
} from "../ui/interactive-map-wrapper";
import type L from "leaflet";

const FindDriveAgency = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredLocations = LOCATIONS.filter(
    (location) =>
      location.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
      location.district.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Create markers for all French cities from LOCATIONS
  const markers: MarkerData[] = [
    {
      id: 1,
      position: [48.8566, 2.3522] as [number, number], // Paris
      size: "large" as const,
      popup: {
        title: "Paris",
        content: "8° arrondissement (Champs-Élysées)",
      },
    },
    {
      id: 2,
      position: [45.764, 4.8357] as [number, number], // Lyon
      size: "medium" as const,
      popup: {
        title: "Lyon",
        content: "Presqu'île, Rue de la République",
      },
    },
    {
      id: 3,
      position: [44.8378, -0.5792] as [number, number], // Bordeaux
      size: "medium" as const,
      popup: {
        title: "Bordeaux",
        content: "Quartier des Chartrons",
      },
    },
    {
      id: 4,
      position: [43.7102, 7.262] as [number, number], // Nice
      size: "medium" as const,
      popup: {
        title: "Nice",
        content: "Promenade des Anglais",
      },
    },
    {
      id: 5,
      position: [43.6047, 1.4442] as [number, number], // Toulouse
      size: "medium" as const,
      popup: {
        title: "Toulouse",
        content: "Place du Capitole",
      },
    },
    {
      id: 6,
      position: [50.6292, 3.0573] as [number, number], // Lille
      size: "medium" as const,
      popup: {
        title: "Lille",
        content: "Vieux-Lille, Rue de la Monnaie",
      },
    },
    {
      id: 7,
      position: [43.2965, 5.3698] as [number, number], // Marseille
      size: "medium" as const,
      popup: {
        title: "Marseille",
        content: "Prado / 8°",
      },
    },
    {
      id: 8,
      position: [47.2184, -1.5536] as [number, number], // Nantes
      size: "medium" as const,
      popup: {
        title: "Nantes",
        content: "Île de Nantes, Hangar à Bananes",
      },
    },
    {
      id: 9,
      position: [48.5734, 7.7521] as [number, number], // Strasbourg
      size: "medium" as const,
      popup: {
        title: "Strasbourg",
        content: "Quartier de l'Orangerie",
      },
    },
  ];

  const handleMarkerClick = (marker: MarkerData) => {
    console.log("Marker clicked:", marker);
  };

  const handleMapClick = (latlng: L.LatLng) => {
    console.log("Map clicked at:", latlng);
  };

  return (
    <div className="relative z-0 w-full p-2.5 md:p-4 min-h-[95vh] h-full">
      {/* <Image
        src="/images/main/map.svg"
        alt="Map View"
        width={1024}
        height={1024}
        className="object-cover object-center -z-10 w-[96%] sm:w-[98%] min-h-[95vh] h-full absolute top-0 left-1/2 -translate-x-1/2 rounded-3xl"
      /> */}

      <AdvancedMap
        center={[46.603354, 1.888334]} // Center of France
        zoom={6.2}
        markers={markers}
        onMarkerClick={handleMarkerClick}
        onMapClick={handleMapClick}
        enableClustering={false}
        enableSearch={false}
        enableControls={false}
        mapLayers={{
          openstreetmap: true,
          satellite: false,
          dark: false,
          traffic: false,
        }}
        style={{
          height: "100%",
          width: "full",
          borderRadius: "1.5rem",
          filter: "saturate(3) contrast(1) brightness(0.85)",
        }}
        className="object-cover object-center w-[96%] sm:w-[98%] min-h-[95vh] h-full absolute top-0 left-1/2 -translate-x-1/2 rounded-3xl"
      />

      <LiquidGlass
        blur={8}
        className="border border-white/30 border-x-white/20 w-full sm:!w-fit max-sm:min-h-[95vh] sm:h-fit backdrop-blur-2xl z-20 lg:ml-4 bg-black/15"
      >
        <div className="p-4 sm:p-6 py-4 h-full w-full flex flex-col sm:!w-[374px] min-h-[95vh]">
          <Container animation="fadeUp" delay={0.2}>
            <div className="mb-6">
              <h1 className="text-white text-2xl">
                Trouvez votre agence DRIVE
              </h1>
              <p className="text-white/70 text-base font-medium">
                12 emplacements premium, un réseau qui grandit chaque mois.
              </p>
            </div>
          </Container>

          <Container animation="fadeUp" delay={0.3}>
            <div className="relative mb-5">
              <div className="relative">
                <LiquidGlass
                  // blur={5}
                  // contrast={1.2}
                  className="border border-white/50 border-x-0 relative"
                >
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/60 h-5 w-5" />
                  <input
                    type="text"
                    placeholder="Rechercher"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="h-[39px] outline-none w-full pl-10 pr-4"
                  />
                </LiquidGlass>
              </div>
            </div>
          </Container>

          <Container animation="fadeUp" delay={0.4}>
            <div className="flex-1 overflow-y-auto">
              <div className="space-y-0">
                {filteredLocations.map((location, index) => (
                  <Container
                    key={index}
                    animation="fadeRight"
                    delay={0.5 + index * 0.5}
                  >
                    <div className="!border-b border-white/30 py-2 cursor-pointer transition-colors duration-200 group">
                      <div className="text-white text-lg">{location.city}</div>
                      <div className="text-white/70 text-base font-medium">
                        {location.district}
                      </div>
                    </div>
                  </Container>
                ))}
              </div>
            </div>
          </Container>
        </div>
      </LiquidGlass>
    </div>
  );
};

export default FindDriveAgency;
