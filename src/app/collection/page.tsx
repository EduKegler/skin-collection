import { ChampionList } from "@/components/ChampionList";
import { ScrollTo } from "@/components/ScrollToButton";
import { ChampionsProvider } from "@/providers/ChampionsProvider";
import { getChampionList } from "@/actions/champion";
import { getLanguage } from "@/actions/language";
import { getAccountInfo } from "@/actions/signIn";

export default async function Page() {
  const oauthValues = await getAccountInfo();
  const language = await getLanguage();
  const champions = await getChampionList(oauthValues.id, language);

  return (
    <main className="flex flex-auto h-full w-full">
      <ChampionsProvider defaultChampions={champions}>
        <ChampionList />
      </ChampionsProvider>
      <ScrollTo />
    </main>
  );
}
