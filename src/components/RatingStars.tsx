import { Rating } from "flowbite-react";
import { memo, ReactNode, useMemo } from "react";

type RatingStarsProps = {
  filledStars: number;
  className?: string;
  children?: ReactNode;
};
export const RatingStars = memo(function RatingStars({
  className,
  filledStars,
  children,
}: RatingStarsProps) {
  const array = useMemo(() => {
    return Array.from(Array(5).keys());
  }, []);

  return (
    <Rating className={className}>
      {array.map((id) => (
        <Rating.Star key={id} filled={id < filledStars} />
      ))}
      {children}
    </Rating>
  );
});
