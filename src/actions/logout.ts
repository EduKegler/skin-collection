"use server";

import { COOKIE } from "@/contants";
import { cookies } from "next/headers";

export async function logout() {
  cookies().delete(COOKIE.REFRESH_TOKEN);
  cookies().delete(COOKIE.JWT);
}
