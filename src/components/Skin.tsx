"use client";

import Image from "next/image";
import { clsx } from "clsx";
import { Dispatch, memo, SetStateAction, useCallback, useMemo, useState } from "react";
import { ISkin } from "@/type";
import { updateSkin } from "@/app/actions";
import { SkinTier } from "./SkinTier";
import { SkinRating } from "./SkinRating";
import { useFilter } from "@/providers/FilterProvider";
import { ModalReview } from "./ModalReview";
import { useRouter } from "next/navigation";
type SkinProps = {
  id: string;
  name: string;
  skin: ISkin;
  index: number;
  onChange: Dispatch<SetStateAction<number>>;
};

export const Skin = memo(function Skin({ id, skin, index, onChange }: SkinProps) {
  const { collectFilter } = useFilter();
  const [openModal, setOpenModal] = useState(false);
  const [internalCollected, setInternalCollected] = useState(skin.isCollected);

  const { refresh } = useRouter();

  const handleClick = useCallback(() => {
    setInternalCollected((isCollected) => !isCollected);
    onChange((counter) => (internalCollected ? counter - 1 : counter + 1));
    updateSkin(skin.id);
  }, [skin.id, internalCollected, onChange]);

  const handleCloseModal = useCallback(
    (changed: boolean) => {
      setOpenModal(false);
      if (changed) {
        refresh();
      }
    },
    [refresh],
  );

  const idRenamed = useMemo(() => {
    return id === "Fiddlesticks" ? "FiddleSticks" : id;
  }, [id]);

  return (
    <div
      className={clsx(
        "text-center w-[154px]",
        collectFilter === "Uncollect" && internalCollected && "hidden",
        collectFilter === "Collect" && !internalCollected && "hidden",
      )}
    >
      <div
        className={clsx(
          "flex items-center justify-center transition-opacity duration-300 rounded-t-md",
          "opacity-100 group-hover:opacity-0 py-1",
          internalCollected ? "bg-green-800" : "bg-gray-800",
        )}
      >
        <span className="text-sm font-bold">
          {internalCollected ? "Collected!" : "Uncollected!"}
        </span>
      </div>
      <div
        className="flex-none w-full h-[280px] relative group cursor-pointer"
        onClick={handleClick}
      >
        <Image
          priority={index <= 4}
          src={`https://ddragon.leagueoflegends.com/cdn/img/champion/loading/${idRenamed}_${skin.num}.jpg`}
          alt={skin.name}
          fill={true}
          loading={index > 4 ? "lazy" : "eager"}
          className="rounded-b-md shadow-md"
          sizes="154px"
          unoptimized
        />

        <div
          className={clsx(
            "bg-opacity-80 opacity-0 w-[154px] h-[280px] absolute top-0 left-0 flex items-center justify-center transition-opacity duration-300 rounded-b-md",
            internalCollected ? "bg-red-800" : "bg-green-800",
            "group-hover:opacity-100",
          )}
        >
          <span className="text-sm font-bold">
            {internalCollected ? "Uncollected?" : "Collected?"}
          </span>
        </div>
      </div>
      <div className="flex justify-center pt-2 gap-2 text-center">
        <SkinTier tier={skin.info?.tier} />
        <SkinRating
          amountReviews={skin.rating.amountReviews}
          rating={skin.rating.rating}
          onClick={() => {
            setOpenModal(true);
          }}
        />
      </div>

      <div className="flex mt-2 text-sm  gap-2 justify-center">
        <span className="self-center">{skin.name}</span>
      </div>

      <ModalReview onClose={handleCloseModal} openModal={openModal} skin={skin} id={id} />
    </div>
  );
});
