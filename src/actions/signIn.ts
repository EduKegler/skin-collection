"use server";

import { COOKIE, OAUTH_DEFAULT_VALUES } from "@/contants";
import { OAuthContextDefaultType } from "@/providers/OAuthProvider";
import { cookies } from "next/headers";

export async function getAccountInfo(): Promise<OAuthContextDefaultType> {
  const jwt = cookies().get(COOKIE.JWT)?.value;
  const refToken = cookies().get(COOKIE.REFRESH_TOKEN)?.value;

  if (!jwt || !refToken) {
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

  if (accountInfo.status !== 200 || summonerInfo.status !== 200) {
    return OAUTH_DEFAULT_VALUES;
  }

  const account = await accountInfo.json();
  const summoner = await summonerInfo.json();

  return {
    id: account.puuid,
    name: account.gameName,
    tag: account.tagLine,
    profileIconId: summoner.profileIconId,
    level: summoner.summonerLevel,
    isConnected: true,
  };
}
