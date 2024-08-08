import { getRequestConfig } from "next-intl/server";
import { getLocale } from "./actions/language";

import pt from "./messages/pt.json";
import en from "./messages/en.json";

import { ILocale } from "./type";

const files = {
  pt,
  en,
};
export default getRequestConfig(async () => {
  const locale = await getLocale();
  return {
    locale,
    messages: files[locale as ILocale] ?? files.en,
  };
});
