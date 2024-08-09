import { logSignOut } from "@/actions/log";
import { BASE_URL, COOKIE, ROUTE } from "@/contants";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET() {
  const jwt = cookies().get(COOKIE.JWT)?.value ?? "";
  await logSignOut(jwt);

  const response = NextResponse.redirect(`${BASE_URL}${ROUTE.HOME}`);

  response.cookies.set(COOKIE.JWT, "", {
    httpOnly: true,
    expires: 0,
  });

  response.cookies.set(COOKIE.REFRESH_TOKEN, "", {
    httpOnly: true,
    expires: 0,
  });

  return response;
}
