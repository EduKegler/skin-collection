"use server";
import { TABLE } from "@/contants";
import { IReviewDetail, IReviewGeneral } from "@/type";
import { Redis } from "@upstash/redis";

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL,
  token: process.env.UPSTASH_REDIS_REST_TOKEN,
});

export async function getSkinReview(
  userId: string,
  skinId: string,
): Promise<IReviewDetail[]> {
  const skinReview = (await redis.lrange(
    `${TABLE.REVIEWS}:${skinId}`,
    0,
    -1,
  )) as IReviewDetail[];
  const response = skinReview.map((review) => ({
    ...review,
    isOwner: review.userId === userId,
  }));
  return response;
}

export async function getGeneralReviews() {
  const reviews = ((await redis.get(TABLE.REVIEWS)) ?? []) as IReviewGeneral;
  return reviews;
}

export async function addReview(
  userId: string,
  nickName: string,
  skinId: string,
  rating: number,
  comment?: string,
) {
  await redis.lpush(`${TABLE.REVIEWS}:${skinId}`, { userId, nickName, rating, comment });
  const reviews = (await redis.get(TABLE.REVIEWS)) as IReviewGeneral;
  const ratingsBySkin = reviews ? (reviews[skinId] ?? []) : [];
  const reviewList = { ...reviews, [skinId]: [...ratingsBySkin, rating] };
  await redis.set(`${TABLE.REVIEWS}`, reviewList);
}

export async function removeReview(userId: string, skinId: string) {
  const reviews = (await redis.lrange(`${TABLE.REVIEWS}:${skinId}`, 0, -1)) as Array<{
    userId: string;
    nickName: string;
    rating: number;
    comment?: string;
  }>;
  const updatedReviews = reviews.filter((review) => review.userId !== userId);

  await redis.del(`${TABLE.REVIEWS}:${skinId}`);

  if (updatedReviews.length > 0) {
    await redis.lpush(`${TABLE.REVIEWS}:${skinId}`, ...updatedReviews);
  }

  const generalReviews = (await redis.get(TABLE.REVIEWS)) as IReviewGeneral;

  const ratingsBySkin = updatedReviews.map((review) => review.rating);
  const updatedGeneralReviews = { ...generalReviews, [skinId]: ratingsBySkin };

  await redis.set(TABLE.REVIEWS, updatedGeneralReviews);
}
