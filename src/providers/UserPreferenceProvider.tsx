"use client";

import {
  updateCollectFilter,
  updateLegacyFilter,
  updateOrderBy,
  updateTierFilter,
} from "@/actions/filter";
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
  defaultCollectFilter: ICollectFilter;
  defaultTierFilter: ITierFilter;
  deafultLegacyFilter: ILegacyFilter;
  defaultOrderBy: IOrderBy;
};

type UserPreferenceContextType = {
  language: ILanguage;
  search: string;
  collectFilter: ICollectFilter;
  tierFilter: ITierFilter;
  legacyFilter: ILegacyFilter;
  orderBy: IOrderBy;
};

const UserPreferenceContext = createContext<UserPreferenceContextType>({
  language: "en_US",
  search: "",
  collectFilter: "All",
  tierFilter: "All",
  legacyFilter: "All",
  orderBy: "ReleaseDate",
});

type UserPreferenceDispatchContextType = {
  handleUpdateLanguage: (value: ILanguage) => void;
  setSearch: Dispatch<SetStateAction<string>>;
  handleUpdateCollectFilter: (value: ICollectFilter) => void;
  handleUpdateTierFilter: (value: ITierFilter) => void;
  handleUpdateLegacyFilter: (value: ILegacyFilter) => void;
  handleUpdateOrderBy: (value: IOrderBy) => void;
};

const UserPreferenceDispatchContext = createContext<UserPreferenceDispatchContextType>({
  handleUpdateLanguage: () => {},
  setSearch: () => {},
  handleUpdateCollectFilter: () => {},
  handleUpdateTierFilter: () => {},
  handleUpdateLegacyFilter: () => {},
  handleUpdateOrderBy: () => {},
});

export const UserPreferenceProvider = memo(function UserPreferenceProvider({
  defaultLanguage,
  defaultCollectFilter,
  defaultTierFilter,
  deafultLegacyFilter,
  defaultOrderBy,
  children,
}: UserPreferenceProviderProps): ReactElement {
  const [language, setLanguage] = useState<ILanguage>(defaultLanguage);
  const [search, setSearch] = useState<string>("");
  const [collectFilter, setCollectFilter] =
    useState<ICollectFilter>(defaultCollectFilter);
  const [tierFilter, setTierFilter] = useState<ITierFilter>(defaultTierFilter);
  const [legacyFilter, setLegacyFilter] = useState<ILegacyFilter>(deafultLegacyFilter);
  const [orderBy, setOrderBy] = useState<IOrderBy>(defaultOrderBy);

  const handleUpdateLanguage = useCallback((value: ILanguage) => {
    setLanguage(value);
    updateLanguage(value);
  }, []);

  const handleUpdateCollectFilter = useCallback((value: ICollectFilter) => {
    setCollectFilter(value);
    updateCollectFilter(value);
  }, []);

  const handleUpdateTierFilter = useCallback((value: ITierFilter) => {
    setTierFilter(value);
    updateTierFilter(value);
  }, []);

  const handleUpdateLegacyFilter = useCallback((value: ILegacyFilter) => {
    setLegacyFilter(value);
    updateLegacyFilter(value);
  }, []);

  const handleUpdateOrderBy = useCallback((value: IOrderBy) => {
    setOrderBy(value);
    updateOrderBy(value);
  }, []);

  const UserPreferenceMemo = useMemo(() => {
    return {
      search,
      language,
      collectFilter,
      tierFilter,
      legacyFilter,
      orderBy,
    };
  }, [collectFilter, language, legacyFilter, orderBy, search, tierFilter]);

  const UserPreferenceDispatchMemo = useMemo(() => {
    return {
      handleUpdateLanguage,
      setSearch,
      handleUpdateCollectFilter,
      handleUpdateTierFilter,
      handleUpdateLegacyFilter,
      handleUpdateOrderBy,
    };
  }, [
    handleUpdateCollectFilter,
    handleUpdateLanguage,
    handleUpdateLegacyFilter,
    handleUpdateOrderBy,
    handleUpdateTierFilter,
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
