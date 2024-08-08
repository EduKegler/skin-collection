"use client";

import { updateLanguage } from "@/actions/language";
import { ICollectFilter, ILanguage, ILegacyFilter, IOrderBy, ITierFilter } from "@/type";

import {
  createContext,
  Dispatch,
  memo,
  ReactElement,
  ReactNode,
  SetStateAction,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";

type UserPreferenceProviderProps = {
  children?: ReactNode;
  defaultLanguage: ILanguage;
};

type UserPreferenceContextType = {
  language: ILanguage;
  search: string;
  collectFilter: ICollectFilter;
  tierFilter: ITierFilter;
  legacyFilter: ILegacyFilter;
  orderBy: IOrderBy;
  filtersChanged: boolean;
};

const UserPreferenceContext = createContext<UserPreferenceContextType>({
  language: "en_US",
  search: "",
  collectFilter: "All",
  tierFilter: "All",
  legacyFilter: "All",
  orderBy: "ReleaseDate",
  filtersChanged: false,
});

type UserPreferenceDispatchContextType = {
  handleUpdateLanguage: (value: ILanguage) => void;
  setSearch: Dispatch<SetStateAction<string>>;
  handleUpdateCollectFilter: (value: ICollectFilter) => void;
  handleUpdateTierFilter: (value: ITierFilter) => void;
  handleUpdateLegacyFilter: (value: ILegacyFilter) => void;
  handleUpdateOrderBy: (value: IOrderBy) => void;
  clearFilter: () => void;
};

const UserPreferenceDispatchContext = createContext<UserPreferenceDispatchContextType>({
  handleUpdateLanguage: () => {},
  setSearch: () => {},
  handleUpdateCollectFilter: () => {},
  handleUpdateTierFilter: () => {},
  handleUpdateLegacyFilter: () => {},
  handleUpdateOrderBy: () => {},
  clearFilter: () => {},
});

export const UserPreferenceProvider = memo(function UserPreferenceProvider({
  children,
  defaultLanguage,
}: UserPreferenceProviderProps): ReactElement {
  const [language, setLanguage] = useState<ILanguage>(defaultLanguage);
  const [search, setSearch] = useState<string>("");
  const [collectFilter, setCollectFilter] = useState<ICollectFilter>("All");
  const [tierFilter, setTierFilter] = useState<ITierFilter>("All");
  const [legacyFilter, setLegacyFilter] = useState<ILegacyFilter>("All");
  const [orderBy, setOrderBy] = useState<IOrderBy>("ReleaseDate");

  const filtersChanged = useMemo(
    () =>
      search !== "" ||
      collectFilter !== "All" ||
      tierFilter !== "All" ||
      legacyFilter !== "All" ||
      orderBy !== "ReleaseDate",
    [collectFilter, legacyFilter, orderBy, search, tierFilter],
  );

  const handleUpdateLanguage = useCallback((value: ILanguage) => {
    setLanguage(value);
    updateLanguage(value);
  }, []);

  const handleUpdateCollectFilter = useCallback((value: ICollectFilter) => {
    setCollectFilter(value);
    // updateCollectFilter(value);
  }, []);

  const handleUpdateTierFilter = useCallback((value: ITierFilter) => {
    setTierFilter(value);
    // updateTierFilter(value);
  }, []);

  const handleUpdateLegacyFilter = useCallback((value: ILegacyFilter) => {
    setLegacyFilter(value);
    // updateLegacyFilter(value);
  }, []);

  const handleUpdateOrderBy = useCallback((value: IOrderBy) => {
    setOrderBy(value);
    // updateOrderBy(value);
  }, []);

  const clearFilter = useCallback(() => {
    setCollectFilter("All");
    setTierFilter("All");
    setLegacyFilter("All");
    setOrderBy("ReleaseDate");
  }, []);

  const UserPreferenceMemo = useMemo(() => {
    return {
      search,
      language,
      collectFilter,
      tierFilter,
      legacyFilter,
      orderBy,
      filtersChanged,
    };
  }, [
    collectFilter,
    filtersChanged,
    language,
    legacyFilter,
    orderBy,
    search,
    tierFilter,
  ]);

  const UserPreferenceDispatchMemo = useMemo(() => {
    return {
      handleUpdateLanguage,
      setSearch,
      handleUpdateCollectFilter,
      handleUpdateTierFilter,
      handleUpdateLegacyFilter,
      handleUpdateOrderBy,
      clearFilter,
    };
  }, [
    handleUpdateCollectFilter,
    handleUpdateLanguage,
    handleUpdateLegacyFilter,
    handleUpdateOrderBy,
    handleUpdateTierFilter,
    clearFilter,
  ]);

  return (
    <UserPreferenceDispatchContext.Provider value={UserPreferenceDispatchMemo}>
      <UserPreferenceContext.Provider value={UserPreferenceMemo}>
        {children}
      </UserPreferenceContext.Provider>
    </UserPreferenceDispatchContext.Provider>
  );
});

export const useUserPreference = () => {
  const context = useContext(UserPreferenceContext);
  return context;
};

export const useUserPreferenceDispatch = () => {
  const context = useContext(UserPreferenceDispatchContext);
  return context;
};
