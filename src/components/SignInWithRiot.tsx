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

  const callback =
    "http://localhost:3000/oauth/callback?code=dXcxOkNWeUkyaUU1QW1SRXV2NlUzaUZuOVEuYi0yLXVkR2ZIM1AyY29RY2J3V2VOZw%3D%3D&iss=https%3A%2F%2Fauth.riotgames.com&session_state=ytovGnZ8obUdk9acfTCW8tc6z4UauCcWtoW0TPM0toc.d8LvvSWjbTUa_mVcrVtXVQ";

  const handleSignIn = useCallback(() => {
    const url = `https://auth.riotgames.com/authorize?redirect_uri=${redirect_uri}&client_id=${clientId}&response_type=${response_type}&scope=${scope}`;
    window.open(url, "_blank");
  }, [clientId]);

  return <PrimaryButton onClick={handleSignIn}>SIGN IN</PrimaryButton>;
});
