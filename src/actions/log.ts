import { Redis } from "@upstash/redis";
import { getAccountInfo } from "./signIn";
import { TABLE } from "@/contants";
import { getLocale } from "./language";

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL,
  token: process.env.UPSTASH_REDIS_REST_TOKEN,
});

export async function logSignIn(jwt: string) {
  const account = await getAccountInfo(jwt, "dummy");
  const locale = await getLocale();
  if (account.isConnected) {
    await redis.lpush(`${TABLE.LOG_SIGNIN}`, {
      userId: account.id,
      nickName: account.name + "#" + account.tag,
      locale,
      dateTime: Date.now(),
    });
  }
}

export async function logSignOut(jwt: string) {
  const account = await getAccountInfo(jwt, "dummy");
  const locale = await getLocale();
  if (account.isConnected) {
    await redis.lpush(`${TABLE.LOG_SIGNOUT}`, {
      userId: account.id,
      nickName: account.name + "#" + account.tag,
      locale,
      dateTime: Date.now(),
    });
  }
}
