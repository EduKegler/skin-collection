"use client";

import { Champion } from "@/components/Champion";
import { Search } from "@/components/Search";
import { IChampionDetail } from "@/type";
import { useMemo, useState } from "react";

type ChampionListProps = {
  champions: IChampionDetail[];
};

export const ChampionList = function ChampionList({
  champions,
}: ChampionListProps) {
  const [search, setSearch] = useState("");

  const championFilter = useMemo(
    () => champions.filter((champion) => champion.name.includes(search)),
    [champions, search]
  );

  return (
    <main className="flex min-h-screen flex-col gap-2 px-10">
      <Search search={search} setSearch={setSearch} />
      {championFilter.map((champion) => (
        <div key={champion.id} className="px-2">
          <Champion champion={champion} />
        </div>
      ))}
    </main>
  );
};
