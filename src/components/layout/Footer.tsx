"use client";
import { memo } from "react";
import { Footer as BaseFooter } from "flowbite-react";
import { useTranslations } from "next-intl";
import Image from "next/image";

export const Footer = memo(function Footer() {
  const translate = useTranslations("Footer");

  return (
    <BaseFooter
      container
      className="flex items-center dark:bg-transparent shadow-none px-0 pb-0 gap-12"
    >
      <Image
        src={"/logo.svg"}
        alt="logo"
        priority
        width="0"
        height="0"
        sizes="100vw"
        className="w-[280px] h-auto"
        unoptimized
      />
      <span className="text-xs opacity-30 text-white">
        <BaseFooter.Copyright
          className="inline text-xs"
          by={translate("by")}
          year={2024}
        />{" "}
        {translate("copyright")}
        <br />
        {translate("trademark")}{" "}
        <BaseFooter.Copyright className="inline text-xs" by={translate("riotGamesBy")} />
      </span>
    </BaseFooter>
  );
});
