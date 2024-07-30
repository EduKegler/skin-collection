"use client";

import { IChampion } from "@/type";
import { Skin } from "./Skin";
import { useMemo } from "react";

type ChampionProps = {
  champion: IChampion;
  search: string;
  championIndex: number;
};

export const Champion = function Champion({
  champion,
  search,
  championIndex,
}: ChampionProps) {
  const collected = champion.skins.reduce((acc, skin) => {
    return acc + (skin.isCollected ? 1 : 0);
  }, 0);

  const skinsFiltered = useMemo(
    () => champion.skins.filter((skin) => skin.name.includes(search)),
    [champion.skins, search],
  );

  if (!skinsFiltered.length) {
    return null;
  }

  return (
    <div key={champion.id} className="px-2">
      <hr className="my-12 h-0.5 border-t-0 bg-neutral-100 dark:bg-white/10" />
      <div className="pb-2">
        <h3 className="text-4xl font-extrabold dark:text-white">
          {champion.name} ({collected}/{champion.skins.length})
        </h3>
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
};
