"use client";

import Image from "next/image";
import { clsx } from "clsx";
import { useCallback } from "react";
import { ISkin } from "@/type";
import { updateSkin } from "@/app/actions";

type SkinProps = {
  id: string;
  name: string;
  skin: ISkin;
};

export const Skin = function Skin({ id, skin }: SkinProps) {
  const skinNameReplaced = skin.name.replaceAll("default", "Default").trim();

  const handleClick = useCallback(() => {
    updateSkin(id, skin.id.toString());
  }, [id, skin.id]);

  const idRenamed = id === "Fiddlesticks" ? "FiddleSticks" : id;

  return (
    <div className="text-center">
      <div
        className="flex-none w-[154px] h-[280px] relative group cursor-pointer"
        onClick={handleClick}
      >
        <Image
          priority={!skin.num}
          src={`https://ddragon.leagueoflegends.com/cdn/img/champion/loading/${idRenamed}_${skin.num}.jpg`}
          alt={skinNameReplaced}
          fill={true}
          className="rounded-lg shadow-md pb-2"
          sizes="154px"
        />
        <div
          className={clsx(
            "bg-green-300 bg-opacity-40 w-[154px] h-[280px] absolute top-0 left-0 flex items-center justify-center transition-opacity duration-300",
            skin.isCollected ? "opacity-100" : "opacity-0",
            "group-hover:opacity-0"
          )}
        >
          <span className="text-lg font-bold">Collected!</span>
        </div>

        <div
          className={clsx(
            "bg-opacity-40 opacity-0 w-[154px] h-[280px] absolute top-0 left-0 flex items-center justify-center transition-opacity duration-300",
            skin.isCollected ? "bg-red-300" : "bg-gray-300",
            "group-hover:opacity-100"
          )}
        >
          <span className="text-lg font-bold">
            {skin.isCollected ? "Not Collected?" : "Collected?"}
          </span>
        </div>
      </div>
      <span className="mt-2">{skinNameReplaced}</span>
    </div>
  );
};
