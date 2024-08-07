"use client";

import { memo, ReactNode, useMemo } from "react";
import { Dropdown } from "flowbite-react";
import { PrimaryButton } from "../PrimaryButton";
import { FaAngleDown } from "react-icons/fa";
import {
  useUserPreference,
  useUserPreferenceDispatch,
} from "@/providers/UserPreferenceProvider";
import { ILegacyFilter } from "@/type";
import { useTranslations } from "next-intl";

export const LegacySkinFilter = memo(function LegacySkinFilter() {
  const { legacyFilter } = useUserPreference();
  const { handleUpdateLegacyFilter } = useUserPreferenceDispatch();

  const translate = useTranslations("LegacySkinFilter");

  const labels: Record<ILegacyFilter, ReactNode> = useMemo(() => {
    return {
      All: translate("all"),
      OnlyLegacy: translate("onlyLegacy"),
      OnlyNonLegacy: translate("onlyNonLegacy"),
    };
  }, [translate]);

  return (
    <div className="flex gap-4 items-center">
      <span>{translate("title")}</span>
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
        <Dropdown.Item onClick={() => handleUpdateLegacyFilter("All")}>
          {labels["All"]}
        </Dropdown.Item>
        <Dropdown.Divider />
        <Dropdown.Item onClick={() => handleUpdateLegacyFilter("OnlyLegacy")}>
          {labels["OnlyLegacy"]}
        </Dropdown.Item>
        <Dropdown.Item onClick={() => handleUpdateLegacyFilter("OnlyNonLegacy")}>
          {labels["OnlyNonLegacy"]}
        </Dropdown.Item>
      </Dropdown>
    </div>
  );
});
