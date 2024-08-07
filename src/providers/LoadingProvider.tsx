"use client";

import clsx from "clsx";
import { Spinner } from "flowbite-react";
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

type LoadingProviderProps = {
  children?: ReactNode;
};

type LoadingContextType = {};

const LoadingContext = createContext<LoadingContextType>({});

type LoadingDispatchContextType = {
  setLoading: Dispatch<SetStateAction<boolean>>;
};

const LoadingDispatchContext = createContext<LoadingDispatchContextType>({
  setLoading: () => {},
});

export const LoadingProvider = memo(function LoadingProvider(
  props: LoadingProviderProps,
): ReactElement {
  const [loading, setLoading] = useState(false);

  const loadingMemo = useMemo(() => {
    return {
      loading,
    };
  }, [loading]);

  const loadingDispatchMemo = useMemo(() => {
    return {
      setLoading,
    };
  }, []);

  return (
    <LoadingDispatchContext.Provider value={loadingDispatchMemo}>
      <LoadingContext.Provider value={loadingMemo}>
        <div
          className={clsx(
            loading ? "flex" : "hidden",
            "h-full w-full fixed items-center justify-center z-10 bg-gray-900 bg-opacity-80",
          )}
        >
          <Spinner size={"xl"} color={"warning"} />
        </div>
        {props.children}
      </LoadingContext.Provider>
    </LoadingDispatchContext.Provider>
  );
});

export const useLoading = () => {
  const context = useContext(LoadingContext);
  return context;
};

export const useLoadingDispatch = () => {
  const context = useContext(LoadingDispatchContext);
  return context;
};
