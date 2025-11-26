import { NextResponse } from "next/server";

import { getAgencies } from "@/lib/agencies";
import {
  InfinitiaFilterClause,
  fetchInfinitiaVehicles,
  transformInfinitiaVehicleToCatalogueCard,
} from "@/lib/infinitia";

const isValidFilterClause = (clause: unknown): clause is InfinitiaFilterClause => {
  if (!clause || typeof clause !== "object") {
    return false;
  }

  const candidate = clause as Record<string, unknown>;
  return (
    typeof candidate.field === "string" &&
    (candidate.operator === "eq" || candidate.operator === "gte" || candidate.operator === "lte") &&
    (typeof candidate.value === "string" || typeof candidate.value === "number")
  );
};

export async function POST(request: Request) {
  try {
    const body = await request.json().catch(() => ({}));

    const incomingFilters = Array.isArray(body?.filters) ? body.filters : [];
    const filters = incomingFilters.filter(isValidFilterClause);

    const providedAgencyIds = Array.isArray(body?.agencyIds) ? body.agencyIds : [];
    let agencyIds = providedAgencyIds.filter((id: unknown): id is number =>
      typeof id === "number" && Number.isFinite(id)
    );

    if (agencyIds.length === 0) {
      const agencies = await getAgencies();
      agencyIds = agencies
        .map((agency) => agency.id)
        .filter((id): id is number => typeof id === "number" && Number.isFinite(id));
    }

    if (agencyIds.length === 0) {
      return NextResponse.json({ vehicles: [] });
    }

    const responses = await Promise.all(
      agencyIds.map(async (agencyId: number) => {
        try {
          const result = await fetchInfinitiaVehicles(agencyId, {
            filters,
            page: 1,
            pageSize: 200,
          });
          return result.items.map(transformInfinitiaVehicleToCatalogueCard);
        } catch (error) {
          console.error(`Failed to fetch filtered vehicles for agency ${agencyId}`, error);
          return [];
        }
      })
    );

    const vehicles = responses.flat();

    return NextResponse.json({ vehicles });
  } catch (error) {
    console.error("Failed to handle filtered vehicles request", error);
    return NextResponse.json(
      { error: "Impossible de récupérer les véhicules filtrés." },
      { status: 500 }
    );
  }
}

