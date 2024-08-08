import { IChampion, IOrderBy, ISkin, ISkinTier } from "@/type";

const tierOrder: Record<ISkinTier, number> = {
  Transcendent: 1,
  Ultimate: 2,
  Mythic: 3,
  Legendary: 4,
  Epic: 5,
  Standard: 6,
  Budget: 7,
  Timeworn: 8,
  None: 9,
};

const sorters = {
  ReleaseDate: (skinA: ISkin, skinB: ISkin) => skinB.num - skinA.num,
  Rarity: (skinA: ISkin, skinB: ISkin) =>
    tierOrder[skinA.info?.tier ?? "Timeworn"] - tierOrder[skinB.info?.tier ?? "Timeworn"],
  Reviews: (skinA: ISkin, skinB: ISkin) =>
    skinB.rating.amountReviews - skinA.rating.amountReviews,
  Rating: (skinA: ISkin, skinB: ISkin) => skinB.rating.rating - skinA.rating.rating,
};

export const orderBySkins = (orderBy: IOrderBy) => {
  const sorter = sorters[orderBy as keyof typeof sorters];
  return sorter;
};
