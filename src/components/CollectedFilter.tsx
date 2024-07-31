"use client";

import { useFilter, useFilterDispatch } from "@/providers/FilterProvider";
import { Button } from "flowbite-react";
import { memo } from "react";

export const CollectedFilter = memo(function CollectedFilter() {
  const { collectFilter } = useFilter();
  const { setCollectFilter } = useFilterDispatch();

  return (
    <Button.Group>
      <Button
        color={collectFilter === "All" ? undefined : "gray"}
        onClick={() => setCollectFilter("All")}
      >
        All
      </Button>
      <Button
        color={collectFilter === "Collect" ? undefined : "gray"}
        onClick={() => setCollectFilter("Collect")}
      >
        Collect
      </Button>
      <Button
        color={collectFilter === "Uncollect" ? undefined : "gray"}
        onClick={() => setCollectFilter("Uncollect")}
      >
        Uncollect
      </Button>
    </Button.Group>
  );
});
