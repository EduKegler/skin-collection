import { BASE_REDIRECT_URI, CLIENT_ID } from "@/contants";
import { useCallback, useMemo } from "react";

export const useSignIn = () => {
  const response_type = "code";
  const scope = "openid offline_access cpid";

  const params = useMemo(() => {
    return new URLSearchParams({
      redirect_uri: BASE_REDIRECT_URI,
      client_id: CLIENT_ID,
      response_type,
      scope,
    });
  }, []);

  const signIn = useCallback(() => {
    const url = `https://auth.riotgames.com/authorize?${params.toString()}`;
    window.location.href = url;
  }, [params]);

  return { signIn };
};
