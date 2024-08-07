"use client";

import { memo, ReactNode, useMemo } from "react";
import { Dropdown } from "flowbite-react";
import { SkinTier } from "../SkinTier";
import { ISkinTier, ITierFilter } from "@/type";
import { PrimaryButton } from "../PrimaryButton";
import { FaAngleDown } from "react-icons/fa";
import {
  useUserPreference,
  useUserPreferenceDispatch,
} from "@/providers/UserPreferenceProvider";

export const TierFilter = memo(function TierFilter() {
  const { tierFilter } = useUserPreference();
  const { handleUpdateTierFilter } = useUserPreferenceDispatch();

  const labels: Record<ITierFilter, ReactNode> = useMemo(() => {
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
      None: null,
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
        <Dropdown.Item onClick={() => handleUpdateTierFilter("All")}>
          {labels["All"]}
        </Dropdown.Item>
        <Dropdown.Divider />
        <Dropdown.Item onClick={() => handleUpdateTierFilter("Transcendent")}>
          {labels["Transcendent"]}
        </Dropdown.Item>
        <Dropdown.Item onClick={() => handleUpdateTierFilter("Ultimate")}>
          {labels["Ultimate"]}
        </Dropdown.Item>
        <Dropdown.Item onClick={() => handleUpdateTierFilter("Mythic")}>
          {labels["Mythic"]}
        </Dropdown.Item>
        <Dropdown.Item onClick={() => handleUpdateTierFilter("Legendary")}>
          {labels["Legendary"]}
        </Dropdown.Item>
        <Dropdown.Item onClick={() => handleUpdateTierFilter("Epic")}>
          {labels["Epic"]}
        </Dropdown.Item>
        <Dropdown.Item onClick={() => handleUpdateTierFilter("Standard")}>
          {labels["Standard"]}
        </Dropdown.Item>
        <Dropdown.Item onClick={() => handleUpdateTierFilter("Budget")}>
          {labels["Budget"]}
        </Dropdown.Item>
        <Dropdown.Item onClick={() => handleUpdateTierFilter("Timeworn")}>
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
