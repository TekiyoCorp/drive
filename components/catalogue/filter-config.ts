import type { InfinitiaFilterClause } from "@/lib/infinitia";

export type CatalogueSelectField = "brand" | "energy" | "transmission" | "location";

export type CatalogueRangeField = "price" | "year" | "km";

export interface CatalogueRangeValue {
  min: number | null;
  max: number | null;
}

export interface CatalogueFiltersState {
  brand: string | null;
  energy: string | null;
  transmission: string | null;
  location: string | null;
  price: CatalogueRangeValue;
  year: CatalogueRangeValue;
  km: CatalogueRangeValue;
}

export const createDefaultFiltersState = (): CatalogueFiltersState => ({
  brand: null,
  energy: null,
  transmission: null,
  location: null,
  price: { min: null, max: null },
  year: { min: null, max: null },
  km: { min: null, max: null },
});

export const cloneFiltersState = (filters: CatalogueFiltersState): CatalogueFiltersState => ({
  ...filters,
  price: { ...filters.price },
  year: { ...filters.year },
  km: { ...filters.km },
});

export const hasActiveFilters = (filters: CatalogueFiltersState): boolean => {
  return Boolean(
    filters.brand ||
      filters.energy ||
      filters.transmission ||
      filters.location ||
      filters.price.min !== null ||
      filters.price.max !== null ||
      filters.year.min !== null ||
      filters.year.max !== null ||
      filters.km.min !== null ||
      filters.km.max !== null
  );
};

export const buildInfinitiaFilterPayload = (filters: CatalogueFiltersState): InfinitiaFilterClause[] => {
  const payload: InfinitiaFilterClause[] = [];

  if (filters.brand) {
    payload.push({ field: "brand", operator: "eq", value: filters.brand });
  }

  if (filters.energy) {
    payload.push({ field: "energy", operator: "eq", value: filters.energy });
  }

  if (filters.transmission) {
    payload.push({ field: "transmission", operator: "eq", value: filters.transmission });
  }

  if (filters.location) {
    payload.push({ field: "location", operator: "eq", value: filters.location });
  }

  if (filters.price.min !== null) {
    payload.push({ field: "price", operator: "gte", value: filters.price.min });
  }

  if (filters.price.max !== null) {
    payload.push({ field: "price", operator: "lte", value: filters.price.max });
  }

  if (filters.year.min !== null) {
    payload.push({ field: "year", operator: "gte", value: filters.year.min });
  }

  if (filters.year.max !== null) {
    payload.push({ field: "year", operator: "lte", value: filters.year.max });
  }

  if (filters.km.min !== null) {
    payload.push({ field: "km", operator: "gte", value: filters.km.min });
  }

  if (filters.km.max !== null) {
    payload.push({ field: "km", operator: "lte", value: filters.km.max });
  }

  return payload;
};

export interface CatalogueFilterOptionsSummary {
  brands: string[];
  energies: string[];
  transmissions: string[];
  locations: string[];
  priceRange: CatalogueRangeValue;
  yearRange: CatalogueRangeValue;
  kmRange: CatalogueRangeValue;
}

