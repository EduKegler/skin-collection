"use server";

import { COOKIE, supportedLanguages } from "@/contants";
import { ILanguage } from "@/type";
import { cookies } from "next/headers";

export async function getLanguage(): Promise<ILanguage> {
  const language = cookies().get(COOKIE.LANGUAGE)?.value as ILanguage;
  return supportedLanguages.includes(language) ? language : "en_US";
}

export async function updateLanguage(language: ILanguage) {
  cookies().set(COOKIE.LANGUAGE, language);
}
