import { IReviewDetail, ISkin } from "@/type";
import {
  CustomFlowbiteTheme,
  Flowbite,
  HR,
  Modal,
  Rating,
  Spinner,
} from "flowbite-react";
import Image from "next/image";
import { memo, useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Comment } from "./Comment";
import { SendComment } from "./SendComment";
import { addReview, getSkinReview, removeReview } from "@/app/actions";
import { RatingStars } from "./RatingStars";
import { useOAuth } from "@/providers/OAuthProvider";

type ModalReviewProps = {
  openModal: boolean;
  onClose: (changed: boolean) => void;
  id: string;
  skin: ISkin;
};

const customTheme: CustomFlowbiteTheme = {
  hr: {
    root: {
      base: "my-8 h-px border-0 bg-gray-200 dark:bg-gray-600",
    },
  },
  modal: {
    content: {
      inner:
        "relative flex max-h-[90dvh] flex-col rounded-lg bg-white shadow dark:bg-slate-800",
    },
  },
};

export const ModalReview = memo(function ModalReview({
  openModal,
  onClose,
  skin,
  id,
}: ModalReviewProps) {
  const [reviews, setReviews] = useState<IReviewDetail[]>([]);
  const [loading, setLoading] = useState(false);
  const [changed, setChanged] = useState(false);

  const prevReviewsLength = useRef(reviews.length);
  const { id: userId } = useOAuth();

  const getData = useCallback(async () => {
    setLoading(true);
    const list = await getSkinReview(userId, skin.id);
    prevReviewsLength.current = list.length;
    setReviews(list);
    setLoading(false);
  }, [skin.id, userId]);

  useEffect(() => {
    if (openModal) {
      if (prevReviewsLength.current === 0) {
        setChanged(false);
        getData();
      }
    }
  }, [getData, openModal, prevReviewsLength]);

  const hasOwnerCommented = useMemo(() => {
    return reviews.some((comment) => comment.isOwner);
  }, [reviews]);

  const stars = useMemo(() => {
    const total = reviews.reduce(
      (acc, review) => {
        if (review.rating >= 1 && review.rating <= 5) {
          acc[review.rating as keyof typeof acc] =
            (acc[review.rating as keyof typeof acc] || 0) + 1;
        }
        return acc;
      },
      { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 },
    );
    return Object.fromEntries(
      Object.entries(total).map(([num, count]) => [
        num,
        (count / reviews.length) * 100 || 0,
      ]),
    );
  }, [reviews]);

  const handleSendComment = useCallback(
    async (rating: number, comment?: string) => {
      await addReview(userId, skin.id, rating, comment);
      getData();
      setChanged(true);
    },
    [getData, skin.id, userId],
  );

  const handleDeleteComment = useCallback(
    async (userId: string, rating: number) => {
      await removeReview(userId, skin.id, rating);
      getData();
      setChanged(true);
    },
    [getData, skin.id],
  );

  const rating = useMemo(() => {
    return reviews.reduce((acc, review) => acc + review.rating, 0) / reviews.length || 0;
  }, [reviews]);

  const handleClose = useCallback(() => {
    onClose(changed);
  }, [changed, onClose]);

  return (
    <Flowbite theme={{ theme: customTheme }}>
      <Modal size={"2xl"} show={openModal} position={"center"} onClose={handleClose}>
        <Modal.Header>
          {skin.name}
          {"'"}s Reviews
        </Modal.Header>
        <Modal.Body>
          {loading ? (
            <div className="min-h-96 w-full flex justify-center items-center">
              <Spinner aria-label="Extra large spinner example" size="xl" />
            </div>
          ) : (
            <div className="flex-col">
              <div className="flex gap-8">
                <Image
                  src={`https://ddragon.leagueoflegends.com/cdn/img/champion/splash/${id}_${skin.num}.jpg`}
                  alt={skin.name}
                  width={273.25}
                  className="drop-shadow-sm rounded-sm"
                  height={161.25}
                  unoptimized
                />
                <div className="w-full">
                  <RatingStars
                    className="mb-2"
                    filledStars={Math.floor(Number(skin.rating.rating))}
                  >
                    <p className="ml-2 text-sm font-medium text-gray-500 dark:text-gray-400">
                      {rating} out of 5
                    </p>
                  </RatingStars>
                  <p className="mb-4 text-sm font-medium text-gray-500 dark:text-gray-400">
                    {reviews.length} {reviews.length > 1 ? "reviews" : "review"}
                  </p>
                  <Rating.Advanced percentFilled={stars[5]} className="mb-2">
                    5 star
                  </Rating.Advanced>
                  <Rating.Advanced percentFilled={stars[4]} className="mb-2">
                    4 star
                  </Rating.Advanced>
                  <Rating.Advanced percentFilled={stars[3]} className="mb-2">
                    3 star
                  </Rating.Advanced>
                  <Rating.Advanced percentFilled={stars[2]} className="mb-2">
                    2 star
                  </Rating.Advanced>
                  <Rating.Advanced percentFilled={stars[1]}>1 star</Rating.Advanced>
                </div>
              </div>
              {!hasOwnerCommented && (
                <>
                  <HR />
                  <SendComment onSuccess={handleSendComment} />
                </>
              )}
              {reviews.length > 0 && <HR />}
              <div className="flex flex-col gap-4">
                {reviews.map((review) => (
                  <Comment
                    key={review.userId}
                    review={review}
                    onDelete={handleDeleteComment}
                  />
                ))}
              </div>
            </div>
          )}
        </Modal.Body>
      </Modal>
    </Flowbite>
  );
});
