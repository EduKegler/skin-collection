"use server";

import { TABLE } from "@/contants";
import { Redis } from "@upstash/redis";

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL,
  token: process.env.UPSTASH_REDIS_REST_TOKEN,
});

export async function getSkinList(userId?: string) {
  const res = (await redis.smembers(`${TABLE.SKINS}:${userId}`)) as number[];
  return res;
}

export async function collectSkin(userId: string, skinId: string) {
  await redis.sadd(`${TABLE.SKINS}:${userId}`, skinId);
}

export async function uncollectSkin(userId: string, skinId: string) {
  const res = await redis.srem(`${TABLE.SKINS}:${userId}`, skinId);
  console.log(res, `${TABLE.SKINS}:${userId}`, skinId);
  return res;
}
