"use client";

import {
  useUserPreference,
  useUserPreferenceDispatch,
} from "@/providers/UserPreferenceProvider";
import clsx from "clsx";
import { Button } from "flowbite-react";
import { useTranslations } from "next-intl";
import { memo } from "react";

export const CollectedFilter = memo(function CollectedFilter() {
  const { collectFilter } = useUserPreference();
  const { handleUpdateCollectFilter } = useUserPreferenceDispatch();
  const translate = useTranslations("CollectedFilter");

  const className = clsx(
    "bg-gradient-to-br from-[#785a28] to-[#c89b3c] font-bold focus:ring-1 focus:ring-pink-200 enabled:hover:bg-gradient-to-bl dark:focus:ring-pink-800 uppercase",
  );

  const defaultClassName = clsx("uppercase");

  return (
    <Button.Group className="">
      <Button
        className={collectFilter === "All" ? className : defaultClassName}
        color={"gray"}
        size={"xs"}
        onClick={() => handleUpdateCollectFilter("All")}
      >
        {translate("all")}
      </Button>
      <Button
        className={collectFilter === "Collect" ? className : defaultClassName}
        color={"gray"}
        size={"xs"}
        onClick={() => handleUpdateCollectFilter("Collect")}
      >
        {translate("collect")}
      </Button>
      <Button
        className={collectFilter === "Uncollect" ? className : defaultClassName}
        color={"gray"}
        size={"xs"}
        onClick={() => handleUpdateCollectFilter("Uncollect")}
      >
        {translate("uncollect")}
      </Button>
    </Button.Group>
  );
});
