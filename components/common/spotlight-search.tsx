import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { OUR_CATALOGUES } from "@/constants/catalogues";
import { getResponsiveElasticity, useScreenSize } from "@/lib/liquidGlassUtils";
import { LiquidGlass } from "@liquidglass/react";
import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";

interface SpotlightSearchProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

const SpotlightSearch = ({ open, setOpen }: SpotlightSearchProps) => {
  const screenSize = useScreenSize();
  const elasticity = getResponsiveElasticity(screenSize, 0.8);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredCars = useMemo(() => {
    if (!searchQuery.trim()) {
      return OUR_CATALOGUES;
    }

    return OUR_CATALOGUES.filter((car) => {
      const searchTerm = searchQuery.toLowerCase();
      return car.title.toLowerCase().includes(searchTerm);
    });
  }, [searchQuery]);

  const handleCarSelect = () => {
    setOpen(false);
  };

  return (
    <CommandDialog
      open={open}
      onOpenChange={setOpen}
      className="!bg-transparent !border-0 md:min-w-xl"
      showCloseButton={false}
    >
      <LiquidGlass
        borderRadius={24}
        blur={8}
        contrast={1.1}
        brightness={1.8}
        saturation={1.2}
        shadowIntensity={0}
        displacementScale={0.7}
        elasticity={elasticity}
        className="border border-white/30 border-x-white/20 w-full max-sm:h-full backdrop-blur-2xl flex flex-col pb-1"
      >
        <div className="w-full">
          <CommandInput
            placeholder="Search for cars by brand..."
            value={searchQuery}
            onValueChange={setSearchQuery}
          />
          <CommandList className="min-h-96">
            <CommandEmpty>No cars found matching your search.</CommandEmpty>
            <CommandGroup
              heading={searchQuery ? "Search Results" : "Featured Cars"}
            >
              {filteredCars.map((car) => (
                <CommandItem
                  key={car.id}
                  onSelect={handleCarSelect}
                  className="flex items-center gap-3 p-3 cursor-pointer"
                  asChild
                >
                  <Link href={`/catalogue/${car.id}`}>
                    <Image
                      src={car.img}
                      alt={`${car.title} ${car.subtitle}`}
                      width={500}
                      height={500}
                      className="w-12 aspect-square object-cover rounded-lg"
                    />
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <span className="font-medium text-ellipsis">
                          {car.title}
                        </span>
                        <span className="text-sm text-white/60">
                          {car.subtitle}
                        </span>
                      </div>
                      <div className="flex items-center gap-3 md:gap-4 text-xs text-white/60 mt-1">
                        <span>{car.year}</span>
                        <span>{car.km}</span>
                        <span>{car.fuel}</span>
                        <span>{car.trans}</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="font-medium text-primary">
                        {car.price}
                      </span>
                    </div>
                  </Link>
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </div>
      </LiquidGlass>
    </CommandDialog>
  );
};

export default SpotlightSearch;
