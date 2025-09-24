import { OUR_CATALOGUES } from "./catalogues";

export interface SearchItem {
  id: string;
  title: string;
  subtitle?: string;
  type: "vehicle" | "page";
  href: string;
  img?: string;
}

const vehicleSearchItems: SearchItem[] = OUR_CATALOGUES.map((car) => ({
  id: `vehicle-${car.id}`,
  title: `${car.title} ${car.subtitle}`.toUpperCase(),
  subtitle: "Véhicule",
  type: "vehicle",
  href: `/catalogue/${car.id}`,
  img: car.img,
}));

const pageSearchItems: SearchItem[] = [
  {
    id: "page-contact",
    title: "Contact",
    subtitle: "Page",
    type: "page",
    href: "/contact",
  },
  {
    id: "page-about",
    title: "À propos de nous",
    subtitle: "Page",
    type: "page",
    href: "/about",
  },
  {
    id: "page-catalogue",
    title: "Catalogue",
    subtitle: "Page",
    type: "page",
    href: "/catalogue",
  },
  {
    id: "page-franchise",
    title: "Franchise",
    subtitle: "Page",
    type: "page",
    href: "/franchise",
  },
  {
    id: "page-open-agency",
    title: "Ouvrir une agence",
    subtitle: "Page",
    type: "page",
    href: "/open-agency",
  },
  {
    id: "page-vendre",
    title: "Vendre ma voiture",
    subtitle: "Page",
    type: "page",
    href: "/vendre",
  },
  {
    id: "page-order",
    title: "Commander",
    subtitle: "Page",
    type: "page",
    href: "/order",
  },
];

export const SEARCH_DATA: SearchItem[] = [
  ...vehicleSearchItems,
  ...pageSearchItems,
];
