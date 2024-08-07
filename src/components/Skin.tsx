"use client";

import Image from "next/image";
import { clsx } from "clsx";
import { memo, useCallback, useMemo, useState } from "react";
import { ISkin } from "@/type";
import { updateSkin } from "@/app/actions";
import { SkinRating } from "./SkinRating";
import { ModalReview } from "./ModalReview";
import { useRouter } from "next/navigation";
import { useChampionsDispatch } from "@/providers/ChampionsProvider";
import { useOAuth } from "@/providers/OAuthProvider";
import { useSignIn } from "@/hooks/useSignIn";
type SkinProps = {
  id: string;
  name: string;
  skin: ISkin;
  index: number;
};

export const Skin = memo(function Skin({ id, skin, index }: SkinProps) {
  const [openModal, setOpenModal] = useState(false);
  const { setChampions } = useChampionsDispatch();

  const { id: userId, isConnected } = useOAuth();
  const { signIn } = useSignIn();
  const { refresh } = useRouter();

  const handleClick = useCallback(() => {
    setChampions((champions) => ({
      ...champions,
      [id]: {
        ...champions[id],
        skins: {
          ...champions[id].skins,
          [champions[id].skins[skin.id].id]: {
            ...champions[id].skins[skin.id],
            isCollected: !skin.isCollected,
          },
        },
      },
    }));
    updateSkin(userId, skin.id);
  }, [setChampions, userId, skin.id, skin.isCollected, id]);

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
    <div className={clsx("text-center w-[154px]")}>
      <div
        className={clsx(
          "flex items-center justify-center transition-opacity duration-300 rounded-t-md",
          "opacity-100 group-hover:opacity-0 py-1",
          skin.isCollected ? "bg-green-800" : "bg-gray-800",
        )}
      >
        <span className="text-sm font-bold">
          {skin.isCollected ? "Collected" : "Uncollected"}
        </span>
      </div>

      <div
        className="flex-none w-full h-[280px] relative group cursor-pointer"
        onClick={isConnected ? handleClick : signIn}
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

        {isConnected ? (
          <div
            className={clsx(
              "bg-opacity-80 opacity-0 w-[154px] h-[280px] absolute top-0 left-0 flex items-center justify-center transition-opacity duration-300 rounded-b-md",
              skin.isCollected ? "bg-red-800" : "bg-green-800",
              "group-hover:opacity-100",
            )}
          >
            <span className="text-sm font-bold">
              {skin.isCollected ? "Uncollected?" : "Collected?"}
            </span>
          </div>
        ) : (
          <div
            className={clsx(
              "bg-opacity-80 opacity-0 w-[154px] h-[280px] absolute top-0 left-0 flex items-center justify-center transition-opacity duration-300 rounded-b-md",
              "bg-gray-800",
              "group-hover:opacity-100",
            )}
          >
            <span className="text-sm font-bold">
              <span className="underline">Sign in</span>
              <span> to track your collected skins.</span>
            </span>
          </div>
        )}
      </div>
      <div className="flex pt-2 gap-2 items-center text-center justify-center">
        <SkinRating
          skin={skin}
          onClick={() => {
            setOpenModal(true);
          }}
        />
      </div>

      <div className="flex mt-2 text-sm  gap-2 justify-center">
        <span className="self-center font-semibold">{skin.name}</span>
      </div>

      <ModalReview onClose={handleCloseModal} openModal={openModal} skin={skin} id={id} />
    </div>
  );
});
