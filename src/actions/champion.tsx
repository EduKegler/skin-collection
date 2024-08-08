"use server";
import { IChampionAPI, ISkin } from "@/type";
import { getSkinList } from "./skins";
import { getGeneralReviews } from "./review";
import { skinInfo } from "@/data/RarityData";
import { promises as fs } from "fs";

export async function getChampionList(
  userId: string,
): Promise<Record<string, IChampionAPI>> {
  const collectedSkins = await getSkinList(userId);
  const file = await fs.readFile(process.cwd() + "/public/champions.json", "utf8");
  const champions = JSON.parse(file);
  const reviews = await getGeneralReviews();

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
