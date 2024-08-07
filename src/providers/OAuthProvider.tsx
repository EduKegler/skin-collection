"use client";

import { OAUTH_DEFAULT_VALUES } from "@/contants";
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

type OAuthProviderProps = {
  children?: ReactNode;
} & OAuthContextDefaultType;

export type OAuthContextDefaultType = {
  id: string;
  name: string;
  tag: string;
  profileIconId: number;
  level: number;
  isConnected: boolean;
};

export type OAuthContextType = OAuthContextDefaultType & {
  nickName: string;
};

const OAuthContext = createContext<OAuthContextType>({
  ...OAUTH_DEFAULT_VALUES,
  nickName: "",
});

type OAuthDispatchContextType = {
  setConnected: Dispatch<SetStateAction<boolean>>;
};

const OAuthDispatchContext = createContext<OAuthDispatchContextType>({
  setConnected: () => {},
});

export const OAuthProvider = memo(function OAuthProvider(
  defaultProps: OAuthProviderProps,
): ReactElement {
  const { children, isConnected, ...props } = defaultProps;

  const [internalConnected, setConnected] = useState(isConnected);

  const nickName = useMemo(() => {
    return props.name + "#" + props.tag;
  }, [props.name, props.tag]);

  const oauthMemo = useMemo(() => {
    return { ...props, nickName, isConnected: internalConnected };
  }, [internalConnected, nickName, props]);

  const oauthDispatchMemo = useMemo(() => {
    return {
      setConnected,
    };
  }, []);

  return (
    <OAuthDispatchContext.Provider value={oauthDispatchMemo}>
      <OAuthContext.Provider value={oauthMemo}>{children}</OAuthContext.Provider>
    </OAuthDispatchContext.Provider>
  );
});

export const useOAuth = () => {
  const context = useContext(OAuthContext);
  return context;
};

export const useOAuthDispatch = () => {
  const context = useContext(OAuthDispatchContext);
  return context;
};
