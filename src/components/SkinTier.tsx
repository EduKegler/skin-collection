"use client";

import Image, { StaticImageData } from "next/image";
import Mythic from "@/assets/Mythic.png";
import Transcendent from "@/assets/Transcendent.png";
import Epic from "@/assets/Epic.png";
import Legendary from "@/assets/Legendary.png";
import Standard from "@/assets/Standard.png";
import Ultimate from "@/assets/Ultimate.png";
import { ISkinTier } from "@/type";
import { memo, useMemo } from "react";

type Icon = {
  iconName: StaticImageData;
  height?: number;
};

type SkinTierProps = {
  tier?: ISkinTier;
};

export const SkinTier = memo(function SkinTier({ tier = "None" }: SkinTierProps) {
  const icon = useMemo(() => {
    const icons: Record<ISkinTier, Icon | null> = {
      Transcendent: { iconName: Transcendent },
      Ultimate: { iconName: Ultimate },
      Mythic: { iconName: Mythic, height: 19 },
      Legendary: { iconName: Legendary },
      Epic: { iconName: Epic, height: 17 },
      Standard: { iconName: Standard },
      Budget: { iconName: Standard },
      Timeworn: { iconName: Standard },
      None: null,
    };
    return icons[tier];
  }, [tier]);

  if (!icon) return null;

  return (
    <Image
      className="self-center h-auto inline w-[15px]"
      sizes="100vw"
      width={0}
      height={0}
      unoptimized
      src={icon.iconName}
      alt={tier}
      loading="lazy"
    />
  );
});
