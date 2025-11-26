'use client';

import CatalogueCard from "@/components/catalogue/catalogue-card";
import CatalogueFilter from "@/components/catalogue/catalogue-filter";
import Wrapper from "@/components/global/wrapper";
import { OUR_CATALOGUES } from "@/constants/catalogues";
import { Vehicle } from "@/lib/strapi";
import { useCallback, useMemo, useState } from "react";
import { CatalogueCardData } from "./catalogue-card";
import {
  CatalogueFilterOptionsSummary,
  CatalogueFiltersState,
  CatalogueRangeField,
  CatalogueSelectField,
  CatalogueRangeValue,
  buildInfinitiaFilterPayload,
  cloneFiltersState,
  createDefaultFiltersState,
  hasActiveFilters,
} from "./filter-config";

interface CatalogueContentProps {
  vehicles: (Vehicle | CatalogueCardData)[];
  error?: string | null;
  agencyIds: number[];
}

type NormalizedVehicle = {
  price: number | null;
  km: number | null;
  year: number | null;
  brand: string | null;
  brandKey: string | null;
  energy: string | null;
  energyKey: string | null;
  transmission: string | null;
  transmissionKey: string | null;
};

type VehicleWithMeta = {
  original: Vehicle | CatalogueCardData;
  normalized: NormalizedVehicle;
};

const isVehicleEntity = (vehicle: Vehicle | CatalogueCardData): vehicle is Vehicle => {
  return "attributes" in vehicle;
};

const parseNumericValue = (value?: string | number | null): number | null => {
  if (value === null || value === undefined) {
    return null;
  }

  if (typeof value === "number") {
    return Number.isFinite(value) ? value : null;
  }

  if (typeof value === "string") {
    const digitsOnly = value.replace(/[^\d]/g, "");
    if (!digitsOnly) {
      return null;
    }
    const parsed = Number(digitsOnly);
    return Number.isNaN(parsed) ? null : parsed;
  }

  return null;
};

const parseYearValue = (value?: string | number | null): number | null => {
  if (value === null || value === undefined) {
    return null;
  }

  if (typeof value === "number") {
    return Number.isFinite(value) ? value : null;
  }

  if (typeof value === "string") {
    const match = value.match(/\d{4}/);
    if (!match) {
      return null;
    }
    const parsed = Number(match[0]);
    return Number.isNaN(parsed) ? null : parsed;
  }

  return null;
};

const normalizeTextValue = (value?: string | null): { label: string | null; key: string | null } => {
  if (!value) {
    return { label: null, key: null };
  }
  const trimmed = value.toString().trim();
  if (!trimmed) {
    return { label: null, key: null };
  }
  return { label: trimmed, key: trimmed.toLowerCase() };
};

const normalizeVehicleData = (vehicle: Vehicle | CatalogueCardData): NormalizedVehicle => {
  if (isVehicleEntity(vehicle)) {
    const attrs = vehicle.attributes;
    const brand = normalizeTextValue(attrs.title);
    const energy = normalizeTextValue(attrs.fuel);
    const transmission = normalizeTextValue(attrs.trans);

    return {
      price: parseNumericValue(attrs.price),
      km: parseNumericValue(attrs.km),
      year: parseYearValue(attrs.year),
      brand: brand.label,
      brandKey: brand.key,
      energy: energy.label,
      energyKey: energy.key,
      transmission: transmission.label,
      transmissionKey: transmission.key,
    };
  }

  const brand = normalizeTextValue(vehicle.title);
  const energy = normalizeTextValue(vehicle.fuel);
  const transmission = normalizeTextValue(vehicle.trans);

  return {
    price: parseNumericValue(vehicle.price),
    km: parseNumericValue(vehicle.km),
    year: parseYearValue(vehicle.year),
    brand: brand.label,
    brandKey: brand.key,
    energy: energy.label,
    energyKey: energy.key,
    transmission: transmission.label,
    transmissionKey: transmission.key,
  };
};

const toComparableValue = (value: string | null): string | null => {
  if (!value) {
    return null;
  }
  const trimmed = value.trim();
  return trimmed ? trimmed.toLowerCase() : null;
};

