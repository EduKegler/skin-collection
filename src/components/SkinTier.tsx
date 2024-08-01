"use client";

import Image, { StaticImageData } from "next/image";
import Mythic from "@/assets/Mythic.png";
import Transcendent from "@/assets/Transcendent.png";
import Epic from "@/assets/Epic.png";
import Legendary from "@/assets/Legendary.png";
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

export const SkinTier = memo(function SkinTier({ tier = "Default" }: SkinTierProps) {
  const icon = useMemo(() => {
    const icons: Record<ISkinTier, Icon | null> = {
      Transcendent: { iconName: Transcendent },
      Ultimate: { iconName: Ultimate },
      Mythic: { iconName: Mythic, height: 19 },
      Legendary: { iconName: Legendary },
      Epic: { iconName: Epic, height: 17 },
      Standard: null,
      Budget: null,
      Timeworn: null,
      Default: null,
      None: null,
    };
    return icons[tier];
  }, [tier]);

  if (!icon) return null;

  return (
    <Image
      className="self-center h-auto inline"
      src={icon.iconName}
      alt={tier}
      width={20}
      height={icon.height}
      loading="lazy"
      unoptimized
    />
  );
});
