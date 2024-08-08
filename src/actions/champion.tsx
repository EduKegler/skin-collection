import { IChampion, IChampionAPI, IChampionBase, ISkin } from "@/type";
import { getSkinList } from "./skins";
import { getGeneralReviews } from "./review";
import { skinInfo } from "@/data/RarityData";

export async function getChampionDetail(
  id: string,
  language: string,
): Promise<IChampion> {
  const res = await fetch(
    `https://ddragon.leagueoflegends.com/cdn/14.14.1/data/${language}/champion/${id}.json`,
  );

  if (!res.ok) {
    throw new Error(`Failed to fetch details for champion ${id}`);
  }

  const data = await res.json();
  return data.data[id];
}

export async function getChampionList(
  userId: string,
  language: string,
): Promise<Record<string, IChampionAPI>> {
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
            isCollected: collectedSkins.includes(Number(skin.id)),
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
