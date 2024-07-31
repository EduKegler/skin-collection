"use client";

import { Champion } from "@/components/Champion";
import { Search } from "@/components/Search";
import { IChampion } from "@/type";
import { CollectedFilter } from "./CollectedFilter";
import { memo } from "react";
import { TierFilter } from "./TierFilter";
import { Flowbite } from "flowbite-react";

type ChampionListProps = {
  champions: IChampion[];
  language: string;
};

export const ChampionList = memo(function ChampionList({ champions }: ChampionListProps) {
  return (
    <Flowbite theme={{ mode: "dark" }}>
      <div className="flex flex-col gap-2">
        <div className="flex gap-4 pb-8">
          <Search />
          <CollectedFilter />
          <TierFilter />
        </div>

        {champions.map((champion, index) => (
          <Champion key={champion.id} champion={champion} championIndex={index} />
        ))}
      </div>
    </Flowbite>
  );
});
