"use client";
import { IReviewDetail, ISkin } from "@/type";
import { CustomFlowbiteTheme, Flowbite, HR, Modal, Rating } from "flowbite-react";
import Image from "next/image";
import { memo } from "react";
import { Comment } from "./Comment";
import { SendComment } from "./SendComment";

type ModalReviewProps = {
  openModal: boolean;
  onClose: () => void;
  id: string;
  skin: ISkin;
};

const mockReview: IReviewDetail[] = [
  {
    rating: 3,
    userId: "test",
    comment: "Nice",
  },
  {
    rating: 3,
    userId: "test2",
    comment: "Nice",
  },
  {
    rating: 3,
    userId: "test3",
    comment: "Bad",
  },
];

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
  return (
    <Flowbite theme={{ theme: customTheme }}>
      <Modal size={"2xl"} show={openModal} position={"center"} onClose={onClose}>
        <Modal.Header>
          {skin.name}
          {"'"}s Reviews
        </Modal.Header>
        <Modal.Body>
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
                <Rating className="mb-2">
                  <Rating.Star />
                  <Rating.Star />
                  <Rating.Star />
                  <Rating.Star />
                  <Rating.Star filled={false} />
                  <p className="ml-2 text-sm font-medium text-gray-500 dark:text-gray-400">
                    {skin.rating.rating} out of 5
                  </p>
                </Rating>
                <p className="mb-4 text-sm font-medium text-gray-500 dark:text-gray-400">
                  {skin.rating.amountReviews}{" "}
                  {skin.rating.amountReviews > 1 ? "reviews" : "review"}
                </p>
                <Rating.Advanced percentFilled={70} className="mb-2">
                  5 star
                </Rating.Advanced>
                <Rating.Advanced percentFilled={17} className="mb-2">
                  4 star
                </Rating.Advanced>
                <Rating.Advanced percentFilled={8} className="mb-2">
                  3 star
                </Rating.Advanced>
                <Rating.Advanced percentFilled={4} className="mb-2">
                  2 star
                </Rating.Advanced>
                <Rating.Advanced percentFilled={1}>1 star</Rating.Advanced>
              </div>
            </div>
            <HR />
            <SendComment />
            <HR />
            <div className="flex flex-col gap-4">
              {mockReview.map((review) => (
                <Comment key={review.userId} review={review} />
              ))}
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </Flowbite>
  );
});
