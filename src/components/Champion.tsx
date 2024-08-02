"use client";

import { IChampion } from "@/type";
import { Skin } from "./Skin";
import { memo, useMemo } from "react";
import { useFilter } from "@/providers/FilterProvider";

type ChampionProps = {
  champion: IChampion;
  championIndex: number;
};

export const Champion = memo(function Champion({
  champion,
  championIndex,
}: ChampionProps) {
  const { search, tierFilter, collectFilter } = useFilter();

  const collected = champion.skins.reduce((acc, skin) => {
    return acc + (skin.isCollected ? 1 : 0);
  }, 0);

  const skinsFiltered = useMemo(
    () =>
      champion.skins.filter((skin) => {
        const nameSearch = champion.name
          .toLocaleLowerCase()
          .includes(search.toLocaleLowerCase());
        const skinNameSearch = skin.name
          .toLocaleLowerCase()
          .includes(search.toLowerCase());
        const tierSearch = tierFilter === "All" ? true : skin.info?.tier === tierFilter;
        const collectSearch =
          (collectFilter === "Collect" && skin.isCollected) ||
          (collectFilter === "Uncollect" && !skin.isCollected) ||
          collectFilter === "All";
        return (nameSearch || skinNameSearch) && tierSearch && collectSearch;
      }),
    [champion.name, champion.skins, collectFilter, search, tierFilter],
  );

  if (!skinsFiltered.length) {
    return null;
  }

  return (
    <div key={champion.id} className="px-2 py-4">
      <div className="pb-8 relative flex items-center gap-4">
        <h3 className="text-4xl font-medium dark:text-white">
          {champion.name} ({collected}/{champion.skins.length})
        </h3>
        <div className="flex-grow border-t border-gray-600"></div>
      </div>
      <div className="flex flex-wrap gap-2">
        {skinsFiltered.map((skin) => (
          <Skin
            key={skin.id}
            id={champion.id}
            name={champion.name}
            skin={skin}
            index={championIndex}
          />
        ))}
      </div>
    </div>
  );
});
