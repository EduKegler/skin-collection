import { updateLanguage } from "@/app/actions";
import { Dropdown } from "flowbite-react";
import { memo, useCallback, useMemo } from "react";

type LanguageProps = {
  language: string;
};

export const LanguageSelect = memo(function LanguageSelect({ language }: LanguageProps) {
  const handleChangeLanguage = useCallback((value: string) => {
    updateLanguage(value);
  }, []);

  const labels = useMemo(() => {
    return {
      pt_BR: "Português - Brasil",
      en_US: "English - United States",
    };
  }, []);

  return (
    <Dropdown label={labels[language as keyof typeof labels]}>
      <Dropdown.Item onClick={() => handleChangeLanguage("pt_BR")}>
        {labels["pt_BR"]}
      </Dropdown.Item>
      <Dropdown.Divider />
      <Dropdown.Item onClick={() => handleChangeLanguage("en_US")}>
        {labels["en_US"]}
      </Dropdown.Item>
    </Dropdown>
  );
});
