"use client";

import { memo, ReactNode, useMemo } from "react";
import { Dropdown } from "flowbite-react";
import { FaAngleDown } from "react-icons/fa";
import {
  useUserPreference,
  useUserPreferenceDispatch,
} from "@/providers/UserPreferenceProvider";
import { ILegacyFilter } from "@/type";
import { useTranslations } from "next-intl";
import { SecondaryButton } from "../SecondaryButton";

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
    <div className="flex gap-2 items-center">
      <span>{translate("title")}</span>
      <Dropdown
        label={labels[legacyFilter as keyof typeof labels]}
        renderTrigger={() => (
          <div className="relative">
            <SecondaryButton>
              <div className="flex gap-2 items-center">
                {labels[legacyFilter as keyof typeof labels]} <FaAngleDown />
              </div>
            </SecondaryButton>
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
