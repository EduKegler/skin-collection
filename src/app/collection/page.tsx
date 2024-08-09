import { ScrollTo } from "@/components/ScrollToButton";
import { ChampionsProvider } from "@/providers/ChampionsProvider";
import { getChampionList } from "@/actions/champion";
import { getAccountInfo } from "@/actions/signIn";
import { Collection } from "@/components/pages/Collection";

export default async function Page() {
  const oauthValues = await getAccountInfo();
  const champions = await getChampionList(oauthValues.id);

  return (
    <main className="flex flex-auto h-full w-full">
      <ChampionsProvider defaultChampions={champions}>
        <Collection />
      </ChampionsProvider>
      <ScrollTo />
    </main>
  );
}
