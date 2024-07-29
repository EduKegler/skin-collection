"use client";

import React, { ChangeEvent, Dispatch, memo, useCallback } from "react";

type SearchProps = {
  setSearch: Dispatch<React.SetStateAction<string>>;
  search: string;
};
export const Search = memo(function Search({ search, setSearch }: SearchProps) {
  const handleSearch = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      setSearch(e.target.value);
    },
    [setSearch]
  );
  return (
    <form className="flex items-center pb-4">
      <label htmlFor="voice-search" className="sr-only">
        Search
      </label>
      <div className="w-full">
        <input
          type="text"
          onChange={handleSearch}
          value={search}
          id="voice-search"
          className=" text-sm rounded-lg block w-full p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
          placeholder="Search Champions..."
          required
        />
      </div>
    </form>
  );
});
