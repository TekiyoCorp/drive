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
    ariaLabel: "Paris agency location in 8th arrondissement",
    title: "Paris - Champs-Élysées",
  },
  {
    id: 2,
    position: [45.764, 4.8357] as [number, number], // Lyon
    size: "medium" as const,
    popup: {
      title: "Lyon",
      content: "Presqu'île, Rue de la République",
    },
    ariaLabel: "Lyon agency location in Presqu'île",
    title: "Lyon - Presqu'île",
  },
  {
    id: 3,
    position: [44.8378, -0.5792] as [number, number], // Bordeaux
    size: "medium" as const,
    popup: {
      title: "Bordeaux",
      content: "Quartier des Chartrons",
    },
    ariaLabel: "Bordeaux agency location in Chartrons district",
    title: "Bordeaux - Chartrons",
  },
  {
    id: 4,
    position: [43.7102, 7.262] as [number, number], // Nice
    size: "medium" as const,
    popup: {
      title: "Nice",
      content: "Promenade des Anglais",
    },
    ariaLabel: "Nice agency location on Promenade des Anglais",
    title: "Nice - Promenade des Anglais",
  },
  {
    id: 5,
    position: [43.6047, 1.4442] as [number, number], // Toulouse
    size: "medium" as const,
    popup: {
      title: "Toulouse",
      content: "Place du Capitole",
    },
    ariaLabel: "Toulouse agency location at Place du Capitole",
    title: "Toulouse - Place du Capitole",
  },
  {
    id: 6,
    position: [50.6292, 3.0573] as [number, number], // Lille
    size: "medium" as const,
    popup: {
      title: "Lille",
      content: "Vieux-Lille, Rue de la Monnaie",
    },
    ariaLabel: "Lille agency location in Vieux-Lille",
    title: "Lille - Vieux-Lille",
  },
  {
    id: 7,
    position: [43.2965, 5.3698] as [number, number], // Marseille
    size: "medium" as const,
    popup: {
      title: "Marseille",
      content: "Prado / 8°",
    },
    ariaLabel: "Marseille agency location in Prado district",
    title: "Marseille - Prado",
  },
  {
    id: 8,
    position: [47.2184, -1.5536] as [number, number], // Nantes
    size: "medium" as const,
    popup: {
      title: "Nantes",
      content: "Île de Nantes, Hangar à Bananes",
    },
    ariaLabel: "Nantes agency location at Hangar à Bananes",
    title: "Nantes - Hangar à Bananes",
  },
  {
    id: 9,
    position: [48.5734, 7.7521] as [number, number], // Strasbourg
    size: "medium" as const,
    popup: {
      title: "Strasbourg",
      content: "Quartier de l'Orangerie",
    },
    ariaLabel: "Strasbourg agency location in Orangerie district",
    title: "Strasbourg - Orangerie",
  },
];
