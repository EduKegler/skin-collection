import { IReviewDetail } from "@/type";
import { memo, useCallback, useState } from "react";
import { RatingStars } from "./RatingStars";
import { Button } from "flowbite-react";
import { AiOutlineLoading } from "react-icons/ai";
import { useTranslations } from "next-intl";
import { FlagImage } from "./FlagImage";
import { ConfirmDeleteModal } from "./ConfirmDeleteModal";

type CommentProps = {
  review: IReviewDetail;
  onDelete: (userId: string, rating: number) => Promise<void>;
};
export const Comment = memo(function Comment({ review, onDelete }: CommentProps) {
  const [visible, setVisible] = useState(false);

  const [loading, setLoading] = useState(false);
  const translate = useTranslations("Comment");

  const handleDeleteComment = useCallback(async () => {
    setLoading(true);
    await onDelete(review.userId, review.rating);
    setLoading(true);
  }, [onDelete, review.rating, review.userId]);

  const date = new Date(review.dateTime).toLocaleString();

  return (
    <article className="flex justify-between items-center bg-gray-800 p-4 border rounded-md border-gray-600">
      <div className="flex  flex-col gap-2 ">
        <h5 className="flex gap-2 font-bold text-sm">
          <FlagImage locale={review.locale} />
          {review.nickName}
          <RatingStars filledStars={review.rating} />
        </h5>
        <p className="text-md text-gray-400">{review.comment}</p>
        <p className="text-xs text-gray-400 italic">{date}</p>
      </div>
      {review.isOwner && (
        <>
          <Button
            color="gray"
            size={"xs"}
            onClick={() => setVisible(true)}
            isProcessing={loading}
            processingSpinner={<AiOutlineLoading className="h-3 w-3 animate-spin" />}
          >
            {translate("delete")}
          </Button>
          <ConfirmDeleteModal
            visible={visible}
            onClose={() => setVisible(false)}
            onConfirm={handleDeleteComment}
          />
        </>
      )}
    </article>
  );
});
