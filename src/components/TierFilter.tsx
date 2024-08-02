"use client";

import { memo, useMemo } from "react";
import { Dropdown } from "flowbite-react";
import { SkinTier } from "./SkinTier";
import { useFilter, useFilterDispatch } from "@/providers/FilterProvider";
import { ISkinTier } from "@/type";
import { PrimaryButton } from "./PrimaryButton";
import { FaAngleDown } from "react-icons/fa";

export const TierFilter = memo(function TierFilter() {
  const { tierFilter } = useFilter();
  const { setTierFilter } = useFilterDispatch();

  const labels = useMemo(() => {
    return {
      All: "All",
      Transcendent: <TierFilterOption type={"Transcendent"} />,
      Ultimate: <TierFilterOption type={"Ultimate"} />,
      Mythic: <TierFilterOption type={"Mythic"} />,
      Legendary: <TierFilterOption type={"Legendary"} />,
      Epic: <TierFilterOption type={"Epic"} />,
      Standard: <TierFilterOption type={"Standard"} />,
      Budget: <TierFilterOption type={"Budget"} />,
      Timeworn: <TierFilterOption type={"Timeworn"} />,
    };
  }, []);

  return (
    <div className="flex gap-4 items-center">
      <span>Tier: </span>
      <Dropdown
        label={labels[tierFilter as keyof typeof labels]}
        renderTrigger={() => (
          <div className="relative">
            <PrimaryButton>
              <div className="flex gap-2 items-center">
                {labels[tierFilter as keyof typeof labels]} <FaAngleDown />
              </div>
            </PrimaryButton>
          </div>
        )}
      >
        <Dropdown.Item onClick={() => setTierFilter("All")}>
          {labels["All"]}
        </Dropdown.Item>
        <Dropdown.Divider />
        <Dropdown.Item onClick={() => setTierFilter("Transcendent")}>
          {labels["Transcendent"]}
        </Dropdown.Item>
        <Dropdown.Item onClick={() => setTierFilter("Ultimate")}>
          {labels["Ultimate"]}
        </Dropdown.Item>
        <Dropdown.Item onClick={() => setTierFilter("Mythic")}>
          {labels["Mythic"]}
        </Dropdown.Item>
        <Dropdown.Item onClick={() => setTierFilter("Legendary")}>
          {labels["Legendary"]}
        </Dropdown.Item>
        <Dropdown.Item onClick={() => setTierFilter("Epic")}>
          {labels["Epic"]}
        </Dropdown.Item>
        <Dropdown.Item onClick={() => setTierFilter("Standard")}>
          {labels["Standard"]}
        </Dropdown.Item>
        <Dropdown.Item onClick={() => setTierFilter("Budget")}>
          {labels["Budget"]}
        </Dropdown.Item>
        <Dropdown.Item onClick={() => setTierFilter("Timeworn")}>
          {labels["Timeworn"]}
        </Dropdown.Item>
      </Dropdown>
    </div>
  );
});

export const TierFilterOption = memo(function TierFilterOption({
  type,
}: {
  type: ISkinTier | "All";
}) {
  if (type === "All") return <>{type}</>;
  return (
    <div className="flex gap-2">
      <SkinTier tier={type} /> {type}
    </div>
  );
});
