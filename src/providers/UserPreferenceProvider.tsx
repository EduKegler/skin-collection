"use client";

import { ILanguage } from "@/type";

import {
  createContext,
  memo,
  ReactElement,
  ReactNode,
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
};

const UserPreferenceContext = createContext<UserPreferenceContextType>({
  language: "en_US",
});

type UserPreferenceDispatchContextType = {
  handleUpdateLanguage: (value: ILanguage) => void;
};

const UserPreferenceDispatchContext = createContext<UserPreferenceDispatchContextType>({
  handleUpdateLanguage: () => {},
});

export const UserPreferenceProvider = memo(function UserPreferenceProvider({
  defaultLanguage,
  children,
}: UserPreferenceProviderProps): ReactElement {
  const [language, setLanguage] = useState(defaultLanguage);

  const handleUpdateLanguage = useCallback((value: ILanguage) => {
    setLanguage(value);
  }, []);

  const UserPreferenceMemo = useMemo(() => {
    return {
      language,
    };
  }, [language]);

  const UserPreferenceDispatchMemo = useMemo(() => {
    return {
      handleUpdateLanguage,
    };
  }, [handleUpdateLanguage]);

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
