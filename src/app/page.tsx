import { ChampionList } from "@/components/ChampionList";
import { skinInfo } from "@/data/skin";
import { IChampion, IChampionAPI, IChampionBase, ISkin } from "@/type";
import { cookies } from "next/headers";
import { getGeneralReviews, getSkinList, getUserId } from "./actions";
import { FilterProvider } from "@/providers/FilterProvider";
import { CustomFlowbiteTheme, Flowbite } from "flowbite-react";
import { ScrollTo } from "@/components/ScrollToButton";
import { ChampionsProvider } from "@/providers/ChampionsProvider";

export default async function Page() {
  const language = cookies().get("language")?.value ?? "en_US";
  const champions = await getChampionList(language);

  const customTheme: CustomFlowbiteTheme = {
    button: {
      color: {
        primary: "bg-red-500 hover:bg-red-600",
      },
    },
    dropdown: {
      arrowIcon: "ml-2 mt-0.5 h-4 w-4",
    },
    floatingLabel: {
      helperText: {
        default: "text-xs text-gray-600 dark:text-gray-400",
        success: "text-xs text-green-600 dark:text-green-400",
        error: "text-xs text-red-600 dark:text-red-400",
      },
    },
  };

  return (
    <main className="flex min-h-screen flex-col gap-2 px-8 py-6">
      <Flowbite theme={{ theme: customTheme }}>
        <FilterProvider>
          <ChampionsProvider defaultChampions={champions}>
            <ChampionList />
          </ChampionsProvider>
        </FilterProvider>
        <ScrollTo />
      </Flowbite>
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
