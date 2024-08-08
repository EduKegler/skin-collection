import { Dropdown, Textarea, Tooltip } from "flowbite-react";
import { ChangeEvent, memo, useCallback, useMemo, useState } from "react";
import { RatingStars } from "./RatingStars";
import { PrimaryButton } from "./PrimaryButton";
import { useOAuth } from "@/providers/OAuthProvider";
import { useSignIn } from "@/hooks/useSignIn";
import { AiOutlineLoading } from "react-icons/ai";
import { useTranslations } from "next-intl";

type SendCommentProps = {
  onSuccess: (rating: number, comment?: string) => Promise<void>;
};

export const SendComment = memo(function SendComment({ onSuccess }: SendCommentProps) {
  const [loading, setLoading] = useState(false);
  const [rating, setRating] = useState<number | "Rating">("Rating");
  const [comment, setComment] = useState("");
  const { isConnected } = useOAuth();
  const { signIn } = useSignIn();

  const translate = useTranslations("SendComment");

  const labels = useMemo(() => {
    return {
      Rating: translate("rating"),
      5: <RatingStars filledStars={5} />,
      4: <RatingStars filledStars={4} />,
      3: <RatingStars filledStars={3} />,
      2: <RatingStars filledStars={2} />,
      1: <RatingStars filledStars={1} />,
    };
  }, [translate]);

  const handleChangeComment = useCallback((event: ChangeEvent<HTMLTextAreaElement>) => {
    setComment(event.target.value);
  }, []);

  const handleSendComment = useCallback(async () => {
    if (rating !== "Rating") {
      setLoading(true);
      await onSuccess(rating, comment);
      setLoading(false);
    }
  }, [comment, onSuccess, rating]);

  if (!isConnected) {
    return (
      <div
        className="flex justify-center items-center p-4 cursor-pointer"
        onClick={signIn}
      >
        <span className="text-sm font-bold">
          <span className="underline">{translate("signin")}</span>
          <span>{translate("review")}</span>
        </span>
      </div>
    );
  }

  return (
    <div className="">
      <Textarea
        id="comment"
        placeholder={translate("placeholder")}
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
        <Tooltip
          className={rating === "Rating" ? "block" : "hidden"}
          content={translate("tooltip")}
          trigger={"hover"}
          placement="bottom"
        >
          <PrimaryButton
            disabled={rating === "Rating" || loading}
            onClick={handleSendComment}
            isProcessing={loading}
            processingSpinner={<AiOutlineLoading className="h-3 w-3 animate-spin" />}
          >
            {translate("send")}
          </PrimaryButton>
        </Tooltip>
      </div>
    </div>
  );
});
