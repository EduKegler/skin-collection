"use client";

import { IChampion, ISkinTier } from "@/type";
import { Skin } from "./Skin";
import { memo, useMemo } from "react";
import { useFilter } from "@/providers/FilterProvider";

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

type ChampionProps = {
  champion: IChampion;
  championIndex: number;
};

export const Champion = memo(function Champion({
  champion,
  championIndex,
}: ChampionProps) {
  const { orderBy } = useFilter();
  const collected = champion.skins.reduce((acc, skin) => {
    return acc + (skin.isCollected ? 1 : 0);
  }, 0);

  const skinsOrdered = useMemo(() => {
    if (orderBy === "ReleaseDate") {
      return champion.skins;
    } else {
      return champion.skins.sort(
        (skinA, skinB) =>
          tierOrder[skinA.info?.tier ?? "Timeworn"] -
          tierOrder[skinB.info?.tier ?? "Timeworn"],
      );
    }
  }, [champion.skins, orderBy]);

  return (
    <div key={champion.id} className="py-4">
      <div className="pb-8 relative flex items-center gap-4">
        <h3 className={`text-4xl font-medium`}>
          {champion.name} ({collected}/{champion.skins.length})
        </h3>
        <div className="flex-grow border-t border-gray-600"></div>
      </div>
      <div className="flex flex-wrap gap-4">
        {skinsOrdered.map((skin) => (
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
