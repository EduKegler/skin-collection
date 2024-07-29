import { ChampionList } from "@/components/ChampionList";
import { IChampion, IChampionDetail } from "@/type";
import { cookies } from "next/headers";

export default async function Page() {
  const champions = await getChampionList();

  return (
    <main className="flex min-h-screen flex-col gap-2 px-10 py-10">
      <ChampionList champions={champions} />
    </main>
  );
}

async function getChampionDetail(id: string): Promise<IChampionDetail> {
  const res = await fetch(
    `https://ddragon.leagueoflegends.com/cdn/14.14.1/data/en_US/champion/${id}.json`
  );

  if (!res.ok) {
    throw new Error(`Failed to fetch details for champion ${id}`);
  }

  const data = await res.json();
  return data.data[id];
}

async function getChampionList() {
  const champiosnResponseJSON = await fetch(
    "https://ddragon.leagueoflegends.com/cdn/14.14.1/data/en_US/champion.json"
  );

  if (!champiosnResponseJSON.ok) {
    throw new Error("Failed to fetch data");
  }

  const championsResponse = await champiosnResponseJSON.json();

  const champions = Array.from(
    Object.values(championsResponse.data)
  ) as IChampion[];

  const detailedChampions = await Promise.all(
    champions.map(async (champion) => {
      const details = await getChampionDetail(champion.id);
      const isCollected = cookies().get(champion.id)?.value.split(",") ?? [];

      return {
        ...champion,
        skins: details.skins.map((skin) => {
          return {
            ...skin,
            isCollected: isCollected.includes(skin.id.toString()),
          };
        }),
      };
    })
  );

  return detailedChampions;
}
