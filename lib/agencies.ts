"use server";

import { FRANCHISE } from "@/constants/franchise";
import type { AgencySummary, AgencyTeamMember } from "@/types/agency";

const DEFAULT_AGENCY_IMAGE = "/images/franchise/franchise1.png";
const DEFAULT_TEAM_IMAGE = "/images/franchise/team-member.jpg";
const DEFAULT_PHONE = "Contactez-nous";
const DEFAULT_COUNTRY = "France";
const DEFAULT_SERVICE_AREA = "votre région";

const STRAPI_BASE_URL =
  process.env.NEXT_PUBLIC_STRAPI_URL || "http://localhost:1337";
const STRAPI_TOKEN =
  process.env.STRAPI_API_TOKEN || process.env.NEXT_PUBLIC_STRAPI_API_TOKEN;

interface StrapiTeamMember {
  id: number;
  name: string;
  work?: string | null;
}

interface StrapiAgency {
  id: number;
  externalId?: number;
  name?: string;
  address?: string | null;
  postalCode?: string | null;
  country?: string | null;
  phone?: string | null;
  email?: string | null;
  team?: StrapiTeamMember[] | null;
  // Support both Strapi v4 and v5 formats
  attributes?: {
    externalId: number;
    name: string;
    address?: string | null;
    postalCode?: string | null;
    country?: string | null;
    phone?: string | null;
    email?: string | null;
    team?: StrapiTeamMember[] | null;
  };
}

function buildAddress(
  address?: string | null,
  postalCode?: string | null,
  country?: string | null
): string {
  const parts = [address, postalCode, country].filter(Boolean);
  if (parts.length === 0) {
    return "Adresse à venir";
  }
  return parts.join(", ");
}

function extractCity(address?: string | null): string {
  if (!address) return "Votre ville";
  const segments = address.split(",").map((segment) => segment.trim());
  return segments.pop() || segments.shift() || "Votre ville";
}

function normalizeTeam(
  team: StrapiTeamMember[] | null | undefined
): AgencyTeamMember[] {
  if (!team || team.length === 0) {
    return [];
  }

  return team.map((member: StrapiTeamMember) => ({
    id: member.id,
    name: member.name || "Membre DRIVE",
    role: member.work || "Conseiller DRIVE",
    imageUrl: DEFAULT_TEAM_IMAGE,
  }));
}

function normalizeAgency(agency: StrapiAgency | Record<string, unknown>): AgencySummary {
  // Defensive check for missing or malformed agency data
  if (!agency || typeof agency !== 'object') {
    console.warn('Invalid agency data:', agency);
    throw new Error('Invalid agency structure');
  }

  // Handle both Strapi v4 (with attributes) and v5 (flat) formats
  const attrs = agency.attributes || agency;
  
  if (!attrs || typeof attrs !== 'object') {
    console.warn('Invalid agency attributes:', agency);
    throw new Error('Invalid agency attributes structure');
  }

  const displayAddress = buildAddress(
    attrs.address,
    attrs.postalCode,
    attrs.country
  );

  const team = (attrs as { team?: unknown[] }).team || [];

  return {
    id: attrs.externalId,
    name: attrs.name || `Agence DRIVE #${attrs.externalId}`,
    displayAddress,
    city: extractCity(attrs.address),
    phone: attrs.phone || DEFAULT_PHONE,
    email: attrs.email || undefined,
    imageUrl: DEFAULT_AGENCY_IMAGE,
    country: attrs.country || DEFAULT_COUNTRY,
    team: normalizeTeam(team),
    location: undefined,
  };
}

async function fetchStrapi<T>(path: string, revalidateSeconds = 900): Promise<T> {
  const url = `${STRAPI_BASE_URL.replace(/\/$/, "")}/api${path}`;

  const headers: HeadersInit = {
    "Content-Type": "application/json",
  };

  if (STRAPI_TOKEN) {
    headers["Authorization"] = `Bearer ${STRAPI_TOKEN}`;
  }

  const response = await fetch(url, {
    headers,
    next: { revalidate: revalidateSeconds },
  });

  if (!response.ok) {
    throw new Error(`Strapi request failed: ${response.status} ${response.statusText}`);
  }

  return response.json();
}

function fallbackAgencies(): AgencySummary[] {
  return FRANCHISE.map((agency) => ({
    id: agency.id,
    name: agency.name,
    displayAddress: agency.address,
    city: extractCity(agency.address),
    phone: agency.phone,
    email: undefined,
    imageUrl: agency.img || DEFAULT_AGENCY_IMAGE,
    country: DEFAULT_COUNTRY,
    team: [],
    location: undefined,
  }));
}

export async function getAgencies(): Promise<AgencySummary[]> {
  try {
    const query = new URLSearchParams({
      "pagination[pageSize]": "100",
      "sort[0]": "externalId:asc",
    });

    const result = await fetchStrapi<{ data?: StrapiAgency[] }>(
      `/agencies?${query.toString()}`
    );

    const agencies = result.data || [];

    if (agencies.length === 0) {
      return fallbackAgencies();
    }

    // Filter and normalize agencies, skipping any that fail to normalize
    const normalizedAgencies: AgencySummary[] = [];
    for (const agency of agencies) {
      try {
        const normalized = normalizeAgency(agency);
        normalizedAgencies.push(normalized);
      } catch (error) {
        console.warn("Failed to normalize agency, skipping:", agency, error);
        // Continue with next agency
      }
    }

    // If no agencies could be normalized, fall back to static data
    if (normalizedAgencies.length === 0) {
      console.warn("No agencies could be normalized, using fallback data");
      return fallbackAgencies();
    }

    return normalizedAgencies;
  } catch (error) {
    console.error("Failed to fetch agencies from Strapi, using fallback data:", error);
    return fallbackAgencies();
  }
}

export async function getAgencyById(id: number): Promise<AgencySummary | null> {
  if (!Number.isFinite(id)) {
    return null;
  }

  try {
    // Query by externalId field instead of Strapi's internal ID
    const query = new URLSearchParams({
      "filters[externalId][$eq]": id.toString(),
    });

    const result = await fetchStrapi<{ data?: StrapiAgency[] }>(
      `/agencies?${query.toString()}`,
      300
    );

    // Get the first matching agency
    const agency = result.data?.[0];

    if (!agency) {
      return fallbackAgencies().find((agency) => agency.id === id) || null;
    }

    try {
      return normalizeAgency(agency);
    } catch (normalizeError) {
      console.warn(`Failed to normalize agency ${id}:`, normalizeError);
      // Try fallback
      return fallbackAgencies().find((agency) => agency.id === id) || null;
    }
  } catch (error) {
    console.error(`Failed to fetch agency ${id} from Strapi:`, error);
    return fallbackAgencies().find((agency) => agency.id === id) || null;
  }
}

export async function getAgencyTextFallbacks() {
  return {
    serviceArea: DEFAULT_SERVICE_AREA,
    openingDays: "du lundi au samedi",
    openingHours: "9h00 - 18h30",
    phone: DEFAULT_PHONE,
    email: "contact@drive.fr",
  };
}

