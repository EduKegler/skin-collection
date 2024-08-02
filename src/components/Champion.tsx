"use client";

import { IChampion } from "@/type";
import { Skin } from "./Skin";
import { memo, useMemo } from "react";
import { useFilter } from "@/providers/FilterProvider";
import { filterSkin } from "@/app/utils/filterSkin";

type ChampionProps = {
  champion: IChampion;
  championIndex: number;
};

export const Champion = memo(function Champion({
  champion,
  championIndex,
}: ChampionProps) {
  const { search, tierFilter, collectFilter, legacyFilter } = useFilter();

  const collected = champion.skins.reduce((acc, skin) => {
    return acc + (skin.isCollected ? 1 : 0);
  }, 0);

  const skinsFiltered = useMemo(
    () =>
      champion.skins.filter((skin) => {
        return filterSkin(
          champion.name,
          skin,
          tierFilter,
          collectFilter,
          legacyFilter,
          search,
        );
      }),
    [champion.name, champion.skins, collectFilter, legacyFilter, search, tierFilter],
  );

  if (!skinsFiltered.length) {
    return null;
  }

  return (
    <div key={champion.id} className="py-4">
      <div className="pb-8 relative flex items-center gap-4">
        <h3 className={`text-4xl font-medium`}>
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
