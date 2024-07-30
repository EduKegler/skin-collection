"use client";
import { useCallback } from "react";

export const SignInWithRiotButton = function SignInWithRiotButton() {
  const redirect_uri = "http://example.com/callback";
  const client_id = "700425";
  const response_type = "code";
  const scope = "openid";

  const handleSignIn = useCallback(() => {
    const url = `https://auth.riotgames.com/authorize?redirect_uri=${redirect_uri}&client_id=${client_id}&response_type=${response_type}&scope=${scope}`;
    window.open(url, "_blank");
  }, []);

  return (
    <button
      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      onClick={handleSignIn}
    >
      Button
    </button>
  );
};
