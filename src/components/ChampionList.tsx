"use client";

import { Champion } from "@/components/Champion";
import { Search } from "@/components/Search";
import { useState } from "react";
import { LanguageSelect } from "./LanguageSelect";
import { IChampion } from "@/type";

type ChampionListProps = {
  champions: IChampion[];
  language: string;
};

export const ChampionList = function ChampionList({
  champions,
  language,
}: ChampionListProps) {
  const [search, setSearch] = useState("");

  return (
    <main className="flex min-h-screen flex-col gap-2">
      <div className="flex gap-4">
        <Search search={search} setSearch={setSearch} />
        <LanguageSelect language={language} />
      </div>

      {champions.map((champion, index) => (
        <Champion
          key={champion.id}
          champion={champion}
          search={search}
          championIndex={index}
        />
      ))}
    </main>
  );
};
