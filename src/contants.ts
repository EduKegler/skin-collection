import { ICollectFilter, ILanguage, ILegacyFilter, IOrderBy, ITierFilter } from "./type";

export const BASE_RIOT_URL = "https://auth.riotgames.com";
export const CLIENT_ID = process.env.NEXT_PUBLIC_RIOT_APPLICATION_CLIENT_ID ?? "";
export const CLIENT_SECRET = process.env.RIOT_APPLICATION_CLIENT_SECRET ?? "";
export const BASE_REDIRECT_URI =
  process.env.NEXT_PUBLIC_BASE_URL + "/oauth/callback" ?? "";
export const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL ?? "";

export const ROUTE = {
  HOME: "/",
  COLLECTION: "/collection",
  TOS: "/tos",
  PRIVACY: "/privacy",
  DONATE: "/donate",
  LOGOUT: "/logout",
} as const;

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
  LOG_SIGNIN: "log:signin",
  LOG_SIGNOUT: "log:signout",
};

export const COOKIE = {
  JWT: "jwt",
  REFRESH_TOKEN: "refresh_token",
  LANGUAGE: "language",
  COLLECT_FILTER: "collect_filter",
  TIER_FILTER: "tier_filter",
  LEGACY_FILTER: "legacy_filter",
  ORDER_BY: "order_by",
};

export const STORAGE = {
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
