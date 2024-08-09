"use client";

import Image from "next/image";
import { clsx } from "clsx";
import { memo, useCallback, useState } from "react";
import { ISkin } from "@/type";
import { SkinRating } from "./SkinRating";
import { ModalReview } from "./ModalReview";
import { useChampionsDispatch } from "@/providers/ChampionsProvider";
import { useOAuth } from "@/providers/OAuthProvider";
import { useSignIn } from "@/hooks/useSignIn";
import { collectSkin, uncollectSkin } from "@/actions/skins";
import { SkinOverlay } from "./SkinOverlay";
import { useTranslations } from "next-intl";
import { useUserPreference } from "@/providers/UserPreferenceProvider";

type SkinProps = {
  id: string;
  name: string;
  skin: ISkin;
  index: number;
};

export const Skin = memo(function Skin({ id, skin, index }: SkinProps) {
  const [openModal, setOpenModal] = useState(false);
  const { setChampions, refreshChampions } = useChampionsDispatch();
  const { language } = useUserPreference();
  const [loading, setLoading] = useState(false);

  const translate = useTranslations("Skin");

  const { id: userId, isConnected } = useOAuth();
  const { signIn } = useSignIn();

  const handleClick = useCallback(async () => {
    setLoading(true);

    skin.isCollected
      ? await uncollectSkin(userId, skin.id)
      : await collectSkin(userId, skin.id);

    setChampions((champions) => {
      return {
        ...champions,
        [id]: {
          ...champions[id],
          skins: {
            ...champions[id].skins,
            [champions[id].skins[skin.id].id]: {
              ...champions[id].skins[skin.id],
              isCollected: !champions[id].skins[skin.id].isCollected,
            },
          },
        },
      };
    });
    setLoading(false);
  }, [setChampions, userId, skin.id, skin.isCollected, id]);

  const handleCloseModal = useCallback(
    (changed: boolean) => {
      setOpenModal(false);
      if (changed) {
        refreshChampions();
      }
    },
    [refreshChampions],
  );

  const handleCollect = useCallback(() => {
    if (isConnected) {
      handleClick();
    } else {
      signIn();
    }
  }, [handleClick, isConnected, signIn]);

  const sourceImageId = id === "Fiddlesticks" ? "FiddleSticks" : id;

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
          {skin.isCollected ? translate("collected") : translate("uncollected")}
        </span>
      </div>
      <div
        className="flex-none w-full h-[280px] relative group cursor-pointer"
        onClick={loading ? undefined : handleCollect}
      >
        <Image
          priority={index <= 4}
          src={`https://ddragon.leagueoflegends.com/cdn/img/champion/loading/${sourceImageId}_${skin.num}.jpg`}
          alt={skin.name}
          fill={true}
          loading={index > 4 ? "lazy" : "eager"}
          className="rounded-b-md shadow-md"
          sizes="154px"
          unoptimized
        />
        <SkinOverlay
          isCollected={skin.isCollected}
          isConnected={isConnected}
          isLoading={loading}
        />
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
        <span className="self-center font-semibold">{skin.names[language]}</span>
      </div>
      <ModalReview onClose={handleCloseModal} openModal={openModal} skin={skin} id={id} />
    </div>
  );
});
