"use client";

import Image from "next/image";
import { clsx } from "clsx";
import { Dispatch, SetStateAction, useCallback, useState } from "react";
import { ISkin } from "@/type";
import { updateSkin } from "@/app/actions";
import { SkinTier } from "./SkinTier";
import { Rating } from "./Rating";

type SkinProps = {
  id: string;
  name: string;
  skin: ISkin;
  index: number;
  onChange: Dispatch<SetStateAction<number>>;
};

export const Skin = function Skin({ id, skin, index, onChange }: SkinProps) {
  const [internalCollected, setInternalCollected] = useState(skin.isCollected);

  const handleClick = useCallback(() => {
    setInternalCollected((isCollected) => !isCollected);
    onChange((counter) => (internalCollected ? counter - 1 : counter + 1));
    updateSkin(skin.id);
  }, [id, skin.id, internalCollected]);

  const idRenamed = id === "Fiddlesticks" ? "FiddleSticks" : id;

  return (
    <div className="text-center w-[154px]">
      <div
        className={clsx(
          "flex items-center justify-center transition-opacity duration-300",
          "opacity-100 group-hover:opacity-0 py-1",
          internalCollected ? "bg-green-800" : "bg-gray-800",
        )}
      >
        <span className="text-sm font-bold">
          {internalCollected ? "Collected!" : "Not Collected!"}
        </span>
      </div>
      <div
        className="flex-none w-[154px] h-[280px] relative group cursor-pointer"
        onClick={handleClick}
      >
        <Image
          priority={index <= 10}
          src={`https://ddragon.leagueoflegends.com/cdn/img/champion/loading/${idRenamed}_${skin.num}.jpg`}
          alt={skin.name}
          fill={true}
          loading={index > 10 ? "lazy" : "eager"}
          className="rounded-lg shadow-md pb-2"
          sizes="154px"
          unoptimized
        />

        <div
          className={clsx(
            "bg-opacity-80 opacity-0 w-[154px] h-[280px] absolute top-0 left-0 flex items-center justify-center transition-opacity duration-300",
            internalCollected ? "bg-red-800" : "bg-green-800",
            "group-hover:opacity-100",
          )}
        >
          <span className="text-sm font-bold">
            {internalCollected ? "Not Collected?" : "Collected?"}
          </span>
        </div>
      </div>
      <div className="flex justify-center pt-2">
        <Rating amountReviews={skin.rating.amountReviews} rating={skin.rating.rating} />
      </div>

      <div className="flex mt-2 text-xs gap-2 justify-center">
        <SkinTier tier={skin.info?.tier} />
        <span className="self-center">{skin.name}</span>
      </div>
    </div>
  );
};
