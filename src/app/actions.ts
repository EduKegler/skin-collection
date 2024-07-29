"use server";

import { cookies } from "next/headers";

export async function updateSkin(championId: string, skinId: string) {
  const skins = cookies().get(championId)?.value.split(",") ?? [];
  if (skins.includes(skinId)) {
    cookies().set(
      championId,
      [...skins.filter((skin) => skin !== skinId)].join(",")
    );
  } else {
    cookies().set(championId, [...skins, skinId].join(","));
  }
}

export async function updateLanguage(language: string) {
  cookies().set("language", language);
}
