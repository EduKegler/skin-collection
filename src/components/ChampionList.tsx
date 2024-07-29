"use client";

import { Champion } from "@/components/Champion";
import { Search } from "@/components/Search";
import { IChampionDetail } from "@/type";
import { useMemo, useState } from "react";
import { LanguageSelect } from "./LanguageSelect";

type ChampionListProps = {
  champions: IChampionDetail[];
  language: string;
};

export const ChampionList = function ChampionList({
  champions,
  language,
}: ChampionListProps) {
  const [search, setSearch] = useState("");

  const championFilter = useMemo(
    () =>
      champions.filter((champion) =>
        champion.name.toLocaleLowerCase().includes(search)
      ),
    [champions, search]
  );

  return (
    <main className="flex min-h-screen flex-col gap-2 ">
      <div className="flex gap-4 pb-4">
        <Search search={search} setSearch={setSearch} />
        <LanguageSelect language={language} />
      </div>

      {championFilter.map((champion, index) => (
        <div key={champion.id} className="px-2">
          {Boolean(index) && (
            <hr className="my-12 h-0.5 border-t-0 bg-neutral-100 dark:bg-white/10" />
          )}
          <Champion champion={champion} />
        </div>
      ))}
    </main>
  );
};
