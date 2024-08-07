"use client";
import {
  useUserPreference,
  useUserPreferenceDispatch,
} from "@/providers/UserPreferenceProvider";
import { ILanguage } from "@/type";
import { Button, Dropdown } from "flowbite-react";
import Image from "next/image";
import { memo, ReactNode, useCallback, useMemo } from "react";

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
          <Image
            className="self-center h-auto inline w-[20px]"
            sizes="100vw"
            width={0}
            height={0}
            unoptimized
            src={"br.svg"}
            alt={"pt_BR"}
            priority
          />
          PT-BR
        </span>
      ),

      en_US: (
        <span className="flex gap-2">
          <Image
            className="self-center h-auto inline  w-[20px]"
            src={"us.svg"}
            alt={"en_US"}
            width={0}
            height={0}
            unoptimized
            sizes="100vw"
            priority
          />
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
