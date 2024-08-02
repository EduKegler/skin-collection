"use client";

import { memo, useMemo } from "react";
import { Dropdown } from "flowbite-react";
import { useFilter, useFilterDispatch } from "@/providers/FilterProvider";
import { PrimaryButton } from "../PrimaryButton";
import { FaAngleDown } from "react-icons/fa";

export const LegacySkinFilter = memo(function LegacySkinFilter() {
  const { legacyFilter } = useFilter();
  const { setLegacyFilter } = useFilterDispatch();

  const labels = useMemo(() => {
    return {
      All: "All",
      OnlyLegacy: "Only Legacy",
      OnlyNonLegacy: "Only Non Legacy",
    };
  }, []);

  return (
    <div className="flex gap-4 items-center">
      <span>Legacy: </span>
      <Dropdown
        label={labels[legacyFilter as keyof typeof labels]}
        renderTrigger={() => (
          <div className="relative">
            <PrimaryButton>
              <div className="flex gap-2 items-center">
                {labels[legacyFilter as keyof typeof labels]} <FaAngleDown />
              </div>
            </PrimaryButton>
          </div>
        )}
      >
        <Dropdown.Item onClick={() => setLegacyFilter("All")}>
          {labels["All"]}
        </Dropdown.Item>
        <Dropdown.Divider />
        <Dropdown.Item onClick={() => setLegacyFilter("OnlyLegacy")}>
          {labels["OnlyLegacy"]}
        </Dropdown.Item>
        <Dropdown.Item onClick={() => setLegacyFilter("OnlyNonLegacy")}>
          {labels["OnlyNonLegacy"]}
        </Dropdown.Item>
      </Dropdown>
    </div>
  );
});
