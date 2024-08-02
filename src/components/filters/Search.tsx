"use client";

import { useFilter, useFilterDispatch } from "@/providers/FilterProvider";
import { FloatingLabel } from "flowbite-react";
import React, { ChangeEvent, memo, useCallback } from "react";

export const Search = memo(function Search() {
  const { search } = useFilter();
  const { setSearch } = useFilterDispatch();

  const handleSearch = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      setSearch(e.target.value);
    },
    [setSearch],
  );

  return (
    <FloatingLabel
      sizing="sm"
      variant="outlined"
      label="Search Skins..."
      value={search}
      onChange={handleSearch}
    />
  );
});
