import { Dropdown, Textarea } from "flowbite-react";
import { ChangeEvent, memo, useCallback, useMemo, useState } from "react";
import { RatingStars } from "./RatingStars";
import { PrimaryButton } from "./PrimaryButton";

type SendCommentProps = {
  onSuccess: (rating: number, comment?: string) => void;
};

export const SendComment = memo(function SendComment({ onSuccess }: SendCommentProps) {
  const [rating, setRating] = useState<number | "Rating">("Rating");
  const [comment, setComment] = useState("");

  const labels = useMemo(() => {
    return {
      Rating: "Rating",
      5: <RatingStars filledStars={5} />,
      4: <RatingStars filledStars={4} />,
      3: <RatingStars filledStars={3} />,
      2: <RatingStars filledStars={2} />,
      1: <RatingStars filledStars={1} />,
    };
  }, []);

  const handleChangeComment = useCallback((event: ChangeEvent<HTMLTextAreaElement>) => {
    setComment(event.target.value);
  }, []);

  const handleSendComment = useCallback(() => {
    if (rating !== "Rating") {
      onSuccess(rating, comment);
    }
  }, [comment, onSuccess, rating]);

  return (
    <div className="">
      <Textarea
        id="comment"
        placeholder="Leave a comment..."
        value={comment}
        onChange={handleChangeComment}
        required
        rows={4}
      />
      <div className="pt-4 flex justify-end gap-4">
        <Dropdown label={labels[rating as keyof typeof labels]} inline>
          <Dropdown.Item onClick={() => setRating("Rating")}>
            {labels["Rating"]}
          </Dropdown.Item>
          <Dropdown.Item onClick={() => setRating(5)}>{labels[5]}</Dropdown.Item>
          <Dropdown.Item onClick={() => setRating(4)}>{labels[4]}</Dropdown.Item>
          <Dropdown.Item onClick={() => setRating(3)}>{labels[3]}</Dropdown.Item>
          <Dropdown.Item onClick={() => setRating(2)}>{labels[2]}</Dropdown.Item>
          <Dropdown.Item onClick={() => setRating(1)}>{labels[1]}</Dropdown.Item>
        </Dropdown>
        <PrimaryButton disabled={rating === "Rating"} onClick={handleSendComment}>
          SEND
        </PrimaryButton>
      </div>
    </div>
  );
});
