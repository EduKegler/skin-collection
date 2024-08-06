"use client";

import { createContext, memo, ReactElement, ReactNode, useContext, useMemo } from "react";

type OAuthProviderProps = { children?: ReactNode };

type OAuthContextType = {};

const OAuthContext = createContext<OAuthContextType>({});

type OAuthDispatchContextType = {};
const OAuthDispatchContext = createContext<OAuthDispatchContextType>({});

export const OAuthProvider = memo(function OAuthProvider(
  props: OAuthProviderProps,
): ReactElement {
  const oauthMemo = useMemo(() => {
    return {};
  }, []);

  const oauthDispatchMemo = useMemo(() => {
    return {};
  }, []);

  return (
    <OAuthDispatchContext.Provider value={oauthDispatchMemo}>
      <OAuthContext.Provider value={oauthMemo}>{props.children}</OAuthContext.Provider>
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
