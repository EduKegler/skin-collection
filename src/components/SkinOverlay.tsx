"use client";
import { memo } from "react";
import clsx from "clsx";
import { useTranslations } from "next-intl";

type SkinOverlayProps = {
  isLoading: boolean;
  isConnected: boolean;
  isCollected: boolean;
};
export const SkinOverlay = memo(function SkinOverlay({
  isLoading,
  isConnected,
  isCollected,
}: SkinOverlayProps) {
  const translate = useTranslations("SkinOverlay");

  const className =
    "bg-opacity-80 opacity-0 w-[154px] h-[280px] absolute top-0 left-0 flex items-center justify-center transition-opacity duration-300 rounded-b-md";

  if (isLoading) {
    return (
      <div className={clsx(className, "bg-gray-900", "opacity-100")}>
        <span className="text-sm font-bold">{translate("loading")}</span>
      </div>
    );
  }

  if (!isConnected) {
    return (
      <div className={clsx(className, "bg-gray-800", "group-hover:opacity-100")}>
        <span className="text-sm font-bold">
          <span className="underline">{translate("signin")}</span>
          <span>{translate("track")}</span>
        </span>
      </div>
    );
  }

  return (
    <div
      className={clsx(
        className,
        isCollected ? "bg-red-800" : "bg-green-800",
        "group-hover:opacity-100",
      )}
    >
      <span className="text-sm font-bold">
        {isCollected ? translate("uncollected") : translate("collected")}
      </span>
    </div>
  );
});
