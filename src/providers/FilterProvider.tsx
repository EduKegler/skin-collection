"use client";

import { ICollectFilter, ISkinTier } from "@/type";
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
  tierFilter: ISkinTier | "All";
};

const FilterContext = createContext<FilterContextType>({
  search: "",
  collectFilter: "All",
  tierFilter: "All",
});

type FilterDispatchContextType = {
  setSearch: Dispatch<SetStateAction<string>>;
  setCollectFilter: Dispatch<SetStateAction<ICollectFilter>>;
  setTierFilter: Dispatch<SetStateAction<ISkinTier | "All">>;
};
const FilterDispatchContext = createContext<FilterDispatchContextType>({
  setSearch: () => {},
  setCollectFilter: () => {},
  setTierFilter: () => {},
});

export const FilterProvider = memo(function FilterProvider(
  props: FilterProviderProps,
): ReactElement {
  const [search, setSearch] = useState<string>("");
  const [collectFilter, setCollectFilter] = useState<ICollectFilter>("All");
  const [tierFilter, setTierFilter] = useState<ISkinTier | "All">("All");

  const filterMemo = useMemo(() => {
    return {
      search,
      collectFilter,
      tierFilter,
    };
  }, [collectFilter, search, tierFilter]);

  const filterDispatchMemo = useMemo(() => {
    return {
      setSearch,
      setCollectFilter,
      setTierFilter,
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
