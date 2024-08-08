"use client";

import { IChampionAPI } from "@/type";
import {
  createContext,
  Dispatch,
  memo,
  ReactElement,
  ReactNode,
  SetStateAction,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { useOAuth } from "./OAuthProvider";
import { getChampionList } from "@/actions/champion";
import { useLoadingDispatch } from "./LoadingProvider";
import { useUserPreference } from "./UserPreferenceProvider";

type ChampionsProviderProps = {
  children?: ReactNode;
  defaultChampions: { [string: string]: IChampionAPI };
};

type ChampionsContextType = {
  champions: { [string: string]: IChampionAPI };
};

const ChampionsContext = createContext<ChampionsContextType>({
  champions: {},
});

type ChampionsDispatchContextType = {
  setChampions: Dispatch<SetStateAction<{ [string: string]: IChampionAPI }>>;
  refreshChampions: () => Promise<void>;
};

const ChampionsDispatchContext = createContext<ChampionsDispatchContextType>({
  setChampions: () => {},
  refreshChampions: async () => {},
});

export const ChampionsProvider = memo(function ChampionsProvider(
  props: ChampionsProviderProps,
): ReactElement {
  const { language } = useUserPreference();

  const prevLanguage = useRef(language);

  const [champions, setChampions] = useState(props.defaultChampions);
  const { id } = useOAuth();
  const { setLoading } = useLoadingDispatch();

  const refreshChampions = useCallback(async () => {
    setLoading(true);
    const champions = await getChampionList(id);
    setChampions(champions);
    setLoading(false);
  }, [id, setLoading]);

  useEffect(() => {
    if (language !== prevLanguage.current) {
      prevLanguage.current = language;
      refreshChampions();
    }
  }, [language, refreshChampions]);

  const ChampionsMemo = useMemo(() => {
    return {
      champions,
    };
  }, [champions]);

  const ChampionsDispatchMemo = useMemo(() => {
    return {
      setChampions,
      refreshChampions,
    };
  }, [refreshChampions]);

  return (
    <ChampionsDispatchContext.Provider value={ChampionsDispatchMemo}>
      <ChampionsContext.Provider value={ChampionsMemo}>
        {props.children}
      </ChampionsContext.Provider>
    </ChampionsDispatchContext.Provider>
  );
});

export const useChampions = () => {
  const context = useContext(ChampionsContext);
  return context;
};

export const useChampionsDispatch = () => {
  const context = useContext(ChampionsDispatchContext);
  return context;
};
