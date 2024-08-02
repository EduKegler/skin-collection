"use client";

import { Champion } from "@/components/Champion";
import { Search } from "@/components/Search";
import { CollectedFilter } from "./CollectedFilter";
import { memo, useCallback, useEffect, useMemo, useState } from "react";
import { TierFilter } from "./TierFilter";
import { Button, Flowbite } from "flowbite-react";
import InfiniteScroll from "react-infinite-scroll-component";
import { useFilter } from "@/providers/FilterProvider";
import { useChampions } from "@/providers/ChampionsProvider";
import { PrimaryButton } from "./PrimaryButton";

export const ChampionList = memo(function ChampionList() {
  const { search, tierFilter, collectFilter } = useFilter();
  const { champions } = useChampions();
  const [visibleImages, setVisibleImages] = useState(6);
  const [hasMore, setHasMore] = useState(true);

  const championsFiltered = useMemo(
    () =>
      Object.keys(champions)
        .map((champKey) => {
          const champion = champions[champKey];
          return {
            ...champion,
            skins: Object.keys(champion.skins)
              .map((skinKey) => champion.skins[skinKey])
              .filter((skin) => {
                const nameSearch = champion.name
                  .toLocaleLowerCase()
                  .includes(search.toLocaleLowerCase());

                const skinNameSearch = skin?.name
                  .toLocaleLowerCase()
                  .includes(search.toLowerCase());
                const tierSearch =
                  tierFilter === "All" ? true : skin.info?.tier === tierFilter;
                const collectSearch =
                  (collectFilter === "Collect" && skin.isCollected) ||
                  (collectFilter === "Uncollect" && !skin.isCollected) ||
                  collectFilter === "All";
                return (nameSearch || skinNameSearch) && tierSearch && collectSearch;
              }),
          };
        })
        .filter((champion) => champion.skins.length),
    [champions, collectFilter, search, tierFilter],
  );

  const fetchMoreData = useCallback(() => {
    if (visibleImages >= championsFiltered.length) {
      setHasMore(false);
      return;
    }
    setVisibleImages((prevVisibleImages) => prevVisibleImages + 30);
  }, [championsFiltered.length, visibleImages]);

  useEffect(() => {
    setVisibleImages(6);
  }, [search, tierFilter, collectFilter]);

  useEffect(() => {
    setHasMore(visibleImages < championsFiltered.length);
  }, [championsFiltered.length, visibleImages]);

  return (
    <div className="flex flex-col gap-2">
      <div className="flex gap-4 pb-4 pt-4">
        <Search />
        <CollectedFilter />
        <TierFilter />
      </div>

      <InfiniteScroll
        dataLength={visibleImages}
        next={fetchMoreData}
        hasMore={false}
        loader={<h4>Loading...</h4>}
      >
        {championsFiltered.slice(0, visibleImages).map((champion, index) => (
          <Champion key={champion.id} champion={champion} championIndex={index} />
        ))}
      </InfiniteScroll>
      {hasMore && (
        <div className="w-full flex justify-center items-center">
          <PrimaryButton onClick={fetchMoreData}>Load More</PrimaryButton>
        </div>
      )}
    </div>
  );
});
