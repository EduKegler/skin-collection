"use client";

import {
  useUserPreference,
  useUserPreferenceDispatch,
} from "@/providers/UserPreferenceProvider";
import { CustomFlowbiteTheme, TextInput } from "flowbite-react";
import { useTranslations } from "next-intl";
import React, { ChangeEvent, memo, useCallback } from "react";

const customTheme: CustomFlowbiteTheme["textInput"] = {
  field: {
    input: {
      colors: {
        gray: "border-gray-300 text-gray-900 focus:border-cyan-500 focus:ring-cyan-500 dark:border-gray-600 dark:text-white dark:placeholder-gray-400 dark:focus:border-cyan-500 dark:focus:ring-cyan-500 bg-transparent",
      },
    },
  },
};

export const Search = memo(function Search() {
  const { search } = useUserPreference();
  const { setSearch } = useUserPreferenceDispatch();

  const translate = useTranslations("Search");

  const handleSearch = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      setSearch(e.target.value);
    },
    [setSearch],
  );

  return (
    <TextInput
      theme={customTheme}
      width={"100%"}
      id="small"
      type="text"
      sizing="sm"
      placeholder={translate("placeholder")}
      value={search}
      onChange={handleSearch}
      className="w-[280px]"
    />
  );
});
