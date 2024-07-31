"use client";

import { useFilter, useFilterDispatch } from "@/providers/FilterProvider";
import clsx from "clsx";
import { memo, useCallback } from "react";

export const CollectedFilter = memo(function CollectedFilter() {
  const { collectFilter } = useFilter();
  const { setCollectFilter } = useFilterDispatch();
  const handleChangeAll = useCallback(() => {
    setCollectFilter("All");
  }, [setCollectFilter]);
  const handleChangeCollected = useCallback(() => {
    setCollectFilter("Collect");
  }, [setCollectFilter]);
  const handleChangeUncollected = useCallback(() => {
    setCollectFilter("Uncollect");
  }, [setCollectFilter]);

  const buttonClassname = "px-4 py-2 text-sm font-medium text-white border-gray-900";

  return (
    <div className="inline-flex rounded-md shadow-sm" role="group">
      <button
        type="button"
        onClick={handleChangeAll}
        className={clsx(
          buttonClassname,
          "border rounded-s-lg",
          collectFilter === "All" ? "bg-blue-700" : " bg-gray-700",
        )}
      >
        All
      </button>
      <button
        type="button"
        onClick={handleChangeCollected}
        className={clsx(
          buttonClassname,
          "border-t border-b ",
          collectFilter === "Collect" ? "bg-blue-700" : " bg-gray-700",
        )}
      >
        Collected
      </button>
      <button
        type="button"
        onClick={handleChangeUncollected}
        className={clsx(
          buttonClassname,
          "border rounded-e-lg",
          collectFilter === "Uncollect" ? "bg-blue-700" : " bg-gray-700",
        )}
      >
        Uncollected
      </button>
    </div>
  );
});
