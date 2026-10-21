import content from "./content.json";

export interface NavigationItem {
  label: string;
  to: string;
  marksCurrentRoute: boolean;
}

export const navigationItems: NavigationItem[] = [
  { label: content.header.navigation.home, to: "/", marksCurrentRoute: true },
  { label: content.header.navigation.zones, to: "/zones", marksCurrentRoute: true },
  { label: content.header.navigation.tariffs, to: "/tariffs", marksCurrentRoute: true },
  { label: content.header.navigation.booking, to: "/booking", marksCurrentRoute: true },
  { label: content.header.navigation.contacts, to: "/contacts", marksCurrentRoute: true },
];
