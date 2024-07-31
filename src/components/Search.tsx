"use client";

import { useFilter, useFilterDispatch } from "@/providers/FilterProvider";
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
    <form className="flex items-center w-full flex-2">
      <label htmlFor="voice-search" className="sr-only">
        Search
      </label>
      <div className="w-full">
        <input
          type="text"
          onChange={handleSearch}
          value={search}
          className=" text-sm rounded-lg block w-full p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
          placeholder="Search Skins..."
          required
        />
      </div>
    </form>
  );
});
