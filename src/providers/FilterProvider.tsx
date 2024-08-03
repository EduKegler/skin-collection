"use client";

import { ICollectFilter, ILegacyFilter, IOrderBy, ISkinTier } from "@/type";
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
  legacyFilter: ILegacyFilter;
  orderBy: IOrderBy;
};

const FilterContext = createContext<FilterContextType>({
  search: "",
  collectFilter: "All",
  tierFilter: "All",
  legacyFilter: "All",
  orderBy: "ReleaseDate",
});

type FilterDispatchContextType = {
  setSearch: Dispatch<SetStateAction<string>>;
  setCollectFilter: Dispatch<SetStateAction<ICollectFilter>>;
  setTierFilter: Dispatch<SetStateAction<ISkinTier | "All">>;
  setLegacyFilter: Dispatch<SetStateAction<ILegacyFilter>>;
  setOrderBy: Dispatch<SetStateAction<IOrderBy>>;
};
const FilterDispatchContext = createContext<FilterDispatchContextType>({
  setSearch: () => {},
  setCollectFilter: () => {},
  setTierFilter: () => {},
  setLegacyFilter: () => {},
  setOrderBy: () => {},
});

export const FilterProvider = memo(function FilterProvider(
  props: FilterProviderProps,
): ReactElement {
  const [search, setSearch] = useState<string>("");
  const [collectFilter, setCollectFilter] = useState<ICollectFilter>("All");
  const [tierFilter, setTierFilter] = useState<ISkinTier | "All">("All");
  const [legacyFilter, setLegacyFilter] = useState<ILegacyFilter>("All");
  const [orderBy, setOrderBy] = useState<IOrderBy>("ReleaseDate");

  const filterMemo = useMemo(() => {
    return {
      search,
      collectFilter,
      tierFilter,
      legacyFilter,
      orderBy,
    };
  }, [collectFilter, legacyFilter, orderBy, search, tierFilter]);

  const filterDispatchMemo = useMemo(() => {
    return {
      setSearch,
      setCollectFilter,
      setTierFilter,
      setLegacyFilter,
      setOrderBy,
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
