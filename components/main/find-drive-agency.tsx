"use client";

import Container from "@/components/global/container";
import { LOCATIONS } from "@/constants/locations";
import { Search } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import LiquidGlass from "../common/liquid-glass";

const FindDriveAgency = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredLocations = LOCATIONS.filter(
    (location) =>
      location.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
      location.district.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="relative z-0 w-full p-2.5 md:p-4 min-h-[95vh] h-full">
      {/* <Container animation="scaleUp" delay={0}> */}
      <Image
        src="/images/main/map.svg"
        alt="Map View"
        width={1024}
        height={1024}
        className="object-cover object-center -z-10 w-[96%] sm:w-[98%] min-h-[95vh] h-full absolute top-0 left-1/2 -translate-x-1/2 rounded-3xl"
      />
      {/* </Container> */}

      {/* <Container
        animation="fadeLeft"
        delay={0.1}
        className="flex flex-col items-start z-10 absolute top-0 sm:top-1/2 sm:-translate-y-1/2 left-0 px-2 sm:left-4 !h-full !min-h-[95vh] sm:h-[calc(100vh-12px)] w-full sm:w-fit lg:px-4"
      > */}
      <LiquidGlass className="border border-white/30 border-x-white/20 w-full sm:!w-fit max-sm:min-h-[95vh] sm:h-fit backdrop-blur-2xl z-20 lg:ml-4">
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
                  blur={5}
                  contrast={1.2}
                  className="border border-white/50 border-x-0 backdrop-blur-2xl relative"
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
      {/* </Container> */}
    </div>
  );
};

export default FindDriveAgency;
