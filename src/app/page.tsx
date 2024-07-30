import { ChampionList } from "@/components/ChampionList";
import { skinInfo } from "@/data/skin";
import { IChampion, IChampionBase } from "@/type";
import { cookies } from "next/headers";

export default async function Page() {
  const language = cookies().get("language")?.value ?? "en_US";
  const champions = await getChampionList(language);

  return (
    <main className="flex min-h-screen flex-col gap-2 px-10 py-10">
      {/* <SignInWithRiotButton /> */}
      <ChampionList champions={champions} language={language} />
    </main>
  );
}

async function getChampionDetail(
  id: string,
  language: string
): Promise<IChampion> {
  const res = await fetch(
    `https://ddragon.leagueoflegends.com/cdn/14.14.1/data/${language}/champion/${id}.json`
  );

  if (!res.ok) {
    throw new Error(`Failed to fetch details for champion ${id}`);
  }

  const data = await res.json();
  return data.data[id];
}

async function getChampionList(language: string): Promise<IChampion[]> {
  const champiosnResponseJSON = await fetch(
    `https://ddragon.leagueoflegends.com/cdn/14.14.1/data/${language}/champion.json`
  );

  if (!champiosnResponseJSON.ok) {
    throw new Error("Failed to fetch data");
  }

  const championsResponse = await champiosnResponseJSON.json();

  const champions = Array.from(
    Object.values(championsResponse.data)
  ) as IChampionBase[];

  const detailedChampions = await Promise.all(
    champions.map(async (champion) => {
      const details = await getChampionDetail(champion.id, language);
      const isCollected = cookies().get(champion.id)?.value.split(",") ?? [];

      if (champion.id.includes("Aka")) {
        console.log(
          champion.id,
          details.skins.map((e) => e.id)
        );
      }

      return {
        ...champion,
        skins: details.skins.map((skin) => {
          const rating = (Math.random() * 5).toFixed(1);
          const amountReviews = Math.floor(Math.random() * 25) + 1;

          return {
            ...skin,
            isCollected: isCollected.includes(skin.id.toString()),
            info: skinInfo[skin.id as keyof typeof skinInfo],
            rating: {
              rating,
              amountReviews,
            },
          };
        }),
      };
    })
  );

  return detailedChampions.sort((champA, champB) =>
    champA.name >= champB.name ? 1 : -1
  );
}
