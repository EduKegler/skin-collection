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
import { RatingStars } from "./RatingStars";
import { useOAuth } from "@/providers/OAuthProvider";
import { addReview, getSkinReview, removeReview } from "@/actions/review";
import clsx from "clsx";
import { useTranslations } from "next-intl";

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

  const translate = useTranslations("ModalReview");

  const prevReviewsLength = useRef(reviews.length);
  const { id: userId, nickName } = useOAuth();

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
      await addReview(userId, nickName, skin.id, rating, comment);
      getData();
      setChanged(true);
    },
    [getData, nickName, skin.id, userId],
  );

  const handleDeleteComment = useCallback(
    async (userId: string) => {
      await removeReview(userId, skin.id);
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
        <Modal.Header>{skin.name} - Reviews</Modal.Header>
        <Modal.Body className="relative p-0">
          <div
            className={clsx(
              "absolute w-full h-full z-10  justify-center items-center bg-slate-900 bg-opacity-80 pb-10",
              loading ? "flex" : "hidden",
            )}
          >
            <Spinner size="xl" color={"warning"} />
          </div>
          <div className="p-6">
            <div className="flex-col min-h-96">
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
                      {rating} {translate("outof")} 5
                    </p>
                  </RatingStars>
                  <p className="mb-4 text-sm font-medium text-gray-500 dark:text-gray-400">
                    {reviews.length} {reviews.length > 1 ? "reviews" : "review"}
                  </p>
                  <Rating.Advanced percentFilled={stars[5]} className="mb-2">
                    5 {translate("star")}
                  </Rating.Advanced>
                  <Rating.Advanced percentFilled={stars[4]} className="mb-2">
                    4 {translate("star")}
                  </Rating.Advanced>
                  <Rating.Advanced percentFilled={stars[3]} className="mb-2">
                    3 {translate("star")}
                  </Rating.Advanced>
                  <Rating.Advanced percentFilled={stars[2]} className="mb-2">
                    2 {translate("star")}
                  </Rating.Advanced>
                  <Rating.Advanced percentFilled={stars[1]}>
                    1 {translate("star")}
                  </Rating.Advanced>
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
          </div>
        </Modal.Body>
      </Modal>
    </Flowbite>
  );
});
