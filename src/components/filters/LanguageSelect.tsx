"use client";
import {
  useUserPreference,
  useUserPreferenceDispatch,
} from "@/providers/UserPreferenceProvider";
import { ILanguage } from "@/type";
import { Button, Dropdown } from "flowbite-react";
import { memo, ReactNode, useCallback, useMemo } from "react";
import { FlagImage } from "../FlagImage";

export const LanguageSelect = memo(function LanguageSelect() {
  const { language } = useUserPreference();
  const { handleUpdateLanguage } = useUserPreferenceDispatch();

  const handleChangeLanguage = useCallback(
    async (value: ILanguage) => {
      handleUpdateLanguage(value);
    },
    [handleUpdateLanguage],
  );

  const labels: Record<ILanguage, ReactNode> = useMemo(() => {
    return {
      pt_BR: (
        <span className="flex gap-2">
          <FlagImage locale="pt" />
          PT-BR
        </span>
      ),
      en_US: (
        <span className="flex gap-2">
          <FlagImage locale="en" />
          EN-US
        </span>
      ),
    };
  }, []);

  return (
    <Dropdown
      label={labels[language as keyof typeof labels]}
      renderTrigger={() => (
        <div className="relative">
          <Button color="gray" size={"xs"}>
            {labels[language as keyof typeof labels]}
          </Button>
        </div>
      )}
    >
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
