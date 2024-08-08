import {
  BASE_REDIRECT_URI,
  BASE_RIOT_URL,
  CLIENT_ID,
  CLIENT_SECRET,
  COOKIE,
  ROUTE,
} from "@/contants";
import { NextResponse, type NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;

  const code = searchParams.get("code");

  const tokenJSON = await fetch(`${BASE_RIOT_URL}/token`, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization:
        "Basic " + Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString("base64"),
    },

    body: new URLSearchParams({
      grant_type: "authorization_code",
      code: code ?? "",
      redirect_uri: BASE_REDIRECT_URI,
    }),
  });

  const token = await tokenJSON.json();

  const redirectUrl =
    new URL(request.url).host === "localhost"
      ? new URL("http://local.example.com/").origin
      : new URL(request.url).origin;

  const response = NextResponse.redirect(`${redirectUrl}/${ROUTE.COLLECTION}`);

  response.cookies.set(COOKIE.JWT, token.access_token ?? "", {
    httpOnly: true,
  });

  response.cookies.set(COOKIE.REFRESH_TOKEN, token.refresh_token ?? "", {
    httpOnly: true,
  });

  return response;
}
