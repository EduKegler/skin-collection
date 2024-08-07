"use server";

import { IReviewDetail, IReviewGeneral } from "@/type";
import { Redis } from "@upstash/redis";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const TABLE = {
  SKINS: "skins",
  REVIEWS: "reviews",
};
const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL,
  token: process.env.UPSTASH_REDIS_REST_TOKEN,
});

export async function getSkinList(userId?: string) {
  return ((await redis.get(`${TABLE.SKINS}_${userId}`)) ?? []) as string[];
}

export async function updateSkin(userId: string, skinId: string) {
  const championList = await getSkinList(userId);

  if (championList.find((skin) => skin === skinId)) {
    await redis.set(
      `${TABLE.SKINS}_${userId}`,
      championList.filter((skin) => skin !== skinId),
    );
  } else {
    await redis.set(`${TABLE.SKINS}_${userId}`, [...championList, skinId]);
  }
}

export async function updateLanguage(language: string) {
  cookies().set("language", language);
}

export async function getGeneralReviews() {
  const reviews = ((await redis.get(TABLE.REVIEWS)) ?? []) as IReviewGeneral;
  return reviews;
}

export async function getSkinReview(
  userId: string,
  skinId: string,
): Promise<IReviewDetail[]> {
  const skinReview = ((await redis.get(`${TABLE.REVIEWS}_${skinId}`)) ??
    []) as IReviewDetail[];

  return skinReview.map((review) => ({ ...review, isOwner: review.userId === userId }));
}

export async function addReview(
  userId: string,
  skinId: string,
  rating: number,
  comment?: string,
) {
  const skinReview = ((await redis.get(`${TABLE.REVIEWS}_${skinId}`)) ??
    []) as IReviewDetail[];
  const reviews = (await redis.get(TABLE.REVIEWS)) as IReviewGeneral;

  await redis.set(`${TABLE.REVIEWS}_${skinId}`, [
    ...skinReview,
    { userId, rating, comment },
  ]);

  const ratingsBySkin = reviews ? (reviews[skinId] ?? []) : [];

  const reviewList = { ...reviews, [skinId]: [...ratingsBySkin, rating] };
  await redis.set(`${TABLE.REVIEWS}`, reviewList);
}

export async function removeReview(userId: string, skinId: string, rating: number) {
  const skinReview = ((await redis.get(`${TABLE.REVIEWS}_${skinId}`)) ??
    []) as IReviewDetail[];
  const reviews = (await redis.get(TABLE.REVIEWS)) as IReviewGeneral;

  await redis.set(
    `${TABLE.REVIEWS}_${skinId}`,
    skinReview.filter((review) => review.userId !== userId),
  );

  const ratingsBySkin = reviews ? (reviews[skinId] ?? []) : [];
  const reviewList = {
    ...reviews,
    [skinId]: ratingsBySkin.filter((review) => review !== rating),
  };

  await redis.set(`${TABLE.REVIEWS}`, reviewList);
}

export async function homepage() {
  redirect(`/`);
}

export async function logout() {
  cookies().delete("jwt");
}
