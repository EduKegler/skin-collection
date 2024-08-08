import { NextRequest, NextResponse } from "next/server";
import {
  BASE_REDIRECT_URI,
  BASE_RIOT_URL,
  CLIENT_ID,
  CLIENT_SECRET,
  COOKIE,
  ROUTE,
} from "./contants";
import { getExpiresCookieDate } from "./utils/getExpiresCookieDate";

export async function middleware(request: NextRequest) {
  const response = NextResponse.next();

  const refreshToken = request.cookies.get(COOKIE.REFRESH_TOKEN)?.value ?? "";
  const jwt = request.cookies.get(COOKIE.JWT)?.value ?? "";

  if (jwt || !refreshToken) {
    return response;
  }

  try {
    const tokenJSON = await fetch(`${BASE_RIOT_URL}/token`, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization:
          "Basic " + Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString("base64"),
      },
      body: new URLSearchParams({
        grant_type: "refresh_token",
        refresh_token: refreshToken,
        redirect_uri: BASE_REDIRECT_URI,
      }),
    });

    const token = await tokenJSON.json();
    const expires = getExpiresCookieDate(token.expires_in);
    response.cookies.set(COOKIE.JWT, token.access_token, {
      httpOnly: true,
      expires,
    });
    response.cookies.set(COOKIE.REFRESH_TOKEN, token.refresh_token, {
      httpOnly: true,
    });
    return response;
  } catch {
    return response;
  }
}

type RouteValues = (typeof ROUTE)[keyof typeof ROUTE];

export const config: { matcher: RouteValues[] } = {
  matcher: ["/", "/collection", "/donate", "/privacy", "/tos"],
};
