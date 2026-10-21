import paths from "./path.json";
import type { ZoneVariant } from "./zonePresentation";

export interface ZoneDetails {
  title: string;
  tagline: string;
  description: string;
  image: string;
  variant: ZoneVariant;
  seats: string;
  bestFor: string;
  equipment: string[];
}

export const zoneDetails: ZoneDetails[] = [
  {
    title: "STANDARD",
    tagline: "Универсальная игровая зона",
    description: "Оптимальный вариант для ежедневной игры, рейтинговых матчей и знакомства с клубом.",
    image: paths.cards.standard,
    variant: "blue",
    seats: "Индивидуальные места",
    bestFor: "Онлайн-игры, шутеры и MOBA",
    equipment: ["RTX 4060 / 4070", "Intel Core i5 / Ryzen 5", "Мониторы 144–240 Гц", "Игровая периферия"],
  },
  {
    title: "VIP",
    tagline: "Максимум мощности и приватности",
    description: "Премиальная зона с топовыми комплектующими, увеличенным пространством и минимальным количеством отвлекающих факторов.",
    image: paths.cards.vip,
    variant: "yellow",
    seats: "Индивидуальные VIP-места",
    bestFor: "Соревновательная игра и стриминг",
    equipment: ["RTX 4080 / 4090", "Intel Core i7 / Ryzen 7", "Мониторы 240–360 Гц", "Премиальные кресла и гарнитуры"],
  },
  {
    title: "BOOTCAMP",
    tagline: "Пространство для команды",
    description: "Изолированная командная зона для совместных тренировок, турниров и игровых сессий с друзьями.",
    image: paths.cards.bootcamp,
    variant: "purple",
    seats: "Командная посадка",
    bestFor: "Тренировки, турниры и командная игра",
    equipment: ["RTX 4070 / 4080", "Мониторы 240 Гц", "Командные столы", "Голосовая связь внутри зоны"],
  },
  {
    title: "PS5 ZONE",
    tagline: "Консольный отдых на большом экране",
    description: "Комфортная лаунж-зона для прохождения игр, спортивных симуляторов и вечеров с компанией.",
    image: paths.cards.ps5,
    variant: "green",
    seats: "До 4 игроков",
    bestFor: "Кооперативы, файтинги и спортивные игры",
    equipment: ["PlayStation 5", "4K HDR экран 55″", "Дополнительные геймпады", "Удобные диваны"],
  },
];
