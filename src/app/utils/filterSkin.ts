import { ICollectFilter, ILegacyFilter, ISkin, ISkinFilter } from "@/type";

export const filterSkin = (
  championName: string,
  skin: ISkin,
  tierFilter: ISkinFilter,
  collectFilter: ICollectFilter,
  legacyFilter: ILegacyFilter,
  search: string,
) => {
  const nameSearch = championName
    .toLocaleLowerCase()
    .includes(search.toLocaleLowerCase());
  const skinNameSearch = skin.name.toLocaleLowerCase().includes(search.toLowerCase());
  const tierSearch = tierFilter === "All" ? true : skin.info?.tier === tierFilter;
  const collectSearch =
    (collectFilter === "Collect" && skin.isCollected) ||
    (collectFilter === "Uncollect" && !skin.isCollected) ||
    collectFilter === "All";
  const legacySearch =
    (legacyFilter === "OnlyLegacy" && skin.info?.isLegacy) ||
    (legacyFilter === "OnlyNonLegacy" && !skin.isCollected) ||
    legacyFilter === "All";
  return (nameSearch || skinNameSearch) && tierSearch && collectSearch && legacySearch;
};
