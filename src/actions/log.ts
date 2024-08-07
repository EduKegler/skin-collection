import { TABLE } from "@/contants";
import { Redis } from "@upstash/redis";

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL,
  token: process.env.UPSTASH_REDIS_REST_TOKEN,
});

export async function logSignIn(userId: string, nickName: string) {
  const logs = ((await redis.get(TABLE.SIGNINS)) ?? []) as [];
  redis.set(TABLE.SIGNINS, [...logs, { userId, nickName, date: Date.now() }]);
}
