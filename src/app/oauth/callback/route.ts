import { routes } from "@/contants";
import { NextResponse, type NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;

  const code = searchParams.get("code");
  const iss = searchParams.get("iss");

  const clientId = process.env.NEXT_PUBLIC_RIOT_APPLICATION_CLIENT_ID;
  const clientSecret = process.env.RIOT_APPLICATION_CLIENT_SECRET;

  const res = await fetch(`${iss}/token`, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization:
        "Basic " + Buffer.from(`${clientId}:${clientSecret}`).toString("base64"),
    },

    body: new URLSearchParams({
      grant_type: "authorization_code",
      code: code ?? "",
      redirect_uri: process.env.NEXT_PUBLIC_RIOT_APPLICATION_CALLBACK ?? "",
    }),
  });

  const data = await res.json();

  const redirectUrl =
    new URL(request.url).host === "localhost"
      ? new URL("http://local.example.com/").origin
      : new URL(request.url).origin;

  const response = NextResponse.redirect(`${redirectUrl}/${routes.COLLECTION}`);

  response.cookies.set("jwt", data.access_token ?? "");
  return response;
}
