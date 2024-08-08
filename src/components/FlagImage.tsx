"use client";

import { ILocale } from "@/type";
import Image from "next/image";
import { memo } from "react";

type FlagImageProps = {
  locale: ILocale;
};

export const FlagImage = memo(function FlagImage({ locale }: FlagImageProps) {
  return (
    <Image
      className="self-center h-auto inline w-[20px]"
      sizes="100vw"
      width={0}
      height={0}
      unoptimized
      src={`${locale}.svg`}
      alt={"pt_BR"}
      priority
    />
  );
});
