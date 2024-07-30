"use client";

import Image, { StaticImageData } from "next/image";
import Mythic from "@/assets/Mythic.png";
import Transcendent from "@/assets/Transcendent.png";
import Epic from "@/assets/Epic.png";
import Legendary from "@/assets/Legendary.png";
import Ultimate from "@/assets/Ultimate.png";
import { ISkinTier } from "@/type";
import { useMemo } from "react";

type SkinTierProps = {
  tier?: ISkinTier;
};

export const SkinTier = function SkinTier({ tier = "Default" }: SkinTierProps) {
  const icon = useMemo(() => {
    const icons: Record<ISkinTier, StaticImageData | null> = {
      Transcendent: Transcendent,
      Ultimate: Ultimate,
      Mythic: Mythic,
      Legendary: Legendary,
      Epic: Epic,
      Standard: null,
      Budget: null,
      Timeworn: null,
      Default: null,
    };
    return icons[tier];
  }, [tier]);

  if (!icon) return null;

  return (
    <Image
      className="self-start"
      src={icon}
      alt={tier}
      unoptimized
      width={20}
      height={20}
    />
  );
};
