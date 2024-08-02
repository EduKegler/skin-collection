"use client";

import { useFilter, useFilterDispatch } from "@/providers/FilterProvider";
import { Button } from "flowbite-react";
import { memo } from "react";

export const CollectedFilter = memo(function CollectedFilter() {
  const { collectFilter } = useFilter();
  const { setCollectFilter } = useFilterDispatch();

  const className = "bg-gradient-to-br from-[#785a28] to-[#c89b3c]";
  return (
    <Button.Group>
      <Button
        className={collectFilter === "All" ? className : undefined}
        color={"gray"}
        onClick={() => setCollectFilter("All")}
      >
        ALL
      </Button>
      <Button
        className={collectFilter === "Collect" ? className : undefined}
        color={"gray"}
        onClick={() => setCollectFilter("Collect")}
      >
        COLLECT
      </Button>
      <Button
        className={collectFilter === "Uncollect" ? className : undefined}
        color={"gray"}
        onClick={() => setCollectFilter("Uncollect")}
      >
        UNCOLLECT
      </Button>
    </Button.Group>
  );
});
