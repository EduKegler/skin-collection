"use client";
import { useTranslations } from "next-intl";
import { memo } from "react";

export const NoData = memo(function NoData() {
  const translate = useTranslations("NoData");

  return (
    <div className="flex flex-auto justify-center">
      <div className="flex flex-col justify-center items-center gap-4">
        <h2 className="text-7xl text-lol-gold">{translate("title")}</h2>
        <p className="text-lg">{translate("description")}</p>
      </div>
    </div>
  );
});
