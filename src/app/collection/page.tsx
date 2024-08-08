import { ChampionList } from "@/components/ChampionList";
import { ScrollTo } from "@/components/ScrollToButton";
import { ChampionsProvider } from "@/providers/ChampionsProvider";
import { getChampionList } from "@/actions/champion";
import { getAccountInfo } from "@/actions/signIn";

export default async function Page() {
  const oauthValues = await getAccountInfo();
  const champions = await getChampionList(oauthValues.id);

  return (
    <main className="flex flex-auto h-full w-full">
      <ChampionsProvider defaultChampions={champions}>
        <ChampionList />
      </ChampionsProvider>
      <ScrollTo />
    </main>
  );
}
