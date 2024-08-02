"use client";
import { memo, useCallback } from "react";
import { PrimaryButton } from "./PrimaryButton";

export const SignInWithRiotButton = memo(function SignInWithRiotButton() {
  const redirect_uri = "http://example.com/callback";
  const client_id = "700425";
  const response_type = "code";
  const scope = "openid";

  const handleSignIn = useCallback(() => {
    const url = `https://auth.riotgames.com/authorize?redirect_uri=${redirect_uri}&client_id=${client_id}&response_type=${response_type}&scope=${scope}`;
    window.open(url, "_blank");
  }, []);

  return <PrimaryButton onClick={handleSignIn}>SIGN IN</PrimaryButton>;
});
