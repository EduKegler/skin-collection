"use client";
import { memo } from "react";
import { Footer as BaseFooter } from "flowbite-react";
import { useTranslations } from "next-intl";

export const Footer = memo(function Footer() {
  const translate = useTranslations("Footer");
  return (
    <BaseFooter
      container
      className="dark:bg-transparent shadow-none px-0 pb-0 opacity-50"
    >
      <span className="text-xs">
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
