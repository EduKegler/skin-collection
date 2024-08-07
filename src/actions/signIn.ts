import { OAUTH_DEFAULT_VALUES } from "@/contants";
import { OAuthContextDefaultType } from "@/providers/OAuthProvider";
import { cookies } from "next/headers";

export async function accountInfo(): Promise<OAuthContextDefaultType> {
  const jwt = cookies().get("jwt")?.value;

  if (!jwt) {
    return OAUTH_DEFAULT_VALUES;
  }

  const accountInfo = await fetch(
    `https://americas.api.riotgames.com/riot/account/v1/accounts/me`,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + jwt,
      },
    },
  );

  const summonerInfo = await fetch(
    `https://br1.api.riotgames.com/lol/summoner/v4/summoners/me`,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + jwt,
      },
    },
  );

  const account = await accountInfo.json();
  const summoner = await summonerInfo.json();

  if (summoner.status_code || account.status_code) {
    return OAUTH_DEFAULT_VALUES;
  }

  return {
    id: account.puuid,
    name: account.gameName,
    tag: account.tagLine,
    profileIconId: summoner.profileIconId,
    level: summoner.summonerLevel,
    isConnected: true,
  };
}
