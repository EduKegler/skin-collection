"use client";

import { IChampion } from "@/type";
import { Skin } from "./Skin";

type ChampionProps = {
  champion: IChampion;
};

export const Champion = function Champion({ champion }: ChampionProps) {
  const collected = champion.skins.reduce((acc, skin) => {
    return acc + (skin.isCollected ? 1 : 0);
  }, 0);
  return (
    <div>
      <div className="pb-2">
        <h3 className="text-4xl font-extrabold dark:text-white">
          {champion.name} ({collected}/{champion.skins.length})
        </h3>
      </div>
      <div className="flex flex-wrap gap-2">
        {champion.skins.map((skin) => (
          <Skin
            key={skin.id}
            id={champion.id}
            name={champion.name}
            skin={skin}
          />
        ))}
      </div>
    </div>
  );
};
