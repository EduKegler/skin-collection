"use client";

import { memo, ReactNode, useMemo } from "react";
import { Dropdown } from "flowbite-react";
import { SkinTier } from "../SkinTier";
import { ISkinTier, ITierFilter } from "@/type";
import { FaAngleDown } from "react-icons/fa";
import {
  useUserPreference,
  useUserPreferenceDispatch,
} from "@/providers/UserPreferenceProvider";
import { useTranslations } from "next-intl";
import { SecondaryButton } from "../SecondaryButton";

export const TierFilter = memo(function TierFilter() {
  const { tierFilter } = useUserPreference();
  const { handleUpdateTierFilter } = useUserPreferenceDispatch();
  const translate = useTranslations("TierFilter");

  const labels: Record<ITierFilter, ReactNode> = useMemo(() => {
    return {
      All: <TierFilterOption type={"All"} />,
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
    <div className="flex gap-2 items-center">
      <span>{translate("title")}</span>
      <Dropdown
        label={labels[tierFilter as keyof typeof labels]}
        renderTrigger={() => (
          <div className="relative">
            <SecondaryButton>
              <div className="flex gap-2 items-center">
                {labels[tierFilter as keyof typeof labels]} <FaAngleDown />
              </div>
            </SecondaryButton>
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
  const translate = useTranslations("TierFilterOption");
  if (type === "All") return <>{translate(type.toLowerCase())}</>;
  return (
    <div className="flex gap-2">
      <SkinTier tier={type} /> {translate(type.toLowerCase())}
    </div>
  );
});
