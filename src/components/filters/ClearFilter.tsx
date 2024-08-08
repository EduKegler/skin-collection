"use client";
import { memo } from "react";
import { PrimaryButton } from "../PrimaryButton";
import {
  useUserPreference,
  useUserPreferenceDispatch,
} from "@/providers/UserPreferenceProvider";
import { useTranslations } from "next-intl";

export const ClearFilter = memo(function ClearFilter() {
  const { filtersChanged } = useUserPreference();
  const { clearFilter } = useUserPreferenceDispatch();
  const translate = useTranslations("ClearFilter");
  return (
    <PrimaryButton disabled={!filtersChanged} onClick={clearFilter}>
      {translate("clear")}
    </PrimaryButton>
  );
});
