import { Rating } from "flowbite-react";
import React, { memo } from "react";

type SkinRatingProps = {
  rating: number;
  amountReviews: number;
  onClick: () => void;
};

export const SkinRating = memo(function SkinRating({
  rating,
  amountReviews,
  onClick,
}: SkinRatingProps) {
  return (
    <Rating>
      <Rating.Star />
      <p className="ml-2 text-sm font-bold text-gray-900 dark:text-white">{rating}</p>
      <span className="mx-1.5 h-1 w-1 rounded-full bg-gray-500 dark:bg-gray-400" />
      <div
        onClick={onClick}
        className="text-sm font-medium text-gray-900 underline hover:no-underline dark:text-white cursor-pointer"
      >
        {amountReviews} {amountReviews > 1 ? "reviews" : "review"}
      </div>
    </Rating>
  );
});
