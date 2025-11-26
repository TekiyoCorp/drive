export interface InfinitiaOwner {
  id: number;
  email: string;
  roles: string[];
  firstName?: string;
}

export interface InfinitiaCarMedia {
  id: number;
  name: string;
  type: number;
  isCover: boolean;
  url: string;
  createdAt: string;
  updatedAt: string;
}

export interface InfinitiaCarEquipment {
  id: number;
  name: string;
}

export interface InfinitiaBusiness {
  id: number;
  name: string;
}

// Keep the shape permissive for the large nested `data` object
export interface InfinitiaVehicle {
  id: number;
  owner: InfinitiaOwner;
  plate: string;
  brand: string;
  model: string;
  color?: string | null;
  km?: number | null;
  price?: number | null;
  energy?: string | null;
  transmission?: string | null;
  status?: string | null;
  data?: Record<string, unknown> | null;
  year?: number | null;
  comment?: string | null;
  soldBy?: string | null;
  soldAt?: string | null;
  carEquipements?: InfinitiaCarEquipment[];
  carMedias?: InfinitiaCarMedia[];
  createdAt: string;
  updatedAt: string;
  business: InfinitiaBusiness;
}

export interface InfinitiaPagination {
  page: number;
  pageSize: number;
  total: number;
  totalPages: number;
}

export interface InfinitiaFilterClause {
  field: string;
  operator: "eq" | "gte" | "lte";
  value: string | number;
}

export interface InfinitiaVehiclesResponse {
  items: InfinitiaVehicle[];
  pagination: InfinitiaPagination;
}

type NextRevalidate = { next?: { revalidate?: number } };

export interface FetchInfinitiaVehiclesOptions {
  page?: number;
  pageSize?: number;
  signal?: AbortSignal;
  revalidateSeconds?: number;
  filters?: InfinitiaFilterClause[];
}

/**
 * Fetch vehicles for a given agency from Infinitia public API
 * Example endpoint: https://api.infinitia.fr/public/business/{agencyId}/vehicles
 */
export async function fetchInfinitiaVehicles(
  agencyId: number,
  options: FetchInfinitiaVehiclesOptions = {}
): Promise<InfinitiaVehiclesResponse> {
  if (!Number.isFinite(agencyId)) {
    throw new Error("Invalid agencyId provided to fetchInfinitiaVehicles");
  }

  const baseUrl = "https://api.infinitia.fr";
  const params = new URLSearchParams();
  if (options.page) params.set("page", String(options.page));
  if (options.pageSize) params.set("pageSize", String(options.pageSize));
  if (options.filters && options.filters.length > 0) {
    try {
      params.set("filters", JSON.stringify(options.filters));
    } catch (error) {
      console.warn("Failed to serialize Infinitia filters", error);
    }
  }

  const url = `${baseUrl}/public/business/${agencyId}/vehicles${params.toString() ? `?${params.toString()}` : ""}`;

  const init: RequestInit & NextRevalidate = {
    method: "GET",
    headers: {
      "Accept": "application/json",
    },
    signal: options.signal,
  };

  if (typeof window === "undefined" && options.revalidateSeconds) {
    init.next = { revalidate: options.revalidateSeconds };
  }

  const res = await fetch(url, init);
  if (!res.ok) {
    throw new Error(`Infinitia request failed: ${res.status} ${res.statusText}`);
  }

  const data = (await res.json()) as InfinitiaVehiclesResponse;
  if (!data || !Array.isArray(data.items)) {
    throw new Error("Unexpected response format from Infinitia API");
  }

  return data;
}

/**
 * Transform an Infinitia vehicle to the CatalogueCardData format
 */
export function transformInfinitiaVehicleToCatalogueCard(vehicle: InfinitiaVehicle): {
  id: number;
  title: string;
  subtitle: string;
  price: string;
  km: string;
  year: string;
  fuel: string;
  trans: string;
  img: string;
  description?: string;
} {
  // Get cover image or first image
  const coverImage = vehicle.carMedias?.find(media => media.isCover);
  const firstImage = vehicle.carMedias?.[0];
  const imageUrl = coverImage?.url || firstImage?.url || '/images/placeholder-car.jpg';

  // Format price
  const formattedPrice = vehicle.price 
    ? `${vehicle.price.toLocaleString('fr-FR')} €`
    : 'Prix sur demande';

  // Format km
  const formattedKm = vehicle.km 
    ? `${vehicle.km.toLocaleString('fr-FR')} km`
    : 'Kilométrage non renseigné';

  // Format year
  const formattedYear = vehicle.year 
    ? String(vehicle.year)
    : vehicle.data?.debut_modele 
      ? String(vehicle.data.debut_modele).split('-')[0]
      : 'Année non renseignée';

  // Format energy/fuel
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

  // Format transmission
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

  // Build title and subtitle from brand and model
  const title = vehicle.brand || 'Marque non renseignée';
  const subtitle = vehicle.model || 'Modèle non renseigné';

  return {
    id: vehicle.id,
    title,
    subtitle,
    price: formattedPrice,
    km: formattedKm,
    year: formattedYear,
    fuel: formattedFuel,
    trans: formattedTrans,
    img: imageUrl,
    description: vehicle.comment || undefined,
  };
}

/**
 * Fetch vehicles from all agencies and combine them
 * This is useful when there's no global endpoint to list all vehicles
 */
export async function fetchAllInfinitiaVehicles(
  agencyIds: number[],
  options: FetchInfinitiaVehiclesOptions = {}
): Promise<InfinitiaVehicle[]> {
  if (!agencyIds || agencyIds.length === 0) {
    return [];
  }

  // Fetch vehicles from all agencies in parallel
  const promises = agencyIds.map(agencyId =>
    fetchInfinitiaVehicles(agencyId, {
      ...options,
      page: 1,
      pageSize: options.pageSize || 100, // Fetch more per agency to get all vehicles
    }).catch((error) => {
      console.error(`Failed to fetch vehicles for agency ${agencyId}:`, error);
      return { items: [], pagination: { page: 1, pageSize: 0, total: 0, totalPages: 0 } };
    })
  );

  const results = await Promise.all(promises);

  // Combine all vehicles and filter duplicates by ID
  const allVehicles: InfinitiaVehicle[] = [];
  const seenIds = new Set<number>();

  for (const result of results) {
    for (const vehicle of result.items) {
      if (!seenIds.has(vehicle.id)) {
        seenIds.add(vehicle.id);
        allVehicles.push(vehicle);
      }
    }
  }

  return allVehicles;
}

/**
 * Fetch a single vehicle by ID from Infinitia API
 * Since Infinitia doesn't have a direct endpoint for a single vehicle,
 * we search through all agencies to find the vehicle
 */
export async function fetchInfinitiaVehicleById(
  vehicleId: number,
  agencyIds: number[],
  options: Omit<FetchInfinitiaVehiclesOptions, 'page' | 'pageSize'> = {}
): Promise<InfinitiaVehicle | null> {
  if (!Number.isFinite(vehicleId)) {
    throw new Error("Invalid vehicleId provided to fetchInfinitiaVehicleById");
  }

  if (!agencyIds || agencyIds.length === 0) {
    return null;
  }

  // Fetch vehicles from all agencies and find the one with matching ID
  const allVehicles = await fetchAllInfinitiaVehicles(agencyIds, {
    ...options,
    pageSize: 1000, // Fetch a large number to ensure we find the vehicle
  });

  return allVehicles.find(vehicle => vehicle.id === vehicleId) || null;
}
