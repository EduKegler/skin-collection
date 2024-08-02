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
      <Rating.Star filled={true} />
      <p className="ml-2 text-sm font-bold ">{rating}</p>
      <span className="mx-1.5 h-1 w-1 rounded-full bg-gray-500 dark:bg-gray-400" />
      <span
        onClick={onClick}
        className="text-sm font-medium underline hover:no-underline  cursor-pointer"
      >
        {amountReviews} {amountReviews > 1 ? "reviews" : "review"}
      </span>
    </Rating>
  );
});
