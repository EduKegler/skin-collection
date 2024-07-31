import { updateLanguage } from "@/app/actions";
import { ChangeEvent, memo, useCallback } from "react";

type LanguageProps = {
  language: string;
};

export const LanguageSelect = memo(function LanguageSelect({ language }: LanguageProps) {
  const handleChangeLanguage = useCallback((event: ChangeEvent<HTMLSelectElement>) => {
    updateLanguage(event.target.value);
  }, []);

  return (
    <form>
      <label htmlFor="states" className="sr-only">
        Choose a language
      </label>
      <select
        onChange={handleChangeLanguage}
        id="states"
        value={language}
        className="bg-gray-50 border-gray-300 text-gray-900 text-sm pr-2 rounded-lg dark:border-s-gray-700 border-2 focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
      >
        <option value="pt_BR">Português - Brasil</option>
        <option value="en_US">English - United States</option>
      </select>
    </form>
  );
});
