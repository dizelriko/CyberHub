import paths from "./path.json";

export type ZoneVariant = "blue" | "yellow" | "purple" | "green";

export interface ZonePresentation {
  icon: string;
  image: string;
  variant: ZoneVariant;
}

export const zonePresentation: ZonePresentation[] = [
  { icon: "bi-display", image: paths.cards.standard, variant: "blue" },
  { icon: "bi-gem", image: paths.cards.vip, variant: "yellow" },
  { icon: "bi-people-fill", image: paths.cards.bootcamp, variant: "purple" },
  { icon: "bi-controller", image: paths.cards.ps5, variant: "green" },
];
