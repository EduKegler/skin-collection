"use client";

import { Champion } from "@/components/Champion";
import { Search } from "@/components/Search";
import { LanguageSelect } from "./LanguageSelect";
import { IChampion } from "@/type";
import { CollectedFilter } from "./CollectedFilter";
import { memo } from "react";

type ChampionListProps = {
  champions: IChampion[];
  language: string;
};

export const ChampionList = memo(function ChampionList({
  champions,
  language,
}: ChampionListProps) {
  return (
    <main className="flex min-h-screen flex-col gap-2">
      <div className="flex gap-4 pb-8">
        <Search />
        <LanguageSelect language={language} />
      </div>

      <div className="flex gap-4 pb-8">
        <CollectedFilter />
      </div>

      {champions.map((champion, index) => (
        <Champion key={champion.id} champion={champion} championIndex={index} />
      ))}
    </main>
  );
});