const doesVehicleMatchFilters = (vehicle: NormalizedVehicle, filters: CatalogueFiltersState) => {
  const brandFilter = toComparableValue(filters.brand);
  if (brandFilter && vehicle.brandKey !== brandFilter) {
    return false;
  }

  const energyFilter = toComparableValue(filters.energy);
  if (energyFilter && vehicle.energyKey !== energyFilter) {
    return false;
  }

  const transmissionFilter = toComparableValue(filters.transmission);
  if (transmissionFilter && vehicle.transmissionKey !== transmissionFilter) {
    return false;
  }

  if (filters.price.min !== null) {
    if (vehicle.price === null || vehicle.price < filters.price.min) {
      return false;
    }
  }

  if (filters.price.max !== null) {
    if (vehicle.price === null || vehicle.price > filters.price.max) {
      return false;
    }
  }

  if (filters.year.min !== null) {
    if (vehicle.year === null || vehicle.year < filters.year.min) {
      return false;
    }
  }

  if (filters.year.max !== null) {
    if (vehicle.year === null || vehicle.year > filters.year.max) {
      return false;
    }
  }

  if (filters.km.min !== null) {
    if (vehicle.km === null || vehicle.km < filters.km.min) {
      return false;
    }
  }

  if (filters.km.max !== null) {
    if (vehicle.km === null || vehicle.km > filters.km.max) {
      return false;
    }
  }

  return true;
};

const buildFilterOptions = (vehicles: NormalizedVehicle[]): CatalogueFilterOptionsSummary => {
  const brandMap = new Map<string, string>();
  const energyMap = new Map<string, string>();
  const transmissionMap = new Map<string, string>();

  let minPrice = Number.POSITIVE_INFINITY;
  let maxPrice = Number.NEGATIVE_INFINITY;
  let minYear = Number.POSITIVE_INFINITY;
  let maxYear = Number.NEGATIVE_INFINITY;
  let minKm = Number.POSITIVE_INFINITY;
  let maxKm = Number.NEGATIVE_INFINITY;

  vehicles.forEach(vehicle => {
    if (vehicle.brandKey && vehicle.brand && !brandMap.has(vehicle.brandKey)) {
      brandMap.set(vehicle.brandKey, vehicle.brand);
    }

    if (vehicle.energyKey && vehicle.energy && !energyMap.has(vehicle.energyKey)) {
      energyMap.set(vehicle.energyKey, vehicle.energy);
    }

    if (vehicle.transmissionKey && vehicle.transmission && !transmissionMap.has(vehicle.transmissionKey)) {
      transmissionMap.set(vehicle.transmissionKey, vehicle.transmission);
    }

    if (vehicle.price !== null) {
      minPrice = Math.min(minPrice, vehicle.price);
      maxPrice = Math.max(maxPrice, vehicle.price);
    }

    if (vehicle.year !== null) {
      minYear = Math.min(minYear, vehicle.year);
      maxYear = Math.max(maxYear, vehicle.year);
    }

    if (vehicle.km !== null) {
      minKm = Math.min(minKm, vehicle.km);
      maxKm = Math.max(maxKm, vehicle.km);
    }
  });

  const finalizeRange = (min: number, max: number): CatalogueRangeValue => ({
    min: Number.isFinite(min) ? min : null,
    max: Number.isFinite(max) ? max : null,
  });

  const sortValues = (values: string[]) =>
    values.sort((a, b) => a.localeCompare(b, "fr", { sensitivity: "base" }));

  return {
    brands: sortValues(Array.from(brandMap.values())),
    energies: sortValues(Array.from(energyMap.values())),
    transmissions: sortValues(Array.from(transmissionMap.values())),
    priceRange: finalizeRange(minPrice, maxPrice),
    yearRange: finalizeRange(minYear, maxYear),
    kmRange: finalizeRange(minKm, maxKm),
  };
};

