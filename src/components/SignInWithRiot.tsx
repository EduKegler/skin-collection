"use client";
import { memo, useCallback, useMemo } from "react";
import { PrimaryButton } from "./PrimaryButton";

type SignInWithRiotProps = {
  clientId: string;
  callback: string;
};

export const SignInWithRiot = memo(function SignInWithRiot({
  clientId,
  callback,
}: SignInWithRiotProps) {
  const response_type = "code";
  const scope = "openid offline_access cpid";

  const params = useMemo(() => {
    return new URLSearchParams({
      redirect_uri: callback,
      client_id: clientId,
      response_type,
      scope,
    });
  }, [callback, clientId]);

  const handleSignIn = useCallback(() => {
    const url = `https://auth.riotgames.com/authorize?${params.toString()}`;
    window.open(url);
  }, [params]);

  return <PrimaryButton onClick={handleSignIn}>SIGN IN</PrimaryButton>;
});
