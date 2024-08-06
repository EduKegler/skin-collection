"use client";
import { memo, useCallback } from "react";
import { PrimaryButton } from "./PrimaryButton";

type SignInWithRiotButtonProps = {
  clientId: string;
};

export const SignInWithRiotButton = memo(function SignInWithRiotButton({
  clientId,
}: SignInWithRiotButtonProps) {
  const redirect_uri = "https://skincollection.gg/oauth/callback";
  const response_type = "code";
  const scope = "openid";

  const handleSignIn = useCallback(() => {
    console.log(
      "test",
      `https://auth.riotgames.com/authorize?redirect_uri=${redirect_uri}&client_id=${clientId}&response_type=${response_type}&scope=${scope}`,
    );
    const url = `https://auth.riotgames.com/authorize?redirect_uri=${redirect_uri}&client_id=${clientId}&response_type=${response_type}&scope=${scope}`;
    window.open(url, "_blank");
  }, [clientId]);

  return <PrimaryButton onClick={handleSignIn}>SIGN IN</PrimaryButton>;
});
