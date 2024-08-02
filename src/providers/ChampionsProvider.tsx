"use client";

import { IChampionAPI } from "@/type";
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
};

const ChampionsDispatchContext = createContext<ChampionsDispatchContextType>({
  setChampions: () => {},
});

export const ChampionsProvider = memo(function ChampionsProvider(
  props: ChampionsProviderProps,
): ReactElement {
  const [champions, setChampions] = useState(props.defaultChampions);

  const ChampionsMemo = useMemo(() => {
    return {
      champions,
    };
  }, [champions]);

  const ChampionsDispatchMemo = useMemo(() => {
    return {
      setChampions,
    };
  }, []);

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
