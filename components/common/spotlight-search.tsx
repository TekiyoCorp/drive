import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { SEARCH_DATA } from "@/constants/search-data";
import { cn } from "@/lib/utils";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import LiquidGlass from "./liquid-glass";

interface SpotlightSearchProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

const SpotlightSearch = ({ open, setOpen }: SpotlightSearchProps) => {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredItems = useMemo(() => {
    if (!searchQuery.trim()) {
      return [];
    }

    return SEARCH_DATA.filter((item) => {
      const searchTerm = searchQuery.toLowerCase();
      return item.title.toLowerCase().includes(searchTerm);
    });
  }, [searchQuery]);

  const groupedItems = useMemo(() => {
    const vehicles = filteredItems.filter((item) => item.type === "vehicle");
    const pages = filteredItems.filter((item) => item.type === "page");
    return { vehicles, pages };
  }, [filteredItems]);

  return (
    <CommandDialog
      open={open}
      onOpenChange={setOpen}
      className="!bg-transparent !border-0 md:min-w-xl *:text-white"
      showCloseButton={false}
    >
      <LiquidGlass
        blur={2}
        className={cn(
          "border border-white/30 border-x-white/20 w-full max-sm:h-full backdrop-blur-2xl flex flex-col",
          searchQuery && "pt-2 pb-3"
        )}
      >
        <div className="w-full text-white">
          <CommandInput
            placeholder="Rechercher"
            value={searchQuery}
            onValueChange={setSearchQuery}
          />
          <CommandList>
            {filteredItems.length === 0 && searchQuery && (
              <CommandEmpty>Aucun résultat trouvé.</CommandEmpty>
            )}

            {/* Vehicles Group */}
            {groupedItems.vehicles.length > 0 && (
              <CommandGroup className={searchQuery && "border-t pt-3 mt-2"}>
                {groupedItems.vehicles.map((item) => (
                  <CommandItem
                    key={item.id}
                    onSelect={() => setOpen(false)}
                    className="flex items-center gap-3 px-2 !py-1.5 cursor-pointer rounded-xl"
                    asChild
                  >
                    <Link href={item.href}>
                      {item.img && (
                        <Image
                          src={item.img}
                          alt={item.title}
                          width={39}
                          height={39}
                          className="w-10 aspect-square object-cover rounded-lg"
                        />
                      )}
                      <div className="flex flex-col flex-1">
                        <span className="font-medium text-base text-ellipsis text-white">
                          {item.title}
                        </span>
                        <span className="text-xs text-white/70">
                          {item.subtitle}
                        </span>
                      </div>
                    </Link>
                  </CommandItem>
                ))}
              </CommandGroup>
            )}

            {/* Pages Group */}
            {groupedItems.pages.length > 0 && (
              <CommandGroup className={searchQuery && "mt-1"}>
                {groupedItems.pages.map((item) => (
                  <CommandItem
                    key={item.id}
                    onSelect={() => setOpen(false)}
                    className="flex items-center gap-3 px-2 !py-1.5 cursor-pointer rounded-xl"
                    asChild
                  >
                    <Link href={item.href} className="flex items-center w-full">
                      <div className="w-10 aspect-square flex items-center justify-center rounded-lg bg-transparent">
                        <ArrowRight className="size-6 text-white" />
                      </div>
                      <div className="flex flex-col flex-1">
                        <span className="font-medium text-base text-white text-ellipsis">
                          {item.title}
                        </span>
                        <span className="text-xs text-white/70">
                          {item.subtitle}
                        </span>
                      </div>
                    </Link>
                  </CommandItem>
                ))}
              </CommandGroup>
            )}
          </CommandList>
        </div>
      </LiquidGlass>
    </CommandDialog>
  );
};

export default SpotlightSearch;
