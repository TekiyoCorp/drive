export interface AgencyTeamMember {
  id: number;
  name: string;
  role: string;
  imageUrl: string;
}

export interface AgencySummary {
  id: number;
  name: string;
  displayAddress: string;
  city: string;
  phone: string;
  email?: string;
  imageUrl: string;
  country: string;
  team: AgencyTeamMember[];
  location?: {
    latitude: number | null;
    longitude: number | null;
  };
}

