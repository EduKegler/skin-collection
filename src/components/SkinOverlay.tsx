"use client";
import { memo } from "react";
import clsx from "clsx";

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
  if (isLoading) {
    return (
      <div
        className={clsx(
          "bg-opacity-80 opacity-0 w-[154px] h-[280px] absolute top-0 left-0 flex items-center justify-center transition-opacity duration-300 rounded-b-md",
          "bg-gray-900",
          "group-hover:opacity-100",
        )}
      >
        <span className="text-sm font-bold">Loading</span>
      </div>
    );
  }

  if (!isConnected) {
    return (
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
    );
  }

  return (
    <div
      className={clsx(
        "bg-opacity-80 opacity-0 w-[154px] h-[280px] absolute top-0 left-0 flex items-center justify-center transition-opacity duration-300 rounded-b-md",
        isCollected ? "bg-red-800" : "bg-green-800",
        "group-hover:opacity-100",
      )}
    >
      <span className="text-sm font-bold">
        {isCollected ? "Uncollected?" : "Collected?"}
      </span>
    </div>
  );
});
