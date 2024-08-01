import { IReviewDetail } from "@/type";
import { memo } from "react";
import { RatingStars } from "./RatingStars";
1;
type CommentProps = {
  review: IReviewDetail;
};
export const Comment = memo(function Comment({ review }: CommentProps) {
  return (
    <article className="flex flex-col gap-2 bg-gray-800 p-4 border rounded-md border-gray-600">
      <h5 className="flex gap-2 font-bold text-sm">
        {review.userId}
        <RatingStars stars={5} filledStars={2} />
      </h5>
      <p className="text-md text-gray-400">{review.comment}</p>
    </article>
  );
});
