"use client";
import { memo, useCallback } from "react";
import { PrimaryButton } from "./PrimaryButton";

type SignInWithRiotProps = {
  clientId: string;
};

export const SignInWithRiot = memo(function SignInWithRiot({
  clientId,
}: SignInWithRiotProps) {
  const redirect_uri = "https://skincollection.gg/oauth/callback";
  const response_type = "code";
  const scope = "openid";

  const handleSignIn = useCallback(() => {
    const url = `https://auth.riotgames.com/authorize?redirect_uri=${redirect_uri}&client_id=${clientId}&response_type=${response_type}&scope=${scope}`;
    window.open(url, "_blank");
  }, [clientId]);

  return <PrimaryButton onClick={handleSignIn}>SIGN IN</PrimaryButton>;
});
