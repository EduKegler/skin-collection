export type IChampionBase = {
  id: string;
  name: string;
};

export type ISkin = {
  id: string;
  num: number;
  name: string;
  isCollected: boolean;
  info?: IInfoSkin;
  rating: IRating;
};

export type IRating = {
  rating: string;
  amountReviews: number;
};

export type ISkinTier =
  | "Transcendent"
  | "Ultimate"
  | "Mythic"
  | "Legendary"
  | "Epic"
  | "Standard"
  | "Budget"
  | "Timeworn"
  | "Default";

export type IInfoSkin = {
  champion: string;
  tier: ISkinTier;
  isLegacy: boolean;
  set: string;
};

export type IChampion = IChampionBase & {
  skins: ISkin[];
};
