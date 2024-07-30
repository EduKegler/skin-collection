"use server";

import { Redis } from "@upstash/redis";
import { cookies } from "next/headers";
import { v4 as uuidv4 } from "uuid";

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL,
  token: process.env.UPSTASH_REDIS_REST_TOKEN,
});

export async function setUserId() {
  const newUserId = uuidv4();
  cookies().set("userId", newUserId);
  return newUserId;
}

export async function getUserId() {
  return cookies().get("userId")?.value;
}

export async function getSkinList(userId?: string) {
  return ((await redis.get(`champions_${userId}`)) ?? []) as string[];
}

export async function updateSkin(skinId: string) {
  const userId = (await getUserId()) ?? (await setUserId());
  const championList = await getSkinList(userId);

  if (championList.find((skin) => skin === skinId)) {
    await redis.set(
      `champions_${userId}`,
      championList.filter((skin) => skin !== skinId),
    );
  } else {
    await redis.set(`champions_${userId}`, [...championList, skinId]);
  }
}

export async function updateLanguage(language: string) {
  cookies().set("language", language);
}