const CatalogueContent = ({ vehicles, error, agencyIds }: CatalogueContentProps) => {
  const displayVehicles = vehicles && vehicles.length > 0 ? vehicles : OUR_CATALOGUES;
  const [appliedFilters, setAppliedFilters] = useState<CatalogueFiltersState>(() => createDefaultFiltersState());
  const [draftFilters, setDraftFilters] = useState<CatalogueFiltersState>(() => createDefaultFiltersState());
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const [remoteVehicles, setRemoteVehicles] = useState<CatalogueCardData[] | null>(null);
  const [isFetchingRemote, setIsFetchingRemote] = useState(false);
  const [remoteError, setRemoteError] = useState<string | null>(null);

  const vehiclesWithMeta = useMemo<VehicleWithMeta[]>(
    () =>
      displayVehicles.map(vehicle => ({
        original: vehicle,
        normalized: normalizeVehicleData(vehicle),
      })),
    [displayVehicles]
  );

  const filterOptions = useMemo(
    () => buildFilterOptions(vehiclesWithMeta.map(item => item.normalized)),
    [vehiclesWithMeta]
  );

  const shouldFilterLocally = hasActiveFilters(appliedFilters);

  const locallyFilteredVehicles = useMemo(() => {
    if (!shouldFilterLocally) {
      return displayVehicles;
    }

    return vehiclesWithMeta
      .filter(item => doesVehicleMatchFilters(item.normalized, appliedFilters))
      .map(item => item.original);
  }, [displayVehicles, vehiclesWithMeta, appliedFilters, shouldFilterLocally]);

  const vehiclesToDisplay: (Vehicle | CatalogueCardData)[] = remoteVehicles ?? locallyFilteredVehicles;

  const handleOpenPanel = () => {
    setDraftFilters(cloneFiltersState(appliedFilters));
    setIsPanelOpen(true);
  };

  const handleCancelPanel = () => {
    setDraftFilters(cloneFiltersState(appliedFilters));
    setIsPanelOpen(false);
  };

  const handleSelectOption = (field: CatalogueSelectField, value: string | null) => {
    setDraftFilters(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleRangeChange = (field: CatalogueRangeField, boundary: "min" | "max", value: number | null) => {
    setDraftFilters(prev => ({
      ...prev,
      [field]: {
        ...prev[field],
        [boundary]: value,
      },
    }));
  };

  const fetchRemoteVehicles = useCallback(
    async (filtersState: CatalogueFiltersState) => {
      if (!hasActiveFilters(filtersState)) {
        setRemoteVehicles(null);
        setRemoteError(null);
        return;
      }

      const payload = buildInfinitiaFilterPayload(filtersState);
      if (payload.length === 0) {
        setRemoteVehicles(null);
        setRemoteError(null);
        return;
      }

      setIsFetchingRemote(true);
      setRemoteError(null);

      try {
        const response = await fetch("/api/catalogue/vehicles", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            filters: payload,
            agencyIds,
          }),
        });

        if (!response.ok) {
          throw new Error(`Request failed with status ${response.status}`);
        }

        const data = await response.json();
        const vehiclesFromApi: CatalogueCardData[] = Array.isArray(data.vehicles) ? data.vehicles : [];

        setRemoteVehicles(vehiclesFromApi);

        if (vehiclesFromApi.length === 0) {
          setRemoteError("Aucun véhicule ne correspond à ces filtres.");
        }
      } catch (error) {
        console.error("Failed to fetch filtered vehicles", error);
        setRemoteVehicles(null);
        setRemoteError("Impossible de récupérer les véhicules filtrés.");
      } finally {
        setIsFetchingRemote(false);
      }
    },
    [agencyIds]
  );

  const handleValidateFilters = () => {
    const nextAppliedFilters = cloneFiltersState(draftFilters);
    setAppliedFilters(nextAppliedFilters);
    setIsPanelOpen(false);
    void fetchRemoteVehicles(nextAppliedFilters);
  };

  const handleResetDraftFilters = () => {
    setDraftFilters(createDefaultFiltersState());
  };

  const handleResetAllFilters = () => {
    const defaults = createDefaultFiltersState();
    setAppliedFilters(defaults);
    setDraftFilters(defaults);
    setRemoteVehicles(null);
    setRemoteError(null);
    setIsPanelOpen(false);
  };

  const hasNoResults =
    !isFetchingRemote &&
    vehiclesToDisplay.length === 0 &&
    (remoteVehicles !== null || shouldFilterLocally);

  return (
    <Wrapper className="pt-24 md:pt-32 w-full px-2.5 md:px-8 lg:px-24 flex flex-col gap-4 md:gap-8">
      <CatalogueFilter
        appliedFilters={appliedFilters}
        draftFilters={draftFilters}
        isPanelOpen={isPanelOpen}
        options={filterOptions}
        onOpenPanel={handleOpenPanel}
        onCancelPanel={handleCancelPanel}
        onValidateFilters={handleValidateFilters}
        onSelectOption={handleSelectOption}
        onRangeChange={handleRangeChange}
        onResetDraftFilters={handleResetDraftFilters}
      />

      {error && (
        <div className="text-yellow-500 text-sm mb-2">
          {error}
        </div>
      )}

      {remoteError && (
        <div className="text-red-400 text-sm mb-2">
          {remoteError}
        </div>
      )}

      {isFetchingRemote && (
        <div className="text-white/70 text-sm mb-2 animate-pulse">
          Recherche des véhicules disponibles...
        </div>
      )}

      {hasNoResults && (
        <div className="border border-white/20 rounded-3xl p-6 text-white bg-white/5">
          <p className="text-base font-medium mb-2">Aucun véhicule ne correspond à vos filtres.</p>
          <button
            type="button"
            onClick={handleResetAllFilters}
            className="text-sm underline underline-offset-4 text-white/70 hover:text-white transition-colors"
          >
            Réinitialiser les filtres
          </button>
        </div>
      )}

      <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-6">
        {vehiclesToDisplay.map((vehicle, idx) => (
          <CatalogueCard
            key={vehicle.id || idx}
            data={vehicle}
            animation="fadeUp"
            delay={0.3 + idx * 0.5}
            priority={idx === 0}
            className="snap-start max-w-full md:h-[500px] md:rounded-4xl"
          />
        ))}
      </div>
    </Wrapper>
  );
};

export default CatalogueContent;

