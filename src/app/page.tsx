import { ChampionList } from "@/components/ChampionList";
import { skinInfo } from "@/data/skin";
import { IChampion, IChampionAPI, IChampionBase, ISkin } from "@/type";
import { cookies } from "next/headers";
import { getGeneralReviews, getSkinList, getUserId } from "./actions";
import { FilterProvider } from "@/providers/FilterProvider";
import { ScrollTo } from "@/components/ScrollToButton";
import { ChampionsProvider } from "@/providers/ChampionsProvider";

export default async function Page() {
  const language = cookies().get("language")?.value ?? "en_US";
  const champions = await getChampionList(language);

  return (
    <main>
      <FilterProvider>
        <ChampionsProvider defaultChampions={champions}>
          <ChampionList />
        </ChampionsProvider>
      </FilterProvider>
      <ScrollTo />
    </main>
  );
}

async function getChampionDetail(id: string, language: string): Promise<IChampion> {
  const res = await fetch(
    `https://ddragon.leagueoflegends.com/cdn/14.14.1/data/${language}/champion/${id}.json`,
  );

  if (!res.ok) {
    throw new Error(`Failed to fetch details for champion ${id}`);
  }

  const data = await res.json();
  return data.data[id];
}

async function getChampionList(language: string): Promise<Record<string, IChampionAPI>> {
  const userId = await getUserId();
  const collectedSkins = await getSkinList(userId);

  const championsResponseJSON = await fetch(
    `https://ddragon.leagueoflegends.com/cdn/14.14.1/data/${language}/champion.json`,
  );

  if (!championsResponseJSON.ok) {
    throw new Error("Failed to fetch data");
  }

  const championsResponse = await championsResponseJSON.json();
  const champions = Array.from(Object.values(championsResponse.data)) as IChampionBase[];
  const reviews = await getGeneralReviews();

  const detailedChampions = await Promise.all(
    champions.map(async (champion) => {
      const details: IChampion = await getChampionDetail(champion.id, language);

      const skins = details.skins.reduce(
        (skinAcc, skin) => {
          if (!skin.num) return skinAcc;
          const review = reviews[skin.id as keyof typeof reviews] ?? [];
          const rating = review.reduce((acc, curr) => acc + curr, 0) / review.length;

          skinAcc[skin.id] = {
            ...skin,
            isCollected: collectedSkins.includes(skin.id.toString()),
            info: skinInfo[skin.id as keyof typeof skinInfo],
            rating: {
              rating: rating ? rating : 0,
              amountReviews: review.length,
            },
          };

          return skinAcc;
        },
        {} as Record<string, ISkin>,
      );

      return {
        ...champion,
        skins,
      };
    }),
  );

  const championMap = detailedChampions.reduce(
    (acc, champion) => {
      acc[champion.id] = champion as any as IChampionAPI;
      return acc;
    },
    {} as Record<string, IChampionAPI>,
  );

  return championMap;
}
