import { IChampion, IChampionAPI, ILanguage } from "@/type";
import { promises as fs } from "fs";

async function getVersions() {
  const versions = await fetch(`https://ddragon.leagueoflegends.com/api/versions.json`);
  return await versions.json();
}

async function getChampionList(
  version: string,
  language: ILanguage,
): Promise<IChampion[]> {
  const champions = await fetch(
    `https://ddragon.leagueoflegends.com/cdn/${version}/data/${language}/championFull.json`,
  );
  return (await champions.json()).data;
}

async function main() {
  const versions = await getVersions();
  const champions = await getChampionList(versions[0], "en_US");
  const championsPT = await getChampionList(versions[0], "pt_BR");
  const championSkins: Record<string, IChampionAPI> = {};

  for (const champion in champions) {
    if (Object.prototype.hasOwnProperty.call(champions, champion)) {
      const currentChampion = champions[champion];
      championSkins[champion] = {
        id: currentChampion.id === "Fiddlesticks" ? "FiddleSticks" : currentChampion.id,
        name: currentChampion.name,
        skins: currentChampion.skins.reduce((list, skin) => {
          if (skin.num) {
            return {
              ...list,
              [skin.id]: {
                ...skin,
                names: {
                  ["en_US"]: skin.name,
                  ["pt_BR"]: championsPT[champion].skins.find((sk) => sk.id === skin.id)
                    ?.name,
                },
              },
            };
          } else {
            return list;
          }
        }, {}),
      };
    }
  }

  await fs.writeFile("./public/champions.json", JSON.stringify(championSkins, null, 2));
}

main().catch(console.error);
