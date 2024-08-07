import { ICollectFilter, ILanguage, ILegacyFilter, IOrderBy, ITierFilter } from "./type";

export const routes = {
  HOME: "/",
  COLLECTION: "/collection",
  TOS: "/tos",
  PRIVACY: "/privacy",
  DONATE: "/donate",
};

export const OAUTH_DEFAULT_VALUES = {
  id: "",
  name: "",
  tag: "0",
  profileIconId: 1,
  level: 0,
  isConnected: false,
};

export const TABLE = {
  SKINS: "skins",
  REVIEWS: "reviews",
  SIGNINS: "signins",
};

export const COOKIE = {
  LANGUAGE: "language",
  COLLECT_FILTER: "collect_filter",
  TIER_FILTER: "tier_filter",
  LEGACY_FILTER: "legacy_filter",
  ORDER_BY: "order_by",
};

export const supportedLanguages: ILanguage[] = ["en_US", "pt_BR"];
export const supportedCollectTypes: ICollectFilter[] = ["All", "Collect", "Uncollect"];
export const supportedTierTypes: ITierFilter[] = [
  "All",
  "Transcendent",
  "Ultimate",
  "Mythic",
  "Legendary",
  "Epic",
  "Standard",
  "Budget",
  "Timeworn",
];
export const supportedLegacyTypes: ILegacyFilter[] = [
  "All",
  "OnlyLegacy",
  "OnlyNonLegacy",
];

export const supportedOrderTypes: IOrderBy[] = [
  "Rarity",
  "Rating",
  "ReleaseDate",
  "Reviews",
];
