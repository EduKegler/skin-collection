"use server";

import { cookies } from "next/headers";

export async function getLanguage() {
  return cookies().get("language")?.value ?? "en_US";
}

export async function updateLanguage(language: string) {
  cookies().set("language", language);
}
