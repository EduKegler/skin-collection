"use client";

import { ICollectFilter } from "@/type";
import {
  createContext,
  Dispatch,
  memo,
  ReactElement,
  ReactNode,
  SetStateAction,
  useContext,
  useMemo,
  useState,
} from "react";

type FilterProviderProps = { children?: ReactNode };

type FilterContextType = {
  search: string;
  collectFilter: ICollectFilter;
};

const FilterContext = createContext<FilterContextType>({
  search: "",
  collectFilter: "All",
});

type FilterDispatchContextType = {
  setSearch: Dispatch<SetStateAction<string>>;
  setCollectFilter: Dispatch<SetStateAction<ICollectFilter>>;
};
const FilterDispatchContext = createContext<FilterDispatchContextType>({
  setSearch: () => {},
  setCollectFilter: () => {},
});

export const FilterProvider = memo(function FilterProvider(
  props: FilterProviderProps,
): ReactElement {
  const [search, setSearch] = useState<string>("");
  const [collectFilter, setCollectFilter] = useState<ICollectFilter>("All");

  const filterMemo = useMemo(() => {
    return {
      search,
      collectFilter,
    };
  }, [collectFilter, search]);

  const filterDispatchMemo = useMemo(() => {
    return {
      setSearch,
      setCollectFilter,
    };
  }, [setCollectFilter, setSearch]);

  return (
    <FilterDispatchContext.Provider value={filterDispatchMemo}>
      <FilterContext.Provider value={filterMemo}>{props.children}</FilterContext.Provider>
    </FilterDispatchContext.Provider>
  );
});

export const useFilter = () => {
  const context = useContext(FilterContext);
  return context;
};

export const useFilterDispatch = () => {
  const context = useContext(FilterDispatchContext);
  return context;
};
