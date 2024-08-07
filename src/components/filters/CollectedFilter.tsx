"use client";

import {
  useUserPreference,
  useUserPreferenceDispatch,
} from "@/providers/UserPreferenceProvider";
import { Button } from "flowbite-react";
import { memo } from "react";

export const CollectedFilter = memo(function CollectedFilter() {
  const { collectFilter } = useUserPreference();
  const { handleUpdateCollectFilter } = useUserPreferenceDispatch();

  const className =
    "bg-gradient-to-br from-[#785a28] to-[#c89b3c] font-bold focus:ring-1 focus:ring-pink-200 enabled:hover:bg-gradient-to-bl dark:focus:ring-pink-800";
  return (
    <Button.Group>
      <Button
        className={collectFilter === "All" ? className : undefined}
        color={"gray"}
        size={"xs"}
        onClick={() => handleUpdateCollectFilter("All")}
      >
        ALL
      </Button>
      <Button
        className={collectFilter === "Collect" ? className : undefined}
        color={"gray"}
        size={"xs"}
        onClick={() => handleUpdateCollectFilter("Collect")}
      >
        COLLECT
      </Button>
      <Button
        className={collectFilter === "Uncollect" ? className : undefined}
        color={"gray"}
        size={"xs"}
        onClick={() => handleUpdateCollectFilter("Uncollect")}
      >
        UNCOLLECT
      </Button>
    </Button.Group>
  );
});
