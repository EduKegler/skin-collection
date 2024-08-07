"use server";

import { supportedLanguages } from "@/contants";
import { ILanguage } from "@/type";
import { cookies } from "next/headers";

export async function getLanguage(): Promise<ILanguage> {
  const language = cookies().get("language")?.value as ILanguage;
  return supportedLanguages.includes(language) ? language : "en_US";
}

export async function updateLanguage(language: ILanguage) {
  cookies().get("language")?.value as ILanguage;
  cookies().set("language", language);
}
