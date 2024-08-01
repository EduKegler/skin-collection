import { Rating } from "flowbite-react";
import { memo, useMemo } from "react";

type RatingStarsProps = {
  stars: number;
  filledStars: number;
};
export const RatingStars = memo(function RatingStars({
  stars,
  filledStars,
}: RatingStarsProps) {
  const array = useMemo(() => {
    return Array.from(Array(stars).keys());
  }, [stars]);

  return (
    <Rating>
      {array.map((id) => (
        <Rating.Star key={id} filled={id < filledStars} />
      ))}
    </Rating>
  );
});
