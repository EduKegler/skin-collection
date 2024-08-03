"use client";

import { Champion } from "@/components/Champion";
import { CollectedFilter } from "./filters/CollectedFilter";
import { TierFilter } from "./filters/TierFilter";
import InfiniteScroll from "react-infinite-scroll-component";
import { useFilter } from "@/providers/FilterProvider";
import { useChampions } from "@/providers/ChampionsProvider";
import { PrimaryButton } from "./PrimaryButton";
import { LegacySkinFilter } from "./filters/LegacySkinFilter";
import { filterSkin } from "@/app/utils/filterSkin";
import { NoData } from "./NoData";
import { memo, useCallback, useEffect, useMemo, useState } from "react";
import { Search } from "./filters/Search";
import { OrderSkinBy } from "./filters/OrderSkinBy";

export const ChampionList = memo(function ChampionList() {
  const { search, tierFilter, collectFilter, legacyFilter } = useFilter();
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
                return filterSkin(
                  champion.name,
                  skin,
                  tierFilter,
                  collectFilter,
                  legacyFilter,
                  search,
                );
              }),
          };
        })
        .filter((champion) => champion.skins.length),
    [champions, collectFilter, legacyFilter, search, tierFilter],
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
    <div className="flex flex-col gap-2 w-full">
      <div className="flex gap-4 pb-4 pt-4 items-center">
        <Search />
        <CollectedFilter />
        <TierFilter />
        <LegacySkinFilter />
        <OrderSkinBy />
      </div>

      {championsFiltered.length ? (
        <>
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
              <PrimaryButton onClick={fetchMoreData}>LOAD MORE</PrimaryButton>
            </div>
          )}
        </>
      ) : (
        <NoData />
      )}
    </div>
  );
});
