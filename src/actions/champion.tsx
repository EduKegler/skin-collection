"use server";
import { IChampionAPI, ISkin } from "@/type";
import { getSkinList } from "./skins";
import { getGeneralReviews } from "./review";
import { skinInfo } from "@/data/RarityData";
import championsFile from "../../champions.json";

export async function getChampionList(
  userId: string,
): Promise<Record<string, IChampionAPI>> {
  const collectedSkins = await getSkinList(userId);
  const reviews = await getGeneralReviews();

  const champions = championsFile as any as Record<string, IChampionAPI>;
  const championSkins: Record<string, IChampionAPI> = {};

  for (const champion in champions) {
    if (Object.prototype.hasOwnProperty.call(champions, champion)) {
      const currentChampion = champions[champion];

      const skins: Record<string, ISkin> = {};

      for (const skin in currentChampion.skins) {
        const currentSkin = currentChampion.skins[skin];
        const review = reviews[currentSkin.id as keyof typeof reviews] ?? [];
        const rating = review.reduce((acc, curr) => acc + curr, 0) / review.length;

        skins[skin] = {
          ...currentSkin,
          isCollected: collectedSkins.includes(Number(currentSkin.id)),
          info: skinInfo[currentSkin.id as keyof typeof skinInfo],
          rating: {
            rating: rating ? rating : 0,
            amountReviews: review.length,
          },
        };
      }

      championSkins[champion] = {
        id: currentChampion.id,
        name: currentChampion.name,
        skins,
      };
    }
  }

  return championSkins;
}
