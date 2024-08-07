"use client";

import {
  useUserPreference,
  useUserPreferenceDispatch,
} from "@/providers/UserPreferenceProvider";
import { TextInput } from "flowbite-react";
import React, { ChangeEvent, memo, useCallback } from "react";

export const Search = memo(function Search() {
  const { search } = useUserPreference();
  const { setSearch } = useUserPreferenceDispatch();

  const handleSearch = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      setSearch(e.target.value);
    },
    [setSearch],
  );

  return (
    <TextInput
      width={"100%"}
      id="small"
      type="text"
      sizing="sm"
      placeholder="Search Skins..."
      value={search}
      onChange={handleSearch}
      className="w-[280px]"
    />
  );
});
