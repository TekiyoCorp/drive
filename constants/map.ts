import { MarkerData } from "@/components/ui/interactive-map";

export const MARKERS: MarkerData[] = [
  {
    id: 1,
    position: [48.8566, 2.3522] as [number, number], // Paris
    size: "large" as const,
    popup: {
      title: "Paris",
      content: "8° arrondissement (Champs-Élysées)",
    },
  },
  {
    id: 2,
    position: [45.764, 4.8357] as [number, number], // Lyon
    size: "medium" as const,
    popup: {
      title: "Lyon",
      content: "Presqu'île, Rue de la République",
    },
  },
  {
    id: 3,
    position: [44.8378, -0.5792] as [number, number], // Bordeaux
    size: "medium" as const,
    popup: {
      title: "Bordeaux",
      content: "Quartier des Chartrons",
    },
  },
  {
    id: 4,
    position: [43.7102, 7.262] as [number, number], // Nice
    size: "medium" as const,
    popup: {
      title: "Nice",
      content: "Promenade des Anglais",
    },
  },
  {
    id: 5,
    position: [43.6047, 1.4442] as [number, number], // Toulouse
    size: "medium" as const,
    popup: {
      title: "Toulouse",
      content: "Place du Capitole",
    },
  },
  {
    id: 6,
    position: [50.6292, 3.0573] as [number, number], // Lille
    size: "medium" as const,
    popup: {
      title: "Lille",
      content: "Vieux-Lille, Rue de la Monnaie",
    },
  },
  {
    id: 7,
    position: [43.2965, 5.3698] as [number, number], // Marseille
    size: "medium" as const,
    popup: {
      title: "Marseille",
      content: "Prado / 8°",
    },
  },
  {
    id: 8,
    position: [47.2184, -1.5536] as [number, number], // Nantes
    size: "medium" as const,
    popup: {
      title: "Nantes",
      content: "Île de Nantes, Hangar à Bananes",
    },
  },
  {
    id: 9,
    position: [48.5734, 7.7521] as [number, number], // Strasbourg
    size: "medium" as const,
    popup: {
      title: "Strasbourg",
      content: "Quartier de l'Orangerie",
    },
  },
];
