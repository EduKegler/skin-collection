"use client";

import {
  useUserPreference,
  useUserPreferenceDispatch,
} from "@/providers/UserPreferenceProvider";
import { CustomFlowbiteTheme, TextInput } from "flowbite-react";
import { useTranslations } from "next-intl";
import React, { ChangeEvent, memo, useCallback } from "react";
import { MdClear } from "react-icons/md";
import { SecondaryButton } from "../SecondaryButton";

const customTheme: CustomFlowbiteTheme["textInput"] = {
  field: {
    input: {
      base: "block w-full border disabled:cursor-not-allowed disabled:opacity-50 h-full rounded-r-none",
      colors: {
        gray: "border-gray-300 text-gray-900 focus:border-cyan-500 focus:ring-cyan-500 dark:border-gray-600 dark:text-white dark:placeholder-gray-400 dark:focus:border-cyan-500 dark:focus:ring-cyan-500 bg-transparent",
      },
      withAddon: {
        off: "rounded-lg rounded-r-none",
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
    <div className="flex w-[280px]">
      <TextInput
        theme={customTheme}
        id="small"
        type="text"
        sizing="sm"
        placeholder={translate("placeholder")}
        value={search}
        onChange={handleSearch}
        className="w-full"
      />
      <SecondaryButton
        onClick={() => setSearch("")}
        size={"xs"}
        className="rounded-l-none flex justify-center items-center border-l-0"
      >
        <MdClear className="h-4 w-4" />
      </SecondaryButton>
    </div>
  );
});
