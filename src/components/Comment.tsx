import { IReviewDetail } from "@/type";
import { memo, useCallback } from "react";
import { RatingStars } from "./RatingStars";
import { Button } from "flowbite-react";

type CommentProps = {
  review: IReviewDetail;
  onDelete: (userId: string, rating: number) => void;
};
export const Comment = memo(function Comment({ review, onDelete }: CommentProps) {
  const handleDeleteComment = useCallback(() => {
    onDelete(review.userId, review.rating);
  }, [onDelete, review.rating, review.userId]);

  return (
    <article className="flex justify-between items-center bg-gray-800 p-4 border rounded-md border-gray-600">
      <div className="flex  flex-col gap-2 ">
        <h5 className="flex gap-2 font-bold text-sm">
          {review.userId}
          <RatingStars filledStars={review.rating} />
        </h5>
        <p className="text-md text-gray-400">{review.comment}</p>
      </div>
      {review.isOwner && (
        <Button color="gray" size={"xs"} onClick={handleDeleteComment}>
          Delete
        </Button>
      )}
    </article>
  );
});
