"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "../ui/input";

const CarFilters = () => {
  const brands = [
    "BMW",
    "Mercedes-Benz",
    "Audi",
    "Volkswagen",
    "Peugeot",
    "Renault",
    "Citroën",
    "Toyota",
    "Honda",
    "Nissan",
  ];

  const models = [
    "Série 1",
    "Série 2",
    "Série 3",
    "Série 4",
    "Série 5",
    "Série 6",
    "Série 7",
    "X1",
    "X2",
    "X3",
    "X4",
    "X5",
    "X6",
    "X7",
  ];

  const years = Array.from({ length: 25 }, (_, i) => 2024 - i);

  const kilometers = [
    "0 - 10,000 km",
    "10,000 - 25,000 km",
    "25,000 - 50,000 km",
    "50,000 - 75,000 km",
    "75,000 - 100,000 km",
    "100,000 - 150,000 km",
    "150,000+ km",
  ];

  return (
    <div className="flex lg:flex-row flex-col lg:items-center gap-0 bg-transparent rounded-full py-4 px-6 min-w-[335px] w-full lg:py-0.5">
      <Select>
        <SelectTrigger className="min-w-[160px] !text-sm flex items-center justify-start lg:justify-center !outline-none !bg-transparent border-none text-white  focus:!ring-0 max-lg:p-0 rounded-none h-12 lg:pr-4 [&>svg]:text-white/70 cursor-pointer">
          <SelectValue placeholder="Marque" />
        </SelectTrigger>
        <SelectContent className="bg-[#1c1c1c] !text-sm border-white/20 text-white">
          {brands.map((brand) => (
            <SelectItem key={brand} value={brand}>
              {brand}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <div className="w-full h-px lg:w-px lg:h-3 bg-white/40 max-lg:my-3 max-lg:mt-2" />

      <Select>
        <SelectTrigger className="min-w-[160px] !text-sm flex items-center justify-start lg:justify-center !outline-none !bg-transparent border-none text-white  focus:!ring-0 max-lg:p-0 rounded-none h-12 lg:pr-4 [&>svg]:text-white/70 cursor-pointer">
          <SelectValue placeholder="Modèle" />
        </SelectTrigger>
        <SelectContent className="bg-[#1c1c1c] !text-sm border-white/20 text-white">
          {models.map((model) => (
            <SelectItem key={model} value={model}>
              {model}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <div className="w-full h-px lg:w-px lg:h-3 bg-white/40 max-lg:my-3 max-lg:mt-2" />

      <Select>
        <SelectTrigger className="min-w-[160px] !text-sm flex items-center justify-start lg:justify-center !outline-none !bg-transparent border-none text-white  focus:!ring-0 max-lg:p-0 rounded-none h-12 lg:pr-4 [&>svg]:text-white/70 cursor-pointer">
          <SelectValue placeholder="Année" />
        </SelectTrigger>
        <SelectContent className="bg-[#1c1c1c] !text-sm border-white/20 text-white">
          {years.map((year) => (
            <SelectItem key={year} value={year.toString()}>
              {year}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <div className="w-full h-px lg:w-px lg:h-3 bg-white/40 max-lg:my-3 max-lg:mt-2" />

      <Select>
        <SelectTrigger className="min-w-[160px] !text-sm flex items-center justify-start lg:justify-center !outline-none !bg-transparent border-none text-white  focus:!ring-0 max-lg:p-0 rounded-none h-12 lg:pr-4 [&>svg]:text-white/70 cursor-pointer">
          <SelectValue placeholder="Km" />
        </SelectTrigger>
        <SelectContent className="bg-[#1c1c1c] !text-sm border-white/20 text-white">
          {kilometers.map((km) => (
            <SelectItem key={km} value={km}>
              {km}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <div className="w-full h-px lg:w-px lg:h-3 bg-white/40 max-lg:my-3 max-lg:mt-2" />

      <Input
        type="text"
        placeholder="Immatriculation"
        className="!text-sm !outline-none !bg-transparent border-none text-white placeholder:text-white focus:!ring-0 max-lg:p-0 rounded-none h-12 lg:text-center"
      />
    </div>
  );
};

export default CarFilters;
