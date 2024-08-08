import { ISkin } from "@/type";
import { Rating } from "flowbite-react";
import React, { memo } from "react";
import { SkinTier } from "./SkinTier";
import Legacy from "@/assets/Legacy.png";
import Image from "next/image";

type SkinRatingProps = {
  skin: ISkin;
  onClick: () => void;
};

export const SkinRating = memo(function SkinRating({ skin, onClick }: SkinRatingProps) {
  return (
    <div className="flex gap-1 text-center justify-center">
      <div className="flex gap-1 text-center">
        {skin.info?.isLegacy && (
          <Image
            className="self-center h-auto inline w-[15px]"
            sizes="100vw"
            width={0}
            height={0}
            unoptimized
            src={Legacy}
            alt={"legacy"}
            loading="lazy"
          />
        )}
        <SkinTier tier={skin.info?.tier} />
        <Rating>
          <Rating.Star filled={true} />
        </Rating>
      </div>
      <div className="flex gap-1 justify-center text-center items-center">
        <p className="text-sm font-bold ">
          {skin.rating.rating > 1 ? skin.rating.rating : "--"}
        </p>
        <span className="mx-1.5 h-1 w-1 rounded-full bg-gray-500 dark:bg-gray-400" />
        <span
          onClick={onClick}
          className="text-sm font-medium underline hover:no-underline  cursor-pointer"
        >
          {skin.rating.amountReviews}{" "}
          {skin.rating.amountReviews > 1 ? "reviews" : "review"}
        </span>
      </div>
    </div>
  );
});
