"use client";

import { Champion } from "@/components/Champion";
import { Search } from "@/components/Search";
import { LanguageSelect } from "./LanguageSelect";
import { IChampion } from "@/type";
import { CollectedFilter } from "./CollectedFilter";
import { memo } from "react";
import { TierFilter } from "./TierFilter";
import { Flowbite } from "flowbite-react";

type ChampionListProps = {
  champions: IChampion[];
  language: string;
};

export const ChampionList = memo(function ChampionList({
  champions,
  language,
}: ChampionListProps) {
  return (
    <Flowbite theme={{ mode: "dark" }}>
      <main className="flex min-h-screen flex-col gap-2">
        <div className="flex gap-4 pb-8 w-full items-center">
          <div className="w-4/5">
            <Search />
          </div>
          <div className="w-1/5">
            <LanguageSelect language={language} />
          </div>
        </div>

        <div className="flex gap-4 pb-8">
          <CollectedFilter />
          <TierFilter />
        </div>

        {champions.map((champion, index) => (
          <Champion key={champion.id} champion={champion} championIndex={index} />
        ))}
      </main>
    </Flowbite>
  );
});
